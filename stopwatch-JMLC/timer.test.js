/**
 * @jest-environment jsdom
 */

const { startTimer, stopTimer, clearTimer, formatTime, parseTimeInput } = require('./script.js');

test('should countdown from 00:00:01 to 00:00:00 and show message', () => {
    // Crear el DOM necesario para la prueba
    document.body.innerHTML = `
        <div id="timer">
            <input type="text" id="timeInput" value="00:00:01:000" disabled>
            <button id="startButton" onclick="startTimer()">Start</button>
            <button id="stopButton" onclick="stopTimer()" style="display:none;">Stop</button>
            <button id="clearButton" onclick="clearTimer()">Clear</button>
            <p id="message" style="color: red;"></p>
        </div>
    `;

    // Simular temporizadores
    jest.useFakeTimers();

    startTimer();

    // Avanzar el temporizador en intervalos de 10 milisegundos hasta que el tiempo llegue a 0
    for (let i = 0; i < 100; i++) {
        jest.advanceTimersByTime(10);
    }
    jest.advanceTimersByTime(10);

    // Comprobar el valor del input y que se haya mostrado el mensaje
    expect(document.getElementById('timeInput').value).toBe('00:00:00:000');
    expect(document.getElementById('message').textContent).toBe('Time is up!');
});
