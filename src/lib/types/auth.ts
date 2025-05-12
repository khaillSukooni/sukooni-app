
import { User } from "@supabase/supabase-js";

export type AuthUser = User;

export type UserRole = "client" | "therapist" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}
