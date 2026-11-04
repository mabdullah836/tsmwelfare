"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SecretAdminAccess() {
  const router = useRouter();
  const sequenceRef = useRef<number[]>([]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        const now = Date.now();
        sequenceRef.current.push(now);
        if (sequenceRef.current.length > 3) sequenceRef.current.shift();
        if (
          sequenceRef.current.length === 3 &&
          sequenceRef.current[2] - sequenceRef.current[0] < 1500
        ) {
          sequenceRef.current = [];
          router.push('/admin/login');
        }
      } else {
        sequenceRef.current = [];
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);
  return null;
} 