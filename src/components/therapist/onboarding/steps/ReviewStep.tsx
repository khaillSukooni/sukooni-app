
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TherapistOnboardingData } from '@/lib/types/therapist-onboarding';
import { Badge } from '@/components/ui/badge';

interface ReviewStepProps {
  data: TherapistOnboardingData;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ReviewStep({ data, onPrevious, onSubmit, isSubmitting }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">
          Please review all the information you've provided before submitting your application.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {data.first_name} {data.last_name}</p>
            <p><strong>Date of Birth:</strong> {data.date_of_birth}</p>
            <p><strong>Gender:</strong> {data.gender}</p>
            <p><strong>Nationality:</strong> {data.nationality}</p>
            <p><strong>Country of Residence:</strong> {data.country_of_residence}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Languages & Specializations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <strong>Languages:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.languages?.map(lang => (
                  <Badge key={lang} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </div>
            <div>
              <strong>Specializations:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.specializations?.map(spec => (
                  <Badge key={spec} variant="secondary">{spec}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Education Level:</strong> {data.education_level}</p>
            <p><strong>Degree Field:</strong> {data.degree_field}</p>
            <p><strong>Institution:</strong> {data.institution}</p>
            <p><strong>Graduation Year:</strong> {data.graduation_year}</p>
            {data.degree_document_url && (
              <p className="text-green-600">✓ Degree certificate uploaded</p>
            )}
          </CardContent>
        </Card>

        {data.therapeutic_approaches && data.therapeutic_approaches.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Therapeutic Approaches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {data.therapeutic_approaches.map(approach => (
                  <Badge key={approach} variant="outline">{approach}</Badge>
                ))}
              </div>
              <p className="mt-2"><strong>Years of Experience:</strong> {data.years_experience}</p>
            </CardContent>
          </Card>
        )}

        {data.license_number && (
          <Card>
            <CardHeader>
              <CardTitle>License Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>License Number:</strong> {data.license_number}</p>
              <p><strong>License State:</strong> {data.license_state}</p>
              <p><strong>Expiry Date:</strong> {data.license_expiry_date}</p>
              {data.license_document_url && (
                <p className="text-green-600">✓ License document uploaded</p>
              )}
            </CardContent>
          </Card>
        )}

        {data.bio && (
          <Card>
            <CardHeader>
              <CardTitle>Professional Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{data.bio}</p>
              {data.hourly_rate && (
                <p className="mt-2"><strong>Hourly Rate:</strong> ${data.hourly_rate}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
}
