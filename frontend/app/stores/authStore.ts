import { create } from 'zustand';
import type { User } from 'firebase/auth'; // Use type-only import

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void; // Added basic logout action
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start loading initially to check auth state
  error: null,
  setUser: (user) => set({
    user,
    isAuthenticated: !!user,
    isLoading: false,
    error: null,
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false, error: null }),
})); 