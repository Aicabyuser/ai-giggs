
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PaymentStatusBadge } from '@/components/payments/PaymentStatusBadge';
import { ScheduleMeetingDialog } from '@/components/messages/ScheduleMeetingDialog';
import { Conversation } from '@/types/messages';

interface MessageHeaderProps {
  conversation: Conversation;
  handleScheduleMeeting: () => void;
}

export const MessageHeader = ({ conversation, handleScheduleMeeting }: MessageHeaderProps) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img 
            src={conversation.avatar} 
            alt={conversation.name} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div>
          <h3 className="font-medium">{conversation.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">{conversation.project}</p>
            {conversation.paymentStatus && (
              <PaymentStatusBadge status={conversation.paymentStatus} />
            )}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule Meeting</span>
            </Button>
          </DialogTrigger>
          <ScheduleMeetingDialog onSchedule={handleScheduleMeeting} developerName={conversation.name} />
        </Dialog>
        
        <Button 
          variant="outline" 
          size="sm" 
          asChild
        >
          <Link to={`/developer/${conversation.id}`}>
            <span className="hidden sm:inline">View Profile</span>
            <ArrowRight className="h-4 w-4 ml-0 sm:ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
