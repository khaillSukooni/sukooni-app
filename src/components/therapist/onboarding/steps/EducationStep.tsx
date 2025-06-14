
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { TherapistOnboardingData, EDUCATION_LEVELS } from '@/lib/types/therapist-onboarding';

const educationSchema = z.object({
  education_level: z.string().min(1, 'Education level is required'),
  degree_field: z.string().min(1, 'Degree field is required'),
  institution: z.string().min(1, 'Institution is required'),
  graduation_year: z.number().min(1950, 'Invalid graduation year').max(new Date().getFullYear(), 'Graduation year cannot be in the future'),
});

type EducationFormData = z.infer<typeof educationSchema>;

interface EducationStepProps {
  data: TherapistOnboardingData;
  onNext: (data: Partial<TherapistOnboardingData>) => void;
  onPrevious: () => void;
  onSaveDraft: (data: Partial<TherapistOnboardingData>) => void;
  onUploadFile: (file: File, folder: string) => Promise<string | null>;
  isSaving: boolean;
}

export function EducationStep({ 
  data, onNext, onPrevious, onSaveDraft, onUploadFile, isSaving 
}: EducationStepProps) {
  const [degreeDocument, setDegreeDocument] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education_level: data.education_level || '',
      degree_field: data.degree_field || '',
      institution: data.institution || '',
      graduation_year: data.graduation_year || new Date().getFullYear(),
    },
  });

  const onSubmit = async (formData: EducationFormData) => {
    let degree_document_url = data.degree_document_url;

    if (degreeDocument) {
      setIsUploading(true);
      degree_document_url = await onUploadFile(degreeDocument, 'degrees');
      setIsUploading(false);
      
      if (!degree_document_url) {
        return; // Upload failed, don't proceed
      }
    }

    onNext({ ...formData, degree_document_url });
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    onSaveDraft(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDegreeDocument(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
        <p className="text-muted-foreground">
          Please provide your educational background and upload your degree certificate.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="education_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education Level</FormLabel>
                <FormControl>
                  <Combobox
                    options={EDUCATION_LEVELS}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select education level..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="degree_field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree Field</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Psychology, Clinical Psychology, Counseling" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="University or College name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="graduation_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Graduation Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    min={1950}
                    max={new Date().getFullYear()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Degree Certificate (Required)</label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            {data.degree_document_url && (
              <p className="text-sm text-green-600">✓ Document uploaded previously</p>
            )}
            {degreeDocument && (
              <p className="text-sm text-blue-600">New file selected: {degreeDocument.name}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </p>
          </div>

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
            <Button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Next'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
