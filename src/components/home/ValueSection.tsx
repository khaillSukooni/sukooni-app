
import React from "react";
import { CheckCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ValueSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Mobile layout: stacked with first image, then text, then second image, then features */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* First image (appears first in both desktop and mobile) */}
          <div className="w-full md:w-1/2 order-1 mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-teal rounded-3xl blur opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-2">
                <AspectRatio ratio={4/5} className="bg-brand-blue/10 rounded-2xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/c2f5d2d0-79e3-4566-8274-b7fb6e23fce1.png"
                    alt="Sukooni therapy session"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          {/* Text content (second on mobile, second on desktop) */}
          <div className="w-full md:w-1/2 order-2 mb-8 md:mb-0 md:order-2">
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
          
          {/* Second image (third on mobile, doesn't exist in current desktop) */}
          <div className="w-full md:hidden order-3 mb-8">
            <div className="relative">
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
          
          {/* Features list (fourth on mobile, third on desktop) */}
          <div className="w-full md:hidden order-4 space-y-4">
            {[
              "Privacy-first, secure sessions",
              "Licensed & verified therapists",
              "Convenient online access"
            ].map((feature, index) => (
              <div key={index} className="py-2">
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
          
          {/* Desktop-only right column with second image and feature list */}
          <div className="hidden md:block md:w-1/2 md:order-3">
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
            
            <div className="space-y-4 mt-8">
              {[
                "Privacy-first, secure sessions",
                "Licensed & verified therapists",
                "Convenient online access"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl">
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
