"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useOS } from "@/contexts/OSContext";
import { useIsMobile } from "@/hooks/useIsMobile";

const dockApps = [
  { id: "finder", iconSrc: "/icons/finder.png", label: "Finder" },
  { id: "launchpad", iconSrc: "/icons/Launchpad.png", label: "Launchpad" },
  { id: "safari", iconSrc: "/icons/Safari.png", label: "Ayo Cosméticos" },
  { id: "contacts", iconSrc: "/icons/Contacts.png", label: "Contatos" },
  { id: "messages", iconSrc: "/icons/Messages.png", label: "Mensagens" },
  { id: "spotify", iconSrc: "/icons/Spotify.png", label: "Spotify" },
  { id: "terminal", iconSrc: "/icons/terminal.png", label: "Terminal" },
];

const dockSystem = [
  { id: "trash", iconSrc: "/icons/trash.png", label: "Lixeira" },
];

export function Dock() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { openApp, openApps, settings, registeredApps, notifications, isLaunchpadOpen, setLaunchpadOpen } = useOS();
  const isMobile = useIsMobile();

  const dockSize = isMobile ? 44 : settings.dockSize;
  const hoverSize = isMobile ? 44 : settings.dockSize + 20;

  const renderDockItem = (item: { id: string; iconSrc: string; label: string }) => {
    const isHovered = hovered === item.id;
    const isOpen = openApps.includes(item.id);
    const notifCount = notifications[item.id] || 0;
    
    return (
      <motion.button
        key={item.id}
        onClick={() => {
          if (item.id === "launchpad") {
            setLaunchpadOpen(!isLaunchpadOpen);
          } else {
            openApp(item.id);
            if (isLaunchpadOpen) setLaunchpadOpen(false);
          }
        }}
        className="relative group flex flex-col items-center justify-end"
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={() => setHovered(null)}
        initial={{ width: dockSize, height: dockSize }}
        animate={{
          width: isHovered ? hoverSize : dockSize,
          height: isHovered ? hoverSize : dockSize,
          marginTop: isHovered ? -20 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isHovered && (
          <div className="absolute -top-10 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md whitespace-nowrap shadow-xl border border-white/10 z-50">
            {item.label}
          </div>
        )}
        <div className="w-full h-full relative transition-transform drop-shadow-lg flex items-center justify-center">
          <div className={`relative flex items-center justify-center w-full h-full
            ${item.iconSrc.includes("github.com") ? "scale-[0.85] rounded-full overflow-hidden border-2 border-white/20" : ""}
            ${item.id === "natuhair" || item.id === "holystreaks" ? "scale-[0.85] bg-white rounded-[1.2rem] shadow-sm overflow-hidden" : ""}
          `}>
            <Image 
              src={item.iconSrc} 
              alt={item.label} 
              fill 
              sizes={`${hoverSize}px`} 
              className={`object-contain 
                ${item.iconSrc.includes("github.com") ? "object-cover scale-100" : ""}
                ${item.id === "natuhair" || item.id === "resume" ? "scale-[0.8]" : item.id === "holystreaks" ? "scale-[1.0]" : "scale-[1.35]"}
              `} 
            />
          </div>

          <AnimatePresence>
            {notifCount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-white/20 z-10 pointer-events-none"
              >
                {notifCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={`absolute -bottom-1.5 w-1 h-1 bg-white/80 rounded-full transition-opacity ${isOpen && item.id !== "launchpad" ? "opacity-100" : "opacity-0"}`} />
      </motion.button>
    );
  };

  // Apps fixos no Dock
  const pinnedAppIds = dockApps.map(app => app.id);
  
  // Apps abertos que não estão fixos no Dock (ignoramos o desktop base)
  const unpinnedOpenApps = openApps
    .filter(id => !pinnedAppIds.includes(id) && id !== "portfolio")
    .map(id => registeredApps[id])
    .filter(Boolean)
    .map(app => ({ id: app.id, iconSrc: app.iconSrc, label: app.title }));

  // Em telas de celular, escondemos apps menos cruciais para poupar espaço no Dock.
  // Eles continuam acessíveis via Launchpad.
  const visibleDockApps = isMobile 
    ? dockApps.filter(app => !["spotify", "terminal"].includes(app.id))
    : dockApps;

  return (
    <AnimatePresence>
      {!isLaunchpadOpen && (
        <motion.div 
          className="fixed bottom-2 left-1/2 z-50"
          initial={{ y: 150, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 150, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-end gap-2 px-3 pb-2 pt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-[95vw] overflow-x-auto sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {visibleDockApps.map(renderDockItem)}

            {/* Separador para Apps Abertos Não-Fixados (se houver) */}
            {unpinnedOpenApps.length > 0 && (
              <div className="w-px h-10 bg-white/20 mx-1 self-center rounded-full shrink-0" />
            )}
            
            {/* Renderiza os Apps Abertos Não-Fixados */}
            {unpinnedOpenApps.map(renderDockItem)}

            {/* Divisor do Mac antes da Lixeira */}
            <div className="w-px h-10 bg-white/20 mx-1 self-center rounded-full shrink-0" />

            {dockSystem.map(renderDockItem)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
