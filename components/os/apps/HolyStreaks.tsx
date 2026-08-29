"use client";

import { ArrowUpRight, Info } from "lucide-react";
import { useState } from "react";
import { Window } from "../Window";

const HOLYSTREAKS_URL = "https://holy-streaks.vercel.app/";

export function HolyStreaks() {
  const [isLoading, setIsLoading] = useState(true);

  const openInNewTab = () => {
    window.open(HOLYSTREAKS_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Window id="holystreaks" defaultWidth={420} defaultHeight={820}>
      <div className="flex h-full w-full flex-col bg-white overflow-hidden rounded-b-xl">
        <div className="flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md px-4 py-3 shrink-0 z-20">
          <div className="flex items-center gap-3 text-slate-700">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-800">
              H
            </div>
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-600">HolyStreaks</span>
          </div>

          <button
            type="button"
            onClick={openInNewTab}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            Nova aba
          </button>
        </div>
        <div className="bg-blue-50/80 px-4 py-2 border-b border-blue-100/50 flex items-start gap-2.5 shrink-0 z-10 backdrop-blur-sm">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-blue-800 leading-snug">
            Navegadores bloqueiam login dentro de janelas embutidas (iframes). Para fazer login, abra o app em uma <strong>Nova aba</strong>.
          </p>
        </div>
        <div className="relative flex-1 bg-white">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 text-sm font-medium text-slate-600 backdrop-blur-sm">
              Carregando HolyStreaks...
            </div>
          )}

          <iframe
            src={HOLYSTREAKS_URL}
            title="HolyStreaks"
            className="h-full w-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </Window>
  );
}
