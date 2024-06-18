let timer;

function formatTime(hours, minutes, seconds, milliseconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

function parseTimeInput() {
    let timeInput = document.getElementById('timeInput');
    let timeParts = timeInput.value.split(':');
    return {
        hours: parseInt(timeParts[0], 10),
        minutes: parseInt(timeParts[1], 10),
        seconds: parseInt(timeParts[2], 10),
        milliseconds: parseInt(timeParts[3], 10)
    };
}

function startTimer() {
    let timeInput = document.getElementById('timeInput');
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');
    let message = document.getElementById('message');
    let { hours, minutes, seconds, milliseconds } = parseTimeInput();
    startButton.style.display = 'none';
    stopButton.style.display = 'inline';
    message.textContent = ''; // Clear any previous messages

    timer = setInterval(() => {
        if (milliseconds > 0) {
            milliseconds -= 10;
        } else {
            if (seconds > 0) {
                seconds -= 1;
                milliseconds = 990;
            } else {
                if (minutes > 0) {
                    minutes -= 1;
                    seconds = 59;
                    milliseconds = 990;
                } else {
                    if (hours > 0) {
                        hours -= 1;
                        minutes = 59;
                        seconds = 59;
                        milliseconds = 990;
                    } else {
                        clearInterval(timer);
                        message.textContent = 'Time is up!';
                        stopTimer();
                    }
                }
            }
        }
        timeInput.value = formatTime(hours, minutes, seconds, milliseconds);
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');
    stopButton.style.display = 'none';
    startButton.style.display = 'inline';
}

function clearTimer() {
    stopTimer();
    let timeInput = document.getElementById('timeInput');
    let message = document.getElementById('message');
    timeInput.value = '00:08:00:000';
    message.textContent = ''; // Clear any previous messages
}

module.exports = { startTimer, stopTimer, clearTimer, formatTime, parseTimeInput };
