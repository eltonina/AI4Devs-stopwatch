import React from 'react';
import PropTypes from 'prop-types';

const StopwatchControls = ({ onStart, onStop, onReset, isRunning }) => (
  <div className="controls">
    <button className="primary" onClick={onStart} disabled={isRunning}>
      Start
    </button>
    <button className="secondary" onClick={onStop} disabled={!isRunning}>
      Stop
    </button>
    <button className="reset" onClick={onReset}>
      Reset
    </button>
  </div>
);

StopwatchControls.propTypes = {
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default StopwatchControls;
