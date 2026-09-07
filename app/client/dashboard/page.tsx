'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { BentoGrid } from '@/components/BentoGrid';
import { KanbanWorkspace } from '@/components/KanbanWorkspace';
import { EscrowSimulator } from '@/components/EscrowSimulator';
import { AIScoperModal } from '@/components/AIScoperModal';
import { SkillLedgerModal } from '@/components/SkillLedgerModal';
import { Footer } from '@/components/Footer';
import { 
  Building2, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Award, 
  CheckCircle2, 
  FileCheck,
  TrendingUp,
  Plus
} from 'lucide-react';

export default function ClientDashboardPage() {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    toastMessage,
    setIsScoperModalOpen,
    setIsEscrowModalOpen,
    setIsLedgerModalOpen,
    escrowAmount
  } = useApp();

  return (
    <ProtectedRoute allowedRole="client">
      <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900 bg-canvas">
        
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

        {/* Main Client Area */}
        <main className="flex-1 w-full mt-2 pb-24 md:pb-6">
          
          {/* Sub-header Banner dedicated for MSME */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-2">
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-indigo-950 text-white p-4 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-lg relative overflow-hidden border border-zinc-700/50">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] sm:text-xs font-semibold backdrop-blur-sm">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>MSME Enterprise Portal</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-mono font-bold">
                      <ShieldCheck className="w-3 h-3 text-indigo-400" />
                      GSTIN & UDYAM VERIFIED
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                    {currentUser?.name ? `${currentUser.name}'s Enterprise Hub` : 'MSME Industry Employer Hub'} 🏭
                  </h1>
                  <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-xl">
                    Commission high-skill tech solutions from PSDM certified trainees, safeguard project capital with RBI-compliant Smart Escrow, and disburse instant UPI payments upon milestone verification.
                  </p>
                </div>

                {/* MSME Quick Actions */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setIsScoperModalOpen(true)}
                    className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Project</span>
                  </button>
                  <button
                    onClick={() => setIsEscrowModalOpen(true)}
                    className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold text-xs border border-indigo-400/30 flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Lock className="w-3.5 h-3.5 text-indigo-200" />
                    <span>Manage Escrow</span>
                  </button>
                  <button
                    onClick={() => setIsLedgerModalOpen(true)}
                    className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-300" />
                    <span>PSDM Ledger</span>
                  </button>
                </div>
              </div>

              {/* MSME Metric Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[10px] sm:text-[11px] truncate">Escrow Locked Funds</div>
                  <div className="text-base sm:text-lg font-extrabold text-white font-mono mt-0.5">₹{escrowAmount.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px] sm:text-[11px] truncate">Active Milestone Status</div>
                  <div className="text-base sm:text-lg font-extrabold text-indigo-300 font-mono mt-0.5">In Review</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px] sm:text-[11px] truncate">Verified Candidates</div>
                  <div className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono mt-0.5">14 Candidates</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px] sm:text-[11px] truncate">Disbursement Protocol</div>
                  <div className="text-base sm:text-lg font-extrabold text-white font-mono mt-0.5">Instant UPI VPA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Tabs View for Client */}
          {activeTab === 'dashboard' && <BentoGrid />}
          {activeTab === 'workspace' && <KanbanWorkspace />}
          {activeTab === 'escrow' && <BentoGrid />}
          {activeTab === 'ledger' && <BentoGrid />}
          {activeTab === 'explore' && <BentoGrid />}

        </main>

        {/* Global Modals & Drawers for Client */}
        <AIScoperModal />
        <EscrowSimulator />
        <SkillLedgerModal />

        {/* Footer */}
        <Footer />

      </div>
    </ProtectedRoute>
  );
}
