import React from 'react';
import ReactDOM from 'react-dom';
import { TimerProvider } from './context/TimerContext';
import TimerPage from './pages/TimerPage';
import './styles/styles.css';

ReactDOM.render(
  <TimerProvider>
    <TimerPage />
  </TimerProvider>,
  document.getElementById('root')
);
