import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  User, 
  Building2, 
  Award, 
  CheckCircle2, 
  Zap,
  LogIn,
  UserPlus
} from 'lucide-react';

export const WelcomeModal: React.FC = () => {
  const router = useRouter();
  const { 
    isWelcomeModalOpen, 
    setIsWelcomeModalOpen, 
    setIsLoginModalOpen,
    currentUser,
    setRole, 
    loginUser,
    showToast 
  } = useApp();

  if (!isWelcomeModalOpen) return null;

  const handleSelectRole = (selectedRole: 'freelancer' | 'client') => {
    setIsWelcomeModalOpen(false);
    if (!currentUser) {
      // If not logged in, go to login with that role selected
      router.push(`/login?role=${selectedRole}`);
    } else {
      setRole(selectedRole);
      router.push(selectedRole === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-[32px] border border-zinc-200/90 shadow-2xl w-full max-w-xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsWelcomeModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors z-20"
          title="Close Welcome Window"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Header with Prominent Logo */}
        <div className="p-6 sm:p-8 text-center flex flex-col items-center">
          
          {/* Official TechPunjab Circular Emblem */}
          <div className="relative mb-3 group cursor-pointer" onClick={() => showToast('✨ TechPunjab • Govt. of Punjab Skill Mission')}>
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-emerald-600 via-indigo-600 to-emerald-500 shadow-xl shadow-emerald-200/50 animate-pulse-subtle flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1.5 overflow-hidden shadow-inner">
                <img
                  src="/techpunjab-logo.png"
                  alt="TechPunjab Government Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1.5 border-2 border-white shadow-md">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Govt. of Punjab Official Portal
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 mt-1">
            Welcome to <span className="bg-gradient-to-r from-emerald-600 via-indigo-600 to-emerald-700 bg-clip-text text-transparent">TechPunjab</span>
          </h2>

          <p className="text-xs font-semibold text-emerald-800 mt-1">
            Skilled Tech Workers. Better Punjab. Stronger Future.
          </p>

          <p className="text-xs text-zinc-500 mt-1.5 max-w-md">
            Punjab Skill Development Mission verified smart gig portal connecting certified trainees directly with MSME employers across Punjab.
          </p>

          {/* Key Feature Highlights Pill Strip */}
          <div className="grid grid-cols-3 gap-2 w-full mt-6 text-left">
            <div className="p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-1.5">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-bold text-zinc-900 leading-tight">UPI Escrow</div>
              <div className="text-[10px] text-zinc-500">100% Milestone Safety</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-bold text-zinc-900 leading-tight">PSDM Ledger</div>
              <div className="text-[10px] text-zinc-500">On-Chain SHA-256 Proof</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-bold text-zinc-900 leading-tight">AI Scoper</div>
              <div className="text-[10px] text-zinc-500">98% Semantic Match</div>
            </div>
          </div>

          {/* Quick Choice: Select Mode to Enter */}
          <div className="w-full mt-6 space-y-2.5">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider text-center">
              Choose your persona to get started:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleSelectRole('freelancer')}
                className="p-3.5 rounded-2xl border-2 border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-950 font-bold text-xs flex items-center justify-between group transition-all shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-zinc-900">PSDM Trainee</div>
                    <div className="text-[10px] text-indigo-700 font-normal">Explore Gigs & Bids</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleSelectRole('client')}
                className="p-3.5 rounded-2xl border-2 border-zinc-200 hover:border-zinc-900 bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs flex items-center justify-between group transition-all shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-zinc-900">MSME Employer</div>
                    <div className="text-[10px] text-zinc-500 font-normal">Post & Fund Projects</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Direct Sign In / Sign Up Options */}
          <div className="mt-5 pt-4 border-t border-zinc-100 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-zinc-500 font-medium">Already have an account or new here?</span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setIsWelcomeModalOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-zinc-600" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => {
                  setIsWelcomeModalOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-emerald-100" />
                <span>Sign Up</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
