import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Instagram, MessageSquare, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setIsPrivacyOpen, setIsAdminOpen } = useApp();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#09070D] border-t border-[#272233] text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
              <div className="w-7 h-7 rounded-lg bg-[#8B5CF6] flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span>{settings.brandName}</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Eye-catching product ad designs for businesses, online sellers and local brands.
            </p>
            <div className="text-[11px] text-slate-500">
              Specializing in single-ad turnarounds for ₹{settings.adPrice} with 24-hour delivery.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2">
              {['Home', 'Portfolio', 'Services', 'About', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* All Four Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Services
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Product Ad Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Food & Restaurant Ads
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Beauty & Fashion Ads
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Social Media Ad Creatives
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels & Admin Portal */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Connect & Admin
            </div>
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${cleanWhatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Business</span>
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#8B5CF6]" />
                <span>Instagram: {settings.instagramHandle}</span>
              </a>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-2 hover:text-white text-slate-500 pt-2 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>Private Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-8 border-t border-[#272233] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
            <span>© {currentYear} {settings.brandName}. All rights reserved.</span>
            <span>·</span>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-white transition-colors underline"
            >
              Privacy Policy & 30-Day Photo Retention
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
