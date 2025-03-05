import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Plus, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EducationItemProps {
  id: string;
  onDelete: (id: string) => void;
}

const EducationItem: React.FC<EducationItemProps> = ({ id, onDelete }) => {
  const { education, setEducation } = useResumeStore();
  const item = education.find(edu => edu.id === id);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedEducation = education.map(edu =>
      edu.id === id ? { ...edu, [name]: value } : edu
    );
    setEducation(updatedEducation);
  };

  if (!item) return null;

  return (
    <div ref={setNodeRef} style={style} className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <div {...attributes} {...listeners} className="cursor-move">
          <GripVertical className="text-gray-400" />
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700"
        >
          <X size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="institution"
          value={item.institution}
          onChange={handleChange}
          placeholder="Institution"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="degree"
          value={item.degree}
          onChange={handleChange}
          placeholder="Degree"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="field"
          value={item.field}
          onChange={handleChange}
          placeholder="Field of Study"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={item.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="startDate"
          value={item.startDate}
          onChange={handleChange}
          placeholder="Start Date"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="endDate"
          value={item.endDate}
          onChange={handleChange}
          placeholder="End Date"
          className="p-2 border rounded"
        />
      </div>
    </div>
  );
};

export const EducationForm: React.FC = () => {
  const { education, setEducation } = useResumeStore();

  const addEducation = () => {
    const newEducation = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      location: '',
    };
    setEducation([...education, newEducation]);
  };

  const deleteEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Add Education
        </button>
      </div>
      <div className="space-y-4">
        {education.map((edu) => (
          <EducationItem
            key={edu.id}
            id={edu.id}
            onDelete={deleteEducation}
          />
        ))}
      </div>
    </div>
  );
};