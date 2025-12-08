'use client';

import RegisterModal from './RegisterModal';
import { useAuth } from '../context/AuthContext';

export default function RegisterModalContainer() {
  const { registerModalOpen, setRegisterModalOpen } = useAuth();

  return (
    <RegisterModal 
      isOpen={registerModalOpen} 
      onClose={() => setRegisterModalOpen(false)} 
    />
  );
}
