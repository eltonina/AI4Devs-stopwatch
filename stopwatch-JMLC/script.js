document.addEventListener('DOMContentLoaded', (event) => {
  const startButton = document.getElementById('start-button');
  const clearButton = document.getElementById('clear-button');
  const timerDisplay = document.getElementById('timer-display');
  const modeSelector = document.querySelectorAll('input[name="mode"]');

  let interval;
  let startTime;
  let elapsedTime = 0;
  let countdownTime = 0;
  let mode = 'timer'; // Default mode is timer
  let previousTime;

  const MS_IN_SECOND = 1000;
  const MS_IN_MINUTE = MS_IN_SECOND * 60;
  const MS_IN_HOUR = MS_IN_MINUTE * 60;

  modeSelector.forEach(radio => {
    radio.addEventListener('change', (e) => {
      mode = e.target.value;
      clearTimer();
    });
  });

  startButton.addEventListener('click', () => {
    if (startButton.innerText === 'Start' || startButton.innerText === 'Continue') {
      startTimer();
    } else {
      stopTimer();
    }
  });

  clearButton.addEventListener('click', clearTimer);

  function startTimer() {
    if (mode === 'countdown' && (startButton.innerText === 'Start' || startButton.innerText === 'Continue')) {
      const hours = parseInt(prompt("Enter hours:", "0"), 10) || 0;
      const minutes = parseInt(prompt("Enter minutes:", "0"), 10) || 0;
      const seconds = parseInt(prompt("Enter seconds:", "0"), 10) || 0;
      countdownTime = (hours * MS_IN_HOUR + minutes * MS_IN_MINUTE + seconds * MS_IN_SECOND);
      if (countdownTime <= 0) {
        alert("Please enter a valid time.");
        return;
      }
      elapsedTime = countdownTime;
    }

    startTime = performance.now();
    previousTime = startTime;
    startButton.innerText = 'Stop';
    interval = requestAnimationFrame(updateTime);
  }

  function stopTimer() {
    cancelAnimationFrame(interval);
    if (mode === 'countdown' && elapsedTime > 0) {
      startButton.innerText = 'Continue';
    } else {
      startButton.innerText = 'Start';
    }
  }

  function clearTimer() {
    stopTimer();
    elapsedTime = 0;
    updateDisplay();
  }

  function updateTime(currentTime) {
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    if (mode === 'timer') {
      elapsedTime += deltaTime;
    } else if (mode === 'countdown') {
      elapsedTime -= deltaTime;
      if (elapsedTime <= 0) {
        elapsedTime = 0;
        updateDisplay();
        alert("Time's up!");
        startButton.innerText = 'Start';
        return;
      }
    }
    updateDisplay();
    interval = requestAnimationFrame(updateTime);
  }

  function updateDisplay() {
    const hours = Math.floor(elapsedTime / MS_IN_HOUR);
    const minutes = Math.floor((elapsedTime % MS_IN_HOUR) / MS_IN_MINUTE);
    const seconds = Math.floor((elapsedTime % MS_IN_MINUTE) / MS_IN_SECOND);
    const milliseconds = Math.floor(elapsedTime % MS_IN_SECOND);

    timerDisplay.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  }

  function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
  }
});
