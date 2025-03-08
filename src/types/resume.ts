// Add to src/types/resume.ts
export interface Project {
  id: string;
  name: string;
  description: string[];
  technologies: string[];
  startDate: string;
  endDate: string;
  url?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  expirationDate?: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

// Update ResumeData interface
export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export type TemplateType = 'modern' | 'classic' | 'minimal';

// Update ResumeState interface
export interface ResumeState extends ResumeData {
  selectedTemplate: TemplateType;
  setPersonalInfo: (info: PersonalInfo) => void;
  setEducation: (education: Education[]) => void;
  setExperience: (experience: Experience[]) => void;
  setSkills: (skills: Skill[]) => void;
  setProjects: (projects: Project[]) => void;
  setCertifications: (certifications: Certification[]) => void;
  setTemplate: (template: TemplateType) => void;
}
