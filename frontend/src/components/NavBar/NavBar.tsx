'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store/store';
import Link from 'next/link';

const NavBar = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch(); 
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login());
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('uniqueId');
    dispatch(logout());
    router.push('/auth');
  };

  return (
    <nav className="p-4">
      <ul className="tracking-widest font-light uppercase text-xl flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 md:space-x-16 relative">
        <li className="relative group ribbon transform transition duration-300">
          <Link href="/" className="text-white px-3 sm:px-6 py-1 block relative z-10">
            Home
          </Link>
          <span className="rounded absolute left-0 top-0 w-full h-full bg-blue-500 transform group-hover:bg-blue-600 transition duration-300"></span>
        </li>

        <li className="relative group ribbon transform transition duration-300">
          <Link href="/friends" className="text-white px-3 sm:px-6 py-1 block relative z-10">
            Friends
          </Link>
          <span className="rounded absolute left-0 top-0 w-full h-full bg-blue-500 transform group-hover:bg-blue-600 transition duration-300"></span>
        </li>

        <li className="relative group ribbon transform transition duration-300">
          <Link href="/profile" className="text-white px-3 sm:px-6 py-1 block relative z-10">
            Profile
          </Link>
          <span className="rounded absolute left-0 top-0 w-full h-full bg-blue-500 transform group-hover:bg-blue-600 transition duration-300"></span>
        </li>

        {isAuthenticated && (
          <li className="md:absolute md:right-0">
            <button 
              onClick={handleLogout} 
              className="border shadow-md text-white px-3 sm:px-6 py-2 block relative z-10 rounded hover:opacity-80 transition duration-300 hover:-translate-y-1"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
