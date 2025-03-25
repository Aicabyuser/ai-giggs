import React, { useState } from 'react';
import { ArrowRight, BarChart3, Image, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UseCaseProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  estimation: {
    cost: string;
    timeline: string;
  };
  matchType: string;
}

const UseCase = ({ title, description, icon, estimation, matchType }: UseCaseProps) => (
  <div className="glass-card rounded-xl overflow-hidden h-full">
    <div className="p-6">
      <div className="glass w-12 h-12 flex items-center justify-center rounded-full mb-4">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Est. Cost</p>
          <p className="font-semibold">{estimation.cost}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Timeline</p>
          <p className="font-semibold">{estimation.timeline}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-1">Developer Match</p>
        <p className="text-sm">{matchType}</p>
      </div>
    </div>
    <div className="border-t border-border/50 p-4">
      <Button variant="ghost" className="w-full justify-between">
        Start Similar Project <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const UseCases = () => {
  const useCases = {
    ml: [
      {
        title: "Custom Image Recognition",
        description: "AI system to automatically tag and categorize product images for e-commerce stores with high accuracy.",
        icon: <Image className="h-5 w-5 text-primary" />,
        estimation: {
          cost: "$3,500 - $5,000",
          timeline: "4-6 weeks"
        },
        matchType: "Computer Vision Specialist"
      },
      {
        title: "Predictive Analytics Dashboard",
        description: "Machine learning model to predict sales trends and optimize inventory management for retail businesses.",
        icon: <BarChart3 className="h-5 w-5 text-primary" />,
        estimation: {
          cost: "$5,000 - $8,000",
          timeline: "6-8 weeks"
        },
        matchType: "Data Science Expert"
      }
    ],
    nlp: [
      {
        title: "Customer Support Chatbot",
        description: "Advanced NLP chatbot that understands context and can handle complex technical support queries.",
        icon: <MessageSquare className="h-5 w-5 text-primary" />,
        estimation: {
          cost: "$7,000 - $12,000",
          timeline: "8-10 weeks"
        },
        matchType: "NLP Specialist"
      },
      {
        title: "Sentiment Analysis Tool",
        description: "AI-powered tool that analyzes customer feedback across channels to identify improvement opportunities.",
        icon: <BarChart3 className="h-5 w-5 text-primary" />,
        estimation: {
          cost: "$4,000 - $6,000",
          timeline: "5-7 weeks"
        },
        matchType: "NLP & Data Analysis Expert"
      }
    ],
    financial: [
      {
        title: "Financial Forecasting Model",
        description: "AI model that predicts market trends and provides investment insights based on historical data.",
        icon: <BarChart3 className="h-5 w-5 text-primary" />,
        estimation: {
          cost: "$15,000 - $25,000",
          timeline: "12-16 weeks"
        },
        matchType: "Quantitative Finance Specialist"
      },
      {
        title: "Fraud Detection System",
        description: "Real-time AI system that identifies suspicious transactions and reduces false positives.",
        icon: <Image className="h-5 w-5 text-primary" />,
        estimation: {
          cost: "$10,000 - $18,000",
          timeline: "10-14 weeks"
        },
        matchType: "Security & ML Expert"
      }
    ]
  };

  return (
    <section id="use-cases" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Real-World AI Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore successful AI projects we've helped bring to life through our developer matching platform.
          </p>
        </div>
        
        <Tabs defaultValue="ml" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="ml">Machine Learning</TabsTrigger>
            <TabsTrigger value="nlp">NLP Projects</TabsTrigger>
            <TabsTrigger value="financial">Financial AI</TabsTrigger>
          </TabsList>
          
          {Object.entries(useCases).map(([category, cases]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {cases.map((useCase, index) => (
                  <UseCase key={index} {...useCase} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default UseCases;
