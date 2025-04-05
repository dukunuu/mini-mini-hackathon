import React, { useEffect } from "react";
import { useNavigate } from "react-router"; // Use react-router for hooks
import { useAuthStore } from "~/stores/auth.store"; // Import the real store

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  // Use the real store's state
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Check authentication status after component mounts
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      console.log("User not authenticated, redirecting to /login"); // Added for debugging
      navigate("/sign-in", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}; 