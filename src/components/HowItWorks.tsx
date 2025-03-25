import React from 'react';
import { MessageCircle, Users, Calendar, CheckCircle } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Step = ({ number, title, description, icon }: StepProps) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left">
    <div className="glass rounded-xl w-12 h-12 flex items-center justify-center mb-4">
      {icon}
    </div>
    <div className="flex items-center gap-2 mb-2">
      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
        Step {number}
      </span>
      <h3 className="font-display font-semibold text-lg">{title}</h3>
    </div>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            The Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            How AI-Giggs Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform simplifies finding the perfect AI developer for your project
            through an intelligent, conversational experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <Step 
            number={1}
            title="Chat with AI"
            description="Describe your project needs through our conversational AI interface to begin the matching process."
            icon={<MessageCircle className="h-6 w-6 text-primary" />}
          />
          <Step 
            number={2}
            title="Find Matches"
            description="Our AI analyzes your requirements and identifies the most qualified developers for your specific needs."
            icon={<Users className="h-6 w-6 text-primary" />}
          />
          <Step 
            number={3}
            title="Select & Schedule"
            description="Review developer profiles, previous work, and ratings to choose your perfect match."
            icon={<Calendar className="h-6 w-6 text-primary" />}
          />
          <Step 
            number={4}
            title="Collaborate"
            description="Work together through our integrated platform with secure communication and payment systems."
            icon={<CheckCircle className="h-6 w-6 text-primary" />}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
