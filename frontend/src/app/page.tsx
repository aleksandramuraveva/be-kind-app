'use client';

import { useEffect, useState } from 'react';
import Dashboard from "../components/Dashboard/Dashboard";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log('Fetching data from:', `${process.env.NEXT_PUBLIC_API_URL}/test`);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`)
      .then(res => res.text())
      .then(data => {
        console.log('Received data:', data);
        setMessage(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
  
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-open-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="">{message} hello</div>
          <Dashboard/>
        </main>
      </div>

  );
}

