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
  LogIn, 
  UserPlus, 
  Check, 
  Eye, 
  EyeOff,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { INITIAL_FREELANCER, deriveNameFromEmail } from '@/data/mockData';
import { ThreeDBackground } from '@/components/ThreeDBackground';
import { supabase } from '@/lib/supabase';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, loginUser, signUpUser, showToast } = useApp();

  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [authRole, setAuthRole] = useState<'freelancer' | 'client'>('freelancer');
  
  // Sign in state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  // Common async UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Clear inputs when role switches so placeholders remain visible
  const handleRoleChange = (newRole: 'freelancer' | 'client') => {
    setAuthRole(newRole);
    setEmail('');
    setPassword('');
    setErrorMessage(null);
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      showToast('⚠️ Please enter your email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      showToast('⚠️ Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      // Trigger Supabase Auth signInWithPassword
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: password,
      });

      if (error) {
        setErrorMessage(error.message);
        showToast(`❌ Sign in failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data.user) {
        const metadataRole = data.user.user_metadata?.role as ('freelancer' | 'client') | undefined;
        const targetRole = metadataRole || authRole;
        const displayName = data.user.user_metadata?.full_name || deriveNameFromEmail(trimmedEmail);

        loginUser(targetRole, displayName, trimmedEmail);

        showToast(`🎉 Logged in successfully as ${displayName}!`);

        if (targetRole === 'freelancer') {
          router.push('/freelancer/dashboard');
        } else {
          router.push('/client/dashboard');
        }
      } else {
        setErrorMessage('Unable to retrieve user session. Please try again.');
        showToast('⚠️ Sign in incomplete.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during sign in.');
      showToast(`❌ Error: ${err.message || 'Sign in failed'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      showToast('⚠️ Password must be at least 6 characters.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password.');
      showToast('⚠️ Passwords do not match. Please verify your password.');
      return;
    }

    const registeredEmail = signupEmail.trim();
    if (!registeredEmail) {
      setErrorMessage('Please enter a valid email address.');
      showToast('⚠️ Please enter your email address.');
      return;
    }

    const displayName = name.trim() || deriveNameFromEmail(registeredEmail);
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registeredEmail,
        password: signupPassword,
        options: {
          data: {
            full_name: displayName,
            role: authRole,
            trade: authRole === 'freelancer' ? trade : undefined,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        showToast(`❌ Sign up failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data.user) {
        signUpUser(authRole, displayName, registeredEmail, trade);

        if (data.session) {
          showToast(`🎉 Account created! Welcome, ${displayName}!`);
        } else {
          showToast(`🎉 Account created! Unique ID: ${data.user.id.slice(0, 8)}...`);
        }

        if (authRole === 'freelancer') {
          router.push('/freelancer/dashboard');
        } else {
          router.push('/client/dashboard');
        }
      } else {
        setErrorMessage('Unable to register user. Please try again.');
        showToast('⚠️ Registration incomplete.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during sign up.');
      showToast(`❌ Error: ${err.message || 'Sign up failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between p-3 sm:p-6 lg:p-8 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden w-full">
      {/* Interactive 3D Canvas Background */}
      <ThreeDBackground />

      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between relative z-10 px-1">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 p-0.5 shadow-md shadow-zinc-200/50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/techpunjab-logo.png"
              alt="TechPunjab Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-base sm:text-lg text-zinc-900 group-hover:text-emerald-700 transition-colors">TechPunjab</span>
              <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-200 backdrop-blur-xs">
                Govt. of Punjab
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">Role-Based Smart Authentication Portal</p>
          </div>
        </Link>
      </div>

      {/* Main Login / Signup Card */}
      <div className="max-w-lg mx-auto w-full my-3 sm:my-6 relative z-10 px-0 sm:px-0">
        <div className="bento-card p-4 sm:p-8 border border-white/80 shadow-2xl rounded-2xl sm:rounded-[32px] bg-white/90 backdrop-blur-xl">
          
          <div className="text-center mb-4 sm:mb-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 border border-zinc-200/80 shadow-sm p-1 flex items-center justify-center mx-auto mb-2.5 sm:mb-3 backdrop-blur-xs">
              <img
                src="/techpunjab-logo.png"
                alt="TechPunjab Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
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
              Select Your Account Type:
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-zinc-400"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-9 pr-10 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-zinc-400"
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

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span className="leading-snug">{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In as {authRole === 'freelancer' ? 'Freelancer' : 'MSME Client'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
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

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account in Supabase...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Create {authRole === 'freelancer' ? 'Freelancer' : 'MSME Client'} Account & Continue</span>
                  </>
                )}
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
      <div className="max-w-5xl mx-auto w-full text-center text-xs text-zinc-500 font-medium relative z-10">
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