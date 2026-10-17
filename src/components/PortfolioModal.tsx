import React, { useEffect } from 'react';
import { PortfolioProject } from '../types';
import { AdVisual } from './AdVisual';
import { X, ArrowRight, Eye, Palette, Target, Lightbulb, Sparkles } from 'lucide-react';

interface PortfolioModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOrderSimilar: (project: PortfolioProject) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose, onOrderSimilar }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#16131F] border border-[#272233] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#272233] bg-[#120F1B]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">{project.category}</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-semibold text-[#8B5CF6]">{project.style}</span>
            <span className="text-slate-600">·</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300">
              {project.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Complete Uncropped Ad at Original 4:5 Aspect Ratio */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-[340px] drop-shadow-2xl">
                <AdVisual project={project} isLightbox={true} />
              </div>
            </div>

            {/* Right: Design Rationale & Deep Dive Details */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Design Goal */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-[#0D0B12] border border-[#272233]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA] uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Design Goal</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.designGoal}
                </p>
              </div>

              {/* Color Choices */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Palette className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Color Choices</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {project.colorPalette.map((col) => (
                    <div key={col.hex} className="flex items-center gap-2 p-2 rounded-lg bg-[#0D0B12] border border-[#272233]">
                      <div
                        className="w-5 h-5 rounded-md border border-white/20 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div className="truncate">
                        <div className="text-[11px] font-medium text-white truncate">{col.name}</div>
                        <div className="text-[10px] font-mono text-slate-500">{col.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-[#0D0B12] border border-[#272233]">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Target className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Target Audience</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.targetAudience}
                </p>
              </div>

              {/* Design Rationale */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-[#0D0B12] border border-[#272233]">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Design Rationale</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.rationale}
                </p>
              </div>

              {/* Order A Similar Design CTA */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    onOrderSimilar(project);
                    onClose();
                  }}
                  className="w-full py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-xl shadow-[#8B5CF6]/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                >
                  Order a Similar Design for ₹99
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  Delivery within 24 hours · Pre-populates the order form
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
