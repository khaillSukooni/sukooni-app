
export interface TherapistInvitation {
  id: string;
  invited_by: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  nationality: string;
  country_of_residence: string;
  invitation_token: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTherapistInvitationRequest {
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  nationality: string;
  country_of_residence: string;
}
