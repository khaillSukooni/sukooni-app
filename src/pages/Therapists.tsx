
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TherapistList from "@/components/therapists/TherapistList";
import TherapistFilters from "@/components/therapists/TherapistFilters";
import { Therapist } from "@/lib/types/therapist";
import { mockTherapists } from "@/lib/data/mockTherapists";

const Therapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>(mockTherapists);
  const [filters, setFilters] = useState({
    languages: [] as string[],
    specializations: [] as string[],
    gender: [] as string[]
  });

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);

    // Filter therapists based on selected criteria
    let filteredTherapists = [...mockTherapists];

    if (newFilters.languages.length > 0) {
      filteredTherapists = filteredTherapists.filter(therapist => 
        therapist.languages.some(lang => newFilters.languages.includes(lang))
      );
    }

    if (newFilters.specializations.length > 0) {
      filteredTherapists = filteredTherapists.filter(therapist => 
        therapist.specializations.some(spec => newFilters.specializations.includes(spec))
      );
    }

    if (newFilters.gender.length > 0) {
      filteredTherapists = filteredTherapists.filter(therapist => 
        newFilters.gender.includes(therapist.gender)
      );
    }

    setTherapists(filteredTherapists);
  };

  const clearFilters = () => {
    setFilters({
      languages: [],
      specializations: [],
      gender: []
    });
    setTherapists(mockTherapists);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Therapists</h1>
            <p className="text-muted-foreground max-w-2xl">
              Find the right therapist for your needs. Our team of licensed professionals 
              specializes in various areas to help you on your journey toward better mental health.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/4">
              <TherapistFilters 
                filters={filters}
                onApplyFilters={applyFilters}
                onClearFilters={clearFilters}
              />
            </aside>
            
            <div className="w-full lg:w-3/4">
              <TherapistList therapists={therapists} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Therapists;
