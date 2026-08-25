"use client";

import { useState } from "react";
import { Window } from "../Window";
import { Search, Building2, Calendar, Briefcase, ChevronRight, ChevronLeft, ArrowRight, UserCircle2 } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  color: string;
  descriptions: string[];
}

const experiences: Experience[] = [
  {
    id: "natuhair",
    company: "Natuhair",
    role: "Desenvolvedor Fullstack",
    period: "Jul 2025 – Atual",
    color: "bg-green-600",
    descriptions: [
      "Lidero tecnicamente o ecossistema digital da empresa, atuando em todo o ciclo de engenharia de software com Next.js, React, TypeScript, Tailwind CSS, Prisma e SQL.",
      "Idealizei e implementei a Natuhair Connect, intranet modular adotada pela empresa inteira, consolidando-se como o principal ecossistema de informação da companhia, com módulos dedicados a Logística, Comercial e TI.",
      "No módulo de TI, implementei Service Management com rastreabilidade completa dos chamados, eliminando a perda de requisições e o uso de planilhas isoladas, e viabilizando trabalho colaborativo simultâneo entre as equipes.",
      "Adicionei ao Connect geração de romaneios e acompanhamento em tempo real de notas fiscais em trânsito, otimizando a rotina do setor logístico.",
      "Expandindo o sistema com controle de saída de fábrica via QR Code, integração fiscal com SEFAZ/NF-e e ponto de venda com desconto em folha.",
      "Liderei a migração técnica e reformulação do e-commerce B2C (Projeto Avro), aplicando design minimalista para otimizar a jornada de compra do cliente."
    ]
  },
  {
    id: "umami",
    company: "UMAMI",
    role: "Desenvolvedor Fullstack",
    period: "Mar 2025 – Ago 2025",
    color: "bg-orange-500",
    descriptions: [
      "Atuei na migração de uma plataforma PHP/Laravel para Nest.js, utilizando Prisma ORM para integração com MySQL e MongoDB.",
      "Analisei código legado e propus refatorações para elevar qualidade e performance do sistema.",
      "Colaborei no planejamento técnico com a liderança e na evolução de UX/UI, trabalhando com Vue.js, TypeScript, Nest.js e Prisma."
    ]
  },
  {
    id: "wicomm",
    company: "Wicomm",
    role: "Desenvolvedor Front-end",
    period: "Jul 2024 – Out 2024",
    color: "bg-blue-600",
    descriptions: [
      "Desenvolvi interfaces responsivas para e-commerce na plataforma Wake, com HTML, CSS (Tailwind), JavaScript e Scriban, com foco em performance e UX."
    ]
  },
  {
    id: "shopper",
    company: "Shopper Supply",
    role: "Desenvolvedor Fullstack",
    period: "Nov 2022 – Fev 2024",
    color: "bg-purple-600",
    descriptions: [
      "Criei um sistema validador de planilhas de cadastro para e-commerce e plataformas de marketplace, automatizando a checagem de erros como quantidade de caracteres e categorização incorreta.",
      "A automação liberou o time de qualidade do monitoramento manual de erros, permitindo atuação mais analítica e estratégica focada em melhoria contínua do processo de cadastro.",
      "Desenvolvi interfaces modernas e responsivas com React, Next.js, TypeScript e Tailwind CSS, incluindo dashboards interativos.",
      "Integrei aplicações com back-ends em Django e Adonis.js, além de WordPress e bancos SQL, com foco em código limpo e soluções escaláveis."
    ]
  },
  {
    id: "kenzie",
    company: "Kenzie Academy Brasil",
    role: "Monitor Front-End",
    period: "Fev 2022 – Mai 2022",
    color: "bg-blue-500",
    descriptions: [
      "Dei suporte técnico, revisão de código e mentoria em HTML, CSS, JavaScript e React; conduzi dailies, sessões 1:1 e testes técnicos de avaliação."
    ]
  }
];

