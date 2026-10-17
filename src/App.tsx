import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { About } from './components/About';
import { OrderForm } from './components/OrderForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PrivacyModal } from './components/PrivacyModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0D0B12] text-white selection:bg-[#8B5CF6]/30 selection:text-white flex flex-col font-sans">
        {/* Sticky 3-zone Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <Portfolio />
          <Services />
          <Pricing />
          <About />
          <OrderForm />
          <Contact />
        </main>

        {/* Organized Multi-column Footer */}
        <Footer />

        {/* Global Floating Elements & Overlays */}
        <FloatingWhatsApp />
        <PrivacyModal />
        <AdminDashboard />
      </div>
    </AppProvider>
  );
}
