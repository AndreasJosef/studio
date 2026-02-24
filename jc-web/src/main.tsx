import './index.css';

import { StrictMode } from 'react';
import { AuthProvider } from './core/auth/AuthProvider';
import { AuthRouter } from './core/auth/AuthRouter';

import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AuthRouter />
    </AuthProvider>
  </StrictMode>
);
