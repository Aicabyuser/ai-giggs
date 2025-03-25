import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SendHorizontal, Mic, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{type: 'user' | 'ai', content: string}[]>([
    {type: 'ai', content: 'Hi there! I\'m AIGiggs. Tell me about your AI project, and I\'ll help match you with the perfect developer.'}
  ]);
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    setConversation([...conversation, {type: 'user', content: message}]);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response after delay
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        {
          type: 'ai', 
          content: 'Thanks for sharing! To find the right AI developer for you, could you tell me more about your project needs? For example, what specific AI capabilities are you looking for?'
        }
      ]);
      
      // After 2 more seconds, suggest moving to the matching page
      setTimeout(() => {
        setConversation(prev => [
          ...prev, 
          {
            type: 'ai', 
            content: 'Would you like to fill out a quick project requirements form to get matched with the perfect AI developer? This will help us find the most suitable talent for your needs.'
          }
        ]);
      }, 2000);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4 flex flex-col items-center text-center mb-12 mt-12 md:mt-16">
        <div className="relative inline-block mb-3">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
            AI-Powered Matchmaking
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 max-w-4xl animate-fade-in">
          Find the Perfect AI Developer for Your Project
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
          AI-Giggs intelligently matches you with skilled AI developers based on your project needs through a simple conversation.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <Button variant="outline" className="rounded-full">
            Machine Learning
          </Button>
          <Button variant="outline" className="rounded-full">
            Computer Vision
          </Button>
          <Button variant="outline" className="rounded-full">
            NLP
          </Button>
          <Button variant="outline" className="rounded-full">
            Data Science
          </Button>
          <Button variant="outline" className="rounded-full">
            Deep Learning
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl animate-fade-in" style={{animationDelay: '0.3s'}}>
        <div className="glass rounded-2xl p-3 md:p-6 shadow-lg border border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 mb-4">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={`message-bubble ${msg.type === 'user' ? 'message-user' : 'message-ai'} animate-slide-in`}
                style={{animationDelay: `${0.1 * index}s`}}
              >
                {msg.content}
                {msg.type === 'ai' && index === conversation.length - 1 && conversation.length > 2 && (
                  <div className="mt-3">
                    <Button 
                      size="sm" 
                      onClick={() => navigate('/project-matching')}
                      className="mr-2"
                    >
                      Yes, Create Project
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setConversation(prev => [
                          ...prev,
                          {type: 'user', content: 'I\'d like to continue chatting first.'},
                          {type: 'ai', content: 'No problem! Let\'s continue our conversation. What kind of AI project are you working on?'}
                        ]);
                      }}
                    >
                      Continue Chatting
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 p-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your AI project needs..."
              className="border rounded-full py-6 pl-4 pr-12 focus:ring-1 focus:ring-primary/20"
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
                disabled={!message.trim()}
                className={`h-8 w-8 rounded-full ${message.trim() ? 'text-primary hover:bg-primary/10' : 'text-muted-foreground'}`}
                aria-label="Send message"
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Start by describing your project or choose a suggestion above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
