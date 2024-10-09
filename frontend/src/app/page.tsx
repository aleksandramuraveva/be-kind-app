'use client';

import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import HomeText from '../components/HomeText/HomeText';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
            className="tracking-widest font-semibold uppercase text-xl  mx-auto border shadow-md text-white px-8 py-3 rounded hover:opacity-80 transition duration-300 hover:-translate-y-1"
            onClick={handleStartClick}
          >
            Start
          </button>
        )}
      </main>
    </div>
  );
}
