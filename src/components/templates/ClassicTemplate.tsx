import React from 'react';
import { ResumeData } from '../../types/resume';

export const ClassicTemplate: React.FC<ResumeData> = ({
  personalInfo,
  education,
  experience,
  skills,
}) => {
  return (
    <div className="font-serif max-w-4xl mx-auto">
      <header className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-600">{personalInfo.title}</p>
        <div className="mt-2 text-gray-600">
          <p>{personalInfo.email} • {personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <span className="text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-lg text-gray-700">{exp.company} • {exp.location}</p>
            <ul className="list-disc ml-5 mt-2">
              {exp.description.map((desc, index) => (
                <li key={index} className="text-gray-700 my-1">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-semibold">{edu.institution}</h3>
              <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
            </div>
            <p className="text-lg text-gray-700">{edu.degree} in {edu.field}</p>
            <p className="text-gray-600">{edu.location}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded border border-gray-300"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};