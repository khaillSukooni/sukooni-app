
import React from "react";
import { Card } from "@/components/ui/card";
import { Therapist } from "@/lib/types/therapist";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface TherapistSlideProps {
  therapist: Therapist;
}

const TherapistSlide = ({ therapist }: TherapistSlideProps) => {
  return (
    <Card className="overflow-hidden rounded-xl shadow-md h-full">
      <div className="relative h-full">
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <img 
            src={therapist.profileImage || "/placeholder.svg"} 
            alt={`Photo of ${therapist.name}`}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4">
          <h3 className="font-semibold text-xl mb-1">{therapist.name}</h3>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p>{therapist.languages.join(", ")}</p>
            <p>{therapist.yearsExperience}+ Years Experience</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TherapistSlide;
