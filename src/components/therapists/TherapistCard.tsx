
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Languages, Clock, ChevronDown, ChevronUp, UserRound } from "lucide-react";
import { Therapist } from "@/lib/types/therapist";

interface TherapistCardProps {
  therapist: Therapist;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ 
  therapist, 
  isExpanded, 
  onToggleExpand 
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  };

  return (
    <div className="relative h-full">
      <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex gap-4 items-center">
              <Avatar className="h-16 w-16 border bg-primary/5">
                <AvatarImage src="/placeholder.svg" alt={therapist.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-foreground flex items-center justify-center">
                  <UserRound className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{therapist.name}</CardTitle>
                <CardDescription className="mt-1 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {therapist.yearsExperience} years experience
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Languages</p>
              <div className="flex flex-wrap gap-1">
                {therapist.languages.map((language, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <Languages className="h-3 w-3 mr-1" />
                    <span>{language}</span>
                    {index < therapist.languages.length - 1 && <span className="mx-1">•</span>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Specializations</p>
              <div className="flex flex-wrap gap-1">
                {therapist.specializations.map((specialization, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/5">
                    {specialization}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-sm">{therapist.shortBio}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            onClick={onToggleExpand} 
            className="w-full text-primary"
          >
            {isExpanded ? (
              <span className="flex items-center">
                Show Less <ChevronUp className="ml-1 h-4 w-4" />
              </span>
            ) : (
              <span className="flex items-center">
                Learn More <ChevronDown className="ml-1 h-4 w-4" />
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {isExpanded && (
        <div className="mt-2 p-4 border rounded-lg bg-white shadow-md">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">About Me</h4>
              <p className="text-sm">{therapist.longBio}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Qualifications</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {therapist.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Areas of Focus</h4>
              <div className="flex flex-wrap gap-1">
                {therapist.focusAreas.map((area, index) => (
                  <Badge key={index} variant="secondary" className="bg-secondary/10">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button className="w-full">Book a Session</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistCard;
