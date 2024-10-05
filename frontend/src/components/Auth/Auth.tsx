import { useState } from 'react';
import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('signin');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-center mx-auto w-full max-w-md ">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleTabClick('signin')}
          className={`w-32 px-4 py-2 text-my-blue ${activeTab === 'signin' ? 'bg-blue-100' : 'bg-gray-100'} border-t border-l border-r border-gray-200 rounded-t`}
        >
          Sign In
        </button>
        <button
          onClick={() => handleTabClick('signup')}
          className={`w-32 text-my-pink px-4 py-2 ${activeTab === 'signup' ? 'bg-blue-100' : 'bg-gray-100'} border-t border-l border-r border-gray-200 rounded-t ml-2`}
        >
          Sign Up
        </button>
      </div>
      <div className="p-4 border border-gray-200 rounded">
        {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default Auth;
