'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const router = useRouter();
  const { currentUser, role } = useApp();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check localStorage and cookies
    const savedUserStr = typeof window !== 'undefined' ? localStorage.getItem('techpunjab_user') : null;
    const savedRole = typeof window !== 'undefined' ? (localStorage.getItem('techpunjab_role') as UserRole | null) : null;
    const hasSessionCookie = typeof document !== 'undefined' && Boolean(
      document.cookie.match(new RegExp('(^| )techpunjab_user_session=([^;]+)')) ||
      document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'))
    );
    const cookieRoleMatch = typeof document !== 'undefined' ? document.cookie.match(new RegExp('(^| )user_role=([^;]+)')) : null;
    const cookieRole = cookieRoleMatch ? (decodeURIComponent(cookieRoleMatch[2]) as UserRole) : null;

    if (!savedUserStr && !currentUser && !hasSessionCookie) {
      // Not logged in -> redirect to login
      router.replace('/login');
      return;
    }

    const currentActiveRole = currentUser?.role || savedRole || cookieRole || role;
    if (currentActiveRole !== allowedRole) {
      // Role mismatch -> redirect to their correct dashboard
      if (currentActiveRole === 'freelancer') {
        router.replace('/freelancer/dashboard');
      } else {
        router.replace('/client/dashboard');
      }
      return;
    }

    setIsChecking(false);
  }, [currentUser, role, allowedRole, router]);

  if (isChecking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 p-6 text-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">Verifying role credentials & security token...</p>
      </div>
    );
  }

  return <>{children}</>;
};
export default ProtectedRoute;
