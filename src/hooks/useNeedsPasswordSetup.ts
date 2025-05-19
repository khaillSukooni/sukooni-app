
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
        // Check if the user was created via invitation
        // We can check metadata, or a specific flag in the database
        // For this example, checking if the auth method is 'invite'
        const { data, error } = await supabase
          .from('user_settings')
          .select('needs_password_setup')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error("Error checking password status:", error);
          setNeedsPasswordSetup(false);
        } else {
          setNeedsPasswordSetup(data?.needs_password_setup || false);
        }
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
