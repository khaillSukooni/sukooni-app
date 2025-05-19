
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import useNeedsPasswordSetup from '@/hooks/useNeedsPasswordSetup';

const DashboardRedirect = () => {
  const { isAuthenticated, isLoading, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const { needsPasswordSetup, loading: checkingPasswordSetup } = useNeedsPasswordSetup();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectUser = async () => {
      try {
        // Wait until auth is loaded
        if (isLoading || checkingPasswordSetup) {
          return;
        }

        // If user is authenticated but needs to set password
        if (isAuthenticated && needsPasswordSetup) {
          navigate('/set-password');
          return;
        }

        // If user is authenticated, redirect to their dashboard
        if (isAuthenticated) {
          const dashboardRoute = getDashboardRoute();
          if (dashboardRoute) {
            navigate(dashboardRoute);
          } else {
            setError("Could not determine your dashboard route.");
          }
        } else {
          // If not authenticated, redirect to login
          navigate('/login');
        }
      } catch (err) {
        console.error('Error in dashboard redirect:', err);
        setError('An error occurred. Please try again later.');
      }
    };

    redirectUser();
  }, [isAuthenticated, isLoading, navigate, getDashboardRoute, needsPasswordSetup, checkingPasswordSetup]);

  // Show loading state
  if (isLoading || checkingPasswordSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state if there is an error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl">Error</div>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-brand-blue text-white rounded hover:bg-brand-blue/90"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Default loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default DashboardRedirect;
