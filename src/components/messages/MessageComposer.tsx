
import React, { useRef } from 'react';
import { Send, Paperclip, Image, Smile, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Attachment } from '@/types/messages';

interface MessageComposerProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  attachments: Attachment[];
  setAttachments: (attachments: Attachment[]) => void;
  handleSendMessage: () => void;
}

export const MessageComposer = ({
  newMessage,
  setNewMessage,
  attachments,
  setAttachments,
  handleSendMessage
}: MessageComposerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newAttachments: Attachment[] = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
        file: file
      }));
      
      setAttachments([...attachments, ...newAttachments]);
      
      toast({
        title: "Files Attached",
        description: `${files.length} file(s) attached successfully.`
      });
    }
  };
  
  const removeAttachment = (id: number | string) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };
  
  return (
    <>
      {attachments.length > 0 && (
        <div className="px-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {attachments.map(attachment => (
              <div 
                key={attachment.id} 
                className="bg-secondary text-xs p-1.5 rounded flex items-center gap-1"
              >
                <span>{attachment.name} ({attachment.size})</span>
                <button 
                  onClick={() => removeAttachment(attachment.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4 border-t">
        <Textarea 
          placeholder="Type your message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="mb-2 min-h-[60px]"
        />
        
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          
          <Button 
            variant="outline" 
            size="icon" 
            className="flex-shrink-0"
            onClick={handleAttachmentClick}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="flex-shrink-0"
            onClick={() => {
              toast({
                title: "Feature Coming Soon",
                description: "Image upload will be available soon.",
              });
            }}
          >
            <Image className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="flex-shrink-0"
            onClick={() => {
              toast({
                title: "Feature Coming Soon",
                description: "Emoji picker will be available soon.",
              });
            }}
          >
            <Smile className="h-4 w-4" />
          </Button>
          
          <div className="flex-grow"></div>
          
          <Button 
            className="flex-shrink-0" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && attachments.length === 0}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
