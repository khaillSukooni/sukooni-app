
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { TherapistOnboardingData } from '@/lib/types/therapist-onboarding';
import { countries } from '@/lib/data/countries';
import { nationalities } from '@/lib/data/nationalities';

const basicInfoSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  country_of_residence: z.string().min(1, 'Country of residence is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

interface BasicInfoStepProps {
  data: TherapistOnboardingData;
  onNext: (data: Partial<TherapistOnboardingData>) => void;
  onSaveDraft: (data: Partial<TherapistOnboardingData>) => void;
  isSaving: boolean;
}

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' }
];

// Transform the data arrays to match ComboboxOption format
const countryOptions = countries.map(country => ({
  value: country.code,
  label: country.name
}));

const nationalityOptions = nationalities.map(nationality => ({
  value: nationality.code,
  label: nationality.name
}));

export function BasicInfoStep({ data, onNext, onSaveDraft, isSaving }: BasicInfoStepProps) {
  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      date_of_birth: data.date_of_birth || '',
      gender: data.gender || '',
      nationality: data.nationality || '',
      country_of_residence: data.country_of_residence || '',
      phone: data.phone || '',
    },
  });

  const onSubmit = (formData: BasicInfoFormData) => {
    onNext(formData);
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    onSaveDraft(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Please confirm and complete your basic information.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Combobox
                    options={GENDER_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select gender..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Combobox
                    options={nationalityOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select nationality..."
                    searchPlaceholder="Search nationalities..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country_of_residence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Residence</FormLabel>
                <FormControl>
                  <Combobox
                    options={countryOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select country..."
                    searchPlaceholder="Search countries..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="+1 (555) 123-4567" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
