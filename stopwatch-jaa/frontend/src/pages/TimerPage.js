import React, { useContext, useEffect } from 'react';
import TimerDisplay from '../components/TimerDisplay';
import StopwatchControls from '../components/StopwatchControls';
import { TimerContext } from '../context/TimerContext';
import { Container } from '@material-ui/core';

const TimerPage = () => {
  const { time, isRunning, startTimer, stopTimer, resetTimer } = useContext(TimerContext);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        startTimer();
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, startTimer]);

  return (
    <Container className="container">
      <h1>Welcome to Athletic Timing App <span role="img" aria-label="trophy">🏆</span></h1>
      <TimerDisplay time={time} />
      <StopwatchControls onStart={startTimer} onStop={stopTimer} onReset={resetTimer} isRunning={isRunning} />
    </Container>
  );
};

export default TimerPage;
