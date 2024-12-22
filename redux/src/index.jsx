import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируйте createRoot
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Создайте корень
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);