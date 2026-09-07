'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { BentoGrid } from '@/components/BentoGrid';
import { ExploreGigs } from '@/components/ExploreGigs';
import { KanbanWorkspace } from '@/components/KanbanWorkspace';
import { EscrowSimulator } from '@/components/EscrowSimulator';
import { QuickBidDrawer } from '@/components/QuickBidDrawer';
import { SkillLedgerModal } from '@/components/SkillLedgerModal';
import { Footer } from '@/components/Footer';
import { 
  User, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  Layers, 
  Award, 
  Search, 
  Lock,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export default function FreelancerDashboardPage() {
  const { 
    currentUser, 
    freelancer, 
    activeTab, 
    setActiveTab, 
    toastMessage,
    setIsLedgerModalOpen,
    setIsEscrowModalOpen,
    openQuickBid,
    gigs
  } = useApp();

  return (
    <ProtectedRoute allowedRole="freelancer">
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

        {/* Main Freelancer Area */}
        <main className="flex-1 w-full mt-2 pb-24 md:pb-6">
          
          {/* Sub-header Banner dedicated for Freelancer */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-2">
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-zinc-900 text-white p-4 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 text-indigo-200 border border-white/10 text-[11px] sm:text-xs font-semibold backdrop-blur-sm">
                      <User className="w-3.5 h-3.5 text-indigo-300" />
                      <span>PSDM Certified Portal</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      VERIFIED
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                    Welcome back, {currentUser?.name || freelancer.name}! 👋
                  </h1>
                  <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-xl">
                    Punjab Skill Development Mission certified freelancer portal. Browse high-value gigs, manage active escrow deliverables, and build your on-chain verified credential ledger.
                  </p>
                </div>

                {/* Freelancer Quick Actions */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Find Gigs</span>
                  </button>
                  <button
                    onClick={() => setIsLedgerModalOpen(true)}
                    className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-300" />
                    <span>View Credentials</span>
                  </button>
                </div>
              </div>

              {/* Freelancer Metric Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[10px] sm:text-[11px] truncate">Total Escrow Earned</div>
                  <div className="text-base sm:text-lg font-extrabold text-white font-mono mt-0.5">₹{freelancer.totalEarnings.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px] sm:text-[11px] truncate">Job Success Rate</div>
                  <div className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono mt-0.5">{freelancer.jobSuccessScore}%</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px] sm:text-[11px] truncate">Completed Contracts</div>
                  <div className="text-base sm:text-lg font-extrabold text-white font-mono mt-0.5">{freelancer.completedJobs} Jobs</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px] sm:text-[11px] truncate">PSDM Accreditation</div>
                  <div className="text-base sm:text-lg font-extrabold text-indigo-300 font-mono mt-0.5">Level {freelancer.psdmLevel} Certified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Tabs View */}
          {activeTab === 'dashboard' && <BentoGrid />}
          {activeTab === 'explore' && <ExploreGigs />}
          {activeTab === 'workspace' && <KanbanWorkspace />}
          {activeTab === 'escrow' && <BentoGrid />}
          {activeTab === 'ledger' && <BentoGrid />}

        </main>

        {/* Global Modals & Drawers for Freelancer */}
        <EscrowSimulator />
        <QuickBidDrawer />
        <SkillLedgerModal />

        {/* Footer */}
        <Footer />

      </div>
    </ProtectedRoute>
  );
}
