import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './index.scss';
import 'macro-css';

import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
