
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeveloperSearchParams } from '@/services/SearchService';

interface DeveloperSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: DeveloperSearchParams) => void;
  initialFilters?: DeveloperSearchParams;
  showBadges?: boolean;
}

const DeveloperSearch = ({ 
  onSearch, 
  onFilterChange, 
  initialFilters = {}, 
  showBadges = true 
}: DeveloperSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(initialFilters.searchTerm || "");
  const [hourlyRateRange, setHourlyRateRange] = useState<[number, number]>(initialFilters.hourlyRate || [50, 200]);
  const [experienceLevelRange, setExperienceLevelRange] = useState<[number, number]>(initialFilters.experienceLevel || [0, 15]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialFilters.skills || []);
  const [availability, setAvailability] = useState<string>(initialFilters.availability || "");
  const [minRating, setMinRating] = useState<number>(initialFilters.minRating || 0);
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  const skills = [
    "Machine Learning", 
    "Computer Vision", 
    "NLP", 
    "Deep Learning", 
    "Data Science", 
    "TensorFlow", 
    "PyTorch",
    "Reinforcement Learning",
    "AI Research",
    "Neural Networks",
    "MLOps",
    "Data Engineering"
  ];
  
  const availabilityOptions = ["Full-time", "Part-time", "Contract", "Hourly"];
  const ratingOptions = [0, 3, 3.5, 4, 4.5, 5];
  
  useEffect(() => {
    // Check if any filters are applied
    const hasFilters = 
      (selectedSkills.length > 0) || 
      (availability !== "") || 
      (minRating > 0) ||
      (hourlyRateRange[0] > 50) || 
      (hourlyRateRange[1] < 200) ||
      (experienceLevelRange[0] > 0) ||
      (experienceLevelRange[1] < 15);
    
    setIsFiltersApplied(hasFilters);
  }, [selectedSkills, availability, minRating, hourlyRateRange, experienceLevelRange]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  
  const handleHourlyRateChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setHourlyRateRange(newRange);
  };
  
  const handleExperienceLevelChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setExperienceLevelRange(newRange);
  };
  
  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    }
  };
  
  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
  };
  
  const handleMinRatingChange = (value: string) => {
    setMinRating(parseFloat(value));
  };
  
  const applyFilters = () => {
    onFilterChange({
      searchTerm: searchQuery,
      hourlyRate: hourlyRateRange,
      experienceLevel: experienceLevelRange,
      skills: selectedSkills,
      availability: availability || undefined,
      minRating: minRating || undefined
    });
    setPopoverOpen(false);
  };
  
  const clearFilters = () => {
    setHourlyRateRange([50, 200]);
    setExperienceLevelRange([0, 15]);
    setSelectedSkills([]);
    setAvailability("");
    setMinRating(0);
    
    onFilterChange({
      searchTerm: searchQuery,
      hourlyRate: [50, 200],
      experienceLevel: [0, 15],
      skills: [],
      availability: undefined,
      minRating: undefined
    });
  };
  
  const removeSkill = (skill: string) => {
    const updatedSkills = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(updatedSkills);
    
    // Also update the parent component
    onFilterChange({
      searchTerm: searchQuery,
      hourlyRate: hourlyRateRange,
      experienceLevel: experienceLevelRange,
      skills: updatedSkills,
      availability: availability || undefined,
      minRating: minRating || undefined
    });
  };
  
  return (
    <div className="w-full mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search AI developers..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`min-w-[120px] ${isFiltersApplied ? 'bg-secondary' : ''}`}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {isFiltersApplied && (
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {selectedSkills.length + 
                   (availability ? 1 : 0) + 
                   (minRating > 0 ? 1 : 0) + 
                   (hourlyRateRange[0] > 50 || hourlyRateRange[1] < 200 ? 1 : 0) +
                   (experienceLevelRange[0] > 0 || experienceLevelRange[1] < 15 ? 1 : 0)}
                </span>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filter Developers</h4>
                {isFiltersApplied && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Hourly Rate ($)</h5>
                <div className="pt-4 pb-2">
                  <Slider 
                    value={hourlyRateRange} 
                    min={50}
                    max={200} 
                    step={5}
                    onValueChange={handleHourlyRateChange}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${hourlyRateRange[0]}/hr</span>
                  <span>${hourlyRateRange[1]}/hr</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Experience Level (years)</h5>
                <div className="pt-4 pb-2">
                  <Slider 
                    value={experienceLevelRange} 
                    min={0}
                    max={15} 
                    step={1}
                    onValueChange={handleExperienceLevelChange}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{experienceLevelRange[0]} years</span>
                  <span>{experienceLevelRange[1]} years</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Availability</h5>
                <Select value={availability} onValueChange={handleAvailabilityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any availability</SelectItem>
                    {availabilityOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Minimum Rating</h5>
                <Select 
                  value={minRating.toString()} 
                  onValueChange={handleMinRatingChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any rating</SelectItem>
                    {ratingOptions.slice(1).map(option => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}+ stars
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Skills</h5>
                <div className="max-h-40 overflow-y-auto grid grid-cols-2 gap-2">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`dev-skill-${skill}`} 
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={(checked) => 
                          handleSkillChange(skill, checked === true)
                        }
                      />
                      <Label htmlFor={`dev-skill-${skill}`} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Active filters badges */}
      {showBadges && isFiltersApplied && (
        <div className="flex flex-wrap gap-2 mt-3">
          {(hourlyRateRange[0] > 50 || hourlyRateRange[1] < 200) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ${hourlyRateRange[0]}-${hourlyRateRange[1]}/hr
            </Badge>
          )}
          
          {(experienceLevelRange[0] > 0 || experienceLevelRange[1] < 15) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {experienceLevelRange[0]}-{experienceLevelRange[1]} years
            </Badge>
          )}
          
          {availability && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {availability}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  setAvailability("");
                  onFilterChange({
                    ...{
                      searchTerm: searchQuery,
                      hourlyRate: hourlyRateRange,
                      experienceLevel: experienceLevelRange,
                      skills: selectedSkills,
                      minRating: minRating || undefined
                    },
                    availability: undefined
                  });
                }}
              />
            </Badge>
          )}
          
          {minRating > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {minRating}+ stars
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  setMinRating(0);
                  onFilterChange({
                    ...{
                      searchTerm: searchQuery,
                      hourlyRate: hourlyRateRange,
                      experienceLevel: experienceLevelRange,
                      skills: selectedSkills,
                      availability: availability || undefined
                    },
                    minRating: undefined
                  });
                }}
              />
            </Badge>
          )}
          
          {selectedSkills.map(skill => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="flex items-center gap-1"
            >
              {skill}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeSkill(skill)}
              />
            </Badge>
          ))}
          
          {isFiltersApplied && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DeveloperSearch;
