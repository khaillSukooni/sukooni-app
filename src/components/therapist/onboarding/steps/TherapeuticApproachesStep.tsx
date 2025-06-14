
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { TherapistOnboardingData } from '@/lib/types/therapist-onboarding';

const therapeuticApproachesSchema = z.object({
  therapeutic_approaches: z.array(z.string()).min(1, 'Please select at least one therapeutic approach'),
  years_experience: z.number().min(0, 'Years of experience must be 0 or more').max(50, 'Years of experience seems too high'),
});

type TherapeuticApproachesFormData = z.infer<typeof therapeuticApproachesSchema>;

interface TherapeuticApproachesStepProps {
  data: TherapistOnboardingData;
  onNext: (data: Partial<TherapistOnboardingData>) => void;
  onPrevious: () => void;
  onSaveDraft: (data: Partial<TherapistOnboardingData>) => void;
  isSaving: boolean;
}

const THERAPEUTIC_APPROACHES = [
  'Cognitive Behavioral Therapy (CBT)',
  'Dialectical Behavior Therapy (DBT)',
  'Acceptance and Commitment Therapy (ACT)',
  'Psychodynamic Therapy',
  'Humanistic/Person-Centered Therapy',
  'Family Systems Therapy',
  'Narrative Therapy',
  'Solution-Focused Brief Therapy',
  'Eye Movement Desensitization and Reprocessing (EMDR)',
  'Mindfulness-Based Therapy',
  'Art Therapy',
  'Play Therapy',
  'Group Therapy',
  'Other'
];

export function TherapeuticApproachesStep({ 
  data, onNext, onPrevious, onSaveDraft, isSaving 
}: TherapeuticApproachesStepProps) {
  const form = useForm<TherapeuticApproachesFormData>({
    resolver: zodResolver(therapeuticApproachesSchema),
    defaultValues: {
      therapeutic_approaches: data.therapeutic_approaches || [],
      years_experience: data.years_experience || 0,
    },
  });

  const onSubmit = (formData: TherapeuticApproachesFormData) => {
    onNext(formData);
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    onSaveDraft(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Therapeutic Approaches & Experience</h2>
        <p className="text-muted-foreground">
          Select your therapeutic approaches and specify your years of experience.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="therapeutic_approaches"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">Therapeutic Approaches</FormLabel>
                <div className="grid grid-cols-1 gap-3 mt-3">
                  {THERAPEUTIC_APPROACHES.map((approach) => (
                    <div key={approach} className="flex items-center space-x-2">
                      <Checkbox
                        id={`approach-${approach}`}
                        checked={field.value?.includes(approach)}
                        onCheckedChange={(checked) => {
                          const currentApproaches = field.value || [];
                          if (checked) {
                            field.onChange([...currentApproaches, approach]);
                          } else {
                            field.onChange(currentApproaches.filter(a => a !== approach));
                          }
                        }}
                      />
                      <label
                        htmlFor={`approach-${approach}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {approach}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="years_experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Professional Experience</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    min={0}
                    max={50}
                    placeholder="0"
                  />
                </FormControl>
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
