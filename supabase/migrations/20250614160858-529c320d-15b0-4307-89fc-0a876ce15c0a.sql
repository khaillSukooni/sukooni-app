
-- Add file storage bucket for therapist documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('therapist-documents', 'therapist-documents', false);

-- Create storage policies for therapist documents
CREATE POLICY "Therapists can upload their own documents" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'therapist-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Therapists can view their own documents" 
ON storage.objects FOR SELECT 
USING (
  bucket_id = 'therapist-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Admins can view all therapist documents" 
ON storage.objects FOR SELECT 
USING (
  bucket_id = 'therapist-documents' 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Extend therapists table with all required fields
ALTER TABLE public.therapists 
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS nationality text,
ADD COLUMN IF NOT EXISTS country_of_residence text,
ADD COLUMN IF NOT EXISTS languages text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS specializations text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS therapeutic_approaches text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS years_experience integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS education_level text,
ADD COLUMN IF NOT EXISTS degree_field text,
ADD COLUMN IF NOT EXISTS institution text,
ADD COLUMN IF NOT EXISTS graduation_year integer,
ADD COLUMN IF NOT EXISTS degree_document_url text,
ADD COLUMN IF NOT EXISTS license_number text,
ADD COLUMN IF NOT EXISTS license_state text,
ADD COLUMN IF NOT EXISTS license_expiry_date date,
ADD COLUMN IF NOT EXISTS license_document_url text,
ADD COLUMN IF NOT EXISTS local_id_type text,
ADD COLUMN IF NOT EXISTS local_id_number text,
ADD COLUMN IF NOT EXISTS local_id_document_url text,
ADD COLUMN IF NOT EXISTS profile_image_url text,
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_step integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS draft_data jsonb DEFAULT '{}';

-- Create practice history table
CREATE TABLE IF NOT EXISTS public.therapist_practice_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid REFERENCES public.therapists(id) ON DELETE CASCADE,
  workplace_name text NOT NULL,
  position text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  is_current boolean DEFAULT false,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS public.therapist_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid REFERENCES public.therapists(id) ON DELETE CASCADE,
  certification_name text NOT NULL,
  issuing_organization text NOT NULL,
  issue_date date NOT NULL,
  expiry_date date,
  certificate_document_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- Add RLS policies for new tables
ALTER TABLE public.therapist_practice_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_certifications ENABLE ROW LEVEL SECURITY;

-- Policies for practice history
CREATE POLICY "Therapists can manage own practice history" 
ON public.therapist_practice_history 
FOR ALL 
USING (therapist_id = auth.uid());

CREATE POLICY "Admins can view all practice history" 
ON public.therapist_practice_history 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Policies for certifications
CREATE POLICY "Therapists can manage own certifications" 
ON public.therapist_certifications 
FOR ALL 
USING (therapist_id = auth.uid());

CREATE POLICY "Admins can view all certifications" 
ON public.therapist_certifications 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Function to save draft data
CREATE OR REPLACE FUNCTION public.save_therapist_draft(
  step_number integer,
  step_data jsonb
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update or insert therapist record with draft data
  INSERT INTO public.therapists (id, onboarding_step, draft_data)
  VALUES (auth.uid(), step_number, step_data)
  ON CONFLICT (id) DO UPDATE SET
    onboarding_step = GREATEST(therapists.onboarding_step, step_number),
    draft_data = therapists.draft_data || step_data,
    updated_at = now();
    
  RETURN json_build_object('success', true);
END;
$$;

-- Function to complete therapist onboarding
CREATE OR REPLACE FUNCTION public.complete_therapist_onboarding(
  final_data jsonb
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update therapist record as completed
  UPDATE public.therapists SET
    onboarding_completed = true,
    onboarding_step = 10,
    draft_data = final_data,
    updated_at = now()
  WHERE id = auth.uid();
  
  -- Update user role to therapist
  UPDATE public.profiles 
  SET role = 'therapist'
  WHERE id = auth.uid();
  
  RETURN json_build_object('success', true);
END;
$$;
