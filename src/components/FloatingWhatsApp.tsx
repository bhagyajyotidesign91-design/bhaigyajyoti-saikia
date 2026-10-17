import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent('Hi Bhagyajyoti, I would like to design an ad for my product.');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Optional Quick Tooltip */}
      {showTooltip && (
        <div className="bg-[#16131F] border border-[#272233] text-white text-xs px-3.5 py-2 rounded-xl shadow-xl animate-in fade-in slide-in-from-right-2 duration-150 flex items-center gap-2">
          <span>Chat directly on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        aria-label="Contact Bhagyajyoti on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
};
