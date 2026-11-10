import React from 'react';
import { ChevronRight, Laptop, Sparkles, Pill, Apple, Scissors, Compass } from 'lucide-react';
import { ItemCategory } from '../types';

interface CategoryCardsProps {
  onSelectCategory: (category: ItemCategory) => void;
  selectedCategory?: ItemCategory | 'todas';
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const categories = [
    {
      id: 'eletronicos' as ItemCategory,
      title: 'Eletrônicos',
      count: 'Notebook, power bank, celular',
      image: './assets/cat_laptop.jpg',
      icon: Laptop,
      emoji: '💻',
      badgeBg: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'liquidos' as ItemCategory,
      title: 'Líquidos e higiene',
      count: 'Perfumes, shampoos, sprays',
      image: './assets/cat_cosmetics.jpg',
      icon: Sparkles,
      emoji: '🧴',
      badgeBg: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'medicamentos' as ItemCategory,
      title: 'Medicamentos',
      count: 'Remédios, insulina, receitas',
      image: './assets/cat_medicines.jpg',
      icon: Pill,
      emoji: '💊',
      badgeBg: 'from-sky-500 to-teal-500',
    },
    {
      id: 'alimentos' as ItemCategory,
      title: 'Alimentos',
      count: 'Snacks, bebidas, comidas de bebê',
      image: './assets/cat_snacks.jpg',
      icon: Apple,
      emoji: '🥪',
      badgeBg: 'from-amber-500 to-orange-500',
    },
  ];

  const secondaryCategories = [
    {
      id: 'objetos' as ItemCategory,
      title: 'Objetos e acessórios',
      count: 'Tesouras, canivetes, giletes',
      icon: Scissors,
    },
    {
      id: 'especiais' as ItemCategory,
      title: 'Artigos especiais e esportes',
      count: 'Instrumentos, pranchas, bikes',
      icon: Compass,
    },
  ];

  return (
    <div className="space-y-4">
      {/* 4 Primary Categories as in Mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-center justify-between p-4 rounded-2xl bg-white border transition-all duration-200 text-left shadow-xs hover:shadow-md cursor-pointer ${
                isSelected
                  ? 'border-[#1976F3] ring-2 ring-[#1976F3]/20 bg-blue-50/30'
                  : 'border-[#DCE5F0] hover:border-[#1976F3]/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Visual Icon Container with 3D product render */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1 group-hover:scale-105 transition-transform duration-200 shadow-xs shrink-0">
                  {cat.image ? (
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-2xl">{cat.emoji}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-[#102746] group-hover:text-[#1976F3] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#718096] truncate max-w-[130px] sm:max-w-[140px]">
                    {cat.count}
                  </p>
                </div>
              </div>

              {/* Chevron Circle button */}
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#1976F3] text-slate-400 group-hover:text-white flex items-center justify-center transition-all shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Secondary Categories bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-1 text-xs">
        <span className="text-slate-500 font-medium">Outras categorias:</span>
        <div className="flex flex-wrap gap-2">
          {secondaryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1976F3] text-white border-[#1976F3]'
                  : 'bg-white border-[#DCE5F0] text-[#172B46] hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {cat.title}
            </button>
          ))}
          {selectedCategory && selectedCategory !== 'todas' && (
            <button
              onClick={() => onSelectCategory('todas' as unknown as ItemCategory)}
              className="text-xs text-[#1976F3] hover:underline px-2 py-1 font-semibold cursor-pointer"
            >
              Ver todas as categorias
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
