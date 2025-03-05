import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TemplateSelector } from './TemplateSelector';

export const ResumePreview: React.FC = () => {
  const resumeData = useResumeStore();

  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
  };

  const SelectedTemplate = templates[resumeData.selectedTemplate];

  return (
    <div className="space-y-6">
      <TemplateSelector />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[800px] mx-auto">
        <SelectedTemplate {...resumeData} />
      </div>
    </div>
  );
};