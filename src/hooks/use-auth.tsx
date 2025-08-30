
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  MultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  getMultiFactorResolver,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  mfaResolver: MultiFactorResolver | null;
  setMfaResolver: (resolver: MultiFactorResolver | null) => void;
  signup: (email: string, password: string, displayName: string) => Promise<User | null>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  completeMfaSignIn: (verificationCode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mfaResolver, setMfaResolver] = useState<MultiFactorResolver | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    await sendEmailVerification(userCredential.user);
    toast({
      title: "Verification Email Sent",
      description: "Please check your inbox to verify your email address.",
    });
    // Manually update the user state because onAuthStateChanged might be slow
    setUser({ ...userCredential.user, displayName }); 
    return userCredential.user;
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
          await signOut(auth);
          throw { code: 'auth/email-not-verified' };
      }
    } catch (error: any) {
       if (error.code === 'auth/multi-factor-required') {
         // Let the login page handle this error.
         throw error;
       }
       if (error.code === 'auth/email-not-verified') {
         throw error;
       }
       toast({
         title: 'Error logging in',
         description: error.message,
         variant: 'destructive',
       });
    }
  };
  
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
  };

  const completeMfaSignIn = async (verificationCode: string) => {
    if (!mfaResolver) {
        throw new Error("MFA resolver not available.");
    }
    const phoneAuthCredential = PhoneAuthProvider.credential(
      mfaResolver.hints[0].verificationId!,
      verificationCode
    );
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCredential);
    await mfaResolver.resolveSignIn(multiFactorAssertion);
    setMfaResolver(null);
  };

  const value = {
    user,
    loading,
    mfaResolver,
    setMfaResolver,
    signup,
    login,
    logout,
    loginWithGoogle,
    completeMfaSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
