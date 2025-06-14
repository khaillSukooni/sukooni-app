export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          client_id: string
          created_at: string
          end_time: string
          id: string
          notes: string | null
          start_time: string
          status: string
          therapist_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          end_time: string
          id?: string
          notes?: string | null
          start_time: string
          status?: string
          therapist_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          end_time?: string
          id?: string
          notes?: string | null
          start_time?: string
          status?: string
          therapist_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          date_of_birth: string | null
          emergency_contact: string | null
          id: string
          medical_history: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          emergency_contact?: string | null
          id: string
          medical_history?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          emergency_contact?: string | null
          id?: string
          medical_history?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      therapist_certifications: {
        Row: {
          certificate_document_url: string | null
          certification_name: string
          created_at: string | null
          expiry_date: string | null
          id: string
          issue_date: string
          issuing_organization: string
          therapist_id: string | null
        }
        Insert: {
          certificate_document_url?: string | null
          certification_name: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date: string
          issuing_organization: string
          therapist_id?: string | null
        }
        Update: {
          certificate_document_url?: string | null
          certification_name?: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string
          issuing_organization?: string
          therapist_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapist_certifications_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_invitations: {
        Row: {
          country_of_residence: string
          created_at: string
          date_of_birth: string
          email: string
          expires_at: string
          first_name: string
          gender: string
          id: string
          invitation_token: string
          invited_by: string
          last_name: string
          nationality: string
          status: Database["public"]["Enums"]["invitation_status"]
          updated_at: string
        }
        Insert: {
          country_of_residence: string
          created_at?: string
          date_of_birth: string
          email: string
          expires_at?: string
          first_name: string
          gender: string
          id?: string
          invitation_token?: string
          invited_by: string
          last_name: string
          nationality: string
          status?: Database["public"]["Enums"]["invitation_status"]
          updated_at?: string
        }
        Update: {
          country_of_residence?: string
          created_at?: string
          date_of_birth?: string
          email?: string
          expires_at?: string
          first_name?: string
          gender?: string
          id?: string
          invitation_token?: string
          invited_by?: string
          last_name?: string
          nationality?: string
          status?: Database["public"]["Enums"]["invitation_status"]
          updated_at?: string
        }
        Relationships: []
      }
      therapist_practice_history: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          position: string
          start_date: string
          therapist_id: string | null
          workplace_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position: string
          start_date: string
          therapist_id?: string | null
          workplace_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position?: string
          start_date?: string
          therapist_id?: string | null
          workplace_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_practice_history_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      therapists: {
        Row: {
          availability: Json | null
          bio: string | null
          country_of_residence: string | null
          created_at: string
          date_of_birth: string | null
          degree_document_url: string | null
          degree_field: string | null
          draft_data: Json | null
          education_level: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          graduation_year: number | null
          hourly_rate: number | null
          id: string
          institution: string | null
          is_verified: boolean | null
          languages: string[] | null
          last_name: string | null
          license_document_url: string | null
          license_expiry_date: string | null
          license_number: string | null
          license_state: string | null
          local_id_document_url: string | null
          local_id_number: string | null
          local_id_type: string | null
          nationality: string | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          phone: string | null
          profile_image_url: string | null
          specialization: string | null
          specializations: string[] | null
          therapeutic_approaches: string[] | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          country_of_residence?: string | null
          created_at?: string
          date_of_birth?: string | null
          degree_document_url?: string | null
          degree_field?: string | null
          draft_data?: Json | null
          education_level?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          graduation_year?: number | null
          hourly_rate?: number | null
          id: string
          institution?: string | null
          is_verified?: boolean | null
          languages?: string[] | null
          last_name?: string | null
          license_document_url?: string | null
          license_expiry_date?: string | null
          license_number?: string | null
          license_state?: string | null
          local_id_document_url?: string | null
          local_id_number?: string | null
          local_id_type?: string | null
          nationality?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string | null
          profile_image_url?: string | null
          specialization?: string | null
          specializations?: string[] | null
          therapeutic_approaches?: string[] | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          country_of_residence?: string | null
          created_at?: string
          date_of_birth?: string | null
          degree_document_url?: string | null
          degree_field?: string | null
          draft_data?: Json | null
          education_level?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          graduation_year?: number | null
          hourly_rate?: number | null
          id?: string
          institution?: string | null
          is_verified?: boolean | null
          languages?: string[] | null
          last_name?: string | null
          license_document_url?: string | null
          license_expiry_date?: string | null
          license_number?: string | null
          license_state?: string | null
          local_id_document_url?: string | null
          local_id_number?: string | null
          local_id_type?: string | null
          nationality?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string | null
          profile_image_url?: string | null
          specialization?: string | null
          specializations?: string[] | null
          therapeutic_approaches?: string[] | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "therapists_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_therapist_onboarding: {
        Args: { final_data: Json }
        Returns: Json
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      is_invitation_valid: {
        Args: { token_param: string }
        Returns: boolean
      }
      save_therapist_draft: {
        Args: { step_number: number; step_data: Json }
        Returns: Json
      }
    }
    Enums: {
      invitation_status: "pending" | "accepted" | "expired" | "revoked"
      user_role: "client" | "therapist" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      invitation_status: ["pending", "accepted", "expired", "revoked"],
      user_role: ["client", "therapist", "admin"],
    },
  },
} as const
