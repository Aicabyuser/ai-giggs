import { Developer, Project } from '@/types/models';

export interface ProjectSearchParams {
  searchTerm?: string;
  budget?: [number, number];
  skills?: string[];
  duration?: string[];
}

export interface DeveloperSearchParams {
  searchTerm?: string;
  skills?: string[];
  experienceLevel?: [number, number];
  hourlyRate?: [number, number];
  availability?: string;
  minRating?: number;
}

// Project search functionality
export const filterProjects = (projects: Project[], filters: ProjectSearchParams): Project[] => {
  return projects.filter(project => {
    // Filter by search term
    if (filters.searchTerm && !project.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by budget range
    if (filters.budget && (project.budget < filters.budget[0] || project.budget > filters.budget[1])) {
      return false;
    }
    
    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      if (!filters.skills.some(skill => project.skills.includes(skill))) {
        return false;
      }
    }
    
    // Filter by duration
    if (filters.duration && filters.duration.length > 0) {
      if (!filters.duration.includes(project.duration)) {
        return false;
      }
    }
    
    return true;
  });
};

// Developer search functionality
export const filterDevelopers = (developers: Developer[], filters: DeveloperSearchParams): Developer[] => {
  return developers.filter(developer => {
    // Filter by search term
    if (filters.searchTerm && 
        !developer.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !developer.bio.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      if (!filters.skills.some(skill => developer.skills.includes(skill))) {
        return false;
      }
    }
    
    // Filter by experience level range
    if (filters.experienceLevel) {
      const [min, max] = filters.experienceLevel;
      if (developer.experienceLevel < min || developer.experienceLevel > max) {
        return false;
      }
    }
    
    // Filter by hourly rate range
    if (filters.hourlyRate) {
      const [min, max] = filters.hourlyRate;
      if (developer.hourlyRate < min || developer.hourlyRate > max) {
        return false;
      }
    }

    // Filter by availability
    if (filters.availability && developer.availability !== filters.availability) {
      return false;
    }

    // Filter by minimum rating
    if (filters.minRating && developer.rating < filters.minRating) {
      return false;
    }
    
    return true;
  });
};

// Export a combined search service with methods for both developers and projects
export const SearchService = {
  filterProjects,
  filterDevelopers
};
