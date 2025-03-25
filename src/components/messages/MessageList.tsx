
import React from 'react';
import { Search, MailOpen, Mail, ArrowDownUp } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Conversation } from '@/types/messages';
import { Skeleton } from "@/components/ui/skeleton";

interface MessageListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  isLoading?: boolean;
}

export const MessageList = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isLoading = false
}: MessageListProps) => {
  // Get status label
  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      inquiry: "Inquiry",
      proposal: "Proposal",
      in_progress: "In Progress",
      completed: "Completed",
      all: "All Statuses"
    };
    return statusMap[status] || status;
  };
  
  return (
    <div className="border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="relative mb-3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex items-center">
                <ArrowDownUp className="mr-2 h-4 w-4" />
                {getStatusLabel(statusFilter)}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="inquiry">Inquiry</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          // Loading state
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-start space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : conversations.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <MailOpen className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="font-medium">No conversations</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? 'No results found. Try a different search term.' : 'Start a new conversation from a project.'}
            </p>
          </div>
        ) : (
          // Conversation list
          <div>
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 border-b cursor-pointer hover:bg-secondary/50 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-secondary' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <img src={conversation.avatar} alt={conversation.name} className="rounded-full h-10 w-10" />
                    {conversation.unread && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full border-2 border-background"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conversation.time}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      
                      {conversation.unread ? (
                        <Mail className="h-4 w-4 text-primary ml-2 flex-shrink-0" />
                      ) : null}
                    </div>
                    
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs px-1.5 py-0.5 bg-secondary-foreground/10 rounded text-secondary-foreground">
                        {conversation.project}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                        {getStatusLabel(conversation.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
