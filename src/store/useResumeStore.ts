// Update src/store/useResumeStore.ts
import { create } from 'zustand';
import { ResumeState, PersonalInfo, Education, Experience, Skill, Project, Certification, TemplateType } from '../types/resume';

const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  selectedTemplate: 'modern' as TemplateType,
};

export const useResumeStore = create<ResumeState>((set) => ({
  ...initialState,
  setPersonalInfo: (info: PersonalInfo) => set({ personalInfo: info }),
  setEducation: (education: Education[]) => set({ education }),
  setExperience: (experience: Experience[]) => set({ experience }),
  setSkills: (skills: Skill[]) => set({ skills }),
  setProjects: (projects: Project[]) => set({ projects }),
  setCertifications: (certifications: Certification[]) => set({ certifications }),
  setTemplate: (template: TemplateType) => set({ selectedTemplate: template }),
}));
