import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
  root.render(<App />); // No StrictMode in development
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ); // StrictMode enabled in production
}