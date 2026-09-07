'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { BentoGrid } from '@/components/BentoGrid';
import { ExploreGigs } from '@/components/ExploreGigs';
import { KanbanWorkspace } from '@/components/KanbanWorkspace';
import { EscrowSimulator } from '@/components/EscrowSimulator';
import { AIScoperModal } from '@/components/AIScoperModal';
import { QuickBidDrawer } from '@/components/QuickBidDrawer';
import { SkillLedgerModal } from '@/components/SkillLedgerModal';
import { WelcomeModal } from '@/components/WelcomeModal';
import { LoginModal } from '@/components/LoginModal';
import { StartingSplash } from '@/components/StartingSplash';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
export default function Home() {
  const { 
    activeTab, 
    toastMessage
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Attractive Starting Entrance Animation */}
      <StartingSplash />

      {/* Dynamic Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="glass-pill-dark text-white px-4 py-3 rounded-2xl shadow-xl border border-zinc-700 flex items-center gap-3 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Navigation */}
      <div className="w-full pt-4">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full mt-2">
        {activeTab === 'dashboard' && (
          <>
            <BentoGrid />
            <AboutSection />
          </>
        )}
        {activeTab === 'explore' && <ExploreGigs />}
        {activeTab === 'workspace' && <KanbanWorkspace />}
        {activeTab === 'escrow' && <BentoGrid />}
        {activeTab === 'ledger' && <BentoGrid />}
        {activeTab === 'about' && <AboutSection />}
      </main>


      {/* Global Modals & Drawers */}
      <WelcomeModal />
      <LoginModal />
      <EscrowSimulator />
      <AIScoperModal />
      <QuickBidDrawer />
      <SkillLedgerModal />

      {/* Flipkart-Style Enterprise TechPunjab Footer */}
      <Footer />

    </div>
  );
}
