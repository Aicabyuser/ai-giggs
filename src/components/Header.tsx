import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationCenter } from './NotificationCenter';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out."
    });
    navigate('/');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-display flex items-center gap-2">
            <div className="relative w-10 h-10 overflow-hidden rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display text-xl font-bold">G</span>
            </div>
            <span className="text-xl font-semibold">AI-Giggs</span>
          </Link>
          
          {!isMobile && (
            <nav className="ml-10 hidden md:flex space-x-6">
              <Link to="/project-matching" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Find Developers
              </Link>
              <Link to="/find-projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Find Projects
              </Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/messages" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Messages
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NotificationCenter />
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigate('/messages')}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || undefined} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/messages')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/client-settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/sign-in')}>
                Login
              </Button>
              <Button onClick={() => navigate('/sign-up')}>
                Sign Up
              </Button>
            </>
          )}
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      {isMobile && menuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 md:hidden">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link 
              to="/project-matching" 
              className="text-lg py-2 border-b border-border" 
              onClick={() => setMenuOpen(false)}
            >
              Find Developers
            </Link>
            <Link 
              to="/find-projects" 
              className="text-lg py-2 border-b border-border" 
              onClick={() => setMenuOpen(false)}
            >
              Find Projects
            </Link>
            <Link 
              to="/dashboard" 
              className="text-lg py-2 border-b border-border" 
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/messages" 
              className="text-lg py-2 border-b border-border" 
              onClick={() => setMenuOpen(false)}
            >
              Messages
            </Link>
            {user ? (
              <>
                <Link 
                  to="/client-settings" 
                  className="text-lg py-2 border-b border-border" 
                  onClick={() => setMenuOpen(false)}
                >
                  Settings
                </Link>
                <Button 
                  variant="destructive" 
                  className="mt-4" 
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                <Button variant="outline" onClick={() => {
                  navigate('/sign-in');
                  setMenuOpen(false);
                }}>
                  Login
                </Button>
                <Button onClick={() => {
                  navigate('/sign-up');
                  setMenuOpen(false);
                }}>
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
