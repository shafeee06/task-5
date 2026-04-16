
import React from 'react';
import LoginForm from '@/components/LoginForm';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <LoginForm />
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© 2025 Owl Auth. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
