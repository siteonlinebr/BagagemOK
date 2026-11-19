import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, ExternalLink, ShieldCheck, ChevronLeft, Zap, Ruler } from 'lucide-react';
import { TRAVEL_GUIDES } from '../data/guides';
import { TravelGuide } from '../types';

interface GuidesViewProps {
  onOpenMeasurer: () => void;
  onOpenBatteryCalc: () => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({
  onOpenMeasurer,
  onOpenBatteryCalc,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<TravelGuide | null>(null);

  if (selectedGuide) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-200">
        {/* Back Button */}
        <button
          onClick={() => {
            setSelectedGuide(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1976F3] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar para todos os guias</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4 border-b border-slate-200 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#1976F3] font-bold">
              Guia Verificado BagagemOK
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{selectedGuide.readTimeMinutes} min de leitura</span>
            </span>
            <span>·</span>
            <span>Atualizado em: {selectedGuide.lastUpdated}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102746] leading-tight">
            {selectedGuide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600">
            {selectedGuide.subtitle}
          </p>
        </div>

        {/* Key Takeaways Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-200/80 space-y-3">
          <h2 className="text-sm font-bold font-heading text-[#102746] uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#23A88A]" />
            <span>Pontos-Chave Regulatórios</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
            {selectedGuide.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1976F3] mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Content — Structured Safe Renderer */}
        <div className="bg-white rounded-2xl border border-[#DCE5F0] p-5 sm:p-8 space-y-4 text-slate-800 text-sm sm:text-base leading-relaxed">
          {(() => {
            const renderInline = (text: string) => {
              const parts = text.split(/(\*\*.*?\*\*|\*[^*]+?\*)/g);
              return parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={i} className="font-bold text-[#102746]">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                  return <em key={i} className="italic text-slate-600">{part.slice(1, -1)}</em>;
                }
                return <React.Fragment key={i}>{part}</React.Fragment>;
              });
            };

            const blocks = selectedGuide.contentMarkdown.trim().split(/\n\s*\n/);
            return blocks.map((block, idx) => {
              const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
              if (lines.length === 0) return null;

              const elements: React.ReactNode[] = [];
              let listItems: { type: 'ul' | 'ol'; text: string }[] = [];

              const flushList = (keySuffix: string) => {
                if (listItems.length === 0) return;
                const isOrdered = listItems[0].type === 'ol';
                const Tag = isOrdered ? 'ol' : 'ul';
                elements.push(
                  <Tag
                    key={`list-${idx}-${keySuffix}`}
                    className={`space-y-2 pl-5 text-slate-700 ${isOrdered ? 'list-decimal' : 'list-disc'}`}
                  >
                    {listItems.map((li, liIdx) => (
                      <li key={liIdx} className="leading-relaxed">
                        {renderInline(li.text)}
                      </li>
                    ))}
                  </Tag>
                );
                listItems = [];
              };

              lines.forEach((line, lIdx) => {
                if (line.startsWith('### ')) {
                  flushList(`h-${lIdx}`);
                  elements.push(
                    <h3
                      key={`h-${idx}-${lIdx}`}
                      className="text-lg sm:text-xl font-bold font-heading text-[#102746] pt-3 first:pt-0"
                    >
                      {line.replace(/^###\s+/, '')}
                    </h3>
                  );
                } else if (line.startsWith('> ')) {
                  flushList(`q-${lIdx}`);
                  elements.push(
                    <div
                      key={`q-${idx}-${lIdx}`}
                      className="p-3.5 sm:p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-[#102746] text-xs sm:text-sm font-medium"
                    >
                      {renderInline(line.replace(/^>\s+/, ''))}
                    </div>
                  );
                } else if (line.startsWith('- ')) {
                  if (listItems.length > 0 && listItems[0].type !== 'ul') flushList(`sw-${lIdx}`);
                  listItems.push({ type: 'ul', text: line.replace(/^-\s+/, '') });
                } else if (/^\d+\.\s+/.test(line)) {
                  if (listItems.length > 0 && listItems[0].type !== 'ol') flushList(`sw-${lIdx}`);
                  listItems.push({ type: 'ol', text: line.replace(/^\d+\.\s+/, '') });
                } else {
                  flushList(`p-${lIdx}`);
                  elements.push(
                    <p key={`p-${idx}-${lIdx}`} className="text-slate-700 leading-relaxed">
                      {renderInline(line)}
                    </p>
                  );
                }
              });

              flushList('end');
              return <div key={idx} className="space-y-3">{elements}</div>;
            });
          })()}
        </div>

        {/* Related Tool CTAs */}
        <div className="p-5 rounded-2xl bg-white border border-[#DCE5F0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#102746]">
              Precisa testar sua mala agora?
            </h3>
            <p className="text-xs text-slate-500">
              Use nossas ferramentas gratuitas para validar medidas ou calcular a capacidade de baterias.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onOpenMeasurer}
              className="px-3.5 py-2 rounded-xl bg-[#1976F3] hover:bg-[#1664d1] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Medir Mala</span>
            </button>
            <button
              onClick={onOpenBatteryCalc}
              className="px-3.5 py-2 rounded-xl bg-[#102746] hover:bg-[#172B46] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Calculadora Wh</span>
            </button>
          </div>
        </div>

        {/* Official Sources Citation */}
        <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-2">
          <span className="font-bold text-[#102746]">Fontes oficiais deste artigo:</span>
          <div className="flex flex-wrap gap-3">
            {selectedGuide.officialSources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#1976F3] font-semibold hover:underline"
              >
                <span>{source.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1976F3] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Conteúdo Editorial Verificado</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102746]">
          Guias e Artigos sobre Regras de Bagagem
        </h1>
        <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
          Artigos completos e didáticos baseados nas resoluções da ANAC, manuais das companhias aéreas 
          brasileiras e diretrizes internacionais da OACI.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRAVEL_GUIDES.map((guide) => (
          <article
            key={guide.id}
            onClick={() => {
              setSelectedGuide(guide);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-white rounded-2xl border border-[#DCE5F0] hover:border-[#1976F3]/60 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{guide.readTimeMinutes} min de leitura</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {guide.lastUpdated}
                </span>
              </div>

              <h2 className="text-lg font-bold font-heading text-[#102746] group-hover:text-[#1976F3] transition-colors leading-snug">
                {guide.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1976F3] group-hover:translate-x-0.5 transition-transform">
              <span>Ler artigo completo</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
