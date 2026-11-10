import React from 'react';
import { 
  X, 
  FileCheck2, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Building2, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  Luggage,
  Calendar
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#DCE5F0] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="report-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-[#102746] text-white p-5 sm:p-6 flex items-start justify-between border-b border-[#172B46] shrink-0">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1976F3] text-white text-[11px] font-bold tracking-wide flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Auditoria Oficial</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Monitoramento concluído em 10/11/2026</span>
              </span>
            </div>
            <h2 id="report-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white">
              BagagemOK — Relatório de Monitoramento Oficial
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Primeira referência oficial de regras verificadas para aviação civil brasileira e internacional.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar relatório"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-sm text-[#172B46]">
          
          {/* Executive Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Destaque Principal de 2026: Mudança Global em Power Banks & Baterias</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              A <strong>Organização da Aviação Civil Internacional (OACI/ICAO)</strong> aprovou o <strong>Adendo nº 1 ao Doc 9284</strong> (aplicável desde 27 de março de 2026). No Brasil, a <strong>ANAC</strong> aprovou a revisão M da Instrução Suplementar 175-001 por meio da <strong>Portaria Regulatória nº 21/SPO</strong> (publicada no DOU em 06/04/2026).
            </p>
          </div>

          {/* Section 1: Regulatory Updates Confirmed */}
          <section className="space-y-3">
            <h3 className="text-base font-bold font-heading text-[#102746] flex items-center gap-2 border-b border-slate-200 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#1976F3]" />
              <span>1. Atualizações Regulatórias Confirmadas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-[#102746] block">OACI / ICAO (Adendo nº 1 ao Doc 9284)</span>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside text-xs leading-relaxed">
                  <li><strong>Máximo de 2 power banks</strong> por passageiro.</li>
                  <li>Transporte <strong>exclusivamente na cabine</strong> (proibido no porão).</li>
                  <li><strong>Proibido recarregar</strong> o power bank a bordo do avião.</li>
                  <li><strong>Proibido usar</strong> para recarregar dispositivos durante o voo.</li>
                  <li>Proteção individual obrigatória contra curto-circuito.</li>
                  <li>Limite geral de até 100 Wh (100 a 160 Wh exige autorização).</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-[#102746] block">ANAC — Portaria nº 21/SPO (IS 175-001M)</span>
                <table className="w-full text-xs text-slate-700 border border-slate-200 rounded-lg overflow-hidden">
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-slate-100/70">
                      <td className="p-2 font-semibold">Documento</td>
                      <td className="p-2">Portaria Regulatória nº 21/SPO</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Data Aprovação</td>
                      <td className="p-2">01/04/2026</td>
                    </tr>
                    <tr className="bg-slate-100/70">
                      <td className="p-2 font-semibold">Publicação DOU</td>
                      <td className="p-2">06/04/2026 (Vigência Imediata)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Nota 04-05/Nov/2026</td>
                      <td className="p-2">Procedimentos de notificação (não altera regras)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 2: Airlines Matrix */}
          <section className="space-y-3">
            <h3 className="text-base font-bold font-heading text-[#102746] flex items-center gap-2 border-b border-slate-200 pb-2">
              <Building2 className="w-4 h-4 text-[#1976F3]" />
              <span>2. Como estão as Companhias Aéreas (Situação Verificada)</span>
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
                  <span className="text-xs text-slate-500">Vigência: Abril de 2026</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Permitidos no máximo <strong>2 power banks de até 100 Wh cada</strong>, somente na cabine. 
                  <strong> Regra obrigatória:</strong> devem ficar acessíveis sob o assento dianteiro — 
                  <strong> é proibido guardar no compartimento superior (overhead bin)</strong>. Não podem ser despachados 
                  e é proibido recarregar celulares a bordo ou conectar às tomadas.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Mala de cabine: 12 kg (Economy) / 16 kg (Premium)
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-medium">
                    Tarifa Basic: NÃO inclui mala de cabine
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-medium">
                    Líquidos domésticos: até 4x 300ml para higiene/saúde
                  </span>
                </div>
              </div>

              {/* GOL */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#102746]">GOL Linhas Aéreas</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                      Detalhe a confirmar
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Vigência: 04/05/2026</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  A GOL informa oficialmente que as novas regras de baterias vigoram desde 04/05/2026. 
                  Baterias sobressalentes e power banks viajam na cabine até 100 Wh. 
                  <strong> Ponto de atenção:</strong> a página da GOL ainda cita até 20 baterias sobressalentes 
                  na regra geral e não detalhou expressamente o teto individual de 2 power banks da OACI/Portaria 21.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Mala de cabine: 12 kg (55x35x25 cm)
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Item pessoal: até 10 kg (43x32x22 cm)
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
                  <span className="text-xs text-slate-500">Status 2026</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  A página da Azul não apresenta seção específica detalhada sobre a nova regra de 2 power banks 
                  da OACI/ANAC. <strong>Diretriz BagagemOK:</strong> ausência de informação na página não autoriza 
                  transporte indiscriminado. Passageiros devem seguir a regra mandatória de segurança da aviação.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Mala de cabine: 10 kg (55x35x25 cm)
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium text-slate-700">
                    Item pessoal: 45x35x20 cm
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: BagagemOK Compliance Guarantee */}
          <section className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-[#102746] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#23A88A]" />
              <span>Compromisso Editorial do BagagemOK</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              O BagagemOK não declara &quot;permitido&quot; quando a companhia ainda não publicou formalmente o detalhamento. 
              Classificamos com transparência: <em>Regra detalhada publicada</em>, <em>Detalhe a confirmar</em> ou 
              <em>Confirmação pendente</em>, garantindo que você nunca seja surpreendido no portão de embarque.
            </p>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-[#DCE5F0] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Fonte primária: OACI Doc 9284 &middot; ANAC IS 175-001M &middot; Portaria 21/SPO
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onOpenBatteryCalc();
              }}
              className="px-4 py-2 rounded-xl bg-[#1976F3] hover:bg-[#1664d1] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Simular Meu Power Bank (Wh)</span>
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
