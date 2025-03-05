import React from 'react';
import { useResumeStore } from '../store/useResumeStore';

export const PersonalInfoForm: React.FC = () => {
  const { personalInfo, setPersonalInfo } = useResumeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="title"
          value={personalInfo.title}
          onChange={handleChange}
          placeholder="Professional Title"
          className="p-2 border rounded"
        />
      </div>
      <textarea
        name="summary"
        value={personalInfo.summary}
        onChange={handleChange}
        placeholder="Professional Summary"
        className="w-full p-2 border rounded h-32"
      />
    </div>
  );
};