
import React from 'react';
import { 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ScheduleMeetingDialogProps {
  onSchedule: () => void;
  developerName: string;
}

export const ScheduleMeetingDialog = ({ onSchedule, developerName }: ScheduleMeetingDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogDescription>
          Set up a meeting with {developerName} to discuss the project.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Date</label>
            <Input type="date" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Time</label>
            <Input type="time" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Meeting Title</label>
          <Input placeholder="Project Discussion" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Notes</label>
          <Textarea placeholder="Add any meeting details or agenda items..." />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={onSchedule}>Schedule Meeting</Button>
      </DialogFooter>
    </DialogContent>
  );
};
