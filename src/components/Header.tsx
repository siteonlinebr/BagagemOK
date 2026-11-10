import React, { useState } from 'react';
import { 
  Luggage, 
  Search, 
  Ruler, 
  BookOpen, 
  Clock, 
  Menu, 
  X,
  ExternalLink,
  FileCheck2
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'inicio' | 'consultar' | 'medir' | 'comparador' | 'guias' | 'minhas-consultas';
  setActiveTab: (tab: 'inicio' | 'consultar' | 'medir' | 'comparador' | 'guias' | 'minhas-consultas') => void;
  savedQueriesCount: number;
  packingItemsCount: number;
  onOpenSearchFocus: () => void;
  onOpenReport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedQueriesCount,
  packingItemsCount,
  onOpenSearchFocus,
  onOpenReport,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Início', icon: Luggage },
    { id: 'consultar', label: 'Consultar item', icon: Search },
    { id: 'medir', label: 'Medir bagagem', icon: Ruler },
    { id: 'comparador', label: 'Comparar companhias', icon: undefined },
    { id: 'guias', label: 'Guias', icon: BookOpen },
  ] as const;

  const handleNavClick = (tabId: 'inicio' | 'consultar' | 'medir' | 'comparador' | 'guias' | 'minhas-consultas') => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE5F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('inicio')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              aria-label="BagagemOK Início"
            >
              {/* Suitcase Logo Icon with Checkmark */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#102746] to-[#1976F3] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                <div className="relative">
                  <Luggage className="w-5 h-5 text-white stroke-[2.2]" />
                  <span className="absolute -bottom-1 -right-1 bg-[#23A88A] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-bold border-2 border-white">
                    ✓
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold font-heading tracking-tight text-[#102746]">
                  Bagagem<span className="text-[#1976F3]">OK</span>
                </span>
              </div>
            </button>

            {/* Subtle Divider as in mockup */}
            <div className="hidden lg:block h-6 w-[1.5px] bg-[#DCE5F0] mx-2" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-[#1976F3] bg-[#1976F3]/8 font-semibold'
                      : 'text-[#172B46] hover:text-[#1976F3] hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-inherit" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Relatório Oficial 10/11/2026 */}
            {onOpenReport && (
              <button
                onClick={onOpenReport}
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                title="Relatório de monitoramento oficial (10/11/2026)"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Auditoria 10/11/2026</span>
              </button>
            )}

            {/* Minhas Consultas & Mala */}
            <button
              onClick={() => handleNavClick('minhas-consultas')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'minhas-consultas'
                  ? 'text-[#1976F3] bg-[#1976F3]/8 font-semibold'
                  : 'text-[#172B46] hover:text-[#1976F3] hover:bg-slate-50'
              }`}
              title="Minhas consultas e lista de mala"
            >
              <Clock className="w-4 h-4 text-[#718096]" />
              <span className="hidden sm:inline">Minhas consultas</span>
              {(savedQueriesCount > 0 || packingItemsCount > 0) && (
                <span className="bg-[#1976F3] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {packingItemsCount || savedQueriesCount}
                </span>
              )}
            </button>

            {/* Consultar agora CTA button as in mockup */}
            <button
              onClick={() => {
                if (activeTab !== 'inicio' && activeTab !== 'consultar') {
                  handleNavClick('consultar');
                }
                onOpenSearchFocus();
              }}
              className="flex items-center gap-2 bg-[#1976F3] hover:bg-[#1664d1] active:bg-[#1253af] text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Consultar agora</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#172B46] hover:bg-slate-100 focus:outline-hidden"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DCE5F0] bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'text-[#1976F3] bg-[#1976F3]/10 font-semibold'
                    : 'text-[#172B46] hover:bg-slate-50'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-inherit" />}
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => handleNavClick('minhas-consultas')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
              activeTab === 'minhas-consultas'
                ? 'text-[#1976F3] bg-[#1976F3]/10 font-semibold'
                : 'text-[#172B46] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#718096]" />
              <span>Minhas consultas & Mala de viagem</span>
            </div>
            {(savedQueriesCount > 0 || packingItemsCount > 0) && (
              <span className="bg-[#1976F3] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {packingItemsCount || savedQueriesCount}
              </span>
            )}
          </button>

          {onOpenReport && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReport();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Relatório Oficial 10/11/2026</span>
              </div>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-md">
                Auditoria
              </span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-100">
            <a
              href="https://siteonlinebr.github.io/Fhg.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-xs text-[#718096] hover:text-[#102746]"
            >
              <span>Future Horizon Group (FHG)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
