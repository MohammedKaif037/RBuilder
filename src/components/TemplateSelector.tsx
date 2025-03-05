import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { TemplateType } from '../types/resume';
import { Layout, Type, Minimize } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
  const { selectedTemplate, setTemplate } = useResumeStore();

  const templates: { id: TemplateType; name: string; icon: React.ReactNode }[] = [
    { id: 'modern', name: 'Modern', icon: <Layout size={20} /> },
    { id: 'classic', name: 'Classic', icon: <Type size={20} /> },
    { id: 'minimal', name: 'Minimal', icon: <Minimize size={20} /> },
  ];

  return (
    <div className="flex gap-4 mb-6">
      {templates.map(({ id, name, icon }) => (
        <button
          key={id}
          onClick={() => setTemplate(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedTemplate === id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {icon}
          {name}
        </button>
      ))}
    </div>
  );
};