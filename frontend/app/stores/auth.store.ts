import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any; // Replace 'any' with your User type if available
  login: (user: any) => void; // Function to set user and authenticated state
  logout: () => void; // Function to clear user and authenticated state
}

// Create the Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false, // Default state: not authenticated
  user: null, // Default state: no user info

  // Action to handle login
  login: (userData) => set({ isAuthenticated: true, user: userData }),

  // Action to handle logout
  logout: () => set({ isAuthenticated: false, user: null }),
})); 