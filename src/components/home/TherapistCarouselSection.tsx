
import React, { useEffect, useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import TherapistSlide from "./TherapistSlide";
import { mockTherapists } from "@/lib/data/mockTherapists";

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

const TherapistCarouselSection = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  // Setup autoplay
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_INTERVAL);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [api]);
  
  // Handle slide change
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark-blue">
            Our Experienced Therapists
          </h2>
          <p className="text-lg text-brand-black/80">
            Connect with licensed professionals who speak your language
          </p>
        </div>

        <div className="relative px-4 md:px-10 max-w-5xl mx-auto">
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {mockTherapists.map((therapist, index) => (
                <CarouselItem key={therapist.id} className="md:basis-1/2 lg:basis-1/3 pl-4 sm:pl-6">
                  <div className="h-full">
                    <TherapistSlide therapist={therapist} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-0" />
            <CarouselNext className="hidden md:flex right-0" />
          </Carousel>
          
          {/* Carousel indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {mockTherapists.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  current === index ? "bg-brand-blue" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapistCarouselSection;
