
import React from "react";
import { Calendar, Clock, CreditCard, Globe, Lock, Video } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-md border border-brand-gray-100 hover:shadow-lg transition-shadow">
      <div className="h-12 w-12 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-brand-gray-500">{description}</p>
    </div>
  );
};

export default function Features() {
  const features = [
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video or Audio Sessions",
      description: "Choose the format that works best for you - high-quality video or audio-only therapy sessions.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule with our easy-to-use calendar system.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Licensed Therapists",
      description: "Connect with qualified professionals specializing in various mental health areas.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure & Confidential",
      description: "Your privacy is our priority with HIPAA-compliant technology and encrypted sessions.",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Insurance Coverage",
      description: "Many insurance plans accepted, making therapy more affordable and accessible.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Access resources and support whenever you need them, day or night.",
    },
  ];

  return (
    <section className="py-20 bg-brand-gray-100/50">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="mb-6">How TherapyTalk Works</h2>
          <p className="text-xl text-brand-gray-600">
            Our platform makes it easy to find the right therapist and start your mental health journey from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
