"use client";

import { Window } from "../Window";
import { ChevronLeft, ChevronRight, RotateCw, Plus, LayoutGrid, Shield } from "lucide-react";
import { useState } from "react";

export function Safari() {
  const [url, setUrl] = useState("ayo.avrocosmeticos.com.br");

  return (
    <Window id="safari" defaultWidth={1000} defaultHeight={700}>
      <div className="flex flex-col h-full w-full bg-[#f6f6f6] text-black font-sans rounded-b-xl overflow-hidden shadow-inner border border-black/10">
        
        {/* Safari Toolbar */}
        <div className="h-12 bg-[#f6f6f6] border-b border-gray-300 flex items-center px-4 justify-between shrink-0 select-none">
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-4 text-gray-500 w-[120px]">
            <ChevronLeft className="w-5 h-5 cursor-not-allowed opacity-50" />
            <ChevronRight className="w-5 h-5 cursor-not-allowed opacity-50" />
          </div>

          {/* URL Bar */}
          <div className="flex-1 max-w-[600px] flex items-center justify-center">
            <div className="w-full h-8 bg-white/80 border border-black/10 shadow-sm rounded-md flex items-center px-3 relative focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition-all">
              <Shield className="w-3 h-3 text-gray-800 absolute left-3" />
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent text-sm text-center font-medium outline-none text-gray-800"
              />
              <RotateCw className="w-3.5 h-3.5 text-gray-500 absolute right-3 cursor-pointer hover:text-black transition-colors" />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 text-gray-500 w-[120px] justify-end">
            <Plus className="w-5 h-5 cursor-pointer hover:text-black transition-colors" />
            <LayoutGrid className="w-4 h-4 cursor-pointer hover:text-black transition-colors" />
          </div>

        </div>

        {/* Tab Bar (Optional visual touch) */}
        <div className="h-8 bg-[#e8e8e8] border-b border-gray-300 flex items-center px-2 shrink-0">
          <div className="px-4 h-full bg-white border-x border-gray-300 flex items-center gap-2 min-w-[200px] text-xs font-semibold text-gray-700 shadow-sm relative">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Ayo Cosméticos
            <div className="absolute right-2 text-gray-400 hover:text-gray-800 cursor-pointer font-normal text-lg leading-none">×</div>
          </div>
        </div>

        {/* Browser Viewport */}
        <div className="flex-1 bg-white relative">
          <iframe 
            src="https://ayo.avrocosmeticos.com.br" 
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            title="Ayo Cosméticos"
          />
        </div>

      </div>
    </Window>
  );
}

