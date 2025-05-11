
import React from "react";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
}

const Testimonial = ({ content, author, role }: TestimonialProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-10 w-10 text-brand-blue/30 mb-4" />
        <p className="text-brand-gray-700 flex-grow">{content}</p>
        <div className="mt-6">
          <p className="font-semibold">{author}</p>
          <p className="text-brand-gray-500 text-sm">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Sukooni has completely transformed my therapy experience. The convenience of accessing sessions from home has made it possible for me to prioritize my mental health.",
      author: "Sara M.",
      role: "Client"
    },
    {
      content: "As someone with a busy schedule, the flexibility of booking sessions that fit around my life has been game-changing. My therapist is excellent.",
      author: "Ahmed K.",
      role: "Client"
    },
    {
      content: "I was skeptical about online therapy at first, but the platform is so easy to use and the connection with my therapist feels just as meaningful as in-person.",
      author: "Layla T.",
      role: "Client"
    }
  ];

  return (
    <section className="py-20 bg-brand-gray-100/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-brand-gray-600">
            Real stories from people who have experienced the benefits of our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
