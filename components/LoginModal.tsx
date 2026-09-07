'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { RoleSelector } from '@/components/RoleSelector';
import { 
  X, 
  ShieldCheck, 
  User, 
  Building2, 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  UserPlus,
  LogIn,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { INITIAL_FREELANCER } from '@/data/mockData';

export const LoginModal: React.FC = () => {
  const router = useRouter();
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginUser, 
    signUpUser,
    showToast 
  } = useApp();

  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [authRole, setAuthRole] = useState<'freelancer' | 'client'>('freelancer');
  
  // Sign In state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpTrade, setSignUpTrade] = useState('Full Stack & Generative AI');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleQuickLogin = (role: 'freelancer' | 'client') => {
    if (role === 'freelancer') {
      loginUser('freelancer', INITIAL_FREELANCER.name, 'gurpreet.dev@psdm.in');
      setIsLoginModalOpen(false);
      router.push('/freelancer/dashboard');
    } else {
      loginUser('client', 'Harjit Chawla', 'harjit@amritsarafro.com');
      setIsLoginModalOpen(false);
      router.push('/client/dashboard');
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'freelancer') {
      loginUser('freelancer', 'Gurpreet Singh', email || 'gurpreet.dev@psdm.in');
      setIsLoginModalOpen(false);
      router.push('/freelancer/dashboard');
    } else {
      loginUser('client', 'Harjit Chawla', email || 'harjit@amritsarafro.com');
      setIsLoginModalOpen(false);
      router.push('/client/dashboard');
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== signUpConfirmPassword) {
      showToast('⚠️ Passwords do not match. Please verify your password.');
      return;
    }
    const displayName = signUpName.trim() || (authRole === 'freelancer' ? 'New Trainee' : 'New MSME Employer');
    signUpUser(authRole, displayName, signUpEmail || (authRole === 'freelancer' ? 'candidate@techpunjab.in' : 'client@techpunjab.in'), signUpTrade);
    setIsLoginModalOpen(false);
    router.push(authRole === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard');
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    showToast('📲 Demo OTP sent: 8942');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-[32px] border border-zinc-200/90 shadow-2xl w-full max-w-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Banner with TechPunjab Logo */}
        <div className="p-6 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 p-0.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/techpunjab-logo.png"
                alt="TechPunjab Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-zinc-900">
                  {authType === 'signin' ? 'TechPunjab Sign In' : 'Join TechPunjab (Sign Up)'}
                </h3>
                <span className="text-[10px] uppercase font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Govt. of Punjab SSO
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                {authType === 'signin' 
                  ? 'Access certified vocational gigs & MSME smart escrow' 
                  : 'Register as certified candidate or verified MSME enterprise'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Main Mode Toggle: Sign In vs Sign Up */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-2xl border border-zinc-200/90">
            <button
              type="button"
              onClick={() => setAuthType('signin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authType === 'signin'
                  ? 'bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthType('signup')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authType === 'signup'
                  ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Persona Role Selector */}
          <div className="pt-1">
            <RoleSelector
              selectedRole={authRole}
              onChange={(newRole) => {
                setAuthRole(newRole);
                if (newRole === 'freelancer') {
                  setEmail('gurpreet.dev@psdm.in');
                } else {
                  setEmail('harjit@amritsarafro.com');
                }
              }}
              showDescription={true}
            />
          </div>


          {/* SIGN IN VIEW */}
          {authType === 'signin' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-3">
                {authRole === 'freelancer' ? (
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 block mb-1">
                      PSDM Certificate / Candidate Roll Number
                    </label>
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={candidateId}
                        onChange={(e) => setCandidateId(e.target.value)}
                        placeholder="PB-PSDM-2024-AI-XXXXX"
                        className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 block mb-1">
                      Enterprise GSTIN / Udyam Reg. Number
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="UDYAM-PB-02-009182"
                        className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-zinc-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setIsOtpMode(!isOtpMode)}
                      className="text-[11px] text-emerald-700 hover:underline"
                    >
                      {isOtpMode ? 'Use Password' : 'Use Phone OTP'}
                    </button>
                  </div>

                  {!isOtpMode ? (
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-9 pr-10 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="Enter 4-digit OTP (8942)"
                        className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold shrink-0"
                      >
                        {otpSent ? 'Resend' : 'Send OTP'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SIGN UP VIEW */}
          {authType === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Full Name / Enterprise Name
                </label>
                <input
                  type="text"
                  required
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder={authRole === 'freelancer' ? 'e.g., Simranjit Kaur' : 'e.g., Punjab Auto Works Pvt Ltd'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Email or Mobile Number
                </label>
                <input
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="name@punjab.gov.in or email@domain.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {authRole === 'freelancer' && (
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    Vocational Trade / NSQF Skill
                  </label>
                  <input
                    type="text"
                    value={signUpTrade}
                    onChange={(e) => setSignUpTrade(e.target.value)}
                    placeholder="Full Stack, IoT, CAD, AI Builder"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Create Account Password
                </label>
                <div className="relative">
                  <input
                    type={showSignUpPassword ? 'text' : 'password'}
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-3 pr-10 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute right-3 top-2 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                    title={showSignUpPassword ? "Hide password" : "Show password"}
                  >
                    {showSignUpPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showSignUpConfirmPassword ? 'text' : 'password'}
                    required
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className={`w-full pl-3 pr-10 py-2 text-xs font-mono rounded-xl border ${
                      signUpConfirmPassword && signUpPassword !== signUpConfirmPassword
                        ? 'border-red-300 focus:ring-red-400'
                        : 'border-zinc-200 focus:ring-emerald-500'
                    } focus:outline-none focus:ring-2`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                    className="absolute right-3 top-2 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                    title={showSignUpConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showSignUpConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {signUpConfirmPassword && signUpPassword !== signUpConfirmPassword && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">Passwords do not match</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Create TechPunjab Account & Sign In</span>
                </button>
              </div>
            </form>
          )}

          {/* Bottom Switch between Sign In and Sign Up */}
          <div className="pt-2 text-center text-xs text-zinc-500">
            {authType === 'signin' ? (
              <p>
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthType('signup')}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Sign Up now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthType('signin')}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Sign In here
                </button>
              </p>
            )}
          </div>

        </div>

        {/* Footer Note */}
        <div className="p-3.5 bg-zinc-50 border-t border-zinc-100 text-center text-[11px] text-zinc-500">
          Govt. of Punjab • Punjab Skill Development Mission (PSDM) SSO
        </div>

      </div>
    </div>
  );
};
