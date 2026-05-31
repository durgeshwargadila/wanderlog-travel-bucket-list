import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'wanderlog-toast',
          duration: 3500,
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(8px)',
          },
        }} 
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
