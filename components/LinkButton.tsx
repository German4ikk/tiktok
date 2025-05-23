
import React from 'react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  item: Pick<LinkItem, 'id' | 'href' | 'icon' | 'primary'>; // Only require necessary fields
  text: string;
  onClick?: () => void; // Optional onClick handler
}

const LinkButton: React.FC<LinkButtonProps> = ({ item, text, onClick }) => {
  const baseClasses = "w-full flex items-center justify-center space-x-3 px-6 py-3.5 rounded-lg font-semibold text-slate-100 transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-opacity-75";
  const primaryClasses = "bg-purple-600 hover:bg-purple-700 hover:shadow-[0_0_15px_2px_rgba(192,132,252,0.5)] focus:ring-purple-400";
  const secondaryClasses = "bg-slate-700 hover:bg-slate-600 hover:shadow-[0_0_15px_2px_rgba(100,116,139,0.4)] focus:ring-slate-500";

  const buttonClasses = item.primary ? `${baseClasses} ${primaryClasses}` : `${baseClasses} ${secondaryClasses}`;

  const content = [
    item.icon,
    React.createElement('span', { key: 'text' }, text)
  ];

  if (onClick && !item.href) { // If onClick is provided and no href, render as a button
    return React.createElement(
      'button',
      {
        type: 'button',
        onClick: onClick,
        className: buttonClasses,
      },
      ...content
    );
  }

  // Default to rendering as a link
  return React.createElement(
    'a',
    {
      href: item.href || '#', // Fallback href if none provided but not an onClick button
      target: "_blank",
      rel: "noopener noreferrer",
      className: buttonClasses,
    },
    ...content
  );
};

export default LinkButton;
