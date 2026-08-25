"use client";

import { Window } from "../Window";
import { Download, FileText } from "lucide-react";

export function Resume() {
  return (
    <Window id="resume" defaultWidth={700} defaultHeight={650}>
      <div className="flex flex-col h-full w-full bg-[#323639] text-white rounded-b-xl overflow-hidden shadow-inner border border-black/10">
        
        {/* PDF Viewer Toolbar */}
        <div className="h-12 bg-[#323639] border-b border-black/30 flex items-center px-4 justify-between shrink-0 select-none shadow-sm z-10">
          
          {/* Left Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-sm font-medium text-gray-200">Alex_Lancao_Curriculo.pdf</span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center">
            <a 
              href="/curriculo.pdf" 
              download="Alex_Lancao_Curriculo.pdf"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              Baixar PDF
            </a>
          </div>

        </div>

        {/* PDF Viewer Viewport */}
        <div className="flex-1 w-full bg-[#525659] relative">
          <iframe 
            src="/curriculo.pdf#toolbar=0&navpanes=0&scrollbar=0" 
            className="w-full h-full border-none"
            title="Currículo - Alex Lançao"
          />
        </div>

      </div>
    </Window>
  );
}

