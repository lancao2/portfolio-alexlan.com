"use client";

import { Window } from "../Window";
import { Bell, Search, Home, Calendar, Users, FileText, Gift, LayoutDashboard, Megaphone, Info } from "lucide-react";
import Image from "next/image";

export function Natuhair() {
  return (
    <Window id="natuhair" defaultWidth={1100} defaultHeight={750}>
      <div className="flex h-full w-full bg-[#F5F5F7] text-[#1D1D1F] overflow-hidden font-sans">
        
        {/* Sidebar Mock */}
        <div className="w-[240px] bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="relative w-36 h-10">
              <Image src="/icons/Logo_NatuhairConnect.svg" alt="Natuhair Logo" fill className="object-contain object-left" />
            </div>
          </div>
          <div className="p-4 flex-1 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2.5 bg-pink-50 text-pink-700 rounded-lg font-medium cursor-pointer">
              <Home className="w-5 h-5" /> Início
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium cursor-pointer">
              <LayoutDashboard className="w-5 h-5" /> Departamentos
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium cursor-pointer">
              <Users className="w-5 h-5" /> Diretório
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium cursor-pointer">
              <FileText className="w-5 h-5" /> Documentos
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold">
              AL
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Alex Lançao</span>
              <span className="text-xs text-gray-500">Desenvolvimento</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <div className="h-16 bg-white flex items-center justify-between px-8 shrink-0">
            <div className="relative w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar no portal..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm outline-none focus:ring-2 focus:ring-pink-500/20"
                readOnly
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Dashboard Scroll Area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-[1200px] mx-auto space-y-8">
              
              <header>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Olá, Alex 👋</h1>
                <p className="text-gray-500 mt-1">Bem-vindo ao preview interativo do Natuhair Connect.</p>
              </header>

              {/* Portfolio Presentation Alert */}
              <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-pink-900 text-lg">Sobre este projeto no Portfólio</h3>
                  <p className="text-pink-800 text-sm mt-1 leading-relaxed">
                    O <strong>Natuhair Connect</strong> é um portal corporativo real (intranet) com dezenas de módulos operacionais, incluindo Logística, Controle Financeiro, Comercial, Almoxarifado e Help Desk. Esta janela apresenta uma réplica estática da interface principal (Home Page) para fins demonstrativos. No mundo real, a plataforma é conectada a bancos de dados robustos e sistemas ERP, processando fluxos de trabalho e métricas cruciais da empresa.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* Hero Banner with Background Image */}
                  <div className="w-full h-[280px] bg-pink-600 rounded-2xl p-8 text-white flex flex-col justify-end relative overflow-hidden shadow-sm">
                    <Image 
                      src="/images/BG_loginPage.png" 
                      alt="Banner Background" 
                      fill 
                      className="object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-3 border border-white/10">
                        Comunicado em Destaque
                      </span>
                      <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-md">Novo Portal Lançado</h2>
                      <p className="text-pink-50 max-w-md drop-shadow-md font-medium">
                        Bem-vindo ao Natuhair Connect! A nova plataforma interna unificada para toda a nossa comunicação corporativa.
                      </p>
                    </div>
                  </div>

                  {/* Mural */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-pink-600" /> Mural de Comunicados
                    </h3>
                    <div className="grid gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                          <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center shrink-0 font-bold">
                            rh
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Atualização de Benefícios</h4>
                            <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">
                              Confira as novas parcerias e descontos exclusivos para colaboradores nas redes cadastradas a partir deste mês.
                            </p>
                            <span className="text-xs text-gray-400 font-medium">Há {i * 2} horas</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Birthdays */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Gift className="w-5 h-5 text-pink-500" /> Aniversariantes
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 p-[2px]">
                          <div className="w-full h-full bg-white rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-pink-500">
                            MA
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">Maria Silva</span>
                          <span className="text-xs text-pink-500 font-medium">Hoje</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                          JP
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-700">João Pedro</span>
                          <span className="text-xs text-gray-500">Amanhã</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-2 bg-pink-50 text-pink-600 rounded-lg text-sm font-medium hover:bg-pink-100 transition-colors">
                      Ver todos
                    </button>
                  </div>

                  {/* Upcoming Event */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-500" /> Próximo Evento
                      </h3>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <div className="text-blue-600 font-bold text-sm mb-1">Reunião Geral (Townhall)</div>
                      <div className="text-blue-900 font-medium text-xs mb-3">Sexta-feira, 15:00</div>
                      <p className="text-blue-700/80 text-xs">Apresentação dos resultados do trimestre e próximos passos.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </Window>
  );
}
