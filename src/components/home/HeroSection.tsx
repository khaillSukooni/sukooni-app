
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-gray-100/30 to-brand-gray-100/50">
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-16 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"></div>
        <div className="absolute bottom-8 left-8 h-64 w-64 rounded-full bg-brand-teal/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Peace of Mind, <br />
              <span className="gradient-text">Just a Tap Away</span>
            </h1>
            <p className="text-lg text-brand-gray-600 max-w-lg mx-auto md:mx-0">
              Connect with licensed therapists for convenient, confidential, and effective online therapy sessions from anywhere.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button size="lg" className="rounded-full px-6" asChild>
                <Link to="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
                <Link to="/therapists">Browse Therapists</Link>
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-white bg-brand-gray-200"
                  />
                ))}
              </div>
              <p className="text-sm text-brand-gray-600">
                <span className="font-semibold">1000+</span> satisfied clients
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-teal rounded-3xl blur opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-2 max-w-md">
                <div className="aspect-[4/5] bg-brand-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="/placeholder.svg"
                    alt="Therapy session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
