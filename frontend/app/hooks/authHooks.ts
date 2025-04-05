import { useMutation } from '@tanstack/react-query';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
} from 'firebase/auth';
import type { AuthError, UserCredential } from 'firebase/auth'; // Use type-only imports
import { app } from '../lib/firebase'; // Adjust path as needed
import { useAuthStore } from '~/stores/authStore';

// --- Login Hook ---

interface LoginCredentials {
  email: string;
  password: string;
}

const loginWithEmail = async ({ email, password }: LoginCredentials): Promise<UserCredential> => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password);
};

export const useLogin = () => {
  const { setError, setLoading } = useAuthStore.getState(); // Use getState for mutation callbacks

  return useMutation<UserCredential, AuthError, LoginCredentials>({ 
    mutationFn: loginWithEmail, 
    onMutate: () => {
      setLoading(true);
      setError(null); // Clear previous errors
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setError(error.message || 'Login failed. Please try again.');
      // setLoading(false) is handled by the auth state listener
    },
    onSuccess: (data) => {
      console.log("Login successful:", data.user.uid);
      // User state will be updated by the onAuthStateChanged listener
      // setLoading(false) is handled by the auth state listener
    },
    // No need for onSettled if loading is managed by listener
  });
};

// --- Logout Hook ---

const logoutUser = async (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

export const useLogout = () => {
  const { setError, setLoading } = useAuthStore.getState();

  return useMutation<void, AuthError, void>({ 
    mutationFn: logoutUser,
    onMutate: () => {
      setLoading(true);
      setError(null);
    }, 
    onError: (error) => {
      console.error("Logout failed:", error);
      setError(error.message || 'Logout failed.');
      // setLoading(false) is handled by the auth state listener
    },
    onSuccess: () => {
      console.log("Logout successful");
      // User state (null) will be updated by the onAuthStateChanged listener
      // setLoading(false) is handled by the auth state listener
      // useAuthStore.getState().logout(); // Alternatively, call logout action directly
    },
  });
}; 