// client/src/components/Stopwatch.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeDisplay = styled.div`
  font-size: 2em;
`;

const Button = styled.button`
  margin: 0.5em;
`;

const Stopwatch = () => {
  const dispatch = useDispatch();
  const { startTime, currentTime, running, laps } = useSelector(state => state.stopwatch);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK', payload: Date.now() });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, dispatch]);

  const handleStart = () => {
    dispatch({ type: 'START', payload: Date.now() });
  };

  const handleStop = () => {
    dispatch({ type: 'STOP' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const handleLap = () => {
    dispatch({ type: 'LAP', payload: Date.now() });
  };

  const elapsed = currentTime ? (currentTime - startTime) / 1000 : 0;
  const lapTimes = laps.map((lap, index) => (
    <div key={index}>Lap {index + 1}: {lap}</div>
  ));

  const animationProps = useSpring({ opacity: running ? 1 : 0 });

  return (
    <Container>
      <TimeDisplay>{elapsed.toFixed(2)}s</TimeDisplay>
      <Button onClick={handleStart}>▶️</Button>
      <Button onClick={handleStop}>⏸️</Button>
      <Button onClick={handleReset}>🔄</Button>
      <Button onClick={handleLap}>🏁</Button>
      <animated.div style={animationProps}>
        {lapTimes}
      </animated.div>
    </Container>
  );
};

export default Stopwatch;
