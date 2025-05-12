
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TherapistList from "@/components/therapists/TherapistList";
import TherapistFilters from "@/components/therapists/TherapistFilters";
import { Therapist } from "@/lib/types/therapist";
import { mockTherapists } from "@/lib/data/mockTherapists";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SlidersHorizontal } from "lucide-react";

const Therapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>(mockTherapists);
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>(mockTherapists);
  const [filters, setFilters] = useState({
    languages: [] as string[],
    specializations: [] as string[],
    gender: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Apply both filters and search together
  useEffect(() => {
    let result = [...mockTherapists];
    
    // Apply filters
    if (filters.languages.length > 0) {
      result = result.filter(therapist => 
        therapist.languages.some(lang => filters.languages.includes(lang))
      );
    }

    if (filters.specializations.length > 0) {
      result = result.filter(therapist => 
        therapist.specializations.some(spec => filters.specializations.includes(spec))
      );
    }

    if (filters.gender.length > 0) {
      result = result.filter(therapist => 
        filters.gender.includes(therapist.gender)
      );
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        therapist => 
          therapist.name.toLowerCase().includes(query) || 
          therapist.specializations.some(spec => spec.toLowerCase().includes(query)) ||
          therapist.shortBio.toLowerCase().includes(query) ||
          therapist.longBio.toLowerCase().includes(query)
      );
    }
    
    setFilteredTherapists(result);
  }, [filters, searchQuery]);

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      languages: [],
      specializations: [],
      gender: []
    });
    setSearchQuery("");
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
          
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3 w-full justify-between flex-wrap md:flex-nowrap">
              <div className="relative w-full md:flex-1">
                <Input
                  placeholder="Search by name or condition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Filters</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="p-4 bg-background border-0 rounded-lg shadow-md">
                      <TherapistFilters 
                        filters={filters}
                        onApplyFilters={applyFilters}
                        onClearFilters={clearFilters}
                        isCompact={true}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                
                {(filters.languages.length > 0 || filters.specializations.length > 0 || filters.gender.length > 0) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-8 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
            
            <TherapistList therapists={filteredTherapists} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Therapists;
