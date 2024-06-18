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

