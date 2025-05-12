
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { allLanguages, allSpecializations, allGenders } from "@/lib/data/mockTherapists";

interface FiltersState {
  languages: string[];
  specializations: string[];
  gender: string[];
}

interface TherapistFiltersProps {
  filters: FiltersState;
  onApplyFilters: (filters: FiltersState) => void;
  onClearFilters: () => void;
}

const TherapistFilters: React.FC<TherapistFiltersProps> = ({ 
  filters, 
  onApplyFilters, 
  onClearFilters 
}) => {
  const [localFilters, setLocalFilters] = useState<FiltersState>(filters);

  const toggleFilter = (category: keyof FiltersState, value: string) => {
    setLocalFilters(prev => {
      const currentValues = [...prev[category]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        return { ...prev, [category]: [...currentValues, value] };
      } else {
        currentValues.splice(index, 1);
        return { ...prev, [category]: currentValues };
      }
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({
      languages: [],
      specializations: [],
      gender: []
    });
    onClearFilters();
  };

  return (
    <div className="bg-card shadow-sm rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearFilters}
          className="h-8 text-xs"
        >
          Clear all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["languages", "specializations", "gender"]}>
        <AccordionItem value="languages">
          <AccordionTrigger className="text-sm font-medium">Languages</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {allLanguages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`language-${language}`} 
                    checked={localFilters.languages.includes(language)}
                    onCheckedChange={() => toggleFilter('languages', language)}
                  />
                  <label 
                    htmlFor={`language-${language}`}
                    className="text-sm cursor-pointer"
                  >
                    {language}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specializations">
          <AccordionTrigger className="text-sm font-medium">Specializations</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {allSpecializations.map((specialization) => (
                <div key={specialization} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`spec-${specialization}`} 
                    checked={localFilters.specializations.includes(specialization)}
                    onCheckedChange={() => toggleFilter('specializations', specialization)}
                  />
                  <label 
                    htmlFor={`spec-${specialization}`}
                    className="text-sm cursor-pointer"
                  >
                    {specialization}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gender">
          <AccordionTrigger className="text-sm font-medium">Gender</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {allGenders.map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`gender-${gender}`} 
                    checked={localFilters.gender.includes(gender)}
                    onCheckedChange={() => toggleFilter('gender', gender)}
                  />
                  <label 
                    htmlFor={`gender-${gender}`}
                    className="text-sm cursor-pointer"
                  >
                    {gender}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button 
        onClick={handleApplyFilters}
        className="w-full mt-4"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default TherapistFilters;
