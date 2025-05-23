
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const AboutMe: React.FC = () => {
  const { translations } = useLocalization();

  return React.createElement(
    'section',
    { className: "bg-slate-800 p-6 rounded-lg shadow-lg" },
    React.createElement('h2', { className: "text-xl font-semibold text-purple-300 mb-3" }, translations.aboutMeTitle),
    React.createElement('p', { className: "text-slate-300 leading-relaxed text-sm" }, translations.aboutMeText)
  );
};

export default AboutMe;
