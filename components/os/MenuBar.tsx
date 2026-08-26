"use client";

import { useState, useRef, useEffect } from "react";
import { Wifi, Battery, Search, Play, Pause } from 'lucide-react';
import Image from "next/image";
import { useOS } from "@/contexts/OSContext";
import { signIn, signOut, useSession } from "next-auth/react";

export function MenuBar() {
  const { activeApp, registeredApps, openApp, closeApp, toggleMinimize, spotifyController, spotifyPlayback } = useOS();
  const { data: session } = useSession();
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // App ativo ou padrão (Portfólio)
  const appData = activeApp && registeredApps[activeApp] 
    ? registeredApps[activeApp] 
    : registeredApps["portfolio"];

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '');

  // Fecha o menu se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAppleMenuOpen(false);
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderMenuOptions = (menu: string) => {
    if (menu === "Arquivo" || menu === "File") {
      return (
        <>
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors" onClick={() => { openApp("resume"); setActiveMenu(null); }}>
            Baixar Currículo PDF...
          </div>
          <div className="my-1 border-t border-black/10 dark:border-white/10" />
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors flex justify-between items-center" onClick={() => { if(activeApp) closeApp(activeApp); setActiveMenu(null); }}>
            <span>Fechar Janela</span>
            <span className="text-[10px] opacity-50 text-right">⌘W</span>
          </div>
        </>
      );
    }
    if (menu === "Editar" || menu === "Edit") {
      return (
        <>
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors flex justify-between items-center" onClick={() => { navigator.clipboard.writeText("lancao.af@gmail.com"); setActiveMenu(null); alert("Email copiado!"); }}>
            <span>Copiar Email</span>
            <span className="text-[10px] opacity-50 text-right">⌘C</span>
          </div>
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors" onClick={() => { navigator.clipboard.writeText(window.location.href); setActiveMenu(null); alert("Link copiado!"); }}>
            Copiar Link do Portfólio
          </div>
        </>
      );
    }
    if (menu === "Visualizar" || menu === "View") {
      return (
        <>
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors flex justify-between items-center" onClick={() => { openApp("launchpad"); setActiveMenu(null); }}>
            <span>Mostrar Launchpad</span>
          </div>
          <div className="my-1 border-t border-black/10 dark:border-white/10" />
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors" onClick={() => { openApp("preferences"); setActiveMenu(null); }}>
            Ajustes de Aparência
          </div>
        </>
      );
    }
    if (menu === "Janela" || menu === "Window" || menu === "Ir") {
      return (
        <>
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors flex justify-between items-center" onClick={() => { if(activeApp) { toggleMinimize(activeApp); setActiveMenu(null); } }}>
            <span>Minimizar</span>
            <span className="text-[10px] opacity-50 text-right">⌘M</span>
          </div>
        </>
      );
    }
    if (menu === "Ajuda" || menu === "Help") {
      return (
        <>
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors" onClick={() => { openApp("about-site"); setActiveMenu(null); }}>
            Boas-vindas
          </div>
          <div className="my-1 border-t border-black/10 dark:border-white/10" />
          <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors" onClick={() => { window.open("https://linkedin.com/in/alexlancao", "_blank"); setActiveMenu(null); }}>
            Visitar LinkedIn
          </div>
        </>
      );
    }
    return (
      <div className="px-3 py-1 text-slate-500 italic text-[11px] cursor-default">
        Opções da aplicação
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-md text-white/90 text-xs font-medium px-3 flex items-center justify-between z-50 border-b border-white/10">
      {/* Esquerda */}
      <div className="flex items-center gap-4" ref={menuRef}>
        <div className="relative">
          <div 
            className="w-4 h-4 relative cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              setIsAppleMenuOpen(!isAppleMenuOpen);
              setActiveMenu(null);
            }}
          >
            <Image src="/icon-dark.png" alt="Logo" fill sizes="16px" className="object-contain" />
          </div>

          {/* Menu Dropdown da Maçã/Logo */}
          {isAppleMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white/70 dark:bg-black/70 backdrop-blur-2xl rounded-lg shadow-2xl border border-white/20 dark:border-white/10 py-1 text-slate-800 dark:text-slate-200">
              <div 
                onClick={() => {
                  openApp("about-site");
                  setIsAppleMenuOpen(false);
                }}
                className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
              >
                Sobre este Site
              </div>
              <div className="my-1 border-t border-black/10 dark:border-white/10" />
              
              {!session ? (
                <div 
                  onClick={() => signIn("google")}
                  className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors flex items-center justify-between"
                >
                  <span>Conectar com Google Drive</span>
                  <span className="text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">Login</span>
                </div>
              ) : (
                <>
                  <div className="px-3 py-1 text-slate-500 cursor-default">
                    Logado como {session.user?.name}
                  </div>
                  <div 
                    onClick={() => signOut()}
                    className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
                  >
                    Desconectar Conta
                  </div>
                </>
              )}
              
              <div className="my-1 border-t border-black/10 dark:border-white/10" />
              <div 
                onClick={() => {
                  openApp("preferences");
                  setIsAppleMenuOpen(false);
                }}
                className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
              >
                Preferências do Sistema...
              </div>
              <div className="my-1 border-t border-black/10 dark:border-white/10" />
              <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors">
                Desligar...
              </div>
            </div>
          )}
        </div>

        <span className="font-bold">{appData.title}</span>
        {appData.menus.map((menu, i) => (
          <div key={i} className="relative hidden sm:block">
            <span 
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${activeMenu === menu ? 'bg-blue-500 text-white' : 'hover:bg-white/20'}`}
              onClick={() => {
                setIsAppleMenuOpen(false);
                if (activeMenu === menu) setActiveMenu(null);
                else setActiveMenu(menu);
              }}
            >
              {menu}
            </span>
            
            {activeMenu === menu && (
              <div className="absolute top-full left-0 mt-1 min-w-[200px] whitespace-nowrap bg-white/70 dark:bg-black/70 backdrop-blur-2xl rounded-lg shadow-2xl border border-white/20 dark:border-white/10 py-1 text-slate-800 dark:text-slate-200 z-[60]">
                {renderMenuOptions(menu)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Direita */}
      <div className="flex items-center gap-4 relative">
        
        {/* Spotify Mini Player in Menu Bar */}
        {spotifyPlayback && spotifyPlayback.track && (
          <div className="flex items-center gap-2 mr-1 px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 cursor-pointer transition-colors max-w-[200px]" onClick={() => openApp('spotify')}>
            <button 
              onClick={(e) => { e.stopPropagation(); spotifyController?.togglePlay(); }}
              className="hover:text-green-500 transition-colors"
            >
              {spotifyPlayback.isPaused === false ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </button>
            <div className="flex items-center gap-1.5 overflow-hidden truncate">
              {spotifyPlayback.track.coverArt && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={spotifyPlayback.track.coverArt.url} alt="Cover" className="w-4 h-4 rounded-[2px] object-cover" />
              )}
              <span className="truncate text-[11px] font-semibold">{spotifyPlayback.track.name}</span>
            </div>
          </div>
        )}

        <Search className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4" />
        
        <div 
          className="cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
          onClick={() => {
            if (activeMenu === "calendar") setActiveMenu(null);
            else {
              setActiveMenu("calendar");
              setIsAppleMenuOpen(false);
            }
          }}
        >
          {currentDate}
        </div>

        {/* Meeting Scheduler Dropdown */}
        {activeMenu === "calendar" && (
          <div className="absolute top-full right-0 mt-1 w-80 sm:w-96 bg-white/70 dark:bg-black/70 backdrop-blur-3xl rounded-xl shadow-2xl border border-white/20 dark:border-white/10 py-3 px-4 text-slate-800 dark:text-slate-200 z-[60]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm">Agendar Reunião</span>
              <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">30 min</span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Escolha um horário na minha agenda do Google para um bate-papo rápido!
            </p>

            {session ? (
              <div className="w-full h-[400px] rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-white">
                <iframe 
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2m1qNHsqpa3jikAosdadsGx8CbXaXXTUkpoFuyKfEecFBc81mVz4AP1KA4ihM2Zlts5uCSbaUC?gv=true" 
                  style={{ border: 0 }} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                />
              </div>
            ) : (
              <div className="w-full h-[160px] rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Identificação Necessária</span>
                <span className="text-xs text-slate-500 mb-4">Para evitar spans, faça login com o Google para acessar minha agenda.</span>
                <button 
                  onClick={() => signIn("google")}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-colors"
                >
                  Fazer Login Seguro
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

