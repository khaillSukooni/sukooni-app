
import React from "react";
import { Card } from "@/components/ui/card";
import { Therapist } from "@/lib/types/therapist";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Circle, Languages, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
        <AspectRatio ratio={3 / 4} className="bg-muted">
          {/* Uniform placeholder image */}
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage
              src="/placeholder.svg"
              alt={`Photo of ${therapist.name}`}
              className="object-cover"
            />
            <AvatarFallback className="text-4xl rounded-none">
              {therapist.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
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

          <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground pt-1">
            {/* Languages spoken */}
            <div className="flex items-center gap-1.5">
              <Languages className="h-4 w-4 text-brand-blue" />
              <span>{languageAbbreviations.join(' | ')}</span>
            </div>
            
            {/* Experience */}
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-brand-blue" />
              <span>{therapist.yearsExperience}+</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TherapistSlide;
