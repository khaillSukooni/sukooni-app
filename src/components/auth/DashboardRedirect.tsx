
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function DashboardRedirect() {
  const { user, profile, isProfileLoading, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTherapistOnboarding = async () => {
      if (!user || !profile || isProfileLoading) return;

      // Check if user is a therapist and needs to complete onboarding
      if (profile.role === 'therapist') {
        try {
          const { data: therapistData, error } = await supabase
            .from('therapists')
            .select('onboarding_completed, onboarding_step')
            .eq('id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error checking therapist onboarding:', error);
            return;
          }

          // If therapist record doesn't exist or onboarding not completed, redirect to onboarding
          if (!therapistData || !therapistData.onboarding_completed) {
            navigate('/therapist-onboarding');
            return;
          }
        } catch (error) {
          console.error('Error checking therapist onboarding:', error);
        }
      }

      // For completed profiles or other roles, redirect to their dashboard
      const dashboardRoute = getDashboardRoute();
      navigate(dashboardRoute);
    };

    checkTherapistOnboarding();
  }, [user, profile, isProfileLoading, navigate, getDashboardRoute]);

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
