
import React from 'react';
import { User, MessageSquare, Star, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

export interface Developer {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  skills: string[];
  projects: number;
  matchPercentage: number;
}

interface DeveloperCardProps {
  developer: Developer;
  onContact: () => void;
}

const DeveloperCard = ({ developer, onContact }: DeveloperCardProps) => {
  const { toast } = useToast();
  
  return (
    <Card key={developer.id} className="overflow-hidden">
      <div className="bg-primary/5 p-2 flex items-center justify-between">
        <span className="text-primary font-medium">
          {developer.matchPercentage}% Match
        </span>
        <span className="flex items-center text-sm text-muted-foreground">
          Available to start immediately
        </span>
      </div>
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border border-border flex-shrink-0">
              <img 
                src={developer.avatar} 
                alt={developer.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            <div>
              <h3 className="font-display text-xl font-semibold">{developer.name}</h3>
              <p className="text-muted-foreground">{developer.specialty}</p>
              
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{developer.rating}/5</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{developer.projects} projects</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {developer.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="bg-secondary/50 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:ml-auto flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              asChild
            >
              <Link to={`/developer/${developer.id}`}>
                <User className="h-4 w-4" />
                View Profile
              </Link>
            </Button>
            
            <Button 
              className="flex items-center gap-2"
              onClick={onContact}
            >
              <MessageSquare className="h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperCard;
