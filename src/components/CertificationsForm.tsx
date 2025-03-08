// src/components/CertificationsForm.tsx
import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Plus, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CertificationItemProps {
  id: string;
  onDelete: (id: string) => void;
}

const CertificationItem: React.FC<CertificationItemProps> = ({ id, onDelete }) => {
  const { certifications, setCertifications } = useResumeStore();
  const item = certifications.find(cert => cert.id === id);
  
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
    const updatedCertifications = certifications.map(cert =>
      cert.id === id ? { ...cert, [name]: value } : cert
    );
    setCertifications(updatedCertifications);
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
          placeholder="Certification Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="issuer"
          value={item.issuer}
          onChange={handleChange}
          placeholder="Issuing Organization"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="date"
          value={item.date}
          onChange={handleChange}
          placeholder="Issue Date"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="expirationDate"
          value={item.expirationDate || ''}
          onChange={handleChange}
          placeholder="Expiration Date (optional)"
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
      </div>
    </div>
  );
};

export const CertificationsForm: React.FC = () => {
  const { certifications, setCertifications } = useResumeStore();

  const addCertification = () => {
    const newCertification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
    };
    setCertifications([...certifications, newCertification]);
  };

  const deleteCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <button
          onClick={addCertification}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Add Certification
        </button>
      </div>
      <div className="space-y-4">
        {certifications.map((cert) => (
          <CertificationItem
            key={cert.id}
            id={cert.id}
            onDelete={deleteCertification}
          />
        ))}
      </div>
    </div>
  );
};
