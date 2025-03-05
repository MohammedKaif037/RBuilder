import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Plus, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SkillItemProps {
  id: string;
  onDelete: (id: string) => void;
}

const SkillItem: React.FC<SkillItemProps> = ({ id, onDelete }) => {
  const { skills, setSkills } = useResumeStore();
  const item = skills.find(skill => skill.id === id);
  
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
    const updatedSkills = skills.map(skill =>
      skill.id === id ? {
        ...skill,
        [name]: name === 'level' ? parseInt(value) : value
      } : skill
    );
    setSkills(updatedSkills);
  };

  if (!item) return null;

  return (
    <div ref={setNodeRef} style={style} className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center gap-4">
      <div {...attributes} {...listeners} className="cursor-move">
        <GripVertical className="text-gray-400" />
      </div>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleChange}
        placeholder="Skill"
        className="flex-1 p-2 border rounded"
      />
      <input
        type="range"
        name="level"
        value={item.level}
        onChange={handleChange}
        min="1"
        max="5"
        className="w-32"
      />
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export const SkillsForm: React.FC = () => {
  const { skills, setSkills } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const newSkillItem = {
      id: crypto.randomUUID(),
      name: newSkill,
      level: 3,
    };
    setSkills([...skills, newSkillItem]);
    setNewSkill('');
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Skills</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new skill"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addSkill}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Add
        </button>
      </div>
      <div className="space-y-2">
        {skills.map((skill) => (
          <SkillItem
            key={skill.id}
            id={skill.id}
            onDelete={deleteSkill}
          />
        ))}
      </div>
    </div>
  );
};