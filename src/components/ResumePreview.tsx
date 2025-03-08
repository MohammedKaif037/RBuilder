import React, { useRef } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TemplateSelector } from './TemplateSelector';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ResumePreview: React.FC = () => {
  const resumeData = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);

  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
  };

  const SelectedTemplate = templates[resumeData.selectedTemplate];

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('Resume.pdf');
  };

  return (
    <div className="space-y-6">
      <TemplateSelector />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[800px] mx-auto">
        <div ref={resumeRef}>
          <SelectedTemplate {...resumeData} />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Download Resume
        </button>
      </div>
    </div>
  );
};
