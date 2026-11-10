import React, { useState, useMemo } from 'react';
import { 
  Ruler, 
  Weight, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { AIRLINES_DATA, ANAC_STANDARDS } from '../data/airlines';
import { checkLuggageCompliance } from '../utils/rulesEngine';

export const LuggageMeasurerView: React.FC = () => {
  // Unit toggles
  const [lengthUnit, setLengthUnit] = useState<'cm' | 'in' | 'm'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');

  // Airline selection
  const [airlineCode, setAirlineCode] = useState<'LATAM' | 'GOL' | 'AZUL'>('LATAM');

  // Passenger Tariff Selection (New 2026 requirement)
  const [tariff, setTariff] = useState<'basic' | 'standard' | 'premium'>('standard');

  // Luggage Type
  const [luggageType, setLuggageType] = useState<'mao' | 'item_pessoal' | 'despachada'>('mao');

  // Input values in user selected units
  const [heightInput, setHeightInput] = useState<number>(55);
  const [widthInput, setWidthInput] = useState<number>(35);
  const [depthInput, setDepthInput] = useState<number>(25);
  const [weightInput, setWeightInput] = useState<number>(10.5);

  // Quick preset sizes
  const applyPreset = (preset: 'padrao_mao' | 'mochila_laptop' | 'mala_media_despachada' | 'mala_grande_despachada') => {
    if (preset === 'padrao_mao') {
      setLuggageType('mao');
      setLengthUnit('cm');
      setWeightUnit('kg');
      setHeightInput(55);
      setWidthInput(35);
      setDepthInput(25);
      setWeightInput(11.5); // Fits 12kg on LATAM/GOL
    } else if (preset === 'mochila_laptop') {
      setLuggageType('item_pessoal');
      setLengthUnit('cm');
      setWeightUnit('kg');
      setHeightInput(42);
      setWidthInput(32);
      setDepthInput(18);
      setWeightInput(4.5);
    } else if (preset === 'mala_media_despachada') {
      setLuggageType('despachada');
      setLengthUnit('cm');
      setWeightUnit('kg');
      setHeightInput(66);
      setWidthInput(44);
      setDepthInput(28);
      setWeightInput(21.5);
    } else if (preset === 'mala_grande_despachada') {
      setLuggageType('despachada');
      setLengthUnit('cm');
      setWeightUnit('kg');
      setHeightInput(76);
      setWidthInput(50);
      setDepthInput(31);
      setWeightInput(24.2); // over 23kg intentionally to show alert
    }
  };

  // Convert inputs to metric cm & kg for calculations
  const heightCm = useMemo(() => {
    if (lengthUnit === 'in') return Number((heightInput * 2.54).toFixed(1));
    if (lengthUnit === 'm') return Number((heightInput * 100).toFixed(1));
    return heightInput;
  }, [heightInput, lengthUnit]);

  const widthCm = useMemo(() => {
    if (lengthUnit === 'in') return Number((widthInput * 2.54).toFixed(1));
    if (lengthUnit === 'm') return Number((widthInput * 100).toFixed(1));
    return widthInput;
  }, [widthInput, lengthUnit]);

  const depthCm = useMemo(() => {
    if (lengthUnit === 'in') return Number((depthInput * 2.54).toFixed(1));
    if (lengthUnit === 'm') return Number((depthInput * 100).toFixed(1));
    return depthInput;
  }, [depthInput, lengthUnit]);

  const weightKg = useMemo(() => {
    if (weightUnit === 'lb') return Number((weightInput * 0.453592).toFixed(2));
    return weightInput;
  }, [weightInput, weightUnit]);

  // Run compliance check
  const compliance = useMemo(() => {
    return checkLuggageCompliance({
      heightCm,
      widthCm,
      depthCm,
      weightKg,
      airlineCode,
      luggageType,
      tariff,
    });
  }, [heightCm, widthCm, depthCm, weightKg, airlineCode, luggageType, tariff]);

  const currentAirline = AIRLINES_DATA[airlineCode];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1976F3] text-xs font-semibold">
          <Ruler className="w-3.5 h-3.5" />
          <span>Verificador de Gabarito & Balança</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102746]">
          Medir e pesar bagagem
        </h1>
        <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
          Insira as dimensões e o peso da sua mala para saber na hora se ela cumpre as regras da 
          companhia aérea ou se correrá risco de despacho compulsório ou cobrança de excesso de peso.
        </p>
      </div>

      {/* Preset quick buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">Testar medidas comuns:</span>
        <button
          onClick={() => applyPreset('padrao_mao')}
          className="px-3 py-1.5 rounded-lg bg-white border border-[#DCE5F0] hover:border-[#1976F3] text-[#172B46] font-medium transition-colors cursor-pointer"
        >
          Mala de Bordo 10 kg (55x35x25)
        </button>
        <button
          onClick={() => applyPreset('mochila_laptop')}
          className="px-3 py-1.5 rounded-lg bg-white border border-[#DCE5F0] hover:border-[#1976F3] text-[#172B46] font-medium transition-colors cursor-pointer"
        >
          Mochila Item Pessoal (42x32x18)
        </button>
        <button
          onClick={() => applyPreset('mala_media_despachada')}
          className="px-3 py-1.5 rounded-lg bg-white border border-[#DCE5F0] hover:border-[#1976F3] text-[#172B46] font-medium transition-colors cursor-pointer"
        >
          Mala Média Despachada 21.5 kg
        </button>
        <button
          onClick={() => applyPreset('mala_grande_despachada')}
          className="px-3 py-1.5 rounded-lg bg-white border border-[#DCE5F0] hover:border-rose-400 text-rose-700 font-medium transition-colors cursor-pointer"
        >
          Mala Grande c/ Excesso de Peso (24.2 kg)
        </button>
      </div>

      {/* Main Grid: Form Inputs + Results Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Parameters (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCE5F0] p-6 shadow-sm space-y-6">
          
          {/* 1. Seleção de Tipo de Bagagem */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#102746] block">
              1. Qual o tipo de bagagem que você quer medir?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setLuggageType('mao')}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  luggageType === 'mao'
                    ? 'bg-[#1976F3] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bagagem de mão (10 kg)
              </button>
              <button
                type="button"
                onClick={() => setLuggageType('item_pessoal')}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  luggageType === 'item_pessoal'
                    ? 'bg-[#1976F3] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Item pessoal (Mochila)
              </button>
              <button
                type="button"
                onClick={() => setLuggageType('despachada')}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  luggageType === 'despachada'
                    ? 'bg-[#1976F3] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bagagem despachada (23 kg)
              </button>
            </div>
          </div>

          {/* 2. Seleção de Companhia Aérea */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#102746] block">
              2. Qual a companhia aérea do seu voo?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['LATAM', 'GOL', 'AZUL'] as const).map((code) => {
                const air = AIRLINES_DATA[code];
                const isSelected = airlineCode === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setAirlineCode(code)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1976F3] ring-2 ring-[#1976F3]/20 bg-blue-50/50'
                        : 'border-[#DCE5F0] hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="font-bold text-sm block text-[#102746]">
                      {code}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {code === 'LATAM' ? 'Airlines (12 kg cabine)' : code === 'GOL' ? 'Linhas (12 kg cabine)' : 'Linhas (10 kg cabine)'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Seleção de Tarifa Contratada (Requisito Relatório 2026) */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#102746]">
                3. Qual a sua tarifa contratada?
              </label>
              <span className="text-[11px] text-slate-400">Franquias mudam por tarifa</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTariff('basic')}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  tariff === 'basic'
                    ? 'bg-white border-[#1976F3] text-[#1976F3] font-bold shadow-xs'
                    : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                <div className="font-bold">Tarifa Basic / Promo</div>
                <div className="text-[10px] text-slate-400">Sem mala de mão na LATAM/GOL</div>
              </button>

              <button
                type="button"
                onClick={() => setTariff('standard')}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  tariff === 'standard'
                    ? 'bg-white border-[#1976F3] text-[#1976F3] font-bold shadow-xs'
                    : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                <div className="font-bold">Light / Plus / MaisAzul</div>
                <div className="text-[10px] text-slate-400">Inclui mala de mão de bordo</div>
              </button>

              <button
                type="button"
                onClick={() => setTariff('premium')}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  tariff === 'premium'
                    ? 'bg-white border-[#1976F3] text-[#1976F3] font-bold shadow-xs'
                    : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                <div className="font-bold">Top / Max / Premium</div>
                <div className="text-[10px] text-slate-400">Até 16 kg na LATAM + malas</div>
              </button>
            </div>
          </div>

          {/* 3. Unidades de Medida */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#172B46]">
              <span>Unidade de dimensão:</span>
              <div className="flex bg-white rounded-lg p-0.5 border border-slate-200">
                {(['cm', 'in', 'm'] as const).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setLengthUnit(unit)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium cursor-pointer ${
                      lengthUnit === unit ? 'bg-[#1976F3] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {unit === 'cm' ? 'cm (centímetros)' : unit === 'in' ? 'pol (polegadas)' : 'm (metros)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#172B46]">
              <span>Unidade de peso:</span>
              <div className="flex bg-white rounded-lg p-0.5 border border-slate-200">
                {(['kg', 'lb'] as const).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setWeightUnit(unit)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium cursor-pointer ${
                      weightUnit === unit ? 'bg-[#1976F3] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {unit === 'kg' ? 'kg' : 'libras (lb)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Campos de Dimensão e Peso */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-[#102746] block">
              3. Insira as medidas com rodinhas e alça inclusas:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Altura */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 block">
                  Altura ({lengthUnit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  value={heightInput}
                  onChange={(e) => setHeightInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl font-semibold text-[#102746] focus:border-[#1976F3] focus:ring-2 focus:ring-[#1976F3]/15 outline-hidden"
                />
              </div>

              {/* Largura */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 block">
                  Largura ({lengthUnit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  value={widthInput}
                  onChange={(e) => setWidthInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl font-semibold text-[#102746] focus:border-[#1976F3] focus:ring-2 focus:ring-[#1976F3]/15 outline-hidden"
                />
              </div>

              {/* Profundidade */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 block">
                  Profundidade ({lengthUnit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  value={depthInput}
                  onChange={(e) => setDepthInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl font-semibold text-[#102746] focus:border-[#1976F3] focus:ring-2 focus:ring-[#1976F3]/15 outline-hidden"
                />
              </div>

              {/* Peso */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 block">
                  Peso ({weightUnit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={weightInput}
                  onChange={(e) => setWeightInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl font-semibold text-[#102746] focus:border-[#1976F3] focus:ring-2 focus:ring-[#1976F3]/15 outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Dica: meça sempre a mala já cheia e com zíperes fechados. O gabarito no aeroporto é uma caixa rígida de metal.</span>
            </div>
          </div>

        </div>

        {/* Right Card: Result & Diagnostic (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl border border-[#DCE5F0] p-6 shadow-md space-y-6">
            
            {/* Header Result Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Diagnóstico Oficial
                </span>
                <span className="text-xs font-semibold text-[#1976F3]">
                  {currentAirline.name}
                </span>
              </div>

              <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                compliance.isCompliant
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                {compliance.isCompliant ? (
                  <CheckCircle className="w-6 h-6 text-[#23A88A] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-[#D94B50] shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="text-base font-bold font-heading">
                    {compliance.isCompliant ? 'Bagagem Aprovada!' : 'Atenção: Limites Excedidos'}
                  </h3>
                  <p className="text-xs mt-1 leading-relaxed">
                    {compliance.message}
                  </p>
                </div>
              </div>

              {/* Tariff Warning if Basic */}
              {compliance.tariffWarning && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Aviso Importante sobre sua Tarifa:</span>
                    <span>{compliance.tariffWarning}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Dimensional Diffs Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Comparativo com os limites
              </h4>

              {luggageType !== 'despachada' ? (
                <div className="space-y-2 text-xs">
                  {/* Altura */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-600 font-medium">Altura:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#102746]">{heightCm} cm</span>
                      <span className="text-slate-400">(máx {compliance.limitHeight} cm)</span>
                      <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                        compliance.diffHeight > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {compliance.diffHeight > 0 ? `+${compliance.diffHeight.toFixed(1)} cm` : 'OK'}
                      </span>
                    </div>
                  </div>

                  {/* Largura */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-600 font-medium">Largura:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#102746]">{widthCm} cm</span>
                      <span className="text-slate-400">(máx {compliance.limitWidth} cm)</span>
                      <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                        compliance.diffWidth > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {compliance.diffWidth > 0 ? `+${compliance.diffWidth.toFixed(1)} cm` : 'OK'}
                      </span>
                    </div>
                  </div>

                  {/* Profundidade */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-600 font-medium">Profundidade:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#102746]">{depthCm} cm</span>
                      <span className="text-slate-400">(máx {compliance.limitDepth} cm)</span>
                      <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                        compliance.diffDepth > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {compliance.diffDepth > 0 ? `+${compliance.diffDepth.toFixed(1)} cm` : 'OK'}
                      </span>
                    </div>
                  </div>

                  {/* Peso */}
                  {luggageType === 'mao' && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                      <span className="text-slate-600 font-medium">Peso Total:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#102746]">{weightKg} kg</span>
                        <span className="text-slate-400">(máx {compliance.limitWeight} kg)</span>
                        <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                          compliance.diffWeight > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {compliance.diffWeight > 0 ? `+${compliance.diffWeight.toFixed(1)} kg` : 'OK'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  {/* Soma Linear */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-600 font-medium">Soma Linear (A + L + P):</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#102746]">{compliance.linearSum.toFixed(1)} cm</span>
                      <span className="text-slate-400">(máx {compliance.linearSumLimit} cm)</span>
                      <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                        compliance.diffLinearSum > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {compliance.diffLinearSum > 0 ? `+${compliance.diffLinearSum.toFixed(1)} cm` : 'OK'}
                      </span>
                    </div>
                  </div>

                  {/* Peso Despachada */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-600 font-medium">Peso por Peça:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#102746]">{weightKg} kg</span>
                      <span className="text-slate-400">(franquia {compliance.limitWeight} kg)</span>
                      <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                        compliance.diffWeight > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {compliance.diffWeight > 0 ? `+${compliance.diffWeight.toFixed(1)} kg excesso` : 'OK'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Official Source Link */}
            <div className="pt-4 border-t border-slate-100 text-xs flex items-center justify-between text-slate-500">
              <span>Fonte: Regras oficiais {currentAirline.code}</span>
              <a
                href={currentAirline.officialBagPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#1976F3] font-semibold hover:underline"
              >
                <span>Página da Cia</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Quick Notice about ANAC */}
          <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-[#102746] block">Norma ANAC Resolução nº 400:</span>
            <p>
              A franquia mínima de 10 kg para bagagem de mão é um direito legal garantido a todos os passageiros no Brasil. Nenhuma companhia aérea pode fixar limite de peso inferior a 10 kg em voos domésticos com partida em território nacional.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
