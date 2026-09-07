'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FreelancerPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/freelancer/dashboard');
  }, [router]);
  return null;
}
