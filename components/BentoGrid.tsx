'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Star, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  Copy, 
  ChevronRight,
  Send,
  Building,
  Briefcase,
  Layers,
  FileCheck,
  Check
} from 'lucide-react';

export const BentoGrid: React.FC = () => {
  const { 
    role, 
    freelancer, 
    activeGig, 
    setIsEscrowModalOpen, 
    setIsLedgerModalOpen,
    openQuickBid,
    setIsScoperModalOpen,
    escrowStatus,
    showToast,
    setActiveTab
  } = useApp();

  const [copiedHash, setCopiedHash] = React.useState(false);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(true);
    showToast('📋 SHA-256 hash copied to clipboard');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const primaryCert = freelancer.certifications[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Welcome Banner with Role Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              <Sparkles className="w-3 h-3" />
              {role === 'freelancer' ? 'Trainee & Freelancer Portal' : 'MSME & Industry Employer Portal'}
            </span>
            <span className="text-zinc-400 text-xs">•</span>
            <span className="text-xs text-zinc-500 font-mono">TechPunjab • Govt. of Punjab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-1">
            {role === 'freelancer' ? (
              <>Welcome back, <span className="text-indigo-600">{freelancer.name.split(' ')[0]}</span> 👋</>
            ) : (
              <>Industry Talent Hub & <span className="text-indigo-600">Smart Escrow</span></>
            )}
          </h1>
        </div>

        {/* Quick stat chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <div className="glass-pill px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-zinc-500">Escrow Protected:</span>
            <span className="font-mono font-bold text-zinc-900">₹24,500</span>
          </div>
          <button
            onClick={() => setIsScoperModalOpen(true)}
            className="px-3 py-1.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 border border-indigo-200 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Milestone Scoper</span>
          </button>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(240px,auto)]">
        
        {/* =========================================================================
            TILE 1 (Span 2 cols, 1 row): Freelancer Talent Spotlight
            ========================================================================= */}
        <div className="bento-card col-span-1 md:col-span-2 p-6 flex flex-col justify-between group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Avatar with gradient ring */}
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-0.5 bg-gradient-to-tr from-indigo-500 via-pink-500 to-emerald-400 shadow-md group-hover:rotate-1 transition-transform">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-sm" title="Active on PSDM Portal">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900">{freelancer.name}</h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    PSDM Accredited
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 mt-0.5">{freelancer.title}</p>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                  <span>📍 {freelancer.location}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">Available for contracts</span>
                </p>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('explore')}
              className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-xl hover:bg-zinc-100 transition-colors"
              title="View Public Profile"
            >
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Skill Tags */}
          <div className="my-4">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Verified Vocational Competencies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {freelancer.skills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-xl text-xs font-medium bg-zinc-100 hover:bg-indigo-50 hover:text-indigo-700 text-zinc-700 border border-zinc-200/70 transition-colors cursor-pointer"
                >
                  {skill}
                </span>
              ))}
              <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                +2 Verified
              </span>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="pt-3 border-t border-zinc-100 grid grid-cols-3 gap-2">
            <div>
              <div className="text-[11px] text-zinc-500 font-medium">Hourly Rate</div>
              <div className="text-sm sm:text-base font-mono font-bold text-zinc-900">
                ₹{freelancer.hourlyRate.toLocaleString('en-IN')}<span className="text-xs font-normal text-zinc-500">/hr</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-zinc-500 font-medium">Job Success</div>
              <div className="text-sm sm:text-base font-mono font-bold text-emerald-600 flex items-center gap-1">
                <span>{freelancer.jobSuccessScore}%</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-sans">Top</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-zinc-500 font-medium">PSDM Jobs</div>
              <div className="text-sm sm:text-base font-mono font-bold text-indigo-600">
                {freelancer.completedJobs} Completed
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TILE 2 (Span 1 col, 1 row): Escrow Protection Vault
            ========================================================================= */}
        <div 
          onClick={() => setIsEscrowModalOpen(true)}
          className="bento-card col-span-1 p-6 flex flex-col justify-between cursor-pointer bg-gradient-to-br from-indigo-900 via-indigo-950 to-zinc-950 text-white border-indigo-800/40 relative overflow-hidden group hover:shadow-glow-indigo"
        >
          {/* Subtle glowing ambient circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/15 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200">
              {escrowStatus === 'DISBURSED_TO_FREELANCER' ? 'DISBURSED' : 'SMART ESCROW'}
            </span>
          </div>

          <div className="relative z-10 my-3">
            <div className="text-xs text-indigo-200/80 font-medium flex items-center gap-1.5">
              <span>Native UPI Vault</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold tracking-tight text-white mt-1">
              ₹24,500
            </div>
            <div className="text-xs text-indigo-300/80 mt-1">
              Locked in Smart Escrow
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-indigo-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-indigo-200">
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-[11px] font-mono">Milestone 2 release in 48h</span>
            </div>
            <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* =========================================================================
            TILE 3 (Span 1 col, 1 row): State Skill Accreditation Badge
            ========================================================================= */}
        <div 
          onClick={() => setIsLedgerModalOpen(true)}
          className="bento-card col-span-1 p-6 flex flex-col justify-between cursor-pointer border-emerald-200/60 bg-gradient-to-b from-white to-emerald-50/30 hover:border-emerald-400 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              NSQF Level 5
            </span>
          </div>

          <div className="my-2">
            <div className="text-xs font-semibold text-emerald-800">
              Punjab Skill Development Mission
            </div>
            <div className="text-sm font-bold text-zinc-900 mt-0.5 leading-snug">
              State Certified Trainee Credential
            </div>
            <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
              MSDC Mohali Sector 66 • Batch 2024
            </p>
          </div>

          {/* Cryptographic hash snippet */}
          <div className="pt-2 border-t border-zinc-100">
            <div className="text-[10px] font-mono text-zinc-400 mb-1 flex items-center justify-between">
              <span>SHA-256 Merkle Proof</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                <Check className="w-3 h-3" /> Validated
              </span>
            </div>
            <div className="bg-zinc-100/90 hover:bg-zinc-200/70 p-2 rounded-xl text-[10px] font-mono text-zinc-600 flex items-center justify-between group/hash">
              <span className="truncate max-w-[170px]">{primaryCert.sha256Proof}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyHash(primaryCert.sha256Proof);
                }}
                className="text-zinc-400 hover:text-zinc-700 ml-1"
                title="Copy cryptographic proof hash"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TILE 4 (Span 2 cols, 1 row): Featured Deliverable / Proof of Work
            ========================================================================= */}
        <div className="bento-card col-span-1 md:col-span-2 p-6 flex flex-col justify-between group">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  Proof of Work Deliverable
                </span>
                <span className="text-xs text-zinc-400">•</span>
                <div className="flex items-center text-amber-500 text-xs font-bold gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>5.0</span>
                  <span className="text-zinc-400 font-normal">(Verified Client Review)</span>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 mt-1.5 group-hover:text-indigo-600 transition-colors">
                {freelancer.featuredProject.title}
              </h3>
            </div>

            <a
              href={freelancer.featuredProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.preventDefault();
                showToast('🚀 Opening live Punjab Freight & Logistics demo sandbox...');
              }}
              className="w-8 h-8 rounded-xl bg-zinc-100 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center text-zinc-500 transition-colors"
              title="Live Interactive Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 my-2 leading-relaxed">
            {freelancer.featuredProject.description}
          </p>

          <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="text-xs text-zinc-700 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span className="font-mono text-zinc-900 font-semibold">{freelancer.featuredProject.metrics}</span>
            </div>
            
            <div className="flex items-center gap-1.5 flex-wrap">
              {freelancer.featuredProject.tags.map((t) => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white border border-zinc-200 text-zinc-600">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            TILE 5 (Span 2 cols, 1 row): AI Semantic Match Engine
            ========================================================================= */}
        <div className="bento-card-dark col-span-1 md:col-span-2 p-6 flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle rose ambient glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-pink-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-500/25 transition-all"></div>
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-400">Semantic AI Match Engine</div>
                <div className="text-sm font-bold text-white">Punjab Industrial Demand Scanner</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-mono font-bold text-xs shadow-glow-rose">
              <span>98% Match</span>
            </div>
          </div>

          <div className="relative z-10 my-3">
            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-zinc-400" />
              <span>{activeGig.clientCompany} • {activeGig.clientLocation}</span>
            </div>
            <div className="text-base font-semibold text-zinc-100 mt-1 line-clamp-1">
              {activeGig.title}
            </div>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              {activeGig.matchRationale}
            </p>
          </div>

          <div className="relative z-10 pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Contract Value:</span>
              <span className="font-mono font-bold text-white text-sm">
                ₹{activeGig.budget.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => openQuickBid(activeGig)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-semibold text-xs transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Quick Bid with AI</span>
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Feature Teaser Strip */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => setIsEscrowModalOpen(true)}
          className="glass-pill p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              ₹
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Simulate UPI Milestone Escrow</div>
              <div className="text-[11px] text-zinc-500">Test the 4-step deposit, submission & disbursement cycle</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </div>

        <div 
          onClick={() => setActiveTab('workspace')}
          className="glass-pill p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-amber-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Contract Sprint Workspace</div>
              <div className="text-[11px] text-zinc-500">Kanban board with live milestone payout badges</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </div>

        <div 
          onClick={() => setIsScoperModalOpen(true)}
          className="glass-pill p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-pink-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">AI Project Scope Decomposition</div>
              <div className="text-[11px] text-zinc-500">Turn raw MSME ideas into 3 structured milestones</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </div>
      </div>

    </div>
  );
};
