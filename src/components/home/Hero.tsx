
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-gray-100/50 to-brand-gray-100/80 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 bg-[radial-gradient(circle_at_70%_90%,rgba(14,165,233,0.15),transparent_50%)]"></div>
      </div>
      
      <div className="container-tight relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <div className="animate-fade-up">
              <span className="inline-block bg-brand-blue/10 text-brand-blue text-sm font-medium px-3 py-1 rounded-full mb-5">
                Online Therapy Made Simple
              </span>
              <h1 className="font-bold mb-6 leading-tight">
                Your journey to better mental health starts <span className="gradient-text">here</span>
              </h1>
              <p className="text-brand-gray-600 text-lg mb-8">
                Connect with licensed therapists for convenient, confidential, and effective online therapy sessions from the comfort of your home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium" asChild>
                  <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="font-medium" asChild>
                  <Link to="/therapists">Browse Therapists</Link>
                </Button>
              </div>
              
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full bg-brand-gray-300 border-2 border-white"></div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-brand-gray-900">Trusted by 1,000+ clients</p>
                  <div className="flex text-yellow-400 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 animate-fade-up">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden aspect-[4/3]">
                <div className="h-full w-full bg-brand-gray-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-brand-blue/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-brand-gray-500">Therapy session placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
