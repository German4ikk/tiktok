
export enum LanguageCode {
  EN = 'en',
  RU = 'ru',
  FI = 'fi',
  ET = 'et',
}

export interface Translations {
  [key: string]: string | Translations; // Allows for nested translations
}

export interface LocalizedContent {
  headerTitle: string;
  headerSubtitle: string;
  buttonWebsite: string;
  buttonTelegram: string;
  buttonYouTube: string;
  buttonInstagram: string;
  buttonDonate: string;
  buttonConsultation: string;
  aboutMeTitle: string;
  aboutMeText: string;
  footerMadeBy: string;
  languageSwitcherTooltip: string;
  chatWithExpert: string;
  chatPlaceholder: string;
  chatSend: string;
  chatSimulateReply: string; // This key might become unused, but kept for now to avoid breaking old refs if any.
  chatClose: string;
  expertTyping: string;
  chatTelegramSimulationHint: string;
  chatErrorReply: string;
  chatRateLimitError: string; // New key for chat rate limit
  expertTipTitle: string;
  expertTipButton: string;
  expertTipLoading: string;
  expertTipError: string;
  expertTipRateLimitError: string; // New key for tip rate limit
}

export interface Language {
  code: LanguageCode;
  name: string;
  flag?: string; // Optional emoji flag
}

export interface LinkItem {
  id: string;
  href?: string; // Optional: if not present, it might be an action button
  textKey: keyof Pick<LocalizedContent, 'buttonWebsite' | 'buttonTelegram' | 'buttonYouTube' | 'buttonInstagram' | 'buttonDonate' | 'buttonConsultation'>;
  icon: React.ReactNode;
  primary?: boolean; // Optional flag for primary action button styling
  action?: 'openChat'; // For special actions
}

export interface SocialLink {
  id: string;
  href: string;
  icon: React.ReactNode;
  label: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'expert';
  timestamp: Date;
}