
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Bot, BarChart, Search, Workflow } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export type ProjectTemplate = {
  id: string;
  title: string;
  description: string;
  icon: 'ai' | 'bot' | 'analytics' | 'search' | 'workflow';
  estimatedBudget: [number, number]; // Range: [min, max]
  estimatedDuration: string;
};

interface ProjectTemplatesProps {
  templates: ProjectTemplate[];
  onSelectTemplate: (templateId: string) => void;
}

export const ProjectTemplates = ({ templates, onSelectTemplate }: ProjectTemplatesProps) => {
  const navigate = useNavigate();

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'ai': return <Brain className="h-6 w-6" />;
      case 'bot': return <Bot className="h-6 w-6" />;
      case 'analytics': return <BarChart className="h-6 w-6" />;
      case 'search': return <Search className="h-6 w-6" />;
      case 'workflow': return <Workflow className="h-6 w-6" />;
      default: return <Brain className="h-6 w-6" />;
    }
  };

  const handleUseTemplate = (templateId: string) => {
    onSelectTemplate(templateId);
    navigate('/post-project');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                {getIcon(template.icon)}
              </div>
              <CardTitle>{template.title}</CardTitle>
            </div>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Budget:</span>
                <span>${template.estimatedBudget[0]} - ${template.estimatedBudget[1]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Duration:</span>
                <span>{template.estimatedDuration}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleUseTemplate(template.id)} className="w-full">
              Use Template
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
