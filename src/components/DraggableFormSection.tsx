// Update src/components/DraggableFormSection.tsx
import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { SkillsForm } from './SkillsForm';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm } from './CertificationsForm';

export const DraggableFormSection: React.FC = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sections = [
    { id: 'personal-info', component: PersonalInfoForm },
    { id: 'experience', component: ExperienceForm },
    { id: 'education', component: EducationForm },
    { id: 'projects', component: ProjectsForm },
    { id: 'certifications', component: CertificationsForm },
    { id: 'skills', component: SkillsForm },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id);
      const newIndex = sections.findIndex((section) => section.id === over.id);
      arrayMove(sections, oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((section) => section.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-8">
          {sections.map(({ id, component: Component }) => (
            <div key={id} className="bg-white p-6 rounded-lg shadow-md">
              <Component />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
