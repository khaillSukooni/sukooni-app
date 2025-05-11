
import React from "react";
import { UserPlus, Calendar, Video } from "lucide-react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
}

const Step = ({ icon, title, description, number }: StepProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 md:p-8">
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-brand-blue/10 rounded-full blur-xl"></div>
        <div className="relative h-20 w-20 bg-brand-blue rounded-full flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold text-sm">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-brand-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: "Sign Up",
      description: "Create your account and complete a brief assessment to help us understand your needs.",
      number: 1
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Match & Book",
      description: "Browse therapist profiles, find your match, and book a session that fits your schedule.",
      number: 2
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Connect",
      description: "Join your secure video session from anywhere on any device at your scheduled time.",
      number: 3
    }
  ];

  return (
    <section className="py-20 bg-brand-blue text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Sukooni Works</h2>
          <p className="text-lg text-white/80">
            Getting the support you need has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              number={step.number}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
