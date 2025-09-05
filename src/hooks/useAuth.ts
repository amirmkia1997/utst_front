import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { authApi, AuthResponse } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (phone: string) => Promise<AuthResponse>;
  verifyCode: (phone: string, code: string) => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // دریافت کاربر فعلی
    const getCurrentUser = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error getting current user:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    // گوش دادن به تغییرات authentication
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (phone: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const result = await authApi.sendOtp(phone);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (
    phone: string,
    code: string
  ): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const result = await authApi.verifyOtp(phone, code);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const result = await authApi.signOut();
      setUser(null);
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signIn,
    verifyCode,
    signOut,
  };
};
