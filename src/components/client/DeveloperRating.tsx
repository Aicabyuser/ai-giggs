
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeveloperRatingProps {
  projectId: string;
  projectTitle: string;
  developerName: string;
  onSubmitRating: (rating: number, feedback: string) => void;
}

export const DeveloperRating = ({ 
  projectId, 
  projectTitle, 
  developerName, 
  onSubmitRating 
}: DeveloperRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive"
      });
      return;
    }

    onSubmitRating(rating, feedback);
    toast({
      title: "Rating submitted",
      description: "Thank you for your feedback"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate Developer</CardTitle>
        <CardDescription>
          Share your experience working with {developerName} on {projectTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-muted-foreground text-sm mb-2">Provide additional feedback (optional)</p>
          <Textarea
            placeholder="Share your thoughts about the developer's work..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit Rating
        </Button>
      </CardFooter>
    </Card>
  );
};
