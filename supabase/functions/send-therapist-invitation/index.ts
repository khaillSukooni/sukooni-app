
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendInvitationRequest {
  email: string;
  first_name: string;
  last_name: string;
  invitation_token: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const { email, first_name, last_name, invitation_token }: SendInvitationRequest = await req.json();

    if (!email || !first_name || !last_name || !invitation_token) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create the invitation URL
    const invitationUrl = `${Deno.env.get("SUPABASE_URL")?.replace("supabase.co", "vercel.app")}/therapist-signup?token=${invitation_token}`;

    const emailResponse = await resend.emails.send({
      from: "Sukooni <onboarding@resend.dev>",
      to: [email],
      subject: "You're invited to join Sukooni as a Therapist",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Welcome to Sukooni!</h1>
          
          <p>Hi ${first_name},</p>
          
          <p>You've been invited to join Sukooni as a therapist. We're excited to have you as part of our mental health platform.</p>
          
          <p>To complete your registration and set up your profile, please click the link below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${invitationUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Complete Your Registration
            </a>
          </div>
          
          <p><strong>Important:</strong> This invitation link will expire in 6 hours for security reasons.</p>
          
          <p>If you have any questions, please don't hesitate to reach out to our team.</p>
          
          <p>Best regards,<br>The Sukooni Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            If you're unable to click the button above, copy and paste this link into your browser:<br>
            <a href="${invitationUrl}" style="color: #2563eb;">${invitationUrl}</a>
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-therapist-invitation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
