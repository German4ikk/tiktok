import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      'process.env': {
        ...Object.entries(env).reduce((acc, [key, val]) => {
          acc[key] = JSON.stringify(val);
          return acc;
        }, {} as Record<string, string>)
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-intl'],
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true
    }
  };
});
