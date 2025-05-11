
import React from "react";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

const Testimonial = ({ quote, author, role }: TestimonialProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 border border-brand-gray-100">
      <Quote className="h-8 w-8 text-brand-blue/40 mb-4" />
      <p className="text-brand-gray-700 mb-6 italic">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-brand-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const testimonials = [
    {
      quote: "TherapyTalk has changed my life. Being able to speak with my therapist from home made it possible for me to finally prioritize my mental health.",
      author: "Sarah J.",
      role: "Client since 2023"
    },
    {
      quote: "As someone with a busy schedule, the flexibility of online sessions has been incredible. My therapist is just as engaged and helpful as in-person therapy.",
      author: "Michael T.",
      role: "Client since 2022"
    },
    {
      quote: "The platform is so easy to use, and finding a therapist who specializes in my specific needs was seamless. I'm grateful for this service.",
      author: "Rebecca L.",
      role: "Client since 2023"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block bg-brand-teal/10 text-brand-teal text-sm font-medium px-3 py-1 rounded-full mb-5">
            Client Stories
          </span>
          <h2 className="mb-6">Hear from our community</h2>
          <p className="text-xl text-brand-gray-600">
            Real stories from real people who have experienced the benefits of online therapy with TherapyTalk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
