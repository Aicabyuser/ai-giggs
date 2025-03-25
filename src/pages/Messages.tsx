
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import { MessageList } from '@/components/messages/MessageList';
import { MessageHeader } from '@/components/messages/MessageHeader';
import { MessageThread } from '@/components/messages/MessageThread';
import { MessageComposer } from '@/components/messages/MessageComposer';
import { Attachment } from '@/types/messages';
import { fileTypeIcons } from '@/data/mockMessages';
import { useMessages } from '@/hooks/useMessages';

const Messages = () => {
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const { toast } = useToast();
  
  const {
    conversations,
    selectedConversation,
    setSelectedConversation,
    messages,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sendMessage
  } = useMessages();
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    
    const success = await sendMessage(newMessage, attachments);
    
    if (success) {
      setNewMessage("");
      setAttachments([]);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
    }
  };
  
  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting Scheduled",
      description: "Your meeting request has been sent to the developer.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center mb-6 pt-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="max-w-6xl mx-auto bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-220px)]">
            {/* Message list */}
            <MessageList 
              conversations={conversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              isLoading={isLoading}
            />
            
            {/* Message thread and composer */}
            {selectedConversation ? (
              <div className="md:col-span-2 flex flex-col">
                <MessageHeader 
                  conversation={selectedConversation}
                  handleScheduleMeeting={handleScheduleMeeting}
                />
                
                <MessageThread 
                  messages={messages}
                  fileTypeIcons={fileTypeIcons}
                />
                
                <MessageComposer 
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  attachments={attachments}
                  setAttachments={setAttachments}
                  handleSendMessage={handleSendMessage}
                />
              </div>
            ) : (
              <div className="md:col-span-2 flex flex-col items-center justify-center">
                <p className="text-muted-foreground">Select a conversation to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
