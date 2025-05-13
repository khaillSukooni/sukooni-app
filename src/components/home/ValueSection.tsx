
import React from "react";
import { CheckCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ValueSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* On mobile: Image 1 -> Text -> Image 2 -> Features */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* First image on mobile, right side on desktop */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="relative">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl"></div>
              <div className="p-2 rounded-2xl shadow-lg bg-white">
                <div className="bg-[#FEF9EE] rounded-xl overflow-hidden">
                  <AspectRatio ratio={4/3} className="w-full">
                    <img
                      src="/lovable-uploads/aead7d07-80b0-41a5-a42c-2b5414f6bcaf.png"
                      alt="Smiling man in light shirt"
                      className="w-full h-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text block appears after first image on mobile */}
          <div className="w-full md:w-1/2 space-y-8 order-2 md:order-1 mt-8 md:mt-0">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We are dedicated to making world-class therapy
                <span className="gradient-text"> accessible for everyone</span>
              </h2>
              <p className="text-brand-gray-600 text-lg">
                Our platform connects you with licensed professionals who provide personalized support for your mental health journey.
              </p>
            </div>
          </div>
        </div>
        
        {/* Second image followed by features on mobile */}
        <div className="flex flex-col md:flex-row items-center gap-12 mt-12 md:mt-24">
          {/* Second image container */}
          <div className="w-full md:w-1/2 order-3 md:order-1">
            <div className="relative">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"></div>
              <div className="p-2 rounded-2xl shadow-lg bg-white">
                <div className="bg-[#FEF9EE] rounded-xl overflow-hidden">
                  <AspectRatio ratio={4/3} className="w-full">
                    <img
                      src="/lovable-uploads/e2d84133-723e-4eb0-9fe1-d46b149290a6.png"
                      alt="Therapist with notebook"
                      className="w-full h-full object-cover object-position-center"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features appear after second image on mobile */}
          <div className="w-full md:w-1/2 space-y-6 order-4 md:order-2 mt-8 md:mt-0">
            <div className="space-y-4">
              {[
                "Privacy-first, secure sessions",
                "Licensed & verified therapists",
                "Convenient online access"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <CheckCircle className="text-brand-teal h-6 w-6 flex-shrink-0" />
                  <p className="font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
