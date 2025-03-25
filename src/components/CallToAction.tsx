import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
            Get Started Today
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Your AI Developer?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start a conversation with our AI assistant and get matched with the perfect AI developer for your project in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-8" asChild>
              <Link to="/project-matching">
                Start Matching Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2" asChild>
              <Link to="/developer-signup">
                For Developers <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
