"use client";

import { Window } from "../Window";
import { Settings, MonitorSmartphone, Type, MousePointer2, ChevronLeft, ChevronRight, Search, User, LogOut } from "lucide-react";
import { useOS } from "@/contexts/OSContext";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export function Preferences() {
  const { settings, updateSettings } = useOS();
  const { data: session } = useSession();

  return (
    <Window id="preferences" defaultWidth={750} defaultHeight={500}>
      <div className="flex flex-col h-full w-full text-slate-800 dark:text-slate-200">
        
        {/* Barra Superior de Ferramentas (Toolbar idêntica ao Finder) */}
        <div className="h-14 border-b border-black/10 dark:border-white/10 flex items-center px-2 sm:px-4 justify-between bg-transparent gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            {/* Navegação Falsa */}
            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <button disabled className="p-1 rounded text-slate-500 transition-colors opacity-30">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button disabled className="p-1 rounded text-slate-500 transition-colors opacity-30">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <span className="font-semibold text-sm sm:text-base truncate">Ajustes do Sistema</span>
          </div>

          <div className="relative shrink-0">
            <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar" 
              className="pl-8 pr-3 py-1.5 text-sm bg-black/5 dark:bg-white/10 border border-transparent rounded-md focus:outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-black transition-all w-28 sm:w-48"
            />
          </div>
        </div>

        {/* Corpo (Sidebar e Main Content) */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full sm:w-52 bg-black/5 dark:bg-white/5 border-b sm:border-b-0 sm:border-r border-black/10 dark:border-white/10 p-3 overflow-x-auto sm:overflow-y-auto shrink-0 flex sm:block items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
            {session ? (
              <div className="flex flex-row sm:flex-col items-center sm:items-stretch gap-4 sm:gap-2 mb-0 sm:mb-6 px-2 sm:mt-2 shrink-0 border-r sm:border-r-0 border-black/10 dark:border-white/10 pr-4 sm:pr-2 mr-2 sm:mr-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-inner border border-black/10 relative shrink-0">
                    {session.user?.image ? (
                      <Image 
                        src={session.user.image} 
                        alt={session.user.name || "User"} 
                        fill 
                        sizes="40px"
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white"><User className="w-5 h-5" /></div>
                    )}
                  </div>
                  <div className="overflow-hidden hidden sm:block">
                    <h3 className="font-bold text-sm leading-none truncate w-full" title={session.user?.name || ""}>
                      {session.user?.name?.split(" ")[0]} {session.user?.name?.split(" ").slice(-1)}
                    </h3>
                    <p className="text-[10px] text-slate-500 truncate w-full mt-0.5" title={session.user?.email || ""}>
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="flex items-center justify-center gap-1.5 w-auto sm:w-full mt-0 sm:mt-1 bg-black/5 hover:bg-red-500 hover:text-white text-red-500 dark:bg-white/5 dark:hover:bg-red-500 text-[10px] py-1 px-3 sm:px-0 rounded-md transition-colors font-semibold"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Sair da Conta</span>
                  <span className="sm:hidden">Sair</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-0 sm:mb-6 px-2 sm:mt-2 group cursor-pointer shrink-0 border-r sm:border-r-0 border-black/10 dark:border-white/10 pr-4 sm:pr-2 mr-2 sm:mr-0" onClick={() => signIn("google")}>
                <div className="bg-slate-300 dark:bg-slate-700 w-10 h-10 rounded-full flex items-center justify-center border border-black/10 shadow-inner group-hover:bg-blue-100 transition-colors shrink-0">
                  <User className="w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="hidden sm:block">
                  <h3 className="font-bold text-sm leading-none group-hover:text-blue-500 transition-colors">Conta Google</h3>
                  <p className="text-[10px] text-blue-500 mt-0.5 font-medium">Fazer Login...</p>
                </div>
              </div>
            )}

            <ul className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-1 text-sm font-medium w-max sm:w-full shrink-0">
              <li className="px-3 py-1.5 rounded-md cursor-pointer transition-colors flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10">
                <div className="bg-blue-500 w-5 h-5 rounded flex items-center justify-center text-white shadow-sm shrink-0">
                  <MonitorSmartphone className="w-3 h-3" />
                </div>
                Aparência
              </li>
              <li className="px-3 py-1.5 rounded-md cursor-pointer transition-colors flex items-center gap-2 bg-blue-500 text-white shadow-sm">
                <div className="bg-slate-700 w-5 h-5 rounded flex items-center justify-center text-white shadow-sm shrink-0">
                  <MousePointer2 className="w-3 h-3" />
                </div>
                Dock e Menu
              </li>
              <li className="px-3 py-1.5 rounded-md cursor-pointer transition-colors flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10">
                <div className="bg-green-500 w-5 h-5 rounded flex items-center justify-center text-white shadow-sm shrink-0">
                  <Type className="w-3 h-3" />
                </div>
                Acessibilidade
              </li>
            </ul>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 p-4 sm:p-10 pb-24 sm:pb-10 overflow-y-auto flex flex-col items-center">
            
            {/* Ícone Gigante da categoria ativa */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-slate-700 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-3">
                <MousePointer2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold">Dock e Barra de Menus</h2>
            </div>

            <div className="w-full max-w-2xl bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl shadow-sm divide-y divide-black/10 dark:divide-white/10">
              
              {/* Dock Size Setting */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 sm:p-5">
                <div className="w-full sm:w-24 text-sm font-bold sm:font-medium text-left sm:text-right">
                  Tamanho do Dock
                </div>
                <div className="flex-1 flex items-center gap-2 sm:gap-4 w-full">
                  <span className="text-xs text-slate-500 font-medium shrink-0">Pequeno</span>
                  <input 
                    type="range" 
                    min="32" 
                    max="96" 
                    value={settings.dockSize}
                    onChange={(e) => updateSettings({ dockSize: Number(e.target.value) })}
                    className="flex-1 h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 min-w-0"
                  />
                  <span className="text-xs text-slate-500 font-medium shrink-0">Grande</span>
                </div>
              </div>

              {/* Desktop Icon Size Setting */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 sm:p-5">
                <div className="w-full sm:w-24 text-sm font-bold sm:font-medium text-left sm:text-right leading-tight">
                  Ícones da Mesa
                </div>
                <div className="flex-1 flex items-center gap-2 sm:gap-4 w-full">
                  <span className="text-xs text-slate-500 font-medium shrink-0">Pequeno</span>
                  <input 
                    type="range" 
                    min="40" 
                    max="100" 
                    value={settings.desktopIconSize}
                    onChange={(e) => updateSettings({ desktopIconSize: Number(e.target.value) })}
                    className="flex-1 h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 min-w-0"
                  />
                  <span className="text-xs text-slate-500 font-medium shrink-0">Grande</span>
                </div>
              </div>
              
              {/* Tema Setting Mock */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 sm:p-5">
                <div className="w-full sm:w-24 text-sm font-bold sm:font-medium text-left sm:text-right">
                  Tema
                </div>
                <div className="flex-1 flex items-center gap-2 sm:gap-3 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] py-1">
                  <button 
                    onClick={() => updateSettings({ theme: 'light' })}
                    className={`px-4 py-1.5 rounded-md text-sm transition-colors border ${settings.theme === 'light' ? 'bg-blue-500 border-blue-500 text-white shadow-md' : 'bg-white dark:bg-slate-800 border-black/20 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  >
                    Claro
                  </button>
                  <button 
                    onClick={() => updateSettings({ theme: 'dark' })}
                    className={`px-4 py-1.5 rounded-md text-sm transition-colors border ${settings.theme === 'dark' ? 'bg-blue-500 border-blue-500 text-white shadow-md' : 'bg-slate-800 border-black/50 text-white hover:bg-slate-700'}`}
                  >
                    Escuro
                  </button>
                  <button 
                    onClick={() => updateSettings({ theme: 'auto' })}
                    className={`px-4 py-1.5 rounded-md text-sm transition-colors border ${settings.theme === 'auto' ? 'bg-blue-500 border-blue-500 text-white shadow-md' : 'bg-gradient-to-r from-slate-200 to-slate-800 border-black/30 text-white hover:opacity-80'}`}
                  >
                    Automático
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </Window>
  );
}
