
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-brand-blue/5 blur-3xl"></div>
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-brand-teal/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-r from-brand-blue to-brand-teal rounded-3xl p-10 md:p-16 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Taking The First Step Isn't Always Easy
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            But it's worth it. Join thousands of people who have already started their journey to better mental health with Sukooni.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-brand-blue hover:bg-brand-gray-100 rounded-full px-8"
            asChild
          >
            <Link to="/signup">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
