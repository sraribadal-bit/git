'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { RoleSelector } from '@/components/RoleSelector';
import { 
  User, 
  Building2, 
  Mail, 
  Check, 
  ArrowLeft, 
  UserPlus, 
  Eye, 
  EyeOff,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ThreeDBackground } from '@/components/ThreeDBackground';
import { deriveNameFromEmail } from '@/data/mockData';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  const router = useRouter();
  const { currentUser, signUpUser, showToast } = useApp();

  const [authRole, setAuthRole] = useState<'freelancer' | 'client'>('freelancer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trade, setTrade] = useState('Full Stack Web & Generative AI');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      showToast('⚠️ Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password.');
      showToast('⚠️ Passwords do not match. Please verify your password.');
      return;
    }

    const registeredEmail = email.trim();
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
        password: password,
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
      setErrorMessage(err.message || 'An unexpected error occurred during signup.');
      showToast(`❌ Error: ${err.message || 'Signup failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between p-3 sm:p-6 lg:p-8 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden w-full">
      {/* Interactive 3D Canvas Background */}
      <ThreeDBackground />

      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between relative z-10 px-1 gap-2">
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
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">Create Verified Account</p>
          </div>
        </Link>

        <Link
          href="/login"
          className="px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/90 backdrop-blur-md border border-white/80 text-zinc-700 hover:bg-white flex items-center gap-1 sm:gap-1.5 transition-colors shadow-sm shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden xs:inline sm:inline">Already registered? </span><span>Sign In</span>
        </Link>
      </div>

      {/* Main Signup Card */}
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
              Create TechPunjab Account
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Select your role to access your dedicated dashboard
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-5">
            <label className="text-xs font-bold text-zinc-800 block text-center mb-2">
              Choose Your Account Type:
            </label>
            <RoleSelector
              selectedRole={authRole}
              onChange={setAuthRole}
              showDescription={true}
            />
          </div>

          <form onSubmit={handleSignUpSubmit} className="space-y-3.5 animate-in fade-in duration-200">
            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">
                {authRole === 'freelancer' ? 'Full Candidate Name' : 'Enterprise / Company Name'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={authRole === 'freelancer' ? 'e.g., Harpreet Kaur' : 'e.g., Ludhiana Precision Tools Ltd'}
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {authRole === 'freelancer' && (
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Vocational Trade / NSQF Skill
                </label>
                <input
                  type="text"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  placeholder="Full Stack, IoT, CAD, Cloud"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">
                Create Strong Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-3 pr-10 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
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

            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`w-full pl-3 pr-10 py-2 text-xs font-mono rounded-xl border ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-300 focus:ring-red-400'
                      : 'border-zinc-200 focus:ring-indigo-500'
                  } focus:outline-none focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
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
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account in Supabase...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Register as {authRole === 'freelancer' ? 'Freelancer' : 'MSME Client'} & Continue</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom Link to Sign In */}
          <div className="pt-4 text-center text-xs text-zinc-500 border-t border-zinc-100 mt-4">
            <p>
              Already registered?{' '}
              <Link href="/login" className="font-bold text-indigo-600 hover:underline">
                Sign In here
              </Link>
            </p>
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
