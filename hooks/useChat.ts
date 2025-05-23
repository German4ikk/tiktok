
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ChatMessage } from '../types';

interface ChatContextType {
  isChatOpen: boolean;
  messages: ChatMessage[];
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (text: string, sender: 'user' | 'expert') => void;
  isExpertTyping: boolean; // Indicates if the expert (AI) is processing
  setExpertTyping: (isTyping: boolean) => void; // Directly control typing status
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isExpertTyping, setIsExpertTyping] = useState(false);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
    // Optional: Add a default welcome message from the expert
    // if (messages.length === 0) {
    //   setMessages([{
    //     id: Date.now().toString(),
    //     text: "Hello! How can I help you with your free consultation?",
    //     sender: 'expert',
    //     timestamp: new Date()
    //   }]);
    // }
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
    // Optional: Clear messages on close, or persist them
    // setMessages([]);
  }, []);

  const sendMessage = useCallback((text: string, sender: 'user' | 'expert') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const setExpertTyping = useCallback((isTyping: boolean) => {
    setIsExpertTyping(isTyping);
  }, []);

  return React.createElement(
    ChatContext.Provider,
    { value: { isChatOpen, messages, openChat, closeChat, sendMessage, isExpertTyping, setExpertTyping } },
    children
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
