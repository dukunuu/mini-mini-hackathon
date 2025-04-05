import React, { useEffect } from "react";
import { useNavigate } from "react-router"; // Use react-router for hooks
import { useAuthStore } from "~/stores/auth.store"; // Import the real store

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  // Use the real store's state
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Check authentication status after component mounts
    if (isAuthenticated) {
      // Redirect to dashboard page if already authenticated
      console.log("User already authenticated, redirecting to /dashboard"); // Added for debugging
      navigate("/dashboard", { replace: true }); // Redirect logged-in users
    }
  }, [isAuthenticated, navigate]);

  // Render children only if not authenticated
  if (isAuthenticated) {
    // Optionally render a loading state or null while checking/redirecting
    return null; // Or a loading component: <LoadingSpinner />;
  }

  // If not authenticated, render the actual public route component (e.g., sign-in form)
  return <>{children}</>;
}; 