import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Clock, Trash2, Mail, Lock } from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { isPrivacyOpen, setIsPrivacyOpen, settings } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPrivacyOpen(false);
      }
    };
    if (isPrivacyOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isPrivacyOpen, setIsPrivacyOpen]);

  if (!isPrivacyOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsPrivacyOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-[#16131F] border border-[#272233] rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#272233] bg-[#120F1B]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#8B5CF6]" />
            <h2 id="privacy-title" className="text-lg font-bold text-white">
              Privacy Policy & Data Handling
            </h2>
          </div>
          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Close Privacy Policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#8B5CF6]" />
              1. Information We Collect
            </h3>
            <p>
              When submitting an order or contact inquiry on this website, we collect only the necessary details required to craft your advertisement designs:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
              <li>Client or Business Name</li>
              <li>WhatsApp phone number for design communications and file delivery</li>
              <li>Product details: name, category, pricing, promotional offers, and preferred style</li>
              <li>Uploaded product photographs (up to 3 photos, maximum 5 MB each)</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8B5CF6]" />
              2. 30-Day Photo Retention Policy
            </h3>
            <p>
              Customer-uploaded product photos are stored temporarily solely to execute your ad design project.
            </p>
            <div className="p-3.5 rounded-xl bg-[#0D0B12] border border-[#272233] text-slate-400">
              <span className="font-semibold text-white">Retention Guarantee:</span> Customer-uploaded photos and raw materials are marked for permanent deletion <strong className="text-emerald-400">30 days</strong> following the successful delivery of your completed advertisement order.
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#8B5CF6]" />
              3. On-Demand Deletion Requests
            </h3>
            <p>
              You maintain full ownership of your product media. At any time before or after project delivery, you can request immediate manual deletion of all stored photos and order details by messaging us on WhatsApp or emailing us at <span className="font-mono text-[#8B5CF6]">{settings.email}</span>.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
              4. Third-Party Services
            </h3>
            <p>
              When you initiate an order, handoff occurs over WhatsApp (operated by Meta Platforms, Inc.). Your communication over WhatsApp is governed by WhatsApp's End-to-End Encryption and privacy terms. We never sell, rent, or distribute your business information or media to advertisers or data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#8B5CF6]" />
              5. Contact for Privacy Inquiries
            </h3>
            <p>
              If you have questions regarding data privacy, photo retention, or wish to exercise your rights:
            </p>
            <div className="text-slate-400">
              <div><strong>Designer:</strong> Bhagyajyoti Saikia</div>
              <div><strong>Email:</strong> {settings.email}</div>
              <div><strong>WhatsApp:</strong> {settings.whatsappNumber}</div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#272233] bg-[#120F1B] flex justify-end">
          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
