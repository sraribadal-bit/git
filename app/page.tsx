'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-center p-6 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-xl max-w-sm w-full">
        <Loader2 className="w-9 h-9 text-indigo-600 animate-spin" />
        <h2 className="text-sm font-bold text-zinc-900">Redirecting to Login...</h2>
        <p className="text-xs text-zinc-500">Please sign in to access TechPunjab.</p>
      </div>
    </div>
  );
}
