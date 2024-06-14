import React from 'react';
import PropTypes from 'prop-types';

const TimerDisplay = ({ time }) => {
  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  return (
    <div className="timer-display">
      {formatTime(time)} <span role="img" aria-label="running">⏱️</span>
    </div>
  );
};

TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimerDisplay;
