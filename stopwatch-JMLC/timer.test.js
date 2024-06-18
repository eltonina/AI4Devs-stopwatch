// timer.test.js
const { startTimer, stopTimer, clearTimer, formatTime, parseTimeInput } = require('./script.js');

test('should countdown from 00:00:01 to 00:00:00 and show alert', () => {
    document.body.innerHTML = `
        <div id="timer">
            <input type="text" id="timeInput" value="00:00:01:000" disabled>
            <button id="startButton" onclick="startTimer()">Start</button>
            <button id="stopButton" onclick="stopTimer()" style="display:none;">Stop</button>
            <button id="clearButton" onclick="clearTimer()">Clear</button>
        </div>
    `;

    jest.useFakeTimers();
    window.alert = jest.fn();

    startTimer();

    jest.advanceTimersByTime(1000);

    expect(document.getElementById('timeInput').value).toBe('00:00:00:000');
    expect(window.alert).toHaveBeenCalledWith('Time is up!');
});

