const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");

inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const command = inputElement.value;
        processCommand(command);
        inputElement.value = ""; // Limpiar el input
    }
});

let isCommandExpectingInput = false; // Estado para comandos que esperan datos
let pendingCommand = null; // Almacena el comando que espera datos

function processCommand(command) {
    let response = "";

    if (isCommandExpectingInput) {
        handlePendingCommand(command);
        return;
    }

// Comando principal para manejar comandos
if (command === "ayuda") {
    response = "Comandos disponibles: ayuda, info, salir, noticias, reproductor-de-musica";
} else if (command === "info") {
    response = "Consola Selvática creada por tu asistente.";
} else if (command === "salir") {
    response = "¡Hasta luego!";
} else if (command === "noticias") {
    response = "Inicializando 'Noticias'...";
    outputElement.innerHTML += `<div>${response}</div>`;
    selectAppOrGame(); // Inicia el proceso para seleccionar app/juego
    return; // Detener aquí para evitar manejar el comando como desconocido
} else if (command === "reproductor-de-musica") {
    checkDependencies(); // Llamar a la función para verificar la instalación de dependencias
    return; // Detener aquí para evitar manejar el comando como desconocido
}
}

 

function checkDependencies() {
    isCommandExpectingInput = true; // Activar estado de espera
    pendingCommand = "reproductor-de-musica"; // Guardar el comando en espera

    // Simular que falta una dependencia e iniciar la instalación
    outputElement.innerHTML += `
        <div>Para reproducir música, necesitas instalar una dependencia. Iniciando instalación...</div>
        <div id="progressContainer">
            <div id="progressBar"></div>
        </div>
        <div id="progressText">0%</div>
    `;
    outputElement.scrollTop = outputElement.scrollHeight;

    simulateInstallation(); // Comienza la simulación de instalación
}

function simulateInstallation() {
    let progress = 0;
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    // Simulación de instalación con intervalo
    const interval = setInterval(function() {
        progress += 10;
        if (progress <= 100) {
            progressBar.style.width = progress + "%";
            progressText.innerText = progress + "%";
        } else {
            clearInterval(interval);
            installationComplete(); // Finalizar la instalación y permitir reproducción de música
        }
    }, 500); // Actualizar cada 500 ms
}

function installationComplete() {
    // Indicar que la instalación está completa
    outputElement.innerHTML += `<div>✔ Dependencia instalada correctamente. Ahora puedes reproducir música.</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;

    // Proporcionar opción para reproducir música
    outputElement.innerHTML += `
        <div>Seleccione una música:</div>
        <div>Eternxlkz - GURU!</div>
        <button id="playMusicButton">Reproducir Música</button> <!-- Botón para reproducir -->
    `;
    outputElement.scrollTop = outputElement.scrollHeight;

    // Asignar el evento de clic al botón
    document.getElementById("playMusicButton").addEventListener("click", playMusic);
}

function playMusic() {
    // Crear un elemento de audio y reproducirlo
    const audio = new Audio('http://localhost:3000/uploads/1732674977608-Eternxlkz%20-%20GURU%20(Official%20Audio).mp3'); // Asegúrate de que esta URL sea correcta
    audio.play(); // Reproducir la música

    // Mostrar mensaje de confirmación
    outputElement.innerHTML += `<div>Reproduciendo: Eternxlkz - GURU!</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;

    finalizeCommand("reproductor-de-musica"); // Finalizar el comando
}

function handlePendingCommand(input) {
    if (pendingCommand === "reproductor-de-musica") {
        // Verificar si el comando de música se ejecutó correctamente
        if (input.toLowerCase() === "eternxlkz - guru!") {
            outputElement.innerHTML += `<div>Has seleccionado: ${input}. Reproduciendo música...</div>`;
            playMusic(); // Llamar a la función para reproducir música
        } else {
            outputElement.innerHTML += `<div class="error">❌ Música no reconocida: ${input}</div>`;
        }
        finalizeCommand("reproductor-de-musica"); // Finaliza el proceso
    }
}

function finalizeCommand(command) {
    if (command === "reproductor-de-musica") {
        outputElement.innerHTML += `<div>✔ Música iniciada correctamente.</div>`;
    }

    // Restablecer estado
    isCommandExpectingInput = false;
    pendingCommand = null;
    outputElement.scrollTop = outputElement.scrollHeight;
}

        
        

function selectAppOrGame() {
    isCommandExpectingInput = true; // Activar estado de espera
    pendingCommand = "noticias"; // Guardar el comando en espera

    outputElement.innerHTML += `
        <div>Seleccione una app o juego para obtener la última noticia:</div>
        <div>- Animal AI</div>
        <div>- Naturepedia</div>
        <div>- Currency Playground</div>
        <div>- Wild Explorer</div>
    `;
    outputElement.scrollTop = outputElement.scrollHeight;
}

function handlePendingCommand(input) {
    if (pendingCommand === "noticias") {
        const news = getLatestNews(input);
        if (news) {
            outputElement.innerHTML += `<div>Última noticia de ${input}: ${news}</div>`;
            finalizeCommand("noticias"); // Finaliza el proceso
        } else {
            outputElement.innerHTML += `<div class="error">❌ App o juego no reconocido: ${input}</div>`;
        }
    }
}

function getLatestNews(appOrGame) {
    const newsDatabase = {
        "Animal AI": "¡Nueva actualización lanzada con mejoras en IA!",
        "Naturepedia": "Explora nuevos animales añadidos en la enciclopedia.",
        "Currency Playground": "Ahora puedes simular conversiones en tiempo real.",
        "Wild Explorer": "Nueva región descubierta: Selvas misteriosas.",
    };

    return newsDatabase[appOrGame] || null;
}

function finalizeCommand(command) {
    if (command === "noticias") {
        outputElement.innerHTML += `<div>✔</div>`;
    }

    // Restablecer estado
    isCommandExpectingInput = false;
    pendingCommand = null;
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Función para mostrar errores en rojo
function displayError(errorMessage) {
    outputElement.innerHTML += `<div class="error">${errorMessage}</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;
}

