/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // добавьте другие переменные окружения здесь
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
