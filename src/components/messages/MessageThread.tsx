
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, FileTypeIconMap } from '@/types/messages';

interface MessageThreadProps {
  messages: Message[];
  fileTypeIcons: FileTypeIconMap;
}

export const MessageThread = ({ messages, fileTypeIcons }: MessageThreadProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderFileIcon = (fileType: string) => {
    const icon = fileTypeIcons[fileType];
    if (!icon) return <i>FILE</i>;
    
    return <i className={icon.color}>{icon.label}</i>;
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary border border-border'
              }`}
            >
              <div className="mb-1">{message.content}</div>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.attachments.map(attachment => (
                    <div 
                      key={attachment.id} 
                      className={`text-xs p-2 rounded flex items-center justify-between ${
                        message.sender === 'user'
                          ? 'bg-primary-foreground/10 text-primary-foreground'
                          : 'bg-background'
                      }`}
                    >
                      <div className="flex items-center">
                        {renderFileIcon(attachment.type)}
                        <span className="ml-2">{attachment.name}</span>
                      </div>
                      <span>{attachment.size}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="text-xs opacity-70 text-right mt-1">
                {message.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
