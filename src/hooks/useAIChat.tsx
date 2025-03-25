
import { useState, useCallback } from 'react';

// Define types for chat messages and developers
interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
}

interface DeveloperSkill {
  name: string;
  level: number;
}

export interface Developer {
  id: number;
  name: string;
  title: string;
  avatar: string;
  hourlyRate: string;
  rating: number;
  skills: DeveloperSkill[];
  projectsCompleted: number;
  location: string;
  bio: string;
  availability: string;
}

// Export the developers array so it can be used in other components
export const mockDevelopers: Developer[] = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Machine Learning Engineer",
    avatar: "/placeholder.svg",
    hourlyRate: "$80-100",
    rating: 4.9,
    skills: [
      { name: "TensorFlow", level: 95 },
      { name: "Python", level: 90 },
      { name: "Computer Vision", level: 85 },
      { name: "NLP", level: 80 }
    ],
    projectsCompleted: 23,
    location: "San Francisco, CA",
    bio: "I specialize in computer vision and natural language processing applications with 5+ years of experience building production ML systems.",
    availability: "Available from June 1"
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "AI Research Scientist",
    avatar: "/placeholder.svg",
    hourlyRate: "$90-120",
    rating: 4.8,
    skills: [
      { name: "Deep Learning", level: 95 },
      { name: "PyTorch", level: 90 },
      { name: "NLP", level: 95 },
      { name: "Research", level: 90 }
    ],
    projectsCompleted: 17,
    location: "Boston, MA",
    bio: "Former AI researcher at MIT with expertise in natural language processing and knowledge representation.",
    availability: "Available now"
  },
  {
    id: 3,
    name: "David Park",
    title: "MLOps & Data Engineer",
    avatar: "/placeholder.svg",
    hourlyRate: "$75-90",
    rating: 4.7,
    skills: [
      { name: "MLOps", level: 90 },
      { name: "Data Engineering", level: 95 },
      { name: "AWS/GCP", level: 95 },
      { name: "Docker/Kubernetes", level: 90 }
    ],
    projectsCompleted: 31,
    location: "Seattle, WA",
    bio: "Specialized in deploying ML systems to production with robust MLOps practices and cloud infrastructure.",
    availability: "Limited availability"
  },
  {
    id: 4,
    name: "Maya Rodriguez",
    title: "Computer Vision Specialist",
    avatar: "/placeholder.svg",
    hourlyRate: "$85-110",
    rating: 4.9,
    skills: [
      { name: "Computer Vision", level: 95 },
      { name: "OpenCV", level: 90 },
      { name: "TensorFlow", level: 85 },
      { name: "Image Processing", level: 95 }
    ],
    projectsCompleted: 19,
    location: "Austin, TX",
    bio: "Expert in computer vision with background in autonomous systems and medical image analysis.",
    availability: "Available now"
  },
  {
    id: 5,
    name: "James Wilson",
    title: "Full-Stack AI Developer",
    avatar: "/placeholder.svg",
    hourlyRate: "$70-95",
    rating: 4.6,
    skills: [
      { name: "Full-Stack", level: 90 },
      { name: "React", level: 85 },
      { name: "Python", level: 90 },
      { name: "TensorFlow.js", level: 85 }
    ],
    projectsCompleted: 28,
    location: "Chicago, IL",
    bio: "Bridging the gap between ML models and user-facing applications with expertise in both frontend and AI technologies.",
    availability: "Available from May 15"
  }
];

