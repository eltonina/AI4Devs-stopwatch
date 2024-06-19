let startStopButton = document.getElementById('start-stop-button');
let clearButton = document.getElementById('clear-button');
let timeDisplay = document.getElementById('time-display');

let startTime;
let updatedTime;
let difference;
let timerId;
let running = false;

function startTimer() {
    startTime = new Date().getTime();
    timerId = setInterval(updateTimer, 10);
}

function stopTimer() {
    clearInterval(timerId);
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;

    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

startStopButton.addEventListener('click', function() {
    if (!running) {
        running = true;
        startTimer();
        startStopButton.textContent = 'Stop';
    } else {
        running = false;
        stopTimer();
        startStopButton.textContent = 'Continue';
    }
});

clearButton.addEventListener('click', function() {
    running = false;
    clearInterval(timerId);
    timeDisplay.innerHTML = '00:00:00.000';
    startStopButton.textContent = 'Start';
});
