'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Menu, 
  User, 
  Building2, 
  Lock, 
  Pencil, 
  LogOut, 
  Bell, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    role, 
    activeTab, 
    currentUser, 
    freelancer, 
    escrowAmount, 
    setIsProfileModalOpen, 
    setIsEscrowModalOpen,
    logoutUser 
  } = useApp();

  const displayName = (currentUser?.name && currentUser.name !== 'Gurpreet Singh')
    ? currentUser.name
    : (freelancer?.name && freelancer.name !== 'Gurpreet Singh' ? freelancer.name : 'Badal Srari');
  const displayAvatar = currentUser?.avatar || freelancer?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Dashboard', subtitle: 'Overview & Key Metrics' },
    explore: { title: 'Explore Gigs', subtitle: 'Punjab Industry Projects' },
    workspace: { title: 'Workspace', subtitle: 'Active Contracts & Kanban' },
    escrow: { title: 'Smart Escrow', subtitle: 'UPI Milestone Vault' },
    ledger: { title: 'PSDM Ledger', subtitle: 'Verified Credentials' },
    about: { title: 'About TechPunjab', subtitle: 'Mission & Framework' },
  };

  const currentTabInfo = tabTitles[activeTab] || tabTitles.dashboard;

  return (
    <header className="shrink-0 z-20 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-6 lg:px-8 py-3 shadow-2xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Mobile Menu Toggle & Tab Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 transition-colors"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-zinc-900 tracking-tight capitalize">
                {currentTabInfo.title}
              </h1>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                TechPunjab
              </span>
            </div>
            <p className="hidden xs:block text-xs text-zinc-500 font-medium truncate">
              {currentTabInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Escrow Indicator, Role Badge, Profile & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Escrow Quick Pill */}
          <button
            type="button"
            onClick={() => setIsEscrowModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-indigo-50/60 border border-zinc-200 shadow-xs text-xs font-semibold text-zinc-700 hover:text-indigo-600 transition-all cursor-pointer"
            title="View Smart Escrow Status"
          >
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[11px] font-mono font-bold text-zinc-900">
              ₹{(role === 'freelancer' ? freelancer.totalEarnings : escrowAmount).toLocaleString('en-IN')}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          {/* Role Status Badge */}
          <div 
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
              role === 'freelancer'
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
            title={`Role: ${role === 'freelancer' ? 'PSDM Freelancer' : 'MSME Client'}`}
          >
            {role === 'freelancer' ? (
              <>
                <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Freelancer</span>
              </>
            ) : (
              <>
                <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>MSME</span>
              </>
            )}
          </div>

          {/* Badal / Profile Pill */}
          <button
            type="button"
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 p-1 pr-2.5 rounded-full bg-white hover:bg-indigo-50/50 border border-zinc-200 hover:border-indigo-300 shadow-xs transition-all cursor-pointer group"
            title={`Logged in as ${displayName} • Edit Profile`}
          >
            <div className="relative">
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-zinc-200 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <Pencil className="w-1.5 h-1.5" />
              </div>
            </div>
            <span className="text-xs font-bold text-zinc-800 group-hover:text-indigo-600 transition-colors">
              {displayName.split(' ')[0]}
            </span>
            <Pencil className="w-3 h-3 text-zinc-400 group-hover:text-indigo-600 transition-colors hidden sm:inline" />
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => {
              logoutUser();
              window.location.href = '/login';
            }}
            className="p-1.5 sm:p-2 rounded-full bg-zinc-100 hover:bg-rose-50 text-zinc-500 hover:text-rose-600 border border-zinc-200 hover:border-rose-200 transition-colors shrink-0"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
