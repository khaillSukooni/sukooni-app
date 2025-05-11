
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-purple text-white">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <h2 className="mb-6">Start your journey today</h2>
          <p className="text-xl opacity-90 mb-8">
            Take the first step towards better mental health. Our therapists are ready to help you navigate life's challenges.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-brand-blue hover:bg-brand-gray-100"
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
}
