'use client';

// import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import HomeText from '../components/HomeText/HomeText';
import Auth from '../components/Auth/Auth';

export default function Home() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   console.log('Fetching data from:', `${process.env.NEXT_PUBLIC_API_URL}/test`);
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`)
  //     .then(res => res.text())
  //     .then(data => {
  //       console.log('Received data:', data);
  //       setMessage(data);
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-open-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-screen-lg mx-auto">
        {/* <div>{message} hello</div>*/}
        <HomeText />
        <Auth />
        {/* <Dashboard />*/}
      </main>
    </div>
  );
}
