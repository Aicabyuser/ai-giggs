
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check, CheckCheck, MessageSquare, Briefcase, CreditCard, Info, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification, NotificationType, useNotifications } from '@/hooks/useNotifications';
import { useIsMobile } from '@/hooks/use-mobile';

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'project':
        return <Briefcase className="h-4 w-4 text-green-500" />;
      case 'payment':
        return <CreditCard className="h-4 w-4 text-purple-500" />;
      case 'system':
        return <Info className="h-4 w-4 text-gray-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setIsOpen(false);
  };
  
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) {
      return 'just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };
  
  const filterNotifications = (type: NotificationType | 'all') => {
    if (type === 'all') {
      return notifications;
    }
    return notifications.filter(n => n.type === type);
  };
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={`p-0 ${isMobile ? 'w-[320px]' : 'w-[380px]'}`}
      >
        <DropdownMenuLabel className="p-4 flex items-center justify-between">
          <span>Notifications</span>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={markAllAsRead}
              title="Mark all as read"
            >
              <CheckCheck className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={clearAll}
              title="Clear all"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0" />
        
        <Tabs defaultValue="all">
          <TabsList className="w-full border-b rounded-none p-0 h-auto">
            <TabsTrigger value="all" className="flex-1 py-2 rounded-none">
              All
            </TabsTrigger>
            <TabsTrigger value="message" className="flex-1 py-2 rounded-none">
              Messages
            </TabsTrigger>
            <TabsTrigger value="project" className="flex-1 py-2 rounded-none">
              Projects
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex-1 py-2 rounded-none">
              Payments
            </TabsTrigger>
          </TabsList>
          
          {['all', 'message', 'project', 'payment'].map((type) => (
            <TabsContent key={type} value={type} className="m-0 p-0">
              <ScrollArea className="h-[300px]">
                {filterNotifications(type as any).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <Bell className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                ) : (
                  filterNotifications(type as any).map((notification) => (
                    <DropdownMenuGroup key={notification.id}>
                      <DropdownMenuItem 
                        className={`px-4 py-3 cursor-pointer ${!notification.read ? 'bg-muted/50' : ''}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex gap-3 w-full">
                          {notification.sender?.avatar ? (
                            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                              <img 
                                src={notification.sender.avatar} 
                                alt={notification.sender.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate mb-1">
                              {notification.message}
                            </p>
                            {notification.actionUrl && (
                              <Link 
                                to={notification.actionUrl} 
                                className="text-xs text-primary hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View details
                              </Link>
                            )}
                          </div>
                          
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary self-start mt-1 flex-shrink-0" />
                          )}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                  ))
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
