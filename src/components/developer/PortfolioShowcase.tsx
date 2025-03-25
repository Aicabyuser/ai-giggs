
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star } from 'lucide-react';

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  featuredProject: boolean;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: Date;
  expiration?: Date;
  badgeUrl?: string;
  verificationUrl?: string;
};

interface PortfolioShowcaseProps {
  projects: PortfolioProject[];
  certifications: Certification[];
  skills: string[];
}

export const PortfolioShowcase = ({ 
  projects, 
  certifications, 
  skills 
}: PortfolioShowcaseProps) => {
  const featuredProjects = projects.filter(p => p.featuredProject);
  
  return (
    <div className="space-y-8">
      <Tabs defaultValue="projects">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-6">
          {featuredProjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Featured Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge variant="secondary">Featured</Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {project.projectUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 h-4 w-4" />
                            View Project
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1 h-4 w-4" />
                            View Code
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold mb-4">All Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/project/${project.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{cert.title}</CardTitle>
                      <CardDescription>{cert.issuer}</CardDescription>
                    </div>
                    {cert.badgeUrl && (
                      <img 
                        src={cert.badgeUrl} 
                        alt={`${cert.title} badge`} 
                        className="h-16 w-16 object-contain"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span>Issued: {cert.date.toLocaleDateString()}</span>
                    {cert.expiration && (
                      <span>Expires: {cert.expiration.toLocaleDateString()}</span>
                    )}
                  </div>
                </CardContent>
                {cert.verificationUrl && (
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">
                        Verify Credential
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
