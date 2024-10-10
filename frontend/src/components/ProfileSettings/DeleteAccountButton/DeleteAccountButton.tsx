'use client';

'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { logout } from '../../../store/authSlice';

const DeleteAccountButton = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('uniqueId');
        dispatch(logout());
        router.push('/auth');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete account:', errorData);
      }
    } catch (error) {
      console.error('Network error. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDeleteAccount}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
