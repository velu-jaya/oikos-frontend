'use client';

import VerificationModal from './VerificationModal';
import { useAuth } from '../context/AuthContext';

export default function VerificationModalContainer() {
  const { verificationModalOpen, setVerificationModalOpen } = useAuth();

  return (
    <VerificationModal 
      isOpen={verificationModalOpen} 
      onClose={() => setVerificationModalOpen(false)} 
    />
  );
}
