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
      : item.handLuggage.status === 'permitido_com_condicoes' || item.checkedLuggage.status === 'permitido_com_condicoes'
      ? getStatusBadge('permitido_com_condicoes')
      : handStatus;

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
        style={{
          background: item.checkedLuggage.status === 'nao_permitido' 
            ? 'linear-gradient(90deg, #23A88A 0%, #23A88A 50%, #F47736 100%)' 
            : '#23A88A'
        }}
      />

      {/* Main Bar exactly matching mockup layout */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Left section: Item Thumbnail & Title + Overall Badge */}
          <div className="flex items-center gap-4 min-w-[240px]">
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

            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold font-heading text-[#102746]">
                {item.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${overallStatus.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${overallStatus.dot}`} />
                  {overallStatus.text}
                </span>
                {item.verificationStatus === 'verificado' && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400" title="Informações conferidas com normativas oficiais">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#23A88A]" />
                    <span>Oficial ANAC</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center Column 1: Bagagem de Mão */}
          <div className="flex items-start sm:items-center gap-3 px-4 py-2 sm:py-0 border-t sm:border-t-0 sm:border-l border-[#DCE5F0] flex-1">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Luggage className="w-5 h-5 text-[#23A88A]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#172B46]">
                Bagagem de mão:
              </div>
              <div className="text-sm font-bold text-[#23A88A]">
                {item.handLuggage.status === 'permitido'
                  ? 'permitido livremente'
                  : item.handLuggage.status === 'permitido_com_condicoes'
                  ? 'permitido dentro dos limites'
                  : 'não permitido'}
              </div>
            </div>
          </div>

          {/* Center Column 2: Bagagem Despachada */}
          <div className="flex items-start sm:items-center gap-3 px-4 py-2 sm:py-0 border-t sm:border-t-0 sm:border-l border-[#DCE5F0] flex-1">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
              item.checkedLuggage.status === 'nao_permitido'
                ? 'bg-rose-50 text-rose-600 border-rose-100'
                : item.checkedLuggage.status === 'permitido_com_condicoes'
                ? 'bg-amber-50 text-amber-600 border-amber-100'
                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
            }`}>
              <Luggage className={`w-5 h-5 ${
                item.checkedLuggage.status === 'nao_permitido'
                  ? 'text-[#F47736]'
                  : 'text-[#23A88A]'
              }`} />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#172B46]">
                Bagagem despachada:
              </div>
              <div className={`text-sm font-bold ${
                item.checkedLuggage.status === 'nao_permitido'
                  ? 'text-[#F47736]'
                  : item.checkedLuggage.status === 'permitido_com_condicoes'
                  ? 'text-amber-600'
                  : 'text-[#23A88A]'
              }`}>
                {item.checkedLuggage.status === 'permitido'
                  ? 'permitido no porão'
                  : item.checkedLuggage.status === 'permitido_com_condicoes'
                  ? 'com restrições'
                  : 'não permitido'}
              </div>
            </div>
          </div>

          {/* Right Action / Details Trigger */}
          <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#DCE5F0] sm:pl-4 shrink-0">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172B46] hover:text-[#1976F3] p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4 text-[#1976F3]" />
              <span className="hidden sm:inline">
                {expanded ? 'Ocultar detalhes' : 'Consulte as condições da companhia'}
              </span>
              <span className="sm:hidden">
                {expanded ? 'Menos' : 'Ver detalhes'}
              </span>
              {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
          </div>

        </div>
      </div>

      {/* Expanded Details Drawer */}
      {expanded && (
        <div className="bg-[#F8FAFD] border-t border-[#DCE5F0] p-4 sm:p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
          
          {/* Quick Context Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#DCE5F0]">
            <div className="flex items-center gap-2 text-xs text-[#172B46]">
              <span className="font-semibold">Contexto da consulta:</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#1976F3] font-medium">
                Voo {flightType === 'domestico' ? 'Doméstico (Brasil)' : 'Internacional'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                Cia: {airline === 'TODAS' ? 'Regulamentação Geral ANAC' : airline}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {item.isBatteryOrPowerBank && onOpenBatteryCalc && (
                <button
                  onClick={() => onOpenBatteryCalc(20000)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#102746] hover:bg-[#172B46] text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Calcular Wh da Bateria</span>
                </button>
              )}

              {onAddToPackingList && (
                <button
                  onClick={() => handleAddClick('mao')}
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
                      <span>Adicionar à Mala</span>
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
              <div className="flex items-center justify-between">
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
                  <span className="font-semibold block flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
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
              <div className="flex items-center justify-between">
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
                  <span className="font-semibold block flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    Aviso do Porão:
                  </span>
                  {item.checkedLuggage.warnings.map((w, idx) => (
                    <p key={idx} className="leading-snug">{w}</p>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Specific Airline Policies Note */}
          {item.airlineNotes && (airline !== 'TODAS' || !airline) && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-[#102746] flex items-center gap-1.5">
                <span>Diretriz específica das companhias:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                {item.airlineNotes.LATAM && (
                  <div className={`p-2.5 rounded-lg ${airline === 'LATAM' ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'}`}>
                    <span className="font-bold text-[#102746] block mb-1">LATAM</span>
                    {item.airlineNotes.LATAM}
                  </div>
                )}
                {item.airlineNotes.GOL && (
                  <div className={`p-2.5 rounded-lg ${airline === 'GOL' ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50'}`}>
                    <span className="font-bold text-[#102746] block mb-1">GOL</span>
                    {item.airlineNotes.GOL}
                  </div>
                )}
                {item.airlineNotes.AZUL && (
                  <div className={`p-2.5 rounded-lg ${airline === 'AZUL' ? 'bg-sky-50 border border-sky-200' : 'bg-slate-50'}`}>
                    <span className="font-bold text-[#102746] block mb-1">Azul</span>
                    {item.airlineNotes.AZUL}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Official Verification & Regulatory Sources */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Fontes oficiais:</span>
              <div className="flex flex-wrap gap-2">
                {item.officialSources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1976F3] hover:underline hover:text-[#1664d1]"
                  >
                    <span>{source.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              Última verificação documental: <span className="font-medium text-slate-600">{item.lastVerifiedDate}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
