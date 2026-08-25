"use client";

import { Window } from "../Window";
import { Home, Search, Library, PlusSquare, Heart, Music2, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef } from "react";
import { useOS } from "@/contexts/OSContext";

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
  }
}

export function Spotify() {
  const { setSpotifyController, setSpotifyPlayback, spotifyPlayback, spotifyController } = useOS();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentController: any = null;
    const container = containerRef.current;
    if (!container) return;

    // Remove script se existir para forçar re-disparo do callback onSpotifyIframeApiReady
    const existingScript = document.getElementById("spotify-iframe-api");
    if (existingScript) {
      existingScript.remove();
    }

    // Limpa o container seguro do React e cria uma div alvo que a API do Spotify vai destruir
    container.innerHTML = "";
    const targetDiv = document.createElement("div");
    container.appendChild(targetDiv);

    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      const options = {
        uri: 'spotify:playlist:0vvXsWCC9xrXsKd4FyS8kM',
        theme: '0',
        width: '100%',
        height: '100%'
      };

      const callback = (EmbedController: any) => {
        currentController = EmbedController;
        setSpotifyController(EmbedController);
        
        EmbedController.addListener('playback_update', (e: any) => {
          setSpotifyPlayback(e.data);
        });
      };

      IFrameAPI.createController(targetDiv, options, callback);
    };

    // Injeta o script novamente
    const script = document.createElement("script");
    script.id = "spotify-iframe-api";
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (currentController) {
        currentController.destroy();
      }
      setSpotifyController(null);
      setSpotifyPlayback(null);
    };
  }, [setSpotifyController, setSpotifyPlayback]);

  return (
    <Window id="spotify" defaultWidth={950} defaultHeight={650}>
      <div className="flex flex-col h-full w-full bg-[#121212] text-[#B3B3B3] font-sans selection:bg-green-500/30 overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-60 bg-black flex flex-col shrink-0">
            {/* Nav Links */}
            <div className="px-6 pt-6 pb-4 space-y-4">
              <div className="flex items-center gap-4 text-white hover:text-white cursor-pointer transition-colors font-bold text-sm">
                <Home className="w-6 h-6" />
                Início
              </div>
              <div className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors font-bold text-sm">
                <Search className="w-6 h-6" />
                Buscar
              </div>
              <div className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors font-bold text-sm">
                <Library className="w-6 h-6" />
                Sua Biblioteca
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pt-4 pb-2 space-y-4">
              <div className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors font-bold text-sm group">
                <div className="w-6 h-6 bg-[#B3B3B3] group-hover:bg-white text-black flex items-center justify-center rounded-sm transition-colors">
                  <PlusSquare className="w-4 h-4 stroke-[2]" />
                </div>
                Criar playlist
              </div>
              <div className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors font-bold text-sm group">
                <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-blue-300 text-white flex items-center justify-center rounded-sm transition-colors">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                Músicas Curtidas
              </div>
            </div>

            <div className="border-t border-[#282828] mx-6 my-2" />

            {/* Playlists List */}
            <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3 text-sm font-medium">
              <p className="text-green-500 cursor-default truncate">Minha Playlist</p>
              <p className="hover:text-white cursor-pointer truncate">Lofi Vibes</p>
              <p className="hover:text-white cursor-pointer truncate">Deep Focus</p>
              <p className="hover:text-white cursor-pointer truncate">Synthwave Retrowave</p>
            </div>
            
            {/* Mini Player */}
            <div className="h-[80px] flex items-center px-4 border-t border-[#282828] gap-3 shrink-0">
              <div className="w-[50px] h-[50px] bg-slate-800 rounded relative overflow-hidden shrink-0 group">
                {spotifyPlayback?.track?.coverArt ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={spotifyPlayback.track.coverArt.url} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <Music2 className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500" />
                )}
                <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer z-10">
                  <Heart className="w-4 h-4 text-white hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col truncate flex-1">
                <span className="text-white text-sm hover:underline cursor-pointer truncate font-medium">
                  {spotifyPlayback?.track?.name || "Aguardando..."}
                </span>
                <span className="text-[11px] hover:underline cursor-pointer truncate text-[#B3B3B3]">
                  {spotifyPlayback?.track?.artists?.map((a: any) => a.name).join(", ") || "Dê play ao lado"}
                </span>
              </div>
              
              {/* Playback Controls (Optional for sidebar) */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => spotifyController?.togglePlay()}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {spotifyPlayback?.isPaused === false ? (
                    <Pause className="w-4 h-4 text-black fill-current" />
                  ) : (
                    <Play className="w-4 h-4 text-black fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Iframe Area */}
          <div className="flex-1 bg-gradient-to-b from-[#1e1e1e] to-[#121212] relative flex flex-col p-4">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl bg-black/50 flex items-center justify-center">
               <div ref={containerRef} className="w-full h-full" />
            </div>
          </div>
        </div>

      </div>
    </Window>
  );
}

