import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Luggage, 
  Info, 
  ExternalLink, 
  Plus, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck,
  Check
} from 'lucide-react';
import { AirlineCode, FlightType, ItemStatus, LuggageItem, LuggageLocation } from '../types';

interface ItemResultCardProps {
  item: LuggageItem;
  flightType: FlightType;
  airline: AirlineCode;
  location: LuggageLocation;
  onOpenBatteryCalc?: (initialMah?: number) => void;
  onAddToPackingList?: (item: LuggageItem, targetLocation: 'mao' | 'despachada') => void;
  isItemInList?: boolean;
}

export const ItemResultCard: React.FC<ItemResultCardProps> = ({
  item,
  flightType,
  airline,
  location,
  onOpenBatteryCalc,
  onAddToPackingList,
  isItemInList = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Status visual mapping
  const getStatusBadge = (status: ItemStatus) => {
    switch (status) {
      case 'permitido':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-[#23A88A]',
          text: 'Permitido',
          icon: CheckCircle2,
          colorHex: '#23A88A',
        };
      case 'permitido_com_condicoes':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-[#23A88A]',
          text: 'Permitido com condições',
          icon: CheckCircle2,
          colorHex: '#23A88A',
        };
      case 'nao_permitido':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-[#D94B50]',
          text: 'Não permitido',
          icon: XCircle,
          colorHex: '#D94B50',
        };
      case 'necessita_confirmacao':
      default:
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-[#F47736]',
          text: 'Necessita confirmação',
          icon: AlertTriangle,
          colorHex: '#F47736',
        };
    }
  };

  const handStatus = getStatusBadge(item.handLuggage.status);
  const checkedStatus = getStatusBadge(item.checkedLuggage.status);

  // Overall primary status
  const overallStatus = 
    location === 'mao' 
      ? handStatus 
      : location === 'despachada' 
      ? checkedStatus 
      : item.handLuggage.status === 'nao_permitido' && item.checkedLuggage.status === 'nao_permitido'
      ? getStatusBadge('nao_permitido')
      : item.handLuggage.status === 'permitido_com_condicoes' || item.checkedLuggage.status === 'permitido_com_condicoes'
      ? getStatusBadge('permitido_com_condicoes')
      : handStatus;

  const getColumnVisuals = (status: ItemStatus, type: 'mao' | 'despachada') => {
    switch (status) {
      case 'permitido':
        return {
          box: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          iconColor: 'text-[#23A88A]',
          textColor: 'text-[#23A88A]',
          label: type === 'mao' ? 'permitido livremente' : 'permitido no porão',
        };
      case 'permitido_com_condicoes':
        return {
          box: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          iconColor: 'text-[#23A88A]',
          textColor: 'text-[#23A88A]',
          label: type === 'mao' ? 'permitido dentro dos limites' : 'permitido com restrições',
        };
      case 'necessita_confirmacao':
        return {
          box: 'bg-amber-50 text-amber-600 border-amber-100',
          iconColor: 'text-[#F47736]',
          textColor: 'text-amber-700',
          label: 'confirmar com a cia',
        };
      case 'nao_permitido':
      default:
        return {
          box: 'bg-rose-50 text-rose-600 border-rose-100',
          iconColor: 'text-[#D94B50]',
          textColor: 'text-[#D94B50]',
          label: 'não permitido',
        };
    }
  };

  const handVisual = getColumnVisuals(item.handLuggage.status, 'mao');
  const checkedVisual = getColumnVisuals(item.checkedLuggage.status, 'despachada');

  const topAccentBackground =
    item.handLuggage.status === 'nao_permitido' && item.checkedLuggage.status === 'nao_permitido'
      ? '#D94B50'
      : item.handLuggage.status === 'nao_permitido'
      ? 'linear-gradient(90deg, #D94B50 0%, #F47736 50%, #23A88A 100%)'
      : item.checkedLuggage.status === 'nao_permitido'
      ? 'linear-gradient(90deg, #23A88A 0%, #23A88A 50%, #F47736 100%)'
      : '#23A88A';

  const smartTargetLocation: 'mao' | 'despachada' =
    item.handLuggage.status === 'nao_permitido' && item.checkedLuggage.status !== 'nao_permitido'
      ? 'despachada'
      : location === 'despachada' && item.checkedLuggage.status !== 'nao_permitido'
      ? 'despachada'
      : 'mao';

  const primarySource = item.officialSources[0];

  const handleAddClick = (targetLoc: 'mao' | 'despachada') => {
    if (onAddToPackingList) {
      onAddToPackingList(item, targetLoc);
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2000);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#DCE5F0] shadow-md hover:shadow-lg transition-all overflow-hidden relative">
      {/* Top subtle decorative accent bar */}
      <div 
        className="h-1.5 w-full"
        style={{ background: topAccentBackground }}
      />

      {/* Main Bar matching mockup layout with responsive stacking */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-5">
          
          {/* Left section: Item Thumbnail & Title + Overall Badge */}
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 lg:min-w-[230px]">
            {/* Visual Icon / Thumbnail with 3D product render */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shadow-sm overflow-hidden shrink-0">
              {item.id === 'power-bank' ? (
                <img
                  src="./assets/power_bank_device.jpg"
                  alt="Power Bank"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : item.category === 'eletronicos' ? (
                <img
                  src="./assets/cat_laptop.jpg"
                  alt="Eletrônico"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : item.category === 'liquidos' ? (
                <img
                  src="./assets/cat_cosmetics.jpg"
                  alt="Líquidos e cosméticos"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : item.category === 'medicamentos' ? (
                <img
                  src="./assets/cat_medicines.jpg"
                  alt="Medicamentos"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : item.category === 'alimentos' ? (
                <img
                  src="./assets/cat_snacks.jpg"
                  alt="Alimentos"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Luggage className="w-7 h-7 text-[#1976F3]" />
              )}
            </div>

            <div className="space-y-1 min-w-0">
              <h2 className="text-base sm:text-xl font-bold font-heading text-[#102746] leading-snug">
                {item.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${overallStatus.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${overallStatus.dot}`} />
                  {overallStatus.text}
                </span>
                <span
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500"
                  title={primarySource ? `Fonte: ${primarySource.name} • Verificado em ${item.lastVerifiedDate}` : `Verificado em ${item.lastVerifiedDate}`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#23A88A] shrink-0" />
                  <span>
                    {primarySource?.publisher || 'ANAC'} • {item.lastVerifiedDate}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Center Column 1: Bagagem de Mão */}
          <div className="flex items-center gap-3 pt-3 lg:pt-0 lg:px-4 border-t lg:border-t-0 lg:border-l border-[#DCE5F0] flex-1">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${handVisual.box}`}>
              <Luggage className={`w-5 h-5 ${handVisual.iconColor}`} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#172B46]">
                Bagagem de mão:
              </div>
              <div className={`text-sm font-bold ${handVisual.textColor}`}>
                {handVisual.label}
              </div>
            </div>
          </div>

          {/* Center Column 2: Bagagem Despachada */}
          <div className="flex items-center gap-3 pt-3 lg:pt-0 lg:px-4 border-t lg:border-t-0 lg:border-l border-[#DCE5F0] flex-1">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${checkedVisual.box}`}>
              <Luggage className={`w-5 h-5 ${checkedVisual.iconColor}`} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#172B46]">
                Bagagem despachada:
              </div>
              <div className={`text-sm font-bold ${checkedVisual.textColor}`}>
                {checkedVisual.label}
              </div>
            </div>
          </div>

          {/* Right Action / Details Trigger */}
          <div className="flex items-center justify-between lg:justify-end gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#DCE5F0] lg:pl-4 shrink-0">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="w-full lg:w-auto inline-flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-[#172B46] hover:text-[#1976F3] px-3 py-2 rounded-lg bg-slate-50 lg:bg-transparent hover:bg-slate-100 lg:hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4 text-[#1976F3] shrink-0" />
              <span className="hidden sm:inline">
                {expanded ? 'Ocultar detalhes' : 'Consulte as condições da companhia'}
              </span>
              <span className="sm:hidden">
                {expanded ? 'Ocultar detalhes' : 'Ver regras e fontes oficiais'}
              </span>
              {expanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
            </button>
          </div>

        </div>
      </div>

      {/* Expanded Details Drawer */}
      {expanded && (
        <div className="bg-[#F8FAFD] border-t border-[#DCE5F0] p-4 sm:p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
          
          {/* Quick Context Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#DCE5F0]">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#172B46]">
              <span className="font-semibold">Contexto da consulta:</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#1976F3] font-medium">
                Voo {flightType === 'domestico' ? 'Doméstico (Brasil)' : 'Internacional'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                Cia: {airline === 'TODAS' ? 'Regulamentação Geral ANAC' : airline}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {item.isBatteryOrPowerBank && onOpenBatteryCalc && (
                <button
                  type="button"
                  onClick={() => onOpenBatteryCalc(20000)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#102746] hover:bg-[#172B46] text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Calcular Wh da Bateria</span>
                </button>
              )}

              {onAddToPackingList && (
                <button
                  type="button"
                  onClick={() => handleAddClick(smartTargetLocation)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    addedFeedback || isItemInList
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-[#1976F3] text-[#1976F3] hover:bg-blue-50'
                  }`}
                >
                  {addedFeedback || isItemInList ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Na Minha Mala</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>
                        Adicionar ({smartTargetLocation === 'despachada' ? 'Despachada' : 'Mão'})
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Breakdown Grid: Mão vs Despachada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Bagagem de Mão Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-[#1976F3]" />
                  <h3 className="text-sm font-bold text-[#102746]">
                    Regras para Bagagem de Mão
                  </h3>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${handStatus.bg}`}>
                  {handStatus.text}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {item.handLuggage.summary}
              </p>
              
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                {item.handLuggage.conditions.map((cond, idx) => (
                  <li key={idx} className="leading-snug">{cond}</li>
                ))}
              </ul>

              {item.handLuggage.warnings.length > 0 && (
                <div className="bg-amber-50/80 border border-amber-200/60 p-2.5 rounded-lg text-xs text-amber-900 space-y-1">
                  <span className="font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    Advertência na cabine:
                  </span>
                  {item.handLuggage.warnings.map((w, idx) => (
                    <p key={idx} className="leading-snug">{w}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Bagagem Despachada Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-bold text-[#102746]">
                    Regras para Bagagem Despachada
                  </h3>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${checkedStatus.bg}`}>
                  {checkedStatus.text}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {item.checkedLuggage.summary}
              </p>
              
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                {item.checkedLuggage.conditions.map((cond, idx) => (
                  <li key={idx} className="leading-snug">{cond}</li>
                ))}
              </ul>

              {item.checkedLuggage.warnings.length > 0 && (
                <div className="bg-rose-50/80 border border-rose-200/60 p-2.5 rounded-lg text-xs text-rose-900 space-y-1">
                  <span className="font-semibold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    Aviso do Porão:
                  </span>
                  {item.checkedLuggage.warnings.map((w, idx) => (
                    <p key={idx} className="leading-snug">{w}</p>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Specific Airline Policies Note — Always visible when available, highlighting selected airline */}
          {item.airlineNotes && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-[#102746] flex items-center gap-1.5">
                <span>Regras separadas por companhia aérea (LATAM, GOL e Azul):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
                {item.airlineNotes.LATAM && (
                  <div className={`p-3 rounded-lg border ${airline === 'LATAM' ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-200' : 'bg-slate-50 border-slate-200/70'}`}>
                    <span className="font-bold text-[#102746] block mb-1">LATAM Airlines</span>
                    <p className="leading-relaxed">{item.airlineNotes.LATAM}</p>
                  </div>
                )}
                {item.airlineNotes.GOL && (
                  <div className={`p-3 rounded-lg border ${airline === 'GOL' ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-200' : 'bg-slate-50 border-slate-200/70'}`}>
                    <span className="font-bold text-[#102746] block mb-1">GOL Linhas Aéreas</span>
                    <p className="leading-relaxed">{item.airlineNotes.GOL}</p>
                  </div>
                )}
                {item.airlineNotes.AZUL && (
                  <div className={`p-3 rounded-lg border ${airline === 'AZUL' ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-200' : 'bg-slate-50 border-slate-200/70'}`}>
                    <span className="font-bold text-[#102746] block mb-1">Azul Linhas Aéreas</span>
                    <p className="leading-relaxed">{item.airlineNotes.AZUL}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Official Verification & Regulatory Sources */}
          <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700">Fontes oficiais:</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {item.officialSources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1976F3] hover:underline hover:text-[#1664d1]"
                  >
                    <span>{source.name}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 shrink-0">
              Verificado em: <span className="font-semibold text-slate-700">{item.lastVerifiedDate}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
