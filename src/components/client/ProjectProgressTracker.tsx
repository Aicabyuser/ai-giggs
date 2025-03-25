
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CheckCircle, CircleDot, Circle, ArrowRight } from "lucide-react";

type ProjectStage = {
  name: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
};

interface ProjectProgressTrackerProps {
  stages: ProjectStage[];
}

export const ProjectProgressTracker = ({ stages }: ProjectProgressTrackerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-[24px] w-0.5 bg-muted-foreground/30" />
          
          {/* Timeline steps */}
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div key={index} className="relative flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  {stage.status === 'completed' ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : stage.status === 'current' ? (
                    <CircleDot className="h-6 w-6 text-blue-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground/50" />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className={`font-medium ${
                    stage.status === 'completed' ? 'text-green-600' : 
                    stage.status === 'current' ? 'text-blue-600' : 
                    'text-muted-foreground'
                  }`}>
                    {stage.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
                
                {index < stages.length - 1 && (
                  <div className="absolute -bottom-4 left-3">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
