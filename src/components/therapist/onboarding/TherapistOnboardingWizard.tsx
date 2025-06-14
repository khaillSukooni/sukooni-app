
import { useTherapistOnboarding } from '@/hooks/useTherapistOnboarding';
import { OnboardingProgress } from './OnboardingProgress';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { LanguagesSpecialtiesStep } from './steps/LanguagesSpecialtiesStep';
import { EducationStep } from './steps/EducationStep';
import { TherapeuticApproachesStep } from './steps/TherapeuticApproachesStep';
import { ProfileBioStep } from './steps/ProfileBioStep';
import { ReviewStep } from './steps/ReviewStep';
import { ONBOARDING_STEPS } from '@/lib/types/therapist-onboarding';
import { useNavigate } from 'react-router-dom';

export function TherapistOnboardingWizard() {
  const navigate = useNavigate();
  const {
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
  } = useTherapistOnboarding();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleComplete = async () => {
    const success = await completeOnboarding();
    if (success) {
      navigate('/dashboard');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case ONBOARDING_STEPS.BASIC_INFO:
        return (
          <BasicInfoStep
            data={data}
            onNext={nextStep}
            onSaveDraft={saveDraft}
            isSaving={isSaving}
          />
        );
      case ONBOARDING_STEPS.LANGUAGES_SPECIALTIES:
        return (
          <LanguagesSpecialtiesStep
            data={data}
            onNext={nextStep}
            onPrevious={previousStep}
            onSaveDraft={saveDraft}
            isSaving={isSaving}
          />
        );
      case ONBOARDING_STEPS.EDUCATION:
        return (
          <EducationStep
            data={data}
            onNext={nextStep}
            onPrevious={previousStep}
            onSaveDraft={saveDraft}
            onUploadFile={uploadFile}
            isSaving={isSaving}
          />
        );
      case ONBOARDING_STEPS.THERAPEUTIC_APPROACHES:
        return (
          <TherapeuticApproachesStep
            data={data}
            onNext={nextStep}
            onPrevious={previousStep}
            onSaveDraft={saveDraft}
            isSaving={isSaving}
          />
        );
      case ONBOARDING_STEPS.PROFILE_BIO:
        return (
          <ProfileBioStep
            data={data}
            onNext={nextStep}
            onPrevious={previousStep}
            onSaveDraft={saveDraft}
            isSaving={isSaving}
          />
        );
      case ONBOARDING_STEPS.REVIEW:
        return (
          <ReviewStep
            data={data}
            onPrevious={previousStep}
            onSubmit={handleComplete}
            isSubmitting={isSaving}
          />
        );
      default:
        return <div>Step not implemented yet</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8">
        <OnboardingProgress currentStep={currentStep} />
        {renderStep()}
      </div>
    </div>
  );
}
