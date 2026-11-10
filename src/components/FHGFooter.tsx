import React from 'react';
import { Luggage, ExternalLink, ShieldCheck, FileCheck2 } from 'lucide-react';

interface FHGFooterProps {
  onNavigateTab: (tab: 'inicio' | 'consultar' | 'medir' | 'comparador' | 'guias' | 'minhas-consultas') => void;
  onOpenBatteryCalc: () => void;
  onOpenReport?: () => void;
}

export const FHGFooter: React.FC<FHGFooterProps> = ({
  onNavigateTab,
  onOpenBatteryCalc,
  onOpenReport,
}) => {
  return (
    <footer className="bg-[#102746] text-white pt-12 pb-6 border-t border-[#172B46] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-700/60">
          
          {/* Brand & Slogan */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1976F3] flex items-center justify-center text-white font-bold shadow-xs">
                <Luggage className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold font-heading text-white">
                Bagagem<span className="text-[#3E9AF7]">OK</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              O que pode ir na sua mala? Plataforma brasileira independente para consulta 
              e verificação de regras de bagagem aérea em voos nacionais e internacionais.
            </p>
          </div>

          {/* Quick Tools Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Ferramentas
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('consultar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Consultar item e regras
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('medir')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medir e pesar mala de bordo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('comparador')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Comparador LATAM, GOL e Azul
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBatteryCalc}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Calculadora de Baterias (Wh)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('minhas-consultas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Minha lista de viagem (Checklist)
                </button>
              </li>
            </ul>
          </div>

          {/* Guides Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Guias e Legislação
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('guias')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  O que levar na bagagem de mão
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('guias')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Regra dos 100 ml em voos internacionais
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('guias')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cuidados com power banks e lítio
                </button>
              </li>
              <li>
                <a
                  href="https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>ANAC — Resolução nº 400</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Transparency Disclaimer */}
          <div className="space-y-2.5 text-xs text-slate-400">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#23A88A]" />
              <span>Confiabilidade & Transparência</span>
            </h4>
            <p className="leading-relaxed">
              O BagagemOK é uma ferramenta informativa independente. Nossas informações são auditadas 
              periodicamente contra resoluções da ANAC e regras operacionais das companhias.
            </p>
            {onOpenReport && (
              <button
                onClick={onOpenReport}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 font-semibold transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ver Relatório Oficial (10/11/2026)</span>
              </button>
            )}
          </div>

        </div>

        {/* Institutional Future Horizon Group (FHG) Section as required by section 17 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-400">
          
          <div className="flex items-center gap-2.5">
            {/* Suitcase Checkmark Blue Box as shown in mockup footer */}
            <div className="w-6 h-6 rounded-md bg-[#1976F3] flex items-center justify-center text-white shrink-0">
              <Luggage className="w-3.5 h-3.5" />
            </div>
            <span>
              Um projeto independente integrante do Future Horizon Group (FHG).
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://siteonlinebr.github.io/Fhg.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
            >
              <span>Conheça o grupo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
