'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Building2, 
  User, 
  ArrowRight,
  Zap,
  Globe,
  Coins,
  Cpu,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const AboutSection: React.FC = () => {
  const { setActiveTab, setIsEscrowModalOpen, setIsScoperModalOpen, setIsLedgerModalOpen } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-900 via-zinc-900 to-zinc-950 text-white p-8 sm:p-12 border border-zinc-800 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Govt. of Punjab Initiative • Punjab Skill Development Mission</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Empowering Punjab’s Tech Talent, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Digitizing Punjab’s MSMEs.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
            <strong>TechPunjab</strong> is a state-backed decentralized gig ecosystem built to eliminate trust barriers. 
            We bridge the gap between Punjab Skill Development Mission (PSDM) certified vocational tech trainees and 
            local MSME enterprises through automated UPI Escrow, verifiable on-chain credentials, and AI-assisted project scoping.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setActiveTab('explore')}
              className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsEscrowModalOpen(true)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-zinc-200 font-semibold border border-white/10 transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-300" />
              <span>Simulate Escrow</span>
            </button>

            <button
              onClick={() => setIsLedgerModalOpen(true)}
              className="px-4 py-2 rounded-full bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-200 font-semibold border border-emerald-500/30 transition-all flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-emerald-300" />
              <span>Punjab Skill Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="glass-pill p-5 rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">14,800+</div>
          <div className="text-xs font-semibold text-zinc-900 mt-1">PSDM Certified Trainees</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Trained across 23 district MSDCs</div>
        </div>

        <div className="glass-pill p-5 rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">1,250+</div>
          <div className="text-xs font-semibold text-zinc-900 mt-1">Onboarded MSMEs</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Ludhiana, Jalandhar, Mohali & more</div>
        </div>

        <div className="glass-pill p-5 rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-pink-600 font-mono">₹4.2 Cr+</div>
          <div className="text-xs font-semibold text-zinc-900 mt-1">Safe Escrow Disbursed</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Zero payment disputes recorded</div>
        </div>

        <div className="glass-pill p-5 rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">100%</div>
          <div className="text-xs font-semibold text-zinc-900 mt-1">On-Chain Verification</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Cryptographic SHA-256 proofs</div>
        </div>
      </div>

      {/* Three Architectural Pillars */}
      <div className="mt-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider font-mono">Core Pillars</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 mt-1">
            Engineered for Transparency, Safety & Speed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">Milestone-Based UPI Escrow</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                MSMEs lock project funds upfront in an encrypted UPI escrow vault. 
                Payments release automatically to freelancers milestone-by-milestone upon verified deliverable approval.
              </p>
            </div>
            <ul className="mt-4 pt-4 border-t border-zinc-100 space-y-1.5 text-xs text-zinc-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 100% Payment Guarantee</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Zero Advance Deposit Risk</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">PSDM Verified Skill Ledger</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                Government accreditation is tied directly to applicant profiles with immutable SHA-256 Merkle proofs, 
                eliminating forged credentials and guaranteeing qualified talent.
              </p>
            </div>
            <ul className="mt-4 pt-4 border-t border-zinc-100 space-y-1.5 text-xs text-zinc-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> NSQF Level 5+ Certified</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Live Govt. Registry Validation</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">AI Milestone Scoper</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                Small business owners don’t need technical background. Our AI Scoper breaks raw requirements into 
                actionable milestones, fair price estimates, and matches the best candidate.
              </p>
            </div>
            <ul className="mt-4 pt-4 border-t border-zinc-100 space-y-1.5 text-xs text-zinc-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 98% Semantic Skill Match</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Instant Sprint Decomposition</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4-Step How It Works Workflow */}
      <div className="mt-10 p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">Simple 4-Step Process</span>
          <h2 className="text-xl font-extrabold text-zinc-900 mt-1">How TechPunjab Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-3">1</div>
            <h4 className="font-bold text-xs text-zinc-900">Post Project with AI</h4>
            <p className="text-[11px] text-zinc-500 mt-1">MSME inputs requirements; AI Scoper auto-structures 3 sprint milestones with timelines.</p>
          </div>

          <div className="relative p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-3">2</div>
            <h4 className="font-bold text-xs text-zinc-900">Verified Trainee Match</h4>
            <p className="text-[11px] text-zinc-500 mt-1">Certified Punjab Skill Mission graduates review and place proposals with verified badges.</p>
          </div>

          <div className="relative p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-3">3</div>
            <h4 className="font-bold text-xs text-zinc-900">Lock UPI Escrow</h4>
            <p className="text-[11px] text-zinc-500 mt-1">Client funds the milestone via UPI simulator. Funds are safe and guaranteed for payout.</p>
          </div>

          <div className="relative p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-3">4</div>
            <h4 className="font-bold text-xs text-zinc-900">Approve & Disburse</h4>
            <p className="text-[11px] text-zinc-500 mt-1">Trainee submits deliverables; client reviews and approves to trigger instant bank transfer.</p>
          </div>
        </div>
      </div>

    </section>
  );
};
