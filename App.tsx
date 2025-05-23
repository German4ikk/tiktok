
import React from 'react';
import Header from './components/Header';
import LinkButton from './components/LinkButton';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import ChatModal from './components/ChatModal'; // Import ChatModal
import ExpertTip from './components/ExpertTip'; // Import ExpertTip
import { LanguageProvider, useLocalization } from './hooks/useLocalization'; // Corrected/Confirmed path
import { ChatProvider, useChat } from './hooks/useChat'; // Import ChatProvider and useChat
import { LINKS_CONFIG } from './constants';

const AppContent: React.FC = () => {
  const { translations } = useLocalization();
  const { openChat } = useChat(); // Get openChat function from context

  return React.createElement(
    'div',
    { className: "min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start py-8 px-4 font-sans" },
    React.createElement(
      'div',
      { className: "w-full max-w-md" },
      React.createElement(LanguageSwitcher, null),
      React.createElement(Header, null),
      React.createElement(
        'nav',
        { className: "mt-8 space-y-4" },
        ...LINKS_CONFIG.map((linkItem) => {
          if (linkItem.action === 'openChat') {
            return React.createElement(LinkButton, {
              key: linkItem.id,
              item: { id: linkItem.id, icon: linkItem.icon, primary: linkItem.primary }, // Pass only necessary item props
              text: translations[linkItem.textKey] as string,
              onClick: openChat, // Assign openChat to onClick
            });
          }
          return React.createElement(LinkButton, {
            key: linkItem.id,
            item: linkItem, // Pass full item if it's a regular link
            text: translations[linkItem.textKey] as string,
          });
        })
      ),
      React.createElement(
        'main',
        { className: "mt-8" },
        React.createElement(AboutMe, null),
        React.createElement(ExpertTip, null) // Add ExpertTip component here
      ),
      React.createElement(Footer, null)
    ),
    React.createElement(ChatModal, null) // Render ChatModal here
  );
};

const App: React.FC = () => {
  return React.createElement(
    LanguageProvider,
    null,
    React.createElement( // Wrap AppContent with ChatProvider
      ChatProvider,
      null,
      React.createElement(AppContent, null)
    )
  );
};

export default App;