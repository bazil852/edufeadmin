import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  phoneNo: string;
  isEmailVerified: boolean;
  isPhoneNoVerified: boolean;
}

interface BackendTokens {
  accessToken: string;
  expiresIn: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  hasPermission: (requiredRole: string) => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const hasPermission = (requiredRole: string): boolean => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    return user.role === requiredRole;
  };
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login_admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store user data and tokens
      setUser(data.user);
      localStorage.setItem('accessToken', data.backendTokens.accessToken);
      localStorage.setItem('tokenExpiry', data.backendTokens.expiresIn.toString());
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiry');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, hasPermission, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};