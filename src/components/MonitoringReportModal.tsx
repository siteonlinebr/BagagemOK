import React, { useEffect } from 'react';
import { 
  X, 
  FileCheck2, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  Calendar,
  Landmark
} from 'lucide-react';

interface MonitoringReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBatteryCalc: () => void;
}

export const MonitoringReportModal: React.FC<MonitoringReportModalProps> = ({
  isOpen,
  onClose,
  onOpenBatteryCalc,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full shadow-2xl border border-[#DCE5F0] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-[#102746] text-white p-4 sm:p-6 flex items-start justify-between gap-3 border-b border-[#172B46] shrink-0">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1976F3] text-white text-[11px] font-bold tracking-wide flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Resumo Atualizado</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Verificado em 19/11/2026</span>
              </span>
            </div>
            <h2 id="report-modal-title" className="text-lg sm:text-2xl font-bold font-heading text-white leading-snug">
              BagagemOK — Relatório de Monitoramento Oficial
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Auditoria contínua das regras de aviação civil (ANAC, OACI, LATAM, GOL, Azul) e aduana (Receita Federal).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Fechar relatório"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-7 overflow-y-auto space-y-6 text-sm text-[#172B46]">
          
          {/* Section 1: What Changed (19/11/2026) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2.5">
            <div className="flex items-center gap-2 text-[#102746] font-bold text-sm">
              <Landmark className="w-5 h-5 text-[#1976F3] shrink-0" />
              <span>1. O que mudou desde o relatório de 10/11/2026?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Nenhuma mudança relevante nas regras aéreas confirmada.</strong> Porém, houve uma atualização oficial importante na <strong>Receita Federal em 13/11/2026</strong>:
            </p>
            <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside leading-relaxed">
              <li><strong>Página oficial &ldquo;Bens do viajante&rdquo; (13/11/2026):</strong> atualiza orientações sobre bagagem internacional, eletrônicos, bens pessoais e tributação na entrada no Brasil.</li>
              <li><strong>Escopo:</strong> não altera as regras de bagagem de mão ou despachada das companhias aéreas.</li>
            </ul>
            <a
              href="https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/viagens-internacionais"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#1976F3] font-semibold hover:underline pt-1"
            >
              <span>Fonte: Receita Federal — Bens do viajante</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Section 2: Power Banks */}
          <section className="space-y-3">
            <h3 className="text-base font-bold font-heading text-[#102746] flex items-center gap-2 border-b border-slate-200 pb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>2. O mais importante: Power Banks (Regra OACI desde 27/03/2026)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[#102746]">Regra Geral Internacional (OACI / ANAC)</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#102746] text-white text-[10px] font-bold shrink-0">
                    Máx. 2 unidades
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside text-xs leading-relaxed">
                  <li><strong>Até 100 Wh</strong> por unidade (máximo 2 por passageiro).</li>
                  <li><strong>Entre 100 e 160 Wh:</strong> autorização da companhia, conforme condições aplicáveis.</li>
                  <li><strong>Acima de 160 Wh:</strong> proibido em voos comerciais.</li>
                  <li><strong>Somente na bagagem de mão</strong> — nunca na bagagem despachada.</li>
                  <li><strong>Não podem ser recarregados durante o voo.</strong></li>
                  <li>A <strong>OACI recomenda</strong> não utilizá-los para carregar outros aparelhos durante o voo.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-[#102746] block">Base Regulatória Brasileira (ANAC)</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-slate-700 border border-slate-200 rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-slate-100/70">
                        <td className="p-2 font-semibold">OACI (Doc 9284)</td>
                        <td className="p-2">Adendo nº 1 — aplicável desde 27/03/2026</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">ANAC</td>
                        <td className="p-2">Portaria nº 21/SPO (IS 175-001M)</td>
                      </tr>
                      <tr className="bg-slate-100/70">
                        <td className="p-2 font-semibold">Publicação DOU</td>
                        <td className="p-2">06/04/2026 (Vigência imediata)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Última Checagem</td>
                        <td className="p-2 font-semibold text-emerald-700">19/11/2026 (Verificado)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Airlines Matrix */}
          <section className="space-y-3">
            <h3 className="text-base font-bold font-heading text-[#102746] flex items-center gap-2 border-b border-slate-200 pb-2">
              <Building2 className="w-4 h-4 text-[#1976F3]" />
              <span>3. Diferenças entre Companhias Aéreas (Verificado em 19/11/2026)</span>
            </h3>

            <div className="space-y-3">
              {/* LATAM */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#102746]">LATAM Airlines</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                      Regra detalhada publicada
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Vigência: Abril/2026</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Proíbe</strong> utilizar power banks para carregar outros dispositivos durante o voo, proíbe recarregar nas tomadas e exige armazenamento acessível <strong>sob o assento</strong> (vetado no compartimento superior). Limite de até 2 unidades de até 100 Wh.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Cabine: 12 kg (Economy) / 16 kg (Premium)
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-medium">
                    Tarifa Basic: NÃO inclui mala de cabine
                  </span>
                </div>
              </div>

              {/* GOL */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#102746]">GOL Linhas Aéreas</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                      Inconsistência documental
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Vigência: 04/05/2026</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  A documentação da GOL apresenta <strong>inconsistência entre o limite geral de baterias sobressalentes (até 20) e as regras específicas de power banks</strong> (limite OACI de 2 unidades). Power banks devem ir apenas na cabine até 100 Wh (100–160 Wh com autorização).
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Cabine: 12 kg (55×35×25 cm)
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Item pessoal: até 10 kg (43×32×22 cm)
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-medium">
                    Tarifa Basic: apenas item pessoal
                  </span>
                </div>
              </div>

              {/* AZUL */}
              <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#102746]">Azul Linhas Aéreas</span>
                    <span className="px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-bold">
                      Confirmação pendente
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Status 19/11/2026</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Ainda <strong>falta confirmação documental detalhada</strong> de sua política operacional específica para power banks. <strong>Diretriz BagagemOK:</strong> ausência de informação não é permissão irrestrita — siga o teto de 2 unidades da OACI e consulte a companhia antes de viajar.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Cabine: 10 kg (55×35×25 cm)
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Item pessoal: 45×35×20 cm
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Summary Table of Stable Rules */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold font-heading text-[#102746] flex items-center gap-2 border-b border-slate-200 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#23A88A]" />
              <span>4. O que continua valendo</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[#102746] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Assunto</th>
                    <th className="py-2.5 px-3">Regra importante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr><td className="py-2 px-3 font-semibold text-[#102746]">Mala de cabine</td><td className="py-2 px-3">Geralmente 55 × 35 × 25 cm</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-[#102746]">Peso de cabine</td><td className="py-2 px-3">Varia entre 10, 12 e 16 kg, conforme companhia e cabine</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-[#102746]">Líquidos internacionais</td><td className="py-2 px-3">Frascos de até 100 ml em saco transparente de 1 litro</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-[#102746]">Medicamentos</td><td className="py-2 px-3">Exceções específicas mediante receita e condições</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-[#102746]">Baterias extras</td><td className="py-2 px-3">Protegidas contra curto-circuito e sempre na cabine</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-[#102746]">Tarifas</td><td className="py-2 px-3">Franquia varia conforme a tarifa da passagem contratada</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-[#102746]">Alimentos</td><td className="py-2 px-3">Podem existir restrições sanitárias no país de destino</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Commitment */}
          <section className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-1.5">
            <div className="flex items-center gap-2 text-[#102746] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#23A88A]" />
              <span>Compromisso Editorial do BagagemOK</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Cada resposta exibe data de verificação e fonte oficial. Não declaramos &ldquo;permitido&rdquo; quando há inconsistência ou ausência de documentação da companhia aérea.
            </p>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-[#DCE5F0] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] sm:text-xs text-slate-500 text-center sm:text-left">
            Fontes: ANAC &middot; OACI &middot; Ministério (MPor) &middot; Receita Federal &middot; LATAM &middot; GOL &middot; Azul
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onOpenBatteryCalc();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#1976F3] hover:bg-[#1664d1] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Calcular Power Bank (Wh)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#172B46] border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
