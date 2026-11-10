import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Luggage, 
  CheckSquare, 
  Square, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  Printer, 
  Sparkles, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { 
  getSavedQueries, 
  removeSavedQuery, 
  getPackingChecklist, 
  savePackingChecklist, 
  PackingListItem 
} from '../utils/rulesEngine';
import { LuggageItem } from '../types';
import { LUGGAGE_ITEMS } from '../data/items';

interface MyLuggageViewProps {
  onSearchItemName: (name: string) => void;
}

export const MyLuggageView: React.FC<MyLuggageViewProps> = ({ onSearchItemName }) => {
  const [queries, setQueries] = useState<{ id: string; query: string; timestamp: number }[]>([]);
  const [checklist, setChecklist] = useState<PackingListItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemLocation, setNewItemLocation] = useState<'mao' | 'despachada'>('mao');

  useEffect(() => {
    setQueries(getSavedQueries());
    setChecklist(getPackingChecklist());
  }, []);

  const handleRemoveQuery = (id: string) => {
    removeSavedQuery(id);
    setQueries(getSavedQueries());
  };

  const handleTogglePacked = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, isPacked: !item.isPacked } : item
    );
    setChecklist(updated);
    savePackingChecklist(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = checklist.filter((item) => item.id !== id);
    setChecklist(updated);
    savePackingChecklist(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    // Check if item is known to have restrictions (e.g. power bank in checked luggage)
    const lower = newItemName.toLowerCase();
    const isPowerBank = lower.includes('power bank') || lower.includes('carregador portátil') || lower.includes('bateria');
    let warningNote = undefined;
    let status: PackingListItem['status'] = 'permitido';

    if (isPowerBank && newItemLocation === 'despachada') {
      warningNote = 'ALERTA DE SEGURANÇA: Baterias e power banks são proibidos no porão pela ANAC! Mude para bagagem de mão.';
      status = 'nao_permitido';
    }

    const newItem: PackingListItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      location: newItemLocation,
      category: 'objetos',
      isPacked: false,
      status,
      warningNote,
    };

    const updated = [newItem, ...checklist];
    setChecklist(updated);
    savePackingChecklist(updated);
    setNewItemName('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handItems = checklist.filter((i) => i.location === 'mao');
  const checkedItems = checklist.filter((i) => i.location === 'despachada');
  const totalPacked = checklist.filter((i) => i.isPacked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1976F3] text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Minhas Consultas & Mala Pessoal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102746] mt-1">
            Organizador de Viagem
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-0.5">
            Gerencie sua lista de itens para não esquecer nada e confira seu histórico de consultas recentes.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="no-print inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#DCE5F0] hover:border-slate-300 text-[#102746] rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Printer className="w-4 h-4 text-[#1976F3]" />
          <span>Imprimir / Salvar PDF</span>
        </button>
      </div>

      {/* Main 2-Column Split: Checklist (Left) & Saved Queries (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Travel Packing Checklist (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#DCE5F0] p-6 shadow-sm space-y-6">
          
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold font-heading text-[#102746] flex items-center gap-2">
                <Luggage className="w-5 h-5 text-[#1976F3]" />
                <span>Lista da Minha Mala</span>
              </h2>
              <span className="text-xs text-slate-500">
                {totalPacked} de {checklist.length} itens conferidos e prontos
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-48 bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-[#23A88A] h-full rounded-full transition-all duration-300"
                style={{ width: `${checklist.length ? (totalPacked / checklist.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Quick Add Custom Item Form */}
          <form onSubmit={handleAddItem} className="no-print flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Adicionar novo item à mala..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#1976F3] focus:ring-2 focus:ring-[#1976F3]/15 outline-hidden"
            />
            <div className="flex gap-2">
              <select
                value={newItemLocation}
                onChange={(e) => setNewItemLocation(e.target.value as 'mao' | 'despachada')}
                aria-label="Local da Bagagem"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#172B46] focus:outline-hidden"
              >
                <option value="mao">Na mala de mão</option>
                <option value="despachada">Na despachada</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#1976F3] hover:bg-[#1664d1] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </div>
          </form>

          {/* Section 1: Bagagem de Mão */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1976F3] flex items-center gap-1.5">
                <Luggage className="w-4 h-4" />
                <span>Bagagem de mão (Cabine) — {handItems.length} itens</span>
              </span>
              <span className="text-[11px] text-slate-400">Limite de até 10 kg</span>
            </div>

            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden">
              {handItems.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  Nenhum item adicionado à bagagem de mão ainda.
                </div>
              ) : (
                handItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 flex items-start justify-between gap-3 transition-colors ${
                      item.isPacked ? 'bg-slate-50/70 text-slate-400 line-through' : 'bg-white hover:bg-slate-50/40 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleTogglePacked(item.id)}
                        className="mt-0.5 text-slate-400 hover:text-[#1976F3] cursor-pointer"
                        aria-label={`Conferir ${item.name}`}
                      >
                        {item.isPacked ? (
                          <CheckSquare className="w-5 h-5 text-[#23A88A]" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-300" />
                        )}
                      </button>
                      <div className="space-y-0.5">
                        <span className={`text-sm font-medium ${item.isPacked ? 'line-through text-slate-400' : 'text-[#102746]'}`}>
                          {item.name}
                        </span>
                        {item.warningNote && (
                          <p className="text-xs text-amber-700 not-italic flex items-center gap-1 font-normal">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{item.warningNote}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 no-print">
                      {item.itemId && (
                        <button
                          onClick={() => onSearchItemName(item.name)}
                          className="text-xs text-[#1976F3] hover:underline"
                        >
                          Ver regras
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-slate-300 hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 2: Bagagem Despachada */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Luggage className="w-4 h-4 text-slate-500" />
                <span>Bagagem Despachada (Porão) — {checkedItems.length} itens</span>
              </span>
              <span className="text-[11px] text-slate-400">Franquia de 23 kg</span>
            </div>

            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden">
              {checkedItems.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  Nenhum item adicionado à bagagem despachada ainda.
                </div>
              ) : (
                checkedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 flex items-start justify-between gap-3 transition-colors ${
                      item.status === 'nao_permitido'
                        ? 'bg-rose-50/70 border-l-4 border-l-rose-500'
                        : item.isPacked
                        ? 'bg-slate-50/70 text-slate-400 line-through'
                        : 'bg-white hover:bg-slate-50/40 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleTogglePacked(item.id)}
                        className="mt-0.5 text-slate-400 hover:text-[#1976F3] cursor-pointer"
                        aria-label={`Conferir ${item.name}`}
                      >
                        {item.isPacked ? (
                          <CheckSquare className="w-5 h-5 text-[#23A88A]" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-300" />
                        )}
                      </button>
                      <div className="space-y-0.5">
                        <span className={`text-sm font-medium ${item.isPacked ? 'line-through text-slate-400' : 'text-[#102746]'}`}>
                          {item.name}
                        </span>
                        {item.warningNote && (
                          <p className="text-xs text-rose-700 not-italic flex items-center gap-1 font-semibold">
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>{item.warningNote}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 no-print">
                      {item.itemId && (
                        <button
                          onClick={() => onSearchItemName(item.name)}
                          className="text-xs text-[#1976F3] hover:underline"
                        >
                          Ver regras
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-slate-300 hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Consultas Recentes Salvas (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-[#DCE5F0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold font-heading text-[#102746] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1976F3]" />
                <span>Consultas Recentes</span>
              </h3>
              <span className="text-xs text-slate-400">
                {queries.length} salvas
              </span>
            </div>

            {queries.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                Nenhuma busca salva ainda. Quando você pesquisar itens, eles aparecerão aqui para consulta rápida offline.
              </p>
            ) : (
              <div className="space-y-2">
                {queries.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl flex items-center justify-between gap-2 transition-colors group"
                  >
                    <button
                      onClick={() => onSearchItemName(q.query)}
                      className="text-left flex-1 cursor-pointer"
                    >
                      <span className="text-xs font-bold text-[#102746] group-hover:text-[#1976F3] block">
                        {q.query}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(q.timestamp).toLocaleDateString('pt-BR')} às {new Date(q.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </button>
                    
                    <button
                      onClick={() => handleRemoveQuery(q.id)}
                      className="text-slate-300 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer"
                      title="Excluir consulta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Offline & Privacy guarantee note */}
          <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-[#102746] block">Privacidade e Armazenamento Local:</span>
            <p>
              Todos os seus itens e buscas ficam gravados exclusivamente no navegador deste dispositivo através de LocalStorage. Nenhum dado de sua mala é compartilhado com terceiros.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
