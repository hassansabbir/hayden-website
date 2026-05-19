"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return (
    <UserContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useLoginUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useLoginUser must be used within a UserProvider');
  }
  return context;
};

export default useLoginUser;
