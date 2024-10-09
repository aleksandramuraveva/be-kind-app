'use client';

import Auth from '../../components/Auth/Auth';

export default function AuthPage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-open-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-screen-lg mx-auto">
        <Auth />
      </main>
    </div>
  );
}
