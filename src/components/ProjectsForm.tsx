// src/components/ProjectsForm.tsx
import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Plus, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ProjectItemProps {
  id: string;
  onDelete: (id: string) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ id, onDelete }) => {
  const { projects, setProjects } = useResumeStore();
  const item = projects.find(project => project.id === id);
  
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
    const updatedProjects = projects.map(project =>
      project.id === id ? {
        ...project,
        [name]: name === 'description' ? value.split('\n') : 
                name === 'technologies' ? value.split(',').map(tech => tech.trim()) : value
      } : project
    );
    setProjects(updatedProjects);
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
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="url"
          value={item.url || ''}
          onChange={handleChange}
          placeholder="URL (optional)"
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
      <input
        type="text"
        name="technologies"
        value={item.technologies.join(', ')}
        onChange={handleChange}
        placeholder="Technologies (comma separated)"
        className="w-full p-2 border rounded mt-4"
      />
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

export const ProjectsForm: React.FC = () => {
  const { projects, setProjects } = useResumeStore();

  const addProject = () => {
    const newProject = {
      id: crypto.randomUUID(),
      name: '',
      description: [],
      technologies: [],
      startDate: '',
      endDate: '',
    };
    setProjects([...projects, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            id={project.id}
            onDelete={deleteProject}
          />
        ))}
      </div>
    </div>
  );
};
