
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { SOCIAL_LINKS_CONFIG } from '../constants';

const Footer: React.FC = () => {
  const { translations } = useLocalization();

  return React.createElement(
    'footer',
    { className: "text-center mt-10 pb-6" },
    React.createElement(
      'div',
      { className: "flex justify-center space-x-5 mb-4" },
      ...SOCIAL_LINKS_CONFIG.map((link) =>
        React.createElement(
          'a',
          {
            key: link.id,
            href: link.href,
            target: "_blank",
            rel: "noopener noreferrer",
            'aria-label': link.label,
            className: "text-slate-400 hover:text-purple-400 transition-colors duration-200",
          },
          link.icon // link.icon is already a React.createElement(...) output from constants.tsx
        )
      )
    ),
    React.createElement('p', { className: "text-xs text-slate-500" }, translations.footerMadeBy)
  );
};

export default Footer;
