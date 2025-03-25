
import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Review {
  id: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface ProjectReviewsProps {
  reviews: Review[];
}

const ProjectReviews = ({ reviews }: ProjectReviewsProps) => {
  const { toast } = useToast();
  
  const handleMarkHelpful = (reviewId: number) => {
    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback!",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Project Reviews</h3>
        <span className="text-sm text-muted-foreground">{reviews.length} reviews</span>
      </div>
      
      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.author.avatar} alt={review.author.name} />
                    <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{review.author.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
              
              <p className="mt-4 text-muted-foreground">{review.comment}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center gap-1"
                  onClick={() => handleMarkHelpful(review.id)}
                >
                  <ThumbsUp className="h-3 w-3" />
                  Helpful ({review.helpful})
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs flex items-center gap-1"
                  onClick={() => {
                    toast({
                      title: "Reply feature",
                      description: "This feature will be available soon.",
                    });
                  }}
                >
                  <MessageSquare className="h-3 w-3" />
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No Reviews Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              This project hasn't received any reviews yet. Check back later or be the first to leave a review.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectReviews;
