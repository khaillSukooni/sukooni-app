
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
      {/* Head */}
      <ellipse cx="100" cy="60" rx="40" ry="45" fill="#E8E8E8" />
      
      {/* Neck */}
      <path d="M90 100V110 H110 V100 Z" fill="#E8E8E8" />
      
      {/* Shoulders and torso */}
      <path
        d="M60 130C60 115 70 110 90 105H110C130 110 140 115 140 130V230C140 230 140 260 100 260C60 260 60 230 60 230V130Z"
        fill="#AAAAAA"
      />
      
      {/* Collar and jacket details */}
      <path
        d="M90 105V130H110V105"
        stroke="#888888"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Jacket lapels */}
      <path
        d="M90 105L75 140M110 105L125 140"
        stroke="#888888"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Shoulder detail */}
      <path 
        d="M70 125C75 115 85 110 90 105M130 125C125 115 115 110 110 105" 
        stroke="#888888" 
        strokeWidth="1" 
        fill="none" 
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
      {/* Head */}
      <ellipse cx="100" cy="60" rx="40" ry="45" fill="#E8E8E8" />
      
      {/* Neck */}
      <path d="M90 100V110 H110 V100 Z" fill="#E8E8E8" />
      
      {/* Shoulders and torso */}
      <path
        d="M55 135C55 115 75 110 95 105H105C125 110 145 115 145 135V240C145 240 145 260 100 260C55 260 55 240 55 240V135Z"
        fill="#AAAAAA"
      />
      
      {/* Shirt collar */}
      <path
        d="M95 105V140H105V105"
        stroke="#888888"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Tie */}
      <path
        d="M100 110V160M95 115L100 125L105 115M95 160H105"
        stroke="#888888"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Suit jacket lapels */}
      <path
        d="M95 105L75 140M105 105L125 140"
        stroke="#888888"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Shoulder detail */}
      <path 
        d="M75 120C80 115 90 110 95 105M125 120C120 115 110 110 105 105" 
        stroke="#888888" 
        strokeWidth="1" 
        fill="none" 
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
