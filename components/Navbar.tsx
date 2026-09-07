'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Briefcase, 
  Layers, 
  Search, 
  Award, 
  ArrowRight,
  User,
  Building2,
  LogIn,
  LogOut,
  Pencil
} from 'lucide-react';
import { EditProfileModal } from '@/components/EditProfileModal';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    setIsScoperModalOpen,
    setIsEscrowModalOpen,
    setIsLedgerModalOpen,
    setIsWelcomeModalOpen,
    setIsLoginModalOpen,
    setIsProfileModalOpen,
    currentUser,
    logoutUser,
    escrowAmount
  } = useApp();

  return (
    <header className="sticky top-2 sm:top-4 z-40 px-2 sm:px-4 lg:px-6 max-w-7xl mx-auto w-full transition-all">
      <nav className="glass-pill rounded-full pl-2.5 sm:pl-4 pr-2 sm:pr-4 py-1.5 sm:py-2 shadow-bento flex items-center justify-between border border-zinc-200/80 gap-1 sm:gap-3 w-full">
        
        {/* Brand Logo & Tag (Clicking pops up welcome window) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-1.5 sm:gap-2 group text-left"
            title="Go to TechPunjab Dashboard"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-white border border-zinc-200/80 p-0.5 shadow-md shadow-zinc-200/60 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/techpunjab-logo.png"
                alt="TechPunjab Logo"
                className="w-full h-full object-contain rounded-lg sm:rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors">TechPunjab</span>
                <span className="hidden xl:inline-flex text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 items-center gap-1 whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Govt. of Punjab
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Pill Links */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-zinc-100/90 p-1 rounded-full border border-zinc-200/70 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2 xl:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'dashboard' 
                ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60 font-bold' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-2 xl:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'explore' 
                ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60 font-bold' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-2 xl:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'workspace' 
                ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60 font-bold' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Workspace</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('escrow');
              setIsEscrowModalOpen(true);
            }}
            className={`px-2 xl:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'escrow' 
                ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60 font-bold' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Escrow</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping shrink-0"></span>
          </button>

          {role === 'client' && (
            <button
              onClick={() => {
                setActiveTab('ledger');
                setIsLedgerModalOpen(true);
              }}
              className={`px-2 xl:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'ledger' 
                  ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60 font-bold' 
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>PSDM Ledger</span>
            </button>
          )}
        </div>

        {/* Right Actions: Role Badge, User Profile & Logout */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {currentUser ? (
            <>
              {/* Active Role Status Badge (Read-only, assigned at login/signup) */}
              <div 
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shrink-0 border ${
                  role === 'freelancer'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
                title={`Active Role: ${role === 'freelancer' ? 'PSDM Certified Freelancer' : 'Verified MSME Client'}`}
              >
                {role === 'freelancer' ? (
                  <>
                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600 shrink-0" />
                    <span className="hidden xs:inline sm:inline">Freelancer</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700 shrink-0" />
                    <span className="hidden xs:inline sm:inline">MSME</span>
                  </>
                )}
              </div>

              {/* User Profile Pill (Clickable to Edit Custom Profile) */}
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-1 sm:gap-1.5 p-0.5 sm:p-1 pr-1.5 sm:pr-2.5 rounded-full bg-white hover:bg-indigo-50/50 border border-zinc-200/90 hover:border-indigo-300 shadow-xs shrink-0 transition-all group cursor-pointer"
                title={`Logged in as ${currentUser.name} (${currentUser.email}) • Click to Edit Profile`}
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border border-zinc-200 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-indigo-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="w-1.5 h-1.5" />
                  </div>
                </div>
                <span className="hidden sm:inline text-[11px] font-bold text-zinc-800 group-hover:text-indigo-600 transition-colors">
                  {currentUser.name.split(' ')[0]}
                </span>
                <Pencil className="w-3 h-3 text-zinc-400 group-hover:text-indigo-600 transition-colors ml-0.5 hidden sm:inline" />
              </button>

              {/* Logout Button */}
              <button
                onClick={() => {
                  logoutUser();
                  window.location.href = '/login';
                }}
                className="p-1.5 sm:p-2 rounded-full bg-zinc-100 hover:bg-rose-50 text-zinc-500 hover:text-rose-600 border border-zinc-200 hover:border-rose-200 transition-colors shrink-0"
                title="Log Out of TechPunjab"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-600" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/signup"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <span>Sign Up</span>
              </Link>
            </div>
          )}

        </div>

      </nav>

      {/* Mobile Floating Bottom Bar for Tab Navigation */}
      {currentUser && (
        <div className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-sm mx-auto">
          <div className="glass-pill rounded-full p-1 shadow-2xl border border-zinc-200/90 flex items-center justify-around bg-white/95 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[10px] font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[10px] font-bold transition-all ${
                activeTab === 'explore'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </button>
            <button
              onClick={() => setActiveTab('workspace')}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[10px] font-bold transition-all ${
                activeTab === 'workspace'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Workspace</span>
            </button>
            <button
              onClick={() => setIsEscrowModalOpen(true)}
              className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[10px] font-bold text-zinc-500 hover:text-zinc-900 transition-all"
            >
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Escrow</span>
            </button>
          </div>
        </div>
      )}

      {/* Global Edit Profile Modal */}
      <EditProfileModal />
    </header>
  );
};

