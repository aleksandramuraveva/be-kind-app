'use client';

import { useEffect } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import HomeText from '../components/HomeText/HomeText';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { AppDispatch, RootState } from '../store/store';

export default function Home() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login());
    }
  }, [dispatch]);

  const handleStartClick = () => {
    router.push('/auth');
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-open-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-screen-lg mx-auto">
        <HomeText />
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <button
            className="tracking-widest font-semibold uppercase text-xl mx-auto border shadow-md text-white px-8 py-3 rounded hover:opacity-80 transition duration-300 hover:-translate-y-1"
            onClick={handleStartClick}
          >
            Start
          </button>
        )}
      </main>
    </div>
  );
}
