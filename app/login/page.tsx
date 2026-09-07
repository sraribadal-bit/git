'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { RoleSelector } from '@/components/RoleSelector';
import { 
  Mail, 
  KeyRound, 
  ArrowRight, 
  ArrowLeft,
  LogIn,
  UserPlus,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { INITIAL_FREELANCER } from '@/data/mockData';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, loginUser, signUpUser, showToast } = useApp();

  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [authRole, setAuthRole] = useState<'freelancer' | 'client'>('freelancer');
  
  // Sign in state
  const [email, setEmail] = useState('gurpreet.dev@psdm.in');
  const [password, setPassword] = useState('techpunjab@2024');
  const [candidateId, setCandidateId] = useState('PB-PSDM-2024-AI-89421');
  const [showPassword, setShowPassword] = useState(false);

  // Sign up state
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('Full Stack Web & Generative AI');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  // Sync email default placeholder when role switches
  const handleRoleChange = (newRole: 'freelancer' | 'client') => {
    setAuthRole(newRole);
    if (authType === 'signin') {
      if (newRole === 'freelancer') {
        setEmail('gurpreet.dev@psdm.in');
        setCandidateId('PB-PSDM-2024-AI-89421');
      } else {
        setEmail('harjit@amritsarafro.com');
      }
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUserStr = localStorage.getItem('techpunjab_user');
      const savedRole = localStorage.getItem('techpunjab_role');
      if (savedUserStr || currentUser) {
        const activeRole = currentUser?.role || savedRole;
        if (activeRole === 'freelancer') {
          router.replace('/freelancer/dashboard');
        } else if (activeRole === 'client') {
          router.replace('/client/dashboard');
        }
      }
    }
  }, [currentUser, router]);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'freelancer') {
      loginUser('freelancer', INITIAL_FREELANCER.name, email);
      router.push('/freelancer/dashboard');
    } else {
      loginUser('client', 'Harjit Chawla', email);
      router.push('/client/dashboard');
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      showToast('⚠️ Passwords do not match. Please verify your password.');
      return;
    }
    const displayName = name.trim() || (authRole === 'freelancer' ? 'Simranjit Kaur' : 'Punjab Agro Works Pvt Ltd');
    const registeredEmail = signupEmail.trim() || (authRole === 'freelancer' ? 'candidate@techpunjab.in' : 'contact@punjabagro.com');
    
    signUpUser(authRole, displayName, registeredEmail, trade);

    if (authRole === 'freelancer') {
      router.push('/freelancer/dashboard');
    } else {
      router.push('/client/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 p-0.5 shadow-md shadow-zinc-200/50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/techpunjab-logo.png"
              alt="TechPunjab Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-zinc-900 group-hover:text-emerald-700 transition-colors">TechPunjab</span>
              <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Govt. of Punjab
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium">Role-Based Smart Authentication Portal</p>
          </div>
        </Link>

        <Link
          href="/"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </div>

      {/* Main Login / Signup Card */}
      <div className="max-w-lg mx-auto w-full my-6">
        <div className="bento-card p-6 sm:p-8 border border-zinc-200/90 shadow-bento rounded-[32px] bg-white">
          
          <div className="text-center mb-5">
            <div className="w-14 h-14 rounded-full bg-white border border-zinc-200 shadow-sm p-1 flex items-center justify-center mx-auto mb-3">
              <img
                src="/techpunjab-logo.png"
                alt="TechPunjab Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              {authType === 'signin' ? 'Sign In to TechPunjab' : 'Join TechPunjab (Sign Up)'}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Select your role below to access your dedicated dashboard
            </p>
          </div>

          {/* Mode Switch: Sign In vs Sign Up */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-2xl border border-zinc-200 mb-5">
            <button
              type="button"
              onClick={() => setAuthType('signin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authType === 'signin'
                  ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600'
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

          {/* Role Selection UI */}
          <div className="mb-5">
            <label className="text-xs font-bold text-zinc-800 block text-center mb-2">
              Select Your Account Type / Persona:
            </label>
            <RoleSelector
              selectedRole={authRole}
              onChange={handleRoleChange}
              showDescription={true}
            />
          </div>

          {/* SIGN IN FORM */}
          {authType === 'signin' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <form onSubmit={handleSignInSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    {authRole === 'freelancer' ? 'Freelancer Email Address' : 'Enterprise / Client Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={authRole === 'freelancer' ? 'e.g., gurpreet.dev@psdm.in' : 'e.g., harjit@amritsarafro.com'}
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
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
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  <span>Sign In as {authRole === 'freelancer' ? 'Freelancer' : 'MSME Client'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* SIGN UP FORM */}
          {authType === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  {authRole === 'freelancer' ? 'Full Candidate Name' : 'MSME Enterprise Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={authRole === 'freelancer' ? 'e.g., Simranjit Kaur' : 'e.g., Punjab Agro Machinery Pvt Ltd'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {authRole === 'freelancer' && (
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    NSQF Certified Specialization / Skill
                  </label>
                  <input
                    type="text"
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    placeholder="Full Stack Web, IoT, CAD, AI Builder"
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
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-3 pr-10 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-2 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                    title={showSignupPassword ? "Hide password" : "Show password"}
                  >
                    {showSignupPassword ? (
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
                    type={showSignupConfirmPassword ? 'text' : 'password'}
                    required
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className={`w-full pl-3 pr-10 py-2 text-xs font-mono rounded-xl border ${
                      signupConfirmPassword && signupPassword !== signupConfirmPassword
                        ? 'border-red-300 focus:ring-red-400'
                        : 'border-zinc-200 focus:ring-emerald-500'
                    } focus:outline-none focus:ring-2`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                    className="absolute right-3 top-2 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                    title={showSignupConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showSignupConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {signupConfirmPassword && signupPassword !== signupConfirmPassword && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Create {authRole === 'freelancer' ? 'Freelancer' : 'MSME Client'} Account & Continue</span>
              </button>
            </form>
          )}

          {/* Bottom Switch link */}
          <div className="pt-4 text-center text-xs text-zinc-500 border-t border-zinc-100 mt-4">
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
                Already have an account?{' '}
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
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-xs text-zinc-400">
        Govt. of Punjab • Punjab Skill Development Mission • TechPunjab Official Portal
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500 font-medium text-sm">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}