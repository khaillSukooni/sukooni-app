
import { Progress } from '@/components/ui/progress';
import { ONBOARDING_STEPS } from '@/lib/types/therapist-onboarding';

interface OnboardingProgressProps {
  currentStep: number;
}

const STEP_LABELS = {
  [ONBOARDING_STEPS.BASIC_INFO]: 'Basic Information',
  [ONBOARDING_STEPS.LANGUAGES_SPECIALTIES]: 'Languages & Specialties',
  [ONBOARDING_STEPS.EDUCATION]: 'Education',
  [ONBOARDING_STEPS.THERAPEUTIC_APPROACHES]: 'Therapeutic Approaches',
  [ONBOARDING_STEPS.PRACTICE_HISTORY]: 'Practice History',
  [ONBOARDING_STEPS.LICENSE]: 'License Details',
  [ONBOARDING_STEPS.LOCAL_ID]: 'Local ID',
  [ONBOARDING_STEPS.CERTIFICATIONS]: 'Certifications',
  [ONBOARDING_STEPS.PROFILE_BIO]: 'Profile & Bio',
  [ONBOARDING_STEPS.REVIEW]: 'Review & Submit'
};

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  const totalSteps = Object.keys(STEP_LABELS).length;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium">
          {STEP_LABELS[currentStep as keyof typeof STEP_LABELS]}
        </span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
