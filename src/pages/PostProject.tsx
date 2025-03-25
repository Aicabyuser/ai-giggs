
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react';

const PostProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally submit the form data to an API
    
    toast({
      title: "Project Posted Successfully",
      description: "Your project is now live and visible to AI developers.",
    });
    
    // Redirect to manage projects page
    navigate('/manage-projects');
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Post a New AI Project</h1>
        <p className="text-muted-foreground mt-1">Find the perfect AI developer for your needs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Provide detailed information to attract the best talent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., Building a Custom GPT Model for Customer Service" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your project in detail, including goals, requirements, and specific AI capabilities needed..." 
                className="min-h-[150px]" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label>Project Category</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Machine Learning', 'Natural Language Processing', 'Computer Vision', 
                  'Deep Learning', 'Robotics', 'Speech Recognition', 'Generative AI'].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category.toLowerCase().replace(' ', '-')} />
                    <label 
                      htmlFor={category.toLowerCase().replace(' ', '-')}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range ($500 - $10,000)</Label>
              <div className="pt-6 pb-2">
                <Slider
                  defaultValue={[2000, 5000]}
                  min={500}
                  max={10000}
                  step={100}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$2,000</span>
                <span>$5,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Project Timeline (weeks)</Label>
              <Input 
                id="timeline" 
                type="number" 
                min="1" 
                max="52" 
                placeholder="e.g., 4" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Input 
                id="skills" 
                placeholder="e.g., TensorFlow, PyTorch, NLP, Transformers" 
                required 
              />
              <p className="text-sm text-muted-foreground">Separate skills with commas</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="nda" />
                <label 
                  htmlFor="nda"
                  className="text-sm font-medium leading-none"
                >
                  This project requires an NDA
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Post Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostProject;
