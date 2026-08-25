"use client";

import { useState, useEffect } from "react";
import { Window } from "../Window";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { ArrowUp, UserCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "alex" | "user";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    sender: "alex",
    text: "Olá! Tudo bem? 👋",
    time: "Agora"
  },
  {
    id: "2",
    sender: "alex",
    text: "Eu sou o Alex Lançao. Muito obrigado por visitar o meu portfólio!",
    time: "Agora"
  },
  {
    id: "3",
    sender: "alex",
    text: "Estou sempre aberto a bater um papo sobre tecnologia, novos projetos e parcerias de negócios. Como posso te ajudar hoje?",
    time: "Agora"
  }
];

import { useOS } from "@/contexts/OSContext";

let hasInitialized = false;

export function Messages() {
  const { data: session, status } = useSession();
  const { activeApp, setNotification } = useOS();
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    // Wait until session is loaded to determine greeting name
    if (status === "loading" || hasInitialized) return;

    const savedHistory = localStorage.getItem("portfolio_chat_history");
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
      setInteractionCount(1); // Assume already interacted
      hasInitialized = true;
      return;
    }

    const firstName = session?.user?.name?.split(" ")[0] || "";
    const greetingMsg = firstName ? `Olá, ${firstName}! Tudo bem? 👋` : "Olá! Tudo bem? 👋";

    const INITIAL_MESSAGES: ChatMessage[] = [
      { id: "1", sender: "alex", text: greetingMsg, time: "Agora" },
      { id: "2", sender: "alex", text: "Eu sou o Alex Lançao. Muito obrigado por visitar o meu portfólio!", time: "Agora" },
      { id: "3", sender: "alex", text: "Estou sempre aberto a bater um papo sobre tecnologia, novos projetos e parcerias de negócios. Como posso te ajudar hoje?", time: "Agora" }
    ];

    const runSequence = async () => {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1200));
      setMessages([INITIAL_MESSAGES[0]]);
      
      await new Promise(r => setTimeout(r, 500));
      
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2000));
      setMessages([INITIAL_MESSAGES[0], INITIAL_MESSAGES[1]]);
      
      await new Promise(r => setTimeout(r, 600));

      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2500));
      setMessages([...INITIAL_MESSAGES]);
      
      setIsTyping(false);
      hasInitialized = true;
    };

    runSequence();
  }, [session, status]);

  // Se já inicializou em outra montagem, restaura a versão genérica/atual
  useEffect(() => {
    if (hasInitialized && messages.length === 0) {
      const savedHistory = localStorage.getItem("portfolio_chat_history");
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
        return;
      }

      const firstName = session?.user?.name?.split(" ")[0] || "";
      const greetingMsg = firstName ? `Olá, ${firstName}! Tudo bem? 👋` : "Olá! Tudo bem? 👋";
      setMessages([
        { id: "1", sender: "alex", text: greetingMsg, time: "Agora" },
        { id: "2", sender: "alex", text: "Eu sou o Alex Lançao. Muito obrigado por visitar o meu portfólio!", time: "Agora" },
        { id: "3", sender: "alex", text: "Estou sempre aberto a bater um papo sobre tecnologia, novos projetos e parcerias de negócios. Como posso te ajudar hoje?", time: "Agora" }
      ]);
    }
  }, [hasInitialized, session, messages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !session) return;

    const userMessageText = inputText.trim();
    setInputText("");
    setIsSending(true);

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userMessageText,
      time: "Agora"
    };
    
    setMessages(prev => {
      const newHistory = [...prev, newUserMsg];
      localStorage.setItem("portfolio_chat_history", JSON.stringify(newHistory));
      return newHistory;
    });

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userMessageText })
      });

      if (!res.ok) {
        throw new Error("Falha ao enviar");
      }

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        
        let replyText = "";
        if (interactionCount === 0) {
          replyText = "Mensagem recebida! Acabei de ser notificado por e-mail. Poderia me deixar também um número de telefone ou WhatsApp para eu te chamar mais rápido?";
        } else {
          replyText = "Perfeito, anotado! Entrarei em contato em breve. Um abraço! 🚀";
        }

        setMessages(prev => {
          const newHistory = [...prev, {
            id: (Date.now() + 1).toString(),
            sender: "alex" as const,
            text: replyText,
            time: "Agora"
          }];
          localStorage.setItem("portfolio_chat_history", JSON.stringify(newHistory));
          return newHistory;
        });
        setInteractionCount(prev => prev + 1);
        
        // Sempre envia a notificação quando o sistema responde!
        setNotification("messages", 1);
      }, 2000);

    } catch (error) {
      console.error(error);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => {
          const newHistory = [...prev, {
            id: (Date.now() + 1).toString(),
            sender: "alex" as const,
            text: "Poxa, ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
            time: "Agora"
          }];
          localStorage.setItem("portfolio_chat_history", JSON.stringify(newHistory));
          return newHistory;
        });
      }, 1000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Window id="messages" defaultWidth={800} defaultHeight={550}>
      <div className="flex h-full w-full bg-white/80 dark:bg-black/80 backdrop-blur-3xl text-slate-800 dark:text-slate-200">
        
        {/* Sidebar (Chat List) */}
        <div className="hidden sm:flex w-64 border-r border-black/10 dark:border-white/10 flex-col shrink-0">
          <div className="h-14 border-b border-black/10 dark:border-white/10 flex items-center px-4 bg-white/40 dark:bg-black/40 backdrop-blur-md">
            <input 
              type="text" 
              placeholder="Buscar" 
              className="w-full pl-3 pr-3 py-1.5 text-sm bg-black/5 dark:bg-white/10 border border-transparent rounded-md focus:outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto p-2 bg-white/20 dark:bg-black/20">
            
            {/* Active Chat Item */}
            <div className="flex items-center gap-3 px-3 py-2 bg-blue-500 rounded-lg text-white shadow-sm cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden shrink-0 border border-white/20 relative">
                <Image 
                  src="https://github.com/lancao2.png" 
                  alt="Alex Lançao" 
                  fill 
                  sizes="40px"
                  className="object-cover" 
                />
              </div>
              <div className="flex flex-col overflow-hidden w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold text-sm truncate">Alex Lançao</span>
                  <span className="text-[10px] text-blue-100 shrink-0">Hoje</span>
                </div>
                <span className="text-xs text-blue-100 truncate">Estou sempre aberto a bater...</span>
              </div>
            </div>

          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative bg-white/40 dark:bg-black/40">
          
          {/* Chat Header */}
          <div className="h-14 border-b border-black/10 dark:border-white/10 flex items-center justify-between px-6 bg-white/60 dark:bg-black/60 backdrop-blur-xl absolute top-0 w-full z-10">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-slate-500 mr-2">Para:</span>
              <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                Alex Lançao
              </div>
            </div>
            <div className="text-xs text-slate-400 font-medium">iMessage</div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 pt-20 space-y-4 flex flex-col">
            <div className="text-center text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
              Hoje
            </div>

            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col gap-1 max-w-[75%]">
                    <div className={`px-4 py-2 text-[14px] leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-2xl rounded-br-sm' 
                        : 'bg-white dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-black/5 dark:border-white/5 rounded-2xl rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className={`text-[10px] text-slate-400 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  key="typing"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex w-full justify-start"
                >
                  <div className="bg-white dark:bg-white/10 border border-black/5 dark:border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1.5 items-center">
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-t border-black/10 dark:border-white/10 z-10 shrink-0">
            {session ? (
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="iMessage"
                  disabled={isSending}
                  className="w-full pl-4 pr-10 py-2 text-sm bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-full focus:outline-none focus:border-blue-500 shadow-sm disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isSending}
                  className="absolute right-2 w-7 h-7 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
                >
                  <ArrowUp className="w-4 h-4 stroke-[3]" />
                </button>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between bg-black/5 dark:bg-white/5 rounded-xl p-3 border border-black/5 dark:border-white/5 gap-3 sm:gap-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <UserCircle2 className="w-8 h-8 text-slate-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Identificação Necessária</span>
                    <span className="text-[10px] sm:text-xs text-slate-500">Faça login com o Google para me enviar mensagens.</span>
                  </div>
                </div>
                <button 
                  onClick={() => signIn("google")}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-colors w-full sm:w-auto shrink-0"
                >
                  Fazer Login
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </Window>
  );
}

