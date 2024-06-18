# Prompt 1 con ChatGPT
```
Como desarrollador de Javascript debes generar el código para crear un cronómetro y cuenta atrás siguiendo las siguientes instrucciones.
Vamos a ir paso a paso:
1. Requisitos iniciales y funcionalidad de la aplicación para generar un listado de historias de usuario
2. Codificar las historias de usuario
3. Crear los test de aceptación

## 1. Requisitos iniciales

- Tenemos un ejemplo de funcionalidad en https://www.online-stopwatch.com/ 
- Tenemos un fichero index.html base, adjunto
- Se desea una arquitectura limpia siguiendo principios SOLID, separando responsabilidades de interfaz y funcionalidad
- El idioma será el inglés

Partimos de un diseño inicial como el adjunto en stopwatch.png, donde podemos ver:
- Recuadro o input con el tiempo
- Botón Start inicialmente visible
- Botón Clear inicialmente visible

¿Podrías aconsejar como podríamos diseñar las dos funcionalidades de cronómetro y cuenta atrás en el diseño planteado? No sigas con el punto 2 hasta tener claros los requisitos.
```

## Comentarios
> Ha generado una respuesta con varias secciones: Historias de usuario, Funcionalidad Detallada, Arquitectura, Estructura de Archivos, Diseño inicial y ¿Cómo diseñar las funcionalidades?
> Revisamos cada sección y hacemos las correcciones en el segundo prompt:


# Prompt 2 con ChatGPT
```
Falta una historia de usuario en la funcionalidad de "cuenta atrás":
- Como usuario quiero ser notificado cuando la cuenta atrás llegue a 0.
Ok al resto de historias de usuario.

En cuanto a la funcionalidad detallada falta especificar que el formato del reloj es el siguiente: HH:mm:ss.sss Es decir, Horas + ":" + minutos + ":" + segundos + "." + milisegundos. Esto aplica tanto en el cronómetro como la cuenta atrás.

En cuanto al diseño podríamos mejorarlo haciendo que el usuario pueda seleccionar entre si quiere una Cuenta atrás o un cronómetro. Podría ser un radio button o switch donde se visualice unos emojis con una etiqueta (en inglés)
Si se selecciona la cuenta atrás debe preguntarse por el tiempo en alertas donde pregunte primero las horas, luego los minutos y luego los segundos.
```

## Comentarios
> Todo parece correcto

# Prompt 3 
De acuerdo, procedamos con la codificación