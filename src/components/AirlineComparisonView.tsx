import React, { useState } from 'react';
import { Scale, Check, AlertTriangle, ExternalLink, HelpCircle, ShieldCheck, Zap, Info } from 'lucide-react';
import { AIRLINES_DATA, ANAC_STANDARDS } from '../data/airlines';

export const AirlineComparisonView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'geral' | 'mao' | 'pessoal' | 'despachada' | 'tarifas' | 'powerbanks'>('geral');

  const topics = [
    { id: 'geral', label: 'Visão Geral' },
    { id: 'mao', label: 'Mala de Cabine (12 kg vs 10 kg)' },
    { id: 'powerbanks', label: 'Power Banks (Regras 2026)' },
    { id: 'tarifas', label: 'Tarifas (Basic vs Plus)' },
    { id: 'despachada', label: 'Bagagem Despachada (23 kg)' },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1976F3] text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Comparador Atualizado — Relatório de Monitoramento 10/11/2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102746]">
          Comparar regras: LATAM vs GOL vs Azul
        </h1>
        <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
          Consulte as diferenças oficiais de peso (12 kg na LATAM e GOL vs 10 kg na Azul), 
          regras tarifárias e a implementação das novas diretrizes de power banks aprovadas pela OACI e ANAC em 2026.
        </p>
      </div>

      {/* 2026 Regulatory Alert Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-xs text-[#102746] space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-[#1976F3]">
          <ShieldCheck className="w-4 h-4 text-[#23A88A]" />
          <span>Destaques Oficiais do Monitoramento (10/11/2026):</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-700 pt-1">
          <div className="p-2.5 bg-white rounded-xl border border-blue-100">
            <span className="font-bold text-[#102746] block mb-1">Mala de Cabine: 12 kg</span>
            A LATAM e a GOL aumentaram a franquia da mala de mão para 12 kg. A Azul mantém 10 kg. Na LATAM Premium, o limite sobe para 16 kg.
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-blue-100">
            <span className="font-bold text-[#102746] block mb-1">Tarifas "Basic"</span>
            Tanto a LATAM Basic quanto a GOL Basic <strong>NÃO</strong> incluem a mala de mão de 12 kg gratuitamente (apenas o item pessoal sob o assento).
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-blue-100">
            <span className="font-bold text-[#102746] block mb-1">Power Banks 2026</span>
            OACI (Doc 9284) e ANAC (Portaria 21/SPO): máximo 2 power banks, proibido usar para carregar aparelhos e proibido recarregar a bordo.
          </div>
        </div>
      </div>

      {/* Topic Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-4xl">
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTopic(t.id)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedTopic === t.id
                ? 'bg-white text-[#1976F3] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Comparison Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. LATAM Airlines */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xs hover:border-[#1976F3]/50 transition-all space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-red-600 tracking-wider uppercase mb-1">
              LATAM Airlines Brasil
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#102746]">
              LATAM
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Regra detalhada de power banks publicada
            </p>
          </div>

          {/* Bagagem de Mão */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mala de Cabine (Franquia Ampliada)
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-[#102746]">
                <span>Peso máximo:</span>
                <span className="text-[#1976F3]">12 kg (Economy) / 16 kg (Premium)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Dimensões:</span>
                <span className="font-semibold">55 x 35 x 25 cm</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Atenção: A tarifa Basic NÃO inclui a mala de 12 kg (apenas o item pessoal).
              </p>
            </div>
          </div>

          {/* Item Pessoal */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Item Pessoal
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Dimensões e peso:</span>
                <span className="font-bold text-[#102746]">45 x 35 x 20 cm, até 10 kg</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Mochila ou bolsa acomodada sob o assento dianteiro.
              </p>
            </div>
          </div>

          {/* Power Banks 2026 */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Power Banks (Regra Oficial 2026)</span>
            </span>
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1 text-slate-700">
              <div className="font-bold text-[#102746] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#23A88A]" />
                <span>Regra detalhada publicada</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                • Máximo 2 unidades de até 100 Wh cada.<br />
                • <strong>OBRIGATÓRIO ficar acessível sob o assento.</strong><br />
                • Proibido guardar no bagageiro superior.<br />
                • Proibido usar para carregar dispositivos em voo.<br />
                • Proibido ligar nas tomadas do avião.
              </p>
            </div>
          </div>

          {/* Tarifas */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Condições por Tarifa
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
              <p>• <strong>Basic:</strong> Apenas item pessoal (10 kg). Sem mala de cabine.</p>
              <p>• <strong>Light / Plus:</strong> Item pessoal + Mala cabine 12 kg (Plus inclui 1 despachada).</p>
              <p>• <strong>Top / Premium:</strong> Mala cabine até 16 kg + 2 despachadas 23 kg.</p>
            </div>
          </div>

          {/* Official link & verification */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Verificado: 10/11/2026</span>
            <a
              href={AIRLINES_DATA.LATAM.officialBagPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#1976F3] font-semibold hover:underline"
            >
              <span>Site LATAM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. GOL Linhas Aéreas */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xs hover:border-[#F47736]/50 transition-all space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-orange-600 tracking-wider uppercase mb-1">
              GOL Linhas Aéreas
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#102746]">
              GOL
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Vigência da nova regra: 04/05/2026
            </p>
          </div>

          {/* Bagagem de Mão */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mala de Cabine (Franquia Ampliada)
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-[#102746]">
                <span>Peso máximo:</span>
                <span className="text-[#F47736]">12 kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Dimensões:</span>
                <span className="font-semibold">55 x 35 x 25 cm</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Na GOL apresentada como 35 x 55 x 25 cm. Tarifa Basic inclui apenas item pessoal.
              </p>
            </div>
          </div>

          {/* Item Pessoal */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Item Pessoal
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Dimensões e peso:</span>
                <span className="font-bold text-[#102746]">43 x 32 x 22 cm, até 10 kg</span>
              </div>
              <p className="text-[11px] text-slate-500">
                (Listada como 32 x 22 x 43 cm) posicionada sob o assento.
              </p>
            </div>
          </div>

          {/* Power Banks 2026 */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Power Banks (Regra 2026)</span>
            </span>
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1 text-slate-700">
              <div className="font-bold text-amber-900 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#F47736]" />
                <span>Detalhe a confirmar (GOL)</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                • Vigência das novas regras: 04/05/2026.<br />
                • Exclusivamente na cabine até 100 Wh.<br />
                • <strong>Ponto de atenção:</strong> Regra geral cita até 20 baterias sobressalentes, pendente detalhamento específico da cota individual de 2 unidades prevista no Adendo nº 1 OACI / Portaria 21/SPO.
              </p>
            </div>
          </div>

          {/* Tarifas */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Condições por Tarifa
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
              <p>• <strong>Basic:</strong> Apenas item pessoal (10 kg). Mala de cabine deve ser comprada.</p>
              <p>• <strong>Light / Plus:</strong> Item pessoal + Mala cabine 12 kg (Plus inclui 1 despachada).</p>
              <p>• <strong>Max:</strong> Item pessoal + Mala cabine 12 kg + 2 peças despachadas de 23 kg.</p>
            </div>
          </div>

          {/* Official link & verification */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Verificado: 10/11/2026</span>
            <a
              href={AIRLINES_DATA.GOL.officialBagPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#F47736] font-semibold hover:underline"
            >
              <span>Site GOL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3. Azul Linhas Aéreas */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xs hover:border-[#1976F3]/50 transition-all space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">
              Azul Linhas Aéreas
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#102746]">
              Azul
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Confirmação pendente de publicação detalhada
            </p>
          </div>

          {/* Bagagem de Mão */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mala de Cabine (Padrão ANAC)
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-[#102746]">
                <span>Peso máximo:</span>
                <span className="text-[#1976F3]">10 kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Dimensões:</span>
                <span className="font-semibold">55 x 35 x 25 cm</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Atenção nos voos da Azul Conecta (Caravan) onde há restrição maior de espaço físico.
              </p>
            </div>
          </div>

          {/* Item Pessoal */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Item Pessoal
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Dimensões:</span>
                <span className="font-bold text-[#102746]">45 x 35 x 20 cm</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Guardado sob o assento à frente.
              </p>
            </div>
          </div>

          {/* Power Banks 2026 */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Power Banks (Status Oficial 2026)</span>
            </span>
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1 text-slate-700">
              <div className="font-bold text-amber-900 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#F47736]" />
                <span>Confirmação pendente</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                • A página de bagagens da Azul não apresenta seção detalhada atualizada com o novo teto de 2 power banks da OACI/Portaria 21/SPO.<br />
                • <strong>Princípio de Rigor BagagemOK:</strong> ausência de informação não é permissão irrestrita. Consulte a Azul antes de viajar.
              </p>
            </div>
          </div>

          {/* Tarifas */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Condições por Tarifa
            </span>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
              <p>• <strong>Azul (Básica):</strong> Inclui item pessoal + Mala de cabine de 10 kg. Sem despachada.</p>
              <p>• <strong>MaisAzul:</strong> Inclui item pessoal + Mala de cabine 10 kg + 1 despachada 23 kg.</p>
              <p>• <strong>Azul Super:</strong> Inclui bagagens despachadas múltiplas de 23 kg conforme rota.</p>
            </div>
          </div>

          {/* Official link & verification */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Verificado: 10/11/2026</span>
            <a
              href={AIRLINES_DATA.AZUL.officialBagPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#1976F3] font-semibold hover:underline"
            >
              <span>Site Azul</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Side-by-Side Detailed Comparison Table */}
      <div className="bg-white rounded-2xl border border-[#DCE5F0] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#23A88A]" />
            <h3 className="text-lg font-bold font-heading text-[#102746]">
              Tabela Comparativa Atualizada (Novembro/2026)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Fontes: ANAC (Portaria 21/SPO), OACI (Doc 9284) e Cias Aéreas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold text-slate-600">Critério</th>
                <th className="py-3.5 px-4 font-bold text-[#102746]">LATAM Airlines</th>
                <th className="py-3.5 px-4 font-bold text-[#102746]">GOL Linhas Aéreas</th>
                <th className="py-3.5 px-4 font-bold text-[#102746]">Azul Linhas Aéreas</th>
                <th className="py-3.5 px-4 font-semibold text-slate-500">Regra Oficial ANAC/OACI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-semibold text-[#102746]">Mala de cabine (Peso)</td>
                <td className="py-3 px-4 font-bold text-[#1976F3]">12 kg (16 kg Premium)</td>
                <td className="py-3 px-4 font-bold text-[#1976F3]">12 kg</td>
                <td className="py-3 px-4">10 kg</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">Mínimo 10 kg garantido</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#102746]">Mala de cabine (Medidas)</td>
                <td className="py-3 px-4">55 x 35 x 25 cm</td>
                <td className="py-3 px-4">55 x 35 x 25 cm (35x55x25)</td>
                <td className="py-3 px-4">55 x 35 x 25 cm</td>
                <td className="py-3 px-4">55 x 35 x 25 cm padrão</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#102746]">Item pessoal (Mochila)</td>
                <td className="py-3 px-4">45 x 35 x 20 cm (10 kg)</td>
                <td className="py-3 px-4">43 x 32 x 22 cm (10 kg)</td>
                <td className="py-3 px-4">45 x 35 x 20 cm</td>
                <td className="py-3 px-4">Sob o assento dianteiro</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#102746]">Tarifa Basic inclui mala?</td>
                <td className="py-3 px-4 text-rose-600 font-semibold">NÃO (Apenas item pessoal)</td>
                <td className="py-3 px-4 text-rose-600 font-semibold">NÃO (Apenas item pessoal)</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">SIM (10 kg de mão)</td>
                <td className="py-3 px-4">Depende da tarifa contratada</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#102746]">Power banks: Cota 2026</td>
                <td className="py-3 px-4 font-semibold text-emerald-700">Máx 2 unidades (100 Wh)</td>
                <td className="py-3 px-4 text-amber-700 font-medium">Detalhe a confirmar (cita 20)</td>
                <td className="py-3 px-4 text-amber-700 font-medium">Confirmação pendente</td>
                <td className="py-3 px-4 font-bold text-[#102746]">Máx 2 unidades (Doc 9284)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#102746]">Power banks: Acomodação</td>
                <td className="py-3 px-4 text-red-700 font-bold">Sob o assento (vetado no bin)</td>
                <td className="py-3 px-4">Cabine / Protegido</td>
                <td className="py-3 px-4">Cabine / Protegido</td>
                <td className="py-3 px-4 text-red-700 font-bold">VETADO NO PORÃO (RBAC 175)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#102746]">Usar/Recarregar em voo</td>
                <td className="py-3 px-4 text-rose-600 font-bold">PROIBIDO</td>
                <td className="py-3 px-4 text-rose-600 font-bold">PROIBIDO</td>
                <td className="py-3 px-4 text-rose-600 font-bold">PROIBIDO</td>
                <td className="py-3 px-4 text-rose-600 font-bold">PROIBIDO (OACI 2026)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
