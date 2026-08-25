"use client";

import { useState, useEffect } from "react";
import { Window } from "../Window";
import { ChevronLeft, ChevronRight, Folder, FileText, Search, Cloud, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

// --- Sistema de Arquivos Virtual ---
type FileType = "folder" | "file";

interface FileNode {
  id: string;
  name: string;
  type: FileType;
  parentId: string | null;
  content?: string;
}

const mockFileSystem: FileNode[] = [
  { id: "root", name: "Macintosh HD", type: "folder", parentId: null },
  { id: "projetos", name: "Projetos", type: "folder", parentId: "root" },
  { id: "downloads", name: "Downloads", type: "folder", parentId: "root" },
  { id: "documentos", name: "Documentos", type: "folder", parentId: "root" },
  { id: "imagens", name: "Imagens", type: "folder", parentId: "root" },
  
  // Arquivos em Projetos
  { id: "proj1", name: "Portfolio.txt", type: "file", parentId: "projetos", content: "Projeto de portfólio estilo macOS construído com Next.js, Tailwind e Framer Motion." },
  { id: "proj2", name: "E-Commerce.txt", type: "file", parentId: "projetos", content: "Plataforma de vendas online com integração Stripe e painel administrativo completo." },
  { id: "proj3", name: "Dashboard.txt", type: "file", parentId: "projetos", content: "Dashboard de análise de dados com gráficos em tempo real utilizando React." },
  { id: "proj_folder", name: "Arquivos Antigos", type: "folder", parentId: "projetos" },

  // Arquivos em Arquivos Antigos
  { id: "old1", name: "Site_V1.txt", type: "file", parentId: "proj_folder", content: "Versão antiga do site feita em puro HTML/CSS." },

  // Arquivos em Downloads
  { id: "down1", name: "Curriculo_Alex.pdf", type: "file", parentId: "downloads", content: "[Conteúdo do PDF]" }
];

export function Finder() {
  const { data: session } = useSession();

  // Navegação
  const [history, setHistory] = useState<string[]>(["projetos"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Estado de arquivo selecionado
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // Estado do Google Drive
  const [driveFiles, setDriveFiles] = useState<FileNode[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);

  const currentFolderId = history[currentIndex];
  const isDriveFolder = currentFolderId === "drive" || (!mockFileSystem.some(f => f.id === currentFolderId) && currentFolderId !== "projetos");
  
  // Carrega arquivos do Drive dinamicamente se estivermos em uma pasta do drive e logados
  useEffect(() => {
    if (isDriveFolder && session && (session as any).accessToken) {
      const driveFolderId = currentFolderId === "drive" ? "root" : currentFolderId;
      
      // Se já buscamos essa pasta antes, não precisamos buscar denovo
      const alreadyFetched = driveFiles.some(f => f.parentId === currentFolderId);
      if (alreadyFetched) return;

      setIsLoadingDrive(true);
      
      // Query para a API oficial do Google Drive
      fetch(`https://www.googleapis.com/drive/v3/files?q="${driveFolderId}" in parents and trashed=false&fields=files(id,name,mimeType)`, {
        headers: { Authorization: `Bearer ${(session as any).accessToken}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.files) {
          const newNodes: FileNode[] = data.files.map((file: any) => ({
            id: file.id,
            name: file.name,
            type: file.mimeType === "application/vnd.google-apps.folder" ? "folder" : "file",
            parentId: currentFolderId,
            content: "Arquivo remoto do Google Drive" 
          }));
          
          setDriveFiles(prev => {
            // Remove antigos se houver e adiciona os novos para evitar duplicatas em re-fetch
            const filtered = prev.filter(f => f.parentId !== currentFolderId);
            return [...filtered, ...newNodes];
          });
        }
      })
      .catch(console.error)
      .finally(() => setIsLoadingDrive(false));
    }
  }, [currentFolderId, session, isDriveFolder, driveFiles]);

  // Itens da pasta atual
  const currentItems = (isDriveFolder
    ? driveFiles.filter(f => f.parentId === currentFolderId)
    : mockFileSystem.filter(f => f.parentId === currentFolderId)
  ).sort((a, b) => {
    // Primeiro ordena por tipo (pastas antes de arquivos)
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }
    // Depois ordena por nome alfabeticamente
    return a.name.localeCompare(b.name);
  });

  const currentFolderMock = mockFileSystem.find(f => f.id === currentFolderId);
  const currentFolderDrive = driveFiles.find(f => f.id === currentFolderId);
  
  let folderName = "Google Drive";
  if (!isDriveFolder) {
    folderName = currentFolderMock?.name || "";
  } else if (currentFolderId !== "drive") {
    folderName = currentFolderDrive?.name || "Pasta Remota";
  }

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    setSelectedFileId(null);
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) setCurrentIndex(prev => prev + 1);
    setSelectedFileId(null);
  };

  const navigateTo = (folderId: string) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(folderId);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setSelectedFileId(null);
  };

  const handleDoubleClick = (file: FileNode) => {
    if (file.type === "folder") {
      navigateTo(file.id);
    } else {
      setSelectedFileId(file.id);
    }
  };

  const selectedFile = isDriveFolder 
    ? driveFiles.find(f => f.id === selectedFileId)
    : mockFileSystem.find(f => f.id === selectedFileId);

  return (
    <Window id="finder" defaultWidth={850} defaultHeight={550}>
      <div className="flex flex-col h-full w-full text-slate-800 dark:text-slate-200">
        
        {/* Barra Superior de Ferramentas (Toolbar) */}
        <div className="h-14 border-b border-black/10 dark:border-white/10 flex items-center px-4 justify-between bg-transparent">
          <div className="flex items-center gap-4">
            {/* Navegação */}
            <div className="flex items-center gap-1">
              <button 
                onClick={handleBack} 
                disabled={currentIndex === 0}
                className="p-1 rounded text-slate-500 hover:bg-black/5 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleForward}
                disabled={currentIndex === history.length - 1}
                className="p-1 rounded text-slate-500 hover:bg-black/5 disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <span className="font-semibold">{folderName}</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar" 
              className="pl-8 pr-3 py-1.5 text-sm bg-black/5 dark:bg-white/10 border border-transparent rounded-md focus:outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-black transition-all w-48"
            />
          </div>
        </div>

        {/* Corpo do Finder */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full sm:w-48 bg-black/5 dark:bg-white/5 border-b sm:border-b-0 sm:border-r border-black/10 dark:border-white/10 p-2 sm:p-3 overflow-x-auto sm:overflow-y-auto shrink-0 flex items-center sm:block [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <h3 className="hidden sm:block text-xs font-bold text-slate-400 mb-2 px-2">FAVORITOS</h3>
            <ul className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-1 text-sm font-medium w-max sm:w-full">
              {[
                { id: 'projetos', label: 'Projetos' },
                { id: 'downloads', label: 'Downloads' },
                { id: 'documentos', label: 'Documentos' },
                { id: 'imagens', label: 'Imagens' },
                { id: 'drive', label: 'Google Drive', icon: Cloud }
              ].map(shortcut => (
                <li 
                  key={shortcut.id}
                  onClick={() => navigateTo(shortcut.id)}
                  className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors flex items-center gap-2 ${
                    currentFolderId === shortcut.id 
                      ? 'bg-blue-500 text-white shadow-sm' 
                      : 'hover:bg-black/10 dark:hover:bg-white/10'
                  }`}
                >
                  {shortcut.icon && <shortcut.icon className={`w-4 h-4 ${currentFolderId === shortcut.id ? 'text-white' : 'text-blue-400'}`} />}
                  {shortcut.label}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto relative">
              
              {/* Tratamento para o Google Drive Deslogado */}
              {isDriveFolder && !session && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <Cloud className="w-16 h-16 text-slate-300 mb-4" />
                  <h2 className="text-xl font-bold mb-2">Google Drive Desconectado</h2>
                  <p className="text-sm text-slate-500 max-w-sm">
                    Para visualizar seus arquivos da nuvem, conecte-se com sua conta Google através do menu da Maçã no canto superior esquerdo da tela.
                  </p>
                </div>
              )}

              {/* Tratamento para Loading do Drive */}
              {isDriveFolder && session && isLoadingDrive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              )}

              {/* Grid de Arquivos */}
              {(!isDriveFolder || (isDriveFolder && session && !isLoadingDrive)) && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 items-start">
                  {currentItems.map(file => (
                    <div 
                      key={file.id} 
                      onClick={() => setSelectedFileId(file.id)}
                      onDoubleClick={() => handleDoubleClick(file)}
                      className={`flex flex-col items-center gap-1 cursor-pointer p-2 rounded-lg transition-colors w-[80px] ${
                        selectedFileId === file.id ? 'bg-blue-500/20 ring-1 ring-blue-500/50' : 'hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center text-blue-500">
                        {file.type === "folder" ? (
                          <Folder className="w-12 h-12 fill-blue-200 shrink-0" strokeWidth={1} />
                        ) : (
                          <FileText className="w-10 h-10 text-slate-500 shrink-0" strokeWidth={1} />
                        )}
                      </div>
                      <span className="text-xs text-center font-medium line-clamp-2 leading-tight px-1 w-full break-words">
                        {file.name}
                      </span>
                    </div>
                  ))}
                  
                  {currentItems.length === 0 && (!isDriveFolder || (isDriveFolder && session && !isLoadingDrive)) && (
                    <div className="col-span-full h-32 flex items-center justify-center text-slate-400 text-sm">
                      Esta pasta está vazia.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Painel de Preview Lateral */}
            {selectedFile && selectedFile.type === "file" && (
              <div className="w-full sm:w-64 border-t sm:border-t-0 sm:border-l border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 flex flex-col shrink-0 max-h-[40%] sm:max-h-full overflow-y-auto">
                <div className="hidden sm:flex justify-center mb-4 mt-8">
                  <FileText className="w-24 h-24 text-slate-400" strokeWidth={0.5} />
                </div>
                <h3 className="text-center font-semibold text-lg sm:mb-4 break-words">{selectedFile.name}</h3>
                
                <div className="hidden sm:block text-xs text-slate-500 uppercase font-bold mb-1 border-b border-black/10 pb-1">Informações</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 break-words">
                  {selectedFile.content}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </Window>
  );
}
