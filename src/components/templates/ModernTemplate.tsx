// Update src/components/templates/ModernTemplate.tsx
import React from 'react';
import { ResumeData } from '../../types/resume';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export const ModernTemplate: React.FC<ResumeData> = ({
  personalInfo,
  education,
  experience,
  skills,
  projects,
  certifications,
}) => {
  return (
    <div className="font-sans">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{personalInfo.fullName}</h1>
        <p className="text-xl text-gray-600 mt-1">{personalInfo.title}</p>
        <div className="flex justify-center items-center gap-4 mt-3 text-gray-600">
          <span className="flex items-center gap-1">
            <Phone size={16} />
            {personalInfo.phone}
          </span>
          <span className="flex items-center gap-1">
            <Mail size={16} />
            {personalInfo.email}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            {personalInfo.location}
          </span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Summary</h2>
        <p className="text-gray-700">{personalInfo.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <h3 className="font-semibold">{exp.position}</h3>
            <div className="text-gray-600">
              {exp.company} | {exp.location}
            </div>
            <div className="text-gray-500 text-sm">
              {exp.startDate} - {exp.endDate}
            </div>
            <ul className="list-disc list-inside mt-2">
              {exp.description.map((desc, index) => (
                <li key={index} className="text-gray-700">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">{project.name}</h3>
                {project.url && (
                  <a href={project.url} className="text-blue-600 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                    <Globe size={14} />
                    Link
                  </a>
                )}
              </div>
              <div className="text-gray-500 text-sm">
                {project.startDate} - {project.endDate}
              </div>
              <div className="text-gray-600 text-sm mt-1">
                {project.technologies.join(', ')}
              </div>
              <ul className="list-disc list-inside mt-2">
                {project.description.map((desc, index) => (
                  <li key={index} className="text-gray-700">{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
            <div className="text-gray-600">{edu.institution}</div>
            <div className="text-gray-500 text-sm">
              {edu.startDate} - {edu.endDate}
            </div>
          </div>
        ))}
      </section>

      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">{cert.name}</h3>
                {cert.url && (
                  <a href={cert.url} className="text-blue-600 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                    <Globe size={14} />
                    Verify
                  </a>
                )}
              </div>
              <div className="text-gray-600">{cert.issuer}</div>
              <div className="text-gray-500 text-sm">
                {cert.date}{cert.expirationDate ? ` - ${cert.expirationDate}` : ''}
              </div>
            </div>
          ))}
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="text-gray-700 mr-2"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
