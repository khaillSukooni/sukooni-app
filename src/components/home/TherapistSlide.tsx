
import React from "react";
import { Card } from "@/components/ui/card";
import { Therapist } from "@/lib/types/therapist";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Circle, Languages, Clock } from "lucide-react";

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
      <div className="relative h-full">
        <AspectRatio ratio={3 / 4} className="bg-gray-100">
          {/* Gender-specific placeholder image */}
          <div className="h-full w-full flex items-center justify-center">
            <img
              src={therapist.gender === "Female" 
                ? "/lovable-uploads/a4adbbea-47b4-4681-b22e-3611f808aff8.png" 
                : "/lovable-uploads/7dde54d9-0067-48be-b351-523fc9d3c6d9.png"}
              alt={`${therapist.name} profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a default image if the specified one fails to load
                e.currentTarget.src = "https://via.placeholder.com/300x400?text=Therapist";
              }}
            />
          </div>
        </AspectRatio>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-sm p-4 space-y-2">
          {/* Therapist name */}
          <h3 className="font-bold text-lg">{therapist.name}</h3>
          
          {/* Specializations with subtle separators - Fixed React Fragment warning by removing data-lov-id */}
          <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {therapist.specializations.map((spec, index) => (
              <React.Fragment key={spec}>
                <span>{spec}</span>
                {index < therapist.specializations.length - 1 && (
                  <Circle className="h-1.5 w-1.5 text-brand-blue/60" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col gap-1 mt-2 text-sm text-muted-foreground pt-1">
            {/* Languages spoken */}
            <div className="flex items-center gap-1.5">
              <Languages className="h-4 w-4 text-brand-blue" />
              <span>{languageAbbreviations.join(' | ')}</span>
            </div>
            
            {/* Experience - moved to its own line and using clock icon */}
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-blue" />
              <span>{therapist.yearsExperience}+ years experience</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TherapistSlide;
