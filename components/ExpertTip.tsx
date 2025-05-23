import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLocalization } from '../hooks/useLocalization'; 
import { LanguageCode } from '../types';

const ExpertTip: React.FC = () => {
  const { translations, language: currentLanguageCode } = useLocalization();
  const [tip, setTip] = useState<string | null>(null);
  const [isLoadingTip, setIsLoadingTip] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const getLanguageNameForAI = (code: LanguageCode): string => {
    switch (code) {
      case LanguageCode.EN: return "English";
      case LanguageCode.RU: return "Russian";
      case LanguageCode.FI: return "Finnish";
      case LanguageCode.ET: return "Estonian";
      default: return "English";
    }
  };

  const fetchTip = useCallback(async () => {
    if (!ai) {
      setError(translations.expertTipError || "AI features unavailable."); // Use generic error if AI not available
      return;
    }
    setIsLoadingTip(true);
    setError(null);
    setTip(null);

    try {
      const languageName = getLanguageNameForAI(currentLanguageCode);
      const prompt = `You are Digital Expert. Provide a short, insightful, and actionable tip (under 40 words) for businesses or individuals related to website development, digital marketing, or business automation. The tip should be encouraging and practical. Respond ONLY with the tip itself, in ${languageName}.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
      });

      const fetchedTip = response.text;
      if (fetchedTip) {
        setTip(fetchedTip);
      } else {
        setError(translations.expertTipError || "Could not get a tip.");
      }
    } catch (apiError: any) {
      let specificErrorMessage = translations.expertTipError;
      const errorString = apiError?.toString ? apiError.toString() : "";
      if (errorString.includes("429") || errorString.includes("RESOURCE_EXHAUSTED")) {
        // Rate limit error is handled for the user; specific console log for this case was removed to align with user's provided file.
        specificErrorMessage = translations.expertTipRateLimitError;
      } else {
        console.error("Error calling Gemini API for tip in ExpertTip:", apiError);
      }
      setError(specificErrorMessage || "An error occurred while fetching the tip.");
    } finally {
      setIsLoadingTip(false);
    }
  }, [ai, currentLanguageCode, translations.expertTipError, translations.expertTipRateLimitError]);

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