
export interface TherapistOnboardingData {
  // Step 1: Basic Information (from invitation)
  email?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  nationality?: string;
  country_of_residence?: string;
  phone?: string;
  
  // Step 2: Languages & Specialties
  languages?: string[];
  specializations?: string[];
  
  // Step 3: Education
  education_level?: string;
  degree_field?: string;
  institution?: string;
  graduation_year?: number;
  degree_document_url?: string;
  
  // Step 4: Therapeutic Approaches
  therapeutic_approaches?: string[];
  years_experience?: number;
  
  // Step 5: Professional Practice
  practice_history?: PracticeHistoryEntry[];
  
  // Step 6: License Details
  license_number?: string;
  license_state?: string;
  license_expiry_date?: string;
  license_document_url?: string;
  
  // Step 7: Local ID
  local_id_type?: string;
  local_id_number?: string;
  local_id_document_url?: string;
  
  // Step 8: Training & Certifications
  certifications?: CertificationEntry[];
  
  // Step 9: Profile & Bio
  bio?: string;
  profile_image_url?: string;
  hourly_rate?: number;
  
  // Meta
  onboarding_step?: number;
  onboarding_completed?: boolean;
  
  // Index signature for Supabase compatibility
  [key: string]: any;
}

export interface PracticeHistoryEntry {
  id?: string;
  workplace_name: string;
  position: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
}

export interface CertificationEntry {
  id?: string;
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  certificate_document_url?: string;
}

export const ONBOARDING_STEPS = {
  BASIC_INFO: 1,
  LANGUAGES_SPECIALTIES: 2,
  EDUCATION: 3,
  THERAPEUTIC_APPROACHES: 4,
  PRACTICE_HISTORY: 5,
  LICENSE: 6,
  LOCAL_ID: 7,
  CERTIFICATIONS: 8,
  PROFILE_BIO: 9,
  REVIEW: 10
} as const;

export type OnboardingStep = typeof ONBOARDING_STEPS[keyof typeof ONBOARDING_STEPS];

export const EDUCATION_LEVELS = [
  { value: 'bachelor', label: 'Bachelor\'s Degree' },
  { value: 'master', label: 'Master\'s Degree' },
  { value: 'doctorate', label: 'Doctorate (Ph.D.)' },
  { value: 'other', label: 'Other' }
];

export const ID_TYPES = [
  { value: 'national_id', label: 'National ID' },
  { value: 'passport', label: 'Passport' },
  { value: 'driver_license', label: 'Driver\'s License' },
  { value: 'other', label: 'Other Government ID' }
];
