"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useOS } from "@/contexts/OSContext";
import { useIsMobile } from "@/hooks/useIsMobile";

interface WindowProps {
  id: string;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

export function Window({ id, children, defaultWidth = 800, defaultHeight = 500 }: WindowProps) {
  const { openApps, activeApp, closeApp, focusApp, registeredApps, minimizedApps, toggleMinimize, settings } = useOS();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

  const isOpen = openApps.includes(id);
  const isMinimized = minimizedApps.includes(id);
  const isActive = activeApp === id;
  const appData = registeredApps[id];
  
  // No mobile, a janela ocupa 100% sempre
  const effectivelyMaximized = isMaximized || isMobile;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          drag={!effectivelyMaximized}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          onPointerDown={() => focusApp(id)}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            ...(effectivelyMaximized ? { top: 0, left: 0, x: 0, y: 0, width: "100%", height: `calc(100% - ${settings.dockSize + 24}px)` } : { width: defaultWidth, height: defaultHeight }) 
          }}
          exit={{ scale: 0.9, opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            zIndex: isActive ? 40 : 30,
            overflow: "hidden",
            top: effectivelyMaximized ? 0 : `calc(50% - ${defaultHeight / 2}px)`,
            left: effectivelyMaximized ? 0 : `calc(50% - ${defaultWidth / 2}px)`,
          }}
          className={`absolute rounded-xl border backdrop-blur-2xl flex flex-col min-w-[300px] min-h-[200px] transition-[filter,opacity] duration-300 ${
            isActive 
              ? "bg-white/70 dark:bg-black/70 border-slate-300 dark:border-white/20 shadow-2xl saturate-100 opacity-100" 
              : "bg-white/50 dark:bg-black/50 border-transparent shadow-lg saturate-50 opacity-90 grayscale-[0.3]"
          }`}
        >
          {/* Barra de Título (Barra de Controle) */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="h-8 flex items-center justify-between px-4 select-none"
            onDoubleClick={() => setIsMaximized(!isMaximized)}
            style={{ cursor: isMaximized ? "default" : "grab" }}
          >
            {/* Botões do Mac */}
            <div className="flex gap-2 w-16 group relative">
              <button 
                onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center border border-black/10 text-black/50 hover:text-black/80 transition-colors cursor-pointer" 
              >
                <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold">✕</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center border border-black/10 text-black/50 hover:text-black/80 transition-colors cursor-pointer" 
              >
                <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold leading-none mb-1">-</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center border border-black/10 text-black/50 hover:text-black/80 transition-colors cursor-pointer" 
              >
                <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold">⤢</span>
              </button>
            </div>

            {/* Título da Janela */}
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 pointer-events-none truncate max-w-[50%] text-center">
              {appData?.title || id}
            </span>
            
            {/* Espaçador para equilibrar o layout do título no centro */}
            <div className="w-16 pointer-events-none" />
          </div>

          {/* Conteúdo da Janela */}
          <div className="flex-1 bg-white/50 dark:bg-black/50 overflow-hidden relative">
            {!isActive && (
              <div 
                className="absolute inset-0 z-50 cursor-default" 
                onPointerDown={(e) => { e.stopPropagation(); focusApp(id); }} 
              />
            )}
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

