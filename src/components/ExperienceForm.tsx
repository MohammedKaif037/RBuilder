import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Plus, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ExperienceItemProps {
  id: string;
  onDelete: (id: string) => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ id, onDelete }) => {
  const { experience, setExperience } = useResumeStore();
  const item = experience.find(exp => exp.id === id);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedExperience = experience.map(exp =>
      exp.id === id ? {
        ...exp,
        [name]: name === 'description' ? value.split('\n') : value
      } : exp
    );
    setExperience(updatedExperience);
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
          name="company"
          value={item.company}
          onChange={handleChange}
          placeholder="Company"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="position"
          value={item.position}
          onChange={handleChange}
          placeholder="Position"
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
      <textarea
        name="description"
        value={item.description.join('\n')}
        onChange={handleChange}
        placeholder="Description (one point per line)"
        className="w-full p-2 border rounded mt-4 h-32"
      />
    </div>
  );
};

export const ExperienceForm: React.FC = () => {
  const { experience, setExperience } = useResumeStore();

  const addExperience = () => {
    const newExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: [],
    };
    setExperience([...experience, newExperience]);
  };

  const deleteExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Add Experience
        </button>
      </div>
      <div className="space-y-4">
        {experience.map((exp) => (
          <ExperienceItem
            key={exp.id}
            id={exp.id}
            onDelete={deleteExperience}
          />
        ))}
      </div>
    </div>
  );
};