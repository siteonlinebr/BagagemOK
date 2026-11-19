import React, { useState } from 'react';
import { Scale, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { AIRLINES_DATA } from '../data/airlines';

type TopicId = 'geral' | 'mao' | 'powerbanks' | 'tarifas' | 'despachada';

export const AirlineComparisonView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId>('geral');

  const topics: { id: TopicId; label: string }[] = [
    { id: 'geral', label: 'Visão Geral' },
    { id: 'mao', label: 'Mala de Cabine (12 kg vs 10 kg)' },
    { id: 'powerbanks', label: 'Power Banks (Regras 2026)' },
    { id: 'tarifas', label: 'Tarifas (Basic vs Plus)' },
    { id: 'despachada', label: 'Bagagem Despachada (23 kg)' },
  ];

  const showSection = (section: Exclude<TopicId, 'geral'>) =>
    selectedTopic === 'geral' || selectedTopic === section;

  const tableRows: {
    topic: Exclude<TopicId, 'geral'>;
    label: string;
    latam: React.ReactNode;
    gol: React.ReactNode;
    azul: React.ReactNode;
    official: React.ReactNode;
  }[] = [
    {
      topic: 'mao',
      label: 'Mala de cabine (Peso)',
      latam: <span className="font-bold text-[#1976F3]">12 kg (16 kg Premium)</span>,
      gol: <span className="font-bold text-[#1976F3]">12 kg</span>,
      azul: '10 kg',
      official: <span className="text-emerald-700 font-semibold">Mínimo 10 kg garantido (ANAC)</span>,
    },
    {
      topic: 'mao',
      label: 'Mala de cabine (Medidas)',
      latam: '55 × 35 × 25 cm',
      gol: '55 × 35 × 25 cm (35×55×25)',
      azul: '55 × 35 × 25 cm',
      official: '55 × 35 × 25 cm padrão',
    },
    {
      topic: 'mao',
      label: 'Item pessoal (Mochila)',
      latam: '45 × 35 × 20 cm (até 10 kg)',
      gol: '43 × 32 × 22 cm (até 10 kg)',
      azul: '45 × 35 × 20 cm',
      official: 'Sob o assento dianteiro',
    },
    {
      topic: 'tarifas',
      label: 'Tarifa Basic inclui mala?',
      latam: <span className="text-rose-600 font-semibold">NÃO (Apenas item pessoal)</span>,
      gol: <span className="text-rose-600 font-semibold">NÃO (Apenas item pessoal)</span>,
      azul: <span className="text-emerald-700 font-semibold">SIM (10 kg de mão)</span>,
      official: 'Franquia varia conforme tarifa',
    },
    {
      topic: 'despachada',
      label: 'Bagagem despachada (Peso)',
      latam: '23 kg padrão (máx. 32 kg c/ excesso)',
      gol: '23 kg padrão (máx. 32 kg c/ excesso)',
      azul: '23 kg padrão (máx. 32 kg c/ excesso)',
      official: 'Até 23 kg por peça comum',
    },
    {
      topic: 'despachada',
      label: 'Despachada (Dimensões)',
      latam: 'Até 158 cm lineares (A+L+P)',
      gol: 'Até 158 cm lineares (A+L+P)',
      azul: 'Até 158 cm lineares (A+L+P)',
      official: '158 cm lineares padrão',
    },
    {
      topic: 'powerbanks',
      label: 'Power banks: Cota 2026',
      latam: <span className="font-semibold text-emerald-700">Máx. 2 unidades (até 100 Wh)</span>,
      gol: <span className="text-amber-700 font-medium">Inconsistência documental (cita 20)</span>,
      azul: <span className="text-amber-700 font-medium">Confirmação documental pendente</span>,
      official: <span className="font-bold text-[#102746]">Máx. 2 unidades (OACI desde 27/03/2026)</span>,
    },
    {
      topic: 'powerbanks',
      label: 'Power banks: Acomodação',
      latam: <span className="text-rose-700 font-bold">Sob o assento (vetado no bin)</span>,
      gol: 'Somente na cabine / protegido',
      azul: 'Somente na cabine / protegido',
      official: <span className="text-rose-700 font-bold">VETADO NO PORÃO (RBAC 175)</span>,
    },
    {
      topic: 'powerbanks',
      label: 'Recarregar / usar em voo',
      latam: <span className="text-rose-600 font-bold">PROIBIDO recarregar e carregar aparelhos</span>,
      gol: <span className="text-amber-700 font-semibold">Proibido recarregar; OACI recomenda não usar</span>,
      azul: <span className="text-amber-700 font-semibold">Proibido recarregar; OACI recomenda não usar</span>,
      official: <span className="text-rose-700 font-semibold">Proibido recarregar; OACI recomenda não usar</span>,
    },
  ];

  const visibleRows =
    selectedTopic === 'geral'
      ? tableRows
      : tableRows.filter((r) => r.topic === selectedTopic);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1976F3] text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Comparador Atualizado — Verificado em 19/11/2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102746]">
          Comparar regras: LATAM vs GOL vs Azul
        </h1>
        <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
          Consulte as diferenças oficiais de peso (12 kg na LATAM e GOL vs 10 kg na Azul), 
          regras tarifárias e as divergências documentais nas diretrizes de power banks da OACI e ANAC.
        </p>
      </div>

      {/* 2026 Regulatory Alert Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-xs text-[#102746] space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-[#1976F3]">
          <ShieldCheck className="w-4 h-4 text-[#23A88A]" />
          <span>Destaques Oficiais do Monitoramento (19/11/2026):</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-700 pt-1">
          <div className="p-2.5 bg-white rounded-xl border border-blue-100">
            <span className="font-bold text-[#102746] block mb-1">Mala de Cabine: 10, 12 e 16 kg</span>
            LATAM e GOL permitem 12 kg na mala de mão (até 16 kg na LATAM Premium). A Azul mantém 10 kg. Medidas padrão: 55 × 35 × 25 cm.
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-blue-100">
            <span className="font-bold text-[#102746] block mb-1">Tarifas "Basic"</span>
            Tanto a LATAM Basic quanto a GOL Basic <strong>NÃO</strong> incluem a mala de mão de 12 kg gratuitamente (apenas o item pessoal sob o assento).
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-blue-100">
            <span className="font-bold text-[#102746] block mb-1">Power Banks (OACI / ANAC)</span>
            Máximo de 2 unidades até 100 Wh na cabine. Proibido recarregar em voo; OACI recomenda não usar para carregar aparelhos e a LATAM proíbe expressamente.
          </div>
        </div>
      </div>

      {/* Topic Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 bg-slate-100 rounded-xl w-full lg:w-fit">
        {topics.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelectedTopic(t.id)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-xs hover:border-[#1976F3]/50 transition-all flex flex-col justify-between gap-5">
          <div className="space-y-5">
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

            {/* Bagagem de Mão + Item Pessoal */}
            {showSection('mao') && (
              <>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Mala de Cabine (Franquia Ampliada)
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between gap-2 font-bold text-[#102746]">
                      <span>Peso máximo:</span>
                      <span className="text-[#1976F3] text-right">12 kg (Economy) / 16 kg (Premium)</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Dimensões:</span>
                      <span className="font-semibold">55 × 35 × 25 cm</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Atenção: A tarifa Basic NÃO inclui a mala de 12 kg (apenas o item pessoal).
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Item Pessoal
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between gap-2 text-slate-600">
                      <span>Dimensões e peso:</span>
                      <span className="font-bold text-[#102746] text-right">45 × 35 × 20 cm, até 10 kg</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Mochila ou bolsa acomodada sob o assento dianteiro.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Power Banks 2026 */}
            {showSection('powerbanks') && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Power Banks (Regra Oficial 2026)</span>
                </span>
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1 text-slate-700">
                  <div className="font-bold text-[#102746] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#23A88A]" />
                    <span>Regra detalhada publicada</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    • Máximo 2 unidades de até 100 Wh cada.<br />
                    • <strong>OBRIGATÓRIO armazenamento acessível sob o assento.</strong><br />
                    • Proibido guardar no bagageiro superior.<br />
                    • <strong>Proíbe utilizar</strong> para carregar outros dispositivos durante o voo.<br />
                    • Proibido recarregar nas tomadas da aeronave.
                  </p>
                </div>
              </div>
            )}

            {/* Tarifas */}
            {showSection('tarifas') && (
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
            )}

            {/* Despachada */}
            {showSection('despachada') && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Bagagem Despachada (Porão)
                </span>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between font-bold text-[#102746]">
                    <span>Franquia padrão:</span>
                    <span>23 kg / até 158 cm lineares</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Limite absoluto com taxa de excesso: 32 kg (rotas domésticas/América do Sul).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Official link & verification */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Verificado: 19/11/2026</span>
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
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-xs hover:border-[#F47736]/50 transition-all flex flex-col justify-between gap-5">
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-orange-600 tracking-wider uppercase mb-1">
                GOL Linhas Aéreas
              </div>
              <h2 className="text-2xl font-bold font-heading text-[#102746]">
                GOL
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Inconsistência documental em power banks
              </p>
            </div>

            {/* Bagagem de Mão + Item Pessoal */}
            {showSection('mao') && (
              <>
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
                      <span className="font-semibold">55 × 35 × 25 cm</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Na GOL apresentada como 35 × 55 × 25 cm. Tarifa Basic inclui apenas item pessoal.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Item Pessoal
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between gap-2 text-slate-600">
                      <span>Dimensões e peso:</span>
                      <span className="font-bold text-[#102746] text-right">43 × 32 × 22 cm, até 10 kg</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      (Listada como 32 × 22 × 43 cm) posicionada sob o assento.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Power Banks 2026 */}
            {showSection('powerbanks') && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Power Banks (Regra 2026)</span>
                </span>
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1 text-slate-700">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F47736]" />
                    <span>Inconsistência documental (GOL)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    • Regras de baterias vigentes desde 04/05/2026.<br />
                    • Exclusivamente na cabine até 100 Wh (nunca no porão).<br />
                    • <strong>Ponto de atenção:</strong> A documentação da GOL apresenta inconsistência entre o limite geral de baterias sobressalentes (até 20) e as regras específicas de power banks (teto de 2 unidades da OACI).
                  </p>
                </div>
              </div>
            )}

            {/* Tarifas */}
            {showSection('tarifas') && (
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
            )}

            {/* Despachada */}
            {showSection('despachada') && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Bagagem Despachada (Porão)
                </span>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between font-bold text-[#102746]">
                    <span>Franquia padrão:</span>
                    <span>23 kg / até 158 cm lineares</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Acima de 23 kg até 32 kg incide cobrança de excesso; acima de 32 kg vai via GOLLOG.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Official link & verification */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Verificado: 19/11/2026</span>
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
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-xs hover:border-[#1976F3]/50 transition-all flex flex-col justify-between gap-5">
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">
                Azul Linhas Aéreas
              </div>
              <h2 className="text-2xl font-bold font-heading text-[#102746]">
                Azul
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Confirmação documental pendente para power banks
              </p>
            </div>

            {/* Bagagem de Mão + Item Pessoal */}
            {showSection('mao') && (
              <>
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
                      <span className="font-semibold">55 × 35 × 25 cm</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Atenção nos voos da Azul Conecta (Caravan) onde há restrição maior de espaço físico.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Item Pessoal
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Dimensões:</span>
                      <span className="font-bold text-[#102746]">45 × 35 × 20 cm</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Guardado sob o assento à frente.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Power Banks 2026 */}
            {showSection('powerbanks') && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Power Banks (Status Oficial 2026)</span>
                </span>
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1 text-slate-700">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F47736]" />
                    <span>Confirmação documental pendente</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    • Ainda falta confirmação documental detalhada da política operacional da Azul para power banks.<br />
                    • <strong>Princípio de Rigor BagagemOK:</strong> ausência de detalhe publicado não significa permissão irrestrita. Siga o teto de 2 unidades da OACI e confirme antes do voo.
                  </p>
                </div>
              </div>
            )}

            {/* Tarifas */}
            {showSection('tarifas') && (
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
            )}

            {/* Despachada */}
            {showSection('despachada') && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Bagagem Despachada (Porão)
                </span>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between font-bold text-[#102746]">
                    <span>Franquia padrão:</span>
                    <span>23 kg / até 158 cm lineares</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Excesso aceito até 32 kg por peça mediante taxa; itens maiores via Azul Cargo.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Official link & verification */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Verificado: 19/11/2026</span>
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
            <ShieldCheck className="w-5 h-5 text-[#23A88A] shrink-0" />
            <h3 className="text-base sm:text-lg font-bold font-heading text-[#102746]">
              Tabela Comparativa Atualizada (19/11/2026)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Fontes: ANAC (Portaria 21/SPO), OACI (Doc 9284) e Cias Aéreas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm min-w-[680px]">
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
              {visibleRows.map((row) => (
                <tr key={row.label} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#102746]">{row.label}</td>
                  <td className="py-3 px-4">{row.latam}</td>
                  <td className="py-3 px-4">{row.gol}</td>
                  <td className="py-3 px-4">{row.azul}</td>
                  <td className="py-3 px-4">{row.official}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
