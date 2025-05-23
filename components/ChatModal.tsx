import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useChat } from '../hooks/useChat';
import { useLocalization } from '../hooks/useLocalization'; 
import { LanguageCode } from '../types'; 

const ChatModal: React.FC = () => {
  const {
    closeChat,
    messages,
    sendMessage,
    isExpertTyping,
    setExpertTyping 
  } = useChat();
  const { translations, language: currentLanguageCode } = useLocalization();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isExpertTyping]);

  // Predefined responses based on language
  const getPredefinedResponse = useCallback((language: LanguageCode): string => {
    const responses = {
      [LanguageCode.EN]: [
        "I'm here to help with your digital needs. How can I assist you today?",
        "For website development, I recommend starting with a clear plan and user-friendly design.",
        "For advertising, consider your target audience and platform selection carefully.",
        "Business automation can save you time and reduce errors. What process would you like to automate?",
        "I specialize in digital solutions. Could you tell me more about your project?"
      ],
      [LanguageCode.RU]: [
        "Я здесь, чтобы помочь с вашими цифровыми потребностями. Чем я могу помочь?",
        "Для разработки веб-сайта рекомендую начать с четкого плана и удобного дизайна.",
        "Для рекламы тщательно продумайте целевую аудиторию и выбор платформы.",
        "Автоматизация бизнеса может сэкономить ваше время и сократить количество ошибок. Какой процесс вы хотели бы автоматизировать?",
        "Я специализируюсь на цифровых решениях. Не могли бы вы рассказать подробнее о вашем проекте?"
      ],
      [LanguageCode.FI]: [
        "Olen täällä auttamassa digitarpeissasi. Kuinka voin auttaa?",
        "Verkkosivun kehittämiseen suosittelen aloittamaan selkeästi suunnitellulla ja käyttäjäystävällisellä suunnittelulla.",
        "Mainontaa ajatellen kannattaa harkita tarkasti kohderyhmää ja alustan valintaa.",
        "Liiketoiminnan automatisointi voi säästää aikaasi ja vähentää virheitä. Minkä prosessin haluaisit automatisoida?",
        "Erityiskiintymykseni ovat digitaaliset ratkaisut. Voisitko kertoa lisää projektistasi?"
      ],
      [LanguageCode.ET]: [
        "Olen siin, et aidata teid digivajadustes. Kuidas saan teid aidata?",
        "Veebilehe arendamiseks soovitan alustada selge plaani ja kasutajasõbraliku disainiga.",
        "Reklaami jaoks kaaluge hoolikalt sihtrühma ja platvormi valikut.",
        "Äriprotsesside automatiseerimine võib säästa teie aega ja vähendada vigu. Millist protsessi soovite automatiseerida?",
        "Minu erialaks on digilahendused. Kas saaksite oma projektist lähemalt rääkida?"
      ]
    };

    const languageResponses = responses[language] || responses[LanguageCode.EN];
    return languageResponses[Math.floor(Math.random() * languageResponses.length)];
  }, []);

  const handleSendMessage = async () => {
    const userMessageText = inputText.trim();
    if (!userMessageText) return;

    // Add user message
    sendMessage(userMessageText, 'user');
    setInputText('');
    setExpertTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getPredefinedResponse(currentLanguageCode);
      sendMessage(response, 'expert');
      setExpertTyping(false);
    }, 800);
  };
  
  return React.createElement(
    'div',
    {
      className: "fixed inset-0 bg-slate-900 bg-opacity-80 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out",
      onClick: closeChat,
      role: "dialog",
      'aria-modal': "true",
      'aria-labelledby': "chat-modal-title"
    },
    React.createElement(
      'div',
      {
        className: "bg-slate-800 rounded-lg shadow-2xl w-full max-w-md flex flex-col overflow-hidden",
        style: { maxHeight: '80vh' },
        onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
      },
      // Header
      React.createElement(
        'div',
        { className: "bg-slate-700 p-4 flex justify-between items-center border-b border-slate-600" },
        React.createElement('h2', { id: "chat-modal-title", className: "text-lg font-semibold text-purple-300" }, translations.chatWithExpert),
        React.createElement(
          'button',
          {
            onClick: closeChat,
            className: "text-slate-400 hover:text-slate-200 transition-colors",
            'aria-label': translations.chatClose
          },
          React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6" },
            React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18 18 6M6 6l12 12" })
          )
        )
      ),
      // Messages Area
      React.createElement(
        'div',
        { className: "flex-grow p-4 space-y-3 overflow-y-auto custom-scrollbar", 'aria-live':"polite" },
        messages.map(msg =>
          React.createElement(
            'div',
            {
              key: msg.id,
              className: `flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`
            },
            React.createElement(
              'div',
              {
                className: `max-w-xs lg:max-w-md px-4 py-2.5 rounded-xl shadow ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-slate-600 text-slate-100 rounded-bl-none'
                }`
              },
              React.createElement('p', {className: "text-sm"}, msg.text)
            )
          )
        ),
        isExpertTyping && React.createElement(
            'div',
            { className: "flex justify-start"},
            React.createElement(
                'div',
                { className: "max-w-xs px-4 py-2.5 rounded-xl shadow bg-slate-600 text-slate-100 rounded-bl-none" },
                 React.createElement('p', {className: "text-sm italic"}, translations.expertTyping)
            )
        ),
        React.createElement('div', { ref: messagesEndRef })
      ),
      // Input Area
      React.createElement(
        'div',
        { className: "p-4 border-t border-slate-600 bg-slate-700" },
        React.createElement(
          'div',
          { className: "flex items-center space-x-2" },
          React.createElement('input', {
            type: "text",
            value: inputText,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value),
            onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') handleSendMessage(); },
            placeholder: translations.chatPlaceholder,
            className: "flex-grow p-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
          }),
          React.createElement(
            'button',
            {
              onClick: handleSendMessage,
              className: "p-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75",
              'aria-label': translations.chatSend,
              disabled: isExpertTyping 
            },
            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5 transform rotate-45" },
              React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" })
            )
          )
        ),
        React.createElement( 
            'p',
            { className: "text-xs text-slate-400 pt-3 text-center" },
            translations.chatTelegramSimulationHint
        )
      )
    )
  );
};

export default ChatModal;
