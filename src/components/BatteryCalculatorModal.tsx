import React, { useState } from 'react';
import { X, Zap, ShieldCheck, AlertTriangle, XCircle, Info, ExternalLink, ShieldAlert, Check } from 'lucide-react';
import { calculateWattHours, evaluateBatteryCompliance } from '../utils/rulesEngine';
import { AirlineCode } from '../types';

interface BatteryCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMah?: number;
}

export const BatteryCalculatorModal: React.FC<BatteryCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialMah = 20000,
}) => {
  const [mahInput, setMahInput] = useState<number>(initialMah);
  const [voltageInput, setVoltageInput] = useState<number>(3.7); // standard lithium-ion nominal cell voltage
  const [quantity, setQuantity] = useState<number>(1);
  const [airline, setAirline] = useState<AirlineCode>('TODAS');

  if (!isOpen) return null;

  const wh = calculateWattHours(mahInput, voltageInput);
  const compliance = evaluateBatteryCompliance(wh, quantity, airline);

  const presets = [
    { label: '5.000 mAh (Celular)', mah: 5000, v: 3.7 },
    { label: '10.000 mAh (Power Bank P)', mah: 10000, v: 3.7 },
    { label: '20.000 mAh (Power Bank M)', mah: 20000, v: 3.7 },
    { label: '27.000 mAh (Limite ~100Wh)', mah: 27000, v: 3.7 },
    { label: '30.000 mAh (Atenção > 100Wh)', mah: 30000, v: 3.7 },
    { label: 'Drone Pro (4S)', mah: 5000, v: 15.4 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden space-y-6">
        
        {/* Modal Header */}
        <div className="bg-[#102746] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            aria-label="Fechar calculadora"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Matriz de Baterias & Novas Regras 2026 (Portaria ANAC 21/SPO e OACI)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading">
            Calculadora de Power Banks & Baterias (Wh)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Verifique capacidade, quantidade permitida e regras operacionais específicas da sua companhia.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 2026 Regulatory Highlights Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-xs text-[#102746] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#1976F3]">
              <ShieldAlert className="w-4 h-4" />
              <span>Mudança Regulamentar Internacional (Vigente em 2026)</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              A <strong>OACI (Doc 9284)</strong> e a <strong>ANAC (Portaria nº 21/SPO / IS 175-001M)</strong> atualizaram as regras de carregadores portáteis:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800 font-medium pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1976F3]" />
                <span>Máximo <strong>2 power banks</strong> por passageiro</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span><strong>PROIBIDO</strong> usar para carregar em voo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span><strong>PROIBIDO</strong> recarregar nas tomadas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#23A88A]" />
                <span>Transporte exclusivo na cabine</span>
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 block">
              Modelos comuns de mercado:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setMahInput(p.mah);
                    setVoltageInput(p.v);
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#1976F3] text-slate-700 transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form inputs: mAh, Volts, Quantity, Airline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Capacidade mAh */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102746] block">
                Capacidade em mAh (miliampère-hora):
              </label>
              <input
                type="number"
                min="100"
                step="500"
                value={mahInput}
                onChange={(e) => setMahInput(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl font-bold text-[#102746] text-lg focus:border-[#1976F3] focus:ring-2 focus:ring-[#1976F3]/15 outline-hidden"
              />
              <span className="text-[11px] text-slate-400 block">
                Geralmente impresso na carcaça (ex: 10.000 ou 20.000).
              </span>
            </div>

            {/* Tensão Volts */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102746] block">
                Tensão da célula em Volts (V):
              </label>
              <input
                type="number"
                min="1.2"
                max="48"
                step="0.1"
                value={voltageInput}
                onChange={(e) => setVoltageInput(Math.max(1, parseFloat(e.target.value) || 3.7))}
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl font-bold text-[#102746] text-lg focus:border-[#1976F3] focus:ring-2 focus:ring-[#1976F3]/15 outline-hidden"
              />
              <span className="text-[11px] text-slate-400 block">
                Padrão para baterias de lítio de celular é <strong>3.7V</strong>.
              </span>
            </div>

            {/* Quantidade de power banks (Nova regra 2026: máx 2) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102746] block">
                Quantos power banks vai levar?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuantity(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      quantity === num
                        ? num > 2
                          ? 'bg-rose-50 border-rose-400 text-rose-700 ring-2 ring-rose-200'
                          : 'bg-[#1976F3] border-[#1976F3] text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {num === 3 ? '3 ou mais' : `${num} unidade${num > 1 ? 's' : ''}`}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-400 block">
                Limite regulamentar: máximo de 2 unidades por passageiro.
              </span>
            </div>

            {/* Companhia aérea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102746] block">
                Sua Companhia Aérea:
              </label>
              <select
                value={airline}
                onChange={(e) => setAirline(e.target.value as AirlineCode)}
                aria-label="Companhia Aérea para regras de bateria"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl font-medium text-xs text-[#102746] focus:border-[#1976F3] focus:outline-hidden"
              >
                <option value="TODAS">Regra Geral (ANAC / OACI)</option>
                <option value="LATAM">LATAM Airlines Brasil</option>
                <option value="GOL">GOL Linhas Aéreas</option>
                <option value="AZUL">Azul Linhas Aéreas</option>
              </select>
              <span className="text-[11px] text-slate-400 block">
                Cada companhia possui particularidades de acomodação.
              </span>
            </div>
          </div>

          {/* Calculated Output Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Capacidade calculada:
              </span>
              <div className="text-3xl font-extrabold font-heading text-[#102746]">
                {wh} <span className="text-lg font-bold text-[#1976F3]">Watt-hora (Wh)</span>
              </div>
              <p className="text-xs text-slate-500">
                Fórmula: ({mahInput.toLocaleString()} mAh × {voltageInput} V) ÷ 1.000 = {wh} Wh
              </p>
            </div>

            <div className="shrink-0 text-center">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                compliance.tier === 'free'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : compliance.tier === 'airline_permission'
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}>
                {compliance.tier === 'free' ? (
                  <ShieldCheck className="w-4 h-4 text-[#23A88A]" />
                ) : compliance.tier === 'airline_permission' ? (
                  <AlertTriangle className="w-4 h-4 text-[#F47736]" />
                ) : (
                  <XCircle className="w-4 h-4 text-[#D94B50]" />
                )}
                <span>{compliance.badgeText}</span>
              </span>
            </div>
          </div>

          {/* Quantity Alert if > 2 */}
          {compliance.quantityAlert && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{compliance.quantityAlert}</span>
            </div>
          )}

          {/* Compliance Status Details */}
          <div className={`p-4 rounded-xl border space-y-2 text-xs leading-relaxed ${
            compliance.tier === 'free'
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              : compliance.tier === 'airline_permission'
              ? 'bg-amber-50/60 border-amber-200 text-amber-950'
              : 'bg-rose-50/60 border-rose-200 text-rose-950'
          }`}>
            <h4 className="font-bold text-sm">
              {compliance.title}
            </h4>
            <p>{compliance.description}</p>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 font-semibold border-t border-slate-200/50">
              <span>Mala de mão: {compliance.handAllowed ? 'SIM (Liberado)' : 'NÃO'}</span>
              <span>Mala despachada (Porão): {compliance.checkedAllowed ? 'SIM' : 'NÃO (Estritamente Proibido)'}</span>
              <span>Limite de unidades: {compliance.maxSparesCabine}</span>
              <span>Uso em voo: PROIBIDO (OACI 2026)</span>
            </div>
          </div>

          {/* Airline Specific Box */}
          {compliance.airlineSpecificAdvice && (
            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-[#102746] space-y-1">
              <span className="font-bold block text-[#1976F3]">
                Orientação Específica da Companhia:
              </span>
              <p className="text-slate-700 leading-relaxed">
                {compliance.airlineSpecificAdvice}
              </p>
            </div>
          )}

          {/* Mandatory Safety Instructions */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <h5 className="font-bold flex items-center gap-1.5 text-[#102746]">
              <Info className="w-4 h-4 text-[#1976F3]" />
              <span>Regras Operacionais Oficiais de 2026</span>
            </h5>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>
                <strong>LATAM:</strong> Deve ficar acessível sob o assento à frente. Proibido colocar no bagageiro superior.
              </li>
              <li>
                <strong>Não pode recarregar:</strong> É vedado conectar o power bank às tomadas do avião.
              </li>
              <li>
                <strong>Não pode alimentar aparelhos:</strong> Proibido usar o power bank durante todo o voo.
              </li>
              <li>
                <strong>Despacho no portão:</strong> Se sua mala de cabine for despachada de última hora por falta de espaço, retire o power bank imediatamente.
              </li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Fontes: Portaria ANAC 21/SPO, OACI Doc 9284 e MPor</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#102746] hover:bg-[#172B46] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Entendi as Regras de 2026
          </button>
        </div>

      </div>
    </div>
  );
};
