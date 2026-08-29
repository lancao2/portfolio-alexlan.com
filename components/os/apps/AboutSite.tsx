"use client";

import { Window } from "../Window";
import Image from "next/image";
import { User, Code } from "lucide-react";

export function AboutSite() {
  return (
    <Window id="about-site" defaultWidth={500} defaultHeight={340}>
      <div className="flex flex-col items-center justify-center h-full w-full p-6 sm:p-8 text-slate-800 dark:text-slate-200 overflow-y-auto">
        <div className="flex flex-col sm:flex-row w-full items-center gap-6 sm:gap-8 text-center sm:text-left">
          {/* Avatar Area */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-full overflow-hidden shadow-xl border-4 border-white/20 dark:border-white/10">
              <Image 
                src="https://github.com/lancao2.png" 
                alt="Alex Lançao"
                fill
                sizes="(max-width: 640px) 96px, 128px"
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Info Area */}
          <div className="flex flex-col flex-1 items-center sm:items-start">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Alex Lançao</h1>
            <p className="text-sm font-semibold text-blue-500 mb-2">Desenvolvedor Full Stack</p>
            
            <div className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed space-y-2 max-w-sm sm:max-w-none">
              <p>
                <strong>Olá, sou o Alex, Dev Full Stack.</strong> Bem-vindo ao meu portfólio interativo!
              </p>
              <p className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded border border-blue-100 dark:border-blue-800 text-left">
                🚀 <strong>Dica rápida:</strong> Clique no <strong>Safari</strong> no Dock para ver meu último projeto, ou abra o <strong>Terminal</strong> para ver minhas skills.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center sm:justify-start gap-3 w-full">
              <a 
                href="https://www.linkedin.com/in/alexlancao/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0077b5] text-white px-4 py-2 rounded-md text-xs font-semibold shadow-sm hover:bg-[#005e93] transition-colors"
              >
                <User className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/lancao2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-xs font-semibold shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                <Code className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="  mt-5 text-[10px] text-slate-400 font-medium">
          Sistema Operacional Portfólio v1.0.2 © {new Date().getFullYear()} Alex Lançao
        </div>
      </div>
    </Window>
  );
}
