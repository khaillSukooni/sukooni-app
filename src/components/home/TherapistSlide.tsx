
import React from "react";
import { Card } from "@/components/ui/card";
import { Therapist } from "@/lib/types/therapist";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock, Languages } from "lucide-react";

interface TherapistSlideProps {
  therapist: Therapist;
}

const TherapistSlide = ({ therapist }: TherapistSlideProps) => {
  // Get language abbreviations
  const languageAbbreviations = therapist.languages.map(lang => {
    // Simple mapping for common languages
    const abbrevMap: Record<string, string> = {
      "English": "EN",
      "Spanish": "ES",
      "French": "FR",
      "Arabic": "AR",
      "Mandarin": "ZH",
      "Hindi": "HI",
      "Portuguese": "PT",
      "German": "DE",
      "Japanese": "JP",
      "Russian": "RU",
      "Gujarati": "GU",
    };
    return abbrevMap[lang] || lang.substring(0, 2).toUpperCase();
  });

  return (
    <Card className="overflow-hidden rounded-xl shadow-md h-full">
      <div className="h-full flex flex-col">
        {/* Therapist image */}
        <div className="bg-gray-200 h-32">
          <AspectRatio ratio={4/3} className="bg-gray-100">
            <img
              src={therapist.gender === "Female" 
                ? "/femlae.jpg" 
                : "/male.jpg"}
              alt={`${therapist.name} profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/300x400?text=Therapist";
              }}
            />
          </AspectRatio>
        </div>
        
        {/* Therapist info */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Therapist name */}
          <h3 className="font-bold text-lg mb-2">{therapist.name}</h3>
          
          {/* Specializations with dot separators */}
          <div className="text-sm text-muted-foreground mb-3">
            {therapist.specializations.map((spec, index) => (
              <React.Fragment key={spec}>
                <span>{spec}</span>
                {index < therapist.specializations.length - 1 && (
                  <span className="mx-1.5">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Languages spoken */}
          <div className="flex items-center gap-2 text-sm text-blue-600 mt-auto">
            <Languages className="h-4 w-4" />
            <span>{languageAbbreviations.join(' | ')}</span>
          </div>
          
          {/* Experience */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <Clock className="h-4 w-4" />
            <span>{therapist.yearsExperience}+ years experience</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TherapistSlide;
