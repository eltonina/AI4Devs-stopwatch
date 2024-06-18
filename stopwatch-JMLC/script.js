let timer;
let timeInput = document.getElementById('timeInput');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let clearButton = document.getElementById('clearButton');

function formatTime(hours, minutes, seconds, milliseconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

function parseTimeInput() {
    let timeParts = timeInput.value.split(':');
    return {
        hours: parseInt(timeParts[0]),
        minutes: parseInt(timeParts[1]),
        seconds: parseInt(timeParts[2]),
        milliseconds: parseInt(timeParts[3])
    };
}

function startTimer() {
    let { hours, minutes, seconds, milliseconds } = parseTimeInput();
    startButton.style.display = 'none';
    stopButton.style.display = 'inline';
    timer = setInterval(() => {
        milliseconds -= 1;
        if (milliseconds < 0) {
            milliseconds = 999;
            seconds -= 1;
        }
        if (seconds < 0) {
            seconds = 59;
            minutes -= 1;
        }
        if (minutes < 0) {
            minutes = 59;
            hours -= 1;
        }
        if (hours < 0) {
            clearInterval(timer);
            alert('Time is up!');
            stopTimer();
        }
        timeInput.value = formatTime(hours, minutes, seconds, milliseconds);
    }, 1);
}

function stopTimer() {
    clearInterval(timer);
    stopButton.style.display = 'none';
    startButton.style.display = 'inline';
}

function clearTimer() {
    stopTimer();
    timeInput.value = '00:08:00:000';
}

