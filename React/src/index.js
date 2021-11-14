import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/css/app.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
