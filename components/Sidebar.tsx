'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { 
  Layers, 
  Search, 
  Briefcase, 
  Lock, 
  Award, 
  User, 
  Building2, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  Zap,
  PlusCircle,
  Info
} from 'lucide-react';
import { EditProfileModal } from '@/components/EditProfileModal';

interface SidebarProps {
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isMobileOpen: controlledMobileOpen, 
  setIsMobileOpen: setControlledMobileOpen 
}) => {
  const { 
    role, 
    activeTab, 
    setActiveTab, 
    setIsEscrowModalOpen,
    setIsLedgerModalOpen,
    setIsScoperModalOpen,
    freelancer,
    escrowAmount,
    gigs,
    kanbanTasks,
    ledger
  } = useApp();

  // Desktop collapsible state
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  // Internal mobile state if not externally controlled
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = useState<boolean>(false);

  const isMobileOpen = controlledMobileOpen !== undefined ? controlledMobileOpen : uncontrolledMobileOpen;
  const setIsMobileOpen = setControlledMobileOpen !== undefined ? setControlledMobileOpen : setUncontrolledMobileOpen;

  // Persist collapsed state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techpunjab_sidebar_collapsed');
      if (saved !== null) {
        setIsCollapsed(saved === 'true');
      }
    }
  }, []);

  const toggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('techpunjab_sidebar_collapsed', String(nextState));
    }
  };

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: Layers,
      iconColor: 'text-indigo-600',
      badge: null,
      onClick: () => {
        setActiveTab('dashboard');
        setIsMobileOpen(false);
      }
    },
    {
      id: 'explore' as const,
      label: 'Explore',
      icon: Search,
      iconColor: 'text-pink-600',
      badge: gigs?.length ? `${gigs.length}` : null,
      onClick: () => {
        setActiveTab('explore');
        setIsMobileOpen(false);
      }
    },
    {
      id: 'workspace' as const,
      label: 'Workspace',
      icon: Briefcase,
      iconColor: 'text-amber-600',
      badge: kanbanTasks?.length ? `${kanbanTasks.length}` : null,
      onClick: () => {
        setActiveTab('workspace');
        setIsMobileOpen(false);
      }
    },
    {
      id: 'escrow' as const,
      label: 'Escrow',
      icon: Lock,
      iconColor: 'text-indigo-600',
      badge: 'Live',
      badgePulse: true,
      onClick: () => {
        setActiveTab('escrow');
        setIsMobileOpen(false);
      }
    },
    {
      id: 'ledger' as const,
      label: 'PSDM Ledger',
      icon: Award,
      iconColor: 'text-emerald-600',
      badge: ledger?.length ? `${ledger.length}` : null,
      onClick: () => {
        setActiveTab('ledger');
        setIsLedgerModalOpen(true);
        setIsMobileOpen(false);
      }
    },
    {
      id: 'about' as const,
      label: 'About',
      icon: Info,
      iconColor: 'text-teal-600',
      badge: 'Govt',
      onClick: () => {
        setActiveTab('about');
        setIsMobileOpen(false);
      }
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between select-none overflow-y-auto overflow-x-hidden">
      {/* Top Header / Branding */}
      <div>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-zinc-200/80`}>
          <Link 
            href={role === 'client' ? '/client/dashboard' : '/freelancer/dashboard'}
            onClick={() => {
              setActiveTab('dashboard');
              setIsMobileOpen(false);
            }}
            className="flex items-center gap-2.5 group"
            title="TechPunjab Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200/80 p-1 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/techpunjab-logo.png"
                alt="TechPunjab Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            
            {!isCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-tight text-zinc-900 group-hover:text-indigo-600 transition-colors">
                    TechPunjab
                  </span>
                  <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center gap-1 shrink-0">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    Govt.
                  </span>
                </div>
                <span className="text-[10px] font-medium text-zinc-400">
                  PSDM Smart Portal
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 border border-transparent hover:border-zinc-200 transition-all shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 rounded-xl hover:bg-zinc-100 text-zinc-500 border border-zinc-200"
            title="Close Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Status Badge Pill */}
        <div className={`p-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div 
            className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all ${
              role === 'freelancer'
                ? 'bg-indigo-50/80 border-indigo-200/80 text-indigo-800'
                : 'bg-emerald-50/80 border-emerald-200/80 text-emerald-800'
            } ${isCollapsed ? 'justify-center p-2 w-10 h-10' : 'w-full'}`}
            title={`Active Role: ${role === 'freelancer' ? 'PSDM Certified Freelancer' : 'Verified MSME Client'}`}
          >
            {role === 'freelancer' ? (
              <User className="w-4 h-4 text-indigo-600 shrink-0" />
            ) : (
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}

            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="truncate">
                  <div className="text-[11px] font-extrabold uppercase tracking-wide truncate">
                    {role === 'freelancer' ? 'Freelancer' : 'MSME Client'}
                  </div>
                  <div className="text-[9px] text-zinc-500 font-medium truncate">
                    {role === 'freelancer' ? 'PSDM Certified' : 'Verified Enterprise'}
                  </div>
                </div>
                <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${role === 'freelancer' ? 'text-indigo-500' : 'text-emerald-500'}`} />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="px-3 py-1 space-y-1">
          {!isCollapsed && (
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Navigation
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all relative group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/60 font-bold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/90'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                title={item.label}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : item.iconColor
                }`} />

                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {/* Badges */}
                {!isCollapsed && item.badge && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                  }`}>
                    {item.badgePulse && (
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-indigo-500'} animate-ping`}></span>
                    )}
                    {item.badge}
                  </span>
                )}

                {/* Collapsed Active Dot Indicator */}
                {isCollapsed && isActive && (
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Widgets & Mini Status Card */}
        {!isCollapsed && (
          <div className="px-3 mt-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-zinc-50 to-indigo-50/40 border border-zinc-200/80 shadow-xs">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-bold text-zinc-600">Smart Escrow</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active
                </span>
              </div>
              
              <div className="text-base font-extrabold text-zinc-900 font-mono tracking-tight">
                ₹{(role === 'freelancer' ? freelancer.totalEarnings : escrowAmount).toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-zinc-500 mb-2.5">
                {role === 'freelancer' ? 'Total Escrow Earned' : 'Locked Project Escrow'}
              </div>

              {role === 'freelancer' ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsEscrowModalOpen(true);
                    setIsMobileOpen(false);
                  }}
                  className="w-full py-1.5 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Simulate Escrow</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsScoperModalOpen(true);
                    setIsMobileOpen(false);
                  }}
                  className="w-full py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>Post New Project</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside 
        className={`hidden md:block h-screen bg-white/95 backdrop-blur-xl border-r border-zinc-200/80 shadow-xs z-30 transition-all duration-300 shrink-0 select-none overflow-hidden ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-in Drawer */}
      <div 
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-zinc-200 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>

      {/* Global Edit Profile Modal */}
      <EditProfileModal />
    </>
  );
};
