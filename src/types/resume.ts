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

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
}

export type TemplateType = 'modern' | 'classic' | 'minimal';

export interface ResumeState extends ResumeData {
  selectedTemplate: TemplateType;
  setPersonalInfo: (info: PersonalInfo) => void;
  setEducation: (education: Education[]) => void;
  setExperience: (experience: Experience[]) => void;
  setSkills: (skills: Skill[]) => void;
  setTemplate: (template: TemplateType) => void;
}