export function useAIChat() {
  const [conversation, setConversation] = useState<ChatMessage[]>([
    { 
      type: 'ai', 
      content: 'Hi there! Tell me about your AI project, and I\'ll find the best-matched developers for you. What kind of AI solution are you looking to build?' 
    }
  ]);
  const [showMatches, setShowMatches] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [matchPercentages, setMatchPercentages] = useState<{[key: number]: number}>({});
  
  // Selected developers to show as matches
  const [matches, setMatches] = useState<Developer[]>([]);
  
  // Simple AI analysis function to extract key skills from conversation
  const analyzeConversation = useCallback((messages: ChatMessage[]) => {
    const userMessages = messages.filter(msg => msg.type === 'user').map(msg => msg.content.toLowerCase());
    const allText = userMessages.join(' ');
    
    // Keywords to match against developer skills
    const skillKeywords: {[key: string]: string[]} = {
      'computer vision': ['image', 'vision', 'camera', 'object detection', 'recognition'],
      'nlp': ['language', 'text', 'nlp', 'chatbot', 'sentiment', 'translation'],
      'deep learning': ['neural network', 'deep learning', 'cnn', 'rnn', 'transformer'],
      'mlops': ['deployment', 'pipeline', 'production', 'mlops', 'cloud'],
      'tensorflow': ['tensorflow', 'tf'],
      'pytorch': ['pytorch', 'torch'],
      'full-stack': ['frontend', 'backend', 'full-stack', 'web', 'app']
    };
    
    // Calculate match percentages for each developer
    const newMatchPercentages: {[key: number]: number} = {};
    
    mockDevelopers.forEach(developer => {
      let matchScore = 0;
      let totalWeight = 0;
      
      developer.skills.forEach(skill => {
        const skillName = skill.name.toLowerCase();
        const relevantKeywords = skillKeywords[skillName] || [skillName];
        
        relevantKeywords.forEach(keyword => {
          if (allText.includes(keyword)) {
            matchScore += skill.level;
            totalWeight += 100;
          }
        });
      });
      
      // Calculate final percentage with a minimum of 30%
      newMatchPercentages[developer.id] = totalWeight > 0 
        ? Math.max(30, Math.min(95, Math.round((matchScore / totalWeight) * 100)))
        : 30;
    });
    
    setMatchPercentages(newMatchPercentages);
    
    // Sort developers by match percentage and return top matches
    const sortedDevelopers = [...mockDevelopers].sort((a, b) => 
      (newMatchPercentages[b.id] || 0) - (newMatchPercentages[a.id] || 0)
    );
    
    return sortedDevelopers.slice(0, 3);
  }, []);
  
  // Mock AI response generation
  const generateAIResponse = useCallback((userMessage: string, messageHistory: ChatMessage[]) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Simple response logic based on message content
    if (messageHistory.length <= 2) {
      return "That's interesting! What specific features or capabilities are you looking for in your AI solution?";
    } else if (messageHistory.length <= 4) {
      return "Great! And what industry or domain will this AI solution be applied to? This helps me find developers with relevant experience.";
    } else if (messageHistory.length <= 6) {
      return "Thanks for sharing those details. Do you have any preferences regarding budget, timeline, or specific technical expertise?";
    } else {
      return "Perfect! I have enough information to match you with some excellent AI developers. Would you like to see your matches now or provide more details?";
    }
  }, []);
  
  // Send a new message
  const sendMessage = useCallback((message: string) => {
    // Add user message to conversation
    const updatedConversation: ChatMessage[] = [
      ...conversation,
      { type: 'user', content: message }
    ];
    setConversation(updatedConversation);
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, updatedConversation);
      
      // Add AI response to conversation
      const finalConversation: ChatMessage[] = [
        ...updatedConversation,
        { type: 'ai', content: aiResponse }
      ];
      
      setConversation(finalConversation);
      setIsTyping(false);
      
      // If this is the third exchange, prepare matches but don't show yet
      if (finalConversation.length >= 7 && !showMatches) {
        const topMatches = analyzeConversation(finalConversation);
        setMatches(topMatches);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  }, [conversation, showMatches, generateAIResponse, analyzeConversation]);
  
  // Show matches immediately
  const showMatchesNow = useCallback(() => {
    setShowMatches(true);
  }, []);
  
  // Continue conversation to add more details
  const addMoreDetails = useCallback(() => {
    sendMessage("I'd like to provide more details about my project.");
  }, [sendMessage]);
  
  return {
    conversation,
    matches,
    showMatches,
    isTyping,
    matchPercentages,
    sendMessage,
    showMatchesNow,
    addMoreDetails
  };
}
