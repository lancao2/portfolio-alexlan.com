"use client";

import { DesktopIcon } from "./DesktopIcon";
import { useOS } from "@/contexts/OSContext";
import { Finder } from "./apps/Finder";
import { AboutSite } from "./apps/AboutSite";
import { Preferences } from "./apps/Preferences";
import { Contacts } from "./apps/Contacts";
import { Messages } from "./apps/Messages";
import { Spotify } from "./apps/Spotify";
import { Terminal } from "./apps/Terminal";
import { Natuhair } from "./apps/Natuhair";
import { Safari } from "./apps/Safari";
import { HolyStreaks } from "./apps/HolyStreaks";
import { Resume } from "./apps/Resume";
import { Launchpad } from "./Launchpad";

export function DesktopEnvironment() {
  const { focusApp, openApp } = useOS();

  const desktopItems = [
    { 
      id: "resume", 
      label: "Currículo.pdf", 
      iconSrc: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg", 
      action: () => openApp("resume") 
    },
    { 
      id: "linkedin", 
      label: "LinkedIn", 
      iconSrc: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", 
      action: () => window.open("https://linkedin.com/in/alexlancao", "_blank") 
    },
    { 
      id: "github", 
      label: "GitHub", 
      iconSrc: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", 
      action: () => window.open("https://github.com/lancao2", "_blank") 
    },
    { 
      id: "whatsapp", 
      label: "WhatsApp", 
      iconSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", 
      action: () => window.open("https://wa.me/5521969449955", "_blank") 
    },
  ];

  const handleBackgroundClick = () => {
    document.dispatchEvent(new CustomEvent("desktop-click"));
    focusApp(null);
  };

  return (
    <div className="w-full h-full p-4 relative flex flex-col gap-4 flex-wrap content-start" onClick={handleBackgroundClick}>
      {desktopItems.map((item) => (
        <DesktopIcon
          key={item.id}
          id={item.id}
          label={item.label}
          iconSrc={item.iconSrc}
          onDoubleClick={item.action} 
        />
      ))}
      
      <Finder />
      <AboutSite />
      <Preferences />
      <Contacts />
      <Messages />
      <Spotify />
      <Terminal />
      <Natuhair />
      <Safari />
      <HolyStreaks />
      <Resume />
      
      <Launchpad />
    </div>
  );
}
