"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useOS } from "@/contexts/OSContext";

interface DesktopIconProps {
  id: string;
  label: string;
  iconSrc: string;
  onDoubleClick: () => void;
}

export function DesktopIcon({ id, label, iconSrc, onDoubleClick }: DesktopIconProps) {
  const { notifications, settings } = useOS();
  const [isSelected, setIsSelected] = useState(false);

  const notifCount = notifications[id] || 0;
  const iconSize = settings.desktopIconSize;

  useEffect(() => {
    const handleDesktopClick = () => setIsSelected(false);
    document.addEventListener("desktop-click", handleDesktopClick);
    return () => document.removeEventListener("desktop-click", handleDesktopClick);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDoubleClick();
    setIsSelected(false);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onPointerDown={() => setIsSelected(true)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{ width: iconSize + 32 }}
      className={`flex flex-col items-center justify-start p-2 rounded-lg cursor-pointer transition-colors ${
        isSelected ? "bg-black/30 border border-white/10" : "hover:bg-black/20 border border-transparent"
      }`}
    >
      <div 
        style={{ width: iconSize, height: iconSize }}
        className="mb-1 relative flex items-center justify-center drop-shadow-md"
      >
        <Image src={iconSrc} alt={label} fill className="object-contain pointer-events-none" unoptimized />
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
      <span
        className={`text-xs text-center font-medium px-1.5 py-0.5 rounded ${
          isSelected ? "bg-blue-600 text-white" : "text-white bg-black/10 drop-shadow-md"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}
