import React, { useRef } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FileDown } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TemplateSelector } from './TemplateSelector';

export const ResumePreview: React.FC = () => {
  const resumeData = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`resume-${resumeData.selectedTemplate}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <TemplateSelector />
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <FileDown size={20} />
          Download PDF
        </button>
      </div>
      <div 
        ref={resumeRef}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[800px] mx-auto"
      >
        <SelectedTemplate {...resumeData} />
      </div>
    </div>
  );
};
