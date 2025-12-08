'use client';

import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

export default function LoginModalContainer() {
  const { loginModalOpen, setLoginModalOpen } = useAuth();

  return (
    <LoginModal 
      isOpen={loginModalOpen} 
      onClose={() => setLoginModalOpen(false)} 
    />
  );
}
