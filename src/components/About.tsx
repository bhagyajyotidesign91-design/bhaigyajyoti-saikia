import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { settings } = useApp();

  const skills = [
    'Product Ad Design',
    'Social Media Creatives',
    'Typography & Layout',
    'Creative Concepts',
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#0D0B12] border-t border-[#272233] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Portrait Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 sm:w-72 md:w-80 aspect-square">
              {/* Subtle 3D Purple Ring */}
              <div className="absolute inset-0 rounded-full border border-[#8B5CF6]/30 animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-3 rounded-full border border-[#8B5CF6]/15" />

              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-[#8B5CF6]/40 bg-gradient-to-b from-[#1C1729] to-[#0D0B12] shadow-2xl flex flex-col items-center justify-end">
                {/* Same Natural Realistic Portrait with Black Shirt */}
                <svg viewBox="0 0 300 320" className="w-full h-full object-cover select-none" fill="none">
                  <circle cx="150" cy="140" r="90" fill="url(#haloAboutGrad)" />
                  <path
                    d="M60 320 C60 250, 90 220, 120 210 L135 230 L165 230 L180 210 C210 220, 240 250, 240 320 Z"
                    fill="#0A090F"
                  />
                  <path d="M120 210 L150 260 L180 210" stroke="#272233" strokeWidth="2" fill="#14111E" />
                  <line x1="150" y1="260" x2="150" y2="320" stroke="#272233" strokeWidth="2" />
                  <circle cx="150" cy="275" r="2.5" fill="#3E384D" />
                  <circle cx="150" cy="295" r="2.5" fill="#3E384D" />
                  <path d="M125 170 L125 215 C135 222, 165 222, 175 215 L175 170 Z" fill="#D4A373" />
                  <path d="M125 185 C140 195, 160 195, 175 185 L175 210 C165 218, 135 218, 125 210 Z" fill="#C5905E" />
                  <path
                    d="M110 115 C110 85, 190 85, 190 115 C190 155, 165 180, 150 182 C135 180, 110 155, 110 115 Z"
                    fill="#E0B084"
                  />
                  <path
                    d="M102 110 C98 75, 130 50, 155 50 C185 50, 202 75, 198 110 C194 90, 180 70, 150 68 C125 68, 108 90, 102 110 Z"
                    fill="#1A1821"
                  />
                  <path
                    d="M105 105 C112 75, 145 65, 165 65 C185 65, 195 80, 195 95 C180 82, 160 82, 140 85 C125 87, 115 95, 105 105 Z"
                    fill="#121018"
                  />
                  <rect x="118" y="112" width="26" height="18" rx="4" stroke="#8B5CF6" strokeWidth="2.5" fill="rgba(139,92,246,0.1)" />
                  <rect x="156" y="112" width="26" height="18" rx="4" stroke="#8B5CF6" strokeWidth="2.5" fill="rgba(139,92,246,0.1)" />
                  <line x1="144" y1="120" x2="156" y2="120" stroke="#8B5CF6" strokeWidth="2.5" />
                  <circle cx="131" cy="121" r="3" fill="#2A1B0E" />
                  <circle cx="169" cy="121" r="3" fill="#2A1B0E" />
                  <path d="M118 108 Q131 104 142 108" stroke="#1A1821" strokeWidth="3" strokeLinecap="round" />
                  <path d="M158 108 Q169 104 182 108" stroke="#1A1821" strokeWidth="3" strokeLinecap="round" />
                  <path d="M149 122 L146 142 L154 142" stroke="#C5905E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M136 156 Q150 164 164 156" stroke="#A76E43" strokeWidth="2.5" strokeLinecap="round" />
                  <defs>
                    <radialGradient id="haloAboutGrad" cx="50%" cy="50%" r="50%">
                      <stop stopColor="#8B5CF6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0D0B12" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Authentic Bio & Skills */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#8B5CF6] uppercase">
                {settings.roleTitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                Hi, I’m Bhagyajyoti Saikia.
              </h2>
            </div>

            <div className="space-y-4 text-base text-slate-300 leading-relaxed max-w-2xl">
              <p>
                I create eye-catching product ad designs for businesses, online sellers and local brands.
              </p>
              <p>
                My focus is on clear messaging, attractive layouts and creative visuals that help products stand out on social media.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
                Core Design Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#16131F] border border-[#272233]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="#order"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-lg shadow-[#8B5CF6]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Let’s Create Your Ad
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
