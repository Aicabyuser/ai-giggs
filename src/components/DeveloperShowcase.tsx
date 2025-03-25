import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DeveloperCardProps {
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  skills: string[];
  projects: number;
  success: number;
}

const DeveloperCard = ({ name, specialty, avatar, rating, skills, projects, success }: DeveloperCardProps) => (
  <div className="glass-card rounded-xl p-6 flex flex-col justify-between h-full">
    <div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-display font-semibold text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{specialty}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-primary/10">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
    
    <div>
      <div className="grid grid-cols-2 gap-2 mb-4 text-center">
        <div className="bg-primary/10 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">Projects</p>
          <p className="font-semibold">{projects}</p>
        </div>
        <div className="bg-primary/10 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">Success Rate</p>
          <p className="font-semibold">{success}%</p>
        </div>
      </div>
      
      <Button variant="outline" className="w-full">View Profile</Button>
    </div>
  </div>
);

const DeveloperShowcase = () => {
  const developers = [
    {
      name: 'Sarah Chen',
      specialty: 'Computer Vision Expert',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4.9,
      skills: ['Computer Vision', 'TensorFlow', 'PyTorch'],
      projects: 37,
      success: 98
    },
    {
      name: 'Alex Johnson',
      specialty: 'NLP Specialist',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      skills: ['NLP', 'BERT', 'GPT Integration'],
      projects: 42,
      success: 96
    },
    {
      name: 'Maya Rodriguez',
      specialty: 'Machine Learning Engineer',
      avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
      rating: 4.7,
      skills: ['Deep Learning', 'Data Science', 'MLOps'],
      projects: 31,
      success: 97
    },
    {
      name: 'David Park',
      specialty: 'AI Solution Architect',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4.9,
      skills: ['Cloud AI', 'System Design', 'Enterprise'],
      projects: 26,
      success: 99
    }
  ];

  return (
    <section id="developer-showcase" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Featured Developers
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Meet Our Top AI Developers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover talented AI developers who have successfully delivered exceptional projects.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {developers.map((developer, index) => (
            <DeveloperCard key={index} {...developer} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full">
            View All Developers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeveloperShowcase;
