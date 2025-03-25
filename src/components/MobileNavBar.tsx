
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, 
  Search, 
  MessageSquare, 
  Briefcase, 
  User,
  Bell
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedTabBar: React.FC<{activeIndex: number}> = ({ activeIndex }) => {
  return (
    <div className="absolute bottom-[52px] left-0 w-full flex justify-around pointer-events-none">
      <div 
        className="h-1 w-10 bg-primary rounded-full transition-all duration-300"
        style={{ 
          transform: `translateX(calc(${activeIndex * 100}% - ${activeIndex * 10}px))` 
        }}
      />
    </div>
  );
};

const MobileNavBar = () => {
  const { isAuthenticated, isClient, isDeveloper } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useIsMobile();
  
  // Only show the mobile nav bar if the user is authenticated and on mobile
  if (!isAuthenticated || !isMobile) return null;

  // Handle scroll behavior to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Set active tab based on current route
  useEffect(() => {
    const routes = [
      isClient ? "/client-dashboard" : "/developer-dashboard",
      isClient ? "/manage-projects" : "/find-projects",
      "/messages",
      isClient ? "/client-profile" : "/developer-portfolio",
    ];
    
    const index = routes.findIndex(route => location.pathname.startsWith(route));
    if (index !== -1) {
      setActiveTab(index);
    }
  }, [location, isClient]);
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <AnimatedTabBar activeIndex={activeTab} />
      
      <div className="flex items-center justify-around h-14">
        <Link 
          to={isClient ? "/client-dashboard" : "/developer-dashboard"} 
          className={`flex flex-col items-center justify-center px-3 py-2 ${
            isActive(isClient ? "/client-dashboard" : "/developer-dashboard") 
              ? "text-primary" 
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab(0)}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to={isClient ? "/manage-projects" : "/find-projects"} 
          className={`flex flex-col items-center justify-center px-3 py-2 ${
            isActive(isClient ? "/manage-projects" : "/find-projects") 
              ? "text-primary" 
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab(1)}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-xs mt-1">{isClient ? "Projects" : "Find Work"}</span>
        </Link>
        
        <Link 
          to="/messages" 
          className={`flex flex-col items-center justify-center px-3 py-2 relative ${
            isActive("/messages") ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab(2)}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs mt-1">Messages</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Link>
        
        <Link 
          to={isClient ? "/client-profile" : "/developer-portfolio"} 
          className={`flex flex-col items-center justify-center px-3 py-2 ${
            isActive(isClient ? "/client-profile" : "/developer-portfolio") 
              ? "text-primary" 
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab(3)}
        >
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavBar;
