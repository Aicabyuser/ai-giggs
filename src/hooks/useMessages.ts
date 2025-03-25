
import { useState, useEffect, useCallback } from 'react';
import { MessageService } from '@/services/MessageService';
import { Conversation, Message, Attachment } from '@/types/messages';
import { useToast } from '@/hooks/use-toast';

export const useMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  // Load conversations
  const loadConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await MessageService.getConversations();
      setConversations(data);
      
      // Select first conversation by default if available
      if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedConversation, toast]);

  // Load messages for the selected conversation
  const loadMessages = useCallback(async (conversationId: number) => {
    try {
      const data = await MessageService.getMessages(conversationId);
      setMessages(data);
      
      // Mark conversation as read
      await MessageService.markAsRead(conversationId);
      
      // Update conversation in the list to mark as read
      setConversations(prev => 
        prev.map(c => 
          c.id === conversationId ? { ...c, unread: false } : c
        )
      );
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Send a message
  const sendMessage = useCallback(async (content: string, attachments: Attachment[] = []) => {
    if (!content.trim() && attachments.length === 0) return false;
    if (!selectedConversation) return false;
    
    try {
      const sentMessage = await MessageService.sendMessage(
        selectedConversation.id,
        content.trim(),
        attachments
      );
      
      setMessages(prev => [...prev, sentMessage]);
      
      // Update conversation in the list with new last message
      setConversations(prev => 
        prev.map(c => 
          c.id === selectedConversation.id 
            ? { ...c, lastMessage: content.trim(), time: 'Just now' } 
            : c
        )
      );
      
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }, [selectedConversation, toast]);

  // Create a new conversation
  const createConversation = useCallback(async (name: string, projectId: string, firstMessage: string) => {
    try {
      const newConversation = await MessageService.createConversation(name, projectId, firstMessage);
      setConversations(prev => [...prev, newConversation]);
      setSelectedConversation(newConversation);
      setMessages([{
        id: Math.floor(Math.random() * 1000000),
        sender: 'user',
        content: firstMessage,
        time: 'Just now',
        attachments: []
      }]);
      return true;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create conversation. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  // Filter conversations when search term or status filter changes
  useEffect(() => {
    const filterConversations = async () => {
      try {
        const filtered = await MessageService.searchConversations(searchTerm, statusFilter);
        setConversations(filtered);
      } catch (error) {
        console.error('Error filtering conversations:', error);
      }
    };
    
    if (!isLoading) {
      filterConversations();
    }
  }, [searchTerm, statusFilter, isLoading]);

  // Load initial conversations
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Load messages when selected conversation changes
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation, loadMessages]);

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    messages,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sendMessage,
    createConversation,
    refreshConversations: loadConversations
  };
};
