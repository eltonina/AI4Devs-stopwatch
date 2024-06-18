document.addEventListener('DOMContentLoaded', (event) => {
    let startButton = document.getElementById('start-button');
    let clearButton = document.getElementById('clear-button');
    let timerDisplay = document.getElementById('timer-display');
    let modeSelector = document.querySelectorAll('input[name="mode"]');
  
    let interval;
    let elapsedTime = 0;
    let countdownTime = 0;
    let mode = 'timer'; // Default mode is timer
  
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
        let hours = parseInt(prompt("Enter hours:", "0"), 10);
        let minutes = parseInt(prompt("Enter minutes:", "0"), 10);
        let seconds = parseInt(prompt("Enter seconds:", "0"), 10);
        countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
        if (isNaN(countdownTime) || countdownTime <= 0) {
          alert("Please enter a valid time.");
          return;
        }
        elapsedTime = countdownTime;
      }
  
      startButton.innerText = 'Stop';
      interval = setInterval(() => {
        if (mode === 'timer') {
          elapsedTime += 10;
        } else if (mode === 'countdown') {
          elapsedTime -= 10;
          if (elapsedTime <= 0) {
            clearInterval(interval);
            alert("Time's up!");
            elapsedTime = 0;
            startButton.innerText = 'Start';
          }
        }
        updateDisplay();
      }, 10);
    }
  
    function stopTimer() {
      clearInterval(interval);
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
  
    function updateDisplay() {
      let hours = Math.floor(elapsedTime / 3600000);
      let minutes = Math.floor((elapsedTime % 3600000) / 60000);
      let seconds = Math.floor((elapsedTime % 60000) / 1000);
      let milliseconds = elapsedTime % 1000; // Correcting milliseconds calculation
  
      timerDisplay.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
    }
  
    function pad(number, length = 2) {
      return number.toString().padStart(length, '0');
    }
  });
  