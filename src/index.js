import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/react_task_board'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

const sendToConsoleIfPoorPerformance = ({ id, name, value }) => {
  const thresholds = {
    FCP: 2000, // 2 seconds
    LCP: 2000, // 2 seconds
    CLS: 0.1,
    FID: 100, // 100 milliseconds
    TBT: 300, // 300 milliseconds
  };

  if (value > thresholds[name]) {
    console.warn(`Poor performance detected: ${name} (${id}) took ${value} milliseconds`);
  }
};

reportWebVitals(sendToConsoleIfPoorPerformance);
