import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthHeader from './AuthHeader';

const MainHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Use AuthHeader for authenticated users
  if (isAuthenticated) {
    return <AuthHeader />;
  }
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/images/favicon-192x192.png" 
                alt="AI-Giggs Logo" 
                className="h-10 w-10"
              />
              <span className="font-bold text-xl font-display">AI-Giggs</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>For Clients</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          to="/project-matching"
                          className="group flex h-full w-full flex-col justify-between rounded-md border p-4 transition-colors hover:bg-muted"
                        >
                          <div>
                            <div className="font-medium">AI Project Matching</div>
                            <p className="text-sm text-muted-foreground">
                              Describe your project and get matched with the perfect AI developer
                            </p>
                          </div>
                        </Link>
                        <Link
                          to="/developer-showcase"
                          className="group flex h-full w-full flex-col justify-between rounded-md border p-4 transition-colors hover:bg-muted"
                        >
                          <div>
                            <div className="font-medium">Browse AI Developers</div>
                            <p className="text-sm text-muted-foreground">
                              Explore our curated network of specialized AI developers
                            </p>
                          </div>
                        </Link>
                      </div>
                      <Link
                        to="/sign-up?role=client"
                        className="w-full rounded-md border p-4 transition-colors hover:bg-muted"
                      >
                        <div className="font-medium">Post Your AI Project</div>
                        <p className="text-sm text-muted-foreground">
                          Create an account and start hiring AI talent today
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>For Developers</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          to="/find-projects"
                          className="group flex h-full w-full flex-col justify-between rounded-md border p-4 transition-colors hover:bg-muted"
                        >
                          <div>
                            <div className="font-medium">Find AI Projects</div>
                            <p className="text-sm text-muted-foreground">
                              Browse open AI projects that match your expertise
                            </p>
                          </div>
                        </Link>
                        <Link
                          to="/developer-signup"
                          className="group flex h-full w-full flex-col justify-between rounded-md border p-4 transition-colors hover:bg-muted"
                        >
                          <div>
                            <div className="font-medium">Create Your AI Portfolio</div>
                            <p className="text-sm text-muted-foreground">
                              Showcase your skills and expertise to potential clients
                            </p>
                          </div>
                        </Link>
                      </div>
                      <Link
                        to="/sign-up?role=developer"
                        className="w-full rounded-md border p-4 transition-colors hover:bg-muted"
                      >
                        <div className="font-medium">Join Our AI Developer Network</div>
                        <p className="text-sm text-muted-foreground">
                          Apply to become a verified AI-Giggs developer
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/developer-showcase">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Browse Developers
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-2">
              <Link to="/sign-in">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden flex">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/40 animate-fade-in">
          <div className="flex flex-col divide-y divide-border/40">
            <Link to="/project-matching" className="px-4 py-3 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              AI Project Matching
            </Link>
            <Link to="/developer-showcase" className="px-4 py-3 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Browse AI Developers
            </Link>
            <Link to="/find-projects" className="px-4 py-3 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Find AI Projects
            </Link>
            <Link to="/developer-signup" className="px-4 py-3 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Developer Signup
            </Link>
            <div className="flex flex-col gap-2 p-4">
              <Link to="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link to="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