export function Contacts() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredExperiences = experiences.filter(exp => 
    exp.company.toLowerCase().includes(search.toLowerCase()) || 
    exp.role.toLowerCase().includes(search.toLowerCase())
  );

  const selectedExp = selectedId ? experiences.find(e => e.id === selectedId) : null;

  return (
    <Window id="contacts" defaultWidth={750} defaultHeight={500}>
      <div className="flex flex-col h-full w-full text-slate-800 dark:text-slate-200">
        
        {/* Toolbar */}
        <div className="h-14 border-b border-black/10 dark:border-white/10 flex items-center px-2 sm:px-4 justify-between bg-transparent gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <button disabled className="p-1 rounded text-slate-500 transition-colors opacity-30">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button disabled className="p-1 rounded text-slate-500 transition-colors opacity-30">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <span className="font-semibold text-sm sm:text-base truncate">Todos os Contatos</span>
          </div>

          <div className="relative shrink-0">
            <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-sm bg-black/5 dark:bg-white/10 border border-transparent rounded-md focus:outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-black transition-all w-28 sm:w-48"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Sidebar */}
          <div className={`w-full sm:w-64 bg-black/5 dark:bg-white/5 border-r border-black/10 dark:border-white/10 overflow-y-auto shrink-0 flex-col ${selectedId ? 'hidden sm:flex' : 'flex'}`}>
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-black/5 dark:bg-white/5 backdrop-blur-md">
              Empresas
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredExperiences.map(exp => (
                <div 
                  key={exp.id}
                  onClick={() => setSelectedId(prev => prev === exp.id ? null : exp.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    selectedId === exp.id 
                      ? 'bg-blue-500 text-white shadow-sm' 
                      : 'hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {/* Mini Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-inner ${selectedId === exp.id ? 'bg-white/20' : exp.color}`}>
                    {exp.company.charAt(0)}
                  </div>
                  
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold truncate">{exp.company}</span>
                    <span className={`text-[10px] truncate ${selectedId === exp.id ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {exp.role}
                    </span>
                  </div>
                </div>
              ))}
              
              {filteredExperiences.length === 0 && (
                <div className="text-center text-xs text-slate-500 mt-4">Nenhum resultado encontrado.</div>
              )}
            </div>
          </div>
          
          {/* Main Content (Contact Details or Empty State) */}
          <div className={`flex-1 bg-transparent overflow-y-auto ${!selectedId ? 'hidden sm:flex' : 'flex'}`}>
            {selectedExp ? (
              <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 flex flex-col items-center">
                
                {/* Back button for mobile */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="sm:hidden self-start mb-4 flex items-center gap-1 text-blue-500 font-medium bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Voltar
                </button>

                {/* Contact Header */}
                <div className="flex flex-col items-center mb-8">
                  <div className={`w-28 h-28 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl mb-4 border-4 border-white/20 dark:border-white/10 ${selectedExp.color}`}>
                    {selectedExp.company.charAt(0)}
                  </div>
                  <h2 className="text-3xl font-bold mb-1">{selectedExp.company}</h2>
                  <p className="text-sm text-slate-500 font-medium">{selectedExp.role}</p>
                </div>
                
                {/* Contact Fields */}
                <div className="w-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl shadow-sm p-2">
                  
                  <div className="flex flex-col sm:flex-row px-4 py-3 border-b border-black/5 dark:border-white/5 last:border-0 gap-1 sm:gap-0">
                    <div className="w-full sm:w-24 text-xs font-bold text-slate-400 flex items-center gap-2 shrink-0">
                      <Briefcase className="w-3.5 h-3.5" /> CARGO
                    </div>
                    <div className="text-sm font-medium">
                      {selectedExp.role}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row px-4 py-3 border-b border-black/5 dark:border-white/5 last:border-0 gap-1 sm:gap-0">
                    <div className="w-full sm:w-24 text-xs font-bold text-slate-400 flex items-center gap-2 shrink-0">
                      <Calendar className="w-3.5 h-3.5" /> PERÍODO
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {selectedExp.period}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row px-4 py-3 border-b border-black/5 dark:border-white/5 last:border-0 gap-1 sm:gap-0">
                    <div className="w-full sm:w-24 text-xs font-bold text-slate-400 flex items-start gap-2 shrink-0 pt-0.5">
                      <UserCircle2 className="w-3.5 h-3.5" /> NOTAS
                    </div>
                    <div className="text-sm font-medium space-y-3 pb-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedExp.descriptions.map((desc, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner border border-black/10 dark:border-white/10">
                  <UserCircle2 className="w-12 h-12 text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">Seus Contatos Profissionais</h2>
                <p className="max-w-sm text-sm leading-relaxed">
                  Bem-vindo à minha rede de conexões! Nesta agenda, você não encontrará telefones ou e-mails comuns, mas sim o meu <strong>histórico profissional</strong>. 
                  <br/><br/>
                  Selecione uma empresa na lista ao lado para explorar meu cargo, o período em que atuei e as soluções que construí.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </Window>
  );
}

