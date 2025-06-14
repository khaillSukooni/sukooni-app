
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/ui/Logo';

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function TherapistSignup() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    validateInvitation();
  }, [token]);

  const validateInvitation = async () => {
    if (!token) {
      toast.error('Invalid invitation link');
      navigate('/');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('therapist_invitations')
        .select('*')
        .eq('invitation_token', token)
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        toast.error('Invalid or expired invitation');
        navigate('/');
        return;
      }

      setInvitation(data);
    } catch (error) {
      console.error('Error validating invitation:', error);
      toast.error('Error validating invitation');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData: PasswordFormData) => {
    if (!invitation) return;

    try {
      setIsSubmitting(true);

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: invitation.email,
        password: formData.password,
        options: {
          data: {
            first_name: invitation.first_name,
            last_name: invitation.last_name,
          },
        },
      });

      if (authError) throw authError;

      // Create therapist record with invitation data
      const { error: therapistError } = await supabase
        .from('therapists')
        .insert({
          id: authData.user?.id,
          email: invitation.email,
          first_name: invitation.first_name,
          last_name: invitation.last_name,
          date_of_birth: invitation.date_of_birth,
          gender: invitation.gender,
          nationality: invitation.nationality,
          country_of_residence: invitation.country_of_residence,
          onboarding_step: 2, // Start from languages & specialties
          onboarding_completed: false,
        });

      if (therapistError) throw therapistError;

      // Mark invitation as accepted
      await supabase
        .from('therapist_invitations')
        .update({ status: 'accepted' })
        .eq('id', invitation.id);

      toast.success('Account created successfully! Complete your profile to get started.');
      navigate('/therapist-onboarding');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Error creating account');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Invalid Invitation</h1>
          <p className="text-muted-foreground mt-2">This invitation link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <h1 className="text-2xl font-bold mt-4">Welcome to Sukooni</h1>
          <p className="text-muted-foreground">
            Hello {invitation.first_name}, please set your password to complete your registration.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Set Your Password</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account & Continue'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
