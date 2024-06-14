import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => setTime(prevTime => prevTime + 10);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <TimerContext.Provider value={{ time, isRunning, startTimer, stopTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
