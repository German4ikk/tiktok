import React, { useState, useEffect, useCallback } from 'react';
import { useLocalization } from '../hooks/useLocalization'; 
import { LanguageCode } from '../types';

// Предопределенные советы для разных языков
const PREDEFINED_TIPS = {
  [LanguageCode.EN]: [
    "Optimize your website's loading speed to improve user experience and SEO rankings.",
    "Use analytics to track user behavior and make data-driven decisions for your business.",
    "Implement responsive design to ensure your website looks great on all devices.",
    "Regular content updates keep your audience engaged and improve search rankings.",
    "Automate repetitive tasks to save time and reduce errors in your business processes."
  ],
  [LanguageCode.RU]: [
    "Оптимизируйте скорость загрузки сайта для улучшения пользовательского опыта и SEO.",
    "Используйте аналитику для отслеживания поведения пользователей и принятия решений.",
    "Внедрите адаптивный дизайн, чтобы ваш сайт отлично выглядел на всех устройствах.",
    "Регулярные обновления контента удерживают аудиторию и улучшают поисковые рейтинги.",
    "Автоматизируйте повторяющиеся задачи для экономии времени и уменьшения ошибок."
  ],
  [LanguageCode.FI]: [
    "Optimoi verkkosivustosi latausnopeus parantaaksesi käyttäjäkokemusta ja hakukonenäkyvyyttä.",
    "Käytä analytiikkaa käyttäjien käyttäytymisen seuraamiseen ja tietopohjaisten päätösten tekemiseen.",
    "Toteuta responsiivinen suunnittelu varmistaaksesi, että sivustosi näyttää hyvältä kaikilla laitteilla.",
    "Säännölliset sisältöpäivitykset pitävät yleisösi kiinnostuneena ja parantavat hakusijoituksia.",
    "Automatisoi toistuvia tehtäviä säästääksesi aikaa ja vähentääksesi virheitä liiketoimintaprosesseissa."
  ],
  [LanguageCode.ET]: [
    "Optimeerige oma veebisaidi laadimiskiirust, et parandada kasutajakogemust ja otsingumootori tulemusi.",
    "Kasutage analüütikat kasutajate käitumise jälgimiseks ja andmepõhiste otsuste tegemiseks.",
    "Rakendage reageerivat disaini, et teie veebisait näeks kõigil seadmetel hea välja.",
    "Regulaarsed sisuvärskendused hoiavad teie publikut kaasatuna ja parandavad otsingumootori tulemusi.",
    "Automatiseerige korduvaid ülesandeid, et säästa aega ja vähendada vigu äriprotsessides."
  ]
};

const ExpertTip: React.FC = () => {
  const { translations, language: currentLanguageCode } = useLocalization();
  const [tip, setTip] = useState<string | null>(null);
  const [isLoadingTip, setIsLoadingTip] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTip = useCallback(() => {
    setIsLoadingTip(true);
    setError(null);
    setTip(null);
    
    // Имитация задержки загрузки для реалистичности
    setTimeout(() => {
      try {
        // Получаем советы для текущего языка или английские по умолчанию
        const tipsForLanguage = PREDEFINED_TIPS[currentLanguageCode] || PREDEFINED_TIPS[LanguageCode.EN];
        
        // Выбираем случайный совет из массива
        const randomIndex = Math.floor(Math.random() * tipsForLanguage.length);
        const randomTip = tipsForLanguage[randomIndex];
        
        setTip(randomTip);
      } catch (error) {
        console.error('Error getting predefined tip:', error);
        setError(translations.expertTipError || "Could not get a tip.");
      } finally {
        setIsLoadingTip(false);
      }
    }, 800); // Задержка в 800 мс для имитации загрузки
  }, [currentLanguageCode, translations.expertTipError]);

  useEffect(() => {
    fetchTip();
  }, [fetchTip]);

  const tipContent = () => {
    if (isLoadingTip) {
      return React.createElement('p', { className: "text-slate-400 italic text-sm" }, translations.expertTipLoading);
    }
    if (error) {
      // Use red-400 for rate limit errors as well, as it's still an error state.
      return React.createElement('p', { className: "text-red-400 text-sm" }, error);
    }
    if (tip) {
      return React.createElement('p', { className: "text-slate-200 leading-relaxed" }, tip);
    }
    return null;
  };

  return React.createElement(
    'section',
    { className: "bg-slate-800 p-6 rounded-lg shadow-lg mt-8" },
    React.createElement('h2', { className: "text-xl font-semibold text-purple-300 mb-4" }, translations.expertTipTitle),
    React.createElement(
      'div',
      { className: "min-h-[60px] flex items-center" }, 
      tipContent()
    ),
    React.createElement(
      'button',
      {
        onClick: fetchTip,
        disabled: isLoadingTip,
        className: "mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
      },
      translations.expertTipButton
    )
  );
};

export default ExpertTip;