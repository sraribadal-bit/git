'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Award, 
  HelpCircle, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ExternalLink, 
  CheckCircle2,
  Info
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    setActiveTab, 
    setIsEscrowModalOpen, 
    setIsScoperModalOpen, 
    setIsLedgerModalOpen,
    setIsLoginModalOpen
  } = useApp();

  const [isSeoOpen, setIsSeoOpen] = useState(false);

  return (
    <footer className="w-full mt-16 bg-white text-zinc-600 font-sans border-t border-zinc-200/80 shadow-2xs">
      
      {/* Top Expandable Strip (Government Initiative Banner) */}
      <div className="border-b border-zinc-200/80 bg-zinc-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-800 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>TechPunjab — Punjab’s Official Decentralized Gig & Skill Verification Mission</span>
          </div>
          <button
            type="button"
            onClick={() => setIsSeoOpen(!isSeoOpen)}
            className="flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-emerald-700 transition-colors py-1 px-2.5 rounded-lg hover:bg-zinc-200/60"
          >
            <span className="hidden sm:inline">{isSeoOpen ? 'Show Less' : 'Know More'}</span>
            {isSeoOpen ? <ChevronUp className="w-3.5 h-3.5 text-emerald-600" /> : <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />}
          </button>
        </div>

        {/* Expandable Project Details (Mission Details) */}
        {isSeoOpen && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2 text-xs text-zinc-600 space-y-3 animate-in fade-in duration-300">
            <p className="leading-relaxed">
              <strong className="text-zinc-900">TechPunjab</strong> is a pioneering initiative supported by the Government of Punjab and the Punjab Skill Development Mission (PSDM). 
              The platform connects state-certified tech trainees with MSMEs across Ludhiana, Jalandhar, Amritsar, Mohali, and Patiala. 
              By introducing cryptographic skill passports and automated UPI-based escrow contracts, TechPunjab eliminates payment uncertainty for freelancers and hiring risk for local small & medium enterprises.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
              <div className="p-3.5 bg-white rounded-xl border border-zinc-200/80 shadow-xs">
                <span className="text-zinc-900 font-bold block mb-1">🔐 Automated UPI Escrow</span>
                <span className="text-zinc-500">Funds remain securely locked until MSMEs approve concrete project milestones.</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-zinc-200/80 shadow-xs">
                <span className="text-zinc-900 font-bold block mb-1">📜 PSDM Verified Skill Ledger</span>
                <span className="text-zinc-500">On-chain immutable proof of training course, test score, and government certification.</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-zinc-200/80 shadow-xs">
                <span className="text-zinc-900 font-bold block mb-1">🤖 AI Scope & Milestone Engine</span>
                <span className="text-zinc-500">Instant conversion of unorganized business needs into clear deliverables.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Multi-Column Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-[11px] leading-6">
          
          {/* Column 1: ABOUT */}
          <div>
            <h3 className="text-zinc-900 uppercase tracking-wider font-extrabold text-[11px] mb-3">
              ABOUT
            </h3>
            <ul className="space-y-1.5 font-medium">
              <li>
                <button 
                  type="button"
                  onClick={() => setActiveTab('about')}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left font-medium"
                >
                  About TechPunjab
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setIsLedgerModalOpen(true)}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left font-medium"
                >
                  PSDM Certification
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActiveTab('explore')}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left font-medium"
                >
                  Trainee Careers
                </button>
              </li>
              <li>
                <a 
                  href="http://www.psdm.gov.in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-zinc-500 hover:text-emerald-700 transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>Govt. of Punjab Portal</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('about')}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left font-medium"
                >
                  Success Stories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('about')}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left font-medium"
                >
                  Press & Media Releases
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: ECOSYSTEM */}
          <div>
            <h3 className="text-zinc-900 uppercase tracking-wider font-extrabold text-[11px] mb-3">
              ECOSYSTEM
            </h3>
            <ul className="space-y-1.5 font-medium text-zinc-500">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('about')}
                  className="hover:text-emerald-700 transition-colors text-left"
                >
                  PSDM Training Centers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('explore')}
                  className="hover:text-emerald-700 transition-colors text-left"
                >
                  Punjab MSME Directory
                </button>
              </li>
              <li>
                <a 
                  href="https://investpunjab.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                >
                  <span>Invest Punjab</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://startuppunjab.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                >
                  <span>Startup Punjab</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <a 
                  href="http://www.psdm.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                >
                  <span>Skill Punjab Portal</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <span className="hover:text-emerald-700 transition-colors cursor-pointer">
                  District Bureau of Employment
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: HELP & SUPPORT */}
          <div>
            <h3 className="text-zinc-900 uppercase tracking-wider font-extrabold text-[11px] mb-3">
              HELP
            </h3>
            <ul className="space-y-1.5 font-medium">
              <li>
                <button 
                  type="button"
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left"
                >
                  UPI Payments & Escrow
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setIsScoperModalOpen(true)}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left"
                >
                  AI Project Scoping
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActiveTab('workspace')}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left"
                >
                  Milestone Workspace
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left"
                >
                  Dispute Resolution
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left"
                >
                  Grievance Redressal
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActiveTab('about')}
                  className="text-zinc-500 hover:text-emerald-700 transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: POLICY */}
          <div>
            <h3 className="text-zinc-900 uppercase tracking-wider font-extrabold text-[11px] mb-3">
              POLICY
            </h3>
            <ul className="space-y-1.5 font-medium text-zinc-500">
              <li>
                <button 
                  type="button"
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="hover:text-emerald-700 transition-colors text-left"
                >
                  Escrow Refund & Revision
                </button>
              </li>
              <li>
                <span className="hover:text-emerald-700 transition-colors cursor-pointer">
                  Terms of Use
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-700 transition-colors cursor-pointer">
                  Security & Fraud Protection
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-700 transition-colors cursor-pointer">
                  MSME Data Privacy
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-700 transition-colors cursor-pointer">
                  Trainee Protection Norms
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-700 transition-colors cursor-pointer">
                  Cyber Compliance (CERT-In)
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: MAIL US (With Divider) */}
          <div className="border-t lg:border-t-0 lg:border-l border-zinc-200/80 pt-6 lg:pt-0 lg:pl-6 col-span-2 sm:col-span-1">
            <h3 className="text-zinc-900 uppercase tracking-wider font-extrabold text-[11px] mb-3">
              Mail Us:
            </h3>
            <address className="not-italic text-zinc-500 space-y-1 text-[11px]">
              <p className="font-bold text-zinc-800">Punjab Skill Development Mission</p>
              <p>SCO No. 149-152, 2nd Floor,</p>
              <p>Sector 17-C, Chandigarh,</p>
              <p>Punjab - 160017, India</p>
              <p className="pt-2 text-emerald-700 font-mono font-semibold text-[10px]">support@psdm.punjab.gov.in</p>
            </address>

            {/* Social Icons */}
            <div className="pt-4">
              <span className="text-zinc-400 uppercase tracking-wider font-bold text-[10px] block mb-2">
                Social:
              </span>
              <div className="flex items-center gap-3 text-zinc-400">
                {/* Facebook */}
                <a href="#" className="hover:text-emerald-600 transition-colors" title="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                </a>
                {/* X / Twitter */}
                <a href="#" className="hover:text-emerald-600 transition-colors" title="Twitter / X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* YouTube */}
                <a href="#" className="hover:text-emerald-600 transition-colors" title="YouTube">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                {/* Instagram */}
                <a href="#" className="hover:text-emerald-600 transition-colors" title="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 6: REGISTERED OFFICE */}
          <div className="border-t lg:border-t-0 lg:border-l border-zinc-200/80 pt-6 lg:pt-0 lg:pl-6 col-span-2 sm:col-span-1">
            <h3 className="text-zinc-900 uppercase tracking-wider font-extrabold text-[11px] mb-3">
              Registered Office:
            </h3>
            <address className="not-italic text-zinc-500 space-y-1 text-[11px]">
              <p className="font-bold text-zinc-800">Dept. of Employment Generation,</p>
              <p>Skill Development & Training,</p>
              <p>Government of Punjab,</p>
              <p>Punjab Civil Secretariat-2, Sector 9,</p>
              <p>Chandigarh, Punjab 160009</p>
              <p className="pt-2 text-zinc-400 font-mono text-[10px]">Portal ID: PB-PSDM-2026-SIH</p>
              <p className="text-emerald-700 font-bold pt-1">
                Toll-Free: <span className="font-mono">1800-180-2345</span>
              </p>
            </address>
          </div>

        </div>
      </div>

      {/* Bottom Bar (Quick Actions, Copyright & Secure Banking) */}
      <div className="border-t border-zinc-200/80 bg-zinc-50/90 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-zinc-600 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setIsScoperModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-amber-600 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-500" />
              <span>Hire a Trainee / Post Gig</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLedgerModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verify PSDM Ledger</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEscrowModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>UPI Escrow Vault</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-sky-600 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Help Center</span>
            </button>
          </div>

          {/* Copyright Text */}
          <div className="text-zinc-500 text-[11px] font-medium text-center">
            © 2024-2026 TechPunjab • Punjab Skill Development Mission (Govt. of Punjab)
          </div>

          {/* Payment & Govt Trust Logos */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">Secure Banking:</span>
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-zinc-200/80 shadow-2xs">
              <span className="text-[10px] font-bold text-emerald-600 font-mono tracking-tighter">UPI</span>
              <span className="text-zinc-300">•</span>
              <span className="text-[10px] font-bold text-blue-600 font-mono tracking-tighter">RuPay</span>
              <span className="text-zinc-300">•</span>
              <span className="text-[10px] font-bold text-amber-600 font-mono tracking-tighter">NPCI</span>
              <span className="text-zinc-300">•</span>
              <span className="text-[10px] font-bold text-indigo-600 font-mono tracking-tighter">NetBanking</span>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};
