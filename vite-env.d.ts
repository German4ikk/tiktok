/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // другие переменные окружения...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
