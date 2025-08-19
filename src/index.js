// src/index.js (for Create React App)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure this line exists and points to your CSS file
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you are using Vite, your file might be src/main.jsx and look like this:
/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
*/
