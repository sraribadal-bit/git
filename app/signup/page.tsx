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
  Sparkles
} from 'lucide-react';

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

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('⚠️ Passwords do not match. Please verify your password.');
      return;
    }
    const displayName = name.trim() || (authRole === 'freelancer' ? 'New PSDM Candidate' : 'New MSME Enterprise');
    const registeredEmail = email.trim() || (authRole === 'freelancer' ? 'candidate@techpunjab.in' : 'contact@enterprise.com');
    
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
            <p className="text-[10px] text-zinc-500 font-medium">Create Verified Account</p>
          </div>
        </Link>

        <Link
          href="/login"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Already registered? Sign In</span>
        </Link>
      </div>

      {/* Main Signup Card */}
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
              Create TechPunjab Account
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Select your role to access your dedicated dashboard
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-5">
            <label className="text-xs font-bold text-zinc-800 block text-center mb-2">
              Choose Your Persona:
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

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Register as {authRole === 'freelancer' ? 'Freelancer' : 'MSME Client'} & Continue</span>
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
      <div className="max-w-5xl mx-auto w-full text-center text-xs text-zinc-400">
        Govt. of Punjab • Punjab Skill Development Mission • TechPunjab Official Portal
      </div>
    </div>
  );
}
