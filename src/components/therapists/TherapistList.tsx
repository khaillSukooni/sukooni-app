
import React, { useState } from "react";
import { Therapist } from "@/lib/types/therapist";
import TherapistCard from "./TherapistCard";

interface TherapistListProps {
  therapists: Therapist[];
}

const TherapistList: React.FC<TherapistListProps> = ({ therapists }) => {
  const [expandedTherapistIds, setExpandedTherapistIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedTherapistIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div>
      {therapists.length === 0 ? (
        <div className="text-center p-8 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No therapists found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria to see more results.</p>
        </div>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {therapists.map((therapist) => (
    <TherapistCard
      key={therapist.id}
      therapist={therapist}
      isExpanded={expandedTherapistIds.has(therapist.id)}
      onToggleExpand={() => toggleExpanded(therapist.id)}
    />
  ))}
</div>

      )}
    </div>
  );
};

export default TherapistList;
