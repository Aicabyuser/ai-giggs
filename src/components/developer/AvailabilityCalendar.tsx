
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Clock, Check, Calendar as CalendarIcon } from "lucide-react";

export type AvailabilityStatus = 'available' | 'limited' | 'unavailable';

export type DayAvailability = {
  date: Date;
  status: AvailabilityStatus;
  hours?: number;
};

interface AvailabilityCalendarProps {
  availability: DayAvailability[];
  onUpdateAvailability: (updatedAvailability: DayAvailability[]) => void;
}

export const AvailabilityCalendar = ({ 
  availability, 
  onUpdateAvailability 
}: AvailabilityCalendarProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>('available');
  const [hours, setHours] = useState<string>("8");
  const [autoAccept, setAutoAccept] = useState<boolean>(false);
  
  const availabilityMap = new Map(
    availability.map(item => [item.date.toDateString(), item])
  );
  
  const handleUpdateAvailability = () => {
    if (!date) return;
    
    const updatedAvailability = [...availability];
    const existingIndex = updatedAvailability.findIndex(
      a => a.date.toDateString() === date.toDateString()
    );
    
    const newEntry = {
      date: new Date(date),
      status: availabilityStatus,
      hours: availabilityStatus === 'limited' ? parseInt(hours) : undefined
    };
    
    if (existingIndex >= 0) {
      updatedAvailability[existingIndex] = newEntry;
    } else {
      updatedAvailability.push(newEntry);
    }
    
    onUpdateAvailability(updatedAvailability);
    
    toast({
      title: "Availability Updated",
      description: `You are ${availabilityStatus} on ${date.toLocaleDateString()}`,
    });
  };
  
  // Functions to modify the calendar
  const dayClassName = (date: Date) => {
    const day = availabilityMap.get(date.toDateString());
    if (!day) return "";
    
    switch (day.status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "limited":
        return "bg-yellow-100 text-yellow-800";
      case "unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };
  
  const dayContent = (date: Date) => {
    const day = availabilityMap.get(date.toDateString());
    if (!day) return null;
    
    return day.status === "limited" && day.hours ? (
      <div className="absolute bottom-0 right-0 left-0 text-[10px] text-center">
        {day.hours}h
      </div>
    ) : null;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Availability Calendar</CardTitle>
          <CardDescription>
            Set your availability for potential projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              available: (date) => {
                const day = availabilityMap.get(date.toDateString());
                return day?.status === 'available';
              },
              limited: (date) => {
                const day = availabilityMap.get(date.toDateString());
                return day?.status === 'limited';
              },
              unavailable: (date) => {
                const day = availabilityMap.get(date.toDateString());
                return day?.status === 'unavailable';
              }
            }}
            modifiersClassNames={{
              available: "bg-green-100 text-green-800",
              limited: "bg-yellow-100 text-yellow-800",
              unavailable: "bg-red-100 text-red-800"
            }}
            components={{
              DayContent: ({ date }) => (
                <>
                  {date.getDate()}
                  {dayContent(date)}
                </>
              ),
            }}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Update Availability</CardTitle>
          <CardDescription>
            {date ? date.toLocaleDateString() : "Select a date"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Availability Status</label>
            <Select 
              value={availabilityStatus} 
              onValueChange={(value) => setAvailabilityStatus(value as AvailabilityStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    Available
                  </div>
                </SelectItem>
                <SelectItem value="limited">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    Limited Hours
                  </div>
                </SelectItem>
                <SelectItem value="unavailable">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    Unavailable
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {availabilityStatus === 'limited' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Available Hours</label>
              <Select value={hours} onValueChange={setHours}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour} {hour === 1 ? 'hour' : 'hours'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="flex items-center justify-between space-x-2 pt-2">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Auto-accept projects</label>
              <span className="text-xs text-muted-foreground">
                Automatically accept projects during available times
              </span>
            </div>
            <Switch
              checked={autoAccept}
              onCheckedChange={setAutoAccept}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleUpdateAvailability} 
            className="w-full"
            disabled={!date}
          >
            Update Availability
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Availability Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center">
              <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                <Check className="h-3 w-3 mr-1" />
                Available
              </Badge>
              <span className="ml-2 text-sm text-muted-foreground">
                Full-time availability for projects
              </span>
            </div>
            
            <div className="flex items-center">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100">
                <Clock className="h-3 w-3 mr-1" />
                Limited Hours
              </Badge>
              <span className="ml-2 text-sm text-muted-foreground">
                Part-time availability
              </span>
            </div>
            
            <div className="flex items-center">
              <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
                <CalendarIcon className="h-3 w-3 mr-1" />
                Unavailable
              </Badge>
              <span className="ml-2 text-sm text-muted-foreground">
                Not available for work
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
