'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Award, 
  Lock, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  ArrowRight,
  Landmark,
  FileCheck2,
  Users,
  Briefcase
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { 
    setActiveTab, 
    setIsLedgerModalOpen, 
    setIsEscrowModalOpen, 
    setIsScoperModalOpen,
    role
  } = useApp();

  const clusters = [
    {
      city: 'Ludhiana',
      title: 'Auto, Cycles & Light Engineering',
      desc: 'Over 4,500 active MSMEs producing bicycle components, transmission gears, and industrial sewing equipment.',
      badge: 'Level 5 NSQF CNC & IoT'
    },
    {
      city: 'Amritsar',
      title: 'Agro-Processing & Textiles',
      desc: 'Major export hub for Basmati rice milling, cold chain distribution, and woolen shawls.',
      badge: 'Level 5 Full-Stack & ERP'
    },
    {
      city: 'Jalandhar',
      title: 'Sports Goods & Leather Complex',
      desc: 'India’s premier sports manufacturing cluster delivering soccer equipment and export-grade protective garments.',
      badge: 'Level 4 Microservices & Web'
    },
    {
      city: 'Mohali & Chandigarh',
      title: 'IT & Applied Generative AI',
      desc: 'Fast-growing Silicon Valley of North India with Quark City SEZ, STPI incubation hubs, and applied ML teams.',
      badge: 'Level 6 AI & Cybersecurity'
    }
  ];

  const pillars = [
    {
      icon: Award,
      title: 'PSDM Verified Skill Passports',
      desc: 'Every freelancer profile is cryptographic proof of certified vocational training from Punjab Skill Development Mission with tamper-proof NSQF scores.',
      color: 'emerald'
    },
    {
      icon: Lock,
      title: 'Native UPI Smart Escrow',
      desc: 'Funds are securely locked in RBI-compliant escrow vaults before milestones begin, ensuring guaranteed payment upon verified deliverable approval.',
      color: 'indigo'
    },
    {
      icon: Sparkles,
      title: 'AI Scope & Milestone Scoper',
      desc: 'Gemini-powered natural language scoping translates complex business requirements into clear, step-by-step deliverable milestones.',
      color: 'pink'
    },
    {
      icon: Landmark,
      title: 'Government Backed MSME Trust',
      desc: 'Jointly supervised with the Department of Employment Generation, Skill Development & Training, Govt. of Punjab for zero-dispute talent procurement.',
      color: 'teal'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Hero Mission Card */}
      <div className="bg-gradient-to-br from-zinc-900 via-indigo-950 to-zinc-900 text-white p-6 sm:p-10 rounded-3xl shadow-lg border border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Official State Platform
            </span>
            <span className="text-zinc-400 text-xs">•</span>
            <span className="text-xs text-zinc-300 font-mono">Department of Employment Generation & PSDM</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Connecting Certified Punjab Talent with Verified Industrial MSMEs
          </h1>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            TechPunjab is Punjab’s official decentralized skill and gig execution portal. 
            By integrating NSQF-certified vocational skill ledgers with automated UPI milestone escrow, 
            the platform empowers local enterprises to scale digitally while guaranteeing fair, timely payouts to certified trainees.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('explore')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsLedgerModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-emerald-300" />
              <span>Verify PSDM Credentials</span>
            </button>

            <a
              href="http://www.psdm.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5 ml-auto"
            >
              <span>PSDM Official Portal</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div>
        <div className="text-center sm:text-left mb-5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 font-mono">
            Platform Pillars
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mt-1">
            Built for Transparency, Security & Regional Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regional Punjab Clusters Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Statewide Industrial Clusters
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mt-1">
            Supporting Key Manufacturing & Tech Belts Across Punjab
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Certified talent is strategically deployed across regional focal points to accelerate technological independence for local enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clusters.map((c) => (
            <div 
              key={c.city}
              className="p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/70 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-zinc-900 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{c.city}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 border border-emerald-200/70">
                    {c.badge}
                  </span>
                </div>
                <div className="text-xs font-semibold text-zinc-800 mb-1">
                  {c.title}
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Governance & Verifiable Trust Strip */}
      <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 p-2 shadow-xs flex items-center justify-center shrink-0">
            <img 
              src="/techpunjab-logo.png" 
              alt="Govt of Punjab" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Department of Employment Generation, Skill Development & Training
            </h4>
            <p className="text-xs text-emerald-800/80 mt-0.5">
              Government of Punjab, Punjab Civil Secretariat-2, Sector 9, Chandigarh - 160009
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsEscrowModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-300 shadow-xs transition-colors"
          >
            Smart Escrow Protocol
          </button>
          <button
            type="button"
            onClick={() => setIsScoperModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
          >
            Post MSME Requirement
          </button>
        </div>
      </div>

    </div>
  );
};
