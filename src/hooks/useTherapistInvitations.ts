import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CreateTherapistInvitationRequest, TherapistInvitation } from "@/lib/types/invitation";
import { toast } from "@/hooks/use-toast";

export const useTherapistInvitations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkEmailExists = useCallback(async (email: string): Promise<boolean> => {
    try {
      // Check if email exists in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (profileData) {
        return true;
      }

      // Check if email exists in pending invitations
      const { data: invitationData, error: invitationError } = await supabase
        .from("therapist_invitations")
        .select("id")
        .eq("email", email.toLowerCase())
        .eq("status", "pending")
        .maybeSingle();

      if (invitationError && invitationError.code !== 'PGRST116') {
        throw invitationError;
      }

      return !!invitationData;
    } catch (error: any) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  }, []);

  const createInvitation = useCallback(async (data: CreateTherapistInvitationRequest) => {
    setIsLoading(true);
    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(data.email);
      if (emailExists) {
        throw new Error("This email is already registered or has a pending invitation");
      }

      // Insert the invitation into the database
      const { data: invitation, error: insertError } = await supabase
        .from("therapist_invitations")
        .insert([{
          ...data,
          email: data.email.toLowerCase(),
          invited_by: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      console.log("Invitation created:", invitation);

      // Send the email invitation
      const { error: emailError } = await supabase.functions.invoke("send-therapist-invitation", {
        body: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          invitation_token: invitation.invitation_token,
        },
      });

      if (emailError) {
        console.error("Email sending error:", emailError);
        throw new Error("Failed to send invitation email");
      }

      toast({
        title: "Invitation sent successfully",
        description: `An invitation has been sent to ${data.email}`,
      });

      return invitation;
    } catch (error: any) {
      console.error("Error creating invitation:", error);
      toast({
        title: "Error sending invitation",
        description: error.message || "Failed to send invitation",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [checkEmailExists]);

  const getInvitations = useCallback(async (): Promise<TherapistInvitation[]> => {
    try {
      const { data, error } = await supabase
        .from("therapist_invitations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Error fetching invitations:", error);
      toast({
        title: "Error fetching invitations",
        description: error.message || "Failed to fetch invitations",
        variant: "destructive",
      });
      return [];
    }
  }, []);

  const resendInvitation = useCallback(async (invitationId: string) => {
    setIsLoading(true);
    try {
      // Get the invitation details
      const { data: invitation, error: fetchError } = await supabase
        .from("therapist_invitations")
        .select("*")
        .eq("id", invitationId)
        .single();

      if (fetchError) throw fetchError;

      // Update the invitation with new token and expiry
      const { data: updatedInvitation, error: updateError } = await supabase
        .from("therapist_invitations")
        .update({
          invitation_token: crypto.randomUUID(),
          expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
          status: 'pending',
          updated_at: new Date().toISOString(),
        })
        .eq("id", invitationId)
        .select()
        .single();

      if (updateError) throw updateError;

      // Send the new email invitation
      const { error: emailError } = await supabase.functions.invoke("send-therapist-invitation", {
        body: {
          email: updatedInvitation.email,
          first_name: updatedInvitation.first_name,
          last_name: updatedInvitation.last_name,
          invitation_token: updatedInvitation.invitation_token,
        },
      });

      if (emailError) {
        console.error("Email sending error:", emailError);
        throw new Error("Failed to send invitation email");
      }

      toast({
        title: "Invitation resent successfully",
        description: `A new invitation has been sent to ${updatedInvitation.email}`,
      });

      return updatedInvitation;
    } catch (error: any) {
      console.error("Error resending invitation:", error);
      toast({
        title: "Error resending invitation",
        description: error.message || "Failed to resend invitation",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const revokeInvitation = useCallback(async (invitationId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("therapist_invitations")
        .update({
          status: 'revoked',
          updated_at: new Date().toISOString(),
        })
        .eq("id", invitationId);

      if (error) throw error;

      toast({
        title: "Invitation revoked",
        description: "The invitation has been revoked successfully",
      });
    } catch (error: any) {
      console.error("Error revoking invitation:", error);
      toast({
        title: "Error revoking invitation",
        description: error.message || "Failed to revoke invitation",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createInvitation,
    getInvitations,
    resendInvitation,
    revokeInvitation,
    isLoading,
  };
};
