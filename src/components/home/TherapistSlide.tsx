
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

  // Professional SVG silhouettes based on gender
  const FemaleSilhouette = () => (
    <svg
      viewBox="0 0 200 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background shape */}
      <rect width="200" height="300" fill="#F8F8F8" />
      
      {/* Neck */}
      <path d="M85 80V98 H115 V80 Z" fill="#E6E6E6" />
      
      {/* Head */}
      <path 
        d="M100,25 
        a40,40 0 0 1 0,80 
        a40,40 0 0 1 0,-80" 
        fill="#FFFFFF" 
      />
      
      {/* Hair */}
      <path 
        d="M60,65 
        C60,40 75,20 100,20 
        C125,20 140,40 140,65 
        C140,35 125,15 100,15 
        C75,15 60,35 60,65" 
        fill="#E0E0E0" 
      />
      
      {/* Shoulders and Body */}
      <path 
        d="M70,100 
        L60,130 
        L60,280 
        L140,280 
        L140,130 
        L130,100 
        Z" 
        fill="#E6E6E6" 
      />
      
      {/* Suit/Dress */}
      <path 
        d="M70,100 
        L70,150 
        L85,130 
        L100,150 
        L115,130 
        L130,150 
        L130,100 
        Z" 
        fill="#D9D9D9" 
      />
      
      {/* Collar */}
      <path 
        d="M85,80 
        L85,110 
        L100,120 
        L115,110 
        L115,80 
        Z" 
        fill="#FFFFFF" 
        stroke="#E0E0E0" 
        strokeWidth="1" 
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
      {/* Background shape */}
      <rect width="200" height="300" fill="#F8F8F8" />
      
      {/* Neck */}
      <path d="M85 80V98 H115 V80 Z" fill="#E6E6E6" />
      
      {/* Head */}
      <path 
        d="M100,25 
        a40,40 0 0 1 0,80 
        a40,40 0 0 1 0,-80" 
        fill="#FFFFFF" 
      />
      
      {/* Hair */}
      <path 
        d="M60,50
        C60,30 75,15 100,15
        C125,15 140,30 140,50
        L140,60
        C140,35 130,25 100,25
        C70,25 60,35 60,60
        Z" 
        fill="#E0E0E0" 
      />
      
      {/* Shoulders and Body - Wider for male */}
      <path 
        d="M65,100 
        L50,130 
        L50,280 
        L150,280 
        L150,130 
        L135,100 
        Z" 
        fill="#E6E6E6" 
      />
      
      {/* Suit Jacket */}
      <path 
        d="M65,100 
        L65,170 
        L100,165  
        L135,170 
        L135,100 
        Z" 
        fill="#D9D9D9" 
      />
      
      {/* Shirt and Tie */}
      <path 
        d="M85,80 
        L85,150 
        L100,155 
        L115,150 
        L115,80 
        Z" 
        fill="#FFFFFF" 
        stroke="#E0E0E0" 
        strokeWidth="1" 
      />
      
      {/* Tie */}
      <path 
        d="M95,100
        L100,130
        L105,100
        Z"
        fill="#D0D0D0"
      />
      <path
        d="M97,130
        L100,155
        L103,130
        Z"
        fill="#D0D0D0"
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
