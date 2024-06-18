let timer;

function formatTime(hours, minutes, seconds, milliseconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function parseTimeInput() {
    let timeInput = document.getElementById('timeInput');
    let timeParts = timeInput.value.split(/[:.]/);
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
    timeInput.value = '00:00:05.000';
    message.textContent = ''; // Clear any previous messages
}

function handleTimeInput(event) {
    let input = event.target;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 8) value = value.slice(0, 8);

    let hours = value.slice(0, 2).padEnd(2, '0');
    let minutes = value.slice(2, 4).padEnd(2, '0');
    let seconds = value.slice(4, 6).padEnd(2, '0');
    let milliseconds = value.slice(6, 9).padEnd(3, '0');

    let formattedValue = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    
    let cursorPosition = input.selectionStart;
    input.value = formattedValue;

    // Adjust the cursor position to be after the last digit typed
    if (cursorPosition <= 2) {
        cursorPosition += 0; // No shift
    } else if (cursorPosition <= 4) {
        cursorPosition += 1; // Skip the first colon
    } else if (cursorPosition <= 6) {
        cursorPosition += 2; // Skip the first and second colons
    } else if (cursorPosition <= 9) {
        cursorPosition += 3; // Skip the first, second colons and part of milliseconds
    }

    input.selectionStart = input.selectionEnd = cursorPosition;
}

function setupInputHandler() {
    document.getElementById('timeInput').addEventListener('input', handleTimeInput);
}

module.exports = { startTimer, stopTimer, clearTimer, formatTime, parseTimeInput, setupInputHandler };
