
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { AVAILABLE_LANGUAGES } from '../constants';
import { LanguageCode } from '../types';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, translations } = useLocalization();

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
  };

  return React.createElement(
    'div',
    { className: "flex justify-center space-x-2 my-6", title: translations.languageSwitcherTooltip },
    ...AVAILABLE_LANGUAGES.map((lang) =>
      React.createElement(
        'button',
        {
          key: lang.code,
          onClick: () => handleLanguageChange(lang.code),
          className: `px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
            language === lang.code
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-100'
          }`,
          'aria-pressed': language === lang.code,
          'aria-label': `Switch to ${lang.name}`,
        },
        lang.flag ? React.createElement('span', { className: "mr-1.5 opacity-90" }, lang.flag) : null,
        lang.name
      )
    )
  );
};

export default LanguageSwitcher;
