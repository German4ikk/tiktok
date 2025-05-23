
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const Header: React.FC = () => {
  const { translations } = useLocalization();

  return React.createElement(
    'header',
    { className: "text-center" },
    React.createElement('img', {
      src: "https://picsum.photos/seed/digitalexpert/128/128", // Static seed for consistent image
      alt: "Digital Expert Avatar",
      className: "w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-500 shadow-lg",
    }),
    React.createElement('h1', { className: "text-3xl font-bold text-slate-100" }, translations.headerTitle),
    React.createElement('p', { className: "text-md text-purple-300 mt-1 px-2" }, translations.headerSubtitle)
  );
};

export default Header;
