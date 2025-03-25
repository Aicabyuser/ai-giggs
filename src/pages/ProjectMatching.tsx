
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, SendHorizontal, Mic, ArrowRight, Filter, Star, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import DeveloperCard from '@/components/DeveloperCard';
import { useAIChat } from '@/hooks/useAIChat';

const ProjectMatching = () => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const { 
    conversation, 
    showMatches, 
    matches, 
    isTyping,
    matchPercentages,
    sendMessage, 
    showMatchesNow,
    addMoreDetails
  } = useAIChat();
  
  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Function to initiate contact with a developer
  const handleContactDeveloper = (developerId: number) => {
    toast({
      title: "Request Sent!",
      description: "Your connection request has been sent to the developer.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center mb-8 pt-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              AI-Powered Matching
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect AI Developer
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a conversation with our AI assistant to get matched with developers who have the exact skills you need.
            </p>
          </div>
          
          <Card className="overflow-hidden mb-10">
            <CardHeader>
              <CardTitle>Chat with AIGiggs</CardTitle>
              <CardDescription>
                Tell our AI about your project to find matching developers
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="h-[400px] overflow-y-auto p-4 space-y-4 mb-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/10">
                {conversation.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 animate-slide-in ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-secondary border border-border'
                      }`}
                      style={{animationDelay: `${0.1 * index}s`}}
                    >
                      {msg.content}
                      {msg.type === 'ai' && index === conversation.length - 1 && conversation.length >= 7 && !showMatches && (
                        <div className="mt-3">
                          <Button 
                            size="sm" 
                            onClick={showMatchesNow}
                            className="mr-2"
                          >
                            Show Matches
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={addMoreDetails}
                          >
                            Add More Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary border border-border max-w-[80%] rounded-lg px-4 py-2">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse"></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <div className="flex items-center gap-2 w-full relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your AI project needs..."
                  className="w-full rounded-full py-6 pl-4 pr-12"
                  disabled={isTyping}
                />
                <div className="absolute right-4 flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-primary/10"
                    aria-label="Voice input"
                  >
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleSend}
                    disabled={!message.trim() || isTyping}
                    className={`h-8 w-8 rounded-full ${message.trim() && !isTyping ? 'text-primary hover:bg-primary/10' : 'text-muted-foreground'}`}
                    aria-label="Send message"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          {showMatches && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-display font-bold">Your Matched Developers ({matches.length})</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Results
                </Button>
              </div>
              
              <div className="space-y-6">
                {matches.map((developer) => (
                  <div key={developer.id} className="border rounded-md overflow-hidden bg-card">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-2/3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center">
                                <h3 className="text-xl font-semibold">{developer.name}</h3>
                                <div className="ml-3 flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                  <span className="ml-1 text-sm font-medium">{developer.rating}</span>
                                </div>
                              </div>
                              <p className="text-muted-foreground">{developer.title}</p>
                            </div>
                            <div className="hidden lg:block">
                              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/30 text-primary font-semibold text-sm">
                                {matchPercentages[developer.id] || 0}% Match
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="line-clamp-2">{developer.bio}</p>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {developer.skills.slice(0, 4).map((skill, idx) => (
                              <div 
                                key={idx} 
                                className="px-2 py-1 bg-secondary text-xs rounded-full flex items-center"
                              >
                                <span>{skill.name}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {developer.projectsCompleted} projects
                            </div>
                            <div>
                              {developer.hourlyRate}/hr
                            </div>
                            <div>
                              {developer.location}
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full lg:w-1/3 flex flex-col justify-between">
                          <div className="lg:hidden mb-4">
                            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/30 text-primary font-semibold text-sm inline-block">
                              {matchPercentages[developer.id] || 0}% Match
                            </div>
                          </div>
                          
                          <div className="mt-4 lg:mt-0 space-y-3">
                            <Button 
                              className="w-full"
                              onClick={() => handleContactDeveloper(developer.id)}
                            >
                              Contact Developer
                            </Button>
                            
                            <Button variant="outline" className="w-full" asChild>
                              <Link to={`/developer/${developer.id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectMatching;
