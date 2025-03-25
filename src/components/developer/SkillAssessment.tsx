
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Progress
} from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Check, CheckCircle, Brain, Code, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type SkillCategory = 'ai_fundamentals' | 'machine_learning' | 'deep_learning' | 'natural_language_processing' | 'computer_vision' | 'data_engineering';

export type Assessment = {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  timeEstimate: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  score?: number;
  icon: string;
};

interface SkillAssessmentProps {
  assessments: Assessment[];
  onStartAssessment: (assessmentId: string) => void;
  completedSkills: string[];
}

export const SkillAssessment = ({ 
  assessments, 
  onStartAssessment,
  completedSkills
}: SkillAssessmentProps) => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  
  const filteredAssessments = activeCategory === 'all' 
    ? assessments 
    : assessments.filter(a => a.category === activeCategory);
  
  const getAssessmentIcon = (icon: string) => {
    switch (icon) {
      case 'brain': return <Brain className="h-5 w-5" />;
      case 'code': return <Code className="h-5 w-5" />;
      case 'database': return <Database className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };
  
  const getProgressPercentage = () => {
    if (assessments.length === 0) return 0;
    return Math.round((completedSkills.length / assessments.length) * 100);
  };
  
  const handleStartAssessment = (id: string) => {
    onStartAssessment(id);
    toast({
      title: "Assessment Started",
      description: "Good luck! Complete the assessment to verify your skills.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skill Verification</CardTitle>
          <CardDescription>
            Complete assessments to verify your AI development skills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Overall Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedSkills.length} of {assessments.length} assessments completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={getProgressPercentage()} className="w-56 h-2" />
              <span className="text-sm font-medium">{getProgressPercentage()}%</span>
            </div>
          </div>
          
          {completedSkills.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Verified Skills</h3>
              <div className="flex flex-wrap gap-2">
                {completedSkills.map((skill) => (
                  <Badge key={skill} className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex overflow-auto py-2 gap-2 no-scrollbar">
        <Button 
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('all')}
        >
          All
        </Button>
        <Button 
          variant={activeCategory === 'ai_fundamentals' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('ai_fundamentals')}
        >
          AI Fundamentals
        </Button>
        <Button 
          variant={activeCategory === 'machine_learning' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('machine_learning')}
        >
          Machine Learning
        </Button>
        <Button 
          variant={activeCategory === 'natural_language_processing' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('natural_language_processing')}
        >
          NLP
        </Button>
        <Button 
          variant={activeCategory === 'computer_vision' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('computer_vision')}
        >
          Computer Vision
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.id} className={assessment.completed ? 'border-green-200' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    assessment.completed ? 'bg-green-100' : 'bg-primary/10'
                  }`}>
                    {assessment.completed ? 
                      <Award className="h-5 w-5 text-green-600" /> : 
                      getAssessmentIcon(assessment.icon)
                    }
                  </div>
                  <div>
                    <CardTitle>{assessment.title}</CardTitle>
                    <CardDescription>{assessment.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={
                  assessment.difficultyLevel === 'beginner' ? 'secondary' :
                  assessment.difficultyLevel === 'intermediate' ? 'outline' :
                  'default'
                }>
                  {assessment.difficultyLevel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Time: {assessment.timeEstimate}</span>
                <span className="text-muted-foreground">Category: {assessment.category.replace('_', ' ')}</span>
              </div>
              
              {assessment.completed && assessment.score !== undefined && (
                <div className="flex items-center mt-2 text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Completed with score: {assessment.score}%</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={assessment.completed ? "outline" : "default"}
                onClick={() => handleStartAssessment(assessment.id)}
                disabled={assessment.completed}
              >
                {assessment.completed ? "Completed" : "Start Assessment"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
