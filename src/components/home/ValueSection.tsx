
import React from "react";
import { CheckCircle } from "lucide-react";

const ValueSection = () => {
  return (
    <section className="py-20 bg-[#FEF9EE] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We are dedicated to making world-class therapy
                <span className="gradient-text"> accessible for everyone</span>
              </h2>
              <p className="text-brand-gray-600 text-lg">
                Our platform connects you with licensed professionals who provide personalized support for your mental health journey.
              </p>
            </div>
            
            <div className="space-y-4">
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
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl"></div>
              <img
                src="/lovable-uploads/7f63572a-7bec-473c-a714-d59f3f462ab7.png"
                alt="Smiling man in light shirt"
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
