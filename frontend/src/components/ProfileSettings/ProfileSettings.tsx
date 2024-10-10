'use client'

import React from 'react';
import UsernameForm from './UsernameForm/UsernameForm';
import EmailForm from './EmailForm/EmailForm';
import PasswordForm from './PasswordForm/PasswordForm';
import DeleteAccountButton from './DeleteAccountButton/DeleteAccountButton';

const ProfileSettings = () => {
  const username = (typeof window !== 'undefined') ? localStorage.getItem('username') : '';
  const uniqueId = (typeof window !== 'undefined') ? localStorage.getItem('uniqueId') : '';

  return (
    <div className="p-8 space-y-8 mx-auto mb-20 text-white">
      <div className=" mb-4 font-bold">
        <p className="text-2xl">Name: {username}</p>
        <p className="text-2xl">Tag: {uniqueId}</p>
      </div>
      <h1 className="text-2xl text-white font-bold mb-4">Profile Settings</h1>
      <UsernameForm />
      <EmailForm />
      <PasswordForm />
      <DeleteAccountButton />
    </div>
  );
};

export default ProfileSettings;

