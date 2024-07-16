const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');

// Variable que almacenará la referencia del intervalo del cronómetro
let stopwatchInterval;
// Variable que almacena el tiempo transcurrido en milisegundos
let runningTime = 0;

const playPause = () => {
    // Verifica si el botón tiene la clase 'running'
    const isNotPaused = playPauseButton.classList.contains('running');
    if (isNotPaused) {
        // Si está en funcionamiento, elimina la clase 'running' y pausa el cronómetro
        playPauseButton.classList.remove('running');
        pause();
    } else {       
        // Si está pausado, añade la clase 'running' y inicia el cronómetro
        playPauseButton.classList.add('running');
        start();
    }
}
const pause = () => {
    // Pausa la animación de la esfera de segundos
    secondsSphere.style.animationPlayState = 'paused';
    // Detiene el intervalo del cronómetro
    clearInterval(stopwatchInterval);
}
const stop = () => {
    // Restablece la posición de la esfera de segundos
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
    // Elimina cualquier animación en la esfera de segundos
    secondsSphere.style.animation = 'none';
    // Elimina la clase 'running' del botón de reproducción/pausa
    playPauseButton.classList.remove('running');
    // Reinicia el tiempo transcurrido
    runningTime = 0;
    // Detiene el intervalo del cronómetro
    clearInterval(stopwatchInterval);
    // Restablece el texto del cronómetro a '00:00'
    stopwatch.textContent = '00:00';
}
const start = () => {
    // Define la animación de rotación para la esfera de segundos
    secondsSphere.style.animation = 'rotation 60s linear infinite';
    // Calcula el tiempo de inicio en función del tiempo ya transcurrido
    let startTime = Date.now() - runningTime;
    // Reinicia la animación de la esfera de segundos
    secondsSphere.style.animationPlayState = 'running';
    // Configura un intervalo que actualiza el cronómetro cada segundo
    stopwatchInterval = setInterval(() => {
        // Calcula el tiempo transcurrido desde el inicio
        runningTime = Date.now() - startTime;
        // Actualiza el texto del cronómetro con el tiempo transcurrido
        stopwatch.textContent = calculateTime(runningTime);
    }, 1000);
}

// Función que calcula y formatea el tiempo transcurrido en minutos y segundos
const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);

    // Calcula los segundos a mostrar (resto de la división)El propósito de esta línea es asegurar que los segundos siempre se muestren como un número de dos dígitos en el cronómetro para mantener un formato consistente y fácil de leer, por ejemplo, "05" en lugar de "5"
    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    // Calcula los minutos a mostrar
    const display_minutes = total_minutes.toString().padStart(2, "0");

    // Devuelve el tiempo formateado en mm:ss
    return `${display_minutes}:${display_seconds}`;
}
