"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppData {
  id: string;
  title: string;
  menus: string[];
  iconSrc: string;
}

export interface SystemSettings {
  dockSize: number; // tamanho base do ícone (ex: 56)
  desktopIconSize: number; // tamanho base do ícone da área de trabalho (ex: 64)
  theme: "light" | "dark" | "auto";
}

interface OSContextProps {
  openApps: string[];
  activeApp: string | null;
  minimizedApps: string[];
  settings: SystemSettings;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  toggleMinimize: (id: string) => void;
  focusApp: (id: string | null) => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  registeredApps: Record<string, AppData>;
  notifications: Record<string, number>;
  setNotification: (id: string, count: number) => void;
  clearNotification: (id: string) => void;

  // Spotify
  spotifyController: unknown;
  setSpotifyController: (controller: unknown) => void;
  spotifyPlayback: unknown;
  setSpotifyPlayback: (state: unknown) => void;

  // Launchpad
  isLaunchpadOpen: boolean;
  setLaunchpadOpen: (isOpen: boolean) => void;
}

const OSContext = createContext<OSContextProps | undefined>(undefined);

// Registro global das aplicações do nosso sistema
export const appRegistry: Record<string, AppData> = {
  finder: { id: "finder", title: "Finder", menus: ["Arquivo", "Editar", "Visualizar", "Ir", "Janela", "Ajuda"], iconSrc: "/icons/finder.png" },
  contacts: { id: "contacts", title: "Contatos", menus: ["Arquivo", "Editar", "Visualizar", "Cartão", "Janela", "Ajuda"], iconSrc: "/icons/Contacts.png" },
  messages: { id: "messages", title: "Mensagens", menus: ["Arquivo", "Editar", "Visualizar", "Janela", "Ajuda"], iconSrc: "/icons/Messages.png" },
  spotify: { id: "spotify", title: "Spotify", menus: ["Spotify", "Arquivo", "Editar", "Reprodução", "Janela", "Ajuda"], iconSrc: "/icons/Spotify.png" },
  terminal: { id: "terminal", title: "Terminal", menus: ["Shell", "Edição", "Visualizar", "Janela", "Ajuda"], iconSrc: "/icons/terminal.png" },
  safari: { id: "safari", title: "Ayo Cosméticos", menus: ["Safari", "Arquivo", "Editar", "Visualizar", "Histórico", "Janela", "Ajuda"], iconSrc: "/icons/Safari.png" },
  resume: { id: "resume", title: "Currículo.pdf", menus: ["Pré-visualização", "Arquivo", "Editar", "Visualizar", "Ir", "Ferramentas", "Janela", "Ajuda"], iconSrc: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" },
  "about-site": { id: "about-site", title: "Sobre este Site", menus: ["Arquivo", "Janela", "Ajuda"], iconSrc: "https://github.com/lancao2.png" },
  natuhair: { id: "natuhair", title: "Natuhair Connect", menus: ["App", "Editar", "Visualizar", "Ajuda"], iconSrc: "/icons/natuhair.png" },
  holystreaks: { id: "holystreaks", title: "HolyStreaks", menus: ["Arquivo", "Editar", "Visualizar", "Janela", "Ajuda"], iconSrc: "/icons/holyStreakes.png" },
  preferences: { id: "preferences", title: "Ajustes do Sistema", menus: ["Ajustes", "Arquivo", "Editar", "Visualizar", "Janela", "Ajuda"], iconSrc: "/icons/Sattings.png" },
  portfolio: { id: "portfolio", title: "Portfólio", menus: ["Arquivo", "Editar", "Visualizar", "Janela", "Ajuda"], iconSrc: "/icon-dark.png" }, // Desktop base
};

export function OSProvider({ children }: { children: ReactNode }) {
  const [openApps, setOpenApps] = useState<string[]>(["about-site"]);
  const [minimizedApps, setMinimizedApps] = useState<string[]>([]);
  const [activeApp, setActiveApp] = useState<string | null>("about-site");
  
  const [settings, setSettings] = useState<SystemSettings>({
    dockSize: 56, // Tamanho padrão
    desktopIconSize: 64, // Tamanho padrão dos ícones da área de trabalho
    theme: "auto",
  });

  const [notifications, setNotificationsState] = useState<Record<string, number>>({
    messages: 1, // Inicialmente 1 notificação no app messages
  });

  const setNotification = (id: string, count: number) => {
    setNotificationsState(prev => ({ ...prev, [id]: count }));
  };

  const clearNotification = (id: string) => {
    setNotificationsState(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const openApp = (id: string) => {
    if (!openApps.includes(id)) {
      setOpenApps((prev) => [...prev, id]);
    }
    setMinimizedApps((prev) => prev.filter((appId) => appId !== id));
    setActiveApp(id);
    clearNotification(id);
  };

  const closeApp = (id: string) => {
    setOpenApps((prev) => prev.filter((appId) => appId !== id));
    setMinimizedApps((prev) => prev.filter((appId) => appId !== id));
    if (activeApp === id) {
      setActiveApp(null); 
    }
  };

  const toggleMinimize = (id: string) => {
    if (minimizedApps.includes(id)) {
      setMinimizedApps((prev) => prev.filter((appId) => appId !== id));
      setActiveApp(id);
      clearNotification(id);
    } else {
      setMinimizedApps((prev) => [...prev, id]);
      if (activeApp === id) setActiveApp(null);
    }
  };

  const focusApp = (id: string | null) => {
    if (id && minimizedApps.includes(id)) {
      setMinimizedApps((prev) => prev.filter((appId) => appId !== id));
    }
    setActiveApp(id);
    if (id) {
      clearNotification(id);
    }
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const [spotifyController, setSpotifyController] = useState<unknown>(null);
  const [spotifyPlayback, setSpotifyPlayback] = useState<unknown>(null);

  const [isLaunchpadOpen, setLaunchpadOpen] = useState(false);

  return (
    <OSContext.Provider value={{ 
      openApps, activeApp, openApp, closeApp, focusApp, 
      registeredApps: appRegistry, minimizedApps, toggleMinimize, 
      settings, updateSettings,
      notifications, setNotification, clearNotification,
      spotifyController, setSpotifyController, spotifyPlayback, setSpotifyPlayback,
      isLaunchpadOpen, setLaunchpadOpen
    }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return context;
}

