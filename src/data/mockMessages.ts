
import { Conversation, Message, FileTypeIconMap } from '@/types/messages';

export const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "I've reviewed your project requirements and have some questions about the API integration.",
    time: "2 hours ago",
    unread: true,
    project: "AI-Powered Recommendation Engine",
    status: "in_progress",
    paymentStatus: "in_escrow"
  },
  {
    id: 2,
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Here's the initial proposal for your AI recommendation engine as we discussed.",
    time: "Yesterday",
    unread: false,
    project: "AI-Powered Recommendation Engine",
    status: "proposal",
    paymentStatus: "pending"
  },
  {
    id: 3,
    name: "Maya Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    lastMessage: "I've worked on similar computer vision projects and would be interested in discussing yours.",
    time: "2 days ago",
    unread: false,
    project: "Computer Vision for Quality Control",
    status: "inquiry",
    paymentStatus: null
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    lastMessage: "Thank you for considering my application. I'd be happy to discuss how my expertise in AI ethics could benefit your project.",
    time: "3 days ago",
    unread: false,
    project: "Computer Vision for Quality Control",
    status: "completed",
    paymentStatus: "released"
  },
  {
    id: 5,
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    lastMessage: "I'm available for a call tomorrow at 3pm to discuss project milestones.",
    time: "1 week ago",
    unread: false,
    project: "Natural Language Processing Tool",
    status: "in_progress",
    paymentStatus: "verified"
  }
];

export const mockMessages: Message[] = [
  {
    id: 1,
    sender: "user",
    content: "Hi Sarah, I'm looking for help with an AI recommendation engine for our e-commerce platform.",
    time: "Monday, 10:32 AM",
    attachments: []
  },
  {
    id: 2,
    sender: "developer",
    content: "Hello! Thanks for reaching out. I'd be happy to help with your recommendation engine project. Could you tell me more about your specific requirements and what you're trying to achieve?",
    time: "Monday, 11:15 AM",
    attachments: []
  },
  {
    id: 3,
    sender: "user",
    content: "We want to create personalized product recommendations based on user browsing history, purchase patterns, and similar user behaviors. Our platform has about 5,000 products across 20 categories.",
    time: "Monday, 2:45 PM",
    attachments: []
  },
  {
    id: 4,
    sender: "developer",
    content: "That sounds like a good use case for a hybrid recommendation system. Have you already implemented any tracking for user behavior? And do you have a preference for where this should be deployed - cloud-based or on your own infrastructure?",
    time: "Monday, 3:30 PM",
    attachments: []
  },
  {
    id: 5,
    sender: "user",
    content: "Yes, we're already tracking page views, product views, add-to-cart actions, and purchases. We're flexible on deployment but probably prefer cloud since we're using AWS for most of our infrastructure.",
    time: "Yesterday, 9:15 AM",
    attachments: []
  },
  {
    id: 6,
    sender: "developer",
    content: "Great! That existing tracking data will be valuable. I've reviewed your project requirements and have some questions about the API integration. Specifically, how do you want the recommendations to be served to your frontend? Would you prefer a real-time API call for each user, or a batch process that updates recommendations periodically?",
    time: "2 hours ago",
    attachments: [
      {
        id: 1,
        name: "ProjectProposal.pdf",
        size: "2.4 MB",
        type: "pdf"
      }
    ]
  }
];

export const fileTypeIcons: FileTypeIconMap = {
  pdf: { color: 'text-red-500', label: 'PDF' },
  doc: { color: 'text-blue-500', label: 'DOC' },
  docx: { color: 'text-blue-500', label: 'DOCX' },
  xls: { color: 'text-green-500', label: 'XLS' },
  xlsx: { color: 'text-green-500', label: 'XLSX' },
  txt: { color: 'text-gray-500', label: 'TXT' },
  jpg: { color: 'text-purple-500', label: 'JPG' },
  png: { color: 'text-purple-500', label: 'PNG' },
  zip: { color: 'text-orange-500', label: 'ZIP' }
};
