
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // Import the i18n configuration
import { Toaster } from '@/components/ui/toaster';
import Web3Provider from './providers/Web3Provider';

// Add window.ethereum to the global window type
declare global {
  interface Window {
    ethereum?: any;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3Provider>
      <App />
      <Toaster />
    </Web3Provider>
  </React.StrictMode>,
);
