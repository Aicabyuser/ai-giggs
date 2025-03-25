import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronDown,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const AuthHeader = () => {
  const { user, signOut, isAuthenticated, isClient, isDeveloper } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const MobileNav = () => (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] sm:w-[350px] pt-10">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center">
            <img 
              src="/images/favicon-192x192.png" 
              alt="AI-Giggs Logo" 
              className="h-8 w-8 mr-2"
            />
            <span className="font-bold text-lg">AI-Giggs</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 mb-2 p-2 bg-secondary/20 rounded-lg">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                </div>
              </div>
              
              {isClient && (
                <>
                  <SheetClose asChild>
                    <Link 
                      to="/client-dashboard" 
                      className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Briefcase className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/post-project" 
                      className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Post Project
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/manage-projects" 
                      className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Briefcase className="h-4 w-4" />
                      My Projects
                    </Link>
                  </SheetClose>
                </>
              )}
              
              {isDeveloper && (
                <>
                  <SheetClose asChild>
                    <Link 
                      to="/developer-dashboard" 
                      className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Briefcase className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/find-projects" 
                      className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Briefcase className="h-4 w-4" />
                      Find Projects
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/manage-bids" 
                      className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Briefcase className="h-4 w-4" />
                      My Bids
                    </Link>
                  </SheetClose>
                </>
              )}
              
              <SheetClose asChild>
                <Link 
                  to="/messages" 
                  className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="h-4 w-4" />
                  Messages
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link 
                  to={isClient ? "/client-profile" : "/developer-portfolio"} 
                  className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  {isClient ? "My Profile" : "My Portfolio"}
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link 
                  to={isClient ? "/client-settings" : "/developer-settings"} 
                  className="flex items-center px-2 py-3 gap-2 text-sm rounded-md hover:bg-secondary/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </SheetClose>
              
              <div className="pt-4 mt-4 border-t border-border">
                <SheetClose asChild>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                </SheetClose>
              </div>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Link 
                  to="/sign-in"
                  className="w-full" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link 
                  to="/sign-up"
                  className="w-full" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">Sign up</Button>
                </Link>
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/images/favicon-192x192.png" 
              alt="AI-Giggs Logo" 
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="font-bold text-lg md:text-xl font-display">AI-Giggs</span>
          </Link>
        </div>
        
        <div className="flex-1 flex">
          {isAuthenticated && !isMobile && (
            <nav className="hidden md:flex md:gap-6 ml-6">
              {isClient && (
                <>
                  <Link 
                    to="/client-dashboard" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/post-project" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Post Project
                  </Link>
                  <Link 
                    to="/manage-projects" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    My Projects
                  </Link>
                </>
              )}
              
              {isDeveloper && (
                <>
                  <Link 
                    to="/developer-dashboard" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/find-projects" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Find Projects
                  </Link>
                  <Link 
                    to="/manage-bids" 
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    My Bids
                  </Link>
                </>
              )}
              
              <Link 
                to="/messages" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Messages
              </Link>
            </nav>
          )}
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              {!isMobile && (
                <>
                  <Link to="/sign-in">
                    <Button variant="ghost" size="sm">Log in</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </>
              )}
              {isMobile && <MobileNav />}
            </>
          ) : (
            <>
              <button className="mr-2 p-2 relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px]">3</Badge>
              </button>
              
              {isMobile ? (
                <MobileNav />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative h-8 rounded-full flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-flex">{user?.name}</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {isClient ? (
                        <DropdownMenuItem onClick={() => navigate('/client-profile')}>
                          <User className="mr-2 h-4 w-4" />
                          <span>My Profile</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => navigate('/developer-portfolio')}>
                          <User className="mr-2 h-4 w-4" />
                          <span>My Portfolio</span>
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuItem onClick={() => navigate('/messages')}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                      </DropdownMenuItem>
                      
                      {isClient ? (
                        <DropdownMenuItem onClick={() => navigate('/manage-projects')}>
                          <Briefcase className="mr-2 h-4 w-4" />
                          <span>My Projects</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => navigate('/manage-bids')}>
                          <Briefcase className="mr-2 h-4 w-4" />
                          <span>My Bids</span>
                        </DropdownMenuItem>
                      )}
                      
                      {isClient ? (
                        <DropdownMenuItem onClick={() => navigate('/client-settings')}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => navigate('/developer-settings')}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
