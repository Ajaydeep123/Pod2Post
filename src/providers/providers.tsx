'use client';
import { FC, ReactNode } from 'react';
import AuthProvider from './auth-provider';

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <AuthProvider>
          {children}
      </AuthProvider>
    );
  };
  
  export default Provider;