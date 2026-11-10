import React from 'react';
import { Scale, Ruler, ShieldCheck } from 'lucide-react';

interface FeatureBarProps {
  onOpenComparator: () => void;
  onOpenMeasurer: () => void;
  onOpenSources: () => void;
}

export const FeatureBar: React.FC<FeatureBarProps> = ({
  onOpenComparator,
  onOpenMeasurer,
  onOpenSources,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#DCE5F0] shadow-xs overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DCE5F0]">
        
        {/* 1. Compare limites */}
        <button
          onClick={onOpenComparator}
          className="flex items-center justify-center gap-3 p-4 hover:bg-blue-50/40 text-left transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1976F3] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold font-heading text-[#102746] group-hover:text-[#1976F3] transition-colors block">
              Compare limites de bagagem
            </span>
            <span className="text-xs text-[#718096]">
              LATAM vs GOL vs Azul lado a lado
            </span>
          </div>
        </button>

        {/* 2. Confira peso e medidas */}
        <button
          onClick={onOpenMeasurer}
          className="flex items-center justify-center gap-3 p-4 hover:bg-blue-50/40 text-left transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#1976F3] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold font-heading text-[#102746] group-hover:text-[#1976F3] transition-colors block">
              Confira peso e medidas
            </span>
            <span className="text-xs text-[#718096]">
              Calcule se sua mala cabe no gabarito
            </span>
          </div>
        </button>

        {/* 3. Consulte fontes oficiais */}
        <button
          onClick={onOpenSources}
          className="flex items-center justify-center gap-3 p-4 hover:bg-blue-50/40 text-left transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#23A88A] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold font-heading text-[#102746] group-hover:text-[#23A88A] transition-colors block">
              Consulte fontes oficiais
            </span>
            <span className="text-xs text-[#718096]">
              Normas ANAC, RBAC 175 e ICAO
            </span>
          </div>
        </button>

      </div>
    </div>
  );
};
