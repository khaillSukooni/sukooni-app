
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useNeedsPasswordSetup = () => {
  const { user } = useAuth();
  const [needsPasswordSetup, setNeedsPasswordSetup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPasswordStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // For now, we'll assume invited users need to set up passwords
        // In a real implementation, you would track this with a specific field
        // in the profiles table or check authentication metadata
        
        // Check if login method indicates this was an invite
        // For demo purposes, we'll just set to false for now
        // This would be replaced with actual logic based on your auth flow
        setNeedsPasswordSetup(false);
      } catch (err) {
        console.error("Failed to check password setup status:", err);
        setNeedsPasswordSetup(false);
      } finally {
        setLoading(false);
      }
    };

    checkPasswordStatus();
  }, [user]);

  return { needsPasswordSetup, loading };
};

export default useNeedsPasswordSetup;
