import React, { useState, useMemo } from 'react';
import { Search, Filter, Luggage, ShieldCheck, ChevronDown, Check, Zap } from 'lucide-react';
import { AirlineCode, FlightType, ItemCategory, ItemStatus, LuggageItem, LuggageLocation } from '../types';
import { LUGGAGE_ITEMS } from '../data/items';
import { searchLuggageItems } from '../utils/rulesEngine';
import { ItemResultCard } from './ItemResultCard';

interface CatalogViewProps {
  initialQuery?: string;
  onOpenBatteryCalc: (mah?: number) => void;
  onAddToPackingList: (item: LuggageItem, loc: 'mao' | 'despachada') => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  initialQuery = '',
  onOpenBatteryCalc,
  onAddToPackingList,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'todas'>('todas');
  const [flightType, setFlightType] = useState<FlightType>('domestico');
  const [airline, setAirline] = useState<AirlineCode>('TODAS');
  const [location, setLocation] = useState<LuggageLocation>('ambos');
  const [statusFilter, setStatusFilter] = useState<ItemStatus | 'todos'>('todos');

  const categories: { id: ItemCategory | 'todas'; label: string }[] = [
    { id: 'todas', label: 'Todos os itens' },
    { id: 'eletronicos', label: 'Eletrônicos & Baterias' },
    { id: 'liquidos', label: 'Líquidos & Higiene' },
    { id: 'medicamentos', label: 'Medicamentos & Saúde' },
    { id: 'alimentos', label: 'Alimentos & Bebidas' },
    { id: 'objetos', label: 'Objetos & Acessórios' },
    { id: 'especiais', label: 'Artigos Especiais & Esportes' },
  ];

  const filteredItems = useMemo(() => {
    let items = searchLuggageItems({
      query,
      category: selectedCategory,
      flightType,
      airline,
      location,
    });

    if (statusFilter !== 'todos') {
      items = items.filter((i) => {
        if (location === 'mao') return i.handLuggage.status === statusFilter;
        if (location === 'despachada') return i.checkedLuggage.status === statusFilter;
        return i.handLuggage.status === statusFilter || i.checkedLuggage.status === statusFilter;
      });
    }

    return items;
  }, [query, selectedCategory, flightType, airline, location, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* View Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1976F3] text-xs font-semibold">
          <Search className="w-3.5 h-3.5" />
          <span>Base de Dados Oficial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102746]">
          Catálogo Completo de Regras de Bagagem
        </h1>
        <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
          Pesquise por nome, sinônimo ou selecione por categoria. Cada item possui regras auditadas 
          para bagagem de mão e despachada na ANAC, LATAM, GOL e Azul.
        </p>
      </div>

      {/* Search & Filter Controls Panel */}
      <div className="bg-white rounded-2xl border border-[#DCE5F0] p-5 shadow-xs space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#1976F3] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o item desejado: ex: power bank, desodorante aerossol, dipirona, tesoura..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1976F3] focus:ring-2 focus:ring-[#1976F3]/15 rounded-xl text-sm outline-hidden font-medium text-[#102746]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Secondary Context Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          
          {/* Categoria */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">
              Categoria:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ItemCategory | 'todas')}
              aria-label="Filtrar por Categoria"
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-[#102746] focus:outline-hidden"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Tipo de Voo */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">
              Tipo de Voo:
            </label>
            <select
              value={flightType}
              onChange={(e) => setFlightType(e.target.value as FlightType)}
              aria-label="Filtrar por Tipo de Voo"
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-[#102746] focus:outline-hidden"
            >
              <option value="domestico">Voo Doméstico (Brasil)</option>
              <option value="internacional">Voo Internacional</option>
            </select>
          </div>

          {/* Companhia Aérea */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">
              Companhia Aérea:
            </label>
            <select
              value={airline}
              onChange={(e) => setAirline(e.target.value as AirlineCode)}
              aria-label="Filtrar por Companhia Aérea"
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-[#102746] focus:outline-hidden"
            >
              <option value="TODAS">Todas (Regras ANAC)</option>
              <option value="LATAM">LATAM Airlines</option>
              <option value="GOL">GOL Linhas Aéreas</option>
              <option value="AZUL">Azul Linhas Aéreas</option>
            </select>
          </div>

          {/* Onde Levar */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">
              Onde vai transportar:
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as LuggageLocation)}
              aria-label="Filtrar por Local de Transporte"
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-[#102746] focus:outline-hidden"
            >
              <option value="ambos">Ambas (Mão e Despachada)</option>
              <option value="mao">Apenas Bagagem de Mão</option>
              <option value="despachada">Apenas Despachada</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Exibindo <strong>{filteredItems.length}</strong> itens catalogados
        </span>
        {query && (
          <span>
            Buscando por: "<em>{query}</em>"
          </span>
        )}
      </div>

      {/* Results Items List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#102746]">
              Nenhum item encontrado para esta busca
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tente pesquisar por um sinônimo (ex: "carregador" em vez de "bateria") ou redefina os filtros.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('todas');
                setLocation('ambos');
              }}
              className="px-4 py-2 bg-[#1976F3] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          filteredItems.map((item) => (
            <ItemResultCard
              key={item.id}
              item={item}
              flightType={flightType}
              airline={airline}
              location={location}
              onOpenBatteryCalc={onOpenBatteryCalc}
              onAddToPackingList={onAddToPackingList}
            />
          ))
        )}
      </div>

    </div>
  );
};
