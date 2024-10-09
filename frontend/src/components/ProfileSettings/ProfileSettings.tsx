

import UsernameForm from './UsernameForm/UsernameForm';
import EmailForm from './EmailForm/EmailForm';
import PasswordForm from './PasswordForm/PasswordForm';
import DeleteAccountButton from './DeleteAccountButton/DeleteAccountButton';

const ProfileSettings = () => {
  return (
    <div className="p-8 space-y-8 mx-auto mb-20 text-white">
      <h1 className="text-2xl text-white font-bold mb-4">Profile Settings</h1>
      <UsernameForm />
      <EmailForm />
      <PasswordForm />
      <DeleteAccountButton />

    </div>
  );
};

export default ProfileSettings;
