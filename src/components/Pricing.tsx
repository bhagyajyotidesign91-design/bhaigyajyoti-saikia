import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const Pricing: React.FC = () => {
  const { settings } = useApp();

  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#8B5CF6] uppercase">
            <span>Simple & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pricing
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
            One straightforward offer with no hidden charges or bloated packages.
          </p>
        </div>

        {/* Single Offer Card */}
        <div className="relative bg-[#16131F] border-2 border-[#8B5CF6]/50 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-[#8B5CF6]/10 overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Price and Core Offer */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#A78BFA] uppercase">
                  Single Design Rate
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                    ₹{settings.adPrice}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    PER AD
                  </span>
                </div>
              </div>

              {/* Exact Included Deliverables (Per Specification) */}
              <div className="space-y-3.5 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Included in this offer:
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-200 font-medium">
                    One professional ad design
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-200 font-medium">
                    A suitable social media format (Instagram or Facebook)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-200 font-medium">
                    Delivery within {settings.deliveryTimeHours} hours
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Direct CTA to Order Form */}
            <div className="md:col-span-5 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 space-y-4">
              <a
                href="#order"
                className="w-full py-4 px-6 text-sm font-bold uppercase tracking-wider text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-xl shadow-[#8B5CF6]/30 transition-all hover:scale-[1.02] active:scale-[0.98] text-center flex items-center justify-center gap-2"
              >
                Order Your Ad
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-xs text-center text-slate-400 leading-relaxed">
                Fill the 11-field creative brief, upload your photos, and review your order before sending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
