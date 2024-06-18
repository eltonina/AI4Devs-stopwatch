# Prompt 1 con ChatGPT
Como desarrollador de Javascript debes generar el código para una cuenta atrás siguiendo las siguientes instrucciones:

## Diseño:
Se debe seguir el diseño como se observa en la imagen adjunta:
- Recuadro o input con el tiempo
- Botón Start inicialmente visible
- Botón Clear inicialmente visible
- Botón Stop inicialmente oculto

Además proporcionamos un HTML y CSS base:

## Funcionalidad:
- Introducir el tiempo: el input debe mostrar-se formateado tal como se ve en la imagen: HH:mm:ss Se debe evitar que el usuario introduzca los ":" de forma que la introducción sea cómoda, solo tecleando dígitos. El usuario no introducirá nunca los milisegundos, solo se mostrará cuando inicie la cuenta atrás.
- Start: Debe empezar la cuenta atrás, actualizando el contador (horas, minutos, segundos y milisegundos) cada milisegundo. Además, cambiará se ocultará el botón "Start" y mostará el botón "Stop" en el mismo sitio, de color naranja y con el mismo estilo.
- Clear: Debe resetear el contador al último tiempo introducido antes de pulsar "Start". Por ejemplo, si hemos introducido 00:05:30 y la cuenta atrás esté en marcha, se parará el proceso de cuenta atrás y volverá a ponerse en el input "00:05:30"
- Stop: Parará la cuenta atrás, parando el proceso y ocultará el botón Stop para mostrar el botón Start
- Cuando el contador llegue a 0 se parará, actuando del mismo modo que al pulsar Stop. Además se indicará al usuario mediante una alerta que se ha finalizado el tiempo.

## Otros requisitos:
- El idioma será el inglés
- Se debe incluir tests de aceptación con alguna librería como Jest. Un ejemplo de test sería la introducción de 00:00:01 y comprobar que tras un segundo marca 00:00:00 y se ha lanzado la alerta de tiempo finalizado.
- Se debe seguir buenas prácticas como SOLID y separar lo que afecta a la IU de lo que es lógica de aplicación


# Prompt 2: Ejecución de tests con Jest

Cómo puedo ejecutar el test timer.test.js?

￼
## Prompt 2.1
Cuando lanzo los test con el comando npm test se produce el siguiente error:

stopwatch-jmlc@1.0.0 test
jest

● Validation Error:

Test environment jest-environment-jsdom cannot be found. Make sure the testEnvironment configuration option points to an existing node module.

Configuration Documentation:
https://jestjs.io/docs/configuration

As of Jest 28 "jest-environment-jsdom" is no longer shipped by default, make sure to install it separately.


## Prompt 2.2
Tras instalar la dependencia con `npm install --save-dev jest-environment-jsdom` se produce este error:


> stopwatch-jmlc@1.0.0 test
> jest

 FAIL  ./timer.test.js
  ● Test suite failed to run

    TypeError: Cannot read properties of undefined (reading 'testEnvironmentOptions')

      at new JSDOMEnvironment (node_modules/jest-environment-jsdom/build/index.js:66:28)
      at async TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
      at async runJest (node_modules/@jest/core/build/runJest.js:404:19)
      at async _run10000 (node_modules/@jest/core/build/cli/index.js:320:7)
      at async runCLI (node_modules/@jest/core/build/cli/index.js:173:3)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.289 s
Ran all test suites.

## Prompt 2.3
Ahora el test se ejecuta pero falla:

> stopwatch-jmlc@1.0.0 test
> jest

 FAIL  ./timer.test.js
  ✕ should countdown from 00:00:01 to 00:00:00 and show alert (14 ms)

  ● should countdown from 00:00:01 to 00:00:00 and show alert

    TypeError: Cannot read properties of null (reading 'value')

      10 |
      11 | function parseTimeInput() {
    > 12 |     let timeParts = timeInput.value.split(':');
         |                               ^
      13 |     return {
      14 |         hours: parseInt(timeParts[0]),
      15 |         minutes: parseInt(timeParts[1]),

      at value (script.js:12:31)
      at parseTimeInput (script.js:22:53)
      at Object.startTimer (timer.test.js:22:5)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.683 s
Ran all test suites.


## Prompt 2.4
Parece que ahora encuentra ese campo "value" pero falla lo siguiente:

> stopwatch-jmlc@1.0.0 test
> jest

 FAIL  ./timer.test.js
  ✕ should countdown from 00:00:01 to 00:00:00 and show alert (27 ms)

  ● should countdown from 00:00:01 to 00:00:00 and show alert

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: "Time is up!"

    Number of calls: 0

      27 |     // Comprobar el valor del input y que se haya mostrado la alerta
      28 |     expect(document.getElementById('timeInput').value).toBe('00:00:00:000');
    > 29 |     expect(window.alert).toHaveBeenCalledWith('Time is up!');
         |                          ^
      30 | });
      31 |

      at Object.toHaveBeenCalledWith (timer.test.js:29:26)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.681 s, estimated 1 s
Ran all test suites.

## Prompt 2.5

Creo que el problema está en que no podemos verificar que se llame a la función window.alert
Puedes cambiar este comportamiento para que en vez de mostrar el mensaje en un alert lo muestre en un párrafo debajo de los botones?

## Prompt 2.6
El problema parece ser en el uso de jest.advanceTimersByTime(1000). Debería lanzarse cada 10 milisegundos hasta llegar a 0


# Prompt 3

Otro problema es que el input está deshabilitado. Debería poder editarse por el usuario como hemos dicho al principio:
- Valor predefinido de 5 segundos: 00:00:05.000
- Cuando el usuario escriba, debe formatearse automáticamente el input para que no tenga que poner los separadores ":"

## Prompt 3.1

Hay un error: Cuando se escribe un dígito en el input el cursor se mueve al final, por lo que no se puede seguir escribiendo.

## Prompt 3.2

El comportamiento no es del todo correcto. 
El contador inicia con 00:00:05:000 cuando debería mostrarse 00:00:05.000 Es decir, el separador entre segundos y milisegundos es un "."
Además, al escribir en una posición el cursor se desplaza dos posiciones y escribe 2 veces el dígito tecleado. Por ejemplo, si tenemos el cursor antes del último dígito de la hora y pulsamos 1, el resultado es: 00:01:00:500 cuando debería ser 00:01:05.000
Si, partiendo de 00:00:05.000 queremos cambiar el dígito 5, situamos el cursor delante y pulsamos un 9, el resultado es 00:00:08:500 cuando debería ser 00:00:08.000
Puedes generar tests que cubran estos casos y corregir la funcionalidad?



# Impresiones
- Ha sido muy complicado que genere un código que funcione como esperaba
- Los test también han sido difíciles de conseguir ejecutar correctamente. Además, ha caído dos veces en el mismo error: Usar un `document.getElementById('timeInput')` antes que el DOM esté cargado.