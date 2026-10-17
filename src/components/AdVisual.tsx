import React from 'react';
import { PortfolioProject } from '../types';

interface AdVisualProps {
  project: PortfolioProject;
  className?: string;
  isLightbox?: boolean;
}

export const AdVisual: React.FC<AdVisualProps> = ({ project, className = '', isLightbox = false }) => {
  const { creativeTheme, headlineText, subText, offerBadge, category } = project;

  return (
    <div
      className={`relative w-full aspect-[4/5] overflow-hidden select-none font-sans flex flex-col justify-between ${
        isLightbox ? 'rounded-2xl shadow-2xl' : 'rounded-xl'
      } ${className}`}
    >
      {/* 1. SNEAKER AD CREATIVE */}
      {creativeTheme === 'sneaker' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#120B24] via-[#0B0914] to-[#040209] flex flex-col justify-between p-6 sm:p-7 text-white">
          {/* Radial ambient glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#8B5CF6]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-0 w-56 h-56 bg-[#06B6D4]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand & Badge Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-[#06B6D4] uppercase">VELOCITY TECH</span>
              <span className="text-[10px] text-white/50">· 2026 EDITION</span>
            </div>
            {offerBadge && (
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#8B5CF6] text-white rounded-md shadow-sm">
                {offerBadge}
              </span>
            )}
          </div>

          {/* Center Sneaker Graphic */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
            {/* Speed Lines SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 200" fill="none">
              <path d="M10 60 L180 30 M30 110 L250 80 M50 160 L280 130" stroke="url(#cyanGrad)" strokeWidth="1.5" strokeDasharray="4 6" />
              <defs>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Sneaker Graphic Illustration */}
            <div className="relative transform -rotate-12 hover:rotate-0 transition-transform duration-500 scale-95 sm:scale-105">
              <div className="absolute inset-0 bg-[#8B5CF6]/40 blur-2xl rounded-full scale-75" />
              <svg viewBox="0 0 280 140" className="w-56 sm:w-64 drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]" fill="none">
                {/* Outsole Cushion */}
                <path d="M30 115 C70 125, 140 125, 230 110 C245 107, 255 100, 255 92 C245 92, 220 95, 180 96 C140 97, 80 95, 30 102 Z" fill="#FFFFFF" />
                <path d="M35 118 C85 130, 160 128, 240 114" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
                {/* Midsole Layer */}
                <path d="M35 102 C80 98, 160 97, 245 88 C240 70, 220 50, 175 42 C145 37, 110 50, 85 65 C60 75, 45 88, 35 102 Z" fill="url(#shoeBody)" />
                {/* Collar & Tongue */}
                <path d="M175 42 C160 30, 135 32, 120 45 C110 54, 98 62, 85 65" fill="#1E1B4B" />
                {/* Dynamic Swoop / Accent */}
                <path d="M70 85 C120 60, 180 55, 225 78" stroke="#06B6D4" strokeWidth="6" strokeLinecap="round" />
                <path d="M90 92 C135 75, 185 70, 215 85" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                {/* Laces */}
                <path d="M135 48 L148 55 M145 56 L158 63 M155 64 L168 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                <defs>
                  <linearGradient id="shoeBody" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#312E81" />
                    <stop offset="0.5" stopColor="#6D28D9" />
                    <stop offset="1" stopColor="#4C1D95" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Bottom Typography & CTA */}
          <div className="relative z-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none">
              {headlineText}
            </h3>
            <p className="text-xs text-white/70 max-w-[240px] leading-relaxed">
              {subText}
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-[#06B6D4]">₹3,499 <span className="text-[10px] text-white/40 line-through">₹5,999</span></span>
              <span className="text-[11px] font-semibold bg-white text-[#0D0B12] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow">
                SHOP NOW →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. LEATHER BOMBER JACKET */}
      {creativeTheme === 'jacket' && (
        <div className="absolute inset-0 bg-[#0C0B0F] border border-[#272233] flex flex-col justify-between p-6 sm:p-7 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.12),transparent_70%)]" />

          {/* Minimalist Top Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[11px] font-medium tracking-[0.25em] text-white/80 uppercase">ATELIER NOIR</span>
            <span className="text-[10px] tracking-widest text-[#A78BFA]">{offerBadge}</span>
          </div>

          {/* Jacket Graphic */}
          <div className="relative z-10 my-auto flex items-center justify-center py-3">
            <svg viewBox="0 0 200 220" className="w-48 sm:w-56 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]" fill="none">
              {/* Outer Silhouette */}
              <path d="M60 25 L85 35 L100 50 L115 35 L140 25 L180 85 L155 100 L145 190 L55 190 L45 100 L20 85 Z" fill="#18181B" stroke="#27272A" strokeWidth="2" />
              {/* Collar details */}
              <path d="M85 35 L100 80 L115 35" fill="#27272A" />
              {/* Lapels */}
              <path d="M85 35 L70 95 L100 95 Z" fill="#1F1E24" />
              <path d="M115 35 L130 95 L100 95 Z" fill="#24232A" />
              {/* Front Metallic Zipper */}
              <line x1="100" y1="95" x2="100" y2="190" stroke="#A1A1AA" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="100" cy="100" r="3" fill="#D4D4D8" />
              {/* Zipper Pockets */}
              <line x1="68" y1="140" x2="88" y2="155" stroke="#71717A" strokeWidth="2" />
              <line x1="132" y1="140" x2="112" y2="155" stroke="#71717A" strokeWidth="2" />
              {/* Waistband Ribbing */}
              <rect x="55" y="180" width="90" height="10" fill="#121214" rx="2" />
            </svg>
          </div>

          {/* Bottom Editorial Layout */}
          <div className="relative z-10 space-y-2 pt-2 border-t border-white/10">
            <span className="text-[10px] tracking-[0.2em] text-[#8B5CF6] uppercase font-semibold">100% FULL-GRAIN CALFSKIN</span>
            <h3 className="text-2xl font-bold tracking-tight text-white">{headlineText}</h3>
            <p className="text-xs text-white/60 leading-relaxed">{subText}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold tracking-wide text-white">₹8,990</span>
              <span className="text-[11px] tracking-wider uppercase text-white/90 border-b border-white pb-0.5 hover:text-[#8B5CF6] transition-colors">
                DISCOVER COLLECTION
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. GOURMET BURGER AD */}
      {creativeTheme === 'burger' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1208] via-[#120B05] to-[#080502] flex flex-col justify-between p-6 sm:p-7 text-white">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#F97316]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Top Restaurant Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-[#F97316] uppercase">FLAME & FORK SMASH HOUSE</span>
            {offerBadge && (
              <span className="px-2.5 py-1 text-[10px] font-black tracking-wider uppercase bg-[#EA580C] text-white rounded-md animate-pulse">
                {offerBadge}
              </span>
            )}
          </div>

          {/* Center Gourmet Burger Graphic */}
          <div className="relative z-10 my-auto flex items-center justify-center py-2">
            <svg viewBox="0 0 220 200" className="w-52 sm:w-60 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]" fill="none">
              {/* Sesame Top Bun */}
              <path d="M40 75 C40 35, 180 35, 180 75 Z" fill="#C27835" />
              {/* Sesame Seeds */}
              <ellipse cx="80" cy="50" rx="3" ry="1.5" fill="#FEF08A" transform="rotate(-15 80 50)" />
              <ellipse cx="110" cy="42" rx="3" ry="1.5" fill="#FEF08A" />
              <ellipse cx="140" cy="48" rx="3" ry="1.5" fill="#FEF08A" transform="rotate(20 140 48)" />
              <ellipse cx="95" cy="60" rx="3" ry="1.5" fill="#FEF08A" transform="rotate(10 95 60)" />
              <ellipse cx="125" cy="58" rx="3" ry="1.5" fill="#FEF08A" transform="rotate(-10 125 58)" />

              {/* Fresh Curly Lettuce */}
              <path d="M30 75 C50 82, 70 70, 90 80 C110 70, 130 82, 150 72 C170 82, 190 75, 195 76" stroke="#22C55E" strokeWidth="9" strokeLinecap="round" />

              {/* Ripe Tomato Slices */}
              <rect x="50" y="86" width="120" height="12" rx="6" fill="#EF4444" />

              {/* Sizzling Wagyu Patty 1 */}
              <rect x="36" y="100" width="148" height="20" rx="8" fill="#451A03" />

              {/* Melty Sharp Cheddar Drip */}
              <path d="M38 114 Q70 120 90 135 Q110 120 140 142 Q160 120 182 116" fill="#EAB308" />
              <rect x="42" y="112" width="136" height="10" fill="#FACC15" rx="3" />

              {/* Second Smash Patty */}
              <rect x="38" y="124" width="144" height="20" rx="8" fill="#3B1506" />

              {/* Bottom Brioche Bun */}
              <path d="M45 146 C45 165, 175 165, 175 146 Z" fill="#B46927" />

              {/* Grill marks & smoke vapor */}
              <path d="M70 30 Q75 15 85 22 T95 10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M125 32 Q130 18 140 25 T150 12" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Bottom Callout & Order Button */}
          <div className="relative z-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {headlineText}
            </h3>
            <p className="text-xs text-[#FED7AA] font-medium">{subText}</p>
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-[#FACC15]">₹299</span>
                <span className="text-xs text-white/50 ml-1.5">Free Fries Included</span>
              </div>
              <span className="bg-[#EA580C] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md hover:bg-[#C2410C]">
                ORDER ONLINE 🛵
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. BEAUTY SKINCARE SERUM */}
      {creativeTheme === 'serum' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#180A25] via-[#10071C] to-[#090310] flex flex-col justify-between p-6 sm:p-7 text-white">
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-[#F43F5E]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-52 h-52 bg-[#8B5CF6]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] tracking-[0.25em] font-medium text-pink-200 uppercase">LUMIÈRE DERMA</span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80">CLINICALLY PROVEN</span>
          </div>

          {/* Center Serum Bottle Graphic */}
          <div className="relative z-10 my-auto flex items-center justify-center py-2">
            <svg viewBox="0 0 160 220" className="w-36 sm:w-44 drop-shadow-[0_20px_35px_rgba(139,92,246,0.3)]" fill="none">
              {/* Dropper Rubber Bulb */}
              <rect x="68" y="15" width="24" height="25" rx="10" fill="#E2E8F0" />
              {/* Metallic Collar */}
              <rect x="62" y="40" width="36" height="15" rx="3" fill="url(#goldCollar)" />
              {/* Glass Bottle Body */}
              <rect x="45" y="58" width="70" height="120" rx="16" fill="url(#serumGlass)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              {/* Liquid Level */}
              <rect x="49" y="80" width="62" height="94" rx="12" fill="url(#pinkLiquid)" opacity="0.85" />
              {/* Glass Reflection Highlight */}
              <path d="M52 64 L52 170" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
              {/* Dropper Pipette inside */}
              <line x1="80" y1="55" x2="80" y2="155" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" />
              {/* Droplet suspended */}
              <circle cx="80" cy="195" r="4.5" fill="#F472B6" />
              <circle cx="80" cy="193" r="1.5" fill="#FFFFFF" />

              <defs>
                <linearGradient id="goldCollar" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#FDE68A" />
                  <stop offset="0.5" stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#FDE68A" />
                </linearGradient>
                <linearGradient id="serumGlass" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="rgba(255,255,255,0.25)" />
                  <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
                <linearGradient id="pinkLiquid" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#F472B6" />
                  <stop offset="1" stopColor="#9333EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Bottom Text & Benefit */}
          <div className="relative z-10 space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-semibold text-[#F472B6] tracking-widest uppercase">72-HOUR INTENSIVE REPAIR</span>
            <h3 className="text-2xl font-bold tracking-tight text-white">{headlineText}</h3>
            <p className="text-xs text-white/70 leading-relaxed">{subText}</p>
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <span className="text-sm font-bold text-pink-300">₹1,249</span>
              <span className="text-[11px] font-semibold bg-white text-[#180A25] px-3.5 py-1.5 rounded-full hover:bg-pink-100">
                GET GLOWING ✨
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. 3D TECH EARBUDS */}
      {creativeTheme === 'earbuds' && (
        <div className="absolute inset-0 bg-[#08070F] flex flex-col justify-between p-6 sm:p-7 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)]" />

          {/* Top Tech Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider text-[#06B6D4]">CYBERPOD · AUDIO</span>
            <span className="text-[10px] font-bold bg-[#8B5CF6]/30 text-[#A78BFA] px-2.5 py-1 rounded-md border border-[#8B5CF6]/40">
              {offerBadge}
            </span>
          </div>

          {/* Center 3D Floating Earbuds Graphic */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
            {/* Sonic Waves */}
            <div className="absolute w-44 h-44 rounded-full border border-[#06B6D4]/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
            <div className="absolute w-60 h-60 rounded-full border border-[#8B5CF6]/20 pointer-events-none" />

            <svg viewBox="0 0 200 160" className="w-52 sm:w-60 drop-shadow-[0_25px_35px_rgba(6,182,212,0.3)]" fill="none">
              {/* Charging Case Body */}
              <ellipse cx="100" cy="115" rx="55" ry="30" fill="#1E1B2E" stroke="#3730A3" strokeWidth="2" />
              <ellipse cx="100" cy="110" rx="50" ry="24" fill="#0F0D1B" />
              {/* LED glow indicator on case */}
              <ellipse cx="100" cy="128" rx="6" ry="2" fill="#06B6D4" filter="blur(1px)" />

              {/* Left Floating Earbud */}
              <g transform="translate(45, 20) rotate(-18)">
                <ellipse cx="25" cy="25" rx="16" ry="20" fill="#312E81" stroke="#8B5CF6" strokeWidth="2" />
                <rect x="20" y="38" width="10" height="35" rx="5" fill="#1E1B4B" stroke="#06B6D4" strokeWidth="1.5" />
                <circle cx="25" cy="22" r="5" fill="#06B6D4" />
              </g>

              {/* Right Floating Earbud */}
              <g transform="translate(105, 15) rotate(18)">
                <ellipse cx="25" cy="25" rx="16" ry="20" fill="#312E81" stroke="#8B5CF6" strokeWidth="2" />
                <rect x="20" y="38" width="10" height="35" rx="5" fill="#1E1B4B" stroke="#06B6D4" strokeWidth="1.5" />
                <circle cx="25" cy="22" r="5" fill="#06B6D4" />
              </g>
            </svg>
          </div>

          {/* Bottom Spec Matrix & CTA */}
          <div className="relative z-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{headlineText}</h3>
            <p className="text-xs text-white/70">{subText}</p>
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
              <div className="p-1 rounded bg-white/5">
                <div className="text-[11px] font-bold text-[#06B6D4]">-45dB</div>
                <div className="text-[9px] text-white/50">Hybrid ANC</div>
              </div>
              <div className="p-1 rounded bg-white/5">
                <div className="text-[11px] font-bold text-[#A78BFA]">48 Hrs</div>
                <div className="text-[9px] text-white/50">Total Play</div>
              </div>
              <div className="p-1 rounded bg-white/5">
                <div className="text-[11px] font-bold text-white">IPX7</div>
                <div className="text-[9px] text-white/50">Waterproof</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. LUXURY WATCH */}
      {creativeTheme === 'watch' && (
        <div className="absolute inset-0 bg-[#07060A] border border-[#272233] flex flex-col justify-between p-6 sm:p-7 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(226,184,136,0.12),transparent_65%)]" />

          {/* Top Horological Badge */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[11px] font-serif tracking-[0.2em] text-[#E2B888] uppercase">GENÈVE AUTOMATIQUE</span>
            <span className="text-[9px] text-white/50 uppercase tracking-widest">{offerBadge}</span>
          </div>

          {/* Center Watch Dial Graphic */}
          <div className="relative z-10 my-auto flex items-center justify-center py-2">
            <svg viewBox="0 0 180 200" className="w-44 sm:w-52 drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]" fill="none">
              {/* Watch Straps */}
              <rect x="70" y="5" width="40" height="40" fill="#1C1917" stroke="#44403C" strokeWidth="1" rx="4" />
              <rect x="70" y="155" width="40" height="40" fill="#1C1917" stroke="#44403C" strokeWidth="1" rx="4" />

              {/* Outer Case Bezel */}
              <circle cx="90" cy="100" r="62" fill="#18181B" stroke="#E2B888" strokeWidth="3" />
              {/* Inner Dial Face */}
              <circle cx="90" cy="100" r="54" fill="#09090B" stroke="#27272A" strokeWidth="1.5" />

              {/* Hour Indices */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="90"
                  y1="50"
                  x2="90"
                  y2="55"
                  stroke="#E2B888"
                  strokeWidth="2"
                  transform={`rotate(${deg} 90 100)`}
                />
              ))}

              {/* Sub-dials */}
              <circle cx="90" cy="115" r="14" fill="#121214" stroke="#52525B" strokeWidth="1" />
              <line x1="90" y1="115" x2="96" y2="110" stroke="#E2B888" strokeWidth="1.5" />

              {/* Watch Hands */}
              {/* Hour Hand */}
              <line x1="90" y1="100" x2="68" y2="88" stroke="#E2B888" strokeWidth="3.5" strokeLinecap="round" />
              {/* Minute Hand */}
              <line x1="90" y1="100" x2="118" y2="72" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              {/* Second Hand */}
              <line x1="90" y1="105" x2="90" y2="60" stroke="#8B5CF6" strokeWidth="1" />
              {/* Center Pivot Pin */}
              <circle cx="90" cy="100" r="4" fill="#E2B888" />
            </svg>
          </div>

          {/* Bottom Editorial Luxury Copy */}
          <div className="relative z-10 space-y-1.5 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono tracking-widest text-[#E2B888] uppercase">SWISS MOVEMENT · SAPPHIRE CRYSTAL</span>
            <h3 className="text-2xl font-serif tracking-tight text-white">{headlineText}</h3>
            <p className="text-xs text-white/60">{subText}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-serif font-bold text-white">₹14,999</span>
              <span className="text-[11px] font-semibold text-[#E2B888] border border-[#E2B888]/40 px-3 py-1 rounded hover:bg-[#E2B888]/10 transition-colors">
                INQUIRE NOW
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 7. SPARKLING ENERGY DRINK */}
      {creativeTheme === 'energy' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E0B36] via-[#120822] to-[#080210] flex flex-col justify-between p-6 sm:p-7 text-white">
          <div className="absolute top-1/4 right-10 w-44 h-44 bg-[#84CC16]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-5 w-48 h-48 bg-[#F97316]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-black tracking-widest text-[#84CC16] uppercase">VOLT BOTANICALS</span>
            <span className="text-[10px] font-bold bg-[#84CC16] text-[#0D0B12] px-2.5 py-0.5 rounded-full">
              {offerBadge}
            </span>
          </div>

          {/* Center Can Graphic & Splash */}
          <div className="relative z-10 my-auto flex items-center justify-center py-2">
            <svg viewBox="0 0 160 210" className="w-36 sm:w-44 drop-shadow-[0_20px_35px_rgba(132,204,22,0.4)]" fill="none">
              {/* Can Top Rim */}
              <ellipse cx="80" cy="30" rx="32" ry="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              <ellipse cx="80" cy="28" rx="22" ry="6" fill="#64748B" />

              {/* Can Body */}
              <path d="M48 30 L48 175 C48 185, 112 185, 112 175 L112 30 Z" fill="url(#canGradient)" />

              {/* Can Graphics & Lightning */}
              <path d="M85 60 L70 100 L84 100 L74 140 L98 90 L84 90 Z" fill="#84CC16" />
              <text x="56" y="160" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="2">VOLT ZEST</text>

              {/* Droplets on Can */}
              <circle cx="58" cy="70" r="2" fill="rgba(255,255,255,0.7)" />
              <circle cx="64" cy="115" r="2.5" fill="rgba(255,255,255,0.8)" />
              <circle cx="102" cy="85" r="2" fill="rgba(255,255,255,0.7)" />
              <circle cx="95" cy="130" r="1.5" fill="rgba(255,255,255,0.8)" />

              {/* Dynamic Citrus Slice Accent */}
              <g transform="translate(110, 60) rotate(25)">
                <circle cx="15" cy="15" r="14" fill="#F97316" stroke="#FEF08A" strokeWidth="2" />
                <circle cx="15" cy="15" r="10" fill="#EAB308" />
              </g>

              <defs>
                <linearGradient id="canGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#4C1D95" />
                  <stop offset="0.5" stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#312E81" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Bottom Bold Headline & Value */}
          <div className="relative z-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
              {headlineText}
            </h3>
            <p className="text-xs text-[#BEF264]">{subText}</p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-white/80">Pack of 12 · ₹799</span>
              <span className="bg-[#84CC16] text-[#0D0B12] text-xs font-black px-4 py-2 rounded-lg hover:bg-[#A3E635]">
                GRAB A CAN ⚡
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 8. ARTISAN CAFE & COFFEE */}
      {creativeTheme === 'coffee' && (
        <div className="absolute inset-0 bg-[#160E0A] border border-[#3E2519] flex flex-col justify-between p-6 sm:p-7 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.18),transparent_70%)]" />

          {/* Top Local Business Badge */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#3E2519] pb-2">
            <span className="text-[11px] font-bold tracking-widest text-[#D97706] uppercase">NEIGHBORHOOD ROASTERS</span>
            <span className="text-[10px] bg-[#9A3412] text-amber-100 font-semibold px-2 py-0.5 rounded">
              {offerBadge}
            </span>
          </div>

          {/* Center Coffee Cup with Aromatic Steam */}
          <div className="relative z-10 my-auto flex items-center justify-center py-2">
            <svg viewBox="0 0 200 180" className="w-48 sm:w-56 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" fill="none">
              {/* Steam waves */}
              <path d="M85 30 Q80 15 88 5 T96 -5" stroke="rgba(253,230,138,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M105 32 Q110 18 102 8 T110 -2" stroke="rgba(253,230,138,0.4)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Ceramic Cup Saucer */}
              <ellipse cx="100" cy="148" rx="70" ry="14" fill="#291811" stroke="#573424" strokeWidth="2" />

              {/* Ceramic Coffee Cup */}
              <path d="M55 70 L65 140 C65 145, 135 145, 135 140 L145 70 Z" fill="#3E2519" stroke="#78442D" strokeWidth="2" />

              {/* Cup Handle */}
              <path d="M142 85 C165 85, 165 125, 138 128" stroke="#78442D" strokeWidth="8" strokeLinecap="round" fill="none" />

              {/* Rich Espresso Liquid Top */}
              <ellipse cx="100" cy="72" rx="43" ry="12" fill="#1C100B" />
              <ellipse cx="100" cy="72" rx="38" ry="10" fill="#9A3412" />
              {/* Latte Art Heart */}
              <path d="M93 70 C93 67, 100 66, 100 71 C100 66, 107 67, 107 70 C107 74, 100 77, 100 77 C100 77, 93 74, 93 70 Z" fill="#FDE68A" />
            </svg>
          </div>

          {/* Bottom Neighborhood Copy & Voucher */}
          <div className="relative z-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FEF3C7] leading-tight">
              {headlineText}
            </h3>
            <p className="text-xs text-amber-200/70">{subText}</p>
            <div className="pt-2 flex items-center justify-between border-t border-[#3E2519]">
              <div className="text-[11px] text-amber-300 font-medium">📍 Main Street & 4th</div>
              <span className="bg-[#D97706] text-black font-bold text-xs px-3.5 py-1.5 rounded-lg hover:bg-[#F59E0B]">
                CLAIM OFFER ☕
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Concept Work Label Watermark / Badge at Top Left */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none">
        <span className="px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white/80 rounded border border-white/10">
          {project.badge}
        </span>
      </div>
    </div>
  );
};
