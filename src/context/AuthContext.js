'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);

  return (
    <AuthContext.Provider value={{ 
      loginModalOpen, 
      setLoginModalOpen,
      registerModalOpen,
      setRegisterModalOpen,
      verificationModalOpen,
      setVerificationModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
