'use client';
import { FC, ReactNode } from 'react';
import AuthProvider from './auth-provider';
import { Toaster } from '@/components/ui/sonner';

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <AuthProvider>
          {children}
          <Toaster richColors duration={5000}/>
      </AuthProvider>
    );
  };
  
  export default Provider;