
import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Upload, UserPlus, Camera, Plus, Trash2, Eye } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const skillCategories = [
  {
    name: "Machine Learning",
    skills: [
      { id: "ml-1", name: "General Machine Learning" },
      { id: "ml-2", name: "Deep Learning" },
      { id: "ml-3", name: "Neural Networks" },
      { id: "ml-4", name: "Reinforcement Learning" }
    ]
  },
  {
    name: "Natural Language Processing",
    skills: [
      { id: "nlp-1", name: "NLP Fundamentals" },
      { id: "nlp-2", name: "Large Language Models" },
      { id: "nlp-3", name: "Sentiment Analysis" },
      { id: "nlp-4", name: "Text Generation" }
    ]
  },
  {
    name: "Computer Vision",
    skills: [
      { id: "cv-1", name: "Image Recognition" },
      { id: "cv-2", name: "Object Detection" },
      { id: "cv-3", name: "Image Generation" },
      { id: "cv-4", name: "Video Analysis" }
    ]
  },
  {
    name: "AI Development",
    skills: [
      { id: "dev-1", name: "TensorFlow" },
      { id: "dev-2", name: "PyTorch" },
      { id: "dev-3", name: "Keras" },
      { id: "dev-4", name: "Scikit-learn" }
    ]
  },
  {
    name: "Data Science",
    skills: [
      { id: "ds-1", name: "Data Analysis" },
      { id: "ds-2", name: "Data Visualization" },
      { id: "ds-3", name: "Statistical Modeling" },
      { id: "ds-4", name: "Big Data Processing" }
    ]
  }
];

// Initial skills state with more comprehensive options
const initialSkills = skillCategories.flatMap(category => 
  category.skills.map(skill => ({ 
    id: skill.id, 
    name: skill.name, 
    category: category.name, 
    level: 50 
  }))
);

