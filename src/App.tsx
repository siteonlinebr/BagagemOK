import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ItemResultCard } from './components/ItemResultCard';
import { CategoryCards } from './components/CategoryCards';
import { FeatureBar } from './components/FeatureBar';
import { CatalogView } from './components/CatalogView';
import { LuggageMeasurerView } from './components/LuggageMeasurerView';
import { AirlineComparisonView } from './components/AirlineComparisonView';
import { GuidesView } from './components/GuidesView';
import { MyLuggageView } from './components/MyLuggageView';
import { BatteryCalculatorModal } from './components/BatteryCalculatorModal';
import { MonitoringReportModal } from './components/MonitoringReportModal';
import { FHGFooter } from './components/FHGFooter';
import { AirlineCode, FlightType, ItemCategory, LuggageItem, LuggageLocation } from './types';
import { LUGGAGE_ITEMS } from './data/items';
import { 
  saveUserQuery, 
  getSavedQueries, 
  getPackingChecklist, 
  savePackingChecklist,
  PackingListItem
} from './utils/rulesEngine';
import { Zap, ShieldCheck, ExternalLink, HelpCircle, ArrowRight, FileCheck2 } from 'lucide-react';

export default function App() {
  // Navigation state
  const [activeTab, setActiveTab] = useState<'inicio' | 'consultar' | 'medir' | 'comparador' | 'guias' | 'minhas-consultas'>('inicio');

  // Query and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [flightType, setFlightType] = useState<FlightType>('domestico');
  const [airline, setAirline] = useState<AirlineCode>('LATAM');
  const [location, setLocation] = useState<LuggageLocation>('mao');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'todas'>('todas');

  // Currently displayed item on Home view (default: Power bank as in mockup)
  const [activeItem, setActiveItem] = useState<LuggageItem>(
    LUGGAGE_ITEMS.find((i) => i.id === 'power-bank') || LUGGAGE_ITEMS[0]
  );

  // Battery Wh Calculator Modal state
  const [batteryModalOpen, setBatteryModalOpen] = useState(false);
  const [batteryInitialMah, setBatteryInitialMah] = useState(20000);

  // Official Monitoring Report Modal state (10/11/2026)
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Counters for Header badge
  const [savedQueriesCount, setSavedQueriesCount] = useState(0);
  const [packingItemsCount, setPackingItemsCount] = useState(0);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Sync saved count on mount and updates
  useEffect(() => {
    setSavedQueriesCount(getSavedQueries().length);
    setPackingItemsCount(getPackingChecklist().length);
  }, [activeTab]);

  const handleSelectItem = (item: LuggageItem) => {
    setActiveItem(item);
    saveUserQuery(item.name);
    setSavedQueriesCount(getSavedQueries().length);
  };

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleAddToPackingList = (item: LuggageItem, targetLocation: 'mao' | 'despachada') => {
    const currentList = getPackingChecklist();
    const isAlreadyIn = currentList.some((i) => i.itemId === item.id && i.location === targetLocation);
    if (!isAlreadyIn) {
      const isPowerBank = item.isBatteryOrPowerBank;
      const warningNote = (isPowerBank && targetLocation === 'despachada') 
        ? 'PROIBIDO NO PORÃO! Baterias de lítio devem viajar consigo na cabine.' 
        : undefined;

      const newItem: PackingListItem = {
        id: Date.now().toString(),
        name: item.name,
        location: targetLocation,
        category: item.category,
        isPacked: false,
        status: targetLocation === 'mao' ? item.handLuggage.status : item.checkedLuggage.status,
        warningNote,
        itemId: item.id,
      };

      const updated = [newItem, ...currentList];
      savePackingChecklist(updated);
      setPackingItemsCount(updated.length);
    }
  };

  const handleOpenBatteryCalc = (mah = 20000) => {
    setBatteryInitialMah(mah);
    setBatteryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FD] text-[#172B46]">
      
      {/* Primary Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedQueriesCount={savedQueriesCount}
        packingItemsCount={packingItemsCount}
        onOpenSearchFocus={handleSearchFocus}
        onOpenReport={() => setReportModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'inicio' && (
          <div className="space-y-8 lg:space-y-12">
            
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              flightType={flightType}
              setFlightType={setFlightType}
              airline={airline}
              setAirline={setAirline}
              location={location}
              setLocation={setLocation}
              onSelectItem={handleSelectItem}
              inputRef={searchInputRef}
            />

            {/* Início Container: Result Card + Categories + Features */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              {/* Active Result Card (As displayed in reference mockup) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span className="font-semibold text-slate-700">Resultado da consulta:</span>
                  <span>Clique em detalhes para condições completas</span>
                </div>
                <ItemResultCard
                  item={activeItem}
                  flightType={flightType}
                  airline={airline}
                  location={location}
                  onOpenBatteryCalc={handleOpenBatteryCalc}
                  onAddToPackingList={handleAddToPackingList}
                />
              </div>

              {/* Category Quick Cards Grid */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 px-1">
                  Explorar por categorias:
                </div>
                <CategoryCards
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat);
                    setActiveTab('consultar');
                  }}
                />
              </div>

              {/* 3 Pillars Feature Bar */}
              <FeatureBar
                onOpenComparator={() => {
                  setActiveTab('comparador');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenMeasurer={() => {
                  setActiveTab('medir');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenSources={() => {
                  const el = document.getElementById('fontes-oficiais');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* Special Attention Banner: Baterias e Power Banks */}
              <div className="bg-gradient-to-r from-[#102746] to-[#172B46] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl" />
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Atenção Especial na Aviação</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                      Baterias de Lítio e Power Banks
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                      Power banks e baterias avulsas <strong>NUNCA</strong> podem ser despachados no porão 
                      por risco de incêndio. A capacidade permitida na mala de mão é de até <strong>100 Wh</strong> 
                      (cerca de 27.000 mAh a 3.7V).
                    </p>
                  </div>
                  <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                    <button
                      onClick={() => handleOpenBatteryCalc(20000)}
                      className="px-5 py-3 bg-[#1976F3] hover:bg-[#1664d1] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Calcular Wh do Meu Power Bank</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('guias');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Ler Guia de Baterias</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Official Sources & Verification Section */}
              <div id="fontes-oficiais" className="bg-white rounded-2xl border border-[#DCE5F0] p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#23A88A] uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confiabilidade e Fontes Primárias</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#102746]">
                      Regulamentações Oficiais Integradas
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                      O BagagemOK não utiliza suposições. Cada regra é baseada em resoluções ativas 
                      da autoridade regulatória da aviação civil brasileira e manuais de operações das companhias.
                    </p>
                  </div>

                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                  >
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    <span>Ver Relatório Oficial (10/11/2026)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-sm text-[#102746] block">ANAC & OACI</span>
                    <p className="text-xs text-slate-600">
                      Resolução 400/2016, Portaria 21/SPO (IS 175-001M) e Adendo nº 1 ao Doc 9284 da OACI.
                    </p>
                    <a
                      href="https://www.gov.br/anac/pt-br/assuntos/passageiros/bagagens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1976F3] font-semibold hover:underline"
                    >
                      <span>gov.br/anac</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-sm text-[#102746] block">LATAM Airlines</span>
                    <p className="text-xs text-slate-600">
                      Franquia 12 kg (Economy) / 16 kg (Premium), regras de baterias sob o assento e tarifas Basic/Plus.
                    </p>
                    <a
                      href="https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/bagagem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1976F3] font-semibold hover:underline"
                    >
                      <span>latamairlines.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-sm text-[#102746] block">GOL Linhas Aéreas</span>
                    <p className="text-xs text-slate-600">
                      Mala de cabine 12 kg (55x35x25 cm), item pessoal 10 kg (43x32x22 cm) e regras de baterias 2026.
                    </p>
                    <a
                      href="https://www.voegol.com.br/informacoes/bagagem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1976F3] font-semibold hover:underline"
                    >
                      <span>voegol.com.br</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-sm text-[#102746] block">Azul Linhas Aéreas</span>
                    <p className="text-xs text-slate-600">
                      Franquia de 10 kg na cabine, regras da frota Azul Conecta e tarifas Azul/MaisAzul.
                    </p>
                    <a
                      href="https://www.voeazul.com.br/br/pt/sua-viagem/planeje-sua-viagem/bagagem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1976F3] font-semibold hover:underline"
                    >
                      <span>voeazul.com.br</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2">
                  <span>Base de regras auditada e verificada pelo <strong>Relatório de Monitoramento Oficial de 10/11/2026</strong>.</span>
                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="text-[#1976F3] font-semibold hover:underline cursor-pointer"
                  >
                    Abrir relatório completo &rarr;
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Consultar Item / Catálogo Completo */}
        {activeTab === 'consultar' && (
          <CatalogView
            initialQuery={searchQuery}
            onOpenBatteryCalc={handleOpenBatteryCalc}
            onAddToPackingList={handleAddToPackingList}
          />
        )}

        {/* Tab 3: Medir Bagagem */}
        {activeTab === 'medir' && <LuggageMeasurerView />}

        {/* Tab 4: Comparador LATAM vs GOL vs Azul */}
        {activeTab === 'comparador' && <AirlineComparisonView />}

        {/* Tab 5: Guias e Conteúdo Editorial */}
        {activeTab === 'guias' && (
          <GuidesView
            onOpenMeasurer={() => {
              setActiveTab('medir');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBatteryCalc={() => handleOpenBatteryCalc(20000)}
          />
        )}

        {/* Tab 6: Minhas Consultas & Mala Pessoal */}
        {activeTab === 'minhas-consultas' && (
          <MyLuggageView
            onSearchItemName={(name) => {
              setSearchQuery(name);
              const match = LUGGAGE_ITEMS.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
              if (match) {
                setActiveItem(match);
                setActiveTab('inicio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setActiveTab('consultar');
              }
            }}
          />
        )}
      </main>

      {/* Battery Watt-Hour Calculator Modal */}
      <BatteryCalculatorModal
        isOpen={batteryModalOpen}
        onClose={() => setBatteryModalOpen(false)}
        initialMah={batteryInitialMah}
      />

      {/* Official Monitoring Report Modal (10/11/2026) */}
      <MonitoringReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onOpenBatteryCalc={() => handleOpenBatteryCalc(20000)}
      />

      {/* Institutional FHG Footer */}
      <FHGFooter
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBatteryCalc={() => handleOpenBatteryCalc(20000)}
        onOpenReport={() => setReportModalOpen(true)}
      />

    </div>
  );
}
