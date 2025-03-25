
export interface ProjectSearchParams {
  searchTerm?: string;
  budget?: [number, number];
  skills?: string[];
  duration?: string[];
}

export interface DeveloperSearchParams {
  searchTerm?: string;
  skills?: string[];
  experience?: string[];
  hourlyRate?: [number, number];
}

// Project search functionality
export const filterProjects = (projects: any[], filters: ProjectSearchParams) => {
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
      const projectSkills = project.skills || [];
      if (!filters.skills.some(skill => projectSkills.includes(skill))) {
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
export const filterDevelopers = (developers: any[], filters: DeveloperSearchParams) => {
  return developers.filter(developer => {
    // Filter by search term
    if (filters.searchTerm && 
        !developer.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !developer.bio.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      const developerSkills = developer.skills || [];
      if (!filters.skills.some(skill => developerSkills.includes(skill))) {
        return false;
      }
    }
    
    // Filter by experience level
    if (filters.experience && filters.experience.length > 0) {
      if (!filters.experience.includes(developer.experienceLevel)) {
        return false;
      }
    }
    
    // Filter by hourly rate
    if (filters.hourlyRate && 
        (developer.hourlyRate < filters.hourlyRate[0] || 
         developer.hourlyRate > filters.hourlyRate[1])) {
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