const DeveloperRegistration = () => {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState(initialSkills);
  const [selectedCategory, setSelectedCategory] = useState("Machine Learning");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [projects, setProjects] = useState([{ id: 1, images: [] }]);
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRefs = useRef<{[key: number]: HTMLInputElement | null}>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const totalSteps = 4; // Added one more step for preview
  
  // Personal Info form schema
  const personalInfoSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional().or(z.literal('')),
    github: z.string().url({ message: "Please enter a valid GitHub URL." }).optional().or(z.literal('')),
    bio: z.string().min(50, { message: "Bio must be at least 50 characters." }),
    yearsOfExperience: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Years of experience must be a number."
    }),
    availableForHire: z.boolean().default(true),
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: "You must agree to the terms and conditions."
    }),
  });
  
  // Create form for personal info
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      linkedin: "",
      github: "",
      bio: "",
      yearsOfExperience: "",
      availableForHire: true,
      agreeToTerms: false,
    },
  });
  
  // Portfolio form schema - now supporting multiple projects
  const portfolioSchema = z.object({
    projects: z.array(z.object({
      title: z.string().min(2, { message: "Project title is required." }),
      description: z.string().min(20, { message: "Please provide a more detailed description." }),
      link: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
    })).min(1, { message: "Please add at least one project." }),
  });
  
  // Create form for portfolio
  const portfolioForm = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      projects: [
        {
          title: "",
          description: "",
          link: "",
        }
      ],
    },
  });
  
  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleProjectImageUpload = (projectId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProjects(prevProjects => 
          prevProjects.map(project => 
            project.id === projectId 
              ? { ...project, images: [...(project.images || []), e.target?.result as string] } 
              : project
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeProjectImage = (projectId: number, imageIndex: number) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, images: project.images.filter((_, idx) => idx !== imageIndex) } 
          : project
      )
    );
  };
  
  const handleSkillLevelChange = (skillId: string, newLevel: number[]) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.id === skillId ? { ...skill, level: newLevel[0] } : skill
      )
    );
  };
  
  const addProject = () => {
    const newProjectId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, { id: newProjectId, images: [] }]);
    
    // Update the form with the new project
    const currentProjects = portfolioForm.getValues().projects || [];
    portfolioForm.setValue('projects', [
      ...currentProjects, 
      { title: "", description: "", link: "" }
    ]);
  };
  
  const removeProject = (index: number) => {
    if (projects.length > 1) {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
      
      // Update the form
      const currentProjects = portfolioForm.getValues().projects;
      const updatedFormProjects = [...currentProjects];
      updatedFormProjects.splice(index, 1);
      portfolioForm.setValue('projects', updatedFormProjects);
    } else {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one project in your portfolio.",
        variant: "destructive",
      });
    }
  };
  
  const onSubmitPersonalInfo = (data: z.infer<typeof personalInfoSchema>) => {
    console.log("Personal Info Data:", data);
    setStep(2);
  };
  
  const onSubmitSkills = () => {
    console.log("Skills Data:", skills);
    setStep(3);
  };
  
  const onSubmitPortfolio = (data: any) => {
    console.log("Portfolio Data:", data);
    setStep(4); // Go to preview step
    setPreviewMode(true);
  };
  
  const finalSubmit = () => {
    const personalData = personalInfoForm.getValues();
    const portfolioData = portfolioForm.getValues();
    
    const completeProfile = {
      personal: personalData,
      skills: skills,
      portfolio: portfolioData,
      profileImage: profileImage,
      projectImages: projects.map(p => ({ id: p.id, images: p.images }))
    };
    
    console.log("Complete Profile:", completeProfile);
    
    // In a real app, send this data to your backend
    toast({
      title: "Registration Successful!",
      description: "Your developer profile has been created. We'll review your application and get back to you soon.",
    });
    
    // Navigate to developer dashboard or confirmation page
    setTimeout(() => {
      navigate('/developer-dashboard');
    }, 2000);
  };
  
  const getFilteredSkillsByCategory = (categoryName: string) => {
    return skills.filter(skill => skill.category === categoryName);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-20">
      <div className="container mx-auto px-4">
        {!previewMode && (
          <div className="flex items-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto">
          {!previewMode && (
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Join Our AI Developer Network
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Register as an AI developer on AI-Giggs.com to get matched with exciting projects 
                that match your skills and experience.
              </p>
            </div>
          )}
          
          {/* Step Indicator - Not shown in preview mode */}
          {!previewMode && (
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                        ${step > index + 1 ? 'bg-primary text-primary-foreground' : 
                          step === index + 1 ? 'bg-primary text-primary-foreground' : 
                          'bg-muted text-muted-foreground'}`}
                    >
                      {step > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
                    </div>
                    
                    {index < totalSteps - 1 && (
                      <div 
                        className={`h-1 flex-1 ${step > index + 1 ? 'bg-primary' : 'bg-muted'}`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Personal Info</span>
                <span>Skills Assessment</span>
                <span>Portfolio</span>
                <span>Preview</span>
              </div>
            </div>
          )}
          
          {/* Preview Mode - Shows all information collected */}
          {previewMode && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">Profile Preview</CardTitle>
                    <CardDescription>
                      Review your profile before submitting
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setPreviewMode(false)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Exit Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Personal Information Preview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Personal Information</h3>
                  <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileImage || ""} alt="Profile" />
                      <AvatarFallback className="text-lg">{personalInfoForm.getValues().fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[250px]">
                          <div className="text-sm font-medium text-muted-foreground">Full Name</div>
                          <div>{personalInfoForm.getValues().fullName}</div>
                        </div>
                        <div className="flex-1 min-w-[250px]">
                          <div className="text-sm font-medium text-muted-foreground">Email</div>
                          <div>{personalInfoForm.getValues().email}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[250px]">
                          <div className="text-sm font-medium text-muted-foreground">Years of Experience</div>
                          <div>{personalInfoForm.getValues().yearsOfExperience}</div>
                        </div>
                        <div className="flex-1 min-w-[250px]">
                          <div className="text-sm font-medium text-muted-foreground">Available for Hire</div>
                          <div>{personalInfoForm.getValues().availableForHire ? 'Yes' : 'No'}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        {personalInfoForm.getValues().linkedin && (
                          <div className="flex-1 min-w-[250px]">
                            <div className="text-sm font-medium text-muted-foreground">LinkedIn</div>
                            <div className="text-primary">{personalInfoForm.getValues().linkedin}</div>
                          </div>
                        )}
                        {personalInfoForm.getValues().github && (
                          <div className="flex-1 min-w-[250px]">
                            <div className="text-sm font-medium text-muted-foreground">GitHub</div>
                            <div className="text-primary">{personalInfoForm.getValues().github}</div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Professional Bio</div>
                        <p className="text-sm mt-1">{personalInfoForm.getValues().bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Skills Preview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Skills & Expertise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillCategories.map(category => (
                      <div key={category.name} className="space-y-2">
                        <h4 className="font-medium">{category.name}</h4>
                        <div className="space-y-2">
                          {getFilteredSkillsByCategory(category.name)
                            .sort((a, b) => b.level - a.level)
                            .map(skill => (
                              <div key={skill.id} className="flex items-center justify-between">
                                <span className="text-sm">{skill.name}</span>
                                <div className="flex items-center">
                                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary" 
                                      style={{ width: `${skill.level}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs ml-2 min-w-[40px] text-right">
                                    {skill.level < 25 ? 'Beginner' : 
                                     skill.level < 50 ? 'Intermediate' : 
                                     skill.level < 75 ? 'Advanced' : 'Expert'}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Portfolio Preview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Portfolio</h3>
                  <div className="space-y-6">
                    {portfolioForm.getValues().projects.map((project, index) => (
                      <div key={index} className="space-y-4 border border-border rounded-lg p-4">
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm mt-1">{project.description}</p>
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline mt-2 inline-block"
                            >
                              View Project
                            </a>
                          )}
                        </div>
                        
                        {/* Project Images Preview */}
                        {projects[index]?.images?.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {projects[index].images.map((img, imgIndex) => (
                              <div key={imgIndex} className="relative aspect-video rounded-md overflow-hidden">
                                <img 
                                  src={img} 
                                  alt={`Project screenshot ${imgIndex + 1}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={() => {
                    setPreviewMode(false);
                    setStep(3); // Back to portfolio step
                  }}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button onClick={finalSubmit}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Complete Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Step 1: Personal Information */}
          {step === 1 && !previewMode && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Tell us a bit about yourself and your professional background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...personalInfoForm}>
                  <form onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)} className="space-y-6">
                    {/* Profile Image Upload */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          <AvatarImage src={profileImage || ""} alt="Profile" />
                          <AvatarFallback className="bg-primary/20">
                            <Camera className="h-8 w-8 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                        <div 
                          className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4" />
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          accept="image/*" 
                          className="hidden"
                          onChange={handleProfileImageUpload}
                        />
                        <p className="text-center text-sm mt-2 text-muted-foreground">Upload Profile Picture</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={personalInfoForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={personalInfoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={personalInfoForm.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={personalInfoForm.control}
                        name="github"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GitHub Profile (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://github.com/johndoe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={personalInfoForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your experience with AI and ML technologies..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={personalInfoForm.control}
                        name="yearsOfExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience in AI</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={personalInfoForm.control}
                        name="availableForHire"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Available for Hire</FormLabel>
                              <p className="text-sm text-muted-foreground">
                                Show that you're looking for projects
                              </p>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={personalInfoForm.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the Terms of Service and Privacy Policy
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        Next Step
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          {/* Step 2: Skills Assessment */}
          {step === 2 && !previewMode && (
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>
                  Rate your expertise in AI-related skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Category Tabs */}
                  <Tabs 
                    defaultValue={selectedCategory} 
                    onValueChange={setSelectedCategory} 
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                      {skillCategories.map(category => (
                        <TabsTrigger key={category.name} value={category.name}>
                          {category.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {skillCategories.map(category => (
                      <TabsContent key={category.name} value={category.name} className="space-y-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Rate your expertise level in these {category.name} skills:
                        </p>
                        
                        {getFilteredSkillsByCategory(category.name).map(skill => (
                          <div key={skill.id} className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-sm font-medium">{skill.name}</label>
                              <span className="text-sm text-muted-foreground">
                                {skill.level < 25 ? 'Beginner' : 
                                 skill.level < 50 ? 'Intermediate' : 
                                 skill.level < 75 ? 'Advanced' : 'Expert'} ({skill.level}%)
                              </span>
                            </div>
                            <Slider
                              defaultValue={[skill.level]}
                              max={100}
                              step={1}
                              onValueChange={(value) => handleSkillLevelChange(skill.id, value)}
                            />
                          </div>
                        ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={onSubmitSkills}>
                  Next Step
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Step 3: Portfolio */}
          {step === 3 && !previewMode && (
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>
                  Showcase your best AI projects to attract potential clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...portfolioForm}>
                  <form onSubmit={portfolioForm.handleSubmit(onSubmitPortfolio)} className="space-y-6">
                    <div className="space-y-6">
                      {portfolioForm.getValues().projects.map((project, index) => (
                        <div key={index} className="space-y-4 border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Project #{index + 1}</h3>
                            
                            {index > 0 && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                type="button"
                                onClick={() => removeProject(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <FormField
                              control={portfolioForm.control}
                              name={`projects.${index}.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Project Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="E.g., Custom NLP Chatbot" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={portfolioForm.control}
                              name={`projects.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Project Description</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Describe the project, technologies used, and your role..." 
                                      className="min-h-[120px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={portfolioForm.control}
                              name={`projects.${index}.link`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Project Link (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://github.com/yourusername/project" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            {/* Project Images */}
                            <div className="space-y-2">
                              <FormLabel>Project Screenshots (Optional)</FormLabel>
                              
                              {projects[index]?.images?.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                                  {projects[index].images.map((img, imgIndex) => (
                                    <div key={imgIndex} className="relative aspect-video rounded-md overflow-hidden group">
                                      <img 
                                        src={img} 
                                        alt={`Project screenshot ${imgIndex + 1}`}
                                        className="object-cover w-full h-full"
                                      />
                                      <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeProjectImage(projects[index].id, imgIndex)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div 
                                className="border border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors"
                                onClick={() => projectImageInputRefs.current[projects[index].id]?.click()}
                              >
                                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                                <h3 className="text-base font-medium mb-1">Upload Project Screenshots</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Drag and drop or click to upload (PNG, JPG)
                                </p>
                                <input 
                                  type="file" 
                                  ref={el => projectImageInputRefs.current[projects[index].id] = el} 
                                  accept="image/*" 
                                  className="hidden"
                                  onChange={(e) => handleProjectImageUpload(projects[index].id, e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={addProject}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Project
                      </Button>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button type="submit">
                        Preview Profile
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperRegistration;
