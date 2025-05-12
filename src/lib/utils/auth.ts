
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types/auth";

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data as UserProfile;
};

export const updateUserRole = async (userId: string, role: UserRole): Promise<boolean> => {
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user role:", error);
    return false;
  }

  return true;
};
