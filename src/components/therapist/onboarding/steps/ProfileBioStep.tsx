
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TherapistOnboardingData } from '@/lib/types/therapist-onboarding';

const profileBioSchema = z.object({
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(1000, 'Bio must be less than 1000 characters'),
  hourly_rate: z.number().min(1, 'Hourly rate must be greater than 0').max(1000, 'Hourly rate seems too high'),
});

type ProfileBioFormData = z.infer<typeof profileBioSchema>;

interface ProfileBioStepProps {
  data: TherapistOnboardingData;
  onNext: (data: Partial<TherapistOnboardingData>) => void;
  onPrevious: () => void;
  onSaveDraft: (data: Partial<TherapistOnboardingData>) => void;
  isSaving: boolean;
}

export function ProfileBioStep({ 
  data, onNext, onPrevious, onSaveDraft, isSaving 
}: ProfileBioStepProps) {
  const form = useForm<ProfileBioFormData>({
    resolver: zodResolver(profileBioSchema),
    defaultValues: {
      bio: data.bio || '',
      hourly_rate: data.hourly_rate || 0,
    },
  });

  const onSubmit = (formData: ProfileBioFormData) => {
    onNext(formData);
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    onSaveDraft(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Professional Bio & Rates</h2>
        <p className="text-muted-foreground">
          Write a professional bio and set your hourly rate.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write a brief professional bio describing your background, approach to therapy, and what clients can expect when working with you..."
                    className="min-h-[120px]"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  {field.value?.length || 0}/1000 characters (minimum 50)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hourly_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly Rate (USD)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    min={1}
                    max={1000}
                    placeholder="150"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  Set your hourly rate in USD. This can be changed later.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-6">
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={onPrevious}>
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
            </div>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
