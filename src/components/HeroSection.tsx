import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, Plane, AlertCircle } from 'lucide-react';
import { AirlineCode, FlightType, LuggageItem, LuggageLocation } from '../types';
import { LUGGAGE_ITEMS } from '../data/items';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  flightType: FlightType;
  setFlightType: (f: FlightType) => void;
  airline: AirlineCode;
  setAirline: (a: AirlineCode) => void;
  location: LuggageLocation;
  setLocation: (l: LuggageLocation) => void;
  onSelectItem: (item: LuggageItem) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  flightType,
  setFlightType,
  airline,
  setAirline,
  location,
  setLocation,
  onSelectItem,
  inputRef,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions
  const suggestions = searchQuery.trim()
    ? LUGGAGE_ITEMS.filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(q) ||
          item.synonyms.some((s) => s.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      onSelectItem(suggestions[0]);
      setShowSuggestions(false);
    } else {
      // Find closest or show first matching
      const found = LUGGAGE_ITEMS.find(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.synonyms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      if (found) {
        onSelectItem(found);
      }
      setShowSuggestions(false);
    }
  };

  return (
    <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
      {/* Background soft ambient highlights */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-40 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Search Card */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#102746] tracking-tight leading-[1.12]">
                O que pode ir <br />
                na{' '}
                <span className="relative inline-block text-[#1976F3]">
                  sua mala?
                  {/* Subtle orange accent stroke under "sua mala?" as in mockup */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#F47736]"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8C50 3 150 3 198 9"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#718096] font-normal pt-1">
                Confira as regras antes de chegar ao aeroporto.
              </p>
            </div>

            {/* Main Search & Contextual Filter Card */}
            <div 
              ref={containerRef} 
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-blue-900/5 border border-[#DCE5F0] relative z-20 space-y-4"
            >
              {/* Search Field Input */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                  <div className="absolute left-4 pointer-events-none text-[#718096]">
                    <Search className="w-5 h-5 text-[#1976F3]" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Pesquise um item: power bank, perfume, remédio..."
                    className="w-full pl-12 pr-32 py-3.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white text-[#172B46] placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-[#1976F3] focus:ring-3 focus:ring-[#1976F3]/15 text-sm sm:text-base transition-all outline-hidden"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 sm:px-5 bg-[#1976F3] hover:bg-[#1664d1] active:bg-[#1253af] text-white rounded-lg font-medium text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4 hidden sm:inline" />
                    <span>Pesquisar</span>
                  </button>
                </div>

                {/* Autocomplete Suggestions Box */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-[#DCE5F0] py-2 z-50 divide-y divide-slate-100">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Sugestões de itens
                    </div>
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSearchQuery(item.name);
                          onSelectItem(item);
                          setShowSuggestions(false);
                        }}
                        className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-blue-50/70 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm font-medium text-[#172B46] group-hover:text-[#1976F3]">
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-400 hidden sm:inline">
                            ({item.category})
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                          item.handLuggage.status === 'permitido'
                            ? 'bg-emerald-50 text-emerald-700'
                            : item.handLuggage.status === 'permitido_com_condicoes'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {item.handLuggage.status === 'permitido'
                            ? 'Permitido na mão'
                            : item.handLuggage.status === 'permitido_com_condicoes'
                            ? 'Com condições'
                            : 'Proibido na mão'}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </form>

              {/* Sub-Filters: Tipo de voo, Companhia aérea, Onde vai levar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100">
                {/* 1. Tipo de voo */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#172B46] block">
                    Tipo de voo
                  </label>
                  <div className="flex items-center p-1 bg-slate-100/90 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setFlightType('domestico')}
                      className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all ${
                        flightType === 'domestico'
                          ? 'bg-[#1976F3] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Doméstico
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlightType('internacional')}
                      className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all ${
                        flightType === 'internacional'
                          ? 'bg-[#1976F3] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Internacional
                    </button>
                  </div>
                </div>

                {/* 2. Companhia aérea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#172B46] block">
                    Companhia aérea
                  </label>
                  <div className="relative">
                    <select
                      value={airline}
                      onChange={(e) => setAirline(e.target.value as AirlineCode)}
                      aria-label="Selecionar Companhia Aérea"
                      className="w-full appearance-none bg-slate-100/90 hover:bg-slate-100 text-[#172B46] text-xs font-medium py-2 px-3 pr-8 rounded-lg border border-transparent focus:border-[#1976F3] focus:bg-white focus:outline-hidden transition-all cursor-pointer"
                    >
                      <option value="LATAM">LATAM Airlines</option>
                      <option value="GOL">GOL Linhas Aéreas</option>
                      <option value="AZUL">Azul Linhas Aéreas</option>
                      <option value="TODAS">Todas (Regras ANAC)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Onde vai levar? */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#172B46] block">
                    Onde vai levar?
                  </label>
                  <div className="flex items-center p-1 bg-slate-100/90 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setLocation('mao')}
                      className={`flex-1 py-1.5 px-1.5 text-xs font-medium rounded-md transition-all ${
                        location === 'mao'
                          ? 'bg-[#1976F3] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Bagagem de mão
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocation('despachada')}
                      className={`flex-1 py-1.5 px-1.5 text-xs font-medium rounded-md transition-all ${
                        location === 'despachada'
                          ? 'bg-[#1976F3] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Despachada
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Popular Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-slate-500">
                <span className="font-medium text-slate-400">Consultas frequentes:</span>
                {['Power bank', 'Perfume', 'Medicamentos', 'Notebook', 'Tesoura', 'Vinho'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item);
                      const match = LUGGAGE_ITEMS.find((i) => i.name.toLowerCase().includes(item.toLowerCase()));
                      if (match) onSelectItem(match);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-[#1976F3] text-slate-600 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* International Flight Alert Banner if selected */}
            {flightType === 'internacional' && (
              <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Regra de voo internacional ativa:</span> Em voos para o exterior ou conexões internacionais, todos os líquidos na mala de mão devem ter no máximo 100 ml por frasco em saco plástico transparente de 1 litro.
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Hero Visual - Dedicated 3D Suitcase Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-sky-50 to-blue-100/50 group">
              {/* Dedicated 3D Suitcase Illustration */}
              <img
                src="./assets/mala_aberta_viagem.jpg"
                alt="Mala aberta azul organizada com roupas, fones de ouvido e acessórios de viagem em frente a janela do aeroporto"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Floating aesthetic badges matching mockup */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/80 shadow-lg flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#1976F3] flex items-center justify-center">
                  <Plane className="w-3.5 h-3.5 text-[#1976F3]" />
                </div>
                <div className="leading-tight">
                  <span className="text-[11px] font-bold text-[#102746] block">
                    Regras Oficiais
                  </span>
                  <span className="text-[10px] text-slate-500">ANAC, LATAM, GOL, Azul</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/80 shadow-lg flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#23A88A] animate-pulse" />
                <span className="text-xs font-bold text-[#102746]">
                  100% Verificado
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
