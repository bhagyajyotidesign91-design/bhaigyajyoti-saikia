import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Instagram, Mail, Send, CheckCircle2, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings, submitInquiry } = useApp();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsappNumber: '',
    businessName: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsappNumber.trim()) return;

    submitInquiry({
      name: formData.name.trim(),
      whatsappNumber: formData.whatsappNumber.trim(),
      businessName: formData.businessName.trim(),
      message: formData.message.trim(),
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', whatsappNumber: '', businessName: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  const cleanWhatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#8B5CF6] uppercase">
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Have a question about ad designs or want to discuss your brand’s visual direction? Reach out directly.
          </p>
        </div>

        {/* Split Layout: Contact Cards beside form on desktop, above form on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Direct Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Direct Messaging Channels
            </h3>

            {/* WhatsApp Business Card */}
            <a
              href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent('Hello Bhagyajyoti, I would like to inquire about your ad design services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#16131F] border border-[#272233] hover:border-emerald-500/50 hover:bg-[#1A1625] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-400 font-medium">Fastest Response</div>
                <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  WhatsApp Business
                </div>
                <div className="text-xs text-slate-400 font-mono truncate">{settings.whatsappNumber}</div>
              </div>
              <span className="text-xs font-bold text-emerald-400 shrink-0">Chat →</span>
            </a>

            {/* Instagram DM Card */}
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#16131F] border border-[#272233] hover:border-[#8B5CF6]/50 hover:bg-[#1A1625] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 text-[#A78BFA] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-400 font-medium">Direct Messages</div>
                <div className="text-base font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                  Instagram DM
                </div>
                <div className="text-xs text-slate-400 truncate">{settings.instagramHandle}</div>
              </div>
              <span className="text-xs font-bold text-[#8B5CF6] shrink-0">Open →</span>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#16131F] border border-[#272233] hover:border-sky-500/50 hover:bg-[#1A1625] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-400 font-medium">Email Inquiries</div>
                <div className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                  Direct Email
                </div>
                <div className="text-xs text-slate-400 truncate">{settings.email}</div>
              </div>
              <span className="text-xs font-bold text-sky-400 shrink-0">Write →</span>
            </a>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#16131F] border border-[#272233] rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">Send a Quick Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Leave your details and business name, and I will get back to you shortly on WhatsApp.
            </p>

            {formSubmitted ? (
              <div className="p-8 text-center space-y-3 bg-[#0D0B12] rounded-2xl border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-400">
                  Thank you! I will reply to your WhatsApp number soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Your Name <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      WhatsApp Number <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Product or Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Spice Route Kitchen / Glow Naturals"
                    className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me what kind of product ad design you need..."
                    className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-lg shadow-[#8B5CF6]/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
