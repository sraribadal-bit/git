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
  AlertCircle,
  Smartphone,
  Phone,
  RotateCw,
  ShieldCheck,
  X,
  GraduationCap,
  Building2
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
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [candidateId, setCandidateId] = useState('PB-PSDM-2024-AI-89421');
  const [showPassword, setShowPassword] = useState(false);

  // Mobile OTP state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);

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
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showGoogleRoleModal, setShowGoogleRoleModal] = useState(false);
  const [selectedGoogleRole, setSelectedGoogleRole] = useState<'freelancer' | 'client' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check for error param returned from OAuth callback
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setErrorMessage(`Authentication notice: ${decodeURIComponent(errorParam)}`);
    }
  }, [searchParams]);

  // Live countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Clear inputs when role switches so placeholders remain visible
  const handleRoleChange = (newRole: 'freelancer' | 'client') => {
    setAuthRole(newRole);
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setOtpCode('');
    setOtpSent(false);
    setCountdown(0);
    setErrorMessage(null);
  };

  // Handle Google OAuth Sign In with explicitly selected role
  const handleGoogleSignInWithRole = async (selectedRole: 'freelancer' | 'client') => {
    setSelectedGoogleRole(selectedRole);
    setLoadingGoogle(true);
    setErrorMessage(null);

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback?role=${selectedRole}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        showToast(`❌ Google Sign-In failed: ${error.message}`);
        setLoadingGoogle(false);
        setSelectedGoogleRole(null);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during Google Sign-In.');
      showToast(`❌ Error: ${err.message || 'Google Sign-In failed'}`);
      setLoadingGoogle(false);
      setSelectedGoogleRole(null);
    }
  };

  // Handle Send OTP via Fast2SMS API Route
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const cleanNumber = phoneNumber.replace(/\D/g, '').slice(-10);
    if (cleanNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      showToast('⚠️ Please enter a 10-digit mobile number.');
      return;
    }

    setLoadingSendOtp(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanNumber }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to send OTP via Fast2SMS.');
        showToast(`❌ OTP failed: ${data.error || 'Failed to send OTP'}`);
        return;
      }

      setOtpSent(true);
      setCountdown(60);

      if (data.devOtp) {
        showToast(`📲 OTP Code: ${data.devOtp}`);
      } else {
        showToast(`📲 OTP delivered to +91 ${cleanNumber}!`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred while sending OTP.');
      showToast(`❌ Error: ${err.message || 'OTP Send Failed'}`);
    } finally {
      setLoadingSendOtp(false);
    }
  };

  // Handle Verify OTP via Fast2SMS Route & Session Setup
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanNumber = phoneNumber.replace(/\D/g, '').slice(-10);
    const cleanToken = otpCode.trim();

    if (cleanToken.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit OTP code.');
      showToast('⚠️ OTP code must be 6 digits.');
      return;
    }

    setLoadingVerifyOtp(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanNumber,
          token: cleanToken,
          role: authRole,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Invalid or expired OTP. Please try again.');
        showToast(`❌ Verification failed: ${data.error || 'Invalid OTP'}`);
        setLoadingVerifyOtp(false);
        return;
      }

      if (data.user) {
        const user = data.user;
        const targetRole = user.role || authRole;
        const displayName = user.name || `User (+91 ${cleanNumber.slice(-4)})`;
        const fullPhoneNumber = user.phone || `+91${cleanNumber}`;

        // Local accounts storage sync
        if (typeof window !== 'undefined') {
          try {
            const savedAccounts = JSON.parse(localStorage.getItem('techpunjab_accounts') || '[]');
            const exists = savedAccounts.some((a: any) => a.phone === fullPhoneNumber || a.id === user.id);
            if (!exists) {
              savedAccounts.push({
                id: user.id,
                phone: fullPhoneNumber,
                name: displayName,
                role: targetRole,
                tradeOrIndustry: targetRole === 'freelancer' ? 'Full Stack & AI Candidate' : 'MSME Partner',
              });
              localStorage.setItem('techpunjab_accounts', JSON.stringify(savedAccounts));
            }
          } catch (e) {
            console.error(e);
          }
        }

        loginUser(targetRole, displayName, fullPhoneNumber);
        showToast(`🎉 Verified successfully! Welcome, ${displayName}!`);

        if (targetRole === 'freelancer') {
          router.push('/freelancer/dashboard');
        } else {
          router.push('/client/dashboard');
        }
      } else {
        setErrorMessage('Verification could not complete session establishment.');
        showToast('⚠️ OTP verification incomplete.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during OTP verification.');
      showToast(`❌ Error: ${err.message || 'Verification failed'}`);
    } finally {
      setLoadingVerifyOtp(false);
    }
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

          {/* Prominent Google OAuth Button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowGoogleRoleModal(true)}
              disabled={loadingGoogle || loading}
              className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/30 active:scale-[0.99] text-zinc-700 hover:text-zinc-900 font-bold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="bg-white/90 backdrop-blur-md px-3 text-zinc-400 font-semibold rounded-full">
                  Or with {authType === 'signin' ? 'Credentials / Mobile' : 'Email Registration'}
                </span>
              </div>
            </div>
          </div>

          {/* SIGN IN FORM */}
          {authType === 'signin' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Method Switcher: Email vs Mobile OTP */}
              <div className="flex p-1 bg-zinc-100 rounded-xl border border-zinc-200 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('password');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    loginMethod === 'password'
                      ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email & Password</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('otp');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    loginMethod === 'otp'
                      ? 'bg-white text-emerald-700 shadow-sm border border-zinc-200/60'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile Number (OTP)</span>
                </button>
              </div>

              {/* 1. EMAIL & PASSWORD LOGIN */}
              {loginMethod === 'password' && (
                <form onSubmit={handleSignInSubmit} className="space-y-3.5 animate-in fade-in duration-150">
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
                        placeholder="name@domain.com"
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
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
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
              )}

              {/* 2. MOBILE NUMBER (OTP) LOGIN */}
              {loginMethod === 'otp' && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-3.5">
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 block mb-1">
                          {authRole === 'freelancer' ? 'Candidate Mobile Phone Number' : 'Enterprise Contact Mobile Number'}
                        </label>
                        <div className="relative flex rounded-xl border border-zinc-200 focus-within:ring-2 focus-within:ring-emerald-500 overflow-hidden bg-white shadow-xs">
                          <div className="bg-zinc-50 px-3 py-2 border-r border-zinc-200 text-xs font-bold text-zinc-700 flex items-center gap-1 shrink-0 select-none">
                            <span>🇮🇳</span>
                            <span>+91</span>
                          </div>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                            placeholder="98765 43210"
                            className="w-full px-3 py-2 text-xs font-mono font-medium focus:outline-none placeholder:text-zinc-400 placeholder:font-sans"
                          />
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1">
                          We will securely send a 6-digit OTP code to this mobile number.
                        </p>
                      </div>

                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                          <span className="leading-snug">{errorMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loadingSendOtp || phoneNumber.length < 10}
                        className="w-full py-3 sm:py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                      >
                        {loadingSendOtp ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Verification OTP...</span>
                          </>
                        ) : (
                          <>
                            <Phone className="w-3.5 h-3.5" />
                            <span>Send OTP to +91 {phoneNumber || '...'}</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                      <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">OTP Sent to</p>
                            <p className="text-xs font-extrabold text-zinc-900 font-mono">+91 {phoneNumber}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode('');
                            setErrorMessage(null);
                          }}
                          className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                        >
                          Change Number
                        </button>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-zinc-700 block mb-1">
                          Enter 6-Digit One-Time Password (OTP)
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          autoFocus
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••••"
                          className="w-full text-center tracking-[0.5em] px-3 py-2.5 text-lg font-mono font-extrabold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-zinc-300 bg-zinc-50/50"
                        />
                      </div>

                      {/* Resend OTP Section with Countdown */}
                      <div className="flex items-center justify-between text-xs px-1">
                        {countdown > 0 ? (
                          <span className="text-zinc-500 text-[11px] flex items-center gap-1">
                            <span>Resend available in</span>
                            <span className="font-bold text-zinc-800 font-mono">{countdown}s</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendOtp()}
                            disabled={loadingSendOtp}
                            className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 transition-colors"
                          >
                            <RotateCw className={`w-3 h-3 ${loadingSendOtp ? 'animate-spin' : ''}`} />
                            <span>Resend OTP Code</span>
                          </button>
                        )}
                        <span className="text-[10px] text-zinc-400 font-medium">Valid for 10 mins</span>
                      </div>

                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                          <span className="leading-snug">{errorMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loadingVerifyOtp || otpCode.length !== 6}
                        className="w-full py-3 sm:py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                      >
                        {loadingVerifyOtp ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying & Accessing Portal...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>Verify OTP & Continue to Dashboard</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
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

      {/* Google Role Selection Modal */}
      {showGoogleRoleModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => {
            if (!loadingGoogle) setShowGoogleRoleModal(false);
          }}
        >
          <div 
            className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-2xl w-full max-w-md p-6 sm:p-7 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              disabled={loadingGoogle}
              onClick={() => setShowGoogleRoleModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100/80 transition-colors disabled:opacity-40"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200/80 shadow-sm p-2 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                Choose Your Account Type
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Select how you want to use TechPunjab
              </p>
            </div>

            {/* Error Message inside modal */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Role Options */}
            <div className="space-y-3">
              {/* Option 1: Freelancer / PSDM Trainee */}
              <button
                type="button"
                disabled={loadingGoogle}
                onClick={() => handleGoogleSignInWithRole('freelancer')}
                className="w-full p-4 rounded-2xl border-2 border-zinc-200/90 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 text-left transition-all group flex items-center justify-between shadow-xs hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 group-hover:text-emerald-800 transition-colors">
                      Freelancer / PSDM Trainee
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Apply to gigs, earn payouts
                    </p>
                  </div>
                </div>
                {loadingGoogle && selectedGoogleRole === 'freelancer' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-600 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
                )}
              </button>

              {/* Option 2: MSME / Client */}
              <button
                type="button"
                disabled={loadingGoogle}
                onClick={() => handleGoogleSignInWithRole('client')}
                className="w-full p-4 rounded-2xl border-2 border-zinc-200/90 hover:border-blue-500 bg-white hover:bg-blue-50/40 text-left transition-all group flex items-center justify-between shadow-xs hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 group-hover:text-blue-800 transition-colors">
                      MSME / Client
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Post jobs, hire verified talent
                    </p>
                  </div>
                </div>
                {loadingGoogle && selectedGoogleRole === 'client' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                )}
              </button>
            </div>

            {loadingGoogle && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Redirecting securely to Google OAuth...</span>
              </div>
            )}

            <p className="text-[11px] text-zinc-400 text-center mt-5">
              Secure authentication powered by Google OAuth 2.0
            </p>
          </div>
        </div>
      )}

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