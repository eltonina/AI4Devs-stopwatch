/**
 * @jest-environment jsdom
 */

const { startTimer, stopTimer, clearTimer, formatTime, parseTimeInput, setupInputHandler } = require('./script.js');

test('should countdown from 00:00:05 to 00:00:00 and show message', () => {
    document.body.innerHTML = `
        <div id="timer">
            <input type="text" id="timeInput" value="00:00:05.000">
            <button id="startButton" onclick="startTimer()">Start</button>
            <button id="stopButton" onclick="stopTimer()" style="display:none;">Stop</button>
            <button id="clearButton" onclick="clearTimer()">Clear</button>
            <p id="message" style="color: red;"></p>
        </div>
    `;

    setupInputHandler();

    jest.useFakeTimers();

    startTimer();

    for (let i = 0; i < 500; i++) {
        jest.advanceTimersByTime(10);
    }

    expect(document.getElementById('timeInput').value).toBe('00:00:00.000');
    expect(document.getElementById('message').textContent).toBe('Time is up!');
});

// test('should format the input correctly while typing', () => {
//     document.body.innerHTML = `
//         <div id="timer">
//             <input type="text" id="timeInput" value="00:00:05.000">
//         </div>
//     `;

//     setupInputHandler();

//     let input = document.getElementById('timeInput');

//     input.value = '0';
//     input.selectionStart = input.selectionEnd = 1;
//     input.dispatchEvent(new Event('input', { bubbles: true }));

//     expect(input.value).toBe('00:00:00.000');

//     input.value = '00:';
//     input.selectionStart = input.selectionEnd = 3;
//     input.dispatchEvent(new Event('input', { bubbles: true }));

//     expect(input.value).toBe('00:00:00.000');

//     input.value = '00:0';
//     input.selectionStart = input.selectionEnd = 4;
//     input.dispatchEvent(new Event('input', { bubbles: true }));

//     expect(input.value).toBe('00:00:00.000');

//     input.value = '00:00:';
//     input.selectionStart = input.selectionEnd = 6;
//     input.dispatchEvent(new Event('input', { bubbles: true }));

//     expect(input.value).toBe('00:00:00.000');

//     input.value = '00:00:0';
//     input.selectionStart = input.selectionEnd = 7;
//     input.dispatchEvent(new Event('input', { bubbles: true }));

//     expect(input.value).toBe('00:00:00.000');

//     input.value = '00:00:00.';
//     input.selectionStart = input.selectionEnd = 9;
//     input.dispatchEvent(new Event('input', { bubbles: true }));

//     expect(input.value).toBe('00:00:00.000');
    
//     input.value = '00:00:05.';
//     input.selectionStart = input.selectionEnd = 9;
//     input.dispatchEvent(new Event('input', { bubbles: true }));

//     expect(input.value).toBe('00:00:05.000');

//     input.value = '00:00:05.0';
//     input.selectionStart = input.selectionEnd = 10;
//     input.dispatchEvent(new Event('input', { bubbles: true }));

//     expect(input.value).toBe('00:00:05.000');
// });

test('should handle cursor position correctly while typing', () => {
    document.body.innerHTML = `
        <div id="timer">
            <input type="text" id="timeInput" value="00:00:05.000">
        </div>
    `;

    setupInputHandler();

    let input = document.getElementById('timeInput');

    input.value = '00:00:05.000';
    input.selectionStart = input.selectionEnd = 7;
    input.dispatchEvent(new Event('input', { bubbles: true }));

    input.setSelectionRange(6, 6);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: '9', bubbles: true }));
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(input.value).toBe('00:00:09.000');
    expect(input.selectionStart).toBe(7);
});
