
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, DollarSign, Calendar, MessageSquare, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeveloperSearch from '@/components/DeveloperSearch';
import { SearchService, DeveloperSearchParams } from '@/services/SearchService';
import { useToast } from "@/hooks/use-toast";

const FindDevelopers = () => {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<DeveloperSearchParams>({
    skills: [],
    hourlyRate: [50, 200],
    experienceLevel: [0, 15]
  });
  const [activeSort, setActiveSort] = useState<'rating' | 'experience' | 'hourlyRate'>('rating');
  const { toast } = useToast();

  // Load developers with search and filters
  useEffect(() => {
    const loadDevelopers = async () => {
      setIsLoading(true);
      try {
        // Combine search term with filters
        const searchParams: DeveloperSearchParams = {
          ...filters,
          searchTerm,
          sortBy: activeSort
        };
        
        const data = await SearchService.searchDevelopers(searchParams);
        setDevelopers(data);
      } catch (error) {
        console.error('Error searching developers:', error);
        toast({
          title: "Error",
          description: "Failed to load developers. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDevelopers();
  }, [searchTerm, filters, activeSort, toast]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleFilterChange = (newFilters: DeveloperSearchParams) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };
  
  // Sort developers based on active sort
  const sortDevelopers = (developersToSort: any[]) => {
    if (activeSort === 'rating') {
      return [...developersToSort].sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'experience') {
      return [...developersToSort].sort((a, b) => b.experience - a.experience);
    } else if (activeSort === 'hourlyRate') {
      return [...developersToSort].sort((a, b) => a.hourlyRate - b.hourlyRate);
    }
    return developersToSort;
  };

  const sortedDevelopers = sortDevelopers(developers);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Find AI Developers</h1>
          <p className="text-muted-foreground mt-1">Connect with top AI experts for your projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters - Desktop */}
        <aside className="hidden lg:block space-y-6">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="pr-4 space-y-6">
              <DeveloperSearch 
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                showBadges={false}
              />
            </div>
          </ScrollArea>
        </aside>
        
        <div className="lg:col-span-3 space-y-6">
          {/* Mobile Search */}
          <div className="lg:hidden">
            <DeveloperSearch 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />
          </div>
          
          <Tabs value={activeSort} onValueChange={(value) => setActiveSort(value as 'rating' | 'experience' | 'hourlyRate')}>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                {isLoading ? 'Loading developers...' : `${developers.length} developers found`}
              </p>
              <TabsList>
                <TabsTrigger value="rating">Top Rated</TabsTrigger>
                <TabsTrigger value="experience">Most Experienced</TabsTrigger>
                <TabsTrigger value="hourlyRate">Lowest Rate</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="rating" className="space-y-4 mt-0">
              {isLoading ? (
                <DevelopersLoadingSkeleton />
              ) : developers.length === 0 ? (
                <NoDevelopersFound />
              ) : (
                sortedDevelopers.map((developer) => (
                  <DeveloperCard key={developer.id} developer={developer} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="experience" className="space-y-4 mt-0">
              {isLoading ? (
                <DevelopersLoadingSkeleton />
              ) : developers.length === 0 ? (
                <NoDevelopersFound />
              ) : (
                sortedDevelopers.map((developer) => (
                  <DeveloperCard key={developer.id} developer={developer} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="hourlyRate" className="space-y-4 mt-0">
              {isLoading ? (
                <DevelopersLoadingSkeleton />
              ) : developers.length === 0 ? (
                <NoDevelopersFound />
              ) : (
                sortedDevelopers.map((developer) => (
                  <DeveloperCard key={developer.id} developer={developer} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface DeveloperCardProps {
  developer: {
    id: number;
    name: string;
    title: string;
    skills: string[];
    hourlyRate: number;
    availability: string;
    experience: number;
    rating: number;
    completedProjects: number;
  };
}

const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://avatars.githubusercontent.com/u/${developer.id}`} alt={developer.name} />
              <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-grow space-y-3">
            <div>
              <h3 className="font-semibold text-lg">
                <Link to={`/developer/${developer.id}`} className="hover:underline">
                  {developer.name}
                </Link>
              </h3>
              <p className="text-muted-foreground">{developer.title}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {developer.skills.slice(0, 4).map((skill, i) => (
                <Badge key={i} variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              ))}
              {developer.skills.length > 4 && (
                <Badge variant="outline">+{developer.skills.length - 4} more</Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-amber-500 fill-amber-500" />
                <span>
                  <span className="font-medium">{developer.rating}</span>
                  <span className="text-muted-foreground"> ({developer.completedProjects} projects)</span>
                </span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>${developer.hourlyRate}/hr</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{developer.availability}</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground">{developer.experience} years experience</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 md:self-center">
            <Button asChild>
              <Link to={`/developer/${developer.id}`}>
                View Profile
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/messages/new/${developer.id}`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DevelopersLoadingSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Skeleton className="h-20 w-20 rounded-full" />
              
              <div className="flex-grow space-y-3">
                <div>
                  <Skeleton className="h-6 w-40 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-28" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

const NoDevelopersFound = () => {
  return (
    <Card>
      <CardContent className="p-10 flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-secondary p-3 mb-4">
          <Search className="h-6 w-6 text-secondary-foreground" />
        </div>
        <h3 className="font-medium text-lg mb-1">No developers found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search or filter criteria to find developers matching your requirements.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reset filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FindDevelopers;
