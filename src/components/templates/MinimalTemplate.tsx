import React from 'react';
import { ResumeData } from '../../types/resume';
import { Globe, File } from 'lucide-react';

export const MinimalTemplate: React.FC<ResumeData> = ({
  personalInfo,
  education,
  experience,
  skills,
  projects,
  certifications,
}) => {
  return (
    <div className="font-sans max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-light mb-2">{personalInfo.fullName}</h1>
        <p className="text-xl text-gray-600 mb-2">{personalInfo.title}</p>
        <div className="text-sm text-gray-500 space-x-4">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-xl font-medium">{exp.position}</h3>
              <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-gray-600 mb-2">{exp.company} • {exp.location}</p>
            <ul className="space-y-1">
              {exp.description.map((desc, index) => (
                <li key={index} className="text-gray-700">• {desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-xl font-medium">{edu.institution}</h3>
              <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
            </div>
            <p className="text-gray-700">{edu.degree} in {edu.field}</p>
            <p className="text-gray-600">{edu.location}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-y-2 gap-x-4">
          {skills.map((skill) => (
            <span key={skill.id} className="text-gray-700">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
       {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-medium">{project.name}</h3>
                <span className="text-sm text-gray-500">{project.startDate} - {project.endDate}</span>
              </div>
              <p className="text-gray-600 mb-2">
                {project.technologies.join(', ')}
                {project.url && (
                  <span className="ml-2 text-blue-600 flex items-center gap-1">
                    <Globe size={14} />
                    View Project
                  </span>
                )}
              </p>
              <ul className="list-disc ml-5 space-y-1">
                {project.description.map((desc, index) => (
                  <li key={index} className="text-gray-700">{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-medium">{cert.name}</h3>
                <span className="text-sm text-gray-500">{cert.date}</span>
              </div>
              <p className="text-gray-600 mb-2">
                {cert.issuer}
                {cert.url && (
                  <span className="ml-2 text-blue-600 flex items-center gap-1">
                    <File size={14} />
                    Verify
                  </span>
                )}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
  
