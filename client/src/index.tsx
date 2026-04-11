import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from './contexts/SnackbarProvider';
if (import.meta.env.VITE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
