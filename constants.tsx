
import React from 'react';
import { LinkItem, SocialLink, Language, LanguageCode } from './types';

// SVG Icons (simple examples)
export const GlobeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0 1 12 13.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 0 3 12c0 .778.099 1.533.284 2.253m0 0a11.965 11.965 0 0 0-2.824 4.582M3.284 14.253L3.284 14.253" })
  )
);

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" })
  )
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" })
  )
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 3.75h-9A2.25 2.25 0 0 0 5.25 6v12a2.25 2.25 0 0 0 2.25 2.25h9A2.25 2.25 0 0 0 18.75 18V6A2.25 2.25 0 0 0 16.5 3.75Z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.125 8.25h.008v.008h-.008V8.25Z" })
  )
);

export const EuroIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" })
  )
);

export const ConsultationIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.056 3 12s4.03 8.25 9 8.25Z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.879 11.121a3 3 0 1 0-4.242 0 3 3 0 0 0 4.242 0Zm0 0H14.12a3 3 0 0 1 0 4.243m-4.242 0H9.88Z" })
  )
);

export const LINKS_CONFIG: LinkItem[] = [
  { id: 'website', href: '#', textKey: 'buttonWebsite', icon: React.createElement(GlobeIcon, null) },
  { id: 'telegram', href: 'https://t.me/yourusername', textKey: 'buttonTelegram', icon: React.createElement(TelegramIcon, null) },
  { id: 'youtube', href: '#', textKey: 'buttonYouTube', icon: React.createElement(YouTubeIcon, null) },
  { id: 'instagram', href: '#', textKey: 'buttonInstagram', icon: React.createElement(InstagramIcon, null) },
  { id: 'donate', href: 'https://www.buymeacoffee.com/yourusername', textKey: 'buttonDonate', icon: React.createElement(EuroIcon, null), primary: true },
  { id: 'consultation', textKey: 'buttonConsultation', icon: React.createElement(ConsultationIcon, null), action: 'openChat' }, // No href, action defined
];

export const SOCIAL_LINKS_CONFIG: SocialLink[] = [
  { id: 'telegram_footer', href: 'https://t.me/yourusername', icon: React.createElement(TelegramIcon, {className: "w-5 h-5"}), label: 'Telegram' },
  { id: 'youtube_footer', href: '#', icon: React.createElement(YouTubeIcon, {className: "w-5 h-5"}), label: 'YouTube' },
  { id: 'instagram_footer', href: '#', icon: React.createElement(InstagramIcon, {className: "w-5 h-5"}), label: 'Instagram' },
];

export const AVAILABLE_LANGUAGES: Language[] = [
  { code: LanguageCode.EN, name: 'EN', flag: '🇬🇧' },
  { code: LanguageCode.RU, name: 'RU', flag: '🇷🇺' },
  { code: LanguageCode.FI, name: 'FI', flag: '🇫🇮' },
  { code: LanguageCode.ET, name: 'ET', flag: '🇪🇪' },
];
