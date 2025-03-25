
import { Message, Attachment, Conversation } from '@/types/messages';
import { mockConversations, mockMessages } from '@/data/mockMessages';

// This would connect to a backend in a real application
class MessageServiceImpl {
  private conversations: Conversation[] = [...mockConversations];
  private messagesMap: Record<number, Message[]> = {
    1: [...mockMessages]
  };
  
  // Get all conversations for the current user
  async getConversations(): Promise<Conversation[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.conversations;
  }
  
  // Get messages for a specific conversation
  async getMessages(conversationId: number): Promise<Message[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.messagesMap[conversationId] || [];
  }
  
  // Send a new message
  async sendMessage(conversationId: number, content: string, attachments: Attachment[] = []): Promise<Message> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create new message
    const newMessage: Message = {
      id: Math.floor(Math.random() * 1000000),
      sender: 'user',
      content,
      time: 'Just now',
      attachments: [...attachments]
    };
    
    // Add to messages
    if (!this.messagesMap[conversationId]) {
      this.messagesMap[conversationId] = [];
    }
    this.messagesMap[conversationId].push(newMessage);
    
    // Update last message in conversation
    const conversationIndex = this.conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex !== -1) {
      this.conversations[conversationIndex].lastMessage = content;
      this.conversations[conversationIndex].time = 'Just now';
      this.conversations[conversationIndex].unread = false;
    }
    
    return newMessage;
  }
  
  // Mark a conversation as read
  async markAsRead(conversationId: number): Promise<boolean> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const conversationIndex = this.conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex !== -1) {
      this.conversations[conversationIndex].unread = false;
      return true;
    }
    return false;
  }
  
  // Create a new conversation
  async createConversation(name: string, projectId: string, firstMessage: string): Promise<Conversation> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newConversationId = Math.max(...this.conversations.map(c => c.id)) + 1;
    
    const newConversation: Conversation = {
      id: newConversationId,
      name,
      avatar: 'https://avatars.githubusercontent.com/u/1',
      lastMessage: firstMessage,
      time: 'Just now',
      unread: false,
      project: projectId,
      status: 'inquiry',
      paymentStatus: null
    };
    
    this.conversations.push(newConversation);
    
    // Create first message
    this.messagesMap[newConversationId] = [{
      id: Math.floor(Math.random() * 1000000),
      sender: 'user',
      content: firstMessage,
      time: 'Just now',
      attachments: []
    }];
    
    return newConversation;
  }
  
  // Search conversations
  async searchConversations(searchTerm: string, statusFilter: string = 'all'): Promise<Conversation[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.conversations.filter(
      (conversation) => {
        const matchesSearch = conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conversation.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || conversation.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      }
    );
  }
}

// Create a singleton instance
export const MessageService = new MessageServiceImpl();
