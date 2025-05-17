
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Disable service workers in development to avoid stale responses
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister();
      console.log('Service worker unregistered for development mode');
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
