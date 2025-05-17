
import React from "react";
import { Card } from "@/components/ui/card";
import { Therapist } from "@/lib/types/therapist";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Circle, Languages, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

  // Custom SVG silhouettes based on gender
  const FemaleSilhouette = () => (
    <svg
      viewBox="0 0 200 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M100 60C111 60 120 51 120 40C120 29 111 20 100 20C89 20 80 29 80 40C80 51 89 60 100 60Z"
        fill="#888888"
      />
      <path
        d="M135 110C135 85 120 65 100 65C80 65 65 85 65 110L60 170C60 175 63 178 68 180L95 190V280H105V190L132 180C137 178 140 175 140 170L135 110Z"
        fill="#888888"
      />
      <path
        d="M140 90C140 80 135 75 130 75H115C115 75 120 95 115 105C110 115 100 120 100 120C100 120 90 115 85 105C80 95 85 75 85 75H70C65 75 60 80 60 90C60 100 70 120 75 125C80 130 100 140 100 140C100 140 120 130 125 125C130 120 140 100 140 90Z"
        fill="#888888"
      />
    </svg>
  );

  const MaleSilhouette = () => (
    <svg
      viewBox="0 0 200 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M100 60C111 60 120 51 120 40C120 29 111 20 100 20C89 20 80 29 80 40C80 51 89 60 100 60Z"
        fill="#888888"
      />
      <path
        d="M65 75C65 75 65 105 65 115C65 125 70 140 70 140L65 200H85V280H95V200H105V280H115V200H135L130 140C130 140 135 125 135 115C135 105 135 75 135 75H65Z"
        fill="#888888"
      />
      <path
        d="M135 75C135 70 130 65 125 65H75C70 65 65 70 65 75C65 75 65 80 70 85H130C135 80 135 75 135 75Z"
        fill="#888888"
      />
    </svg>
  );

  return (
    <Card className="overflow-hidden rounded-xl shadow-md h-full">
      <div className="relative h-full">
        <AspectRatio ratio={3 / 4} className="bg-gray-100">
          {/* Gender-specific silhouette avatar */}
          <div className="h-full w-full flex items-center justify-center">
            {therapist.gender === "Female" ? <FemaleSilhouette /> : <MaleSilhouette />}
          </div>
        </AspectRatio>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-sm p-4 space-y-2">
          {/* Therapist name */}
          <h3 className="font-bold text-lg">{therapist.name}</h3>
          
          {/* Specializations with subtle separators */}
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
