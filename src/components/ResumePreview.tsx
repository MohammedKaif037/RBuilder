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

    const canvas = await html2canvas(resumeRef.current, { 
      scale: 1.5,  // Reduced from 2 to 1.5 for better size/quality balance
      useCORS: true,
      allowTaint: false,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.9); // Use JPEG with compression

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20; // 10mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add content with proper margins
    pdf.addImage(
      imgData, 
      'JPEG', 
      10,  // Left margin
      10,  // Top margin
      imgWidth, 
      imgHeight
    );

    // Add footer with proper spacing
    pdf.setFontSize(10);
    pdf.text('Page 1', 10, pageHeight - 10);

    pdf.save(`Resume-${resumeData.selectedTemplate}.pdf`);
  };

  return (
    <div className="space-y-6">
      <TemplateSelector />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[800px] mx-auto">
        <div ref={resumeRef} style={{ width: '190mm' }}> {/* Match A4 width */}
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
