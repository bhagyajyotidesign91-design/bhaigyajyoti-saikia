import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Clock, CheckCircle2, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings } = useApp();

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Pitch & Action Controls */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Value Proposition Badge (clean unboxed text or subtle pill) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16131F] border border-[#272233] text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span>Starting at ₹{settings.adPrice}</span>
              <span className="text-slate-600">·</span>
              <span className="text-[#A78BFA] flex items-center gap-1 font-semibold">
                <Clock className="w-3 h-3" /> {settings.deliveryTimeHours}h Delivery
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
              {settings.heroHeadline}
            </h1>

            {/* Supporting Pitch */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {settings.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#portfolio"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-xl shadow-[#8B5CF6]/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#order"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-[#16131F] hover:bg-[#201C2C] border border-[#272233] rounded-xl transition-all hover:border-[#8B5CF6]/40 flex items-center justify-center gap-2"
              >
                Hire Me
              </a>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                <span>One Professional Ad Design</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                <span>Instagram & Facebook Formats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                <span>Fast 24-Hour Turnaround</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Portrait with 3D Purple Ring Background */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 sm:w-80 lg:w-96 aspect-square flex items-center justify-center">
              {/* 3D Purple Ring Background Visual Effect */}
              <div className="absolute inset-0 rounded-full border-2 border-[#8B5CF6]/30 animate-[spin_25s_linear_infinite]" />
              <div className="absolute -inset-4 rounded-full border border-[#8B5CF6]/20 border-dashed" />
              <div className="absolute -inset-8 rounded-full border border-[#06B6D4]/15" />

              {/* Glowing Aura */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#8B5CF6]/40 via-[#4C1D95]/30 to-transparent blur-2xl" />

              {/* Portrait Container */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-[#8B5CF6]/40 bg-gradient-to-b from-[#1C1729] to-[#0D0B12] shadow-2xl flex flex-col items-center justify-end">
                {/* SVG Artistic Portrait of Designer wearing clean black shirt */}
                <svg viewBox="0 0 300 320" className="w-full h-full object-cover select-none" fill="none">
                  {/* Background halo */}
                  <circle cx="150" cy="140" r="90" fill="url(#haloGrad)" />

                  {/* Black Shirt Body & Collar */}
                  <path
                    d="M60 320 C60 250, 90 220, 120 210 L135 230 L165 230 L180 210 C210 220, 240 250, 240 320 Z"
                    fill="#0A090F"
                  />
                  {/* Shirt Seams & Fold Highlights */}
                  <path d="M120 210 L150 260 L180 210" stroke="#272233" strokeWidth="2" fill="#14111E" />
                  <line x1="150" y1="260" x2="150" y2="320" stroke="#272233" strokeWidth="2" />
                  <circle cx="150" cy="275" r="2.5" fill="#3E384D" />
                  <circle cx="150" cy="295" r="2.5" fill="#3E384D" />

                  {/* Neck */}
                  <path d="M125 170 L125 215 C135 222, 165 222, 175 215 L175 170 Z" fill="#D4A373" />
                  <path d="M125 185 C140 195, 160 195, 175 185 L175 210 C165 218, 135 218, 125 210 Z" fill="#C5905E" />

                  {/* Face Contour */}
                  <path
                    d="M110 115 C110 85, 190 85, 190 115 C190 155, 165 180, 150 182 C135 180, 110 155, 110 115 Z"
                    fill="#E0B084"
                  />

                  {/* Modern Haircut & Silhouette */}
                  <path
                    d="M102 110 C98 75, 130 50, 155 50 C185 50, 202 75, 198 110 C194 90, 180 70, 150 68 C125 68, 108 90, 102 110 Z"
                    fill="#1A1821"
                  />
                  <path
                    d="M105 105 C112 75, 145 65, 165 65 C185 65, 195 80, 195 95 C180 82, 160 82, 140 85 C125 87, 115 95, 105 105 Z"
                    fill="#121018"
                  />

                  {/* Designer Glasses / Clean Features */}
                  <rect x="118" y="112" width="26" height="18" rx="4" stroke="#8B5CF6" strokeWidth="2.5" fill="rgba(139,92,246,0.1)" />
                  <rect x="156" y="112" width="26" height="18" rx="4" stroke="#8B5CF6" strokeWidth="2.5" fill="rgba(139,92,246,0.1)" />
                  <line x1="144" y1="120" x2="156" y2="120" stroke="#8B5CF6" strokeWidth="2.5" />

                  {/* Eyes behind lenses */}
                  <circle cx="131" cy="121" r="3" fill="#2A1B0E" />
                  <circle cx="169" cy="121" r="3" fill="#2A1B0E" />

                  {/* Eyebrows */}
                  <path d="M118 108 Q131 104 142 108" stroke="#1A1821" strokeWidth="3" strokeLinecap="round" />
                  <path d="M158 108 Q169 104 182 108" stroke="#1A1821" strokeWidth="3" strokeLinecap="round" />

                  {/* Nose */}
                  <path d="M149 122 L146 142 L154 142" stroke="#C5905E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Calm, Professional Smile */}
                  <path d="M136 156 Q150 164 164 156" stroke="#A76E43" strokeWidth="2.5" strokeLinecap="round" />

                  <defs>
                    <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
                      <stop stopColor="#8B5CF6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0D0B12" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Ambient Designer Name Plate overlay */}
                <div className="absolute bottom-3 inset-x-6 bg-[#0D0B12]/80 backdrop-blur-md py-2 px-3 rounded-xl border border-white/10 text-center shadow-lg">
                  <div className="text-xs font-bold text-white tracking-wide">{settings.brandName}</div>
                  <div className="text-[10px] text-[#A78BFA] font-medium tracking-wider uppercase">Creative Designer</div>
                </div>
              </div>

              {/* Floating 3D Sparkle badge */}
              <div className="absolute -bottom-2 -right-2 z-20 bg-[#16131F] border border-[#272233] px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2">
                <div className="p-1 rounded bg-[#8B5CF6]/20 text-[#8B5CF6]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-medium">Turnaround</div>
                  <div className="text-xs font-bold text-white">24 Hours</div>
                </div>
              </div>

              {/* Floating Price Pill */}
              <div className="absolute -top-3 -left-3 z-20 bg-[#16131F] border border-[#272233] px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-medium">Ad Price</div>
                  <div className="text-xs font-bold text-emerald-400">₹{settings.adPrice}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
