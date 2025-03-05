import React, { useState } from 'react';
import { DraggableFormSection } from './components/DraggableFormSection';
import { ResumePreview } from './components/ResumePreview';
import { FileText, Eye } from 'lucide-react';

function App() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-blue-600" />
            Resume Builder
          </h1>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Eye size={20} />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showPreview ? (
          <ResumePreview />
        ) : (
          <DraggableFormSection />
        )}
      </main>
    </div>
  );
}

export default App;