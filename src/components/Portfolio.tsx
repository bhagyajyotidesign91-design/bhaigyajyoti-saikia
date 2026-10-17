import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCategory, PortfolioProject } from '../types';
import { AdVisual } from './AdVisual';
import { PortfolioModal } from './PortfolioModal';
import { Eye, Layers } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { projects, setOrderPrefill } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const categories: string[] = ['All', 'Fashion', 'Food', 'Beauty', 'Electronics', 'Other Products'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleOrderSimilar = (project: PortfolioProject) => {
    setOrderPrefill({
      category: project.category,
      designStyle: project.style,
      productName: project.title.split(' - ')[0],
    });
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#8B5CF6] uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Product Advertisement Creatives
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              High-converting visual concepts engineered for social feeds. Click any design to inspect the layout strategy, palette, and creative rationale.
            </p>
          </div>

          {/* Transparent Notice Note */}
          <div className="text-xs text-slate-500 bg-[#16131F] border border-[#272233] p-3 rounded-xl max-w-xs shrink-0">
            <span className="font-semibold text-slate-300">Notice:</span> Initial projects are Concept Designs & Demo Work demonstrating design execution capabilities.
          </div>
        </div>

        {/* Category Filter Tabs (Zero-pill segmented buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#16131F] border border-[#272233] rounded-xl overflow-x-auto mb-10 max-w-2xl scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                selectedCategory === cat
                  ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Gallery Grid: Desktop 3 cols, Tablet 2 cols, Mobile 2 cols */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="group cursor-pointer bg-[#16131F] border border-[#272233] hover:border-[#8B5CF6]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#8B5CF6]/15 hover:-translate-y-1 flex flex-col"
            >
              {/* 4:5 Aspect Ratio Ad Visual Wrapper */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0D0B12]">
                <AdVisual project={project} />

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                  <span className="px-4 py-2 bg-white/95 text-[#0D0B12] text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
                    <Eye className="w-3.5 h-3.5" /> Inspect Full Design
                  </span>
                </div>
              </div>

              {/* Card Footer: Title, Category, Style (Clean unboxed text) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="text-slate-300 font-medium">{project.category}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-[#A78BFA]">{project.style}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#A78BFA] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400">
                    {project.badge}
                  </span>
                  <span className="text-[#8B5CF6] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Design Preview Modal */}
      <PortfolioModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onOrderSimilar={handleOrderSimilar}
      />
    </section>
  );
};
