
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TherapistOnboardingData, ONBOARDING_STEPS, OnboardingStep } from '@/lib/types/therapist-onboarding';
import { toast } from '@/components/ui/sonner';

export function useTherapistOnboarding() {
  const [data, setData] = useState<TherapistOnboardingData>({});
  const [currentStep, setCurrentStep] = useState<number>(ONBOARDING_STEPS.BASIC_INFO);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing data on mount
  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      const { data: therapistData, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading therapist data:', error);
        return;
      }

      if (therapistData) {
        const formattedData = {
          ...(therapistData.draft_data || {}),
          onboarding_step: therapistData.onboarding_step,
          onboarding_completed: therapistData.onboarding_completed,
        };
        setData(formattedData);
        setCurrentStep(therapistData.onboarding_step || ONBOARDING_STEPS.BASIC_INFO);
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStepData = (stepData: Partial<TherapistOnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const saveDraft = async (stepData?: Partial<TherapistOnboardingData>) => {
    try {
      setIsSaving(true);
      const dataToSave = stepData ? { ...data, ...stepData } : data;
      
      const { error } = await supabase.rpc('save_therapist_draft', {
        step_number: currentStep,
        step_data: dataToSave as any
      });

      if (error) throw error;
      
      if (stepData) {
        setData(prev => ({ ...prev, ...stepData }));
      }
      
      console.log('Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = async (stepData?: Partial<TherapistOnboardingData>) => {
    if (stepData) {
      await saveDraft(stepData);
    }
    
    if (currentStep < ONBOARDING_STEPS.REVIEW) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > ONBOARDING_STEPS.BASIC_INFO) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = async () => {
    try {
      setIsSaving(true);
      const { error } = await supabase.rpc('complete_therapist_onboarding', {
        final_data: data as any
      });

      if (error) throw error;
      
      toast.success('Onboarding completed successfully!');
      return true;
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const uploadFile = async (file: File, folder: string) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('therapist-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('therapist-documents')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      return null;
    }
  };

  return {
    data,
    currentStep,
    isLoading,
    isSaving,
    updateStepData,
    saveDraft,
    nextStep,
    previousStep,
    completeOnboarding,
    uploadFile,
    setCurrentStep
  };
}
