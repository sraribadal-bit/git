'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { currentUser, role } = useApp();

  useEffect(() => {
    const savedUserStr = typeof window !== 'undefined' ? localStorage.getItem('techpunjab_user') : null;
    const savedRole = typeof window !== 'undefined' ? localStorage.getItem('techpunjab_role') : null;

    if (!savedUserStr && !currentUser) {
      router.replace('/login');
      return;
    }

    const activeRole = currentUser?.role || savedRole || role;
    if (activeRole === 'client') {
      router.replace('/client/dashboard');
    } else {
      router.replace('/freelancer/dashboard');
    }
  }, [currentUser, role, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-center p-6 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-xl max-w-sm w-full">
        <Loader2 className="w-9 h-9 text-indigo-600 animate-spin" />
        <h2 className="text-sm font-bold text-zinc-900">Verifying TechPunjab Access...</h2>
        <p className="text-xs text-zinc-500">Redirecting to your authenticated portal.</p>
      </div>
    </div>
  );
}
