'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Auth from '../../components/Auth/Auth';

const AuthPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-open-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-screen-lg mx-auto">
        <Auth />
      </main>
    </div>
  );
};

export default AuthPage;
