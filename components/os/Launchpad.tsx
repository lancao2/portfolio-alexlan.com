"use client";

import { useOS } from "@/contexts/OSContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";

export function Launchpad() {
  const { isLaunchpadOpen, setLaunchpadOpen, registeredApps, openApp } = useOS();
  const [search, setSearch] = useState("");

  const closeLaunchpad = () => {
    setSearch("");
    setLaunchpadOpen(false);
  };

  const apps = Object.values(registeredApps)
    .filter(app => app.id !== "portfolio")
    .sort((a, b) => {
      if (a.id === "about-site") return -1;
      if (b.id === "about-site") return 1;
      return 0;
    });
  const filteredApps = apps.filter(app => app.title.toLowerCase().includes(search.toLowerCase()));

  const handleOpenApp = (id: string) => {
    setSearch("");
    openApp(id);
    setLaunchpadOpen(false);
  };

  return (
    <AnimatePresence>
      {isLaunchpadOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-2xl flex flex-col items-center pt-24 overflow-y-auto"
          onClick={closeLaunchpad}
        >
          {/* Search Bar */}
          <div 
            className="w-full max-w-xs relative mb-16"
            onClick={e => e.stopPropagation()}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-md py-1.5 pl-9 pr-4 text-white placeholder-white/50 outline-none focus:bg-white/20 transition-colors text-sm text-center focus:text-left focus:pl-9"
              autoFocus
            />
          </div>

          {/* Apps Grid */}
          <div 
            className="w-full max-w-5xl px-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-y-10 gap-x-4 pb-20"
            onClick={e => e.stopPropagation()}
          >
            {filteredApps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => handleOpenApp(app.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20 flex items-center justify-center">
                  <div className={`relative flex items-center justify-center
                    ${app.iconSrc.includes("github") ? "w-[68px] h-[68px] rounded-full overflow-hidden border-2 border-white/20" : ""}
                    ${app.id === "natuhair" ? "w-[68px] h-[68px] bg-white rounded-[1.2rem] shadow-lg p-2" : ""}
                    ${app.id === "holystreaks" ? "w-[62px] h-[62px] bg-white rounded-[1.3rem] shadow-lg p-1.5 border border-white/20" : ""}
                    ${!app.iconSrc.includes("github") && app.id !== "natuhair" && app.id !== "holystreaks" ? "w-full h-full" : ""}
                  `}>
                    <Image 
                      src={app.iconSrc} 
                      alt={app.title} 
                      fill 
                      className={`object-contain transition-all
                        ${app.iconSrc.includes("github") ? "object-cover scale-100" : ""}
                        ${app.id === "holystreaks" ? "scale-[0.9] rounded-[1rem]" : ""}
                        ${app.id === "natuhair" || app.id === "resume" ? "scale-[0.8]" : ""}
                        ${app.id !== "holystreaks" && app.id !== "natuhair" && app.id !== "resume" ? "scale-[1.25] group-hover:drop-shadow-2xl" : ""}
                      `} 
                      sizes="80px"
                    />
                  </div>
                </div>
                <span className="text-white text-[13px] font-medium drop-shadow-md text-center line-clamp-1 px-1 tracking-wide">
                  {app.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

