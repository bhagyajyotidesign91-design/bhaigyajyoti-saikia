import React from 'react';
import { Package, Utensils, Sparkles, Share2, ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      id: 'prod-ad',
      title: 'Product Ad Design',
      icon: Package,
      description: 'Eye-catching creatives highlighting product features, tech specifications, and unique selling propositions for e-commerce and retail.',
    },
    {
      id: 'food-ad',
      title: 'Food & Restaurant Ads',
      icon: Utensils,
      description: 'Appetite-inducing promotional creatives for restaurants, cafes, cloud kitchens, and food delivery platforms designed to drive immediate orders.',
    },
    {
      id: 'beauty-ad',
      title: 'Beauty & Fashion Ads',
      icon: Sparkles,
      description: 'Minimalist and luxury editorial creatives for cosmetics, skincare, apparel, and lifestyle accessories that build strong brand prestige.',
    },
    {
      id: 'social-ad',
      title: 'Social Media Ad Creatives',
      icon: Share2,
      description: 'High-engagement Facebook and Instagram post & story ad creatives formatted precisely for maximum feed visibility and click-through rates.',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-[#0D0B12] border-t border-[#272233] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#8B5CF6] uppercase">
            <span>Specialized Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Creative Design Services
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Tailored advertising graphics designed specifically for brands, online sellers, and local businesses.
          </p>
        </div>

        {/* Four Clean Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-[#16131F] border border-[#272233] hover:border-[#8B5CF6]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0D0B12] border border-[#272233] flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500">0{idx + 1}</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#A78BFA] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
                  >
                    View Pricing
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
