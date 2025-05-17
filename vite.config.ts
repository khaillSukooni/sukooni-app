
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure output filenames include content hash for cache busting
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  define: {
    // Make sure the GitHub commit hash and build date/time are available to the client
    'import.meta.env.VITE_GIT_COMMIT_HASH': JSON.stringify(process.env.VITE_GIT_COMMIT_HASH || 'dev'),
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(process.env.VITE_BUILD_DATE || new Date().toISOString()),
  }
}));
