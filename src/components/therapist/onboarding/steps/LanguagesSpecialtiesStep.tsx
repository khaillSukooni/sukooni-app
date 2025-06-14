
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { TherapistOnboardingData } from '@/lib/types/therapist-onboarding';

const languagesSpecialtiesSchema = z.object({
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  specializations: z.array(z.string()).min(1, 'Please select at least one specialization'),
});

type LanguagesSpecialtiesFormData = z.infer<typeof languagesSpecialtiesSchema>;

interface LanguagesSpecialtiesStepProps {
  data: TherapistOnboardingData;
  onNext: (data: Partial<TherapistOnboardingData>) => void;
  onPrevious: () => void;
  onSaveDraft: (data: Partial<TherapistOnboardingData>) => void;
  isSaving: boolean;
}

const LANGUAGES = [
  'English', 'Arabic', 'French', 'Spanish', 'German', 'Italian', 'Portuguese', 
  'Turkish', 'Kurdish', 'Persian/Farsi', 'Urdu', 'Hindi', 'Other'
];

const SPECIALIZATIONS = [
  'Anxiety Disorders', 'Depression', 'Trauma & PTSD', 'Addiction & Substance Abuse',
  'Eating Disorders', 'Bipolar Disorder', 'OCD', 'ADHD', 'Autism Spectrum',
  'Personality Disorders', 'Grief & Loss', 'Relationship Issues', 'Family Therapy',
  'Child & Adolescent', 'Couples Therapy', 'LGBTQ+ Issues', 'Cultural Issues',
  'Workplace Stress', 'Life Transitions', 'Other'
];

export function LanguagesSpecialtiesStep({ 
  data, onNext, onPrevious, onSaveDraft, isSaving 
}: LanguagesSpecialtiesStepProps) {
  const form = useForm<LanguagesSpecialtiesFormData>({
    resolver: zodResolver(languagesSpecialtiesSchema),
    defaultValues: {
      languages: data.languages || [],
      specializations: data.specializations || [],
    },
  });

  const onSubmit = (formData: LanguagesSpecialtiesFormData) => {
    onNext(formData);
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    onSaveDraft(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Languages & Specializations</h2>
        <p className="text-muted-foreground">
          Select the languages you speak and your areas of specialization.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">Languages Spoken</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {LANGUAGES.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language}`}
                        checked={field.value?.includes(language)}
                        onCheckedChange={(checked) => {
                          const currentLanguages = field.value || [];
                          if (checked) {
                            field.onChange([...currentLanguages, language]);
                          } else {
                            field.onChange(currentLanguages.filter(l => l !== language));
                          }
                        }}
                      />
                      <label
                        htmlFor={`language-${language}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {language}
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
            name="specializations"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">Specializations</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {SPECIALIZATIONS.map((specialization) => (
                    <div key={specialization} className="flex items-center space-x-2">
                      <Checkbox
                        id={`spec-${specialization}`}
                        checked={field.value?.includes(specialization)}
                        onCheckedChange={(checked) => {
                          const currentSpecs = field.value || [];
                          if (checked) {
                            field.onChange([...currentSpecs, specialization]);
                          } else {
                            field.onChange(currentSpecs.filter(s => s !== specialization));
                          }
                        }}
                      />
                      <label
                        htmlFor={`spec-${specialization}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {specialization}
                      </label>
                    </div>
                  ))}
                </div>
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
