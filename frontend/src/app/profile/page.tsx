'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ProfileSettings from '../../components/ProfileSettings/ProfileSettings';

const ProfilePage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 items-center sm:items-start max-w-screen-lg mx-auto">
      <ProfileSettings />
    </div>
  );
};

export default ProfilePage;
