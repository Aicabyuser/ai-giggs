import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ProjectSearchParams } from '@/services/SearchService';

interface ProjectSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: ProjectSearchParams) => void;
  initialFilters?: ProjectSearchParams;
  showBadges?: boolean;
}

const ProjectSearch: React.FC<ProjectSearchProps> = ({ 
  onSearch, 
  onFilterChange, 
  initialFilters = {}, 
  showBadges = true 
}) => {
  const [searchQuery, setSearchQuery] = useState(initialFilters.searchTerm || "");
  const [budgetRange, setBudgetRange] = useState<[number, number]>(initialFilters.budget || [0, 20000]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialFilters.skills || []);
  const [selectedDurations, setSelectedDurations] = useState<string[]>(initialFilters.duration || []);
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
  
  const durations = ["Less than 1 month", "1-3 months", "3-6 months", "6+ months"];
  
  useEffect(() => {
    const hasFilters = 
      (selectedSkills.length > 0) || 
      (selectedDurations.length > 0) || 
      (budgetRange[0] > 0) || 
      (budgetRange[1] < 20000);
    
    setIsFiltersApplied(hasFilters);
  }, [selectedSkills, selectedDurations, budgetRange]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  
  const handleBudgetChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setBudgetRange(newRange);
  };
  
  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    }
  };
  
  const handleDurationChange = (duration: string, checked: boolean) => {
    if (checked) {
      setSelectedDurations([...selectedDurations, duration]);
    } else {
      setSelectedDurations(selectedDurations.filter(d => d !== duration));
    }
  };
  
  const applyFilters = () => {
    onFilterChange({
      searchTerm: searchQuery,
      budget: budgetRange,
      skills: selectedSkills,
      duration: selectedDurations
    });
    setPopoverOpen(false);
  };
  
  const clearFilters = () => {
    setBudgetRange([0, 20000]);
    setSelectedSkills([]);
    setSelectedDurations([]);
    
    onFilterChange({
      searchTerm: searchQuery,
      budget: [0, 20000],
      skills: [],
      duration: []
    });
  };
  
  const removeSkill = (skill: string) => {
    const updatedSkills = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(updatedSkills);
    
    onFilterChange({
      searchTerm: searchQuery,
      budget: budgetRange,
      skills: updatedSkills,
      duration: selectedDurations
    });
  };
  
  const removeDuration = (duration: string) => {
    const updatedDurations = selectedDurations.filter(d => d !== duration);
    setSelectedDurations(updatedDurations);
    
    onFilterChange({
      searchTerm: searchQuery,
      budget: budgetRange,
      skills: selectedSkills,
      duration: updatedDurations
    });
  };
  
  return (
    <div className="w-full mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search AI projects..."
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
                  {selectedSkills.length + selectedDurations.length + (budgetRange[0] > 0 || budgetRange[1] < 20000 ? 1 : 0)}
                </span>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filter Projects</h4>
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
                <h5 className="text-sm font-medium">Budget Range</h5>
                <div className="pt-4 pb-2">
                  <Slider 
                    value={budgetRange} 
                    max={20000} 
                    step={500}
                    onValueChange={handleBudgetChange}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${budgetRange[0]}</span>
                  <span>${budgetRange[1]}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Skills</h5>
                <div className="max-h-40 overflow-y-auto grid grid-cols-2 gap-2">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`skill-${skill}`} 
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={(checked) => 
                          handleSkillChange(skill, checked === true)
                        }
                      />
                      <Label htmlFor={`skill-${skill}`} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Project Duration</h5>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`duration-${duration}`} 
                        checked={selectedDurations.includes(duration)}
                        onCheckedChange={(checked) => 
                          handleDurationChange(duration, checked === true)
                        }
                      />
                      <Label htmlFor={`duration-${duration}`} className="text-sm">
                        {duration}
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
      
      {showBadges && isFiltersApplied && (
        <div className="flex flex-wrap gap-2 mt-3">
          {budgetRange[0] > 0 || budgetRange[1] < 20000 ? (
            <Badge variant="secondary" className="flex items-center gap-1">
              Budget: ${budgetRange[0]}-${budgetRange[1]}
            </Badge>
          ) : null}
          
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
          
          {selectedDurations.map(duration => (
            <Badge 
              key={duration} 
              variant="secondary" 
              className="flex items-center gap-1"
            >
              {duration}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeDuration(duration)}
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

export default ProjectSearch;
