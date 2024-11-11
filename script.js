document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById('chat-input');
    const dynamicInput = document.getElementById('dynamicInput');
    const chatLog = document.getElementById('chat-log'); // Conserva este si ya lo usan varios comandos
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const sendCMDBtn = document.getElementById('sendCMDBtn');
    const cmdInput = document.getElementById('cmd-input');
    const respuestaContainer = document.getElementById('respuesta-container');
    const mainChatLog = document.getElementById('chatLog'); // Renombrado para evitar colisión
    const estadoConteoDiv = document.getElementById('estado-conteo');
    // Ocultar el formulario al iniciar la instalación, pero solo si existe en el DOM
    const blogForm = document.getElementById('blogForm');
    if (blogForm) {
        blogForm.style.display = 'none';
    }
    const chatContainer = document.getElementById('chat-container');
    const chatContainer2 = document.getElementById('chat-container2');
    const chatContainer3 = document.getElementById('chat-container3');
    const modalContainer2 = document.getElementById('modalContainer');

// Definición de la imagen de la moneda
const coinImage = 'https://i.ibb.co/XLZNVfS/coin.png'; // Asegúrate de que esta URL sea correcta

    // Tarjetas simuladas en el sistema
const tarjetasWildCard = {
    "1234567890": 150.75,
    "0987654321": 50.20,
    "1122334455": 200.00
};


// Crear el highlight circular y añadirlo al body
const highlight = document.createElement('div');
highlight.classList.add('cursor-highlight');
document.body.appendChild(highlight);

// Función para mover el highlight con el cursor
document.body.addEventListener('mousemove', function (event) {
    const x = event.pageX;
    const y = event.pageY;

    // Posicionar el highlight en base a la posición del cursor
    highlight.style.left = `${x - 25}px`; // Ajustar para centrar el círculo en el cursor
    highlight.style.top = `${y - 25}px`;
});

// Mostrar el highlight cuando el ratón entra en la app
document.body.addEventListener('mouseenter', function () {
    highlight.style.display = 'block';
});

// Ocultar el highlight cuando el ratón sale de la app
document.body.addEventListener('mouseleave', function () {
    highlight.style.display = 'none';
});


    sendMessageBtn.addEventListener('click', () => {
        const comando = chatInput.value.trim();
        if (comando) {
            // Llama a tu función para manejar el comando
            ejecutarComando(comando);
            chatInput.value = ''; // Limpiar el campo de entrada
        }
    });
    
    function handleSalvadorDeAnimalesCommand() {
        typeMessage("Este comando aún no está implementado.");
    }
    

    function handleDesactivarLocalizadorCommand() {
        // Lógica para desactivar el localizador
    }
    
    
    if (chatInput) {
        chatInput.addEventListener('keydown', function(event) {
            // Verifica si la tecla presionada es 'Enter'
            if (event.key === 'Enter') {
                // Elimina espacios en blanco al inicio y al final del valor del input
                const comando = event.target.value.trim();
                // Llama a la función para ejecutar el comando
                ejecutarComando(comando);
                // Limpia el input después de procesar
                event.target.value = '';
            }
        });
    } else {
        console.error("El elemento con ID 'chat-input' no se encontró en el DOM.");
    }
    
    if (cmdInput) {
        cmdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendCMDBtn.click(); // Simula un clic en el botón
            }
        });
    } else {
        console.error("El elemento con ID 'cmd-input' no se encontró en el DOM.");
    }
    
    sendCMDBtn.addEventListener('click', () => {
        const respuesta = cmdInput.value.trim();
        if (respuesta) {
            // Llama a tu función para manejar la respuesta
            handleRespuestaCommand(respuesta);
            cmdInput.value = ''; // Limpiar el campo de entrada
        }
    });
    
    
    
    
        
        
       // Configuración de Firebase SDK
                const firebaseConfig = {
                    apiKey: "AIzaSyA1rURXpdT28sW1Sh898_TY3JLqHi4B7aQ",
                    authDomain: "electron-7d7a1.firebaseapp.com",
                    databaseURL: "https://electron-7d7a1-default-rtdb.firebaseio.com",
                    projectId: "electron-7d7a1",
                    storageBucket: "electron-7d7a1.appspot.com",
                    messagingSenderId: "1002693339095",
                    appId: "1:1002693339095:web:7904bdc813fd1e42c2cd92",
                    measurementId: "G-4NHR0X7FE4"
                };
    
                // Inicializa Firebase con la configuración
                firebase.initializeApp(firebaseConfig);
    
                // Usa las funciones de autenticación, base de datos, etc.
                const auth = firebase.auth();
                const db = firebase.database();
                const firestore = firebase.firestore();
    
    
        let isAwaitingInput = false;
        let currentCommand = null;
        let dolaresAnimal = 0;
        const prestamos = {};
    
        const messageContainer = document.getElementById('message'); // Asegúrate de obtener el elemento 
        const userID = Math.floor(Math.random() * 10000);
        
    
        let temaSeleccionado = null;
    let pistas = [];
    let pistaActual = 0;
    const modalContainer = document.getElementById('modalContainer');
    
    




// Variables para almacenar notificaciones y el contador
let notifications = [];
let systemNotifications = [];
let notificationCount = 0;
let systemNotificationCount = 0;
const maxVisibleNotifications = 10; // Máximo de notificaciones visibles antes de mostrar el deslizador

// Elementos del DOM
const notificationIcon = document.getElementById('notification-icon');
const notificationCounter = document.getElementById('notification-counter');
const notificationList = document.getElementById('notification-list');
const notificationsUl = document.getElementById('notifications');

// Crear contenedor para Notificaciones del Sistema
const systemNotificationList = document.createElement('div');
systemNotificationList.setAttribute('id', 'system-notification-list');
document.body.appendChild(systemNotificationList);

const systemNotificationsUl = document.createElement('ul');
systemNotificationsUl.setAttribute('id', 'system-notifications');
systemNotificationList.appendChild(systemNotificationsUl);

// Función para agregar notificación estándar
function addNotification(message, timestamp = null, actions = []) {
    const formattedTimestamp = timestamp || getFormattedTimestamp();
    notifications.push({ message, timestamp: formattedTimestamp, actions, read: false });
    notificationCount++;
    updateNotificationDisplay();
}

// Función para agregar notificación del sistema
function addSystemNotification(message, timestamp = null, actions = []) {
    const formattedTimestamp = timestamp || getFormattedTimestamp();
    systemNotifications.push({ message, timestamp: formattedTimestamp, actions, read: false });
    systemNotificationCount++;
    updateSystemNotificationDisplay();
}

notificationIcon.addEventListener('click', () => {
    notificationList.style.display = notificationList.style.display === 'none' ? 'block' : 'none';
});


// Función para obtener la fecha y hora actual en formato legible
function getFormattedTimestamp() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
}

// Función para actualizar notificaciones estándar
function updateNotificationDisplay() {
    notificationCounter.style.display = notificationCount > 0 ? 'block' : 'none';
    notificationCounter.textContent = notificationCount;
    notificationsUl.innerHTML = '';

    if (notificationCount > 0) {
        const markAllButton = document.createElement('button');
        markAllButton.textContent = "Marcar todo como leído";
        markAllButton.classList.add('mark-all-button');
        markAllButton.addEventListener('click', markAllAsRead);
        notificationsUl.appendChild(markAllButton);
    }

    notifications.slice(-maxVisibleNotifications).forEach((notification, index) => {
        const listItem = createNotificationItem(notification, index, markNotificationAsRead);
        notificationsUl.appendChild(listItem);
    });
}

// Función para actualizar notificaciones del sistema
function updateSystemNotificationDisplay() {
    systemNotificationsUl.innerHTML = '';

    if (systemNotificationCount > 0) {
        const markAllSystemButton = document.createElement('button');
        markAllSystemButton.textContent = "Marcar todo como leído";
        markAllSystemButton.classList.add('mark-all-button');
        markAllSystemButton.addEventListener('click', markAllSystemAsRead);
        systemNotificationsUl.appendChild(markAllSystemButton);
    }

    systemNotifications.slice(-maxVisibleNotifications).forEach((notification, index) => {
        const listItem = createNotificationItem(notification, index, markSystemNotificationAsRead);
        systemNotificationsUl.appendChild(listItem);
    });
}

// Función para crear un elemento de notificación
function createNotificationItem(notification, index, markAsReadHandler) {
    const listItem = document.createElement('li');
    listItem.classList.add('notification-item');
    
    const messageText = document.createElement('p');
    messageText.textContent = notification.message;
    
    const timestampText = document.createElement('small');
    timestampText.classList.add('timestamp');
    timestampText.textContent = `Fecha y hora: ${notification.timestamp}`;
    
    listItem.appendChild(messageText);
    listItem.appendChild(timestampText);
    
    if (notification.actions && notification.actions.length > 0) {
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('actions-container');
        
        notification.actions.forEach(action => {
            const actionButton = document.createElement('button');
            actionButton.textContent = action.text;
            actionButton.classList.add('action-button');
            actionButton.addEventListener('click', action.handler);
            
            actionsContainer.appendChild(actionButton);
        });
        
        listItem.appendChild(actionsContainer);
    }

    const markAsReadButton = document.createElement('button');
    markAsReadButton.textContent = "Marcar como leído";
    markAsReadButton.classList.add('mark-as-read-button');
    markAsReadButton.addEventListener('click', () => markAsReadHandler(index));
    listItem.appendChild(markAsReadButton);

    return listItem;
}

// Función para marcar una notificación estándar como leída
function markNotificationAsRead(index) {
    if (!notifications[index].read) {
        notifications[index].read = true;
        notificationCount--;
        updateNotificationDisplay();
    }
}

// Función para marcar una notificación del sistema como leída
function markSystemNotificationAsRead(index) {
    if (!systemNotifications[index].read) {
        systemNotifications[index].read = true;
        systemNotificationCount--;
        updateSystemNotificationDisplay();
    }
}

// Función para marcar todas las notificaciones estándar como leídas
function markAllAsRead() {
    notifications.forEach(notification => notification.read = true);
    notificationCount = 0;
    updateNotificationDisplay();
}

// Función para marcar todas las notificaciones del sistema como leídas
function markAllSystemAsRead() {
    systemNotifications.forEach(notification => notification.read = true);
    systemNotificationCount = 0;
    updateSystemNotificationDisplay();
}

// CSS para los contenedores de notificaciones y el deslizador
document.head.insertAdjacentHTML("beforeend", `
<style>
  #notifications, #system-notifications {
      max-height: 200px;
      overflow-y: auto;
  }
  .mark-all-button, .mark-as-read-button {
      margin: 5px;
      font-size: 0.9em;
  }
</style>
`);

// Función para mostrar el modal con un contenedor que contiene texto adicional
function mostrarModalInfo() {
    // Crear el modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    // Crear el contenido del modal
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '500px';
    modalContent.style.padding = '20px';
    modalContent.style.position = 'relative';

    // Crear botón de cerrar
    const closeButton = document.createElement('span');
    closeButton.textContent = '✖';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '1.5em';
    closeButton.addEventListener('click', () => document.body.removeChild(modal));

    // Texto de información adicional
    const infoText = document.createElement('p');
    infoText.style.padding = '15px';
    infoText.style.boxSizing = 'border-box';
    infoText.textContent = "Mañana estaremos implementando mejoras clave en Animal AI para optimizar tu experiencia. Entre los cambios más destacados, se incluirán mejoras en la velocidad de carga, ajustes en la interfaz para una navegación más intuitiva, y optimización de la respuesta en algunos comandos populares. Estas mejoras se centran en hacer que Animal AI sea aún más rápido, dinámico y fácil de usar, asegurando que puedas aprovechar al máximo todas sus funcionalidades. ¡Estén atentos para disfrutar de una experiencia aún mejor en Animal AI!";

    // Agregar elementos al modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(infoText);
    modal.appendChild(modalContent);

    // Mostrar el modal
    document.body.appendChild(modal);
}

addNotification("Mantenimento del 11/11/2024 - 23/11/2024", "8/11/2024 22:35");
// Llamar a la función de ejemplo con "Más Info" que abre el modal
addNotification("Mañana se vendrán mejoras y cosas más realistas...1894623.1300.231", "30/10/2024 20:30", [
    { text: "Más Info", handler: mostrarModalInfo }
]);

addNotification("NUEVO!: CAMINO EVOLUTIVO. Esta funcion te permitira ver todas las fechas de lanzamiento de los comandos (comandos a partir del 30/10/2024 solo se contaran).", "30/10/2024 20:34");
addNotification("El comando /proximo-lanzamiento ha sido reemplazado por un panel, donde se encuentra el Camino Evolutivo.", "30/10/2024 20:32");

// Ejemplos de agregar notificaciones con botones de acción
addNotification("Visita nuestro discord.", "30/10/2024 20:30", [
    { text: "Discord", handler: () => window.location.href = "https://discord.gg/kBwDwKrcTS" }
]);

// Ejemplos de agregar notificaciones con botones de acción
addNotification("Mejoras en la lista de notificaciones en general.", "30/10/2024 19:06", [
    { text: "Discord", handler: () => window.location.href = "https://discord.gg/kBwDwKrcTS" }
]);

addNotification("Sistema actualizado.", "29/10/2024 20:15", [
    { text: "Aceptar", handler: () => alert("Notificación aceptada") },
    { text: "Descartar", handler: () => alert("Notificación descartada") }
]);

addNotification("Lista de notificaciones renovada", "29/10/2024 22:51");

    
    // Función para crear botones dinámicos
    const createButton = (buttonText, onClickHandler) => {
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.addEventListener('click', onClickHandler);
        
        chatLog.appendChild(button);
    };
    
    
    
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    
    // Formato de hora
    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${minutes}${period}`;
    };
    
    // Función para manejar la selección de la línea de ómnibus
    const handleBusLineSelection = () => {
        typeMessage("Selecciona una Línea de Ómnibus:");
    
        // Lista de líneas de ómnibus de Montevideo con diferentes horas de última salida
        const busLines = [
            { line: 76, description: "Cerro ↔ Punta Carretas", lastUpdate: new Date('2024-09-23T07:30:00') },
            { line: 60, description: "Plaza España ↔ Malvín", lastUpdate: new Date('2024-09-23T09:15:00') },
            { line: 144, description: "Paso Molino ↔ Punta Gorda", lastUpdate: new Date('2024-09-23T12:45:00') },
            { line: 21, description: "Paso de la Arena ↔ Centro", lastUpdate: new Date('2024-09-23T14:20:00') },
            { line: 370, description: "Belvedere ↔ Playa del Cerro", lastUpdate: new Date('2024-09-23T16:05:00') }
        ];
    
        // Crear un botón para cada línea de ómnibus
        busLines.forEach((bus) => {
            createButton(`Línea ${bus.line}`, () => handleBusLineUpdate(bus));
        });
    };
    
    // Función que maneja la actualización manual de la salida de un ómnibus
    const handleBusLineUpdate = (bus) => {
        typeMessage(`Actualizando última salida de la Línea ${bus.line} (${bus.description})...`);
    
        // Mostrar la hora de la última salida
        const time = formatTime(bus.lastUpdate);
        const dayOfWeek = daysOfWeek[bus.lastUpdate.getDay()];
        const formattedDate = bus.lastUpdate.toLocaleString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    
        // Mostrar el tiempo de la última actualización
        typeMessage(`Línea ${bus.line} (${bus.description}): última salida el ${dayOfWeek}, ${formattedDate} a las ${time}.`);
    };
    
    // Iniciar el flujo del comando
    const startLineCommand = () => {
        handleBusLineSelection();  // Mostrar las opciones de línea de ómnibus
    };


 

// Variables para el Camino Evolutivo
const evolutionPathContainer = document.getElementById('evolution-path');
const countdownContainer = document.getElementById('countdown-container');
const maxVisibleSteps = 3; // Número máximo de etapas visibles en el deslizador
let currentStartIndex = 0;
let evolutionSteps = [];

// Función para agregar una etapa al Camino Evolutivo con texto y fecha
function addEvolutionStep(text, date) {
    evolutionSteps.push({ text, date });
    renderEvolutionSteps();
}

// Función para renderizar las etapas limitadas en el deslizador
function renderEvolutionSteps() {
    // Limpiar solo el contenedor de etapas, no los controles
    evolutionPathContainer.querySelectorAll('.step-container, hr').forEach(el => el.remove());
    
    const visibleSteps = evolutionSteps.slice(currentStartIndex, currentStartIndex + maxVisibleSteps);
    
    visibleSteps.forEach(step => {
        const stepContainer = document.createElement('div');
        stepContainer.classList.add('step-container');
        
        const stepText = document.createElement('p');
        stepText.textContent = step.text;
        
        const stepDate = document.createElement('small');
        stepDate.classList.add('step-date');
        stepDate.textContent = `Fecha: ${step.date}`;
        
        stepContainer.appendChild(stepText);
        stepContainer.appendChild(stepDate);
        evolutionPathContainer.appendChild(stepContainer);
        
        const separator = document.createElement('hr');
        evolutionPathContainer.appendChild(separator);
    });
}

// Función para cambiar el índice del deslizador y mostrar las etapas
function slideEvolutionSteps(direction) {
    currentStartIndex += direction;
    if (currentStartIndex < 0) currentStartIndex = 0;
    if (currentStartIndex > evolutionSteps.length - maxVisibleSteps) {
        currentStartIndex = evolutionSteps.length - maxVisibleSteps;
    }
    renderEvolutionSteps();
}

// Función para establecer una cuenta regresiva
function setCountdown(endDate, nextCommand) {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownContainer.innerHTML = `
            <p>Proximo: ${nextCommand}</p>
            <p>Se lanza en: ${days}d ${hours}h ${minutes}m ${seconds}s</p>
            <p>Fecha de Lanzamiento: ${new Date(endDate).toLocaleString()}</p>
        `;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownContainer.textContent = `¡${nextCommand} ha sido lanzado!`;
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Ejemplos de uso
setCountdown(new Date("2024-10-31T15:00:00").getTime(), "/crear-mapas-conceptuales");

addEvolutionStep("/crear-mapas-conceptuales", "31/10/2024")

// Controles del deslizador
const sliderControls = document.createElement('div');
sliderControls.classList.add('slider-controls');

const prevButton = document.createElement('button');
prevButton.textContent = "Anterior";
prevButton.addEventListener('click', () => slideEvolutionSteps(-1));

const nextButton = document.createElement('button');
nextButton.textContent = "Siguiente";
nextButton.addEventListener('click', () => slideEvolutionSteps(1));

sliderControls.appendChild(prevButton);
sliderControls.appendChild(nextButton);
evolutionPathContainer.appendChild(sliderControls);

// CSS para el diseño
document.head.insertAdjacentHTML("beforeend", `
<style>
  #countdown-container {
      font-size: 1.2em;
      margin-bottom: 20px;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 8px;
      text-align: center;
      width: 100%;
      max-width: 400px;
  }
  #evolution-path {
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 8px;
      max-width: 400px;
      min-height: 150px;
  }
  .step-container {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
  }
  .step-date {
      font-size: 0.9em;
      color: #777;
      margin-top: 5px;
      display: block;
  }
  .slider-controls {
      display: flex;
      justify-content: space-between;
      max-width: 400px;
      margin-top: 10px;
  }
  .slider-controls button {
      padding: 8px 12px;
      border: none;
      background-color: #007BFF;
      color: white;
      font-size: 1em;
      border-radius: 5px;
      cursor: pointer;
  }
  .slider-controls button:hover {
      background-color: #0056b3;
  }
</style>
`);




// Función para mostrar el modal con el estado del comando
function mostrarModalEstadoComando(titulo, mensaje, descripcion) {
    // Crear el modal
    const modal = document.createElement('div');
    modal.classList.add('modal'); // Añadir clase para el modal

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = titulo; // Título del modal

    const message = document.createElement('p');
    message.classList.add('modal-message');
    message.textContent = mensaje; // Mensaje principal

    const descriptionText = document.createElement('p');
    descriptionText.classList.add('modal-description');
    descriptionText.textContent = descripcion; // Descripción adicional

    const closeButton = document.createElement('button');
    closeButton.textContent = "Cerrar"; // Botón de cierre
    closeButton.onclick = function () {
        cerrarModal(modal); // Llama a la función para cerrar el modal
    };

    // Añadir todos los elementos al contenido del modal
    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(descriptionText);
    modalContent.appendChild(closeButton);

    // Añadir el contenido al modal
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Mostrar el modal
    modal.style.display = 'block'; // Cambia a bloque para que sea visible
}

// Función para cerrar el modal
function cerrarModal(modal) {
    if (modal) {
        document.body.removeChild(modal); // Elimina el modal del DOM
    }
}

// Función para verificar si el evento ha comenzado
function verificarEventoIniciado(nombreEvento) {
    // Aquí debería ir la lógica para verificar si el evento ha comenzado.
    // Puedes sustituir esta condición con la lógica real de tu juego o app.
    const eventosIniciados = ['Fobias', 'Asesinos']; // Lista de eventos que ya han comenzado
    return eventosIniciados.includes(nombreEvento); // Devuelve true si el evento ha comenzado
}

// Función para mostrar el modal si el evento aún no ha comenzado
function mostrarModalEventoPendiente(nombreEvento, titulo, mensaje, descripcion) {
    // Verificar si el evento ha comenzado
    if (!verificarEventoIniciado(nombreEvento)) {
        // Si el evento no ha comenzado, mostrar el modal
        const modal = document.createElement('div');
        modal.classList.add('modal'); // Añadir clase para el modal

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const title = document.createElement('h2');
        title.textContent = titulo; // Título del modal

        const message = document.createElement('p');
        message.classList.add('modal-message');
        message.textContent = mensaje; // Mensaje principal

        const descriptionText = document.createElement('p');
        descriptionText.classList.add('modal-description');
        descriptionText.textContent = descripcion; // Descripción adicional

        const closeButton = document.createElement('button');
        closeButton.textContent = "Cerrar"; // Botón de cierre
        closeButton.onclick = function () {
            cerrarModal(modal); // Llama a la función para cerrar el modal
        };

        // Añadir todos los elementos al contenido del modal
        modalContent.appendChild(title);
        modalContent.appendChild(message);
        modalContent.appendChild(descriptionText);
        modalContent.appendChild(closeButton);

        // Añadir el contenido al modal
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Mostrar el modal
        modal.style.display = 'block'; // Cambia a bloque para que sea visible
    } else {
        console.log(`El evento ${nombreEvento} ya ha comenzado.`);
    }
}

// Función para cerrar el modal
function cerrarModal(modal) {
    if (modal) {
        document.body.removeChild(modal); // Elimina el modal del DOM
    }
}

   
// Función para mostrar el modal de error
function mostrarModalErrorComando(comando, mensajeError, detallesError = '') {
    // Mostrar el error en la consola para el desarrollador
    console.error(`Error en el comando: ${comando}`);
    console.error(mensajeError);
    if (detallesError) console.error(detallesError);

    // Crear el modal
    const modal = document.createElement('div');
    modal.classList.add('modal', 'error-modal'); // Añadir clase para el modal de error

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = `Error en el comando: ${comando}`; // Título con el nombre del comando

    const message = document.createElement('p');
    message.classList.add('modal-message');
    message.textContent = mensajeError; // Mensaje principal con el error

    const details = document.createElement('p');
    details.classList.add('modal-details');
    details.textContent = detallesError ? `Detalles: ${detallesError}` : ''; // Detalles adicionales del error, si existen

    const closeButton = document.createElement('button');
    closeButton.textContent = "Cerrar"; // Botón de cierre
    closeButton.onclick = function () {
        cerrarModal(modal); // Llama a la función para cerrar el modal
    };

    // Añadir todos los elementos al contenido del modal
    modalContent.appendChild(title);
    modalContent.appendChild(message);
    if (detallesError) modalContent.appendChild(details); // Añade detalles solo si hay

    modalContent.appendChild(closeButton);

    // Añadir el contenido al modal
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Mostrar el modal
    modal.style.display = 'block'; // Cambia a bloque para que sea visible
}

// Función para cerrar el modal
function cerrarModal(modal) {
    if (modal) {
        document.body.removeChild(modal); // Elimina el modal del DOM
    }
}

// Llamada a procesarConCosto con el costo, el saldo, y la función a ejecutar
const costoDelComando = 0; // Ejemplo de costo en Dólares de Animal

// Función para envolver una función con una verificación de costo en Dólares de Animal
function procesarConCosto(costo, dolaresAnimal, funcionOriginal, args) {
    // Mostrar el costo antes de continuar
    typeMessage(`Este comando cuesta $${costo.toFixed(2)} Dólares de Animal. ¿Deseas proceder con la compra?`);

    // Realizar la transacción antes de continuar con la función original
    animalPayTransaction(costo, dolaresAnimal, function (exito) {
        if (exito) {
            // Si la transacción es exitosa, llamar a la función que invocó a esta función
            funcionOriginal(...args); // Ejecuta la función original con los argumentos
        } else {
            // Si la transacción falla, mostrar un mensaje
            typeMessage('❌ Transacción fallida. No se ha realizado la acción.');
        }
    });
}

// Ejemplo de una función que quieres ejecutar después de procesar el costo
function ejemploDeFuncion(param1, param2) {
    // Esta es la lógica que se ejecuta una vez que la transacción es exitosa
    typeMessage(`¡Ejecutando el comando con los parámetros: ${param1} y ${param2}!`);

}


// Función para crear una notificación dinámica
function crearNotificacion(tipo, titulo, mensaje, botones) {
    // Contenedor principal
    const notificationContainer = document.createElement('div');
    notificationContainer.classList.add('notification', tipo);

    // Icono
    const icon = document.createElement('div');
    icon.classList.add('notification-icon');
    icon.textContent = tipo === 'advertencia' ? '⚠️' : tipo === 'error' ? '❌' : tipo === 'informacion' ? 'ℹ️' : '⬆️';
    notificationContainer.appendChild(icon);

    // Contenido de la notificación
    const content = document.createElement('div');
    content.classList.add('notification-content');

    const titleElement = document.createElement('strong');
    titleElement.textContent = titulo;
    content.appendChild(titleElement);

    const messageElement = document.createElement('p');
    messageElement.textContent = mensaje;
    content.appendChild(messageElement);

    // Fecha y hora
    const timestamp = document.createElement('small');
    timestamp.classList.add('timestamp');
    timestamp.textContent = `Fecha y hora: ${getFormattedTimestamp()}`;
    content.appendChild(timestamp);

    notificationContainer.appendChild(content);

    // Botones personalizados
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    botones.forEach(boton => {
        const button = document.createElement('button');
        button.textContent = boton.texto;
        button.classList.add('notification-button');
        button.addEventListener('click', boton.accion);
        buttonContainer.appendChild(button);
    });

    // Botón de cierre
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => cerrarNotificacion(notificationContainer));
    buttonContainer.appendChild(closeButton);

    notificationContainer.appendChild(buttonContainer);

    // Añadir notificación al cuerpo del documento
    chatContainer2.appendChild(notificationContainer);

    // Estilos CSS
    applyNotificationStyles();
}

// Función para cerrar notificación
function cerrarNotificacion(notificationElement) {
    notificationElement.remove();
}

// Función para obtener la fecha y hora actual en formato legible
function getFormattedTimestamp() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
}

// Estilos CSS para las notificaciones
function applyNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            display: flex;
            align-items: center;
            background-color: #2d2f35;
            color: #ffffff;
            padding: 16px;
            border-radius: 8px;
            margin: 10px;
            max-width: 400px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            position: relative;
        }

        .notification-icon {
            font-size: 24px;
            margin-right: 12px;
        }

        .notification-content {
            flex-grow: 1;
        }

        .notification-content strong {
            font-size: 16px;
        }

        .notification-content p {
            margin: 5px 0;
            font-size: 14px;
        }

        .notification-content small {
            font-size: 12px;
            color: #aaa;
        }

        .button-container {
            display: flex;
            gap: 8px;
            margin-left: auto;
        }

        .notification-button {
            background: none;
            border: none;
            color: #4CAF50;
            font-weight: bold;
            cursor: pointer;
        }

        .close-button {
            background: none;
            border: none;
            color: #FF0000;
            font-weight: bold;
            cursor: pointer;
            font-size: 18px;
        }

        .advertencia { border-left: 4px solid #FFC107; }
        .error { border-left: 4px solid #F44336; }
        .informacion { border-left: 4px solid #03A9F4; }
        .actualizacion { border-left: 4px solid #03A9F4; }
    `;
    document.head.appendChild(style);
}






let saldoADN = 0; // Saldo inicial de ADN

// Definición de la tasa de conversión de cada divisa a Dólares de Animal
const tasaConversionEctoplasma = 0.1; // 1 Ectoplasma equivale a 0.1 Dólares de Animal
const tasaConversionDulces = 0.05; // 1 Dulce equivale a 0.05 Dólares de Animal
const tasaConversionCalabazas = 0.2; // 1 Calabaza equivale a 0.2 Dólares de Animal

let saldoDolaresAnimal = dolaresAnimal;

// Función para generar una cantidad aleatoria de Ectoplasma entre 1 y 50
function generarEctoplasmaAleatorio() {
    return Math.floor(Math.random() * 50) + 1; // Genera un número entre 1 y 50
}

// Variable para almacenar el saldo de Ectoplasma
let saldoEctoplasma = 0; 

// Función para agregar Ectoplasma al saldo actual
function agregarEctoplasma() {
    const ectoplasmaGanado = generarEctoplasmaAleatorio(); // Generar una cantidad aleatoria de Ectoplasma
    saldoEctoplasma += ectoplasmaGanado; // Sumar el Ectoplasma ganado al saldo actual
    typeMessage('¡Has ganado ${ectoplasmaGanado} Ectoplasma! Tu nuevo saldo de Ectoplasma es: ${saldoEctoplasma}.');
    mostrarMonedas(); // Actualizar la lista de monedas después de cambiar el saldo
}

// Función para ver el saldo actual de Ectoplasma
function verSaldoEctoplasma() {
    typeMessage('Tu saldo actual de Ectoplasma es: ${saldoEctoplasma}.');
}

// Comando para consultar el saldo de Ectoplasma
function handleConsultarSaldoEctoplasma() {
    verSaldoEctoplasma(); // Llama a la función para mostrar el saldo
}


// Función para generar una cantidad aleatoria de Dulces entre 1 y 100
function generarDulcesAleatorios() {
    return Math.floor(Math.random() * 100) + 1; // Genera un número entre 1 y 100
}

// Variable para almacenar el saldo de Dulces
let saldoDulces = 0; 

// Función para agregar Dulces al saldo actual
function agregarDulces() {
    const dulcesGanados = generarDulcesAleatorios(); // Generar una cantidad aleatoria de Dulces
    saldoDulces += dulcesGanados; // Sumar los Dulces ganados al saldo actual
    typeMessage('¡Has ganado ${dulcesGanados} Dulces! Tu nuevo saldo de Dulces es: ${saldoDulces}.');
    mostrarMonedas(); // Actualizar la lista de monedas después de cambiar el saldo
}

// Función para ver el saldo actual de Dulces
function verSaldoDulces() {
    typeMessage('Tu saldo actual de Dulces es: ${saldoDulces}.');
}

// Comando para consultar el saldo de Dulces
function handleConsultarSaldoDulces() {
    verSaldoDulces(); // Llama a la función para mostrar el saldo
}


// Función para generar una cantidad aleatoria de Calabazas entre 1 y 76
function generarCalabazasAleatorias() {
    return Math.floor(Math.random() * 76) + 1; // Genera un número entre 1 y 76
}

// Variable para almacenar el saldo de Calabazas
let saldoCalabazas = 0; 

// Función para agregar Calabazas al saldo actual
function agregarCalabazas() {
    const calabazasGanadas = generarCalabazasAleatorias(); // Generar una cantidad aleatoria de Calabazas
    saldoCalabazas += calabazasGanadas; // Sumar las Calabazas ganadas al saldo actual
    typeMessage('¡Has ganado ${calabazasGanadas} Calabazas! Tu nuevo saldo de Calabazas es: ${saldoCalabazas}.');
    mostrarMonedas(); // Actualizar la lista de monedas después de cambiar el saldo
}

// Función para ver el saldo actual de Calabazas
function verSaldoCalabazas() {
    typeMessage('Tu saldo actual de Calabazas es: ${saldoCalabazas}.');
}

// Comando para consultar el saldo de Calabazas
function handleConsultarSaldoCalabazas() {
    verSaldoCalabazas(); // Llama a la función para mostrar el saldo
}



// Función genérica para convertir recursos a Dólares de Animal
function handleConvertirRecursosADolares(saldoRecursos, tasaConversion, tipoRecurso) {
    const dolaresGanados = saldoRecursos * tasaConversion;
    saldoDolaresAnimal += dolaresGanados;
    saldoRecursos = 0; // Restablece el saldo de recursos a 0 tras el intercambio
    typeMessage(`Has convertido ${tipoRecurso} a Dólares de Animal y ganado ${dolaresGanados.toFixed(2)} Dólares de Animal. Tu saldo actual de Dólares de Animal es: ${saldoDolaresAnimal.toFixed(2)}.`);
    return saldoRecursos; // Devolver el saldo actualizado
}

// Funciones específicas para manejar la conversión de cada recurso
function handleConvertirEctoplasmaADolares() {
    handleConvertirRecursosADolares(saldoEctoplasma, handleConvertirEctoplasmaADolares, 'Ectoplasma');
}

function handleConvertirDulcesADolares() {
    handleConvertirRecursosADolares(saldoDulces, handleConvertirDulcesADolares, 'Dulces');
}

function handleConvertirCalabazasADolares() {
    handleConvertirRecursosADolares(saldoCalabazas, handleConvertirCalabazasADolares, 'Calabazas');
}




// Definir los roles disponibles
const roles = ['asesino', 'sheriff', 'inocente'];

// Variables globales para manejo del juego
let creditosDeAsesino = 0;
let heroe = null; // Para rastrear si hay un héroe
let partidaTerminada = false;
let intervaloAsesinoSheriff;
let intervaloHeroe;

// Función para iniciar el juego de Murder Mystery 2
function iniciarMurderMystery() {
    typeMessage("¡Bienvenido a Murder Mystery 2! Se están asignando roles...");

    // Asignar un rol aleatorio al jugador
    const rolJugador = roles[Math.floor(Math.random() * roles.length)];
    typeMessage(`Tu rol es: ${rolJugador.toUpperCase()}`);

    // Iniciar intervalos de ataque entre asesino y sheriff
    if (rolJugador === 'asesino' || rolJugador === 'sheriff') {
        iniciarAtaquesAsesinoSheriff(rolJugador);
    }

    // Lógica según el rol asignado
    if (rolJugador === 'asesino') {
        typeMessage("Tu objetivo es eliminar a todos los inocentes y al sheriff sin ser descubierto.");
        otorgarCreditosDeAsesino(25);  // El asesino comienza con más créditos

        // Mostrar botón para hacer un ataque como asesino
        const botonAtacar = document.createElement("button");
        botonAtacar.innerText = "Atacar a un jugador";
        botonAtacar.onclick = () => {
            atacarJugador(rolJugador);  // Función para atacar
        };
        chatLog.appendChild(botonAtacar);

        // Iniciar intervalo para intentar convertir a un inocente en héroe
        iniciarConversionHeroe();
    } else if (rolJugador === 'sheriff') {
        typeMessage("Eres el sheriff. Encuentra al asesino y protégelos a todos.");
        otorgarCreditosDeAsesino(5);  // El sheriff comienza con algunos créditos

        // Mostrar botón para intentar capturar al asesino
        const botonCapturar = document.createElement("button");
        botonCapturar.innerText = "Intentar capturar al asesino";
        botonCapturar.onclick = () => {
            capturarAsesino();  // Función para capturar al asesino
        };
        chatLog.appendChild(botonCapturar);
    } else {
        typeMessage("Eres un inocente. Sobrevive y evita al asesino.");
        otorgarCreditosDeAsesino(2);  // Los inocentes empiezan con menos créditos

        // Mostrar botón para esconderse
        const botonEsconderse = document.createElement("button");
        botonEsconderse.innerText = "Esconderse";
        botonEsconderse.onclick = () => {
            esconderseAsesino();  // Función para esconderse
        };
        chatLog.appendChild(botonEsconderse);
    }

    // Al final, preguntar si quieren jugar otra partida
    const botonNuevaPartida = document.createElement("button");
    botonNuevaPartida.innerText = "Jugar otra partida";
    botonNuevaPartida.onclick = iniciarMurderMystery;  // Volver a iniciar el juego
    chatLog.appendChild(botonNuevaPartida);
}

// Función para otorgar créditos
function otorgarCreditosDeAsesino(cantidad) {
    creditosDeAsesino += cantidad;
    typeMessage(`Has ganado ${cantidad} Créditos de Asesino. Total actual: ${creditosDeAsesino}.`);
    mostrarMonedas();
}

// Función para ataques automáticos entre asesino y sheriff
function iniciarAtaquesAsesinoSheriff(rolJugador) {
    intervaloAsesinoSheriff = setInterval(() => {
        if (rolJugador === 'asesino' && !partidaTerminada) {
            const resultado = Math.random() < 0.55 ? 'eliminaste al sheriff' : 'fallaste';
            typeMessage(`Intentaste matar al sheriff y... ${resultado}.`);

            if (resultado === 'eliminaste al sheriff') {
                typeMessage('¡Has matado al sheriff!');
                finalizarPartida('Asesino');
                clearInterval(intervaloAsesinoSheriff);  // Detener el intervalo
            }
        } else if (rolJugador === 'sheriff' && !partidaTerminada) {
            const resultado = Math.random() < 0.55 ? 'mataste al asesino' : 'fallaste';
            typeMessage(`Intentaste matar al asesino y... ${resultado}.`);

            if (resultado === 'mataste al asesino') {
                typeMessage('¡Has matado al asesino!');
                finalizarPartida('Sheriff');
                clearInterval(intervaloAsesinoSheriff);  // Detener el intervalo
            }
        }
    }, 25000); // Cada 25 segundos
}

// Función para iniciar el intervalo de conversión a héroe
function iniciarConversionHeroe() {
    intervaloHeroe = setInterval(() => {
        if (!heroe && Math.random() < 0.35 && !partidaTerminada) {
            heroe = 'inocente';
            typeMessage('¡Un inocente se ha convertido en héroe y ha matado al asesino!');
            finalizarPartida('Héroe');
            clearInterval(intervaloHeroe);  // Detener el intervalo
        }
    }, 15000); // Cada 15 segundos
}

// Función para atacar (solo para el asesino)
function atacarJugador(rolJugador) {
    if (rolJugador === 'asesino' && !partidaTerminada) {
        const resultado = Math.random() < 0.5 ? 'fallaste' : 'eliminaste a un jugador';
        typeMessage(`Intentaste atacar y... ${resultado}.`);

        if (resultado === 'eliminaste a un jugador') {
            otorgarCreditosDeAsesino(5); // Ganar créditos por eliminar a un jugador
        }
    }
}

// Función para capturar al asesino (solo para el sheriff)
function capturarAsesino() {
    if (!partidaTerminada) {
        const resultado = Math.random() < 0.76 ? 'capturaste al asesino' : 'fallaste';
        typeMessage(`Intentaste capturar al asesino y... ${resultado}.`);

        if (resultado === 'capturaste al asesino') {
            otorgarCreditosDeAsesino(20);  // El sheriff gana muchos créditos si atrapa al asesino
            finalizarPartida('Sheriff');
        }
    }
}

// Función para esconderse (solo para inocentes)
function esconderseAsesino() {
    if (!partidaTerminada) {
        const resultado = Math.random() < 0.7 ? 'te escondiste exitosamente' : 'el asesino te encontró';
        typeMessage(`Intentaste esconderte y... ${resultado}.`);

        if (resultado === 'te escondiste exitosamente') {
            otorgarCreditosDeAsesino(3); // Ganar algunos créditos por sobrevivir
        }
    }
}

// Función para finalizar la partida y mostrar el ganador
function finalizarPartida(ganador) {
    partidaTerminada = true;
    typeMessage(`¡Partida Terminada! Ganó el ${ganador}.`);

    // Detener todos los intervalos
    clearInterval(intervaloAsesinoSheriff);
    clearInterval(intervaloHeroe);
}

// Mostrar el input para iniciar el juego
function mostrarInputMurderMystery() {
    const botonIniciar = document.createElement("button");
    botonIniciar.innerText = "Iniciar Murder Mystery 2";
    botonIniciar.onclick = iniciarMurderMystery;
    chatLog.appendChild(botonIniciar);
}

function handleFobiaStart() {
    const mensajesFobias = [
        "Por favor, ingrese una fobia de las disponibles:",
        "Aracnofobia",
        "Claustrofobia",
        "Agorafobia",
        "Megalofobia",
        "Talasofobia",
        "Cacofobia",
        "Emetofobia",
        "Crometofobia",
        "Nyctofobia",
        "Chionofobia",
        "Hoplofobia",
        "Taphofobia",
        "Fobia social",
        "Zoofobia",
        "Antrofobia",
        "Aviophobia",
        "Necrofobia",
        "Brontofobia",     // Nueva
        "Hemofobia",       // Nueva
        "Aerofobia",       // Nueva
        "Misofobia",       // Nueva
        "Xenofobia",       // Nueva
        "Nictofobia",      // Nueva
        "Tanatofobia",     // Nueva
        "Ofidiofobia",     // Nueva
        "Acuafobia",       // Nueva
        "Coulrofobia",     // Nueva
        "Sicosis",         // Nueva
        "Dendrofobia",     // Nueva
        "Entomofobia",     // Nueva
        "Haphephobia",     // Nueva
        "Ablutofobia",     // Nueva
        "Phobofobia",      // Nueva
        "Telefobia",       // Nueva
        "Papafobia",       // Nueva
        "Chronofobia",     // Nueva
        "Malaxofobia",     // Nueva
        "Turofobia",       // Nueva
        "Erotofobia",      // Nueva
        "Bibliophobia",    // Nueva
        "Globofobia",      // Nueva
        "Triskaidekafobia",// Nueva
        "Atelofobia",      // Nueva
        "Catoptrofobia",   // Nueva
        "Matofobia",       // Nueva
        "Genofobia",       // Nueva
        "Teleofobia",      // Nueva
        "Ergofobia",       // Nueva
        "Erythrofobia",    // Nueva
        "Neofobia",        // Nueva
        "Hippopotomonstrosesquippedaliofobia", // Nueva
        "Zootrofobia",     // Nueva
        "Phasmophobia",    // Nueva
        "Fobia al éxito",  // Nueva
        "Deipnofobia",     // Nueva
        "Ophiophobia",     // Nueva
        "Gymnofobia",      // Nueva
        "Gaphophobia",     // Nueva
        "Monofobia",       // Nueva
        "Iatrofobia",      // Nueva
        "Amaxofobia",      // Nueva
        "Optofobia",       // Nueva
        "Phonophobia",     // Nueva
        "Selacofobia",     // Nueva
        "Siderodromofobia",// Nueva
        "Pediophobia",     // Nueva
        "Heterofobia",     // Nueva
        "Toxofobia",       // Nueva
        "Hidrofobia"       // Nueva
    ];

    mensajesFobias.forEach((mensaje, index) => {
        setTimeout(() => typeMessage(mensaje), index * 500);
    });

    setTimeout(() => switchToDynamicInput(handleFobiaCommand), mensajesFobias.length * 500);


}

let saldoCreditosFobia = 0;
const ratioConversion = 300; // 1000 Créditos de Fobia = 1 Animal Token

    function handleFobiaCommand(fobia) {
        const fobias = {
            aracnofobia: "La aracnofobia es el miedo a las arañas.",
            claustrofobia: "La claustrofobia es el miedo a los espacios cerrados.",
            agorafobia: "La agorafobia es el miedo a los lugares abiertos o a estar en situaciones donde escapar podría ser difícil.",
            megalofobia: "La megalofobia es el miedo a objetos grandes.",
            talasofobia: "La talasofobia es el miedo al mar o a las profundidades del océano.",
            cacofobia: "La cacofobia es el miedo a lo feo.",
            emetofobia: "La emetofobia es el miedo a vomitar.",
            crometofobia: "La crometofobia es el miedo a los colores.",
            nyctofobia: "La nyctofobia es el miedo a la oscuridad.",
            chionofobia: "La chionofobia es el miedo a la nieve.",
            hoplofobia: "La hoplofobia es el miedo a las armas.",
            taphofobia: "La taphofobia es el miedo a ser enterrado vivo.",
            "fobia social": "La fobia social es el miedo intenso a ser juzgado o evaluado negativamente en situaciones sociales.",
            zoofobia: "La zoofobia es el miedo a los animales.",
            antrofobia: "La antrofobia es el miedo a las flores.",
            aviophobia: "La aviophobia es el miedo a volar.",
            necrofobia: "La necrofobia es el miedo a la muerte o a los muertos.",
            brontofobia: "La brontofobia es el miedo a los truenos.",
            hemofobia: "La hemofobia es el miedo a la sangre.",
            aerofobia: "La aerofobia es el miedo a volar.",
            misofobia: "La misofobia es el miedo a los gérmenes o a la suciedad.",
            xenofobia: "La xenofobia es el miedo a los extranjeros o a lo desconocido.",
            nictofobia: "La nictofobia es el miedo a la noche.",
            tanatofobia: "La tanatofobia es el miedo a la muerte.",
            ofidiofobia: "La ofidiofobia es el miedo a las serpientes.",
            acuafobia: "La acuafobia es el miedo al agua.",
            coulrofobia: "La coulrofobia es el miedo a los payasos.",
            sicosis: "La sicosis es el miedo a la locura.",
            dendrofobia: "La dendrofobia es el miedo a los árboles.",
            entomofobia: "La entomofobia es el miedo a los insectos.",
            haphephobia: "La haphephobia es el miedo a ser tocado.",
            ablutofobia: "La ablutofobia es el miedo a lavarse o a bañarse.",
            phobofobia: "La phobofobia es el miedo a las fobias.",
            telefobia: "La telefobia es el miedo a los teléfonos o a las llamadas telefónicas.",
            papafobia: "La papafobia es el miedo a los padres.",
            chronofobia: "La chronofobia es el miedo al tiempo.",
            malaxofobia: "La malaxofobia es el miedo a ser tocado por otros.",
            turofobia: "La turofobia es el miedo al queso.",
            erotofobia: "La erotofobia es el miedo a la sexualidad.",
            bibliophobia: "La bibliophobia es el miedo a los libros.",
            globofobia: "La globofobia es el miedo a los globos.",
            triskaidekafobia: "La triskaidekafobia es el miedo al número 13.",
            atelofobia: "La atelofobia es el miedo a la imperfección.",
            catoptrofobia: "La catoptrofobia es el miedo a los espejos.",
            matofobia: "La matofobia es el miedo a las sombras.",
            genofobia: "La genofobia es el miedo a la raza.",
            teleofobia: "La teleofobia es el miedo al futuro.",
            ergofobia: "La ergofobia es el miedo al trabajo.",
            erythrofobia: "La erythrofobia es el miedo a sonrojarse.",
            neofobia: "La neofobia es el miedo a lo nuevo.",
            hippopotomonstrosesquippedaliofobia: "La hippopotomonstrosesquippedaliofobia es el miedo a las palabras largas.",
            zootrofobia: "La zootrofobia es el miedo a los animales en general.",
            phasmophobia: "La phasmophobia es el miedo a los fantasmas.",
            "fobia al éxito": "La fobia al éxito es el miedo a triunfar o a tener éxito.",
            deipnofobia: "La deipnofobia es el miedo a las conversaciones durante las comidas.",
            opiophobia: "La opiophobia es el miedo a las medicinas o a la medicina.",
            gymnofobia: "La gymnofobia es el miedo a estar desnudo.",
            gaphophobia: "La gaphophobia es el miedo a las agujas o a los pinchazos.",
            monofobia: "La monofobia es el miedo a la soledad.",
            iatrofobia: "La iatrofobia es el miedo a los médicos.",
            amaxofobia: "La amaxofobia es el miedo a conducir.",
            optofobia: "La optofobia es el miedo a abrir los ojos.",
            phonophobia: "La phonophobia es el miedo a los sonidos.",
            selacofobia: "La selacofobia es el miedo a los tiburones.",
            siderodromofobia: "La siderodromofobia es el miedo a los trenes.",
            pediophobia: "La pediophobia es el miedo a los muñecos o a los bebés.",
            heterofobia: "La heterofobia es el miedo a las personas del sexo opuesto.",
            toxofobia: "La toxofobia es el miedo a las toxinas o a los venenos.",
            hidrofobia: "La hidrofobia es el miedo al agua."
        };
        

const fobiaLower = fobia.toLowerCase();

        if (fobias[fobiaLower]) {
            otorgarCreditosFobia();
            typeMessage(`${fobias[fobiaLower]} Esta fobia tiene una dinámica para superarla.`);
        
            // Crear botón para superar la fobia
            const botonSuperarFobia = document.createElement("button");
            botonSuperarFobia.innerText = "Superar esta fobia";
            botonSuperarFobia.onclick = () => {
                mostrarDinamicaFobia(fobiaLower); // Mostrar la dinámica correspondiente
            };
        
            // Agregar el botón al DOM (esto depende de cómo manejes los elementos en tu aplicación)
            chatLog.appendChild(botonSuperarFobia);
        
            // Preguntar si el usuario quiere ver otra fobia
            typeMessage("¿Quieres ver otra fobia?");
    
            // Crear botón para ver otra fobia
            const botonVerOtraFobia = document.createElement("button");
            botonVerOtraFobia.innerText = "Ver otra fobia";
            botonVerOtraFobia.onclick = () => {
                // Mostrar el input para introducir una nueva fobia
                mostrarInputFobia();
            };
        
            // Agregar el botón al DOM
            chatLog.appendChild(botonVerOtraFobia);
        } else {
                            // Convertir la fobia ingresada a minúsculas
const fobiaKey = fobia.trim().toLowerCase();

// Verificar si la fobia ingresada existe en el objeto fobias
if (fobias[fobiaKey]) {
    typeMessage(fobias[fobiaKey]); // Mostrar la descripción de la fobia
} else {
    typeMessage("Lo siento, no reconozco esa fobia. Por favor, ingrese una fobia válida."); // Mensaje de error genérico
}
}

// Función para mostrar el input donde el usuario puede escribir otra fobia
        function mostrarInputFobia() {
            const inputFobia = document.createElement("input");
            inputFobia.setAttribute("type", "text");
            inputFobia.setAttribute("placeholder", "Escribe otra fobia");
        
            // Botón para confirmar la nueva fobia
            const botonConfirmarFobia = document.createElement("button");
            botonConfirmarFobia.innerText = "Confirmar fobia";
            botonConfirmarFobia.onclick = () => {
                const nuevaFobia = inputFobia.value;
                if (nuevaFobia) {
                    handleFobiaCommand(nuevaFobia);
                }
            };
        
            // Agregar el input y el botón al DOM
            chatLog.appendChild(inputFobia);
            chatLog.appendChild(botonConfirmarFobia);
        }
    }


function mostrarDinamicaFobia(fobiaLower) {
    // Lógica para mostrar la dinámica según la fobia
    switch (fobiaLower) {
        case "claustrofobia":
            typeMessage("Te enfrentarás a una simulación de una habitación pequeña.");
            mostrarSimulacionHabitacionPequena();
            break;
        case "acrofobia":
            typeMessage("Te enfrentarás a una simulación de alturas.");
            mostrarSimulacionAlturas();
            break;
        case "talasofobia":
            typeMessage("Te enfrentarás a una simulación de las profundidades del océano.");
            mostrarSimulacionOceano();
            break;
        case "aracnofobia":
            typeMessage("Te enfrentarás a una imagen de una araña.");
            mostrarImagenAraña();
            break;
        // Agrega más casos para otras fobias que tengan dinámica
        default:
            typeMessage("No hay una dinámica específica para esta fobia, pero has superado tu miedo.");
            otorgarCreditosFobia();
            break;
    }
}

function otorgarCreditosFobia() {
    const creditos = Math.floor(Math.random() * (770 - 75 + 1)) + 75;
    saldoCreditosFobia += creditos;
    typeMessage(`Has ganado ${creditos} Créditos de Fobia. Saldo actual: ${saldoCreditosFobia}`);
    mostrarMonedas();
}

function mostrarSaldoFobia() {
    typeMessage(`Tienes ${saldoCreditosFobia} Créditos de Fobia y ${dolaresAnimal.toFixed(2)}  Animal Tokens.`);
    
    const tokensPosibles = Math.floor(saldoCreditosFobia / ratioConversion);
    
    if (tokensPosibles >= 1) {
        typeMessage(`Puedes convertir ${tokensPosibles} Animal Tokens.`);
        
        // Mostrar botón de conversión
        const botonConvertir = document.createElement("button");
        botonConvertir.innerText = "Convertir Créditos de Fobia a Animal Tokens";
        botonConvertir.onclick = () => convertirFobiaTokens(tokensPosibles);
        
        // Agregar el botón al DOM (ajusta según cómo manejas tu DOM)
        chatLog.appendChild(botonConvertir);
    } else {
        typeMessage("No tienes suficientes Créditos de Fobia para convertir en Animal Tokens.");
    }
    mostrarMonedas();
}

function convertirFobiaTokens(tokensPosibles) {
    if (tokensPosibles >= 1) {
        saldoCreditosFobia -= tokensPosibles * ratioConversion;
        dolaresAnimal += tokensPosibles;
        typeMessage(`Has convertido ${tokensPosibles} Animal Tokens. Saldo actual: ${dolaresAnimal.toFixed(2)}  Animal Tokens y ${saldoCreditosFobia} Créditos de Fobia.`);
    } else {
        typeMessage("No tienes suficientes Créditos de Fobia para convertir.");
    }
}

    
// Función para mostrar una simulación de habitación pequeña para claustrofobia
function mostrarSimulacionHabitacionPequena() {
    const contenedor = document.createElement("div");
    contenedor.style.width = "200px";
    contenedor.style.height = "200px";
    contenedor.style.border = "1px solid black";
    contenedor.style.margin = "20px auto";
    contenedor.style.backgroundColor = "#ddd";
    contenedor.style.display = "flex";
    contenedor.style.justifyContent = "center";
    contenedor.style.alignItems = "center";

    const texto = document.createElement("p");
    texto.textContent = "Pequeña habitación simulada. Mantén la calma.";
    contenedor.appendChild(texto);

    chatLog.appendChild(contenedor);
}

// Función para mostrar una simulación de altura controlada para acrofobia
function mostrarSimulacionAlturas() {
    const contenedor = document.createElement("div");
    contenedor.style.width = "100%";
    contenedor.style.height = "300px";
    contenedor.style.backgroundImage = "url('https://www.pexels.com/photo/view-from-a-mountain-cliff-1006204/download/')";
    contenedor.style.backgroundSize = "cover";
    contenedor.style.backgroundPosition = "center";
    contenedor.style.display = "flex";
    contenedor.style.justifyContent = "center";
    contenedor.style.alignItems = "center";
    contenedor.style.marginTop = "20px";

    const texto = document.createElement("p");
    texto.textContent = "Vista desde una altura segura. No hay peligro.";
    texto.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    texto.style.padding = "10px";
    contenedor.appendChild(texto);

    chatLog.appendChild(contenedor);
}

// Función para mostrar una imagen relajante del océano para talasofobia
function mostrarSimulacionOceano() {
    const contenedor = document.createElement("div");
    contenedor.style.width = "100%";
    contenedor.style.height = "300px";
    contenedor.style.backgroundImage = "url('https://www.lanacion.com.ar/resizer/v2/se-registraron-las-temperaturas-oceanicas-mas-W574D6JCMJGVFBCETCOUZW7CSU.png?auth=ce126aa68f08dc4758e714c71679602bbdde6d188d5848c3c39d5cdd65cf3e05&width=880&height=586&quality=70&smart=true')";
    contenedor.style.backgroundSize = "cover";
    contenedor.style.backgroundPosition = "center";
    contenedor.style.display = "flex";
    contenedor.style.justifyContent = "top";
    contenedor.style.alignItems = "top";
    contenedor.style.marginTop = "20px";

    const texto = document.createElement("p");
    texto.textContent = "El océano está en calma. Estás seguro en la orilla.";
    texto.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    texto.style.padding = "10px";
    contenedor.appendChild(texto);

    chatLog.appendChild(contenedor);
}

// Modificar la función de superar fobia para incluir todas las dinámicas
function handleSuperarFobia(fobia) {
    const dinamicas = {
        aracnofobia: "Estás viendo una imagen controlada de una pequeña araña. Respira profundo y relájate.",
        claustrofobia: "Imagina que estás en una pequeña habitación, pero todo está bajo control. Respira y mantén la calma.",
        acrofobia: "Observa una vista desde las alturas, pero estás seguro y estable. No hay peligro.",
        talasofobia: "Estás viendo una imagen del océano, pero estás seguro en la orilla. Respira profundo y relájate."
    };

    const mensajeDinamica = dinamicas[fobia] || "No hay dinámica disponible para esta fobia.";
    typeMessage(mensajeDinamica);

    // Lógica para mostrar la dinámica específica según la fobia
    if (fobia.toLowerCase() === "aracnofobia") {
        mostrarImagenAraña();
    } else if (fobia.toLowerCase() === "claustrofobia") {
        mostrarSimulacionHabitacionPequena();
    } else if (fobia.toLowerCase() === "acrofobia") {
        mostrarSimulacionAlturas();
    } else if (fobia.toLowerCase() === "talasofobia") {
        mostrarSimulacionOceano();
    }
}

// Función para mostrar la imagen de una araña
function mostrarImagenAraña() {
    const contenedorAraña = document.createElement("div");
    contenedorAraña.style.display = "flex";
    contenedorAraña.style.justifyContent = "center";
    contenedorAraña.style.alignItems = "center";
    contenedorAraña.style.margin = "20px 0";

    const imagenAraña = document.createElement("img");
    imagenAraña.src = "https://images.pexels.com/photos/51394/spin-web-nature-bug-51394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    imagenAraña.alt = "Imagen de una araña";
    imagenAraña.style.width = "400px";
    imagenAraña.style.border = "2px solid #000";
    imagenAraña.style.borderRadius = "10px";

    contenedorAraña.appendChild(imagenAraña);
    chatLog.appendChild(contenedorAraña);
}

function mostrarCargandoCircular() {
    // Crear el contenedor del spinner
    const spinnerContainer = document.createElement('div');
    spinnerContainer.style.position = 'fixed';
    spinnerContainer.style.top = '50%';
    spinnerContainer.style.left = '50%';
    spinnerContainer.style.transform = 'translate(-50%, -50%)';
    spinnerContainer.style.zIndex = '1000';

    // Crear el spinner circular
    const spinner = document.createElement('div');
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.border = '6px solid #ccc'; // Color del borde del spinner
    spinner.style.borderTop = '6px solid #4CAF50'; // Color de la parte animada
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';

    // Agregar el spinner al contenedor y el contenedor al cuerpo del documento
    spinnerContainer.appendChild(spinner);
    document.body.appendChild(spinnerContainer);

    // Generar un tiempo aleatorio entre 1 y 10 segundos
    const tiempoAleatorio = Math.floor(Math.random() * 10) + 1;

    // Remover el spinner después del tiempo aleatorio
    setTimeout(() => {
        spinnerContainer.remove();
    }, tiempoAleatorio * 1000);
}



// CSS para la animación de giro
document.head.insertAdjacentHTML("beforeend", `
<style>
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
`);



// Crear el botón para abrir el modal de Premium
const premiumButton = document.createElement('button');
premiumButton.id = 'premium-btn';
premiumButton.textContent = 'Obten Premium';
document.body.appendChild(premiumButton);

// Crear el botón para mostrar los beneficios de Premium y la cuenta regresiva
const premiumBenefitsButton = document.createElement('p');
premiumBenefitsButton.id = 'premium-benefits-btn';
premiumBenefitsButton.style.display = 'none'; // Ocultarlo inicialmente
chatContainer2.appendChild(premiumBenefitsButton);

// Crear el contenedor del modal de Premium
const premiumModal = document.createElement('div');
premiumModal.id = 'premium-modal';
premiumModal.style.display = 'none'; // Ocultarlo inicialmente

// Agregar título y descripción del modal
const premiumTitle = document.createElement('h2');
premiumTitle.textContent = 'Obten más con Premium';
premiumModal.appendChild(premiumTitle);

const premiumDescription = document.createElement('p');
premiumDescription.innerHTML = `
    ¡Desbloquea funciones avanzadas con Premium! Al adquirir Premium, podrás disfrutar de:
    <ul>
        <li>500 Dolares de Animal por hora!</li>
        <li>Mas funciones pronto</li>
    </ul>
`;
premiumModal.appendChild(premiumDescription);

// Crear el botón para obtener Premium
const obtainPremiumButton = document.createElement('button');
obtainPremiumButton.textContent = 'Obten Premium';
premiumModal.appendChild(obtainPremiumButton);

// Crear el botón de cierre del modal
const closeModalButton = document.createElement('button');
closeModalButton.textContent = 'Cerrar';
closeModalButton.id = 'close-modal-btn';
premiumModal.appendChild(closeModalButton);

// Agregar el modal al cuerpo del documento
document.body.appendChild(premiumModal);

let countdown;
let countdownInterval;

// Función para actualizar el botón de beneficios Premium con la cuenta regresiva
function updateCountdown() {
    let timeRemaining = countdown;
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    premiumBenefitsButton.textContent = `Beneficios del Premium: +500 Dólares de Animal en ${hours}:${minutes}:${seconds}`;

    // Reducir el contador en 1 segundo
    countdown--;

    // Si llega a cero, agregar 500 Dólares de Animal y reiniciar el contador
    if (countdown < 0) {
        dolaresAnimal += 500;
        countdown = 5400; // Reiniciar a 1.5 horas en segundos
        alert(`¡Has recibido 500 Dólares de Animal! Tu saldo actual es: ${dolaresAnimal}`);
    }
}

// Evento para abrir el modal de Premium
premiumButton.addEventListener('click', () => {
    premiumModal.style.display = 'block'; // Mostrar el modal
    mostrarCargandoCircular();
});

// Evento para cerrar el modal de Premium al hacer clic fuera del modal
window.addEventListener('click', (e) => {
    if (e.target === premiumModal) {
        premiumModal.style.display = 'none'; // Ocultar el modal
    }
});

// Evento para cerrar el modal al hacer clic en el botón de cierre
closeModalButton.addEventListener('click', () => {
    premiumModal.style.display = 'none'; // Ocultar el modal
});


// Evento para iniciar la transacción con animalPayTransaction
obtainPremiumButton.addEventListener('click', () => {
    animalPayTransaction(1000, (success) => {
        if (success) {
            alert("¡Felicidades! Ahora tienes Premium y puedes disfrutar de beneficios exclusivos.");
            premiumModal.style.display = 'none'; // Cerrar el modal tras la compra

            // Mostrar el botón de beneficios y empezar el temporizador de 1.5 horas
            premiumBenefitsButton.style.display = 'inline-block';
            countdown = 5400; // 1.5 horas en segundos

            // Iniciar el intervalo para actualizar el temporizador cada segundo
            clearInterval(countdownInterval); // Limpiar el intervalo anterior si existe
            countdownInterval = setInterval(updateCountdown, 1000);
        }
    });
});

// CSS para el modal y el botón de Premium
document.head.insertAdjacentHTML("beforeend", `
<style>
    #premium-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 80%;
        max-width: 400px;
        z-index: 1000;
    }
    #premium-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    #premium-modal h2 {
        margin-top: 0;
        text-align: center;
        font-size: 1.8em;
    }
    #premium-modal p {
        font-size: 1em;
        margin: 20px 0;
    }
    #premium-modal button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        font-size: 1.2em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    #premium-modal ul {
        list-style: none;
        padding: 0;
    }
    #premium-modal li {
        margin: 5px 0;
    }
</style>
`);


// Crear el botón y el modal dinámicamente
const ecoButton = document.createElement('button');
ecoButton.id = 'eco-btn';
ecoButton.textContent = 'Camino Ecológico';
chatContainer3.appendChild(ecoButton);

// Contenedor del modal
const ecoModal = document.createElement('div');
ecoModal.id = 'eco-modal';
ecoModal.style.display = 'none'; // Asegúrate de que esté oculto inicialmente



// Título del modal
const modalTitle = document.createElement('h2');
modalTitle.textContent = 'Camino Ecológico';
ecoModal.appendChild(modalTitle);

// Botón de cierre del modal
const closeButton = document.createElement('button');
closeButton.id = 'close-btn';
closeButton.textContent = 'X';
ecoModal.appendChild(closeButton);

// Mostrador de EcoCréditos
const ecoCreditosDisplay = document.createElement('p');
ecoCreditosDisplay.id = 'eco-creditos-display';
ecoModal.appendChild(ecoCreditosDisplay);

// Mostrador de Comandos Desbloqueados
const comandosDesbloqueadosDisplay = document.createElement('p');
comandosDesbloqueadosDisplay.id = 'comandos-desbloqueados-display';
ecoModal.appendChild(comandosDesbloqueadosDisplay);

// Contenedor de rectángulos
const rectanglesContainer = document.createElement('div');
rectanglesContainer.id = 'rectangles-container';
ecoModal.appendChild(rectanglesContainer);

// Botón para reclamar EcoCréditos
const claimButton = document.createElement('button');
claimButton.id = 'claim-btn';
claimButton.textContent = 'Reclamar 10 EcoCréditos';
ecoModal.appendChild(claimButton);

// Botones de navegación
const prevButton2 = document.createElement('button');
prevButton2.textContent = 'Página Anterior';
ecoModal.appendChild(prevButton2);

const nextButton2 = document.createElement('button');
nextButton2.textContent = 'Página Siguiente';
ecoModal.appendChild(nextButton2);

// Agregar el modal al cuerpo del documento
document.body.appendChild(ecoModal);

// Variables para paginación
const comandosPorPagina2 = 3; // Límite de comandos por página
let paginaActual2 = 0;

// Lista de comandos con rarezas y costos
const rectangulos = [
    { name: '/lluvia-de-dolares', ecoCreditos: 10, className: 'Comun' },
    { name: '/comprar-moneda', ecoCreditos: 30, className: 'PocoComun' },
    { name: '/comandos-existentes', ecoCreditos: 70, className: 'Raro' },
    { name: '/comando-epico', ecoCreditos: 100, className: 'Epico' },
    { name: '/comando-legendario', ecoCreditos: 150, className: 'Legendario' },
    { name: '/comando-mitico', ecoCreditos: 200, className: 'Mitico' },
];

let ecoCreditos = 0;
let lastClaimTime = null;
const comandosDesbloqueados = {}; // Guardará los comandos desbloqueados

// Actualizar la cantidad de EcoCréditos en pantalla
function updateEcoCreditosDisplay() {
    ecoCreditosDisplay.textContent = `EcoCréditos: ${ecoCreditos}`;
}

// Función para actualizar el contador de comandos desbloqueados
function updateComandosDesbloqueadosDisplay() {
    const totalComandos = rectangulos.length;
    const comandosActuales = Object.keys(comandosDesbloqueados).length;
    comandosDesbloqueadosDisplay.textContent = `${comandosActuales}/${totalComandos} Comandos Desbloqueados`;
}

// Renderizar rectángulos de comandos
function renderRectangles() {
    rectanglesContainer.innerHTML = ''; // Limpiar contenido previo

    // Calcular índices de inicio y fin para la página actual
    const availableCommands = rectangulos
        .filter(rect => !comandosDesbloqueados[rect.name] && rect.ecoCreditos <= ecoCreditos); // Filtrar comandos disponibles

    const startIndex = paginaActual2 * comandosPorPagina2;
    const endIndex = startIndex + comandosPorPagina2;

    availableCommands.slice(startIndex, endIndex).forEach((rect, index) => {
        const rectangle = document.createElement('div');
        rectangle.classList.add('rectangulo', rect.className);
        rectangle.dataset.index = startIndex + index; // Ajustar el índice según la página

        // Mostrar el nombre y el costo
        const nameSpan = document.createElement('span');
        nameSpan.textContent = rect.name;

        const costSpan = document.createElement('span');
        costSpan.textContent = `Costo: ${rect.ecoCreditos} EcoCréditos`;

        rectangle.appendChild(nameSpan);
        rectangle.appendChild(costSpan);
        rectanglesContainer.appendChild(rectangle);

        // Evento para desbloquear comando
        rectangle.addEventListener('click', () => unlockCommand(rectangle, startIndex + index));
    });

    // Deshabilitar botones según la página actual
    prevButton2.disabled = paginaActual2 === 0;
    nextButton2.disabled = endIndex >= availableCommands.length;
}


// Navegar a la página anterior
prevButton2.addEventListener('click', () => {
    if (paginaActual2 > 0) {
        paginaActual2--;
        renderRectangles();
    }
});

// Navegar a la página siguiente
nextButton2.addEventListener('click', () => {
    if ((paginaActual2 + 1) * comandosPorPagina2 < rectangulos.length) {
        paginaActual2++;
        renderRectangles();
    }
});

function unlockCommand(rectangle, index) {
    const command = rectangulos[index];
    if (ecoCreditos >= command.ecoCreditos) {
        ecoCreditos -= command.ecoCreditos; // Descontar EcoCréditos
        updateEcoCreditosDisplay();
        comandosDesbloqueados[command.name] = true; // Marcar como desbloqueado

        // Mostrar animación de texto giratorio
        showUnlockAnimation(command.name, command.className, command.ecoCreditos);

        // Actualizar el display de comandos desbloqueados
        updateComandosDesbloqueadosDisplay();

        // Eliminar rectángulo tras la animación
        rectangle.remove(); // Elimina el rectángulo después de desbloquear
        mostrarMonedas();
    } else {
        alert("No tienes suficientes EcoCréditos para desbloquear este comando.");
    }
}

// Reclamar EcoCréditos
claimButton.addEventListener('click', () => {
    const now = new Date();
    if (!lastClaimTime || now - lastClaimTime >= 60 * 60 * 1000) {
        ecoCreditos += 10;
        lastClaimTime = now;
        updateEcoCreditosDisplay();
        renderRectangles();
        mostrarMonedas();
    } else {
        const minutesLeft = Math.ceil((60 * 60 * 1000 - (now - lastClaimTime)) / 60000);
        claimButton.textContent = `Debes esperar ${minutesLeft} minutos más para reclamar.`;
    }
});

// Mostrar animación de desbloqueo
function showUnlockAnimation(name, rarity, cost) {
    const modalContent = document.createElement('div');
    modalContent.classList.add('unlock-animation');

    // Texto giratorio
    const rotatingText = document.createElement('div');
    rotatingText.classList.add('rotating-text');
    rotatingText.textContent = name;
    modalContent.appendChild(rotatingText);

    // Información de comando
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('command-info');
    infoDiv.innerHTML = `
        <p>Nombre: ${name}</p>
        <p>Rareza: ${rarity}</p>
        <p>Costo: ${cost} EcoCréditos</p>
    `;
    modalContent.appendChild(infoDiv);

    ecoModal.appendChild(modalContent);

    setTimeout(() => {
        modalContent.remove();
    }, 3000); // Remover después de 3 segundos
}

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (e) => {
    if (e.target === ecoModal) {
        ecoModal.style.display = 'none';
    }
});

// Mostrar el modal al hacer clic en el botón de Camino Ecológico
ecoButton.addEventListener('click', () => {
    ecoModal.style.display = 'block'; // Mostrar el modal
    updateEcoCreditosDisplay(); // Actualizar la visualización de EcoCréditos al abrir el modal
    updateComandosDesbloqueadosDisplay(); // Actualizar la visualización de comandos desbloqueados al abrir el modal
    mostrarCargandoCircular();
});

// Cerrar modal al hacer clic en el botón de cierre
closeButton.addEventListener('click', () => {
    ecoModal.style.display = 'none'; // Ocultar el modal
});

 
// CSS para animación de texto giratorio y estilo del modal
document.head.insertAdjacentHTML("beforeend", `
<style>
    .rotating-text {
        font-size: 1.5em;
        animation: spin 2s infinite linear;
        text-align: center;
        margin-top: 10px;
    }
    .command-info p {
        margin: 5px 0;
        text-align: center;
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
        /* Estilo para el contenedor de comandos desbloqueados */
    #comandos-desbloqueados-display {
        font-size: 18px;
        margin-bottom: 10px;
    }

</style>
`);



// Función para actualizar la barra de progreso y las misiones
function startMissionTimer(duration, progressBarId, rewardAmount) {
    const progressBar = document.getElementById(progressBarId);
    let timeLeft = duration;
    const interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            progressBar.style.width = '100%'; // Completa la barra
            addEcoCreditos(rewardAmount); // Añade EcoCréditos al saldo
            alert(`¡Misión completada! Has ganado ${rewardAmount} EcoCréditos.`);
        } else {
            timeLeft -= 1;
            const progressPercentage = ((duration - timeLeft) / duration) * 100;
            progressBar.style.width = `${progressPercentage}%`; // Actualiza la barra
        }
    }, 1000); // Actualiza cada segundo
}

// Función para añadir EcoCréditos al saldo
function addEcoCreditos(amount) {
    ecoCreditos += amount;
    console.log(`EcoCréditos: ${ecoCreditos}`); // Muestra el saldo actualizado en la consola
}

// Inicia los temporizadores de las misiones
startMissionTimer(300, 'progress-bar-5', 10); // 5 minutos (300 segundos)
startMissionTimer(900, 'progress-bar-15', 30); // 15 minutos (900 segundos)
startMissionTimer(1800, 'progress-bar-30', 50); // 30 minutos (1800 segundos)


const commands = {
    'saldo': handleSaldoCommand,
    'localizador': handleEventoActivo,
    'desactivar-localizador': handleDesactivarLocalizadorCommand,
    'salvador-de-animales': handleSalvadorDeAnimalesCommand,
    'fobias': handleFobiaStart,
    'eventos': generarEventos,
    'reto-de-pistas': handleRetoDePistas,
    'actualizaciones': handleActualizaciones,
    'servidor': ejecutarComandoServidor,
    'desastres-naturales': handleDesastresNaturales,
    'last-update': handleLastUpdateCommand,
    'ejemplo': handleNuevoComando,
    'resaltar-texto-infoanimalai': handleResaltarTextoInfoAnimalAI,
    'caza-megalodon': handleCazaMegalodon,
    'refugio-animales': handleRefugioAnimalesCommand,
    'mejorar-refugio': handleMejorarRefugioCommand,
    'comprar-articulo': handleComprarArticulo,
    'lineas': startLineCommand,
    'retirar-saldo': handleRetirarSaldoCommand,
    'generar-blog': handleCrearBlogCommand,
    'PPOT': handlePPOT,
    'limpieza': handlelimpiarChat,
    'update': handleUpdate,
    'proximo-comando': proximoComando,
    'pase-de-temporada': mostrarModalPaseTemporada,
    'comandos-existentes': handleContarComandos,
    'seleccionar-modelo-ia': handleSeleccionarModeloIA,
    'resumir-texto': handleResumirTexto,
    'gatitos': handleGatitos,
    'generar-url': handleGenerarURLVideo,
    'reproductor-de-musica': handleReproductorMP3,
    'animal-random': handleAnimalRandom,
    'mantenimiento': comandoMantenimiento,
    'proximos-comandos': mostrarComandosProximos,
    'intercambiador-de-moneda': mostrarSaldoFobia,
    'comprar-moneda': mostrarModalCompraTokens,
    'generar-codigo': mostrarModalVerificacionAdmin,
    'contenido+18': mostrarModalVerificacionEdad,
    'configuracion': mostrarConfiguracion,
    'enviar-notificaciones': solicitarPermisoNotificaciones,
    'crear-notificaciones': crearNotificacion,
    'unirse': mostrarModalRegistro,
    'acceder': mostrarModalInicioSesion,
    'usuarios': mostrarUsuariosVerificados,
    'boss-battle': handleEnfrentarJefe,
    'comandos-recomendados': handleComandosRecomendados, // Comando para buscar
    'sombra-asesina': function() {
        mostrarModalEventoPendiente('eventoX', 'Ups, hubo un error al intentar ejecutar este comando:', 'Este evento aún no ha comenzado.', 'El evento de Asesinos no ha comenzado, comenzara en noviembre.');
    },
    'generar-imagenes': function() {
        mostrarModalEstadoComando("Proximamente", "El comando esta indisponible, pero pronto lo estara..", "Podras generar imagenes muy pronto.");
    },
    
   'explora-biomas': handleEventoActivo,
   'explora-biomas-evento': handleExploraBiomasCommand,
   't-rex-friend': tRexFriend,
   'definiciones': handleDefinicion,
   'frases-motivacionales': handleFraseMotivacional,
   'quiz-animal': handleQuizAnimal, // Nuevo comando
    'leyenda-mitica': handleLeyendaMitica, // Nuevo comando
   'recompensa-diaria/semanal': handleRecompensaCommand,
   'patch-notes': ejecutarPatchNotes,
   'tienda': abrirTiendaModal,
   'notificar-nuevopost': abrirModalNotificarPost,
   'enviar-post': abrirModalPosts,
   'ver-documentacion': setupInstalacionDocumentacion,
   'texto-advertencia': setupTextoAdvertencia,
   'enviar-peticion': crearPeticionWhatsApp,
   'seleccionar-modelo': handleSeleccionarModeloIA,
   'lluvia-de-dolares': lluviaDeDolaresAnimal,
   'chequeo-medico': setupDiagnostico,
   'ADN': handleConsultarSaldoADN,
   'intercambiar-adn': function() {
        convertirADNaDolaresAnimal(152); // Convertir 152 ADN a Dólares de Animal
    },
    'ataque-fantasma': handleAtaqueFantasma,
    'animal-ai-research': iniciarAnimalAIResearch,
    'Cria-Calabazas': ejecutarComandoCriaCalabazas,
    'Ectoplasma': verSaldoEctoplasma,
    'Calabazas': verSaldoCalabazas,
    'Dulces': verSaldoDulces,
    'intercambiar-dulces': handleConvertirDulcesADolares,
    'intercambiar-calabazas': handleConvertirCalabazasADolares,
    'intercambiar-ectoplasma': handleConvertirEctoplasmaADolares,
    'caceria-de-dulces': iniciarCaceriaDeDulces,
    'minijuegos': handleMinijuegos,
    'crear-comando': promote,
};



function promote() {
    // Crear botón para sugerir un nuevo comando
    const suggestButton = document.createElement('button');
    suggestButton.textContent = 'Sugerir Comando';
    chatLog.appendChild(suggestButton);

    // Contenedor del input y mensajes
    const suggestModal = document.createElement('div');
    suggestModal.id = 'suggest-modal';
    suggestModal.style.display = 'none'; // Ocultar inicialmente
    chatLog.appendChild(suggestModal);

    // Agregar input para el comando sugerido
    const commandInput = document.createElement('input');
    commandInput.type = 'text';
    commandInput.placeholder = 'Ingresa el comando que te gustaría agregar';
    suggestModal.appendChild(commandInput);

    // Botón de envío para el comando sugerido
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Enviar Sugerencia';
    suggestModal.appendChild(submitButton);

    // Mensaje de tipo (typeMessage) para mostrar mensajes en el modal
    const messageElement = document.createElement('p');
    suggestModal.appendChild(messageElement);

    // Evento para el botón de sugerir comando
    suggestButton.addEventListener('click', () => {
        suggestModal.style.display = 'block'; // Mostrar el modal
        commandInput.value = ''; // Limpiar el input
        messageElement.textContent = ''; // Limpiar mensaje previo
    });

    // Evento para enviar la sugerencia de comando
    submitButton.addEventListener('click', () => {
        const suggestedCommand = commandInput.value.trim();
        if (!suggestedCommand) {
            alert('Por favor, ingresa un comando para sugerir.');
            return;
        }

        // Mostrar mensaje de redireccionamiento usando tu función typeMessage
        typeMessage('Redireccionando a WhatsApp...', messageElement);

        // Redirigir a WhatsApp después de 5 segundos
        setTimeout(() => {
            window.open('https://wa.me/598099685536?text=Hola! Me gustaría sugerir el comando: ' + encodeURIComponent(suggestedCommand), '_blank');
        }, 5000);

        // Preguntar si quiere promocionar
        setTimeout(() => {
            // Crear el botón para promocionar
            const promoteButton = document.createElement('button');
            promoteButton.textContent = 'Promocionarlo';
            suggestModal.appendChild(promoteButton);

            // Mostrar mensaje de promoción usando typeMessage
            typeMessage('¿Quieres promocionarlo?', messageElement);

            // Evento para promocionar y redirigir a PayPal
            promoteButton.addEventListener('click', () => {
                window.location.href = 'https://paypal.me/JBarboza111?country.x=UY&locale.x=es_XC'; // URL de PayPal
                typeMessage('Después de realizar la compra por favor, envía mensaje a +598 099 685 536 en cuanto la compra haya sido completada así en alrededor de 24 horas o menos tu comando estará siendo promocionado', messageElement);
            });
        }, 7000); // Mostrar el botón después de 7 segundos
    });

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (e) => {
        if (e.target === suggestModal) {
            suggestModal.style.display = 'none';
        }
    });
}
// Lista de minijuegos disponibles
const minijuegos = [
    { name: 'Adivina el Número', action: () => alert("Iniciando 'Adivina el Número'...") },
    { name: 'Memoria', action: () => alert("Iniciando 'Memoria'...") },
    { name: 'Serpiente', action: () => alert("Iniciando 'Serpiente'...") },
    { name: 'Trivia', action: () => alert("Iniciando 'Trivia'...") },
    // Agrega más minijuegos según sea necesario
];

function handleMinijuegos() {
// Crear contenedor principal
const minijuegosContainer = document.createElement('div');
minijuegosContainer.id = 'minijuegos-container';

// Crear título
const title = document.createElement('h2');
title.textContent = 'Minijuegos Disponibles';
minijuegosContainer.appendChild(title);

// Crear lista de minijuegos
const minijuegosList = document.createElement('ul');
minijuegosList.id = 'minijuegos-list';
minijuegos.forEach(game => {
    const listItem = document.createElement('li');
    listItem.textContent = game.name;
    minijuegosList.appendChild(listItem);
});
minijuegosContainer.appendChild(minijuegosList);

// Crear campo de entrada para seleccionar un minijuego
const minijuegoInput = document.createElement('input');
minijuegoInput.type = 'text';
minijuegoInput.id = 'minijuego-input';
minijuegoInput.placeholder = 'Escribe un minijuego para jugar';
minijuegosContainer.appendChild(minijuegoInput);

// Crear botón para jugar
const jugarBtn = document.createElement('button');
jugarBtn.id = 'jugar-btn';
jugarBtn.textContent = 'Jugar';
minijuegosContainer.appendChild(jugarBtn);

// Agregar el contenedor principal al cuerpo del documento
chatLog.appendChild(minijuegosContainer);

// Evento para el botón Jugar
jugarBtn.addEventListener('click', () => {
    const minijuegoSeleccionado = minijuegoInput.value.trim();
    
    // Buscar el minijuego en la lista
    const juego = minijuegos.find(game => game.name.toLowerCase() === minijuegoSeleccionado.toLowerCase());

    if (juego) {
        // Ejecutar la función del minijuego si se encuentra
        juego.action();
    } else {
        alert('Minijuego no encontrado. Intenta escribir el nombre correctamente.');
    }
});
}



function animalPayTransaction(costo, callback) {
    // Crear texto animado de "Métodos de Pago"
    const animText = document.createElement('div');
    animText.id = 'animText';
    animText.textContent = 'Métodos de Pago';
    animText.style.animation = 'fadeIn 1.5s ease-in-out';
    animText.style.fontSize = '24px';
    animText.style.textAlign = 'center';
    animText.style.marginTop = '20px';
    animText.style.color = '#333';
    document.body.appendChild(animText);

    // Mostrar el modal después de 1.5 segundos
    setTimeout(() => {
        animText.remove();

        const modaltransaction = document.createElement('div');
        modaltransaction.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Cambiar título a "Checkout"
        const title = document.createElement('h2');
        title.textContent = 'Checkout';
        modalContent.appendChild(title);

        // Crear el saldo y costo
        const saldoInfo = document.createElement('p');
        saldoInfo.textContent = `Tu saldo: Dólares de Animal - $${dolaresAnimal}`;
        saldoInfo.style.fontSize = '18px';
        saldoInfo.style.marginBottom = '15px';
        modalContent.appendChild(saldoInfo);

        const costoInfo = document.createElement('p');
        costoInfo.textContent = `Costo: $${costo}`;
        costoInfo.style.fontSize = '18px';
        costoInfo.style.marginBottom = '20px';
        modalContent.appendChild(costoInfo);

        // Texto de forma de pago
        const paymentText = document.createElement('p');
        paymentText.textContent = 'Pagar con OCEAN Currencies: Animal Dollars (Global)';
        paymentText.style.fontSize = '16px';
        paymentText.style.marginBottom = '15px';
        modalContent.appendChild(paymentText);

        // Dropdown para seleccionar divisa
        const paymentDropdown = document.createElement('select');
        paymentDropdown.classList.add('dropdown-payment');
        paymentDropdown.style.marginBottom = '20px';
        
        // Opciones de divisas
        const divisas = {
            dolaresAnimal: { nombre: 'Dólares de Animal', saldo: dolaresAnimal },
            saldoADN: { nombre: 'ADN', saldo: saldoADN },
            saldoCalabazas: { nombre: 'Calabazas', saldo: saldoCalabazas },
            saldoDulces: { nombre: 'Dulces', saldo: saldoDulces },
            saldoCreditosFobia: { nombre: 'Créditos de Fobia', saldo: saldoCreditosFobia },
            creditosDeAsesino: { nombre: 'Créditos de Asesino', saldo: creditosDeAsesino },
            saldoEctoplasma: { nombre: 'Ectoplasma', saldo: saldoEctoplasma },
            ecoCreditos: { nombre: 'EcoCreditos', saldo: ecoCreditos }
        };

        // Agregar opciones al dropdown
        for (const key in divisas) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${divisas[key].nombre} - Saldo: $${divisas[key].saldo.toFixed(2)}`;
            paymentDropdown.appendChild(option);
        }
        
        modalContent.appendChild(paymentDropdown); 

        const hr = document.createElement('hr');
        modalContent.appendChild(hr);
          
        // Botón Finalizar Compra
        const finalizarButton = document.createElement('button');
        finalizarButton.textContent = 'Finalizar Compra';
        finalizarButton.classList.add('btn-finalizar-compra');
        finalizarButton.style.borderRadius = '12px'; // Curva el botón
        finalizarButton.style.padding = '10px 20px';
        finalizarButton.style.fontSize = '16px';
        finalizarButton.style.marginTop = '20px';
        
        // Evento al hacer clic en "Finalizar Compra"
        finalizarButton.addEventListener('click', function () {
            const selectedDivisa = paymentDropdown.value;
            const divisa = divisas[selectedDivisa];

            if (divisa.saldo >= costo) {
                divisa.saldo -= costo; // Deduce el costo del saldo de la divisa
                showSuccessAnimation(modaltransaction, divisa.nombre, costo.toFixed(2), function() {
                    callback(true); // Indica que la transacción fue exitosa
                });
            } else {
                alert(`❌ No tienes suficiente saldo en ${divisa.nombre}. Saldo actual: $${divisa.saldo.toFixed(2)}.`);
                callback(false); // Indica que la transacción falló
            }
        });
        
        modalContent.appendChild(finalizarButton);

        // Agregar todo al modal y mostrarlo
        modaltransaction.appendChild(modalContent);
        document.body.appendChild(modaltransaction);
        modaltransaction.style.display = 'block';
    }, 1500);
}



function showSuccessAnimation(modal, metodoPago, cantidad, callback) {
    // Verificar si el modal y el contenido del modal existen
    if (!modal) {
        console.error("El elemento modal no existe.");
        return;
    }

    const modalContent = modal.querySelector('.modal-content');
    
    if (!modalContent) {
        console.error("El elemento modal no contiene un elemento .modal-content.");
        return;
    }

    // Limpiar contenido del modal
    modalContent.innerHTML = '';

    // Contenedor de éxito
    const successContainer = document.createElement('div');
    successContainer.classList.add('success-container');

    // Círculo de animación
    const circleContainer = document.createElement('div');
    circleContainer.classList.add('circle-container');

    const circle = document.createElement('div');
    circle.classList.add('circle');

    const checkIcon = document.createElement('span');
    checkIcon.innerHTML = '&#10004;'; // Icono ✔️
    checkIcon.classList.add('check-icon');

    // Añadir círculo e icono de verificación
    circleContainer.appendChild(circle);
    circleContainer.appendChild(checkIcon);
    successContainer.appendChild(circleContainer);
    modalContent.appendChild(successContainer);

    // Mensaje de éxito
    const successMessage = document.createElement('p');
    successMessage.textContent = `✅ Pago realizado exitosamente con ${metodoPago}. Cantidad: $${cantidad}.`;
    successMessage.classList.add('success-message');
    modalContent.appendChild(successMessage);

    // Botón para cerrar el modal
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.classList.add('btn-close');
    modalContent.appendChild(closeButton);

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Activar animación del círculo y mostrar el icono de verificación
    circle.classList.add('fill-circle-animation');
    setTimeout(() => {
        checkIcon.classList.add('show-check');
        successMessage.classList.add('fade-in');
    }, 1500);

    // Ejecutar el callback después de mostrar la animación
    setTimeout(() => {
        callback(true);
    }, 3000);
}


// CSS sugerido para mejorar la animación
document.head.insertAdjacentHTML("beforeend", `
<style>
    .success-container {
        text-align: center;
        margin-top: 20px;
    }
    .circle-container {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 100px;
        margin: 0 auto;
        animation: popIn 0.5s ease-out;
    }
    .circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 8px solid #4CAF50;
        position: absolute;
        top: 0;
        left: 0;
        animation: circlePulse 2s infinite ease-in-out;
    }
    .check-icon {
        color: #4CAF50;
        font-size: 2em;
        opacity: 0;
        transform: scale(0.5);
        transition: opacity 0.5s, transform 0.5s;
    }
    .show-check {
        opacity: 1;
        transform: scale(1);
        animation: bounce 0.5s ease-out;
    }
    .success-message {
        margin-top: 15px;
        font-size: 1.1em;
        color: #333;
        opacity: 0;
        transition: opacity 1s ease-in;
    }
    .fade-in {
        opacity: 1;
    }
    .btn-close {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 15px;
        animation: fadeIn 0.5s ease-out 1s;
    }
    .btn-close:hover {
        background-color: #45a049;
    }

    /* Animaciones */
    @keyframes popIn {
        0% { transform: scale(0); }
        100% { transform: scale(1); }
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes circlePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
</style>
`);



function setupTextoAdvertencia() {
    // Crear botón para iniciar el proceso del comando
    const textoAdvertenciaBtn = document.createElement('button');
    textoAdvertenciaBtn.textContent = '/texto-advertencia';
    textoAdvertenciaBtn.classList.add('btn');
    chatLog.appendChild(textoAdvertenciaBtn);

    // Agregar evento de clic para iniciar el proceso
    textoAdvertenciaBtn.addEventListener('click', iniciarTextoAdvertencia);
}

// Función para manejar el flujo del comando /texto-advertencia
function iniciarTextoAdvertencia() {
    const textoInputDiv = document.createElement('div');
    textoInputDiv.classList.add('mensaje');
    textoInputDiv.textContent = 'Introduce un texto a mostrar:';
    chatLog.appendChild(textoInputDiv);

    const textoInput = document.createElement('input');
    textoInput.setAttribute('type', 'text');
    textoInput.classList.add('input-texto');
    chatLog.appendChild(textoInput);

    const confirmarTextoBtn = document.createElement('button');
    confirmarTextoBtn.textContent = 'Confirmar texto';
    confirmarTextoBtn.classList.add('btn');
    chatLog.appendChild(confirmarTextoBtn);

    confirmarTextoBtn.addEventListener('click', () => {
        const texto = textoInput.value;

        // Solicitar al usuario que elija las personalizaciones
        mostrarOpcionesPersonalizacion(texto);
        textoInputDiv.remove();
        textoInput.remove();
        confirmarTextoBtn.remove();
    });
}
// Función para mostrar opciones de personalización
function mostrarOpcionesPersonalizacion(texto, divisas) {
    console.log('Divisas:', divisas); // Esto te ayudará a depurar
    const personalizacionDiv = document.createElement('div');
    personalizacionDiv.classList.add('mensaje');
    personalizacionDiv.textContent = 'Seleccione la personalización deseada:';
    chatLog.appendChild(personalizacionDiv);

    const opciones = [
        { label: 'Color Rojo (Gratis)', clase: 'texto-rojo', costo: 0 },
        { label: 'Animación Parpadeo (2 Dólares de Animal)', clase: 'animacion-parpadeo', costo: 2 },
        { label: 'Texto Subrayado (Gratis)', clase: 'texto-subrayado', costo: 0 },
        { label: 'Animación Rotación (3 Dólares de Animal)', clase: 'animacion-rotacion', costo: 3 },
        { label: 'Color Verde (Gratis)', clase: 'texto-verde', costo: 0 },
        { label: 'Animación Oscilación (5 Dólares de Animal)', clase: 'animacion-oscilacion', costo: 5 }
    ];

    // Asegúrate de definir opcionesContainer aquí
    const opcionesContainer = document.createElement('div');
    chatLog.appendChild(opcionesContainer);

    opciones.forEach(opcion => {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('value', opcion.clase);
        checkbox.setAttribute('data-costo', opcion.costo);
        
        const label = document.createElement('label');
        label.textContent = opcion.label;
        label.appendChild(checkbox);
        
        opcionesContainer.appendChild(label);
        opcionesContainer.appendChild(document.createElement('br'));
    });

    const saldoDiv = document.createElement('div');
    saldoDiv.textContent = `Tu saldo actual es: $${dolaresAnimal.toFixed(2)} Dólares de Animal`;
    chatLog.appendChild(saldoDiv);

    const confirmarPersonalizacionBtn = document.createElement('button');
    confirmarPersonalizacionBtn.textContent = 'Aplicar personalización';
    confirmarPersonalizacionBtn.classList.add('btn');
    chatLog.appendChild(confirmarPersonalizacionBtn);

    confirmarPersonalizacionBtn.addEventListener('click', () => {
        let costoTotal = 0;
        const clasesSeleccionadas = [];

        opcionesContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            const costo = parseFloat(checkbox.getAttribute('data-costo'));
            costoTotal += costo;
            clasesSeleccionadas.push(checkbox.value);
        });

        if (costoTotal > dolaresAnimal) {
            typeMessage('❌ No tienes suficientes Dólares de Animal para aplicar estas personalizaciones.');
        } else {
            // Realizar el pago utilizando la función animalPayTransaction
            animalPayTransaction(costoTotal, divisas, (exito) => {
                if (exito) {
                    dolaresAnimal -= costoTotal; // Restar el costo si la transacción es exitosa
                    saldoDiv.textContent = `Tu nuevo saldo es: $${dolaresAnimal.toFixed(2)} Dólares de Animal`;

                    mostrarMonedas();
                    // Mostrar el texto con las personalizaciones aplicadas
                    mostrarTextoPersonalizado(texto, clasesSeleccionadas);
                }
            });
        }

        personalizacionDiv.remove();
        opcionesContainer.remove();
        confirmarPersonalizacionBtn.remove();
    });
}



// Función para mostrar el texto personalizado
function mostrarTextoPersonalizado(texto, clases) {
    const textoFinalDiv = document.createElement('div');
    textoFinalDiv.classList.add('mensaje', ...clases);
    textoFinalDiv.textContent = texto;
    chatLog.appendChild(textoFinalDiv);
}


// Función para actualizar y mostrar el saldo de Dulces en pantalla
function actualizarSaldoDulces() {
    typeMessage(`Tu saldo actual de Dulces es: ${saldoDulces}.`);
}

// Función para generar una cantidad aleatoria de Dulces (1 - 200)
function generarDulcesAleatorios() {
    return Math.floor(Math.random() * 200) + 1;
}




// Función para iniciar el minijuego de la cacería de dulces
function iniciarCaceriaDeDulces() {
    // Crear contenedor para las calabazas
    const dulcesContainer = document.createElement('div');
    dulcesContainer.id = 'dulcesContainer';
    dulcesContainer.style.display = 'flex';
    dulcesContainer.style.justifyContent = 'space-around';
    dulcesContainer.style.padding = '20px';
    dulcesContainer.style.position = 'relative';
    
    // Agregar el contenedor al body (o al contenedor principal que estés usando)
    chatLog.appendChild(dulcesContainer);

    // Crear calabazas de dulces
    for (let i = 0; i < 5; i++) {
        const calabaza = document.createElement('div');
        calabaza.classList.add('calabaza');

        // Etiqueta de cantidad de dulces en la calabaza
        const dulcesLabel = document.createElement('div');
        dulcesLabel.classList.add('dulcesLabel');
        dulcesLabel.textContent = `🎃 Dulces`;

        calabaza.appendChild(dulcesLabel);
        dulcesContainer.appendChild(calabaza);

        let haSidoClicada = false; // Flag para verificar si la calabaza ha sido clickeada

        // Generar una cantidad aleatoria de Dulces al hacer clic
        calabaza.onclick = function () {
            if (!haSidoClicada) { // Solo ejecutar si no ha sido clickeada antes
                haSidoClicada = true; // Marcar como clickeada
                const dulcesGanados = generarDulcesAleatorios();
                saldoDulces += dulcesGanados;
                typeMessage(`¡Ganaste ${dulcesGanados} Dulces! 🎉 Tu saldo de Dulces es: ${saldoDulces}`);
                mostrarMonedas();
                calabaza.remove(); // Elimina la calabaza después de hacer clic
            }
        };

        // Animación de derrame de dulces después de 5 segundos
        setTimeout(() => {
            if (!haSidoClicada && document.body.contains(calabaza)) {
                calabaza.classList.add('derrama'); // Agregar la animación de derrame
                setTimeout(() => calabaza.remove(), 1000); // Eliminar después de la animación
                typeMessage("No has actuado a tiempo, los dulces se han derramado😢⌛"); // Mostrar mensaje de derrame
            }
        }, 5000);
    }
}




let vidas = 3;

// Función para iniciar el minijuego
function iniciarMinijuegoCalabazas() {
    const contenedorJuego = document.createElement('div');
    contenedorJuego.classList.add('contenedor-juego');

    // Crear el área de juego en el chat
    const mensajeJuego = document.createElement('p');
    mensajeJuego.textContent = '¡Corta las calabazas para ganar saldo de Calabazas!';

    // Contadores de saldo y vidas
    const saldoDisplay = document.createElement('p');
    saldoDisplay.textContent = `Saldo de Calabazas: ${saldoCalabazas}`;
    
    const vidasDisplay = document.createElement('p');
    vidasDisplay.textContent = `Vidas restantes: ${vidas}`;

    contenedorJuego.appendChild(mensajeJuego);
    contenedorJuego.appendChild(saldoDisplay);
    contenedorJuego.appendChild(vidasDisplay);
    
    // Agregar el contenedor de calabazas al área de juego
    const areaCalabazas = document.createElement('div');
    areaCalabazas.classList.add('area-calabazas');
    contenedorJuego.appendChild(areaCalabazas);

    // Mostrar el minijuego en el chat
    chatLog.appendChild(contenedorJuego);

    // Función para crear calabazas aleatoriamente
    function crearCalabaza() {
        if (vidas <= 0) return; // Terminar si no quedan vidas

        const calabaza = document.createElement('div');
        calabaza.classList.add('calabaza');
        calabaza.textContent = '🎃';

        // Posición aleatoria de la calabaza
        calabaza.style.left = `${Math.random() * 80}%`;
        calabaza.style.top = `${Math.random() * 80}%`;

        // Agregar calabaza al área de juego
        areaCalabazas.appendChild(calabaza);

        // Evento para "cortar" la calabaza
        calabaza.addEventListener('click', () => {
            saldoCalabazas += 5;
            saldoDisplay.textContent = `Saldo de Calabazas: ${saldoCalabazas}`;
            calabaza.remove();
        });

        // Tiempo de vida de la calabaza antes de desaparecer
        setTimeout(() => {
            if (areaCalabazas.contains(calabaza)) {
                calabaza.remove();
                vidas--;
                vidasDisplay.textContent = `Vidas restantes: ${vidas}`;

                if (vidas <= 0) {
                    terminarMinijuego();
                }
            }
        }, 2000); // 2 segundos antes de que la calabaza desaparezca
    }

    // Crear una calabaza cada segundo
    const intervaloCalabazas = setInterval(crearCalabaza, 1000);

    // Función para terminar el minijuego
    function terminarMinijuego() {
        clearInterval(intervaloCalabazas);
        mensajeJuego.textContent = `¡Juego terminado! Tu saldo final de Calabazas es: ${saldoCalabazas}`;
        areaCalabazas.remove();
        mostrarMonedas();
    }
}

// Activar el minijuego con el comando /Cria-Calabazas
function ejecutarComandoCriaCalabazas() {
    iniciarMinijuegoCalabazas();
}




// Variable global para manejar el contador de notificaciones
let contadorNotificaciones = 3; // Ejemplo inicial (puedes modificar manualmente)


// Lista de notificaciones (variable global)
let notificacionesLista = [
    {
        mensaje: "Nueva Actualizacion",
        fecha: "25/10/2024",
        hora: "17:11 PM"
    },

];


// Función para mostrar el panel de notificaciones en el chat
function mostrarNotificaciones() {
    const panel = document.createElement('div');
    panel.classList.add('notificaciones-panel');

    // Título del panel
    const titulo = document.createElement('h3');
    titulo.textContent = 'Notificaciones';
    panel.appendChild(titulo);

    // Contenedor para las notificaciones
    const listaNotificaciones = document.createElement('div');
    listaNotificaciones.classList.add('notificaciones-lista');
    panel.appendChild(listaNotificaciones);

    // Cargar notificaciones desde la lista global
    notificacionesLista.forEach(notificacion => {
        agregarNotificacionAlDOM(notificacion, listaNotificaciones);
    });

    // Crear el badge para el contador
const badgeContador = document.createElement('span');
badgeContador.id = 'badge-contador';
badgeContador.classList.add('badge');
chatLog.appendChild(badgeContador);


    // Añadir el panel al chat
    chatLog.appendChild(panel);

    // Reducir el contador de notificaciones y actualizar el badge
    contadorNotificaciones = 0;
    actualizarBadgeContador();

    // Eliminar panel después de 10 segundos
    setTimeout(() => {
        if (panel.parentNode) {
            panel.parentNode.removeChild(panel);
        }
    }, 10000); // 10 segundos
}




// Variables globales
let energiaPorComando = 0; // Energía en W
let energiaMaxima = 10; // Nivel de energía para advertencia
let energiaCritica = 15; // Nivel de energía para sobrecarga
let generadorActivo = true; // Estado del generador de energía
let intervaloEnergia; // Intervalo para actualizar la energía
let sobrecargaActiva = false; // Indica si está en proceso de sobrecarga
let cuentaRegresivaAutodestruccion = 180; // 3 minutos para autodestrucción
let cuentaRegresivaBotonCohete = 30; // 30 segundos para activar botón de cohete
let botonCoheteDeshabilitado = true; // Estado del botón del cohete
let cuentaRegresivaInterval;

// Función para mostrar el panel de investigación de IA Animal
function mostrarPanelAnimalAIResearch() {
    const modal = document.createElement('div');
    modal.classList.add('typeMessage');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Panel de Investigación Animal AI';

    // Contenedor para la energía producida por comando
    const energiaContainer = document.createElement('div');
    energiaContainer.classList.add('energia-container');

    const energiaText = document.createElement('p');
    energiaText.textContent = `Energía producida por comando: ${energiaPorComando} W`;

    // Interruptor para el generador de energía
    const switchGeneradorLabel = document.createElement('label');
    switchGeneradorLabel.textContent = 'Generador de Energía:';
    
    const switchGenerador = document.createElement('input');
    switchGenerador.type = 'checkbox';
    switchGenerador.checked = true; // Generador activo por defecto
    switchGeneradorLabel.appendChild(switchGenerador);

    switchGenerador.addEventListener('change', function () {
        generadorActivo = switchGenerador.checked;
        if (!generadorActivo) {
            energiaPorComando = 0; // Desactivar generador y bajar energía
            energiaText.textContent = `Energía producida por comando: ${energiaPorComando} W`;
        }
    });

    // Añadir elementos al contenedor del modal
    energiaContainer.appendChild(energiaText);
    modalContent.appendChild(title);
    modalContent.appendChild(energiaContainer);
    modalContent.appendChild(switchGeneradorLabel);

    // Botón para iniciar el panel
    const botonIniciar = document.createElement('button');
    botonIniciar.textContent = 'Iniciar monitoreo';
    botonIniciar.onclick = function () {
        iniciarMonitoreoEnergia(energiaText, switchGenerador);
        botonIniciar.disabled = true;
    };
    modalContent.appendChild(botonIniciar);

    // Añadir el modal al documento
    modal.appendChild(modalContent);
    chatLog.appendChild(modal);
    modal.style.display = 'block';
}

// Función para iniciar el monitoreo de energía
function iniciarMonitoreoEnergia(energiaText, switchGenerador) {
    intervaloEnergia = setInterval(() => {
        if (generadorActivo) {
            energiaPorComando += Math.random() * 2; // Incremento aleatorio de energía

            // Actualizar el texto de energía
            energiaText.textContent = `Energía producida por comando: ${energiaPorComando.toFixed(2)} W`;

            // Advertencia si alcanza 10 W
            if (energiaPorComando >= energiaMaxima && energiaPorComando < energiaCritica) {
                energiaText.style.color = 'red';
                typeMessage('⚠️ La energía ha alcanzado un nivel peligroso. Desactiva el Generador de Energía.');
            }

            // Activar sobrecarga si llega a 15 W
            if (energiaPorComando >= energiaCritica && !sobrecargaActiva) {
                iniciarProcesoAutodestruccion();
            }
        }
    }, 1000); // Actualizar cada segundo
}

// Función para iniciar el proceso de autodestrucción
function iniciarProcesoAutodestruccion() {
    sobrecargaActiva = true;
    typeMessage('⚠️ SOBRECARGA DE ENERGÍA, INICIANDO PROCESO DE AUTODESTRUCCIÓN...');
    playSound('https://oceanandwild.github.io/audios/Explosion%20Sound%20Effects.mp3'); // Sonido de rayos
    iniciarCuentaRegresivaAutodestruccion();
}

// Función para iniciar la cuenta regresiva de autodestrucción
function iniciarCuentaRegresivaAutodestruccion() {
    cuentaRegresivaInterval = setInterval(() => {
        cuentaRegresivaAutodestruccion--;

        if (cuentaRegresivaAutodestruccion === 150) { // A los 2:30 minutos
            typeMessage('🚀 PREPARANDO COHETES...');
            iniciarCuentaRegresivaBotonCohete();
        }

        if (cuentaRegresivaAutodestruccion <= 0) {
            ejecutarAutodestruccion();
            clearInterval(cuentaRegresivaInterval);
        }
    }, 1000);
}

// Función para iniciar la cuenta regresiva del botón del cohete
function iniciarCuentaRegresivaBotonCohete() {
    const botonCohete = document.createElement('button');
    botonCohete.textContent = `PREPARANDO COHETE (${cuentaRegresivaBotonCohete}s)`;
    botonCohete.disabled = true; // Botón deshabilitado inicialmente
    chatLog.appendChild(botonCohete);

    const intervaloBotonCohete = setInterval(() => {
        cuentaRegresivaBotonCohete--;
        botonCohete.textContent = `PREPARANDO COHETE (${cuentaRegresivaBotonCohete}s)`;

        if (cuentaRegresivaBotonCohete <= 0) {
            botonCohete.disabled = false;
            botonCohete.textContent = 'LANZAR COHETE 1';
            clearInterval(intervaloBotonCohete);
        }
    }, 1000);

    botonCohete.addEventListener('click', function () {
        lanzarCohete();
    });
}

// Función para lanzar el cohete
function lanzarCohete() {
    typeMessage('🚀 LANZANDO COHETE 1...');
    playSound('sound-launch.mp3'); // Sonido de lanzamiento
}

// Función para ejecutar la autodestrucción
function ejecutarAutodestruccion() {
    playSound('https://oceanandwild.github.io/audios/Explosion%20Sound%20Effects.mp3'); // Sonido de explosión
    playSound('sound-alarma.mp3'); // Sonido de alarma
    alert('💥 AUTODESTRUCCIÓN COMPLETA 💥');
    reiniciarSistema(); // Reiniciar todo después de la autodestrucción
}

// Función para reiniciar el sistema
function reiniciarSistema() {
    clearInterval(intervaloEnergia);
    energiaPorComando = 0;
    energiaMaxima = 10;
    energiaCritica = 15;
    generadorActivo = true;
    sobrecargaActiva = false;
    cuentaRegresivaAutodestruccion = 180;
    cuentaRegresivaBotonCohete = 30;
    botonCoheteDeshabilitado = true;
    document.body.innerHTML = ''; // Limpiar el DOM
    mostrarPanelAnimalAIResearch(); // Mostrar nuevamente el panel
}



// Función para reproducir sonidos
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

// Inicialización del comando /animal-ai-research
function iniciarAnimalAIResearch() {
    mostrarPanelAnimalAIResearch();
}



// Comando para convertir ADN en Dólares de Animal
function handleConvertirADNaDolares() {
    const cantidadADN = 152; // Puedes cambiarlo a una entrada dinámica
    convertirADNaDolaresAnimal(cantidadADN); // Llama a la función de conversión
}



const conversionRate = 76; // 1 Dólar de Animal = 76 ADN

// Función para convertir ADN a Dólares de Animal
function convertirADNaDolaresAnimal(cantidadADN) {
    // Verificar si el usuario tiene suficiente ADN
    if (cantidadADN <= saldoADN) {
        // Calcular cuántos Dólares de Animal obtendrá
        const dolaresObtenidos = (cantidadADN / conversionRate).toFixed(2);
        
        // Actualizar el saldo de ADN y Dólares de Animal
        saldoADN -= cantidadADN;
        dolaresAnimal += parseFloat(dolaresObtenidos);

        typeMessage(`¡Conversión exitosa! Has convertido ${cantidadADN} ADN en $${dolaresObtenidos} Dólares de Animal.`);
        typeMessage(`Nuevo saldo de ADN: ${saldoADN}, Nuevo saldo de Dólares de Animal: $${dolaresAnimal.toFixed(2)}`);
    } else {
        // Mensaje de error si no hay suficiente ADN
        typeMessage('❌ No tienes suficiente saldo de ADN para realizar esta conversión.');
    }
}



// Array de las monedas del juego, con su icono y la cantidad
const monedas = [
    { nombre: 'Calabazas', icono: 'https://i.pinimg.com/564x/58/01/8e/58018e2ca2d23f731f30885952346e9c.jpg', cantidad: saldoCalabazas },
    { nombre: 'Dulces', icono: 'https://i.pinimg.com/564x/af/57/d4/af57d40bb32c19f65a6a4011ae99e427.jpg', cantidad: saldoDulces },
    { nombre: 'Ectoplasma', icono: 'https://i.pinimg.com/564x/a1/66/a9/a166a92619a87b8a7995c5b634adb175.jpg', cantidad: saldoEctoplasma },
    { nombre: 'ADN', icono: 'https://i.pinimg.com/control/564x/ba/4d/f4/ba4df4b069b7044ce8f0b0845fa20c37.jpg', cantidad: saldoADN },
    { nombre: 'Dolar Animal', icono: 'https://i.pinimg.com/564x/5e/cd/84/5ecd847af96e20ebe2c6d89cae85a2e5.jpg', cantidad: dolaresAnimal },
    { nombre: 'Creditos de Asesino', icono: 'https://i.pinimg.com/736x/b3/73/cb/b373cbe11610c9bdb6fa39b8fbf5f861.jpg', cantidad: creditosDeAsesino },
    { nombre: 'Creditos de Fobias', icono: 'https://i.pinimg.com/736x/0e/75/27/0e752798119bf1e794ad6326c28b9f29.jpg', cantidad: saldoCreditosFobia }, 
    { nombre: 'EcoCreditos', icono: 'https://i.pinimg.com/736x/2b/a2/16/2ba216e6a3155a2e4472fd46958012a8.jpg', cantidad: ecoCreditos }, 
];


// Función para actualizar las cantidades en el array de monedas antes de mostrarlas
function actualizarSaldosMonedas() {
    monedas[0].cantidad = saldoCalabazas;   // Actualizar el saldo de Calabazas
    monedas[1].cantidad = saldoDulces;      // Actualizar el saldo de Dulces
    monedas[2].cantidad = saldoEctoplasma;  // Actualizar el saldo de Ectoplasma
    monedas[3].cantidad = saldoADN;         // Actualizar el saldo de ADN
    monedas[4].cantidad = dolaresAnimal;    // Actualizar el saldo de Dólares de Animal
    monedas[5].cantidad = creditosDeAsesino;    // Actualizar el saldo de Creditos de Asesino
    monedas[6].cantidad = saldoCreditosFobia;    // Actualizar el saldo de Creditos de Fobias
    monedas[7].cantidad = ecoCreditos;    // Actualizar el saldo de Creditos de Fobias
}


// Función para mostrar la lista de monedas con las cantidades actualizadas
function mostrarMonedas() {
    actualizarSaldosMonedas(); // Asegurarse de que los saldos están actualizados

    const currencyList = document.getElementById('currency-list');
    currencyList.innerHTML = ''; // Limpiar cualquier contenido anterior

    monedas.forEach(moneda => {
        const currencyItem = document.createElement('div');
        currencyItem.classList.add('currency-item');

        // Crear imagen del icono
        const icono = document.createElement('img');
        icono.src = moneda.icono;
        icono.alt = moneda.nombre;

        // Crear el texto del nombre y cantidad
        const nombre = document.createElement('span');
        nombre.textContent = `${moneda.nombre}: ${moneda.cantidad}`;

        // Añadir el icono y el nombre al contenedor
        currencyItem.appendChild(icono);
        currencyItem.appendChild(nombre);

        // Añadir el contenedor a la lista de monedas
        currencyList.appendChild(currencyItem);
    });
}

// Llamar a la función para mostrar las monedas (por ejemplo después de obtener saldo)
mostrarMonedas();


// Función para mostrar los fantasmas en el chat
function generarFantasma() {
    const chatBox = document.getElementById('chat-box'); // Caja de chat donde aparecerán los fantasmas

    // Crear un nuevo div para el fantasma
    const fantasma = document.createElement('div');
    fantasma.classList.add('fantasma');

    // Establecer una imagen o emoji para el fantasma
    const imagenFantasma = document.createElement('img');
    imagenFantasma.src = 'https://i.pinimg.com/564x/a1/66/a9/a166a92619a87b8a7995c5b634adb175.jpg'; // Imagen del fantasma
    imagenFantasma.alt = 'Fantasma';

    // Añadir un evento de clic para otorgar Ectoplasma al hacer clic
    fantasma.addEventListener('click', () => {
        const ectoplasmaGanado = generarEctoplasmaAleatorio(); // Generar una cantidad aleatoria de Ectoplasma
        agregarEctoplasma(ectoplasmaGanado); // Agregar el Ectoplasma al saldo del jugador

        // Eliminar el fantasma después de ser clicado
        fantasma.remove();
    });

    // Añadir la imagen al div del fantasma
    fantasma.appendChild(imagenFantasma);

    // Añadir el fantasma a la caja de chat
    chatLog.appendChild(fantasma);

    // Hacer que el fantasma desaparezca después de 5 segundos si no ha sido clicado
    setTimeout(() => {
        if (chatLog.contains(fantasma)) {
            fantasma.remove(); // Eliminar el fantasma del chat
        }
    }, 5000); // 5 segundos antes de que desaparezca
}

// Comando para activar el ataque fantasma
function handleAtaqueFantasma() {
    const cantidadFantasmas = Math.floor(Math.random() * 5) + 1; // Generar entre 1 y 5 fantasmas

    for (let i = 0; i < cantidadFantasmas; i++) {
        setTimeout(generarFantasma, i * 1000); // Generar fantasmas con intervalos de tiempo
    }

    typeMessage('👻 ¡Los fantasmas han invadido el chat! ¡Haz clic en ellos para ganar Ectoplasma! 👻');
}

function setupDiagnostico() {
    // Crear botón para iniciar el proceso del comando
    const diagnosticoBtn = document.createElement('button');
    diagnosticoBtn.textContent = '/diagnostico';
    diagnosticoBtn.classList.add('btn');
    chatLog.appendChild(diagnosticoBtn);

    // Agregar evento de clic para iniciar el proceso
    diagnosticoBtn.addEventListener('click', iniciarDiagnostico);

    console.log("Botón de /diagnostico creado");
}

// Función para iniciar el diagnóstico
function iniciarDiagnostico() {
    typeMessage('Diagnosticando...');

    setTimeout(() => {
        realizarDiagnostico();
    }, 2000); // Simulación del proceso de diagnóstico
}

// Función para realizar el diagnóstico aleatorio
function realizarDiagnostico() {
    const enfermedades = [
        { nombre: 'Gripe', tratamiento: 'Reposo y medicación', esCronica: false, costo: 10 },
        { nombre: 'Fractura', tratamiento: 'Inmovilización y yeso', esCronica: false, costo: 50 },
        { nombre: 'Diabetes', tratamiento: 'No definido', esCronica: true, costo: 200 },
        { nombre: 'Hipertensión', tratamiento: 'No definido', esCronica: true, costo: 150 },
        { nombre: 'Migraña', tratamiento: 'Reposo y analgésicos', esCronica: false, costo: 30 },
    ];

    // Seleccionar una enfermedad aleatoriamente
    const enfermedadSeleccionada = enfermedades[Math.floor(Math.random() * enfermedades.length)];

    // Mostrar resumen del diagnóstico
    const diagnosticoDiv = document.createElement('div');
    diagnosticoDiv.classList.add('mensaje');
    diagnosticoDiv.innerHTML = `
        <strong>Diagnóstico:</strong> ${enfermedadSeleccionada.nombre}<br>
        <strong>Tratamiento:</strong> ${enfermedadSeleccionada.tratamiento}<br>
        <strong>Cronica:</strong> ${enfermedadSeleccionada.esCronica ? 'Sí' : 'No'}<br>
        <strong>Costo:</strong> $${enfermedadSeleccionada.costo} Dólares de Animal
    `;
    chatLog.appendChild(diagnosticoDiv);

    // Botón para continuar con el pago
    const continuarBtn = document.createElement('button');
    continuarBtn.textContent = 'Continuar';
    continuarBtn.classList.add('btn');
    chatLog.appendChild(continuarBtn);

    // Evento para continuar con el pago
    continuarBtn.addEventListener('click', () => {
        realizarPagoTratamiento(enfermedadSeleccionada);
        diagnosticoDiv.remove();
        continuarBtn.remove();
    });
}

// Función para realizar el pago del tratamiento
function realizarPagoTratamiento(enfermedad) {
    // Asumimos que el saldo actual de Dólares de Animal está almacenado en una variable global llamada 'saldoDolaresAnimal'
    if (dolaresAnimal >= enfermedad.costo) {
        animalPayTransaction(enfermedad.costo, dolaresAnimal, function (exito) {
            if (exito) {
                // Deducir el costo del saldo del usuario
                dolaresAnimal -= enfermedad.costo;

                typeMessage(`¡Estas curado de ${enfermedad.nombre}!`);

                // Mostrar el saldo restante después del pago
                typeMessage(`Saldo restante: ${dolaresAnimal.toFixed(2)} Dólares de Animal`);

                mostrarMonedas();

                // Crear botón para hacer otro diagnóstico
                const otroDiagnosticoBtn = document.createElement('button');
                otroDiagnosticoBtn.textContent = 'Hacer otro diagnóstico';
                otroDiagnosticoBtn.classList.add('btn');
                chatLog.appendChild(otroDiagnosticoBtn);

                // Evento para hacer otro diagnóstico
                otroDiagnosticoBtn.addEventListener('click', () => {
                    otroDiagnosticoBtn.remove();
                    iniciarDiagnostico();
                });
            } else {
                typeMessage('Error en la transacción. Inténtalo de nuevo.');
            }
        });
    } else {
        typeMessage('Saldo insuficiente para pagar el tratamiento.');
    }
}






function lluviaDeDolaresAnimal() {
    const totalBurbujas = 15; // Número de burbujas que aparecerán
    const burbujas = [];
    let totalGanado = 1000; // Total de Dólares de Animal ganados
    const contenedorBurbujas = document.createElement('div');
    contenedorBurbujas.classList.add('contenedor-burbujas');

    // Mostrar el mensaje inicial
    typeMessage('💸 ¡Es la lluvia de Dólares de Animal! Haz clic en las burbujas para ganar.');

    // Crear las burbujas con cantidades y estilos personalizados
    for (let i = 0; i < totalBurbujas; i++) {
        const burbuja = document.createElement('div');
        const dolaresGanados = (Math.random() * 5 + 1).toFixed(2); // Cantidad entre 1 y 5 Dólares de Animal
        burbuja.classList.add('burbuja');
        burbuja.textContent = `+$${dolaresGanados}`;
        
        // Personalización del tamaño, color y borde de cada burbuja
        const size = Math.random() * 40 + 60; // Tamaño entre 60px y 100px
        const colors = ['#ffdd57', '#57ffde', '#ff5757', '#a857ff', '#57aaff']; // Colores personalizados
        const borderColor = colors[Math.floor(Math.random() * colors.length)]; // Seleccionar un color aleatorio para el borde

        // Aplicar los estilos personalizados a la burbuja
        burbuja.style.width = `${size}px`;
        burbuja.style.height = `${size}px`;
        burbuja.style.border = `2px solid ${borderColor}`;
        burbuja.style.backgroundColor = `rgba(255, 255, 255, 0.7)`; // Fondo semitransparente
        burbuja.style.color = borderColor; // El color del texto coincide con el borde
        
        // Posición aleatoria de las burbujas
        burbuja.style.left = `${Math.random() * 90}vw`;
        burbuja.style.top = `${Math.random() * 70}vh`;

        // Evento de clic en la burbuja
        burbuja.addEventListener('click', function () {
            totalGanado += parseFloat(dolaresGanados); // Sumar la cantidad al total ganado
            burbuja.remove(); // Quitar la burbuja del contenedor
        });

        // Añadir la burbuja al contenedor
        contenedorBurbujas.appendChild(burbuja);
        burbujas.push(burbuja);
    }

    // Añadir el contenedor de burbujas al cuerpo del documento
    chatLog.appendChild(contenedorBurbujas);

    // Temporizador para finalizar la lluvia de burbujas
    setTimeout(() => {
        // Eliminar todas las burbujas restantes
        burbujas.forEach(burbuja => burbuja.remove());

        // Mostrar el total ganado
        typeMessage(`🎉 ¡Has ganado un total de $${totalGanado.toFixed(2)} Dólares de Animal!`);

        // Sumar el total ganado al saldo actual
        dolaresAnimal += totalGanado;
        typeMessage(`✅ Tu nuevo saldo es: $${dolaresAnimal.toFixed(2)} Dólares de Animal.`);
        mostrarMonedas();
        // Quitar el contenedor de burbujas
        contenedorBurbujas.remove();
    }, 15000); // 15 segundos para la lluvia de burbujas
}

function crearPeticionWhatsApp() {
    // Crear el formulario para ingresar la petición
    chatLog.innerHTML = ''; // Limpiar chatLog antes de agregar el formulario
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    formContainer.innerHTML = `
        <h2>Enviar Petición por WhatsApp</h2>
        <input type="text" id="peticion" placeholder="Escribe tu petición" required>
        <button id="enviarPeticionBtn">Enviar Petición</button>
    `;
    chatLog.appendChild(formContainer);

    // Añadir evento para enviar la petición
    document.getElementById('enviarPeticionBtn').addEventListener('click', enviarPeticionWhatsApp);
}

function enviarPeticionWhatsApp() {
    const peticion = document.getElementById('peticion').value;

    if (!peticion) {
        alert('Por favor, escribe tu petición antes de enviar.');
        return;
    }

    // Número de destino (código internacional incluido)
    const numeroDestino = '598099685536'; // Cambia esto al número que desees
    // Crear un enlace para abrir WhatsApp
    const mensaje = encodeURIComponent(`Petición: ${peticion}`);
    const enlaceWhatsApp = `https://wa.me/${numeroDestino}?text=${mensaje}`;

    // Abrir WhatsApp
    window.open(enlaceWhatsApp);

    typeMessage('Tu peticion se enviara al destinatario definido y el destinatario te respondera entre 1 hora y 3 dias, mas si es que hay peticiones antes que la tuya.');
    typeMessage('Es posible que tu peticion sea rechazada o aprobada, dependiendo de varios factores que el destinatario te preguntara o revisara tu peticion y vera si es que se puede hacer, si es aprobada, tu peticion se convertira en una tarea que deberia estar completa para la proxima actualizacion, esa tarea (antes, tu peticion) sera parte de la proxima actualizacion y pueden ser, nuevas funcionalidades, nuevos comandos etc. Siempre y cuando, el equipo de Animal AI este al alcance de realizarlo.');
}




// Lista de comandos con su estado de despertado
const awkCommands = [
    { name: 'proximo-comando', isAwakened: true },
];

// Cargar comandos en el contenedor awk-list
const awkList = document.getElementById('awk-list');

awkCommands.forEach(command => {
    const listItem = document.createElement('li');
    listItem.innerText = `${command.name} - ${command.isAwakened ? 'Despertado' : 'No Despertado'}`;
    
    // Aplicar clases para los estilos según el estado
    if (command.isAwakened) {
        listItem.classList.add('despertado'); // Añadir clase para comandos despertados
    } else {
        listItem.classList.add('no-despertado'); // Añadir clase para comandos no despertados
    }

    // Personalización adicional (si es necesario)
    listItem.style.position = 'relative'; // Para asegurar el posicionamiento de pseudo-elementos

    awkList.appendChild(listItem);
});


// Lista de comandos con sus rarezas
const comandosConRarezas = [
    { nombre: "/localizador", rareza: "Poco Común" },
    { nombre: "/saldo", rareza: "Común" },
    { nombre: "/salvador-de-animales", rareza: "Raro" },
    { nombre: "/fobias", rareza: "Épico" },
    { nombre: "/eventos", rareza: "Legendario" },
    { nombre: "/crear-cuenta-o-iniciar-sesion", rareza: "Raro" },
    { nombre: "/desastres-naturales", rareza: "Legendario" },
    { nombre: "/desactivar-localizador", rareza: "Común" },
    { nombre: "/reto-de-pistas", rareza: "Mítico" },
    { nombre: "/actualizaciones", rareza: "Poco Común" },
    { nombre: "/last-update", rareza: "Mítico" },
    { nombre: "/resaltar-texto-infoanimalai", rareza: "Común" },
    { nombre: "/paquete-de-cartas", rareza: "Poco Común" },
    { nombre: "/caza-megalodon", rareza: "Raro" },
    { nombre: "/refugio-animales", rareza: "Épico" },
    { nombre: "/mejorar-refugio", rareza: "Legendario" },
    { nombre: "/eventos-mundiales", rareza: "Épico" },
    { nombre: "/card-ship", rareza: "Épico" },
    { nombre: "/salvar-a-la-naturaleza", rareza: "Raro" },
    { nombre: "/movie-playtime", rareza: "Raro" },
    { nombre: "/enfrentamientos", rareza: "Común" },
    { nombre: "/t-rex-friend", rareza: "Épico" },
    { nombre: "/explora-biomas", rareza: "Poco Común" },
    { nombre: "/conservacion", rareza: "Raro" },
    { nombre: "/fenomenos-espaciales", rareza: "Raro" },
    { nombre: "/supervivencia", rareza: "Raro" },
    { nombre: "/lineas", rareza: "Raro" },
    { nombre: "/generar-blog", rareza: "Raro" },
    { nombre: "/PPOT", rareza: "Común" },
    { nombre: "/limpieza", rareza: "Raro" },
    { nombre: "/update", rareza: "Raro" },
    { nombre: "/proximo-comando", rareza: "Raro" },
    { nombre: "/verificacion-final", rareza: "Raro" },
    { nombre: "/pase-de-temporada", rareza: "Raro" },
    { nombre: "/comandos-existentes", rareza: "Raro" },
    { nombre: "/resumir-texto", rareza: "Común" },
    { nombre: "/gatitos", rareza: "Raro" },
    { nombre: "/reproductor-de-musica", rareza: "Raro" },
    { nombre: "/animal-random", rareza: "Raro" },
    { nombre: "/intercambio-de-moneda", rareza: "Raro" },
    { nombre: "/sombra-asesina", rareza: "Raro" },
    { nombre: "/comprar-moneda", rareza: "Poco Común" },
    { nombre: "/generar-codigo", rareza: "Común" },
    { nombre: "/generar-imagenes", rareza: "Mítico" },
    { nombre: "/configuracion", rareza: "Raro" },
    { nombre: "/acceder", rareza: "Común" },
    { nombre: "/unirse", rareza: "Común" },
    { nombre: "/usuarios", rareza: "Común" },
    { nombre: "/boss-battle", rareza: "Raro" },
    { nombre: "/definiciones", rareza: "Raro" },
    { nombre: "/frases-motivacionales", rareza: "Poco Común" },
    { nombre: "/quiz-animal", rareza: "Común" },
    { nombre: "/leyenda-mitica", rareza: "Común" },
    { nombre: "/recompensa-diaria/semanal", rareza: "Raro" },
    { nombre: "/patch-notes", rareza: "Raro" },
    { nombre: "/tienda", rareza: "Raro" },
    { nombre: "/proximo-lanzamiento", rareza: "Raro" },
    { nombre: "/ultimo-lanzamiento", rareza: "Raro" },
    { nombre: "/ver-documentacion", rareza: "Raro" },
    { nombre: "/texto-advertencia", rareza: "Raro" },
    { nombre: "/enviar-peticion", rareza: "Raro" },
    { nombre: "/ADN", rareza: "Legendario" },
    { nombre: "/seleccionar-modelo", rareza: "Común" },
    { nombre: "/chequeo-medico", rareza: "Épico" },
    { nombre: "/lluvia-de-dolares", rareza: "Mítico" },
    { nombre: "/intercambiar-adn", rareza: "Raro" },
    { nombre: "/ataque-fantasma", rareza: "Legendario" },
    { nombre: "/animal-ai-research", rareza: "Épico" },
    { nombre: "/notificaciones", rareza: "Común" },
    { nombre: "/Cria-Calabazas", rareza: "Legendario" },
    { nombre: "/Ectoplasma", rareza: "Raro" },
    { nombre: "/Calabazas", rareza: "Raro" },
    { nombre: "/Dulces", rareza: "Raro" },
    { nombre: "/intercambiar-dulces", rareza: "Épico" },
    { nombre: "/intercambiar-calabazas", rareza: "Épico" },
    { nombre: "/intercambiar-ectoplasma", rareza: "Épico" },
    { nombre: "/caceria-de-dulces", rareza: "Legendario" },
    { nombre: "/minijuegos", rareza: "Común" },
    { nombre: "/crear-comandos", rareza: "Poco Común" },
];


// Colores por rareza
const coloresRarezas = {
    'Común': '#4CAF50',         // Verde
    'Poco Común': '#2196F3',    // Azul
    'Raro': '#9C27B0',          // Púrpura
    'Épico': '#FF9800',         // Naranja
    'Legendario': '#FFC107',    // Amarillo
    'Mítico': 'red'         // Rojo
};

// Función para contar cuántos comandos hay por rareza
function contarComandosPorRareza() {
    const conteo = {
        'Común': 0,
        'Poco Común': 0,
        'Raro': 0,
        'Épico': 0,
        'Legendario': 0,
        'Mítico': 0
    };

    comandosConRarezas.forEach(comando => {
        conteo[comando.rareza]++;
    });

    return conteo;
}

// Crear los elementos dinámicamente
function crearListaRarezas() {
    const contenedor = document.getElementById('rarity-list-container');

    const conteo = contarComandosPorRareza();

    // Crear un título
    const titulo = document.createElement('h3');
    titulo.textContent = 'Rarezas de Comandos';
    contenedor.appendChild(titulo);

    // Crear una lista para cada rareza
    Object.keys(conteo).forEach(rareza => {
        // Crear contenedor para cada rareza
        const rarezaDiv = document.createElement('div');
        rarezaDiv.style.color = coloresRarezas[rareza];
        rarezaDiv.style.marginBottom = '10px';
        
        // Crear título para la rareza y el conteo
        const rarezaTitulo = document.createElement('h4');
        rarezaTitulo.textContent = `${rareza} (${conteo[rareza]} comandos)`;
        rarezaDiv.appendChild(rarezaTitulo);

        // Crear lista de comandos para cada rareza
        const listaComandos = document.createElement('ul');
        comandosConRarezas.forEach(comando => {
            if (comando.rareza === rareza) {
                const item = document.createElement('li');
                item.textContent = comando.nombre;
                listaComandos.appendChild(item);
            }
        });

        rarezaDiv.appendChild(listaComandos);
        contenedor.appendChild(rarezaDiv);
    });
}

// Llamar a la función al cargar el script
crearListaRarezas();

function setupInstalacionDocumentacion() {  
    console.log("DOM completamente cargado");

    // Crear botón para redireccionar a la documentación
    const verDocumentacionBtn = document.createElement('button');
    verDocumentacionBtn.textContent = 'Ver Documentación';
    verDocumentacionBtn.classList.add('btn');
    chatLog.appendChild(verDocumentacionBtn);

    // Agregar evento de clic para redireccionar a la página de documentación
    verDocumentacionBtn.addEventListener('click', () => {
        window.open('https://www.animalai.com/documentacion', '_blank');  // Enlace a la documentación
    });

    console.log("Botón de ver documentación creado");
}


function iniciarApp2() {
    // Crear el modal para activar el soporte móvil
    const modal = document.createElement('div');
    modal.classList.add('modal-movil');

    // Crear el contenedor del modal
    const contenedor = document.createElement('div');
    contenedor.classList.add('modal-contenido');

    // Título h1
    const titulo = document.createElement('h1');
    titulo.textContent = "¿Quieres Activar el Soporte para Móvil?";
    titulo.style.fontSize = "2em"; // Ajustar el tamaño de letra

    // Texto para usuarios con problemas de visión
    const textoAccesible = document.createElement('h3');
    textoAccesible.textContent = "Se recomienda si es que estás usando la app en Móvil";
    textoAccesible.style.fontSize = "1.5em"; // Ajustar el tamaño de letra

    // Botón grande para activar el soporte móvil
    const botonActivar = document.createElement('button');
    botonActivar.textContent = "ACTIVAR!";
    botonActivar.classList.add('btn-activar-movil');
    botonActivar.style.fontSize = "2em"; // Hacer el texto del botón grande
    botonActivar.style.padding = "15px 30px"; // Agrandar el botón

    // Función para activar el soporte móvil
    botonActivar.addEventListener('click', function () {
        activarSoporteMovil(); // Llamar la función que adapta la app para móvil
        modal.remove(); // Cerrar el modal
    });

    // Agregar elementos al contenedor del modal
    contenedor.appendChild(titulo);
    contenedor.appendChild(textoAccesible);
    contenedor.appendChild(botonActivar);

    // Agregar el contenedor al modal
    modal.appendChild(contenedor);

    // Agregar el modal al body
    document.body.appendChild(modal);
}

// Función que adapta la app al entorno móvil
function activarSoporteMovil() {
    // Aquí puedes agregar las clases o cambiar estilos para adaptar la app a móvil
    document.body.classList.add('soporte-movil'); // Por ejemplo, agregar una clase al body
    console.log("Soporte para móvil activado.");

    // Otros ajustes para la adaptación móvil
    // Podrías agregar más ajustes como cambiar fuentes, tamaños, layout, etc.
    ajustarEstilosParaMovil();
}

// Función que ajusta los estilos específicos para móviles
function ajustarEstilosParaMovil() {
    const styles = document.createElement('style');
    styles.innerHTML = `
        body.soporte-movil {
            font-size: 1.2em;
            padding: 10px;
        }
        
        .container {
            max-width: 100%;
            margin: 0 auto;
            padding: 10px;
        }

        /* Ejemplo de hacer botones más grandes y textos más legibles en móvil */
        button, .btn {
            font-size: 1.5em;
            padding: 15px;
        }

        /* Otros ajustes responsivos para pantallas pequeñas */
        @media (max-width: 768px) {
            .container {
                padding: 5px;
            }

            h1, h2, h3 {
                font-size: 1.8em;
            }

            /* Ajustar los tamaños de las entradas de texto */
            input, textarea {
                font-size: 1.2em;
            }
        }
            /* Ajustes generales para móviles */
@media (max-width: 768px) {
    #splash-screen {
        padding: 20px;
        text-align: center;
    }

    .splash-content {
        padding: 20px;
        margin: 0 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .splash-item img {
        width: 60px; /* Reducir el tamaño del logo para móviles */
        margin-right: 10px;
    }

    .splash-item h1, .splash-item h2, .splash-item h3 {
        font-size: 1.2rem;
    }

    #chat-container {
        width: 100%;
        height: 75vh;
        padding: 10px;
        margin: 0;
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), inset 0 3px 10px rgba(255, 255, 255, 0.1);
    }

    #chat-header {
        font-size: 20px;
        padding: 10px;
    }

    #chat-log {
        padding: 15px;
        font-size: 14px; /* Reducimos el tamaño del texto */
        line-height: 1.4;
    }

    #chat-log div {
        padding: 10px;
        font-size: 14px;
    }

    #list-container {
        flex-direction: column; /* Apilar las listas en móviles */
        gap: 15px; /* Espaciado entre listas */
    }

    #command-list-container, #rarity-list-container {
        width: 100%; /* Ajustar listas al 100% del ancho en móviles */
        padding: 15px;
    }
}

@media (max-width: 480px) {
    #splash-screen {
        padding: 15px;
    }

    .splash-content {
        padding: 15px;
        border-radius: 10px;
    }

    .splash-item img {
        width: 50px; /* Más pequeño aún en pantallas muy pequeñas */
        margin-right: 8px;
    }

    .splash-item h1, .splash-item h2, .splash-item h3 {
        font-size: 1rem;
    }

    #chat-container {
        height: 10vh;
        padding: 5px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), inset 0 2px 5px rgba(255, 255, 255, 0.05);
    }

    #chat-header {
        font-size: 18px;
    }

    #chat-log {
        padding: 25px;
        font-size: 13px;
        line-height: 1.3;
    }

    #chat-log div {
        padding: 8px;
        font-size: 13px;
    }

    #list-container {
        gap: 10px;
    }

    #command-list-container, #rarity-list-container {
        padding: 10px;
    }
}

/* Estilo base */

/* Estilo para los mensajes del usuario y del bot */
.user-message, .bot-message {
    display: inline-block;
    max-width: 80%;
    margin: 5px 0;
    padding: 10px;
    border-radius: 15px;
    color: #fff;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.4;
}

.user-message {
    background-color: #007bff;
    align-self: flex-end;
    text-align: right;
}

.bot-message {
    background-color: #333;
    align-self: flex-start;
    text-align: left;
}

/* Estilos mejorados para los contenedores de entrada */
#input-container {
    display: flex;
    padding: 15px;
    background-color: #2c3037;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilo para los campos de entrada de texto */
#chat-input,
#cmd-input {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    margin-right: 10px;
    background-color: #444;
    color: #fff;
    font-size: 16px;
    transition: background-color 0.3s;
}

/* Efecto focus para los campos de entrada */
#chat-input:focus,
#cmd-input:focus {
    outline: none;
    background-color: #555;
}

/* Estilo para el botón de enviar */
#send-button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.3s, transform 0.2s;
}

#send-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

#send-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.4);
}

/* Estilo para el título */
#command-list-container h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 20px;
    font-weight: 600;
}

/* Estilo para la lista de comandos */
#command-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

/* Estilo para cada elemento de la lista */
#command-list li {
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #f7f7f7;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s, transform 0.2s;
}

/* Efecto hover para los elementos de la lista */
#command-list li:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
}

/* Adaptación para móviles */
@media (max-width: 600px) {

    /* Ajustes generales */
    .user-message, .bot-message {
        max-width: 100%; /* Ocupa todo el ancho */
        font-size: 12px; /* Reducir tamaño de fuente */
        padding: 8px; /* Menor padding */
    }

    #input-container {
        flex-direction: column; /* Alinear campos verticalmente */
        padding: 10px; /* Menor padding */
    }

    #chat-input,
    #cmd-input {
        margin-right: 0; /* Quitar margen lateral */
        margin-bottom: 10px; /* Espacio entre campos en móviles */
        padding: 10px; /* Ajustar padding */
        font-size: 14px; /* Reducir tamaño de fuente */
    }

    #send-button {
        padding: 10px 20px; /* Reducir tamaño del botón */
        font-size: 14px; /* Reducir tamaño de fuente */
    }

    /* Ajustes para la lista de comandos */
    #command-list li {
        padding: 10px;
        font-size: 14px; /* Reducir tamaño de fuente */
    }

    #command-list-container h3 {
        font-size: 18px; /* Ajustar tamaño de título */
    }
}

    `;
    document.head.appendChild(styles);
}


function abrirModalPosts() {
    // Crear el modal y su contenedor
    const modal = document.createElement('div');
    modal.classList.add('modal-posts');

    // Botón de crear post
    const botonCrearPost = document.createElement('button');
    botonCrearPost.textContent = 'Crear Post';
    botonCrearPost.classList.add('crear-post-btn');

    // Contenedor de los posts creados
    const contenedorPosts = document.createElement('div');
    contenedorPosts.classList.add('posts-container');

    // Evento del botón crear post
    botonCrearPost.addEventListener('click', function () {
        // Crear el formulario para el post
        const formulario = document.createElement('form');
        formulario.classList.add('crear-post-form');

        // Input del título
        const inputTitulo = document.createElement('input');
        inputTitulo.setAttribute('type', 'text');
        inputTitulo.setAttribute('placeholder', 'Título del post');
        inputTitulo.required = true;

        // Input del mensaje
        const inputMensaje = document.createElement('textarea');
        inputMensaje.setAttribute('placeholder', 'Escribe tu mensaje');
        inputMensaje.required = true;

        // Botón para enviar el post
        const botonEnviar = document.createElement('button');
        botonEnviar.textContent = 'Enviar Post';
        botonEnviar.classList.add('enviar-post-btn');

        // Botón para cancelar
        const botonCancelar = document.createElement('button');
        botonCancelar.textContent = 'Cancelar';
        botonCancelar.classList.add('cancelar-post-btn');

        // Función para cancelar el formulario
        botonCancelar.addEventListener('click', function () {
            formulario.remove(); // Elimina el formulario si se cancela
        });

        // Función para enviar el post
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();

            const titulo = inputTitulo.value.trim();
            const mensaje = inputMensaje.value.trim();

            if (titulo && mensaje) {
                // Crear el post con título, mensaje y fecha de creación
                const post = document.createElement('div');
                post.classList.add('post');

                const postTitulo = document.createElement('h3');
                postTitulo.textContent = titulo;

                const postMensaje = document.createElement('p');
                postMensaje.textContent = mensaje;

                const fechaCreacion = new Date();
                const postFecha = document.createElement('small');
                postFecha.textContent = `Creado el: ${fechaCreacion.toLocaleString()}`;

                // Agregar título, mensaje y fecha al post
                post.appendChild(postTitulo);
                post.appendChild(postMensaje);
                post.appendChild(postFecha);

                // Agregar el post al contenedor de posts
                contenedorPosts.appendChild(post);

                // Limpiar el formulario y eliminarlo después de enviar
                formulario.reset();
                formulario.remove();
            }
        });

        // Agregar elementos al formulario
        formulario.appendChild(inputTitulo);
        formulario.appendChild(inputMensaje);
        formulario.appendChild(botonEnviar);
        formulario.appendChild(botonCancelar);

        // Agregar el formulario al modal
        modal.appendChild(formulario);
    });

    // Agregar los elementos al modal
    modal.appendChild(botonCrearPost);
    modal.appendChild(contenedorPosts);

    // Agregar el modal al body o chatLog
    chatLog.appendChild(modal);
}



function abrirModalNotificarPost() {
    // Crear el modal y su contenedor
    const modal = document.createElement('div');
    modal.classList.add('modal-notificar-post');

    // Crear el formulario de notificación
    const formulario = document.createElement('form');
    formulario.classList.add('notificar-post-form');

    // Campo para el número de teléfono
    const inputTelefono = document.createElement('input');
    inputTelefono.setAttribute('type', 'text');
    inputTelefono.setAttribute('placeholder', 'Número de Teléfono');
    inputTelefono.required = true;

    // Campo para el mensaje
    const inputMensaje = document.createElement('textarea');
    inputMensaje.setAttribute('placeholder', 'Mensaje');
    inputMensaje.required = true;

    // Botón de enviar
    const botonEnviar = document.createElement('button');
    botonEnviar.textContent = "Enviar Notificación";
    botonEnviar.classList.add('enviar-notificacion-btn');

    // Agregar campos y botones al formulario
    formulario.appendChild(inputTelefono);
    formulario.appendChild(inputMensaje);
    formulario.appendChild(botonEnviar);

    // Agregar el formulario al modal
    modal.appendChild(formulario);

    // Agregar el modal al body o chatLog
    chatLog.appendChild(modal);

    // Acción del botón enviar
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const numeroTelefono = inputTelefono.value.trim();
        const mensaje = encodeURIComponent(inputMensaje.value.trim());

        // Verifica que el número de teléfono sea válido
        if (!numeroTelefono) {
            alert('Por favor, ingrese un número de teléfono válido.');
            return;
        }

        // Redireccionar a WhatsApp
        const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${mensaje}`;
        window.open(whatsappUrl, '_blank');

        // Limpiar el formulario después de enviar
        formulario.reset();
    });
}





function crearCuentaHaciaAdelante() {
    // Crear elementos dinámicos
    const contenedor = document.createElement('div');
    contenedor.classList.add('countup-container');

    // Crear el título del comando (h1)
    const comandoTitulo = document.createElement('h1');
    comandoTitulo.textContent = "/ultimo-lanzamiento"; // El nombre del comando
    comandoTitulo.classList.add('comando-titulo');
    contenedor.appendChild(comandoTitulo);

    // Crear el subtítulo (h2)
    const titulo = document.createElement('h2');
    titulo.textContent = "Último Lanzamiento";
    contenedor.appendChild(titulo);

    // Crear el contenedor de la cuenta adelante
    const countup = document.createElement('div');
    countup.classList.add('countup');

    const timeSections = ['days', 'hours', 'minutes', 'seconds'];
    const timeLabels = ['Días', 'Horas', 'Minutos', 'Segundos'];

    timeSections.forEach((section, index) => {
        const timeSection = document.createElement('div');
        timeSection.classList.add('time-section');

        const timeValue = document.createElement('span');
        timeValue.id = section;
        timeValue.textContent = "00"; // Valores iniciales

        const timeLabel = document.createElement('p');
        timeLabel.textContent = timeLabels[index];

        timeSection.appendChild(timeValue);
        timeSection.appendChild(timeLabel);
        countup.appendChild(timeSection);
    });

    contenedor.appendChild(countup);

    // Crear la fecha exacta del último lanzamiento
    const launchDateText = document.createElement('p');
    launchDateText.classList.add('launch-date');
    launchDateText.innerHTML = 'Fecha del último lanzamiento: <span id="launch-date"></span>';
    contenedor.appendChild(launchDateText);

    // Agregar el contenedor al body o al chatLog
    chatLog.appendChild(contenedor);

    // Iniciar la lógica de la cuenta hacia adelante
    iniciarCuentaHaciaAdelante();
}

function iniciarCuentaHaciaAdelante() {
    const lanzamiento = new Date("October 10, 2024 12:00:00").getTime();
    document.getElementById('launch-date').textContent = new Date(lanzamiento).toLocaleString();

    const interval = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = ahora - lanzamiento; // Cambiamos para contar hacia adelante

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = dias < 10 ? `0${dias}` : dias;
        document.getElementById("hours").textContent = horas < 10 ? `0${horas}` : horas;
        document.getElementById("minutes").textContent = minutos < 10 ? `0${minutos}` : minutos;
        document.getElementById("seconds").textContent = segundos < 10 ? `0${segundos}` : segundos;

    }, 1000);
}


// Función para crear la cuenta regresiva y el botón para ejecutar el comando
function crearCuentaRegresiva() {
    // Crear elementos dinámicos
    const contenedor = document.createElement('div');
    contenedor.classList.add('countdown-container');

    // Crear el título del comando (h1)
    const comandoTitulo = document.createElement('h1');
    comandoTitulo.textContent = "/minijuegos"; // El nombre del comando
    comandoTitulo.classList.add('comando-titulo');
    contenedor.appendChild(comandoTitulo);

    // Crear el subtítulo (h2)
    const titulo = document.createElement('h2');
    titulo.textContent = "Próximo Lanzamiento";
    contenedor.appendChild(titulo);

    // Crear el contenedor de la cuenta regresiva
    const countdown = document.createElement('div');
    countdown.classList.add('countdown');

    const timeSections = ['days', 'hours', 'minutes', 'seconds'];
    const timeLabels = ['Días', 'Horas', 'Minutos', 'Segundos'];

    timeSections.forEach((section, index) => {
        const timeSection = document.createElement('div');
        timeSection.classList.add('time-section');

        const timeValue = document.createElement('span');
        timeValue.id = section;
        timeValue.textContent = "00"; // Valores iniciales

        const timeLabel = document.createElement('p');
        timeLabel.textContent = timeLabels[index];

        timeSection.appendChild(timeValue);
        timeSection.appendChild(timeLabel);
        countdown.appendChild(timeSection);
    });

    contenedor.appendChild(countdown);

    // Crear la fecha de lanzamiento
    const launchDateText = document.createElement('p');
    launchDateText.classList.add('launch-date');
    launchDateText.innerHTML = 'Fecha de lanzamiento: <span id="launch-date"></span>';
    contenedor.appendChild(launchDateText);

    // Crear el botón para ejecutar el comando
    const ejecutarComandoBtn = document.createElement('button');
    ejecutarComandoBtn.textContent = 'El comando no ha sido lanzado aún';
    ejecutarComandoBtn.classList.add('btn-ejecutar-comando');
    ejecutarComandoBtn.disabled = true; // Inicialmente deshabilitado
    contenedor.appendChild(ejecutarComandoBtn);

    // Agregar el contenedor al chatLog
    chatLog.appendChild(contenedor);

    // Iniciar la lógica de la cuenta regresiva
    iniciarCuentaRegresiva(ejecutarComandoBtn);
}

// Función para iniciar la cuenta regresiva
function iniciarCuentaRegresiva(ejecutarComandoBtn) {
    const lanzamiento = new Date("November 3, 2024 12:00:00").getTime();
    document.getElementById('launch-date').textContent = new Date(lanzamiento).toLocaleString();

    const interval = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = lanzamiento - ahora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000); 

        document.getElementById("days").textContent = dias < 10 ? `0${dias}` : dias;
        document.getElementById("hours").textContent = horas < 10 ? `0${horas}` : horas;
        document.getElementById("minutes").textContent = minutos < 10 ? `0${minutos}` : minutos;
        document.getElementById("seconds").textContent = segundos < 10 ? `0${segundos}` : segundos;

        // Verificar si la cuenta regresiva ha terminado
        if (distancia < 0) {
            clearInterval(interval);
            document.querySelector(".countdown").innerHTML = "<p>¡El lanzamiento ha comenzado!</p>";

            // Habilitar el botón al finalizar la cuenta regresiva
            ejecutarComandoBtn.disabled = false;
            ejecutarComandoBtn.textContent = 'Ejecutar Comando /proximo-lanzamiento';
            
            // Añadir el evento para ejecutar el comando cuando se presiona el botón
            ejecutarComandoBtn.addEventListener('click', function() {
                ejecutarComando("/proximo-lanzamiento");  // Llamar al comando con el nombre apropiado
            });
        } else {
            // Si aún no ha llegado el lanzamiento, mostrar el mensaje y deshabilitar el botón
            ejecutarComandoBtn.textContent = 'El comando no ha sido lanzado aún';
            ejecutarComandoBtn.disabled = true;
        }
    }, 1000);
}




function abrirTiendaModal() {
    const modalTienda = document.createElement('div');
    modalTienda.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Título del modal
    const title = document.createElement('h2');
    title.textContent = 'Tienda de AnimalAI';

    // Crear las secciones de la tienda
    const seccionProductos = crearSeccionTienda('Productos y Comandos', [
        { nombre: 'Producto 1', costo: 10, comando: '/comando1' },
        { nombre: 'Producto 2', costo: 15, comando: '/comando2' }
    ]);

    const seccionAccesoAnticipado = crearSeccionTienda('Acceso Anticipado', [
        { nombre: 'Patches', costo: 20, comando: 'patch-notes' }  // Cambié "command" a "comando"
    ]);

    const seccionComprasConDineroReal = crearSeccionTienda('Dinero Real', [
        { nombre: 'Compra de Prueba', costo: 10, comando: 'comando-comun' }  // Cambié "command" a "comando"
    ]);

    // Añadir secciones al modal
    modalContent.appendChild(title);
    modalContent.appendChild(seccionProductos);
    modalContent.appendChild(seccionAccesoAnticipado);
    modalContent.appendChild(seccionComprasConDineroReal);
    // Botón de cierre del modal
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.onclick = function () {
        document.body.removeChild(modalTienda);
    };
    modalContent.appendChild(closeButton);

    modalTienda.appendChild(modalContent);
    document.body.appendChild(modalTienda);

    modalTienda.style.display = 'block';
}

function crearSeccionTienda(tituloSeccion, productos) {
    const section = document.createElement('div');
    section.classList.add('tienda-section');

    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = tituloSeccion;

    section.appendChild(sectionTitle);

    // Crear los productos dentro de la sección
    productos.forEach(producto => {
        const productoContainer = document.createElement('div');
        productoContainer.classList.add('producto');

        const productoNombre = document.createElement('span');
        productoNombre.textContent = `${producto.nombre} - ${producto.costo} Animal Tokens`;

        const botonComprar = document.createElement('button');
        botonComprar.textContent = 'Comprar';
        botonComprar.onclick = function () {
            iniciarCompraProducto(producto.nombre, producto.costo, producto.comando); // Cambié "producto.command" a "producto.comando"
        };

        productoContainer.appendChild(productoNombre);
        productoContainer.appendChild(botonComprar);
        section.appendChild(productoContainer);
    });

    return section;
}


function iniciarCompraProducto(nombreProducto, costo, comando) {
    const saldoActual = dolaresAnimal;
    animalPayTransaction(costo, saldoActual, function(exito) {
        if (exito) {
            ejecutarComando(comando);  // Usar el "comando" aquí
        }
    });
}


// Función para mostrar el menú de pestañas y su contenido
function mostrarMenuDePestanas(version, fecha, contenido) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Menú de pestañas
    const tabMenu = document.createElement('ul');
    tabMenu.classList.add('tab-menu');

    // Secciones
    const secciones = ['Noticias', 'Registro: Última Actualización', 'Detalles'];
    const seccionesContenido = [
        'Aquí se mostrarán las últimas noticias relacionadas con el juego y el desarrollo.',
        `Registro de la actualización - Versión ${version} (${fecha}): ${contenido}`,
        'Detalles específicos sobre los cambios recientes y características agregadas.',
    ];

    // Crear pestañas
    secciones.forEach((seccion, index) => {
        const tab = document.createElement('li');
        tab.textContent = seccion;
        tab.classList.add('tab-item');
        tab.onclick = () => mostrarContenidoSeccion(index, seccionesContenido);
        tabMenu.appendChild(tab);
    });

    // Contenedor del contenido de cada pestaña
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('tab-content-container');
    contentContainer.textContent = seccionesContenido[0]; // Contenido por defecto (Noticias)

    // Botón de cierre
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.classList.add('close-button');
    closeButton.onclick = function () {
        cerrarModal(modal);
    };

    // Añadir elementos al modal
    modalContent.appendChild(tabMenu);
    modalContent.appendChild(contentContainer);
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = 'block';
}

// Función para mostrar el contenido correspondiente a la pestaña seleccionada
function mostrarContenidoSeccion(index, contenidoArray) {
    const contentContainer = document.querySelector('.tab-content-container');
    contentContainer.textContent = contenidoArray[index];
}

// Función para cerrar el modal
function cerrarModal(modal) {
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Ejemplo de uso del comando con menú de pestañas
function ejecutarPatchNotes() {
    const version = 'v1.0.35';
    const fecha = '15 de Octubre, 2024';
    const contenido = `
        ### Notas de Actualización v1.0.4  
**Fecha:** 25/10/2024  

• **Nuevo sistema de instalación de documentación**  
  - Se ha añadido un **Instalador** que permite instalar la documentación de manera más ágil y directa.

• **+28 Comandos Nuevos! 🎉**

• **Rarezas de Comandos**  
  - Se han añadido rarezas a los comandos, una característica que se utilizará en una próxima función.

• **Remodelación de la lista de comandos disponibles**  
  - La lista de comandos ahora está integrada directamente en el contenedor del chat, optimizando el acceso y la visibilidad.

• **Optimización para dispositivos móviles**  
  - Ajustes en la plataforma para mejorar la visualización en dispositivos móviles.

• **Correcciones menores en modales**  
  - Solucionados problemas que impedían la visualización de algunos modales.

• **Mejoras en recompensas de Dólares de Animal**  
  - Ahora, las recompensas son más accesibles para evitar cuentas sin fondos.

• **Nuevos estados de comando**  
  - **De Pago** y **Recompensas Incluidas**, estados que permiten identificar comandos especiales o recompensantes.

• **Mejoras en la estilización de rarezas de comandos**

• **Nuevo sistema de búsqueda de comandos**

• **Implementación de Python para mejoras menores**  
  - Se utilizó Python para optimizaciones de la plataforma.

• **Nuevo sistema de Dominio de Ocean and Wild**  
  - Ahora, puedes ejecutar un comando escribiendo la URL con el dominio \`oceanandwild.com/comando/(comando)\` que lo ejecutará si existe.

• **Actualización en \`/instalar-documentacion\`**  
  - El botón **Instalar Documentación** ha sido reemplazado por **Ver Documentación** en un sitio web externo.

• **Conversión ajustada para Créditos de Fobias**  
  - La conversión ha cambiado de **1000** a **300**.

• **Nueva función: Despertar Comandos**  
  - Un sistema de **Comandos Despertados** estará disponible en una actualización de noviembre.

• **NUEVO: Crea peticiones de funcionalidades o comandos**  
  - Puedes realizar peticiones directamente en **Animal AI** para una próxima actualización.

• **Nuevo evento: Biomas**  
  - Comando: \`/explora-biomas\`.

• **Cambio de "Animal Tokens" a "Dólares de Animal"**

• **Mejora en el comando \`/patch-notes\`**

• **Nuevo comando de Halloween**

• **Nueva lista: Lista de Divisas**

• **Actualización en la lista "Divisas"**  
  - Es posible que **Dólares de Animal** no aparezca en algunos comandos por esta integración, pero se sumará progresivamente en próximas actualizaciones.

• **Nueva funcionalidad de Notificaciones**  
  - Comando \`/notificaciones\` permite recibir notificaciones sin necesidad de servidores adicionales, optimizando recursos.
`;


    mostrarMenuDePestanas(version, fecha, contenido);
}





const listaComandos2 = [
'saldo',
'localizador',
'desactivar-localizador',
'salvador-de-animales',
'fobias',
'eventos',
'reto-de-pistas',
'inventario-de-tarjetas',
'actualizaciones',
'crear-cuenta-o-iniciar-sesion',
'servidor',
'desastres-naturales',
'last-update',
'resaltar-texto-infoanimalai',
'paquete-de-cartas',
'caza-megalodon',
'refugio-animales',
'mejorar-refugio',
'lineas',
'PPOT',
'limpieza',
'update',
'proximo-comando',
'verificacion-final',
'pase-de-temporada',
'comandos-existentes',
'reproductor-de-musica',
'animal-random',
'mantenimiento',
'proximos-comandos',
'intercambiador-de-moneda',
'sombra-asesina',
'configuracion',
'acceder',
'unirse',
'usuarios',
'boss-battle',
'comandos-recomendados',
'generar-imagenes',
'explora-biomas',
't-rex-friend',
'definiciones',
'frases-motivacionales',
'quiz-animal',
'leyenda-mitica',
'recompensa-diaria/semanal',
'patch-notes',
'tienda',
'proximo-lanzamiento',
'ultimo-lanzamiento',
'notificar-nuevopost',
'enviar-post',
'ver-documentacion',
'texto-advertencia',
'enviar-peticion',
'seleccionar-modelo',
'lluvia-de-dolares',
'chequeo-medico',
'ADN',
'intercambiar-adn',
'ataque-fantasma',
'animal-ai-research',
'notificaciones',
'Cria-Calabazas',
'Ectoplasma',
    'Calabazas',
    'Dulces',
    'intercambiar-dulces',
    'intercambiar-calabazas',
    'intercambiar-ectoplasma',
    'caceria-de-dulces',
    'minijuegos',
    'crear-comandos',
];




// Crear el contenedor para el input y el botón
const inputContainer = document.createElement('div');
inputContainer.id = 'input-container';
chatContainer.appendChild(inputContainer); // Ajusta esto según tu estructura

// Crear el h1 para mostrar el resultado
const inputText = document.createElement('h1');
inputText.id = 'resultado-comando';
inputContainer.appendChild(inputText); // Agregar el h1 al contenedor

// Crear el campo de entrada
const comandoInput = document.createElement('input');
comandoInput.type = 'text';
comandoInput.id = 'comando-input';
comandoInput.placeholder = 'Escribe oceanandwild.com/comando/(el comando que quieres) para poder ejecutarlo';

// Crear el botón
const ejecutarComandoBtn = document.createElement('button');
ejecutarComandoBtn.id = 'ejecutar-comando-btn';
ejecutarComandoBtn.innerText = 'Ejecutar Comando';

// Agregar el input y el botón al contenedor
inputContainer.appendChild(comandoInput);
inputContainer.appendChild(ejecutarComandoBtn);


// Estilos en JavaScript (se podrían mover a un archivo CSS externo)
const styles2 = `
    #input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px; /* Espacio superior */
    }

    #comando-input {
        width: 300px; /* Ajusta el ancho como prefieras */
        padding: 10px; /* Espaciado interno */
        border-radius: 5px; /* Bordes redondeados */
        border: 1px solid #ccc; /* Borde tenue */
        margin-bottom: 10px; /* Espaciado inferior */
    }

    #ejecutar-comando-btn {
        padding: 10px 15px; /* Espaciado interno del botón */
        border: none; /* Sin borde */
        border-radius: 5px; /* Bordes redondeados */
        background-color: #007BFF; /* Color de fondo del botón */
        color: white; /* Color del texto del botón */
        cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
    }

    #ejecutar-comando-btn:hover {
        background-color: #0056b3; /* Color más oscuro al pasar el mouse */
    }
`;

// Crear un estilo y agregarlo al head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles2;
document.body.appendChild(styleSheet);

// Función que se ejecuta al hacer clic en el botón
ejecutarComandoBtn.addEventListener('click', function() {
    const input = comandoInput.value.trim();
    if (input.startsWith('oceanandwild.com/comando/')) {
        const comandoBuscado = input.split('/comando/')[1];
        
        console.log(`Buscando el comando: ${comandoBuscado}`);
        
        // Verifica si el comando existe
        if (listaComandos2.includes(comandoBuscado)) {
            console.log(`Ejecutando: ${comandoBuscado}`);
            // Ejecuta el comando correspondiente
            commands[comandoBuscado](); // Llama a la función correspondiente

            // Actualiza el h1 con el resultado
            inputText.innerText = `${input}`;
        } else {
            inputText.innerText = `Error: El comando "${comandoBuscado}" no existe.`;
        }
    } else {
        inputText.innerText = 'Por favor, ingresa una URL válida en el formato "oceanandwild.com/comando/{nombre del comando}".';
    }
});


// Fecha actual en formato de solo día o semana
function obtenerFechaActual(formato) {
    const fecha = new Date();
    if (formato === 'diario') {
        return fecha.toISOString().split('T')[0]; // Fecha solo de día
    } else if (formato === 'semanal') {
        const primeraFechaSemana = new Date(fecha.setDate(fecha.getDate() - fecha.getDay()));
        return primeraFechaSemana.toISOString().split('T')[0]; // Fecha del inicio de la semana
    }
}

let ultimaRecompensaDiaria = null;
let ultimaRecompensaSemanal = null;

// Función para reclamar la recompensa
function reclamarRecompensa(tipo) {
    const hoy = obtenerFechaActual(tipo);
    const tokensDiarios = 50;
    const tokensSemanales = 120;

    if (tipo === 'diaria' && ultimaRecompensaDiaria !== hoy) {
        ultimaRecompensaDiaria = hoy;
        dolaresAnimal += tokensDiarios;
        return `¡Recompensa diaria reclamada! 🎁 Has recibido ${tokensDiarios} Dolares de Animal. Ahora tienes ${dolaresAnimal.toFixed(2)} Dolares de Animal.`;
    } else if (tipo === 'semanal' && ultimaRecompensaSemanal !== hoy) {
        ultimaRecompensaSemanal = hoy;
        dolaresAnimal += tokensSemanales;
        return `¡Recompensa semanal reclamada! 🎁 Has recibido ${tokensSemanales} Dolares de Animal. Ahora tienes ${dolaresAnimal.toFixed(2)} Dolares de Animal.`;
    } else {
        return `Ya has reclamado tu recompensa ${tipo}. ¡Vuelve más tarde!`;
    }
}

// Función para manejar el comando de recompensa y generar los botones
function handleRecompensaCommand() {
    // Crear el botón para la recompensa diaria
    const buttonDiaria = document.createElement('button');
    buttonDiaria.textContent = 'Reclamar Recompensa Diaria';
    buttonDiaria.onclick = function() {
        const resultado = reclamarRecompensa('diaria');
        typeMessage(resultado); // Mostrar el mensaje al jugador
    };

    // Crear el botón para la recompensa semanal
    const buttonSemanal = document.createElement('button');
    buttonSemanal.textContent = 'Reclamar Recompensa Semanal';
    buttonSemanal.onclick = function() {
        const resultado = reclamarRecompensa('semanal');
        typeMessage(resultado); // Mostrar el mensaje al jugador
    };

    typeMessage('Selecciona una opción para reclamar tu recompensa:');
    chatLog.appendChild(buttonDiaria); // Añadir botón diario al documento
    chatLog.appendChild(buttonSemanal); // Añadir botón semanal al documento
}


const quizPreguntas = [
    {
        pregunta: "¿Cuál es el mamífero más grande del mundo?",
        opciones: ["Elefante africano", "Ballena azul", "Jirafa", "Hipopótamo"],
        respuestaCorrecta: "Ballena azul"
    },
    {
        pregunta: "¿Qué animal es conocido por su capacidad de cambiar de color?",
        opciones: ["Camaleón", "Pollo", "Perro", "Gato"],
        respuestaCorrecta: "Camaleón"
    },
    {
        pregunta: "¿Cuál es el ave más rápida del mundo?",
        opciones: ["Águila", "Halcón peregrino", "Gorrión", "Pingüino"],
        respuestaCorrecta: "Halcón peregrino"
    },
    // Añade más preguntas según sea necesario
];

// Comando para iniciar el quiz de animales
function handleQuizAnimal() {
    typeMessage("¡Bienvenido al Quiz de Animales! Responde la siguiente pregunta:");

    // Seleccionar una pregunta aleatoria
    const preguntaSeleccionada = quizPreguntas[Math.floor(Math.random() * quizPreguntas.length)];

    // Mostrar la pregunta
    typeMessage(`Pregunta: ${preguntaSeleccionada.pregunta}`);

    // Crear botones para las opciones de respuesta
    const opcionesContainer = document.createElement('div');
    opcionesContainer.className = 'opciones-container';

    preguntaSeleccionada.opciones.forEach(opcion => {
        const botonOpcion = document.createElement('button');
        botonOpcion.textContent = opcion;
        botonOpcion.classList.add('btn-opcion');
        botonOpcion.onclick = () => evaluarRespuesta(preguntaSeleccionada, opcion, opcionesContainer);
        opcionesContainer.appendChild(botonOpcion);
    });

    chatLog.appendChild(opcionesContainer);
}

// Función para evaluar la respuesta del usuario
function evaluarRespuesta(pregunta, respuestaUsuario, container) {
    // Deshabilitar todos los botones de opciones
    const botones = container.querySelectorAll('button');
    botones.forEach(boton => boton.disabled = true);

    if (respuestaUsuario === pregunta.respuestaCorrecta) {
        typeMessage("✅ ¡Respuesta correcta!");
        // Otorgar Animal Tokens
        const tokensGanados = 10; // Puedes ajustar la cantidad
        dolaresAnimal += tokensGanados;
        typeMessage(`¡Has ganado ${dolaresAnimal.toFixed(2)} Dolares de Animal! Tu saldo actual es: ${dolaresAnimal.toFixed(2)}`);
    } else {
        typeMessage(`❌ Respuesta incorrecta. La respuesta correcta es: "${pregunta.respuestaCorrecta}".`);
    }

    // Opcional: Ofrecer otra pregunta
    setTimeout(() => {
        typeMessage("¿Te gustaría responder otra pregunta?");
        const btnSi = document.createElement('button');
        btnSi.textContent = 'Sí';
        btnSi.classList.add('btn-sim');
        btnSi.onclick = () => {
            chatLog.removeChild(container);
            handleQuizAnimal();
        };

        const btnNo = document.createElement('button');
        btnNo.textContent = 'No';
        btnNo.classList.add('btn-no');
        btnNo.onclick = () => {
            chatLog.removeChild(container);
            typeMessage("¡Gracias por participar en el Quiz de Animales! 🦁🐘🐧");
        };

        chatLog.appendChild(btnSi);
        chatLog.appendChild(btnNo);
    }, 1000);
}

const leyendasMiticas = [
    {
        titulo: "El Guardián del Bosque",
        narracion: "Hace mucho tiempo, en el corazón de un antiguo bosque, vivía un majestuoso lobo con ojos de zafiro. Este lobo protegía a todas las criaturas del bosque de cualquier peligro. Se decía que quien lograra ganarse su confianza recibiría su bendición y protección eterna."
    },
    {
        titulo: "La Serpiente de la Luna",
        narracion: "En las noches más oscuras, una serpiente luminosa emerge de los ríos para bailar bajo la luz de la luna. Su baile es tan hermoso que atrae a todos los viajeros perdidos, guiándolos hacia el camino correcto o llevándolos a un lugar mágico donde sus deseos se cumplen."
    },
    {
        titulo: "El Fénix de las Montañas",
        narracion: "En las cumbres más altas, resplandece el fénix que renace de sus propias cenizas. Cada vez que el fénix renace, trae consigo nuevas esperanzas y renovadas fuerzas a quienes viven en las montañas, simbolizando la eternidad y la renovación."
    },
    // Añade más leyendas según sea necesario
];

// Comando para mostrar una leyenda mítica
function handleLeyendaMitica() {
    typeMessage("Aquí tienes una leyenda mítica para disfrutar:");

    // Seleccionar una leyenda aleatoria
    const leyendaSeleccionada = leyendasMiticas[Math.floor(Math.random() * leyendasMiticas.length)];

    // Mostrar la leyenda
    typeMessage(`📖 **${leyendaSeleccionada.titulo}**`);
    typeMessage(`${leyendaSeleccionada.narracion}`);

    // Opcional: Incluir una imagen relacionada (si tienes una URL)
    /*
    const imgLeyenda = document.createElement('img');
    imgLeyenda.src = 'URL_DE_LA_IMAGEN'; // Reemplaza con la URL de la imagen
    imgLeyenda.alt = leyendaSeleccionada.titulo;
    imgLeyenda.style.width = '300px';
    imgLeyenda.style.borderRadius = '10px';
    chatLog.appendChild(imgLeyenda);
    */

    // Opcional: Ofrecer otra leyenda
    setTimeout(() => {
        typeMessage("¿Te gustaría escuchar otra leyenda mítica?");
        const btnSi = document.createElement('button');
        btnSi.textContent = 'Sí';
        btnSi.classList.add('btn-sim');
        btnSi.onclick = () => handleLeyendaMitica();

        const btnNo = document.createElement('button');
        btnNo.textContent = 'No';
        btnNo.classList.add('btn-no');
        btnNo.onclick = () => typeMessage("¡Espero que hayas disfrutado la leyenda! 🌟");

        chatLog.appendChild(btnSi);
        chatLog.appendChild(btnNo);
    }, 2000);
}


const frasesMotivacionales = [
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.",
    "El único modo de hacer un gran trabajo es amar lo que haces.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "La única manera de hacer algo increíble es creer que puedes.",
    "Las grandes cosas nunca vienen de zonas de confort.",
    "El fracaso es el camino al éxito. Sigue adelante.",
    "Cada día es una nueva oportunidad para cambiar tu vida.",
    "Si puedes soñarlo, puedes hacerlo.",
    "La persistencia es el secreto del éxito.",
    "Los desafíos son lo que hacen la vida interesante. Superarlos es lo que la hace significativa."
];

// Función para manejar el comando /frase-motivacional
function handleFraseMotivacional() {
    // Elegir una frase aleatoria del array
    const fraseAleatoria = frasesMotivacionales[Math.floor(Math.random() * frasesMotivacionales.length)];
    
    // Mostrar la frase al usuario
    typeMessage(`✨ Frase motivacional: "${fraseAleatoria}" ✨`);
}

// Función para manejar el comando /definicion
function handleDefinicion() {
    typeMessage("Por favor, escribe una palabra para buscar su definición:");

    // Crear un input para que el usuario escriba la palabra
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ingresa una palabra";
    input.id = "definicion-input"; // ID para poder acceder al input más tarde

    // Crear un botón para enviar la palabra
    const button = document.createElement("button");
    button.textContent = "Buscar Definición";
    button.onclick = async () => {
        const palabra = document.getElementById("definicion-input").value;
        if (palabra) {
            // Mostrar el mensaje de búsqueda
            typeMessage(`Buscando la definición de "${palabra}"...`);

            // Buscar la definición (aquí deberías implementar la lógica para buscar la definición)
            const definicion = await buscarDefinicion(palabra);

            // Mostrar la definición
            if (definicion) {
                typeMessage(`Definición de "${palabra}": ${definicion}`);
            } else {
                typeMessage(`No se encontró la definición de "${palabra}".`);
            }
        } else {
            typeMessage("Por favor, ingresa una palabra válida.");
        }
    };

    // Añadir el input y el botón al documento
    chatLog.appendChild(input)
    chatLog.appendChild(button);
}

async function buscarDefinicion(palabra) {
    const apiKey = "u5r8vwiysk3zfj8eu00qvng2y9n54qiy0b6rg617aslydcpzo"; // Tu clave de API
    const url = `https://api.wordnik.com/v4/word.json/${palabra}/definitions?limit=1&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.length > 0) {
            // Retornar la primera definición encontrada
            return data[0].text;
        } else {
            return null; // No se encontró definición
        }
    } catch (error) {
        console.error("Error al buscar la definición:", error);
        return null; // Manejo de errores
    }
}


function tRexFriend() {
    typeMessage('¡Has invocado a tu amigo T-Rex! ¿Qué te gustaría hacer con él hoy?');

    // Crear botones de interacción
    const btnExplorar = document.createElement('button');
    btnExplorar.textContent = '🦖 Explorar';
    btnExplorar.classList.add('btn-explorar');

    const btnAlimentar = document.createElement('button');
    btnAlimentar.textContent = '🍖 Alimentar';
    btnAlimentar.classList.add('btn-alimentar');

    const btnEntrenar = document.createElement('button');
    btnEntrenar.textContent = '⚙️ Entrenar';
    btnEntrenar.classList.add('btn-entrenar');

    const btnConversar = document.createElement('button');
    btnConversar.textContent = '💬 Conversar';
    btnConversar.classList.add('btn-conversar');

    chatLog.appendChild(btnExplorar);
    chatLog.appendChild(btnAlimentar);
    chatLog.appendChild(btnEntrenar);
    chatLog.appendChild(btnConversar);

    // Asignar eventos a cada botón
    btnExplorar.addEventListener('click', function() {
        explorarBiomas();
    });

    btnAlimentar.addEventListener('click', function() {
        alimentarTRex();
    });

    btnEntrenar.addEventListener('click', function() {
        entrenarTRex();
    });

    btnConversar.addEventListener('click', function() {
        conversarTRex();
    });
}

function explorarBiomas() {
    typeMessage('Elige un bioma para explorar con tu amigo T-Rex:');
    
    const biomas = ['Selva', 'Montaña', 'Desierto'];
    biomas.forEach(bioma => {
        const btnBioma = document.createElement('button');
        btnBioma.textContent = bioma;
        btnBioma.classList.add('btn-bioma');
        chatLog.appendChild(btnBioma);

        btnBioma.addEventListener('click', function() {
            typeMessage(`¡Tú y el T-Rex están explorando el ${bioma}!`);
            setTimeout(() => {
                typeMessage('¡Has encontrado un tesoro! Recibes 5 Animal Tokens.');
                dolaresAnimal += 5; // Premiar con Dolares Animal
            }, 2000);
        });
    });
}

function alimentarTRex() {
    const costoAlimento = 10; // Coste de alimentar al T-Rex
    const saldoActual = dolaresAnimal; // Supongamos que esta es la cantidad actual del jugador

    // Usamos la función animalPayTransaction para gestionar el pago
    animalPayTransaction(costoAlimento, saldoActual, 0, false, function(success) {
        if (success) {
            typeMessage('¡Has alimentado a tu amigo T-Rex! ¡Parece muy feliz!');
            // Dependiendo del alimento, mostrar diferentes reacciones:
            setTimeout(() => {
                typeMessage('El T-Rex ruge de alegría. ¡Te recompensará en la próxima aventura!');
            }, 2000);
        } else {
            typeMessage('❌ No has podido alimentar al T-Rex. ¡Inténtalo de nuevo más tarde!');
        }
    });
}

function entrenarTRex() {
    const costoEntrenamiento = 15; // Coste para entrenar al T-Rex
    const saldoActual = dolaresAnimal; // Supongamos que esta es la cantidad actual del jugador

    // Usamos la función animalPayTransaction para gestionar el pago
    animalPayTransaction(costoEntrenamiento, saldoActual, 0, false, function(success) {
        if (success) {
            typeMessage('¡El T-Rex ha completado su entrenamiento!');
            // Aumentar temporalmente sus habilidades
            setTimeout(() => {
                typeMessage('¡El T-Rex ahora es más rápido y fuerte en las próximas aventuras!');
            }, 2000);
        } else {
            typeMessage('❌ No has podido entrenar al T-Rex. ¡Inténtalo de nuevo más tarde!');
        }
    });
}

function conversarTRex() {
    const frasesTyrannosaurus = [
        '¿Sabías que soy el dinosaurio más famoso?',
        '¡Me encanta tener aventuras contigo!',
        'Mis brazos son cortos, pero mi corazón es grande.',
        '¿Qué haríamos hoy si tuvieras mi tamaño?'
    ];

    const frase = frasesTyrannosaurus[Math.floor(Math.random() * frasesTyrannosaurus.length)];
    typeMessage(`T-Rex dice: "${frase}"`);
}



// Comando para explorar biomas
function handleExploraBiomasCommand() {
    const costoExploracion = 0; // Costo en Animal Tokens
    const saldoActual = dolaresAnimal; // Saldo actual de Animal Tokens

    typeMessage('¿Quieres explorar un nuevo bioma? El costo es de 10 Animal Tokens.');

    // Llamar a la función de transacción
    animalPayTransaction(costoExploracion, saldoActual, function(success) {
        if (success) {
            typeMessage('¡Exploración exitosa! Has desbloqueado un nuevo bioma.');
            desbloquearBioma(); // Desbloquear el bioma
            agregarADN(); // Agregar ADN después de la exploración exitosa
            verSaldoADN();
        } else {
            typeMessage('❌ La transacción ha fallado. No se pudo completar la exploración.');
        }
    });
}

// Función para desbloquear un bioma
function desbloquearBioma() {
    // Lógica para desbloquear el bioma (por ejemplo, mostrar un nuevo menú, cambiar la escena, etc.)
    typeMessage("Bioma desbloqueado. Ahora puedes explorar la nueva área.");
}

// Función para generar una cantidad aleatoria de ADN entre 1 y 76
function generarADNAleatorio() {
    return Math.floor(Math.random() * 76) + 1; // Genera un número entre 1 y 76
}

// Función para agregar ADN al saldo actual
function agregarADN() {
    const adnGanado = generarADNAleatorio(); // Generar una cantidad aleatoria de ADN
    saldoADN += adnGanado; // Asumimos que 'saldoADN' es la variable que almacena el saldo de ADN
    typeMessage(`¡Has ganado ${adnGanado} ADN! Tu nuevo saldo de ADN es: ${saldoADN}.`);
    mostrarMonedas(); // Actualizar la lista de monedas después de cambiar el saldo
}



// Función para ver el saldo actual de ADN
function verSaldoADN() {
    typeMessage(`Tu saldo actual de ADN es: ${saldoADN}.`);
}

// Comando para consultar el saldo de ADN
function handleConsultarSaldoADN() {
    verSaldoADN(); // Llama a la función para mostrar el saldo
}



// Comando para buscar comandos
function handleComandosRecomendados() {
    // Crear contenedor de búsqueda
    const buscadorContainer = document.createElement('div');
    buscadorContainer.className = 'buscador-container';

    // Crear input de búsqueda
    const inputBusqueda = document.createElement('input');
    inputBusqueda.type = 'text';
    inputBusqueda.placeholder = 'Buscar comando...';
    buscadorContainer.appendChild(inputBusqueda);

    // Crear lista para comandos filtrados
    const listaComandos = document.createElement('ul');
    buscadorContainer.appendChild(listaComandos);

    chatLog.appendChild(buscadorContainer);


    // Actualizar lista de comandos según la búsqueda
    inputBusqueda.addEventListener('input', () => {
        const valorBuscado = inputBusqueda.value.toLowerCase();
        listaComandos.innerHTML = ''; // Limpiar lista anterior

        // Filtrar comandos
        const comandosFiltrados = Object.keys(commands).filter(comando => 
            comando.includes(valorBuscado)
        );

        // Mostrar comandos filtrados
        comandosFiltrados.forEach(comando => {
            const item = document.createElement('li');
            item.textContent = comando;

            // Al hacer clic, insertar el comando en el input
            item.onclick = () => {
                inputBusqueda.value = comando;
                listaComandos.innerHTML = ''; // Limpiar lista
            };

            listaComandos.appendChild(item);
        });
    });

    // Ejecutar comando al presionar Enter 
    inputBusqueda.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const comandoEjecutar = inputBusqueda.value.trim();
            if (comandoEjecutar in commands) {
                typeMessage(`Ejecutando comando: ${comandoEjecutar}`);
                commands[comandoEjecutar](); // Ejecutar el comando
                chatLog.removeChild(buscadorContainer); // Eliminar el buscador después de usarlo
            } else {
                typeMessage(`Comando "${comandoEjecutar}" no encontrado.`);
            }
        }
    });
}


// Comando para contar los comandos
function handleContarComandos() {
    // Filtrar los comandos que no son funciones para contar solo los implementados
    const comandosImplementados = Object.keys(commands).filter(comando => typeof commands[comando] === 'function');
    const numeroDeComandos = comandosImplementados.length;

    typeMessage(`Actualmente hay ${numeroDeComandos} comandos disponibles.`);
}

// Definir los jefes
const jefes = {
    'Dragón Infernal': {
        vida: 150,
        habilidades: {
            'Aliento de Fuego': 25,
            'Garras Incendiarias': 15,
            'Explosión de Lava': 35,
        },
    },
    'Titán de Hielo': {
        vida: 200,
        habilidades: {
            'Ventisca Helada': 20,
            'Golpe Congelante': 30,
            'Tormenta de Hielo': 40,
        },
    },
    'Serpiente de las Profundidades': {
        vida: 180,
        habilidades: {
            'Mordida Envenenada': 20,
            'Golpe de Cola': 10,
            'Tsunami': 30,
        },
    },
};

// Daño de las habilidades del jugador
const habilidadesJugador = {
    'Espada': 20,
    'Arco': 15,
    'Hechizo de Fuego': 25,
};

// Variables para almacenar el estado del juego
let jefeSeleccionado;
let vidaJugador2;
let vidaJefe;


// Comando para iniciar el combate y seleccionar el jefe
function handleEnfrentarJefe() {
    reiniciarCombate();

    // Mostrar mensaje inicial
    typeMessage('¿Qué jefe quieres enfrentar?');

    // Mostrar botones para seleccionar el jefe
    const botonesJefes = document.createElement('div');
    botonesJefes.className = 'botones-jefes';
    
    Object.keys(jefes).forEach(jefe => {
        const boton = document.createElement('button');
        boton.textContent = jefe;
        boton.onclick = () => seleccionarJefe(jefe);
        botonesJefes.appendChild(boton);
    });
    
    chatLog.appendChild(botonesJefes);
}

// Función para seleccionar un jefe
function seleccionarJefe(jefe) {
    jefeSeleccionado = jefes[jefe];
    vidaJefe = jefeSeleccionado.vida;

    // Mostrar la información del jefe seleccionado
    typeMessage(`Te enfrentarás al ${jefe}.`);
    typeMessage(`Vida: ${jefeSeleccionado.vida}`);
    typeMessage(`Habilidades: ${Object.keys(jefeSeleccionado.habilidades).join(', ')}`);

    // Iniciar el combate por turnos
    iniciarCombate();
}

// Función para iniciar el combate
function iniciarCombate() {
    // Turno del jefe
    setTimeout(() => {
        turnoJefe();
    }, 1000);
}

// Función para manejar el turno del jefe
function turnoJefe() {
    // El jefe elige una habilidad aleatoria
    const habilidadesJefe = Object.keys(jefeSeleccionado.habilidades);
    const habilidadElegida = habilidadesJefe[Math.floor(Math.random() * habilidadesJefe.length)];
    const dañoHabilidad = jefeSeleccionado.habilidades[habilidadElegida];

    // Reducir la vida del jugador
    vidaJugador2 -= dañoHabilidad;
    typeMessage(`El jefe usó ${habilidadElegida}, causando ${dañoHabilidad} de daño. Te quedan ${vidaJugador2} puntos de vida.`);

    // Verificar si el jugador perdió
    if (vidaJugador2 <= 0) {
        typeMessage('Has sido derrotado por el jefe.');
        reiniciarCombate();
        return;
    }

    // Turno del jugador
    turnoJugador();
}

// Función para manejar el turno del jugador
function turnoJugador() {
    // Mostrar botones para que el jugador seleccione su ataque
    const botonesAtaques = document.createElement('div');
    botonesAtaques.className = 'botones-ataques';

    Object.keys(habilidadesJugador).forEach(ataque => {
        const boton = document.createElement('button');
        boton.textContent = ataque;
        boton.onclick = () => {
            realizarAtaqueJugador(ataque);
        };
        botonesAtaques.appendChild(boton);
    });

    chatLog.appendChild(botonesAtaques);
}

// Función para realizar el ataque del jugador
function realizarAtaqueJugador(ataque) {
    const dañoAtaque = habilidadesJugador[ataque];

    // Reducir la vida del jefe
    vidaJefe -= dañoAtaque;
    typeMessage(`Atacas con ${ataque}, causando ${dañoAtaque} de daño. Al jefe le quedan ${vidaJefe} puntos de vida.`);

    // Verificar si el jefe perdió
    if (vidaJefe <= 0) {
        typeMessage('¡Has derrotado al jefe!');
        otorgarRecompensa();
        reiniciarCombate();
        return;
    }

    // Continuar con el siguiente turno del jefe
    iniciarCombate();
}

// Función para reiniciar el combate
function reiniciarCombate() {
    vidaJugador = 100;
    jefeSeleccionado = null;
    vidaJefe = 0;
    chatLog.innerHTML = ''; // Limpiar el chat

    // Mostrar el mensaje y los botones de selección de jefe nuevamente
    typeMessage('Combate reiniciado. ¡Selecciona un jefe para comenzar de nuevo!');
    mostrarBotonesDeJefes();
}

// Función para mostrar los botones de selección de jefes
function mostrarBotonesDeJefes() {
    const botonesJefes = document.createElement('div');
    botonesJefes.className = 'botones-jefes';

    // Crear los botones para cada jefe
    Object.keys(jefes).forEach(jefe => {
        const boton = document.createElement('button');
        boton.textContent = jefe;
        boton.onclick = () => seleccionarJefe(jefe);
        botonesJefes.appendChild(boton);
    });

    chatLog.appendChild(botonesJefes);
}


// Función para otorgar la recompensa al jugador
function otorgarRecompensa() {
    dolaresAnimal += 15;
    typeMessage(`Has ganado 15 Dolares de Animal. Total de Dolares de Animal: ${dolaresAnimal.toFixed(2)}`);
}




let NombreDeLaApp = "Animal AI";

const usuarios = [
    { 
        nombreUsuario: "oceanandwild", 
        contrasena: "59901647", 
        verificado: true, 
        fechaVerificacion: "2024-10-12", 
        verificacionEmpresa: true, 
        fechaVerificacionEmpresa: "2024-10-13",
        verificacionAdmin: true, 
        fechaVerificacionAdmin: "2024-10-14",
        baneado: false // Nueva propiedad
    },
    { 
        nombreUsuario: "JORGE", 
        contrasena: "Jorge1976", 
        verificado: true, 
        fechaVerificacion: "15/10/2024", 
        verificacionEmpresa: false, 
        fechaVerificacionEmpresa: "",
        verificacionAdmin: false, 
        fechaVerificacionAdmin: "", 
        baneado: false // Usuario baneado
    },
];


function mostrarUsuariosVerificados() {
    typeMessage("Lista de usuarios verificados:");

    // Crear el modal y su contenido
    const modalUsuarios = document.createElement('div');
    modalUsuarios.classList.add('modal'); // Clase para los estilos del modal
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content'); // Clase para el contenido del modal
    
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button'); // Clase para el botón de cerrar
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => modalUsuarios.style.display = 'none';

    const title = document.createElement('h2');
    title.innerText = 'Lista de Usuarios Verificados';

    // Contenedor de usuarios
    const listaUsuarios = document.createElement('div');
    listaUsuarios.style.display = 'flex';
    listaUsuarios.style.flexDirection = 'column';
    listaUsuarios.style.gap = '10px';

    usuarios.forEach(usuario => {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.style.display = 'flex';
        usuarioDiv.style.alignItems = 'center';
        usuarioDiv.style.gap = '10px';

        const nombreUsuario = document.createElement('span');
        nombreUsuario.innerText = usuario.nombreUsuario;
        nombreUsuario.style.fontWeight = 'bold';

        const estatusBaneado = usuario.baneado ?
            `<span style="color: red; font-weight: bold;">(Baneado)</span>` : '';

        const iconoVerificado = usuario.verificado ?
            `<img src="https://i.ibb.co/NyC8Y1W/Captura-de-pantalla-2024-10-13-191335.png" alt="Verificado Azul" style="width: 20px; height: 20px;" title="Cuenta verificada desde el ${usuario.fechaVerificacion}">` : '';

        const iconoVerificadoEmpresa = usuario.verificacionEmpresa ?
            `<img src="https://i.ibb.co/vkyZVfM/Captura-de-pantalla-2024-10-13-191054.png" alt="Verificado Dorado" style="width: 20px; height: 20px;" title="Cuenta de empresa verificada desde el ${usuario.fechaVerificacionEmpresa}">` : '';

        const iconoVerificadoAdmin = usuario.verificacionAdmin ?
            `<img src="https://i.ibb.co/vmJKTpY/Captura-de-pantalla-2024-10-13-195931.png" alt="Verificado Admin" style="width: 20px; height: 20px;" title="Cuenta de Admin verificada desde el ${usuario.fechaVerificacionAdmin}">` : '';

        usuarioDiv.innerHTML = `
            ${nombreUsuario.outerHTML} ${estatusBaneado}
            ${iconoVerificado} ${iconoVerificadoEmpresa} ${iconoVerificadoAdmin}
        `;

        listaUsuarios.appendChild(usuarioDiv);
    });

    // Construir el modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(listaUsuarios);
    modalUsuarios.appendChild(modalContent);
    document.body.appendChild(modalUsuarios);

    // Mostrar el modal
    modalUsuarios.style.display = 'block';
}



function mostrarModalRegistro() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const title = document.createElement('h2');
    title.textContent = "Registro de Usuario";
    
    const inputUsuario = document.createElement('input');
    inputUsuario.placeholder = "Nombre de Usuario";
    inputUsuario.id = "input-usuario";

    const inputContrasena = document.createElement('input');
    inputContrasena.placeholder = "Contraseña";
    inputContrasena.type = "password";
    inputContrasena.id = "input-contrasena";

    const buttonEnviar = document.createElement('button');
    buttonEnviar.innerText = "Enviar";
    buttonEnviar.onclick = () => {
        redirigirWhatsApp(inputUsuario.value, inputContrasena.value);
        modal.style.display = 'none';
    };

    modalContent.appendChild(title);
    modalContent.appendChild(inputUsuario);
    modalContent.appendChild(inputContrasena);
    modalContent.appendChild(buttonEnviar);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = 'block';
}

function redirigirWhatsApp(nombreUsuario, contrasena) {
    if (!nombreUsuario || !contrasena) {
        typeMessage("Por favor, completa ambos campos.");
        return;
    }

    typeMessage("Redirigiendo a WhatsApp...");
    const numeroTelefono = "598099685536";
    const mensajeWhatsApp = `Nombre de Usuario: ${nombreUsuario}, Contraseña: ${contrasena}`;
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    setTimeout(() => {
        window.open(urlWhatsApp, "_blank");
    }, 2000);
}

function mostrarModalInicioSesion() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const title = document.createElement('h2');
    title.textContent = "Iniciar Sesión";
    
    const inputUsuario = document.createElement('input');
    inputUsuario.placeholder = "Nombre de Usuario";
    inputUsuario.id = "input-usuario";

    const inputContrasena = document.createElement('input');
    inputContrasena.placeholder = "Contraseña";
    inputContrasena.type = "password";
    inputContrasena.id = "input-contrasena";

    const buttonAcceder = document.createElement('button');
    buttonAcceder.innerText = "Acceder";
    buttonAcceder.onclick = () => {
        verificarCredenciales(inputUsuario.value, inputContrasena.value);
        modal.style.display = 'none';
    };

    modalContent.appendChild(title);
    modalContent.appendChild(inputUsuario);
    modalContent.appendChild(inputContrasena);
    modalContent.appendChild(buttonAcceder);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = 'block';
}

function verificarCredenciales(nombreUsuario, contrasena) {
    const usuarioEncontrado = usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario && usuario.contrasena === contrasena);
    
    if (usuarioEncontrado) {
        if (usuarioEncontrado.baneado) {
            // Mostrar una página personalizada para cuentas baneadas
            document.body.innerHTML = `
                <div style="text-align: center; padding: 50px; background-color: #ffdddd; height: 100vh;">
                    <h1 style="color: #b30000;">Acceso Denegado</h1>
                    <img src="https://i.pinimg.com/736x/d8/18/ad/d818ad46b5fd6b78b51c981c36d60949.jpg alt="Cuenta baneada" style="width: 150px; height: 150px;">
                    <h2>Tu cuenta en ${NombreDeLaApp} ha sido <span style="color: red;">baneada</span>.</h2>
                    <p>Por favor, contacta al soporte para más información.</p>
                    <button onclick="window.location.href='https://x.com/AnimalAIOficial'" style="padding: 10px 20px; background-color: #ff6666; color: white; border: none; cursor: pointer;">Contactar Soporte</button>
                </div>
            `;
            return; // Detener el flujo si está baneado
        }

        // Si no está baneado, continuar con la lógica normal
        typeMessage(`¡Inicio de sesión exitoso! Bienvenido, ${nombreUsuario}.`, true);

        // Verificar si el usuario está verificado
        if (usuarioEncontrado.verificado) {
            mostrarIconoVerificado(usuarioEncontrado);
        }

        // Verificación de Empresa y Admin
        if (usuarioEncontrado.verificacionEmpresa) {
            mostrarIconoVerificadoEmpresa(usuarioEncontrado); 
        } else {
            const buttonVerificarEmpresa = document.createElement('button');
            buttonVerificarEmpresa.innerText = "Verificación de Empresa";
            buttonVerificarEmpresa.onclick = () => mostrarVerificacionEmpresa(usuarioEncontrado);
            chatLog.appendChild(buttonVerificarEmpresa);
        }

        if (usuarioEncontrado.verificacionAdmin) {
            mostrarIconoVerificadoAdmin(usuarioEncontrado); 
        } else {
            const buttonVerificarAdmin = document.createElement('button');
            buttonVerificarAdmin.innerText = "Verificación de Administrador";
            buttonVerificarAdmin.onclick = () => mostrarVerificacionAdmin(usuarioEncontrado);
            chatLog.appendChild(buttonVerificarAdmin);
        }
    } else {
        typeMessage("Nombre de Usuario o Contraseña incorrectos. Intenta de nuevo.", true);
    }
}



function mostrarIconoVerificado(usuario) {
    const divVerificado = document.createElement('div');
    divVerificado.innerHTML = `<img src="https://i.ibb.co/NyC8Y1W/Captura-de-pantalla-2024-10-13-191335.png" alt="Verificado" style="width: 20px; height: 20px;" /> Verificado en ${NombreDeLaApp} desde el ${usuario.fechaVerificacion}`;

    chatLog.appendChild(divVerificado);

    // Estilo para mostrar detalles al hacer hover en el icono de verificación
    const hoverPanel = document.createElement('div');
    hoverPanel.innerText = `Cuenta verificada el ${usuario.fechaVerificacion}`;
    hoverPanel.style.display = 'none';
    hoverPanel.style.backgroundColor = '#f0f0f0';
    hoverPanel.style.border = '1px solid #ccc';
    hoverPanel.style.padding = '5px';
    hoverPanel.style.position = 'absolute';
    hoverPanel.style.zIndex = '1000';

    divVerificado.appendChild(hoverPanel);

    divVerificado.addEventListener('mouseenter', () => {
        hoverPanel.style.display = 'block';
    });
    divVerificado.addEventListener('mouseleave', () => {
        hoverPanel.style.display = 'none';
    });
}

function mostrarIconoVerificadoEmpresa(usuario) {
    const divVerificadoEmpresa = document.createElement('div');
    divVerificadoEmpresa.innerHTML = `<img src="https://i.ibb.co/vkyZVfM/Captura-de-pantalla-2024-10-13-191054.png" alt="Verificado Empresa" style="width: 20px; height: 20px;" /> Verificado como Empresa en ${NombreDeLaApp} desde el ${usuario.fechaVerificacionEmpresa}`;

    chatLog.appendChild(divVerificadoEmpresa);

    // Estilo para mostrar detalles al hacer hover en el icono de verificación de empresa
    const hoverPanel = document.createElement('div');
    hoverPanel.innerText = `Cuenta verificada como empresa el ${usuario.fechaVerificacionEmpresa}. Este checkmark indica que es una cuenta de empresa.`;
    hoverPanel.style.display = 'none';
    hoverPanel.style.backgroundColor = '#f0f0f0';
    hoverPanel.style.border = '1px solid #ccc';
    hoverPanel.style.padding = '5px';
    hoverPanel.style.position = 'absolute';
    hoverPanel.style.zIndex = '1000';

    divVerificadoEmpresa.appendChild(hoverPanel);

    divVerificadoEmpresa.addEventListener('mouseenter', () => {
        hoverPanel.style.display = 'block';
    });
    divVerificadoEmpresa.addEventListener('mouseleave', () => {
        hoverPanel.style.display = 'none';
    });
}


function mostrarVerificacionEmpresa(usuario) {
    // Mensaje de advertencia sobre la verificación de empresa
    typeMessage("Para poder tener una cuenta verificada como empresa, se te redirigirá a WhatsApp para que luego se pueda verificar tu cuenta. Ten en cuenta que se usarán todos los métodos de verificación posibles.");

    // Simular redirección a WhatsApp después del mensaje
    setTimeout(() => {
        const numeroTelefono = "59899685536";  // Sin el signo "+" ni espacios
        const mensajeWhatsApp = `Solicitud de verificación para el usuario: ${usuario.nombreUsuario} (Empresa)`;
        const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensajeWhatsApp)}`;

        // Mensaje de redirección
        typeMessage("Redirigiendo a WhatsApp para completar la verificación de empresa...");

        // Redirigir a WhatsApp
        setTimeout(() => {
            window.open(urlWhatsApp, "_blank");
        }, 2000); // Esperar 2 segundos antes de redirigir
    }, 3000); // Esperar 3 segundos después de mostrar el mensaje inicial
}

// Nueva función para mostrar el icono de verificación de administrador
function mostrarIconoVerificadoAdmin(usuario) {
    const divVerificadoAdmin = document.createElement('div');
    divVerificadoAdmin.innerHTML = `<img src="https://i.ibb.co/vmJKTpY/Captura-de-pantalla-2024-10-13-195931.png" alt="Verificado Admin" style="width: 20px; height: 20px;" /> Verificado como Administrador en ${NombreDeLaApp} desde el ${usuario.fechaVerificacionAdmin}`;

    chatLog.appendChild(divVerificadoAdmin);

    // Estilo para mostrar detalles al hacer hover en el icono de verificación de administrador
    const hoverPanel = document.createElement('div');
    hoverPanel.innerText = `Cuenta verificada como administrador el ${usuario.fechaVerificacionAdmin}. Este checkmark indica que es una cuenta de administrador.`;
    hoverPanel.style.display = 'none';
    hoverPanel.style.backgroundColor = '#f0f0f0';
    hoverPanel.style.border = '1px solid #ccc';
    hoverPanel.style.padding = '5px';
    hoverPanel.style.position = 'absolute';
    hoverPanel.style.zIndex = '1000';

    divVerificadoAdmin.appendChild(hoverPanel);

    divVerificadoAdmin.addEventListener('mouseenter', () => {
        hoverPanel.style.display = 'block';
    });
    divVerificadoAdmin.addEventListener('mouseleave', () => {
        hoverPanel.style.display = 'none';
    });
}

// Nueva función para manejar la verificación de administrador
function mostrarVerificacionAdmin(usuario) {
    // Mensaje de advertencia sobre la verificación de administrador
    typeMessage("Para poder tener una cuenta verificada como administrador, se te redirigirá a WhatsApp para que luego se pueda verificar tu cuenta. Ten en cuenta que se usarán todos los métodos de verificación posibles.");

    // Simular redirección a WhatsApp después del mensaje
    setTimeout(() => {
        const numeroTelefono = "59899685536";  // Sin el signo "+" ni espacios
        const mensajeWhatsApp = `Solicitud de verificación para el usuario: ${usuario.nombreUsuario} (Administrador)`;
        const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensajeWhatsApp)}`;

        // Mensaje de redirección
        typeMessage("Redirigiendo a WhatsApp para completar la verificación de administrador...");

        // Redirigir a WhatsApp
        setTimeout(() => {
            window.open(urlWhatsApp, "_blank");
        }, 2000); // Esperar 2 segundos antes de redirigir
    }, 3000); // Esperar 3 segundos después de mostrar el mensaje inicial
}

mostrarModalInicioSesion();

    // Función para mostrar el modal de verificación de edad
function mostrarModalVerificacionEdad() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Verificación de Edad';

    const message = document.createElement('p');
    message.textContent = 'Por favor, ingrese su edad para continuar.';

    const inputEdad = document.createElement('input');
    inputEdad.type = 'number';
    inputEdad.placeholder = 'Ingrese su edad';

    const verificarButton = document.createElement('button');
    verificarButton.textContent = 'Verificar';

    verificarButton.onclick = function () {
        const edad = parseInt(inputEdad.value);
        if (isNaN(edad) || edad < 18) {
            alert('Lo siento, debes ser mayor de edad para continuar.');
            cerrarModal(modal);
        } else {
            cerrarModal(modal);
            mostrarContenidoApto(); // Mostrar contenido apto para mayores de edad
        }
    };

    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(inputEdad);
    modalContent.appendChild(verificarButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Función para mostrar contenido apto para mayores de edad
function mostrarContenidoApto() {
    const mensajeApto = 'Contenido apto para mayores de edad.';
    typeMessage(mensajeApto); // Llama a la función typeMessage con el contenido
}

// Función para cerrar el modal actual
function cerrarModal(modal) {
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Variable de estado para comprobar la disponibilidad de Animal AI
let animalAIDisponible = false; // Cambia esto a true o false según la lógica de tu aplicación



// Función para mostrar el modal si Animal AI no está disponible
function verificarDisponibilidadAnimalAI() {
    // Verifica si la fecha actual es el 12 de octubre de 2024
    if (!animalAIDisponible) {
        mostrarModalNoDisponible();
    } else {
        // Aquí puedes manejar la lógica cuando Animal AI está disponible o si es la fecha específica
        typeMessage('Animal AI está disponible.');
    }
}

// Función para mostrar el modal de no disponible
function mostrarModalNoDisponible() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Animal AI esta indisponible, vuelva a intentarlo mas tarde.';

    const razon = document.createElement('p');
    razon.textContent = 'Razón: Mantenimiento Inesperado 11/11/2024 - 23/11/2024.'; 
    const closeButton = document.createElement('button');
    closeButton.textContent = "🔄"; // Emoji de reinicio

    closeButton.onclick = function () {
        location.reload(); // Recargar la página
    };

    // Añadir todos los elementos al modal
    modalContent.appendChild(title);
    modalContent.appendChild(razon);
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Mostrar el modal
    modal.style.display = 'block'; // Cambia a bloque para que sea visible
}



// Modificar la función para envolver en try-catch y manejar errores
function mostrarModalPermisos() {
    try {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const title = document.createElement('h2');
        title.textContent = 'Permisos Requeridos';

        const message = document.createElement('p');
        message.textContent = 'Para esto, se requiere los permisos de Email Send y Google Account para poder continuar.';

        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continuar';

        continueButton.onclick = function () {
            cerrarModal(modal);
            mostrarModalPermisoEmailSend(); // Mostrar el siguiente modal
        };

        modalContent.appendChild(title);
        modalContent.appendChild(message);
        modalContent.appendChild(continueButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        modal.style.display = 'block';
    } catch (error) {
        // Si ocurre un error, mostrar el modal de error
        mostrarModalErrorComando('mostrarModalPermisos', 'Hubo un error al mostrar el modal de permisos.', error.message);
    }
}

// Función para mostrar el segundo modal de "Permiso Email Send"
function mostrarModalPermisoEmailSend() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Permiso Email Send';

    const message = document.createElement('p');
    message.innerHTML = 'Este permiso al aceptarlo le estas dando a la app la posibilidad de que te envie un email ahora mismo. ' +
        'Este permiso está sujeto a <span class="link" onclick="redirigirTerminos()">Términos de Servicio</span> y <span class="link" onclick="redirigirPoliticas()">Política de Privacidad</span>.';

    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Aceptar';

    acceptButton.onclick = function () {
        cerrarModal(modal);
        mostrarModalPermisoGoogleAccount(); // Mostrar el siguiente modal
    };

    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(acceptButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Función para mostrar el tercer modal de "Permiso Google Account"
function mostrarModalPermisoGoogleAccount() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Permiso Google Account';

    const message = document.createElement('p');
    message.innerHTML = 'Al aceptar, estarás dando permiso a la app a tu cuenta de Google, principalmente a los servicios Gmail y Calendar. ' +
        'Este permiso está sujeto a Términos de Servicio y Política de Privacidad.';

        const termsofServiceButton = document.createElement('button');
        termsofServiceButton.textContent = 'Terminos de Servicio';

        // Deshabilitar el botón
termsofServiceButton.disabled = true;
        termsofServiceButton.onclick = function () {
          redirigirTerminos();
        };
    
    

    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Aceptar';

    acceptButton.onclick = function () {
        cerrarModal(modal);
        mostrarModalPedirEmail(); // Mostrar el siguiente modal
    };

    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(acceptButton);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Función para mostrar el cuarto modal para pedir el email
function mostrarModalPedirEmail() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Ingrese su Email';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'example@email.com';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmar';

    confirmButton.onclick = function () {
        const email = inputEmail.value;
        if (validarEmail(email)) {
            cerrarModal(modal);
            mostrarModalEnviandoCorreo(); // Mostrar el siguiente modal
            enviarCorreo(email); // Simular el envío de correo
        } else {
            alert('Por favor, ingrese un email válido.');
        }
    };

    modalContent.appendChild(title);
    modalContent.appendChild(inputEmail);
    modalContent.appendChild(confirmButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Función para mostrar el último modal de "Enviando Correo"
function mostrarModalEnviandoCorreo() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Enviando Correo...';

    const message = document.createElement('p');
    message.textContent = 'Por favor, espere al menos 30 segundos y revise su bandeja.';

    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'block';
    setTimeout(() => {
     modal.style.display = 'none';
    }, 5000)
}

// Función para redirigir a la página de Términos de Servicio
function redirigirTerminos() {
    window.open('https://tu-web.com/terminos', '_blank');
}

// Función para redirigir a la página de Política de Privacidad
function redirigirPoliticas() {
    window.open('https://tu-web.com/politicas', '_blank');
}

// Validar que el email es correcto
function validarEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

// Simular el envío de correo
function enviarCorreo(email) {
    console.log(`Enviando correo a ${email}...`);
    // Aquí pondrías la lógica para enviar el correo
}

// Iniciar la cadena de modales al cargar la página
window.onload = function() {
    verificarDisponibilidadAnimalAI();
};


// Variables globales
let nivelActual = 1;
let expActual = 0;
let expNecesaria = 100;
let contadorExp = 3600; // 1 hora en segundos
let timerActivo = false;
let comandoDesbloqueado = false;
let expText; // Definir expText como variable global para acceder desde cualquier función



// Función para mostrar el pase de temporada
function mostrarModalPaseTemporada() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Pase Salvaje';

    // Mostrar nivel actual
    const nivelText = document.createElement('p');
    nivelText.textContent = `Nivel actual: ${nivelActual} / 76`;

    // Mostrar EXP actual (inicial)
    expText = document.createElement('p');
    expText.textContent = `EXP actual: ${expActual} / ${expNecesaria}`;

    // Botón para ganar EXP
    const ganarExpButton = document.createElement('button');
    ganarExpButton.textContent = 'Ganar EXP';
    if (timerActivo) {
        ganarExpButton.disabled = true;
        ganarExpButton.textContent = 'Ya has desbloqueado la EXP horaria, vuelve a intentarlo luego.';
    }
    ganarExpButton.onclick = function () {
        ganarExp();
        iniciarContador(ganarExpButton); // Deshabilitar el botón por una hora
    };

    // Sección de recompensas
    const recompensasSection = document.createElement('div');
    const recompensasTitle = document.createElement('h3');
    recompensasTitle.textContent = 'Recompensas del Pase';
    recompensasSection.appendChild(recompensasTitle);

    // Recompensas existentes
    const recompensadolaresAnimalButton = crearBotonRecompensa('Animal Tokens', 200, 'comando-secreto');
    const recompensaFobiasButton = crearBotonRecompensa('Créditos de Fobias', 50, 'comando-extra');
    const recompensaAsesinoButton = crearBotonRecompensa('Créditos de Asesino', 75);

    // Nuevo comando /ataque-fantasma agregado como recompensa
    const recompensaFantasmaButton = crearBotonRecompensa('Saldo de Ectoplasma', 50, 'ataque-fantasma');

    recompensasSection.appendChild(recompensadolaresAnimalButton);
    recompensasSection.appendChild(recompensaFobiasButton);
    recompensasSection.appendChild(recompensaAsesinoButton);
    recompensasSection.appendChild(recompensaFantasmaButton);

    // Si el usuario está en el último nivel
    if (nivelActual >= 76 && !comandoDesbloqueado) {
        const comandoDesbloqueadoButton = document.createElement('button');
        comandoDesbloqueadoButton.textContent = 'Desbloquear Comando Secreto';
        comandoDesbloqueadoButton.onclick = function () {
            desbloquearComandoSecreto();
        };
        recompensasSection.appendChild(comandoDesbloqueadoButton);
    }

    // Botón de cierre
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.onclick = function () {
        cerrarModal(modal);
    };

    // Añadir todos los elementos al modal
    modalContent.appendChild(title);
    modalContent.appendChild(nivelText);
    modalContent.appendChild(expText); // Añadir el texto de EXP al modal
    modalContent.appendChild(ganarExpButton);
    modalContent.appendChild(recompensasSection);
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = 'block';
}

// Función para ganar EXP
function ganarExp() {
    expActual += 10; // Ejemplo: sumar 10 EXP
    alert(`Has ganado 10 EXP. EXP actual: ${expActual}/${expNecesaria}`);

    // Actualizar el texto de EXP actual
    expText.textContent = `EXP actual: ${expActual} / ${expNecesaria}`;

    // Si alcanza la EXP necesaria, subir de nivel
    if (expActual >= expNecesaria) {
        expActual = 0; // Reiniciar EXP
        nivelActual++;
        expNecesaria += 50; // Incrementar la EXP necesaria en niveles más altos
        alert(`¡Felicidades! Has subido al nivel ${nivelActual}.`);

        // Actualizar el texto de EXP actual después de subir de nivel
        expText.textContent = `EXP actual: ${expActual} / ${expNecesaria}`;
    }
}

// Función para iniciar el contador de una hora
function iniciarContador(ganarExpButton) {
    timerActivo = true;
    ganarExpButton.disabled = true;
    ganarExpButton.textContent = 'Ya has desbloqueado la EXP horaria, vuelve a intentarlo luego.';
    
    let contador = contadorExp;
    const intervalo = setInterval(() => {
        contador--;
        if (contador <= 0) {
            clearInterval(intervalo);
            timerActivo = false;
            ganarExpButton.disabled = false;
            ganarExpButton.textContent = 'Ganar EXP';
        }
    }, 1000);
}

// Función para crear los botones de recompensa y ejecutar el comando si existe
function crearBotonRecompensa(tipoRecompensa, cantidad, comando) {
    const boton = document.createElement('button');
    boton.textContent = `Reclamar ${cantidad} ${tipoRecompensa}`;
    
    boton.onclick = function () {
        if (expActual >= expNecesaria) {
            alert(`Has reclamado ${cantidad} ${tipoRecompensa}.`);
            expActual = 0; // Reiniciar EXP tras reclamar

            // Ejecutar el comando si existe en la lista de comandos
            if (comando && commands.includes(comando)) {
                ejecutarComando(comando);
            }
        } else {
            alert(`Necesitas más EXP. EXP actual: ${expActual}/${expNecesaria}`);
        }

        // Actualizar el texto de EXP tras reclamar
        expText.textContent = `EXP actual: ${expActual} / ${expNecesaria}`;
    };

    return boton;
}

// Función para desbloquear el comando secreto
function desbloquearComandoSecreto() {
    comandoDesbloqueado = true;
    alert('¡Felicidades! Has desbloqueado el Comando de Temporada: /comando-secreto.');
}



// Función para cerrar el modal
function cerrarModal(modal) {
    if (modal) {
        document.body.removeChild(modal);
    }
}

    // Función para mostrar el modal de compra
function mostrarModalCompraTokens() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Compra Tokens y Créditos';

    // Sección para Animal Tokens
    const dolaresAnimalSection = document.createElement('div');
    const dolaresAnimalTitle = document.createElement('h3');
    dolaresAnimalTitle.textContent = 'Comprar Dolares de Animal';
    dolaresAnimalSection.appendChild(dolaresAnimalTitle);

    const comprardolaresAnimalButton = document.createElement('button');
    comprardolaresAnimalButton.textContent = 'Comprar Dolares de Animal';
    comprardolaresAnimalButton.onclick = function () {
        solicitarCodigoCompra('Dolares Animal');
    };
    dolaresAnimalSection.appendChild(comprardolaresAnimalButton);

    // Sección para Créditos de Fobias
    const fobiaCreditsSection = document.createElement('div');
    const fobiaCreditsTitle = document.createElement('h3');
    fobiaCreditsTitle.textContent = 'Comprar Créditos de Fobias';
    fobiaCreditsSection.appendChild(fobiaCreditsTitle);

    const comprarFobiaCreditsButton = document.createElement('button');
    comprarFobiaCreditsButton.textContent = 'Comprar Créditos de Fobias';
    comprarFobiaCreditsButton.onclick = function () {
        solicitarCodigoCompra('Créditos de Fobias');
    };
    fobiaCreditsSection.appendChild(comprarFobiaCreditsButton);

    // Sección para Créditos de Asesino
    const asesinoCreditsSection = document.createElement('div');
    const asesinoCreditsTitle = document.createElement('h3');
    asesinoCreditsTitle.textContent = 'Comprar Créditos de Asesino';
    asesinoCreditsSection.appendChild(asesinoCreditsTitle);

    const comprarAsesinoCreditsButton = document.createElement('button');
    comprarAsesinoCreditsButton.textContent = 'Comprar Créditos de Asesino';
    comprarAsesinoCreditsButton.onclick = function () {
        solicitarCodigoCompra('Créditos de Asesino');
    };
    asesinoCreditsSection.appendChild(comprarAsesinoCreditsButton);

    // Botón de cierre
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.onclick = function () {
        cerrarModal(modal);
    };

    // Añadir todo al modal
    modalContent.appendChild(title);
    modalContent.appendChild(dolaresAnimalSection);
    modalContent.appendChild(fobiaCreditsSection);
    modalContent.appendChild(asesinoCreditsSection);
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = 'block';
}

// Función para solicitar el código de compra
function solicitarCodigoCompra(tipoCompra) {
    const codigo = prompt(`Ingrese el código para completar la compra de ${tipoCompra}:`);
    if (codigo) {
        alert(`Código ingresado: ${codigo}. Por favor, espera a que un administrador lo verifique.`);
    } else {
        alert('No se ingresó ningún código.');
    }
}

// Función para cerrar el modal
function cerrarModal(modal) {
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Función para mostrar modal de verificación de administrador
function mostrarModalVerificacionAdmin() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Verificación de Administrador';

    const mensaje = document.createElement('p');
    mensaje.textContent = 'Por favor, ingrese la clave de administrador:';

    const inputClave = document.createElement('input');
    inputClave.type = 'password';

    const verificarButton = document.createElement('button');
    verificarButton.textContent = 'Verificar';
    verificarButton.onclick = function () {
        verificarAdmin(inputClave.value, modal);
    };

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.onclick = function () {
        cerrarModal(modal);
    };

    // Añadir elementos al modal
    modalContent.appendChild(title);
    modalContent.appendChild(mensaje);
    modalContent.appendChild(inputClave);
    modalContent.appendChild(verificarButton);
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = 'block';
}

// Función para verificar si es administrador
function verificarAdmin(claveIngresada, modal) {
    const claveCorrecta = '123456'; // Cambiar por la clave real de administrador

    if (claveIngresada === claveCorrecta) {
        cerrarModal(modal);
        generarCodigoCompra();
    } else {
        alert('Clave incorrecta. Inténtelo de nuevo.');
    }
}

// Función para generar un código de 7 dígitos que caduca en 15 minutos
function generarCodigoCompra() {
    const codigo = Math.floor(1000000 + Math.random() * 9000000).toString(); // Código de 7 dígitos
    const tiempoExpiracion = 15 * 60 * 1000; // 15 minutos

    // Mostrar el código al administrador
    typeMessage(`Código generado: ${codigo}. Caduca en 15 minutos.`);

    // Configurar expiración del código
    setTimeout(() => {
        alert('El código ha expirado.');
    }, tiempoExpiracion);
}



// Función para cerrar el modal
function cerrarModal(modal) {
    if (modal) {
        document.body.removeChild(modal);
    }
}


  
 
 

    
    // Array que contiene los comandos próximos
    let comandosProximos = [];
    
    // Ejemplo de comandos próximos (puedes agregar más con la función correspondiente)
    comandosProximos.push({
        nombre: '/explora-biomas',
        fecha: null, // Fecha en formato ISO
    });
    
    comandosProximos.push({
        nombre: '/salvar-a-la-naturaleza',
        fecha: null, // Sin fecha exacta
    });
    
    
    // Función para agregar un nuevo comando próximo
    function agregarComandoProximo(nombre, fecha) {
        comandosProximos.push({ nombre, fecha });
        console.log(`El comando ${nombre} ha sido añadido como próximo.`);
    }
    
    // Función para mostrar comandos próximos
    function mostrarComandosProximos() {
        const contenedor = document.createElement('div'); // Crear un contenedor para los comandos
        contenedor.classList.add('comandos-proximos');
    
        if (comandosProximos.length === 0) {
            typeMessage('✅ No hay comandos próximos programados.');
            return;
        }
    
        comandosProximos.forEach(comando => {
            const comandoContenedor = document.createElement('div');
            comandoContenedor.classList.add('comando-contenedor');
    
            const nombre = document.createElement('h4');
            nombre.textContent = comando.nombre;
    
            // Verificar si hay una fecha
            if (comando.fecha) {
                const fecha = new Date(comando.fecha);
                const now = new Date();
                const timeDiff = fecha - now;
    
                if (timeDiff > 0) {
                    const diasRestantes = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    const horasRestantes = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    
                    const tiempoRestante = document.createElement('p');
                    tiempoRestante.textContent = `Disponible en: ${diasRestantes} días y ${horasRestantes} horas.`;
                    comandoContenedor.appendChild(tiempoRestante);
                } else {
                    const tiempoRestante = document.createElement('p');
                    tiempoRestante.textContent = 'Este comando ya está disponible.';
                    comandoContenedor.appendChild(tiempoRestante);
                }
            } else {
                const tiempoRestante = document.createElement('p');
                tiempoRestante.textContent = 'Sin fecha exacta.';
                comandoContenedor.appendChild(tiempoRestante);
            }
    
            comandoContenedor.appendChild(nombre);
            contenedor.appendChild(comandoContenedor);
        });
    
        // Mostrar los comandos en la interfaz
        chatLog.appendChild(contenedor); // Puedes cambiar esto para agregarlo en un lugar específico
    }
    
    
    // Array que contiene los comandos en mantenimiento
    let comandosEnMantenimiento = [];
    
    // Función para manejar el nuevo comando
    function comandoMantenimiento() {
        if (comandosEnMantenimiento.length > 0) {
            // Si hay algún comando en mantenimiento, mostramos el primero
            typeMessage(`⚠️ El siguiente comando está en mantenimiento: ${comandosEnMantenimiento[0]}`);
        } else {
            // Si no hay comandos en mantenimiento
            typeMessage('✅ No hay ningún comando en mantenimiento, todo ordenado y limpio.');
        }
    }
    
    
    
    // Lista de animales predefinidos con su información
    const listaAnimales = [
        {
            nombre: 'León',
            habitat: 'Sabana Africana',
            dieta: 'Carnívoro',
            caracteristicas: 'Gran depredador, vive en manadas',
            imagen: 'https://example.com/leon.jpg' // Reemplaza con una URL válida de imagen
        },
        {
            nombre: 'Pingüino',
            habitat: 'Antártida',
            dieta: 'Carnívoro, se alimenta de peces',
            caracteristicas: 'Ave que no vuela, excelente nadador',
            imagen: 'https://example.com/pinguino.jpg'
        },
        {
            nombre: 'Delfín',
            habitat: 'Océanos y mares de todo el mundo',
            dieta: 'Carnívoro, principalmente peces y calamares',
            caracteristicas: 'Mamífero acuático, altamente inteligente',
            imagen: 'https://example.com/delfin.jpg'
        },
        {
            nombre: 'Elefante',
            habitat: 'Selvas y sabanas de África y Asia',
            dieta: 'Herbívoro',
            caracteristicas: 'El animal terrestre más grande, vive en grupos familiares',
            imagen: 'https://example.com/elefante.jpg'
        },
        {
            nombre: 'Águila',
            habitat: 'Montañas y bosques de todo el mundo',
            dieta: 'Carnívoro, se alimenta de pequeños mamíferos',
            caracteristicas: 'Ave de presa con una visión extremadamente aguda',
            imagen: 'https://example.com/aguila.jpg'
        }
    ];
    
    // Función para generar un animal aleatorio
    function generarAnimalAleatorio() {
        // Seleccionar un animal aleatorio de la lista
        const animalAleatorio = listaAnimales[Math.floor(Math.random() * listaAnimales.length)];
    
    
    
        // Crear los elementos del HTML dinámicamente usando JavaScript
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('animal-tarjeta');
    
        // Título del animal
        const titulo = document.createElement('h2');
        titulo.textContent = `Nombre del animal: ${animalAleatorio.nombre}`;
        tarjeta.appendChild(titulo);
    
        // Hábitat del animal
        const habitat = document.createElement('p');
        habitat.innerHTML = `<strong>Hábitat:</strong> ${animalAleatorio.habitat}`;
        tarjeta.appendChild(habitat);
    
        // Dieta del animal
        const dieta = document.createElement('p');
        dieta.innerHTML = `<strong>Dieta:</strong> ${animalAleatorio.dieta}`;
        tarjeta.appendChild(dieta);
    
        // Características del animal
        const caracteristicas = document.createElement('p');
        caracteristicas.innerHTML = `<strong>Características:</strong> ${animalAleatorio.caracteristicas}`;
        tarjeta.appendChild(caracteristicas);
    
        // Imagen del animal
        const imagen = document.createElement('img');
        imagen.src = animalAleatorio.imagen;
        imagen.alt = `Imagen de ${animalAleatorio.nombre}`;
        imagen.classList.add('animal-imagen');
        tarjeta.appendChild(imagen);
    
        // Botón para generar otro animal
        const botonOtroAnimal = document.createElement('button');
        botonOtroAnimal.textContent = "Otro Animal";
        botonOtroAnimal.addEventListener('click', generarAnimalAleatorio);
        tarjeta.appendChild(botonOtroAnimal);
    
        // Añadir la tarjeta completa al contenedor
        chatLog.appendChild(tarjeta);
    }
    
    // Comando para iniciar la generación de animales aleatorios
    function handleAnimalRandom() {
        // Genera el primer animal aleatorio cuando se llama al comando
        generarAnimalAleatorio();
        // Agregar un botón para iniciar el comando
    const botonIniciar = document.createElement('button');
    botonIniciar.textContent = "Generar Animal Aleatorio";
    botonIniciar.addEventListener('click', handleAnimalRandom);
    
    // Agregar el botón al cuerpo del documento
    chatLog.appendChild(botonIniciar);
    
    // Crear el contenedor donde se mostrará el animal aleatorio
    const contenedor = document.createElement('div');
    contenedor.id = 'animalRandomContainer';
    chatLog.appendChild(contenedor);
    }
    
    
    
    
    // Comando para seleccionar y reproducir archivos MP3
    function handleReproductorMP3() {
        // Crear un contenedor para el reproductor y el selector de archivos
        const contenedor = document.createElement('div');
        const inputArchivo = document.createElement('input');
        const reproductor = document.createElement('audio');
    
        // Configurar el input de tipo file para aceptar solo archivos MP3
        inputArchivo.type = 'file';
        inputArchivo.accept = 'audio/mp3, audio/x-m4a'; // Aceptar MP3 y M4A
        inputArchivo.style.display = 'block'; // Mostrar siempre el selector de archivo
        inputArchivo.style.marginTop = '10px';
    
        // Configurar el reproductor de música
        reproductor.controls = true; // Mostrar los controles del reproductor (play, pause, etc.)
        reproductor.style.display = 'block'; // Asegurar que el reproductor se vea
        reproductor.style.marginTop = '10px';
    
        // Función que se ejecuta cuando el usuario selecciona un archivo
        inputArchivo.addEventListener('change', (event) => {
            const archivoSeleccionado = event.target.files[0];
            if (archivoSeleccionado) {
                // Crear la URL del archivo MP3 seleccionado
                const urlMP3 = URL.createObjectURL(archivoSeleccionado);
                
                // Establecer la URL en el reproductor para comenzar la reproducción
                reproductor.src = urlMP3;
                reproductor.play(); // Iniciar la reproducción automáticamente
            } else {
                typeMessage('No seleccionaste ningún archivo.');
            }
        });
    
        // Insertar el input y el reproductor en el DOM
        chatLog.appendChild(inputArchivo);
        chatLog.appendChild(reproductor);
        chatLog.appendChild(contenedor);
    
        // Mostrar el mensaje inicial para que el usuario seleccione un archivo MP3
        typeMessage('Selecciona un archivo para reproducir (Solo MP3 y M4A estan disponibles por ahora):');
    }
    
    
    
    // Comando para generar una URL de un video o imagen
    function handleGenerarURLVideo() {
        // Crear un input para seleccionar el archivo
        const inputArchivo = document.createElement('input');
        inputArchivo.type = 'file';
        inputArchivo.accept = 'image/*,video/*'; // Acepta tanto imágenes como videos
        inputArchivo.style.display = 'none'; // Ocultar el input para que se abra solo programáticamente
    
        // Agregar el input al DOM
        chatLog.appendChild(inputArchivo);
    
        // Simular clic para abrir el selector de archivo
        inputArchivo.click();
    
        // Manejar el archivo seleccionado
        inputArchivo.addEventListener('change', (event) => {
            const archivoSeleccionado = event.target.files[0];
            if (archivoSeleccionado) {
                // Generar una URL accesible para el archivo seleccionado
                const urlGenerada = URL.createObjectURL(archivoSeleccionado);
    
                // Mostrar el mensaje con la URL generada
                typeMessage(`URL Generada. URL: ${urlGenerada}`);
            } else {
                // En caso de que el usuario no seleccione un archivo
                typeMessage('No seleccionaste ningún archivo.');
            }
    
            // Eliminar el input después de generar la URL
            inputArchivo.remove();
        });
    }
    
    
    // Comando para alternar imágenes de gatitos
    function handleGatitos() {
        const imagenesGatitos = [
            'https://i.pinimg.com/736x/c6/54/5d/c6545dc6c66433ff932af4ace7b98735.jpg', // URL de la primera imagen de gatito
            'https://i.pinimg.com/564x/76/7a/99/767a997e1ba12872fa93fabe42dc62fa.jpg',  // URL de la segunda imagen de gatito
            'https://i.pinimg.com/564x/63/4b/25/634b2520946a6c5bc89d7037f74315ed.jpg',
            'https://i.pinimg.com/564x/d6/09/c4/d609c46ca79386eb7f4d6ef4cf56210f.jpg',
            'https://i.pinimg.com/736x/2a/0a/fe/2a0afe10601d4b49baf0461773d8da0b.jpg',
            'https://i.pinimg.com/564x/92/17/ad/9217adc68716941350f5b3103cca6d32.jpg',
            'https://i.pinimg.com/736x/9e/7b/04/9e7b041059f24da6fdf9182dcd7fe28f.jpg',
            'https://i.pinimg.com/564x/6a/a8/86/6aa886c36f9e7a7fa437fde51193dbdc.jpg',
            'https://i.pinimg.com/564x/da/9a/49/da9a49ca6f8838938fc029e4a9dc9cb9.jpg',
            'https://i.pinimg.com/564x/50/77/cd/5077cd9fb0194174be7d0f1ec85e86b4.jpg',
            'https://i.pinimg.com/564x/42/98/d9/4298d9d76dd80bc1a203d843cc9581d4.jpg',
            'https://i.pinimg.com/736x/3f/03/d8/3f03d8278ac0cd7e6c5d25d938743968.jpg',
            'https://i.pinimg.com/736x/2f/c7/d1/2fc7d1b9610519a63e996e917446ec68.jpg',
            'https://i.pinimg.com/736x/7c/e4/66/7ce46621c71282e06fa4cdd743ae4f73.jpg',
            'https://i.pinimg.com/736x/a7/25/ac/a725ac1f74bbd711273237cb402d9502.jpg',
            'https://i.pinimg.com/736x/22/4a/3f/224a3fecc02f6944a48bd4e9fcbd087e.jpg',
            'https://i.pinimg.com/564x/e1/1d/6c/e11d6c024d34bddfe6e80c2abc4118c0.jpg',
            'https://i.pinimg.com/564x/9a/14/5c/9a145cd8d552e0b4f5d5f87592ec4cb1.jpg',
            'https://i.pinimg.com/564x/22/bc/3d/22bc3d1e4f279067b0a6127ae6ce3f86.jpg',
            'https://i.pinimg.com/564x/88/2f/a2/882fa26fb47bf5b320a1a35b733687b4.jpg',
        ];
    
        const videosGatitos = [
            'https://v1.pinimg.com/videos/iht/720p/a4/71/96/a47196f0e3801b4547dd10c2229113f4.mp4',
            'https://v1.pinimg.com/videos/iht/720p/4f/96/8a/4f968aa3cf8aa60ff33c2dc4cd40282a.mp4', 
            'https://v1.pinimg.com/videos/iht/720p/19/25/63/1925631239b11847f7f2494f9eb804c1.mp4',
        ];
    
        let indexImagen = 0; // Índice para alternar entre imágenes
        let indexVideo = 0;  // Índice para alternar entre videos
    
        const contenedor = document.createElement('div'); // Contenedor para la imagen o video
        const imagenGatito = document.createElement('img'); // Elemento para las imágenes
        const videoGatito = document.createElement('video'); // Elemento para los videos
    
        // Configurar los estilos de las imágenes
        imagenGatito.style.width = '300px'; // Ajustar tamaño de la imagen
        imagenGatito.style.height = 'auto'; 
    
        // Configurar los estilos de los videos
        videoGatito.style.width = '300px'; // Ajustar tamaño del video
        videoGatito.style.height = 'auto';
        videoGatito.controls = true; // Mostrar controles del video
    
        // Agregar imagen inicial al contenedor y luego al chat
        imagenGatito.src = imagenesGatitos[indexImagen];
        contenedor.appendChild(imagenGatito);
        chatLog.appendChild(contenedor);
    
        // Función para alternar las imágenes cada 2 segundos
        const cambiarImagen = () => {
            indexImagen = (indexImagen + 1) % imagenesGatitos.length; // Cambiar entre imágenes
            imagenGatito.src = imagenesGatitos[indexImagen]; // Actualizar la imagen
        };
    
        setInterval(cambiarImagen, 2000); // Alternar imágenes cada 2 segundos
    
        // Función para cambiar el video cuando termine el actual
        const cambiarVideo = () => {
            indexVideo = (indexVideo + 1) % videosGatitos.length; // Cambiar entre videos
            videoGatito.src = videosGatitos[indexVideo];
            videoGatito.play(); // Reproducir el nuevo video
        };
    
        // Evento para cambiar al siguiente video cuando el actual termine
        videoGatito.addEventListener('ended', cambiarVideo);
    
        // Cambiar de imagen a video después de cierto tiempo (ejemplo: 10 segundos)
        setTimeout(() => {
            // Reemplazar la imagen por el video en el contenedor
            contenedor.replaceChild(videoGatito, imagenGatito);
            videoGatito.src = videosGatitos[indexVideo];
            videoGatito.play(); // Iniciar la reproducción del video
        }, 40000); // Después de 10 segundos cambia a videos
    }
    
    
    
    // Comando para solicitar un texto y devolver un resumen
    function handleResumirTexto() {
        // Crear un input para que el usuario ingrese el texto
        const inputTexto = document.createElement('input');
        inputTexto.placeholder = 'Introduce el texto que deseas resumir';
        inputTexto.setAttribute('id', 'inputTextoResumir');
        
        const botonEnviar = document.createElement('button');
        botonEnviar.textContent = 'Resumir';
        
        // Añadir el input y el botón a la interfaz
        const inputContainer = document.createElement('div');
        inputContainer.appendChild(inputTexto);
        inputContainer.appendChild(botonEnviar);
        chatLog.appendChild(inputContainer);
    
        // Evento que ocurre cuando se presiona el botón "Resumir"
        botonEnviar.addEventListener('click', function() {
            const textoOriginal = inputTexto.value.trim();
            
            if (textoOriginal.length > 0) {
                // Simular la respuesta de la IA con el texto resumido
                const textoResumido = resumirTexto(textoOriginal);
                typeMessage(`Resumen del texto: ${textoResumido}`);
            } else {
                typeMessage('❌ Por favor, introduce un texto para resumir.');
            }
        });
    }
    
    // Función que simula el resumen del texto
    function resumirTexto(texto) {
        // Aquí puedes implementar lógica más avanzada de resumen o usar una API externa
        // Por ahora, la simulación devolverá las primeras 10 palabras o el texto original si es más corto
        const palabras = texto.split(' ');
        const limitePalabras = 50;
        
        if (palabras.length > limitePalabras) {
            return palabras.slice(0, limitePalabras).join(' ') + '...';
        } else {
            return texto; // Si el texto tiene 10 palabras o menos, no se modifica
        }
    }
    


    // Variable global para almacenar la preferencia del usuario (modales o typeMessages)
let preferenciaModal = localStorage.getItem('preferenciaModal') || 'typeMessages'; // Por defecto, typeMessages

// Función para mostrar el modal de configuración
function mostrarConfiguracion() {
    // Crear el modal
    const modal = document.createElement('div');
    modal.classList.add('modal', 'config-modal'); // Añadir clase para el modal de configuración

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = "Configuración";

    const label = document.createElement('label');
    label.textContent = "Respuestas en:";

    // Crear el interruptor (switch)
    const switchContainer = document.createElement('div');
    switchContainer.className = "switch-container";

    const switchLabel = document.createElement('label');
    switchLabel.className = "switch";

    const input = document.createElement('input');
    input.type = "checkbox";
    input.checked = preferenciaModal === 'modales'; // El estado depende de la preferencia guardada

    const slider = document.createElement('span');
    slider.className = "slider round";

    switchLabel.appendChild(input);
    switchLabel.appendChild(slider);

    switchContainer.appendChild(label);
    switchContainer.appendChild(switchLabel);

    // Guardar la preferencia cuando el interruptor cambia de estado
    input.addEventListener('change', function () {
        preferenciaModal = input.checked ? 'modales' : 'typeMessages';
        localStorage.setItem('preferenciaModal', preferenciaModal); // Guardar la preferencia en localStorage
    });

    // Añadir el Filtro de Contenido +18
    const labelFiltro = document.createElement('label');
    labelFiltro.textContent = "Filtro de Contenido +18:";

    const switchFiltroContainer = document.createElement('div');
    switchFiltroContainer.className = "switch-container";

    const switchFiltroLabel = document.createElement('label');
    switchFiltroLabel.className = "switch";

    const inputFiltro = document.createElement('input');
    inputFiltro.type = "checkbox";
    
    const sliderFiltro = document.createElement('span');
    sliderFiltro.className = "slider round";

    switchFiltroLabel.appendChild(inputFiltro);
    switchFiltroLabel.appendChild(sliderFiltro);

    switchFiltroContainer.appendChild(labelFiltro);
    switchFiltroContainer.appendChild(switchFiltroLabel);

    // Evento al activar el Filtro de Contenido +18
    inputFiltro.addEventListener('change', function () {
        if (inputFiltro.checked) {
            activarFiltroContenidoAdulto();
        }
    });

    // Crear botón de cierre del modal
    const closeButton = document.createElement('button');
    closeButton.textContent = "Cerrar";
    closeButton.onclick = function () {
        cerrarModal(modal); // Llama a la función para cerrar el modal
    };

    // Añadir todos los elementos al contenido del modal
    modalContent.appendChild(title);
    modalContent.appendChild(switchContainer);
    modalContent.appendChild(switchFiltroContainer); // Añadir el Filtro de Contenido +18 al modal
    modalContent.appendChild(closeButton);

    // Añadir el contenido al modal
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Mostrar el modal
    modal.style.display = 'block'; // Cambia a bloque para que sea visible
}

// Función para activar el Filtro de Contenido +18
function activarFiltroContenidoAdulto() {
    typeMessage("Hola puto(a), usa comandos y no seas chupapija.");
}


  
// Función para gestionar las notificaciones con botones
function gestionarNotificaciones() {
    try {
        // Crear los botones de acción
        const mensaje = "Selecciona una acción:";
        const modalConfig = {
            titulo: "Configuración de Notificaciones",
            descripcion: "Selecciona una de las siguientes opciones:"
        };

        const botones = [
            { texto: "Permitir Notificaciones", accion: solicitarPermisoNotificaciones },
            { texto: "Crear Notificación", accion: crearNotificacion }
        ];

        // Mostrar el modal o typeMessage con los botones
        mostrarOpcionesConBotones(mensaje, botones, modalConfig);
    } catch (error) {
        mostrarModalErrorComando('gestionarNotificaciones', 'Ocurrió un error al gestionar las notificaciones.', error.message);
    }
}

// Función para mostrar las opciones con botones en modal o en typeMessage
function mostrarOpcionesConBotones(mensaje, botones, modalConfig) {
    if (preferenciaModal === 'modales' && modalConfig) {
        // Modal con botones
        mostrarModalConBotones(modalConfig.titulo, modalConfig.descripcion, botones);
    } else {
        // Mostrar como typeMessage con botones de acción
        let mensajeConBotones = `${mensaje}\n`;
        botones.forEach((boton, index) => {
            mensajeConBotones += `${index + 1}. ${boton.texto}\n`;
        });

        // Enviar el mensaje con los botones
        typeMessage(mensajeConBotones);

        // Esperar la selección del usuario y ejecutar la acción correspondiente
        document.addEventListener('keydown', function(e) {
            const seleccion = parseInt(e.key);
            if (seleccion > 0 && seleccion <= botones.length) {
                botones[seleccion - 1].accion(); // Ejecutar la acción del botón
            }
        });
    }
}

// Función para mostrar un modal con botones
function mostrarModalConBotones(titulo, descripcion, botones) {
    try {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const titleElement = document.createElement('h2');
        titleElement.textContent = titulo;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = descripcion;

        // Añadir botones al modal
        botones.forEach(boton => {
            const botonElement = document.createElement('button');
            botonElement.textContent = boton.texto;
            botonElement.onclick = boton.accion; // Asignar la acción al botón
            modalContent.appendChild(botonElement);
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = "Cerrar";
        closeButton.onclick = function () {
            cerrarModal(modal);
        };

        modalContent.appendChild(titleElement);
        modalContent.appendChild(descriptionElement);
        modalContent.appendChild(closeButton);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        modal.style.display = 'block'; // Muestra el modal
    } catch (error) {
        mostrarModalErrorComando('mostrarModalConBotones', 'Ocurrió un error al mostrar el modal con botones.', error.message);
    }
}

// Función para solicitar permiso de notificaciones
function solicitarPermisoNotificaciones() {
    try {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                responderConPreferencia("Permiso de notificaciones concedido.", {
                    titulo: "Permiso Concedido",
                    descripcion: "¡Ahora puedes crear notificaciones!"
                });
            } else if (permission === "denied") {
                // Si el permiso es denegado, guiar al usuario a habilitarlo manualmente
                responderConPreferencia("Permiso de notificaciones denegado.", {
                    titulo: "Permiso Denegado",
                    descripcion: "Debes permitir las notificaciones en la configuración del navegador para habilitarlas nuevamente. Sigue las instrucciones de tu navegador para activarlas."
                });

                // Mostrar una alerta o modal para guiar al usuario
                mostrarModalAyudaPermiso();
            } else {
                // Si el permiso está en estado 'default', dar opción de volver a intentarlo
                responderConPreferencia("Permiso de notificaciones no otorgado.", {
                    titulo: "Permiso No Otorgado",
                    descripcion: "Puedes intentar permitir las notificaciones nuevamente."
                });
            }
        });
    } catch (error) {
        mostrarModalErrorComando('solicitarPermisoNotificaciones', 'Error al solicitar el permiso de notificaciones.', error.message);
    }
}

// Función para mostrar el modal de ayuda si el permiso es denegado
function mostrarModalAyudaPermiso() {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'help-modal'); // Clase para estilos del modal

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const title = document.createElement('h2');
    title.textContent = "Permiso Denegado";

    const message = document.createElement('p');
    message.textContent = "Para habilitar las notificaciones, sigue estos pasos en la configuración de tu navegador:";

    const steps = document.createElement('ul');
    steps.innerHTML = `
        <li>1. Ve a la configuración de tu navegador.</li>
        <li>2. Busca la sección de notificaciones.</li>
        <li>3. Habilita las notificaciones para este sitio web.</li>
        <li>4. Recarga la página.</li>
    `;

    const closeButton = document.createElement('button');
    closeButton.textContent = "Cerrar";
    closeButton.onclick = function () {
        cerrarModal(modal); // Cierra el modal
    };

    // Añadir los elementos al contenido del modal
    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(steps);
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Mostrar el modal
    modal.style.display = 'block'; // Mostrar modal
}

// Función para cerrar el modal
function cerrarModal(modal) {
    modal.style.display = 'none';
    document.body.removeChild(modal);
}


// Función para cerrar el modal
function cerrarModal(modal) {
    modal.style.display = 'none';
    document.body.removeChild(modal);
}




    
// Lista de comandos en estado "Próximamente"
const comandosProximamente = [
    { nombre: "/juego-aventura", descripcion: "Un juego de aventuras épico con animales de la sabana." },
    { nombre: "/exploracion-oceanica", descripcion: "Explora las profundidades del océano en busca de criaturas misteriosas." },
    { nombre: "/desafio-mental", descripcion: "Pon a prueba tu memoria y habilidades cognitivas con este desafío." }
];

// Función genérica para responder con modal o typeMessage según la preferencia
function responderConPreferencia(mensaje, modalConfig = null) {
    if (preferenciaModal === 'modales' && modalConfig) {
        // Si la preferencia es modal y se ha proporcionado una configuración de modal
        mostrarModal(modalConfig.titulo, modalConfig.descripcion);
    } else {
        // Si la preferencia es typeMessage o no hay modalConfig
        typeMessage(mensaje);
    }
}

// Función para mostrar el próximo comando en estado "Próximamente"
function proximoComando() {
    if (comandosProximamente.length > 0) {
        const comando = comandosProximamente[0]; // Obtiene el próximo comando de la lista
        const mensaje = `El próximo comando en desarrollo es **${comando.nombre}**: ${comando.descripcion}. ¡Mantente atento!`;

        // Configuración del modal
        const modalConfig = {
            titulo: "Próximo Comando",
            descripcion: `El próximo comando en desarrollo es **${comando.nombre}**. Descripción: ${comando.descripcion}`
        };

        // Responder según la preferencia del usuario (modal o typeMessage)
        responderConPreferencia(mensaje, modalConfig);
    } else {
        const mensajeNoComandos = "No hay comandos en estado 'Próximamente' en este momento.";
        responderConPreferencia(mensajeNoComandos);
    }
}

// Función para mostrar el modal con título y descripción
function mostrarModal(titulo, descripcion) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const titleElement = document.createElement('h2');
    titleElement.textContent = titulo;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = descripcion;

    const closeButton = document.createElement('button');
    closeButton.textContent = "Cerrar";
    closeButton.onclick = function () {
        cerrarModal(modal);
    };

    modalContent.appendChild(titleElement);
    modalContent.appendChild(descriptionElement);
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'block'; // Muestra el modal
}

// Función para cerrar el modal
function cerrarModal(modal) {
    modal.style.display = 'none';
    document.body.removeChild(modal);
}

    let localVersion = "0.9.9"; // Versión local actual de tu aplicación
    
    function handleUpdate() {
        typeMessage("Verificando si hay una nueva actualización...");
    
        // URL del archivo version.json en tu repositorio de GitHub Pages
        const versionURL = "https://oceanandwild.github.io/OrangeMonkey-Animal-AI-Script/version.json";
    
    
    
        fetch(versionURL)
            .then(response => response.json())
            .then(data => {
                const remoteVersion = data.version;
    
                if (remoteVersion !== localVersion) {
                    typeMessage(`Nueva versión disponible: ${remoteVersion}.`);
    
                    // Mostrar botón para recargar la página y obtener la nueva versión
                    mostrarBotonActualizar(remoteVersion);
                } else {
                    typeMessage("Estás usando la última versión de Animal AI.");
                }
            })
            .catch(error => {
                console.error("Error al verificar la actualización: " + error.message);
            });
    }
    
    // Función para mostrar el botón de actualización
    function mostrarBotonActualizar(remoteVersion) {
        const updateButton = document.createElement("button");
        updateButton.textContent = "Actualizar Animal AI";
        updateButton.style.padding = "10px";
        updateButton.style.marginTop = "20px";
        updateButton.style.backgroundColor = "#4CAF50";
        updateButton.style.color = "#fff";
        updateButton.style.border = "none";
        updateButton.style.cursor = "pointer";
    
        updateButton.addEventListener("click", () => {
            typeMessage(`Actualizando a la versión ${remoteVersion}...`);
            setTimeout(() => {
                            // Aquí actualizamos la variable de la versión actual a la última versión
                            const newUrl = `${window.location.href}?updated=${new Date().getTime()}`;
                
                            // Forzamos la recarga con el timestamp para evitar caché
                            window.location.href = newUrl;
                
            }, 3000);
        });
    
        chatLog.appendChild(updateButton);
    }
    
    function handlePPOT() {
        const costo = 5.0; // Costo para jugar Piedra, Papel o Tijera (en Dólares de Animal)
        const saldoActual = dolaresAnimal; // Saldo actual de Dólares de Animal
        const deduccion = 5.0; // Deducción de Dólares de Animal si se usa WildCard
        const opciones = ['Piedra', 'Papel', 'Tijera'];
        
        // Mostrar opciones para jugar
        typeMessage('¡Juguemos Piedra, Papel o Tijera! Selecciona tu jugada:');
        
        const btnPiedra = document.createElement('button');
        btnPiedra.textContent = '🪨 Piedra';
        
        const btnPapel = document.createElement('button');
        btnPapel.textContent = '📄 Papel';
        
        const btnTijera = document.createElement('button');
        btnTijera.textContent = '✂️ Tijera';
        
        // Añadir los botones al chat
        const juegoContainer = document.createElement('div');
        juegoContainer.appendChild(btnPiedra);
        juegoContainer.appendChild(btnPapel);
        juegoContainer.appendChild(btnTijera);
        chatLog.appendChild(juegoContainer);
        
        // Agregar eventos a los botones para cada jugada
        btnPiedra.addEventListener('click', function () {
            jugar('Piedra', opciones, costo, saldoActual, deduccion);
        });
        
        btnPapel.addEventListener('click', function () {
            jugar('Papel', opciones, costo, saldoActual, deduccion);
        });
        
        btnTijera.addEventListener('click', function () {
            jugar('Tijera', opciones, costo, saldoActual, deduccion);
        });
    }
    
    function jugar(jugadaUsuario, opciones, costo, saldoActual, deduccion) {
        const jugadaIA = opciones[Math.floor(Math.random() * opciones.length)];
    
        // Realizar la transacción de los Dólares de Animal
        animalPayTransaction(costo, function(transaccionExitosa) {
            if (transaccionExitosa) {
                // La transacción fue exitosa, ahora determinar si ganaste o perdiste
                let resultado;
    
                typeMessage(`✅ Has jugado por $${deduccion.toFixed(2)} Dólares de Animal. Tu saldo actual es: $${saldoActual.toFixed(2)} Dólares de Animal.`);
    
                if (jugadaUsuario === jugadaIA) {
                    typeMessage(`🤝 ¡Empate! Ambos eligieron ${jugadaUsuario}.`);
                } else if (
                    (jugadaUsuario === 'Piedra' && jugadaIA === 'Tijera') ||
                    (jugadaUsuario === 'Papel' && jugadaIA === 'Piedra') ||
                    (jugadaUsuario === 'Tijera' && jugadaIA === 'Papel')
                ) {
                    resultado = 'ganar';
                } else {
                    resultado = 'perder';
                }
    
                if (resultado === 'ganar') {
                    // Ganaste: Se añade una "transacción inversa" de +10.0 Dólares de Animal
                    typeMessage(`🎉 ¡Ganaste! Has ganado $10.00 Dólares de Animal.`);
                    setTimeout(() => {
                        dolaresAnimal += 10.0; // Añadir los 10 Dólares de Animal al saldo
                        typeMessage(`✅ Transacción inversa completada. Tu nuevo saldo es $${dolaresAnimal.toFixed(2)} Dólares de Animal.`);
                        mostrarMonedas();
                    }, 1000);
                } else if (resultado === 'perder') {
                    // Perdiste: Se deducen otros 5.0 Dólares de Animal adicionales
                    setTimeout(() => {
                        typeMessage(`😢 ¡Perdiste! Se te deducirán otros $5.00 Dólares de Animal.`);
                        dolaresAnimal -= 5.0; // Deducir los 5 Dólares adicionales
                        typeMessage(`❌ Has perdido otros $5.00 Dólares de Animal. Tu nuevo saldo es $${dolaresAnimal.toFixed(2)} Dólares de Animal.`);
                        mostrarMonedas();
                    }, 1000);
                }
            } else {
                typeMessage('❌ La transacción falló. No se ha podido realizar la jugada.');
            }
        });
    }
    
    
    function handlelimpiarChat() {
        chatLog.innerHTML = '';
    }
    
    
    
// Función para retirar saldo si el usuario ha iniciado sesión
function handleRetirarSaldoCommand(monto) {
    console.log("Estado de sesión:", tarjetaSesionActiva); // Para depurar la sesión activa

    if (tarjetaSesionActiva !== null) {
        // Obtener la tarjeta con la que se inició sesión
        const tarjeta = tarjetaSesionActiva;
        
        // Validar si la tarjeta existe
        if (tarjetasWildCard[tarjeta] !== undefined) {
            const saldoActual = tarjetasWildCard[tarjeta];

            // Validar si hay saldo suficiente para retirar
            if (saldoActual >= monto) {
                // Restar el monto al saldo
                tarjetasWildCard[tarjeta] -= monto;
                typeMessage(`Has retirado $${monto.toFixed(2)} de la tarjeta ${tarjeta}. Nuevo saldo: $${tarjetasWildCard[tarjeta].toFixed(2)}`);
                console.log(`Has retirado $${monto.toFixed(2)}. Nuevo saldo: $${tarjetasWildCard[tarjeta].toFixed(2)}`);
            } else {
                typeMessage(`Saldo insuficiente. No puedes retirar $${monto.toFixed(2)}. Saldo actual: $${saldoActual.toFixed(2)}`);
                console.log(`Saldo insuficiente. Saldo actual: $${saldoActual.toFixed(2)}`);
            }
        } else {
            typeMessage(`El número de tarjeta ${tarjeta} no existe.`);
            console.log(`La tarjeta ${tarjeta} no existe.`);
        }
    } else {
        typeMessage("Debes iniciar sesión con una tarjeta antes de retirar saldo.");
        console.log("No se ha iniciado sesión. No se puede retirar saldo.");
    }
}



// Función para manejar el comando de saldo
function handleSaldoCommand() {
   
    const chatLog = document.getElementById('chat-log');
    
    typeMessage(`Tu saldo es $${dolaresAnimal.toFixed(2)} Dólares de Animal.`);
    
    // Botón para iniciar sesión en la WildCard
    const cardNumberInput = document.createElement('input');
    cardNumberInput.type = 'text';
    cardNumberInput.placeholder = 'Ingresa el número de la WildCard';
    
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Iniciar sesión';
    loginButton.onclick = () => validateCardLogin(cardNumberInput.value);
    
    const loginContainer = document.createElement('div');
    loginContainer.appendChild(cardNumberInput);
    loginContainer.appendChild(loginButton);
    
    chatLog.appendChild(loginContainer);
}

// Función para validar inicio de sesión en la tarjeta WildCard
function validateCardLogin(cardNumber) {
    if (tarjetasWildCard[cardNumber] !== undefined) {
        tarjetaSesionActiva = cardNumber;
        typeMessage(`Has iniciado sesión con la tarjeta ${cardNumber}. Saldo actual: $${tarjetasWildCard[cardNumber].toFixed(2)} Dólares de Animal.`);
    } else {
        typeMessage("Número de tarjeta inválido. Por favor, inténtalo de nuevo.");
    }
}

    // Función para validar el inicio de sesión en la WildCard
    function validateCardLogin(cardNumber) {
        if (wildCardBalances[cardNumber] !== undefined) {
            typeMessage(`Logged in successfully! Your WildCard balance is ${wildCardBalances[cardNumber]} pesos.`);
            
            // Contenedor de saldo
            const balanceContainer = document.createElement('div');
            
            const rechargeTokensButton = document.createElement('button');
            rechargeTokensButton.textContent = 'Recharge Dolares de Animal';
            rechargeTokensButton.onclick = () => initiateRecharge('tokens');
            
            const rechargeWildCardButton = document.createElement('button');
            rechargeWildCardButton.textContent = 'Recharge WildCard Balance';
            rechargeWildCardButton.onclick = () => initiateRecharge('wildcard');
            
            balanceContainer.appendChild(rechargeTokensButton);
            balanceContainer.appendChild(rechargeWildCardButton);
            chatLog.appendChild(balanceContainer);
        } else {
            typeMessage("Invalid card number. Please try again.");
        }
    }
    
    // Función para iniciar la recarga
    function initiateRecharge(type) {
        const chatLog = document.getElementById("chatLog"); // Asegurar que existe
        typeMessage("Please enter the amount you wish to recharge:");
    
        const inputAmount = document.createElement('input');
        inputAmount.type = 'number';
        inputAmount.placeholder = 'Enter amount';
    
        const submitAmount = document.createElement('button');
        submitAmount.textContent = 'Submit';
        submitAmount.onclick = () => processRecharge(type, inputAmount.value);
    
        const inputContainer = document.createElement('div');
        inputContainer.appendChild(inputAmount);
        inputContainer.appendChild(submitAmount);
    
        chatLog.appendChild(inputContainer);
    }
    
    
    // Función para procesar la recarga
    function processRecharge(type, amount) {
        const amountValue = parseFloat(amount);
        
        if (isNaN(amountValue) || amountValue <= 0) {
            typeMessage("Please enter a valid amount.");
            return;
        }
    
        if (type === 'tokens') {
            if (dolaresAnimal >= amountValue) {
                dolaresAnimal -= amountValue;
                typeMessage(`Redirecting to WhatsApp in 5 seconds...`);
                setTimeout(() => redirectToWhatsApp(amountValue, 'Animal Tokens'), 5000);
            } else {
                typeMessage("Insufficient Animal Tokens for this recharge.");
            }
        } else if (type === 'wildcard') {
            const cardNumber = prompt("Enter your WildCard number for payment:");
            if (wildCardBalances[cardNumber] !== undefined) {
                wildCardBalances[cardNumber] += amountValue; // Suponiendo que se agrega saldo
                typeMessage(`Redirecting to WhatsApp in 5 seconds...`);
                setTimeout(() => redirectToWhatsApp(amountValue, 'WildCard Balance', cardNumber), 5000);
            } else {
                typeMessage("Invalid card number.");
            }
        }
    }
    
    // Función para redirigir a WhatsApp
    function redirectToWhatsApp(amount, type, cardNumber) {
        const message = `Hola, quisiera comprar ${amount} de ${type}, me gustaría pagar con ${cardNumber ? cardNumber : 'mi número de tarjeta'}.`;
        const whatsappUrl = `https://wa.me/598099685536?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    
    // Datos de tarjetas válidas
    const validCards = {
        WildCard: [
            { number: '7600123456789012', balance: 50 },
            { number: '7600234567890123', balance: 100 },
            { number: '7600345678901234', balance: 75 },
            { number: '7600456789012345', balance: 200 },
            { number: '7600567890123456', balance: 150 }
        ]
    };
    
    
    
    cmdInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const inputText = cmdInput.value;
    
            // Verificar si el comando ingresado es parte de la recarga
            if (inputText.startsWith('/recharge')) {
                const rechargeAmount = inputText.split(' ')[1]; // Extraer la cantidad de recarga
                if (rechargeAmount) {
                    processRecharge(rechargeAmount);
                } else {
                    typeMessage("Please specify the amount after /recharge.");
                }
            }
    
            // Limpiar el campo de entrada
            cmdInput.value = '';
        }
    });


    
    // Función para validar el correo electrónico
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // Función para enviar correo electrónico de confirmación
    function sendEmailConfirmation(email, metodoPago, cantidad) {
        // Simulación de envío de correo electrónico
        console.log(`Enviando correo a ${email} con los detalles de la transacción: 
        - Método de pago: ${metodoPago}
        - Cantidad: ${cantidad}`);
    }
    
    // CSS para el modal y la animación del círculo
    const styles = document.createElement('style');
    styles.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    
    .modal-content {
        background-color: white;
        margin: 15% auto;
        padding: 20px;
        border-radius: 10px;
        width: 80%;
        text-align: center;
    }
    
/* Contenedor de éxito */
.success-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    animation: fadeIn 0.5s ease-in-out;
}

/* Contenedor del círculo */
.circle-container {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Círculo de éxito */
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid #28a745; /* Verde éxito */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: fillCircle 1.5s forwards ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
}

/* Icono de verificación */
.check-icon {
    font-size: 50px;
    color: #28a745;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    position: relative;
    z-index: 1; /* Asegurarse de que esté por encima del círculo */
}

.show-check {
    opacity: 1;
}

/* Mensaje de éxito */
.success-message {
    font-size: 18px;
    color: #28a745;
    text-align: center;
    margin-top: 10px;
    animation: fadeInUp 1s ease-in-out;
}

/* Botón de cerrar */
.btn-close {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}

.btn-close:hover {
    background-color: #218838;
}

/* Animación de llenado del círculo */
@keyframes fillCircle {
    from {
        border-color: #ccc;
        transform: scale(0.8);
    }
    to {
        border-color: #28a745;
        transform: scale(1);
    }
}

/* Animación de desvanecimiento */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Animación de desvanecimiento con subida */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

    
   .btn-animal-tokens {
    background-color: #4CAF50; /* Color verde */
    color: white;
    padding: 8px 16px; /* Reducido el padding */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px; /* Tamaño de fuente reducido */
    transition: background-color 0.3s;
}

.btn-animal-tokens:hover {
    background-color: #45a049; /* Color verde más oscuro al pasar el mouse */
}

    `;
    document.head.appendChild(styles);
    
    
    
    function handleComprarArticulo() {
        const costoArticulo = 30;
        const dolaresAnimal = dolaresAnimal;
        const deduccionWildCard = 25;
        
        // Ejecutar la transacción con la opción de WildCard habilitada
        animalPayTransaction(costoArticulo, dolaresAnimal, deduccionWildCard, true);
    }
    
    
    // Función para ejecutar el comando /servidor
    function ejecutarComandoServidor() {
        iniciarApp(chatLog); // Llamar a iniciarApp cuando se ejecute el comando /servidor
    }
    
    
    
    
    
    // Definir cuáles son comandos premium
    const comandosPremium = ['salvador-de-animales', 'servidor', 'caza-megalodon', 'desastres-naturales'];
    
    // Lista de usuarios con sus suscripciones
    const usuariosSuscripciones = {
        // Simulamos un usuario con una suscripción activa
        'usuarioEjemplo': {
            suscripcionPremium: false,  // true si tiene suscripción premium, false si no
            fechaExpiracion: new Date('2024-10-20') // Fecha en que expira la suscripción
        }
    };
    
    // Función para verificar si el usuario tiene una suscripción premium activa
    function verificarSuscripcion(usuario) {
        const suscripcion = usuariosSuscripciones[usuario];
    
        // Si no tiene registro, no tiene suscripción
        if (!suscripcion) {
            return false;
        }
    
        // Verificar si la suscripción ha expirado
        const hoy = new Date();
        return suscripcion.suscripcionPremium && hoy <= suscripcion.fechaExpiracion;
    }
    
    // Función para agregar la suscripción
    function activarSuscripcion(usuario, codigo) {
        // El código debe coincidir con un código que hayas proporcionado manualmente
        const codigoCorrecto = "094891";  // Puedes cambiar este código a lo que quieras
    
        if (codigo === codigoCorrecto) {
            // Activar la suscripción por un mes
            usuariosSuscripciones[usuario] = {
                suscripcionPremium: true,
                fechaExpiracion: new Date(new Date().setMonth(new Date().getMonth() + 1)) // Un mes de suscripción
            };
            typeMessage(`¡Suscripción premium activada para ${usuario}!`);
            return true;
        } else {
            typeMessage("Código incorrecto. No se ha podido activar la suscripción.");
            return false;
        }
    }
    
    

    let ultimaAccion = Date.now(); // Guardamos el tiempo de la última acción
    let timeoutId; // Variable para almacenar el ID del temporizador
    const estadoDiv = document.getElementById('estado-usuario'); // Asignamos el estado a la variable aquí
    const input = document.getElementById('chat-input'); // Referencia al input
    

        // Función para actualizar el estado del usuario
        function actualizarEstadoUsuario() {
            const tiempoDesdeUltimaAccion = Date.now() - ultimaAccion;
            
            if (tiempoDesdeUltimaAccion <= 3000) {
                estadoDiv.innerText = "En línea"; // Si la última acción fue en los últimos 30 segundos
            } else {
                const fecha = new Date(ultimaAccion);
                estadoDiv.innerText = `Últ. vez: ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`; // Formato de fecha y hora
            }
        }
    



// Función para ejecutar un comando desbloqueado
function ejecutarComando(comando) {
    const container = document.getElementById('container'); 
    const comandoSinSlash = comando.startsWith("/") ? comando.substring(1) : comando;
    
    // Verificar si el comando está desbloqueado en el Camino Ecológico
    if (!comandosDesbloqueados[comando]) {
        typeMessage(`El comando "${comando}" no está desbloqueado en el Camino Ecológico. Desbloquéalo antes de ejecutarlo.`);
        return; // Terminar la ejecución si el comando no está desbloqueado
    }

    if (commands[comandoSinSlash]) {
        commands[comandoSinSlash](container);
    } else {
        typeMessage(`Animal AI no reconoció este comando: "/${comandoSinSlash}".`);
    }
}

        // Función para manejar el inicio de un comando
        function iniciarComando() {
            estadoDiv.innerText = "Escribiendo..."; // Cambiar el estado a "Escribiendo..."
            ultimaAccion = Date.now(); // Actualizar la última acción
            clearTimeout(timeoutId); // Limpiar el temporizador de inactividad
            actualizarEstadoUsuario(); // Actualizar el estado
        }
    
        // Evento para detectar la entrada en el campo de texto
        input.addEventListener("input", function() {
            const tiempoDesdeUltimaAccion = Date.now() - ultimaAccion;
    
            // Si el usuario interactúa y está en "En línea", cambia a "Escribiendo..."
            if (tiempoDesdeUltimaAccion <= 30000) {
                if (input.value) {
                    estadoDiv.innerText = "Escribiendo..."; // Cambiar el estado a "Escribiendo..."
                } else {
                    estadoDiv.innerText = "En línea"; // Si no hay texto, se mantiene "En línea"
                }
            } else {
                const fecha = new Date(ultimaAccion);
                estadoDiv.innerText = `Últ. vez: ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`; // Actualizar el estado si ha pasado más de 30 segundos
            }
        });
    
        // Evento para manejar el envío del comando
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter" && input.value.trim()) {
                ejecutarComando(input.value.trim()); // Ejecutar el comando si se presiona Enter
                input.value = ""; // Limpiar el campo de entrada después de ejecutar el comando
            }
        });
    
        // Inicializar el estado del usuario al cargar la página
        actualizarEstadoUsuario();
    
        
    function notRecognizedCommand() {
        typeMessage("Este comando no existe");
    }
    
    

    function typeMessage(message, options = {}, callback) {
        const chatLog = document.getElementById('chat-log');
    
        // Verificar si chatLog existe
        if (!chatLog) {
            console.error("Chat log element not found");
            return;
        }
    
    
        // Asegúrate de que el mensaje no esté vacío
        if (message) {
            let index = 0;
    
            // Crear el contenedor del mensaje sin burbuja
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("message-container", options.className || "user");
            chatLog.appendChild(messageContainer); // Agregar al chatLog
    
            // Crear el ícono de círculo que seguirá el texto
            const icon = document.createElement("span");
            icon.classList.add("typing-circle");
            messageContainer.appendChild(icon);
    
            function type() {
                if (index < message.length) {
                    messageContainer.textContent = message.substring(0, index + 1); // Mostrar el texto en el contenedor
                    messageContainer.appendChild(icon); // Reposicionar el ícono al final
    
                    index++;
    
                    
    
                    // Usar una velocidad de tipado variable para dar un efecto más natural
                    const typingSpeed = options.typingSpeed || 50;
                    const variableSpeed = typingSpeed + Math.floor(Math.random() * 20); // Velocidad variable
    
                    setTimeout(type, variableSpeed);
                } else {
                    // Eliminar el ícono de tipado con un pequeño retraso y animación
                    setTimeout(() => {
                        icon.classList.add('fade-out');
                        setTimeout(() => {
                            icon.remove();
                        }, 300); // Tiempo para completar la animación de salida
                    }, 300);
    
                    // Si hay una función de callback al final
                    if (options.input && typeof callback === "function") {
                        showResponseInput(chatLog, callback);
                    }
                }
            }
    
            // Iniciar la animación de escritura
            setTimeout(type, options.initialDelay || 0);
        } else {
            console.warn("No message provided to typeMessage.");
        }
    
        // Agregar la imagen si se proporciona
        if (options.image) {
            const img = document.createElement('img');
            img.src = options.image;
            img.alt = 'Emoji';
            img.classList.add('emoji-image'); // Asegúrate de tener un CSS para .emoji-image si deseas estilizar
            messageContainer.appendChild(img);
        }
    }

    // Estilos CSS actualizados
const style = document.createElement('style');
style.innerHTML = `
/* Estilo para el contenedor del mensaje */
.message-container {
    background-color: #cce7ff;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    max-width: 75%;
    font-family: 'Quicksand', sans-serif;
    font-size: 15px;
    color: #4a90e2; /* Azul oscuro para las letras */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

/* Cuando el usuario escribe */
.message-container.user {
    background-color: #cce7ff;
}

/* Sistema */
.message-container.system {
    background-color: #f5f5f5;
    color: #4a90e2; /* Azul oscuro para las letras del sistema */
}

/* Indicador de tipado */
.typing-circle {
    display: inline-block;
    height: 10px;
    width: 10px;
    background-color: #3498db;
    border-radius: 50%;
    margin-left: 5px;
    animation: bounceAlt 0.5s infinite alternate;
}

@keyframes bounceAlt {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-6px);
    }
}

/* Animación para desvanecerse */
.fade-out {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
}

/* Imagen de emoji */
.emoji-image {
    max-width: 20px;
    margin-left: 10px;
}
`;
document.head.appendChild(style);  

    
    
    
        function processInput(event) {
            if (event.key === 'Enter') {
                const userInput = event.target.value.trim();
                event.target.value = ''; // Limpiar el input
    
                if (isAwaitingInput && currentCommand) {
                    verificarRespuesta(userInput); // Verificar respuesta si estamos esperando entrada
                    return;
                }
    
                if (userInput.startsWith("/")) {
                    ejecutarComando(userInput.substring(1)); // Ejecutar comando si comienza con "/"
                    return;
                }
    
                
            }
        }
    
        // Refugios disponibles
    const refugios = {
        'Selva Tropical': {
            animales: [],
            mejoras: [],
            estado: 'Bueno',
            capacidad: 5,
            tokensNecesarios: 10,
        },
        'Sabana': {
            animales: [],
            mejoras: [],
            estado: 'Moderado',
            capacidad: 8,
            tokensNecesarios: 15,
        },
        'Ártico': {
            animales: [],
            mejoras: [],
            estado: 'Crítico',
            capacidad: 4,
            tokensNecesarios: 20,
        }
    };
    
    function handleRefugioAnimalesCommand() {
        // Mostrar la lista de refugios usando typeMessage
        typeMessage('🌿 Refugios Disponibles:');
        for (const refugio in refugios) {
            typeMessage(`- ${refugio} (Estado: ${refugios[refugio].estado}, Capacidad: ${refugios[refugio].capacidad}, Animales: ${refugios[refugio].animales.length})`);
        }
    
        // Crear input para que el usuario elija un refugio
        const inputRefugio = document.createElement('input');
        inputRefugio.setAttribute('placeholder', 'Escribe el refugio (Selva Tropical, Sabana, Ártico)');
        chatLog.appendChild(inputRefugio);
    
        // Crear botón para seleccionar el refugio
        const btnElegirRefugio = document.createElement('button');
        btnElegirRefugio.textContent = 'Elegir Refugio';
        chatLog.appendChild(btnElegirRefugio);
    
        btnElegirRefugio.addEventListener('click', function () {
            const refugioElegido = inputRefugio.value.trim();
    
            if (refugios[refugioElegido]) {
                const refugio = refugios[refugioElegido];
                const animalesSalvados = ['León', 'Tigre', 'Oso Polar', 'Elefante'];
    
                // Verificar si hay espacio en el refugio
                if (refugio.animales.length < refugio.capacidad) {
                    typeMessage(`Has salvado los siguientes animales: ${animalesSalvados.join(', ')}.`);
    
                    // Crear input para seleccionar el animal
                    const inputAnimal = document.createElement('input');
                    inputAnimal.setAttribute('placeholder', 'Escribe el animal a enviar (León, Tigre, Oso Polar, Elefante)');
                    chatLog.appendChild(inputAnimal);
    
                    // Crear botón para enviar el animal
                    const btnEnviarAnimal = document.createElement('button');
                    btnEnviarAnimal.textContent = 'Enviar Animal';
                    chatLog.appendChild(btnEnviarAnimal);
    
                    btnEnviarAnimal.addEventListener('click', function () {
                        const animalElegido = inputAnimal.value.trim();
    
                        if (animalesSalvados.includes(animalElegido)) {
                            refugio.animales.push(animalElegido);
                            typeMessage(`✅ ¡Has enviado un ${animalElegido} al refugio ${refugioElegido}!`);
                            animalesSalvados.splice(animalesSalvados.indexOf(animalElegido), 1);  // Remover animal de la lista de salvados
                        } else {
                            typeMessage('❌ No tienes ese animal para enviar.');
                        }
    
                        inputAnimal.value = ''; // Limpiar input
                    });
    
                } else {
                    typeMessage(`❌ El refugio ${refugioElegido} está lleno.`);
                }
            } else {
                typeMessage('❌ Refugio no reconocido.');
            }
    
            inputRefugio.value = '';  // Limpiar input
        });
    }
    
    
    
    function handleMejorarRefugioCommand() {
        // Crear input para que el usuario elija un refugio
        typeMessage('Escribe el nombre del refugio que quieres mejorar:');
        const inputRefugio = document.createElement('input');
        inputRefugio.setAttribute('placeholder', 'Escribe el refugio a mejorar (Selva Tropical, Sabana, Ártico)');
        chatLog.appendChild(inputRefugio);
    
        // Crear botón para seleccionar el refugio
        const btnMejorarRefugio = document.createElement('button');
        btnMejorarRefugio.textContent = 'Mejorar Refugio';
        chatLog.appendChild(btnMejorarRefugio);
    
        btnMejorarRefugio.addEventListener('click', function () {
            const refugioElegido = inputRefugio.value.trim();
    
            if (refugios[refugioElegido]) {
                const refugio = refugios[refugioElegido];
                const tokensActuales = 20; // Simulación de tokens disponibles
    
                // Comprobar si el usuario tiene tokens suficientes para mejorar el refugio
                if (tokensActuales >= refugio.tokensNecesarios) {
                    refugio.mejoras.push('Mejora de instalaciones');
                    refugio.estado = 'Excelente';
                    typeMessage(`✅ ¡Has mejorado el refugio ${refugioElegido}! Estado actual: ${refugio.estado}`);
                } else {
                    typeMessage(`❌ No tienes suficientes tokens. Se necesitan ${refugio.tokensNecesarios}.`);
                }
            } else {
                typeMessage('❌ Refugio no reconocido.');
            }
    
            inputRefugio.value = '';  // Limpiar input
        });
    }
    
    

    
    

    
    // Función para manejar el comando /caza-megalodon
    function handleCazaMegalodon() {
        typeMessage("Te has embarcado en una caza épica. ¡Un Megalodón ha sido avistado en las profundidades! ¿Estás listo para enfrentarlo?");
        
        const opciones = ["Defenderse", "Atacar", "Esconderse", "Usar Señuelos"];
    
        // Mostrar opciones en tiempo real y esperar la elección del jugador
        mostrarOpciones(opciones);
    }
    
    // Función para mostrar opciones en tiempo real y esperar la elección del jugador
    function mostrarOpciones(opciones) {
        const container = document.createElement('div');
        container.classList.add('opciones-container');
    
        opciones.forEach(opcion => {
            const button = document.createElement('button');
            button.innerText = opcion;
            button.addEventListener('click', () => {
                ejecutarAccion(opcion);
                container.remove(); // Eliminar las opciones una vez que se hace la elección
            });
            container.appendChild(button);
        });
    
        chatLog.appendChild(container); // Mostrar las opciones en el chat
    }
    
    
    // Función para realizar acciones basadas en la elección del jugador
    function ejecutarAccion(eleccion) {
        switch (eleccion) {
            case "Defenderse":
                defenderse();
                break;
            case "Atacar":
                atacar();
                break;
            case "Esconderse":
                esconderse();
                break;
            case "Usar Señuelos":
                usarSeñuelos();
                break;
            default:
                typeMessage("Elección inválida. La caza ha terminado.");
                break;
        }
    }
    
    let vidaJugador = 100; // Vida inicial del jugador
    let vidaMegalodon = 150; // Vida inicial del Megalodón
    
    // Función para realizar acciones basadas en la elección del jugador
    function defenderse() {
        const dañoRecibido = Math.floor(Math.random() * 20) + 5; // Daño aleatorio entre 5 y 25
        const bloqueado = Math.random() < 0.5; // 50% de probabilidades de bloquear el ataque
    
        if (bloqueado) {
            typeMessage("¡Has bloqueado el ataque del Megalodón, no recibiste daño!");
        } else {
            vidaJugador -= dañoRecibido;
            typeMessage(`Intentaste defenderte, pero el ataque del Megalodón te alcanzó. Recibes ${dañoRecibido} puntos de daño. Vida actual: ${vidaJugador}.`);
        }
    
        comprobarEstadoJugador();
    }
    
    function atacar() {
        const dañoMegalodon = Math.floor(Math.random() * 30) + 10; // Daño aleatorio entre 10 y 40
        vidaMegalodon -= dañoMegalodon;
        typeMessage(`Has atacado al Megalodón, causándole ${dañoMegalodon} puntos de daño. Vida del Megalodón: ${vidaMegalodon}.`);
    
        // El Megalodón ataca de vuelta
        if (vidaMegalodon > 0) {
            const dañoRecibido = Math.floor(Math.random() * 20) + 5; // Daño entre 5 y 25
            vidaJugador -= dañoRecibido;
            typeMessage(`El Megalodón contraataca, causándote ${dañoRecibido} puntos de daño. Vida actual: ${vidaJugador}.`);
            comprobarEstadoJugador();
        } else {
            typeMessage("¡Has derrotado al Megalodón! La caza ha sido un éxito.");
            ganarTokens(10); // Ganar 10 Animal Tokens por victoria
        }
    }
    
    function esconderse() {
        const encontrado = Math.random() < 0.3; // 30% de probabilidades de que el Megalodón te encuentre
    
        if (encontrado) {
            const dañoRecibido = Math.floor(Math.random() * 20) + 10; // Daño entre 10 y 30
            vidaJugador -= dañoRecibido;
            typeMessage(`Intentaste esconderte, pero el Megalodón te encontró. Recibes ${dañoRecibido} puntos de daño. Vida actual: ${vidaJugador}.`);
        } else {
            typeMessage("Te has escondido con éxito. El Megalodón no te encuentra.");
        }
    
        comprobarEstadoJugador();
    }
    
    function usarSeñuelos() {
        const distraido = Math.random() < 0.6; // 60% de probabilidades de distraer al Megalodón
    
        if (distraido) {
            typeMessage("El Megalodón ha sido distraído. ¡Aprovecha para atacar o escapar!");
        } else {
            const dañoRecibido = Math.floor(Math.random() * 15) + 5; // Daño entre 5 y 20
            vidaJugador -= dañoRecibido;
            typeMessage(`Los señuelos no funcionaron. El Megalodón te ha atacado, recibiendo ${dañoRecibido} puntos de daño. Vida actual: ${vidaJugador}.`);
        }
    
        comprobarEstadoJugador();
    }
    
    // Función para verificar si el jugador ha sido derrotado
    function comprobarEstadoJugador() {
        if (vidaJugador <= 0) {
            typeMessage("¡Has sido derrotado por el Megalodón!");
            ofrecerRevivir(); // Ofrecer la opción de revivir con Animal Tokens
        } else if (vidaJugador > 0 && vidaMegalodon > 0) {
            typeMessage("¿Qué deseas hacer ahora? Defenderse, Atacar, Esconderse o Usar Señuelos.");
            mostrarOpciones(["Defenderse", "Atacar", "Esconderse", "Usar Señuelos"]);
        }
    }
    
    // Función para ofrecer revivir al jugador gastando Animal Tokens
    function ofrecerRevivir() {
        if (dolaresAnimal >= 25) {
            const revivir = confirm("¿Deseas gastar 25 Dolares de Animal para revivir?");
    
            if (revivir) {
                dolaresAnimal -= 25;
                vidaJugador = 50; // Revivir con 50 puntos de vida
                typeMessage(`Has revivido utilizando 25 Dolares de Animal. Te quedan ${dolaresAnimal.toFixed(2)}  Dolares de Animal. Vida actual: ${vidaJugador}.`);
                mostrarOpciones(["Defenderse", "Atacar", "Esconderse o Usar Señuelos"]);
            } else {
                typeMessage("Has decidido no revivir. La caza ha terminado.");
            }
        } else {
            typeMessage("No tienes suficientes Animal Tokens para revivir. La caza ha terminado.");
        }
    }
    
    // Función para ganar Animal Tokens tras una victoria
    function ganarTokens(cantidad) {
        dolaresAnimal += cantidad;
        typeMessage(`¡Has ganado ${cantidad} Animal Tokens! Total actual: ${dolaresAnimal.toFixed(2)} `);
    }
    
    // Define the card variable with an initial balance
    const card = {
        balance: 50 // Initial balance of the card
      };
      
 
    

    
    
// Función para iniciar la revisión del JSON y mostrar la actualización disponible
function iniciarInstalacion() {
    fetch('https://oceanandwild.github.io/NVA-Animal-AI/version.txt')
        .then(response => response.json())
        .then(data => {
            // Verificar si hay una nueva actualización disponible
            if (data.nuevaActualizacionDisponible) {
                // Crear el mensaje de actualización
                const mensaje = document.createElement('div');
                mensaje.innerHTML = "¡Nueva Actualización Disponible!";
                chatLog.appendChild(mensaje);

                // Crear el botón para redirigir a la página de actualización
                const botonActualizacion = document.createElement('button');
                botonActualizacion.innerText = "Ver Actualización";
                chatLog.appendChild(botonActualizacion);

                // Evento para redirigir al hacer clic
                botonActualizacion.addEventListener('click', () => {
                    window.location.href = data.urlActualizacion; // Redirige a la URL especificada en el JSON
                });
            }
        })
        .catch(error => {
            console.error("Error al obtener el archivo JSON:", error);
        });
}

// Llamada a la función
iniciarInstalacion();


// Función para guardar el mensaje de bienvenida en IndexedDB
function saveWelcomeMessage(message) {
    const request = indexedDB.open("chatDatabase", 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        // Crea el almacén de objetos solo si no existe
        if (!db.objectStoreNames.contains("messages")) {
            db.createObjectStore("messages", { keyPath: "id" });
        }
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("messages", "readwrite");
        const store = transaction.objectStore("messages");
        store.put({ id: 1, text: message });

        transaction.oncomplete = function() {
            console.log("Mensaje guardado en IndexedDB");
        };

        transaction.onerror = function(event) {
            console.error("Error al guardar en IndexedDB:", event.target.error);
        };
    };

    request.onerror = function(event) {
        console.error("Error al abrir IndexedDB:", event.target.error);
    };
}

// Función para mostrar el mensaje de bienvenida
function showWelcomeMessage() {
    const message = "¡Bienvenido de Nuevo!";
    const chatLog = document.getElementById("chatLog");

    // Verifica si el contenedor existe
    if (!chatLog) {
        console.error("El contenedor de chat no se encontró.");
        return;
    }

    const welcomeMessage = document.createElement("div");

    welcomeMessage.innerText = message;
    welcomeMessage.className = "welcome-message";

    // Agregar el mensaje al chat
    chatContainer.appendChild(welcomeMessage);
    console.log("Mensaje de bienvenida agregado al chat log."); // Mensaje de depuración

    // Guardar el mensaje en IndexedDB
    saveWelcomeMessage(message);

    // Usar setTimeout para la animación
    setTimeout(() => {
        welcomeMessage.classList.add("show"); // Añadir la clase para mostrar la animación
    }, 100); // Esperar un poco antes de mostrar
}

// Llamar a la función para mostrar el mensaje de bienvenida al cargar
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded: mostrando mensaje de bienvenida.");
    showWelcomeMessage();
});


const modelosIA = [
    { nombre: 'Animal AI BETA', descripcion: 'IA para lo básico', costo: 0, funcionalidad: () => typeMessage('Animal AI BETA activado. Funcionalidades básicas disponibles.') },
    { nombre: 'Animal AI Pro', descripcion: 'Para tareas más complejas.', costo: 20, funcionalidad: () => typeMessage('Animal AI Pro activado. Tareas avanzadas listas para ejecutarse.') },
    { nombre: 'Animal AI Infinity', descripcion: 'Te permite crear comandos, pedirlos y tenerlos en un par de horas.', costo: 50, funcionalidad: handleInfinityFuncionalidad },
    { nombre: 'Animal AI X-Gen', descripcion: 'Gana Dolares de Animal cada 1 Hora!', costo: 30, funcionalidad: handleXGenFuncionalidad },
    { nombre: 'Animal AI X-Gen Plus', descripcion: 'Gana Dolares de Animal cada 30 Minutos!', costo: 75, funcionalidad: handleXGenFuncionalidad },
    // Nuevo modelo: Animal AI Ultra
    { nombre: 'Animal AI Ultra', descripcion: 'Soporte prioritario y personalización avanzada.', costo: 200, funcionalidad: handleUltraFuncionalidad }
];

    
    
    
    // Función para mostrar las opciones al usuario
    function mostrarOpciones(opciones) {
        const mensaje = "Selecciona un modelo de IA:";
        typeMessage(mensaje);
        
        opciones.forEach((opcion) => {
            // Aquí puedes implementar la lógica para mostrar botones en la interfaz
            console.log(`- ${opcion.texto}`);
            // Si usas una función para crear botones, llámala aquí
            // crearBoton(opcion.texto, opcion.callback);
        });
    }
    
    
    // Comando para seleccionar un modelo de IA
    function handleSeleccionarModeloIA() {
        const opcionesTexto = modelosIA.map((modelo) => {
            return `${modelo.nombre}: ${modelo.descripcion} (Costo: ${modelo.costo} Animal Tokens)`;
        }).join('\n');
    
        // Mostrar las opciones como un prompt
        const seleccion = prompt(`Selecciona un modelo de IA:\n${opcionesTexto}`);
        const modeloSeleccionado = modelosIA.find(modelo => modelo.nombre.toLowerCase() === seleccion.toLowerCase());
    
        if (modeloSeleccionado) {
            seleccionarModelo(modeloSeleccionado);
        } else {
            typeMessage('❌ Selección no válida. Por favor, intenta de nuevo.');
        }
    }
    
    // Función para manejar la selección del modelo
    function seleccionarModelo(modelo) {
        typeMessage(`Has seleccionado: ${modelo.nombre}. Costo: ${modelo.costo} Dolares de Animal.`);
        
        // Verifica si el saldo es suficiente antes de realizar la transacción
        if (dolaresAnimal >= modelo.costo) {
            // Llama a la función de transacción para pagar por el modelo
            animalPayTransaction(modelo.costo, dolaresAnimal, modelo.costo, true, (transaccionExitosa) => {
                if (transaccionExitosa) {
                    // La transacción fue exitosa, el saldo ya ha sido deducido en animalPayTransaction
                    typeMessage(`✅ Has adquirido ${modelo.nombre} exitosamente! Se han removido ${modelo.costo} Dolares de Animal de tu saldo. Tu saldo actual es: ${dolaresAnimal.toFixed(2)}  Dolares de Animal.`);
                    mostrarMonedas();
                    // Ejecutar la funcionalidad específica del modelo seleccionado
                    modelo.funcionalidad();
                } else {
                    typeMessage('❌ La transacción falló. No se ha adquirido el modelo.');
                }
            });
        } else {
            typeMessage('❌ No tienes suficientes Animal Tokens para realizar esta compra.');
        }
    }
    
    
    // Funcionalidad específica para Animal AI Infinity
    function handleInfinityFuncionalidad() {
        typeMessage("Si quieres crear un comando, envía a +598 099 685 536 una captura de la transacción completada y el nombre del comando (con el prefijo '/' incluido al principio). También incluye la descripción de lo que hará el comando (di todos los detalles, incluso los menos explícitos). En unas horas actualizaremos la app con el nuevo comando.");
    }
    
    // Funcionalidad específica para Animal AI X-Gen
    function handleXGenFuncionalidad() {
        typeMessage("Si quieres crear un comando, envía a +598 099 685 536 una captura de la transacción completada, el nombre del comando (con el prefijo '/' incluido al principio), y la descripción detallada de lo que hará el comando. Además, selecciona uno de los estados disponibles para tu comando. En unas horas actualizaremos la app con el nuevo comando y el estado que elegiste.");
    }
    
    // Funcionalidad específica para Animal AI Master
function handleUltraFuncionalidad() {
    typeMessage("Bienvenido a Animal AI Master. Con este nivel, tienes acceso a personalización avanzada y soporte prioritario. Para solicitar asistencia, envía un mensaje a +598 099 685 536 con tu usuario y las características que te gustaría que mejoremos. Recibirás una respuesta prioritaria en alrededor de 1 dia o mas.");
}

    
    
    
    
    const paisesAceptadosBeta = ["Argentina", "España", "México", "Colombia", "Chile", "Uruguay"];
    
    
    function solicitarPaisUsuario() {
        const paisUsuario = prompt("Por favor, ingresa tu país:");
    
        if (validarPaisBeta(paisUsuario)) {
            typeMessage(`Bienvenido a Animal AI, Animal AI Version BETA está disponible en ${paisUsuario}. ¡Disfruta!`);
            setTimeout(() =>{
               chatLog.innerHTML = ""; // Limpiar el chat
            }, 8000)
        } else {
            typeMessage(`Lo sentimos, la beta de Animal AI no está disponible en ${paisUsuario}. La app se cerrará.`);
            cerrarApp(); // Función para cerrar la aplicación
        }
    }
    
    function validarPaisBeta(pais) {
        // Verificamos si el país ingresado está en la lista de países aceptados
        return paisesAceptadosBeta.includes(pais);
    }
    
    function cerrarApp() {
        typeMessage("Cerrando Animal AI...");
        setTimeout(() => {
            window.close(); // Cerrar la app o la ventana del navegador
        }, 2000); // Cerrar después de 2 segundos
    }
    
    
    
    
    
    
    // Función para cerrar la app con un mensaje de error
    function cerrarAppConMensaje(mensaje) {
        // Limpiar el chat y mostrar el mensaje de error
        chatLog.innerHTML = "";
        typeMessage(mensaje);
    
        // Simular cierre de la aplicación
        setTimeout(() => {
            alert("La aplicación se ha cerrado.");
            window.close(); // Esto cierra la pestaña (solo en navegadores compatibles)
        }, 2000);
    }
    
    // Función de desinstalación
    function desinstalarApp() {
        cerrarAppConMensaje("Animal AI ha sido desinstalada.");
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function handleLastUpdateCommand() {
        const lastUpdateDate = new Date('2024-09-23T16:05:00'); // Fecha real de la última actualización
        const now = new Date();
        
        const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        
        // Formato de hora
        const formatTime = (date) => {
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const period = hours >= 12 ? 'pm' : 'am';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            return `${formattedHours}:${minutes}${period}`;
        };
    
        // Mismo día
        if (now.toDateString() === lastUpdateDate.toDateString()) {
            const time = formatTime(lastUpdateDate);
            typeMessage(`Última vez hoy a las ${time}`);
        }
        // Ayer
        else if ((now - lastUpdateDate) < 86400000 && lastUpdateDate.getDate() === now.getDate() - 1) {
            const time = formatTime(lastUpdateDate);
            typeMessage(`Última vez ayer a las ${time}`);
        }
        // Dentro de la misma semana
        else if (now.getTime() - lastUpdateDate.getTime() < 604800000) {
            const dayOfWeek = daysOfWeek[lastUpdateDate.getDay()];
            const time = formatTime(lastUpdateDate);
            typeMessage(`Última vez el ${dayOfWeek} a las ${time}`);
        }
        // Hace más de una semana
        else {
            const dayOfWeek = daysOfWeek[lastUpdateDate.getDay()];
            const formattedDate = lastUpdateDate.toLocaleString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            const time = formatTime(lastUpdateDate);
            typeMessage(`Última vez el ${dayOfWeek}, ${formattedDate} a las ${time}`);
        }
    }
    
    
    function handleActualizaciones() {
        // Initial loading message
        typeMessage("Loading update notes, please wait...");
    
        // Simulating loading time
        setTimeout(() => {
            // Update notes using plain text
            const notasActualizacion = `
    📅 Update Notes - September 16, 2024 (Version 1.0.7) 📅
    
    1️⃣ New Event: Coming Soon 🦈
    - With the event of the disasters ended, a coming event will be available soon.
    
    2️⃣ End of the Natural Disasters Event 😨
    - The Natural Disasters event has ended, but not naturally, the event was ending but with errors that prevented its use, while I did not realize that, nor did I look at the forums or communities about that error, and as it happened As expected, the /natural-disasters command was one of the least used throughout September (directly because it could not be used.) Now the command works correctly, the servers were closed showing that it was being repaired. Now my job is to improve the Animal Token Balance system and repair it.
    
    3️⃣ Interface Improvements 🖥️
    - The place where the list of available commands was positioned was changed: Left --> Right
    - Changed the color of some chat bubbles: Normal (White) --> Red
    
    4️⃣ Bug Fixes 🐞
    - Due to errors, the use of the list of available commands was changed: Available Use --> Discontinued (Temporarily due to errors)
    - Due to resizing errors, the chat background color was changed: Black --> White
    
    Thank you for playing and staying up to date with the updates! 🎮
            `;
            typeMessage(notasActualizacion, { className: 'system' });
        }, 3000); // Simulating 3 seconds of waiting before showing the notes
    }
    
    
    // Función para manejar el comando 'crear-blog'
    function handleCrearBlogCommand() {
        // Crear el input para que el usuario ingrese el prompt
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Ingresa tu prompt aquí';
        input.id = 'user-prompt'; // Asignar ID al input
        chatLog.appendChild(input); // Agregar el input al chat log
    
        // Crear el botón para enviar el prompt
        const button = document.createElement('button');
        button.textContent = 'Crear Blog';
        button.id = 'submit-button'; // Asignar ID al botón
        chatLog.appendChild(button); // Agregar el botón al chat log
    
        // Agregar el manejador de eventos al botón
        button.addEventListener('click', () => {
            const userPrompt = input.value; // Captura el valor del input
    
            // Mostrar mensaje de redirección
            typeMessage("Redirigiendo, por favor espere... Esto puede tardar unos segundos.");
    
            // Ocultar el input y el botón de inmediato
            input.style.display = 'none';
            button.style.display = 'none';
    
            // Redirige a WhatsApp con el prompt del usuario después de 2 segundos
            setTimeout(() => {
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(userPrompt)}`; // Crea la URL con el prompt
                window.open(whatsappUrl, '_blank'); // Abre WhatsApp en una nueva pestaña
    
                // Eliminar el input y el botón del DOM
                input.remove();
                button.remove();
            }, 2000); // Espera 2 segundos
        });
    }
    
    
    
    
    
    function handleDesastresNaturales() {
        const desastres = [
            "Terremoto",
            "Huracán",
            "Tsunami",
            "Erupción volcánica",
            "Inundación",
            "Sequía",
            "Tormenta de nieve",
            "Tornado",
            "Deslizamiento de tierra",
            "Incendio forestal"
        ];
    
        const desastreAleatorio = desastres[Math.floor(Math.random() * desastres.length)];
        
        typeMessage(`¡Alerta! Se ha producido un ${desastreAleatorio} en la región.`, { className: 'system' });
    
        setTimeout(() => {
            typeMessage("Iniciando protocolo de emergencia...", { className: 'system' });
        }, 2000);
    
        setTimeout(() => {
            typeMessage("Evacuando a los animales de las zonas afectadas...", { className: 'system' });
        }, 4000);
    
        setTimeout(() => {
            typeMessage("Activando refugios de emergencia...", { className: 'system' });
        }, 6000);
    
        setTimeout(() => {
            typeMessage(`La situación está bajo control. Todos los animales están a salvo del ${desastreAleatorio}.`, { className: 'system' });
        }, 8000);
    
        setTimeout(() => {
            typeMessage("¿Deseas conocer más sobre cómo proteger a los animales en desastres naturales?", { className: 'system' });
        }, 10000);
    }
    
    // Función para manejar el comando /reto-de-pistas
    function handleRetoDePistas() {
        const pistas = [
            "Pista 1: La respuesta está en la naturaleza.",
            "Pista 2: Es un animal que vive en la selva.",
            "Pista 3: Tiene rayas negras y naranjas."
        ];
        let pistaActual = 0;
    
        typeMessage("¡Bienvenido al reto de pistas! Adivina el animal oculto.");
    
        // Mostrar la primera pista
        typeMessage(pistas[pistaActual]);
    
        // Mostrar el input para ingresar respuestas
        const respuestaContainer = document.getElementById("respuesta-container");
        respuestaContainer.classList.remove("hidden");
    
        const input = document.getElementById("cmd-input");
        const button = document.getElementById("sendCMDBtn");
    
        button.addEventListener("click", () => {
            const respuesta = input.value.toLowerCase();
    
            if (respuesta === "tigre") {
                typeMessage("¡Felicidades! Has adivinado el animal oculto.");
            } else {
                typeMessage("Respuesta incorrecta. Inténtalo de nuevo.");
    
                // Mostrar la siguiente pista si hay más disponibles
                pistaActual++;
                if (pistaActual < pistas.length) {
                    typeMessage(pistas[pistaActual]);
                } else {
                    typeMessage("Lo siento, has agotado todas las pistas. ¡Sigue intentándolo!");
                }
            }
    
            // Limpiar el input
            input.value = "";
        });
    }
    
    
    // Función para manejar el nuevo comando
    function handleNuevoComando() {
        const precio = 10; // Precio en Animal Tokens para utilizar el comando
    
        typeMessage(`Para utilizar este comando necesitas pagar una tarifa de ${precio} con tu WildCard. Por favor, ingresa el número de tu tarjeta WildCard:`);
    
        const input = document.createElement('input');
        input.type = 'text';
        const button = document.createElement('button');
        button.textContent = 'Pagar';
        button.addEventListener('click', () => {
            const numeroTarjeta = input.value;
            handlePagoWildCard(numeroTarjeta, precio);
        });
    
        const container = document.createElement('div');
        container.appendChild(input);
        container.appendChild(button);
    
        chatLog.appendChild(container);
    }
    
    // Función para manejar el pago con WildCard
    function handlePagoWildCard(numeroTarjeta, precio) {
        // Aquí se realizaría la lógica para procesar el pago con la tarjeta WildCard
        // y verificar el saldo disponible en la tarjeta
    
        // Ejemplo de verificación de saldo
        const card = validCards.WildCard.find(c => c.number === numeroTarjeta);
    
        if (card) {
            if (card.balance >= precio) {
                card.balance -= precio;
                typeMessage(`Payment successful! Your new balance is $${card.balance}.`);
                ejecutarNuevoComando();
            } else {
                typeMessage('Insufficient balance in the WildCard. Payment cannot be processed.');
            }
        } else {
            typeMessage('Invalid card number. Only WildCard cards are accepted.');
        }
    }
    
    const textosRelacionados = {
        "Introducción": "Animal AI es una aplicación de IA especializada en comandos, es muy vulnerable a errores pero se solucionan, es una app versátil diseñada por Ocean and Wild Uruguay, enfocada en la seguridad y privacidad de los usuarios. También utiliza la tecnología de Ocean and Wild Nature para obtener todo sobre la naturaleza.",
        "Comandos disponibles": "En Animal AI, puedes utilizar los siguientes comandos: \n" +
        "- /resaltar-texto-infoanimalai: Resalta información relacionada con tu pregunta. \n" +
        "- /localizador: Muestra un localizador en tiempo real para detectar enemigos. \n" +
        "- /test-de-inteligencia: Realiza un test de inteligencia y ofrece un resultado. \n" +
        "- /test-de-memoria: Evalúa tu memoria con preguntas relacionadas. \n" +
        "- /desastres-naturales: Inicia un desafío sobre desastres naturales. \n" +
        "Puedes preguntar sobre cualquiera de estos comandos para obtener más detalles.",
    };
    
    // Función para manejar el comando /resaltar-texto-infoanimalai
    function handleResaltarTextoInfoAnimalAI() {
        typeMessage("¿Qué quieres conocer?");
    
        const input = document.getElementById("cmd-input");
        const button = document.getElementById("sendCMDBtn");
    
        button.addEventListener("click", () => {
            const pregunta = input.value.trim();
    
            if (pregunta) {
                const textoRelacionado = encontrarTextoRelacionado(pregunta);
                const textoResaltado = resaltarFraseCompleta(textoRelacionado, pregunta);
    
                // Mostrar el texto resaltado sin animación
                mostrarTextoResaltadoEnChat(textoResaltado);
            }
    
            // Limpiar el input
            input.value = "";
        });
    }
    
    
    // Función para resaltar la frase completa que coincide con la pregunta del usuario
    function resaltarFraseCompleta(texto, pregunta) {
        const preguntaLower = pregunta.toLowerCase();
        const regex = new RegExp(`(${preguntaLower})`, "gi");
    
        // Resaltar solo la frase completa
        return texto.replace(regex, `<mark>$1</mark>`); // Usamos <mark> para resaltar el texto
    }
    
    
    // Función para mostrar el texto directamente en el chat sin animación
    function mostrarTextoResaltadoEnChat(texto) {
        const mensaje = document.createElement('div'); // Crear un nuevo div para el mensaje
        mensaje.innerHTML = texto;  // Asignar el texto con el resaltado directamente
        chatLog.appendChild(mensaje); // Agregar el mensaje al chat
    }
    
    // Función para encontrar el texto relacionado con la pregunta del usuario
    function encontrarTextoRelacionado(pregunta) {
        const preguntaLower = pregunta.toLowerCase();
    
        // Buscar coincidencias en las claves de textosRelacionados
        for (const clave in textosRelacionados) {
            if (preguntaLower.includes(clave.toLowerCase())) {
                return textosRelacionados[clave];
            }
        }
    
        // Buscar coincidencias en el contenido de los textos
        for (const clave in textosRelacionados) {
            if (textosRelacionados[clave].toLowerCase().includes(preguntaLower)) {
                return textosRelacionados[clave];
            }
        }
    
        // Si no encuentra coincidencias, devuelve un mensaje por defecto
        return "No se encontró información relacionada con tu pregunta.";
    }
    
    
    
    
      
    // Función para ejecutar la funcionalidad del nuevo comando
    function ejecutarNuevoComando() {
        // Aquí se ejecutaría la funcionalidad del nuevo comando
        typeMessage('¡Comando ejecutado con éxito!');
    }
    

    
    const comandos = [
        { nombre: "/localizador", estado: "rojo" },
        { nombre: "/saldo", estado: "dorado" },
        { nombre: "/salvador-de-animales", estado: "rojo" },
        { nombre: "/fobias", estado: "pastel" },
        { nombre: "/eventos", estado: "funcionalverde" },
        { nombre: "/crear-cuenta-o-iniciar-sesion", estado: "funcionalverde" },
        { nombre: "/desastres-naturales", estado: "pastel" },
        { nombre: "/desactivar-localizador", estado: "rojo" },
        { nombre: "/reto-de-pistas", estado: "funcionalverde" },
        { nombre: "/actualizaciones", estado: "funcionalverde" },
        { nombre: "/last-update", estado: "funcionalverde" },
        { nombre: "/resaltar-texto-infoanimalai", estado: "ambar" },
        { nombre: "/paquete-de-cartas", estado: "rojo" },
        { nombre: "/caza-megalodon", estado: "pastel" },
        { nombre: "/refugio-animales", estado: "funcionalverde" },
        { nombre: "/mejorar-refugio", estado: "funcionalverde" },
        { nombre: "/eventos-mundiales", estado: "negro" },
        { nombre: "/card-ship", estado: "negro" },
        { nombre: "/salvar-a-la-naturaleza", estado: "turquesa" },
        { nombre: "/movie-playtime", estado: "azul-oscuro" },
        { nombre: "/enfrentamientos", estado: "plateado" },
        { nombre: "/t-rex-friend", estado: "verde-lima" },
        { nombre: "/explora-biomas", estado: "evento" },
        { nombre: "/conservacion", estado: "plateado" },
        { nombre: "/fenomenos-espaciales", estado: "plateado" },
        { nombre: "/supervivencia", estado: "plateado" },
        { nombre: "/lineas", estado: "lila" },
        { nombre: "/generar-blog", estado: "funcionalverde" },
        { nombre: "/PPOT", estado: "de-pago" },
        { nombre: "/limpieza", estado: "funcionalverde" },
        { nombre: "/update", estado: "funcionalverde" },
        { nombre: "/proximo-comando", estado: "funcionalverde" },
        { nombre: "/verificacion-final", estado: "funcionalverde" },
        { nombre: "/pase-de-temporada", estado: "recompensas-incluidas" },
        { nombre: "/comando-existente", estado: "funcionalverde" },
        { nombre: "/resumir-texto", estado: "ambar" },
        { nombre: "/gatitos", estado: "funcionalverde" },
        { nombre: "/reproductor-de-musica", estado: "funcionalverde" },
        { nombre: "/animal-random", estado: "funcionalverde" },
        { nombre: "/intercambio-de-moneda", estado: "recompensas-incluidas" },
        { nombre: "/sombra-asesina", estado: "recompensas-incluidas" },
        { nombre: "/comprar-moneda", estado: "de-pago" },
        { nombre: "/generar-codigo", estado: "administrador" },
        { nombre: "/generar-imagenes", estado: "turquesa" },
        { nombre: "/configuracion", estado: "funcionalverde" },
        { nombre: "/acceder", estado: "verde" },
        { nombre: "/unirse", estado: "verde" },
        { nombre: "/usuarios", estado: "verde" },
        { nombre: "/boss-battle", estado: "verde" },
        { nombre: "/definiciones", estado: "funcionalverde" },
        { nombre: "/frases-motivacionales", estado: "verde" },
        { nombre: "/quiz-animal", estado: "verde" },
        { nombre: "/leyenda-mitica", estado: "verde" },
        { nombre: "/recompensa-diaria/semanal", estado: "recompensas-incluidas" },
        { nombre: "/patch-notes", estado: "funcionalverde" },
        { nombre: "/tienda", estado: "funcionalverde" },
        { nombre: "/proximo-lanzamiento", estado: "funcionalverde" },
        { nombre: "/ultimo-lanzamiento", estado: "funcionalverde" },
        { nombre: "/ver-documentacion", estado: "funcionalverde" },
        { nombre: "/texto-advertencia", estado: "funcionalverde" },
        { nombre: "/enviar-peticion", estado: "funcionalverde" },
        { nombre: "/chequeo-medico", estado: "juego" },
        { nombre: "/lluvia-de-dolares", estado: "recompensas-incluidas" },
        { nombre: "/ADN", estado: "evento" },
        { nombre: "/seleccionar-modelo", estado: "funcionalverde" },
        { nombre: "/intercambiar-adn", estado: "funcionalverde" },
        { nombre: "/ataque-fantasma", estado: "recompensas-incluidas" },
        { nombre: "/animal-ai-research", estado: "juego" },
        { nombre: "/notificaciones", estado: "funcionalverde" },
        { nombre: "/Cria-Calabazas", estado: "juego" },
        { nombre: "/Ectoplasma", estado: "verde" },
        { nombre: "/Calabazas", estado: "verde" },
        { nombre: "/Dulces", estado: "verde" },
        { nombre: "/intercambiar-dulces", estado: "funcionalverde" },
        { nombre: "/intercambiar-calabazas", estado: "funcionalverde" },
        { nombre: "/intercambiar-ectoplasma", estado: "funcionalverde" },
        { nombre: "/caceria-de-dulces", estado: "juego" },
        { nombre: "/minijuegos", estado: "juego" },
        { nombre: "/crear-comandos", estado: "de-pago" },
    ];
    
    




    const estados = {
        "verde": "Disponible",
        "funcionalverde": "Comando Funcional y Disponible.",
        "ambar": "Semi-Funcional",
        "amarillo": "Implementado en una próxima actualización",
        "rojo": "Comando no disponible",
        "pastel": "Comando de Evento",
        "negro": "Comando Descontinuado",
        "naranja-oscuro": "Errores Incluidos. Utilízalo con precaución",
        "dorado": "Comando Reworkeado",
        "azul-oscuro": "Comando en desarrollo",
        "gris": "Comando en mantenimiento",
        "cyan": "Comando Experimental",
        "beige": "Prototipo",
        "plateado": "Comando en espera de aprobación",
        "morado": "Mantenimiento Critico",
        "verde-lima": "Revision Final",
        "turquesa": "Proximamente",
        "lila": "Fase de Pruebas",
        "coral": "Fase Final del Desarrollo",
        "administrador": "Comandos para el usuario con configuraciones solo para administrador",
        "inactivo": "Comando Inactivo Temporalmente",
        "en-observacion": "Comando en observacion, el comando afectado por este estado suele estar en revision extrema para que su funcionalidad no salga perjudicada.",
        "de-pago": "Comando con Transacciones",
        "recompensas-incluidas": "El comando contiene recompensas por participar en un juego, dinamica etc.",
        "juego": "Comando Interactivo"
    };
    
    const descripciones = {
        "verde": "Este comando fiunciona correctamente.",
        "funcionalverde": "Este comando está completamente operativo y listo para ser utilizado, es funcional y sirve como herramienta.",
        "ambar": "El comando funciona parcialmente. Podría tener errores o no estar al 100%.",
        "amarillo": "Este comando será lanzado en una próxima actualización.",
        "rojo": "El comando actualmente no está disponible.",
        "pastel": "Comando exclusivo de un evento especial. Disponible solo durante el evento.",
        "negro": "Este comando ha sido descontinuado y no está disponible.",
        "naranja-oscuro": "Este comando puede tener errores graves. Úsalo bajo tu propio riesgo.",
        "dorado": "Este comando ha sido mejorado y está listo para ser utilizado de nuevo.",
        "azul-oscuro": "Este comando está en fase de desarrollo y no está listo para su uso. Podrían verse algunas características incompletas o experimentar errores importantes. Revisa futuras actualizaciones para obtener una versión estable.",
        "gris": "Este comando está actualmente en mantenimiento y no se puede utilizar. Esté atento a los anuncios para saber cuándo estará disponible nuevamente.",
        "cyan": "Este comando es parte de una fase experimental. Puede contener errores o no funcionar como se espera. Se recomienda usarlo solo si desea probar nuevas características.",
        "beige": "Este comando es un prototipo y no se sabe cuándo será público y si realizará su misma función que cuando estaba en estado prototipo.",
        "plateado": "Este comando esta en espera en la lista de comandos para aprobarlo. Puede que no se incluya en el estado verde u otro estado positivo por ahora.",
        "morado": "Este comando requiere en mantenimiento critico y estara indisponible por un breve rato",
        "verde-lima": "Se decidira el estado para este comando y si sera positivo o negativo.",
        "turquesa": "Este comando está en desarrollo y estará disponible en futuras actualizaciones.",
        "lila": "Este comando está en fase de pruebas y puede estar sujeto a cambios.",
        "coral": "Este comando está en su fase final de desarrollo y su lanzamiento es inminente.",
        "administrador": "Este comando es exclusivo para usuarios con privilegios administrativos y permite gestionar funciones avanzadas del sistema.",
        "inactivo": "Este comando está inactivo y no puede ser utilizado en este momento.",
        "en-observacion": "Este comando está bajo revisión y no se puede utilizar. Se evaluará su funcionalidad antes de decidir su futuro.",
        "de-pago": "Este comando requiere una transacción o suscripción para ser utilizado.",
        "recompensas-incluidas": "Este comando otorga recompensas adicionales al usuario cuando se utiliza.",
        "juego": "Este comando pertenece a la categoría de juegos interactivos. Úsalo para acceder a actividades lúdicas y entretenidas."
    };
    
    const comandosPorPagina = 7;
    // Variables globales
    let paginaActual = 1;
    const totalPaginas = Math.ceil(comandos.length / comandosPorPagina);
    
    // Contar los comandos por estado
    let conteo = {};
    comandos.forEach(comando => {
        if (!conteo[comando.estado]) {
            conteo[comando.estado] = 0;
        }
        conteo[comando.estado]++;
    });
    
    function mostrarComandos(paginaActual) {
        const lista = document.getElementById('command-list');
        lista.innerHTML = ''; // Limpiar la lista
    
        const inicio = (paginaActual - 1) * comandosPorPagina; // Cambiar `pagina` a `paginaActual`
        const fin = Math.min(inicio + comandosPorPagina, comandos.length);
    
        for (let i = inicio; i < fin; i++) {
            const comando = comandos[i];
            const li = document.createElement('li');
            li.classList.add(`estado-${comando.estado}`);
            li.textContent = comando.nombre;
    
            // Evento hover para mostrar el panel de información
            li.addEventListener('mouseenter', (event) => mostrarPanelComando(event, comando));
            li.addEventListener('mouseleave', ocultarPanelComando);
    
            lista.appendChild(li);
        }
    
        // Actualizar la paginación
        document.getElementById('pagina-actual').textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
        // Mostrar el conteo de comandos por estado
        mostrarConteoPorEstado();
    }
    
    
    // Inicializar la lista mostrando la primera página
    mostrarComandos(paginaActual);
    
    
    
    
    
    
    
    
    
    
    
        function mostrarConteoPorEstado() {
            
            estadoConteoDiv.innerHTML = `
            <div class="estado-conteo-grid">
                    <div class="estado-item estado-verde">
                        <span class="estado-icon">✅</span> 
                        <span class="estado-text">Verde (Disponible):</span> 
                        <span class="estado-valor">${conteo.verde || 0}</span>
                    </div>
                <div class="estado-conteo-grid">
                    <div class="estado-item estado-funcionalverde">
                        <span class="estado-icon">✅+⚙️</span> 
                        <span class="estado-text">Verde + Funcional (Disponible y Funcional):</span> 
                        <span class="estado-valor">${conteo.funcionalverde || 0}</span>
                    </div>
                    <div class="estado-item estado-dorado">
                        <span class="estado-icon">✨</span> 
                        <span class="estado-text">Dorado (Comando Reworkeado):</span> 
                        <span class="estado-valor">${conteo.dorado || 0}</span>
                    </div>
                    <div class="estado-item estado-rojo">
                        <span class="estado-icon">❌</span> 
                        <span class="estado-text">Rojo (No Disponible):</span> 
                        <span class="estado-valor">${conteo.rojo || 0}</span>
                    </div>
                    <div class="estado-item estado-pastel">
                        <span class="estado-icon">🎉</span> 
                        <span class="estado-text">Pastel (Evento):</span> 
                        <span class="estado-valor">${conteo.pastel || 0}</span>
                    </div>
                    <div class="estado-item estado-ambar">
                        <span class="estado-icon">⚠️</span> 
                        <span class="estado-text">Ámbar (Semi-Funcional):</span> 
                        <span class="estado-valor">${conteo.ambar || 0}</span>
                    </div>
                    <div class="estado-item estado-naranja-oscuro">
                        <span class="estado-icon">🚨</span> 
                        <span class="estado-text">Naranja Oscuro (Errores Incluidos):</span> 
                        <span class="estado-valor">${conteo["naranja-oscuro"] || 0}</span>
                    </div>
                    <div class="estado-item estado-negro">
                        <span class="estado-icon">🔒</span> 
                        <span class="estado-text">Negro (Descontinuado):</span> 
                        <span class="estado-valor">${conteo["negro"] || 0}</span>
                    </div>
                    <div class="estado-item estado-amarillo">
                        <span class="estado-icon">🕒</span> 
                        <span class="estado-text">Amarillo (En una próxima actualización):</span> 
                        <span class="estado-valor">${conteo["amarillo"] || 0}</span>
                    </div>
                    <div class="estado-item estado-azul-oscuro">
                        <span class="estado-icon">🛠️</span> 
                        <span class="estado-text">Azul Oscuro (En desarrollo):</span> 
                        <span class="estado-valor">${conteo["azul-oscuro"] || 0}</span>
                    </div>
                    <div class="estado-item estado-gris">
                        <span class="estado-icon">🔧</span> 
                        <span class="estado-text">Gris (En mantenimiento):</span> 
                        <span class="estado-valor">${conteo["gris"] || 0}</span>
                    </div>
                    <div class="estado-item estado-cyan">
                        <span class="estado-icon">🧪</span> 
                        <span class="estado-text">Cyan (Experimental):</span> 
                        <span class="estado-valor">${conteo["cyan"] || 0}</span>
                    </div>
                    <div class="estado-item estado-plateado">
                        <span class="estado-icon">📝</span> 
                        <span class="estado-text">Plateado (Pendiente de Aprobación):</span> 
                        <span class="estado-valor">${conteo.plateado || 0}</span>
                    </div>
                    <div class="estado-item estado-morado">
                        <span class="estado-icon">🔍</span> 
                        <span class="estado-text">Morado (Mantenimiento Crítico):</span> 
                        <span class="estado-valor">${conteo.morado || 0}</span>
                    </div>
                    <div class="estado-item estado-verde-lima">
                        <span class="estado-icon">✔️</span> 
                        <span class="estado-text">Verde Lima (En Verificación Final):</span> 
                        <span class="estado-valor">${conteo["verde-lima"] || 0}</span>
                        <span class="estado-resultado"></span>
                    </div>
                    <div class="estado-item estado-beige">
                        <span class="estado-icon">📜</span> 
                        <span class="estado-text">Beige (Prototipo):</span> 
                        <span class="estado-valor">${conteo.beige || 0}</span>
                    </div>
                    <div class="estado-item estado-turquesa">
                        <span class="estado-icon">⏳</span> 
                        <span class="estado-text">Turquesa (Próximamente):</span> 
                        <span class="estado-valor">${conteo.turquesa || 0}</span>
                        <span class="estado-resultado"></span>
                    </div>
                    <div class="estado-item estado-lila">
                        <span class="estado-icon">🌌</span> 
                        <span class="estado-text">Lila (En Pruebas):</span> 
                        <span class="estado-valor">${conteo.lila || 0}</span>
                    </div>
                </div>
                    <div class="estado-item estado-coral">
                        <span class="estado-icon">🌀</span> 
                        <span class="estado-text">Coral (Fase Final):</span> 
                        <span class="estado-valor">${conteo.coral || 0}</span>
                   </div>
    </div>
    <div class="estado-item estado-administrador">
    <span class="estado-icon">🛡️</span> 
    <span class="estado-text">Administrador (Privilegios Especiales):</span> 
    <span class="estado-valor">${conteo.administrador || 0}</span>
</div>
<div class="estado-item estado-inactivo">
    <span class="estado-icon">⏸️</span> 
    <span class="estado-text">Inactivo (No Utilizable):</span> 
    <span class="estado-valor">${conteo.inactivo || 0}</span>
</div>
        <div class="estado-item estado-en-observacion">
    <span class="estado-icon">👁️</span> 
    <span class="estado-text">En Observación (No Disponible):</span> 
    <span class="estado-valor">${conteo["en-observacion"] || 0}</span>
</div>
<div class="estado-item estado-de-pago">
    <span class="estado-icon">🏷️</span> 
    <span class="estado-text">De Pago (Acceso mediante transacción):</span> 
    <span class="estado-valor">${conteo["de-pago"] || 0}</span>
</div>
          <div class="estado-item estado-recompensas-incluidas">
    <span class="estado-icon">🎁</span> 
    <span class="estado-text">Recompensas Incluidas (Bonificaciones al usar):</span> 
    <span class="estado-valor">${conteo["recompensas-incluidas"] || 0}</span>
</div>
<div class="estado-item estado-juego">
    <span class="estado-icon">🎮</span> 
    <span class="estado-text">Juego (Comandos interactivos):</span> 
    <span class="estado-valor">${conteo["juego"] || 0}</span>
</div>

                                                                   
            `;
        };
    
        
    
        function cambiarPaginaAutomaticamente() {
            paginaActual = (paginaActual % totalPaginas) + 1;
            mostrarComandos(paginaActual);
        }
    
        // Inicializar la primera página
    mostrarComandos(paginaActual);
    
    
        // Función para mostrar el panel del comando
        function mostrarPanelComando(event, comando) {
            const panel = document.createElement('div');
            panel.id = 'comando-panel';
            panel.style.position = 'absolute';
            panel.style.left = `${event.pageX + 10}px`; // Aparece cerca del mouse
            panel.style.top = `${event.pageY + 10}px`;
            panel.style.border = `2px solid ${obtenerColorEstado(comando.estado)}`;
            panel.style.padding = '10px';
            panel.style.backgroundColor = '#fff';
            panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            panel.style.zIndex = '1000';
        
            // Contenido del panel
            const titulo = document.createElement('h4');
            titulo.textContent = comando.nombre;
            const estado = document.createElement('p');
            estado.textContent = `Estado: ${estados[comando.estado]}`;
            const descripcion = document.createElement('p');
            descripcion.textContent = descripciones[comando.estado];
        
            panel.appendChild(titulo);
            panel.appendChild(estado);
            panel.appendChild(descripcion);
        
            document.body.appendChild(panel);
        
            // Hacer que el panel siga al ratón
            document.addEventListener('mousemove', moverPanelComando);
        };
        
        // Función para ocultar el panel
        function ocultarPanelComando() {
            const panel = document.getElementById('comando-panel');
            if (panel) {
                panel.remove();
            }
            document.removeEventListener('mousemove', moverPanelComando);
        };
        
        // Función para mover el panel con el ratón
        function moverPanelComando(event) {
            const panel = document.getElementById('comando-panel');
            if (panel) {
                panel.style.left = `${event.pageX + 10}px`;
                panel.style.top = `${event.pageY + 10}px`;
            }
        };
        
        // Función para obtener el color basado en el estado
        function obtenerColorEstado(estado) {
            switch (estado) {
                case 'verde': return 'green';
                case 'ambar': return '#ffbf00';
                case 'amarillo': return 'yellow';
                case 'rojo': return 'red';
                case 'pastel': return 'pink';
                case 'negro': return 'black';
                case 'naranja-oscuro': return '#e67e22';
                case 'dorado': return '#FFD700';
                default: return 'black';
            }
        };
        
    
    function cambiarPagina(direccion) {
        if (direccion === 1 && paginaActual < totalPaginas) {
            paginaActual++;
        } else if (direccion === -1 && paginaActual > 1) {
            paginaActual--;
        }
    
        mostrarComandos(paginaActual);
    
        // Habilitar/deshabilitar botones según la página actual
        document.getElementById('btn-anterior').disabled = (paginaActual === 1);
        document.getElementById('btn-siguiente').disabled = (paginaActual === totalPaginas);
    }
    
    // Inicializar la lista mostrando la primera página
    mostrarComandos(paginaActual);
    
    // Habilitar/deshabilitar botones al cargar la página
    document.getElementById('btn-anterior').disabled = (paginaActual === 1);
    document.getElementById('btn-siguiente').disabled = (paginaActual === totalPaginas);
    
    // (El resto del código)
    
        // Asignar eventos a los botones
        document.getElementById('btn-anterior').addEventListener('click', function() {
            cambiarPagina(-1); // Cambia a la página anterior
        });
    
        document.getElementById('btn-siguiente').addEventListener('click', function() {
            cambiarPagina(1); // Cambia a la siguiente página
        });





        

    function switchToDynamicInput(callback) {
        // Eliminar otros inputs si existen
        const existingInput = document.getElementById("fobiaInput");
        if (existingInput) {
            existingInput.remove();
        }
    
        // Crear un nuevo input exclusivo para el comando /fobias
        const inputContainer = document.createElement("div");
        inputContainer.id = "fobiaInput";
        
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Ingrese su fobia aquí...";
        inputField.style.margin = "10px";
        
        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Enviar";
        submitButton.onclick = () => {
            const fobia = inputField.value.trim(); // Obtener el valor ingresado
            if (fobia) {
                callback(fobia); // Llamar al callback handleFobiaCommand con el valor
                inputContainer.remove(); // Eliminar el input después de usarlo
            } else {
                typeMessage("Por favor, ingresa una fobia.");
            }
        };
    
        // Agregar el campo de input y botón al contenedor de chat
        inputContainer.appendChild(inputField);
        inputContainer.appendChild(submitButton);
        chatLog.appendChild(inputContainer);
    }
    
    
    
    
    function handleEventoActivo() {
        typeMessage("El evento está activo, haz click en el evento. (Envia /eventos para revisar el evento)");
    }
    
// Configuración del evento de Fobias
const eventos = [
    {
        nombre: "Fobias: Parte 2",
        imagen: "https://i.pinimg.com/564x/e4/f2/8f/e4f28f739fa28c1e6a86a4ee764e4b06.jpg", 
        fechaInicio: new Date("2024-10-12T00:00:00"),
        fechaFin: new Date("2024-11-01T23:59:59"),
        comando: "fobias"
    },
    {
        nombre: "Colaboración: Evento - Megalodon 2: El Gran Abismo",
        imagen: "https://i.pinimg.com/736x/fc/0a/ac/fc0aac367389ad6cfcf293061498465c.jpg", 
        fechaInicio: new Date("2024-11-10T00:00:00"),
        fechaFin: new Date("2024-12-01T23:59:59"),
        comando: "caza-megalodon"
    },
    {
        nombre: "Biomas",
        imagen: "https://i.pinimg.com/736x/9b/36/2a/9b362af8160f427ebe5000a8fe57805d.jpg",
        fechaInicio: new Date("2024-10-25T00:00:00"),
        fechaFin: new Date("2024-11-01T23:59:59"),
        comando: "explora-biomas-evento"
    }
];

function formatearFecha(fecha) {
    const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

function calcularCuentaRegresiva(fecha) {
    const ahora = new Date().getTime();
    const tiempoRestante = fecha - ahora;
    const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    if (tiempoRestante > 0) {
        return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    } else {
        return "Evento Finalizado!";
    }
}

function generarEventos() {
    const contenedorEventos = document.getElementById("eventos");

    eventos.forEach(evento => {
        // Crear contenedor del evento
        const eventoDiv = document.createElement("div");
        eventoDiv.className = "evento-container";

        // Crear imagen del evento
        const imagen = document.createElement("img");
        imagen.src = evento.imagen;
        imagen.alt = evento.nombre;
        imagen.className = "evento-imagen";

        // Manejar error de carga de imagen
        imagen.onerror = function () {
            imagen.style.display = "none";  // Ocultar imagen si hay un error de carga
            mensajeError.style.display = "block";  // Mostrar mensaje de error
            mensajeError.textContent = `No se pudo cargar la imagen para el evento ${evento.nombre}.`; // Mensaje de error
        };

        eventoDiv.appendChild(imagen);

        // Crear cuenta regresiva para el inicio y el fin del evento
        const cuentaInicio = document.createElement("div");
        cuentaInicio.className = "evento-cuenta-regresiva";
        const cuentaFin = document.createElement("div");
        cuentaFin.className = "evento-cuenta-regresiva";
        eventoDiv.appendChild(cuentaInicio);
        eventoDiv.appendChild(cuentaFin);

        // Crear mensaje de error
        const mensajeError = document.createElement("div");
        mensajeError.className = "mensaje-error";
        mensajeError.style.display = "none"; // Ocultamos el mensaje inicialmente
        eventoDiv.appendChild(mensajeError);

        // Crear botón del evento
        const boton = document.createElement("button");
        boton.textContent = `Activar ${evento.nombre}`;
        boton.className = "evento-boton";
        boton.onclick = function() {
            const ahora = new Date().getTime();
            const tiempoInicio = evento.fechaInicio - ahora;

            if (tiempoInicio > 0) {
                typeMessage("El evento todavía no ha comenzado.");
            } else {
                // Aquí activamos el comando
                ejecutarComando(evento.comando);
            }
        };
        eventoDiv.appendChild(boton);

        // Añadir el evento al contenedor de eventos
        chatLog.appendChild(eventoDiv);

        // Actualizar las cuentas regresivas
        setInterval(() => {
            const ahora = new Date().getTime();
            const tiempoInicio = evento.fechaInicio - ahora;
            const tiempoFin = evento.fechaFin - ahora;

            const cuentaInicioTexto = tiempoInicio > 0 ? calcularCuentaRegresiva(evento.fechaInicio) : "El evento ha comenzado!";
            const cuentaFinTexto = calcularCuentaRegresiva(evento.fechaFin);

            cuentaInicio.textContent = `Este evento comienza en/el: ${cuentaInicioTexto} (${formatearFecha(evento.fechaInicio)})`;
            cuentaFin.textContent = `Este evento termina en/el: ${cuentaFinTexto} (${formatearFecha(evento.fechaFin)})`;

            if (tiempoFin <= 0) {
                cuentaFin.className = "evento-cuenta-regresiva evento-finalizado";
            }
        }, 1000);
    });
}


    

    
    
    


// Función que maneja el splash screen y redirige a index.html después de la animación
function showSplashScreenAndRedirect() { 
    setTimeout(() => {
        // Ocultar el splash screen después de la animación
        document.getElementById('splash-screen').style.display = 'none';



    }, 4000); // 4 segundos para la animación
}

// Ejecuta la función directamente
showSplashScreenAndRedirect();

    
document.addEventListener("DOMContentLoaded", function() {
    // Crear modal
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">
            <span id="cerrar-modal" class="close">&times;</span>
            <h2 id="modal-titulo">Novedades</h2>
            <div id="modal-contenido">
                <!-- Menú lateral para novedades -->
                <div id="menu-lateral">
                    <ul>
                        <li data-version="1.0.0">Versión 1.0.0</li>
                        <li data-version="1.1.0">Versión 1.1.0</li>
                        <li data-version="1.2.0">Versión 1.2.0</li>
                        <!-- Agrega más versiones aquí -->
                    </ul>
                </div>
                <div id="contenido-novedades">
                    <p>Haz clic en una versión del menú lateral para ver los detalles.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Estilos del modal en CSS
    const style = document.createElement('style');
    style.textContent = `
 /* Estilo del modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            background-color: white;
            margin: 5% auto;
            padding: 40px;
            border-radius: 10px;
            width: 80%; /* Más ancho */
            height: 80%; /* Más alto */
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: row;
        }

        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
            font-size: 30px; /* Más grande */
        }

        /* Menú lateral */
        #menu-lateral {
            float: left;
            width: 30%;
            padding-right: 30px;
            overflow-y: auto;
            max-height: 100%;
        }

        #menu-lateral ul {
            list-style-type: none;
            padding: 0;
        }

        #menu-lateral ul li {
            cursor: pointer;
            padding: 15px;
            background-color: #f4f4f4;
            margin-bottom: 10px;
            border-radius: 8px;
        }

        #menu-lateral ul li:hover {
            background-color: #ddd;
        }

        /* Contenido de novedades */
        #contenido-novedades {
            width: 70%; /* Más espacio para el contenido */
            overflow-y: auto;
        }

        #contenido-novedades p {
            font-size: 18px; /* Texto más grande */
            line-height: 1.6; /* Mejor legibilidad */
        }
    `;
    document.head.appendChild(style);

 
    // Si se hace clic fuera del modal, se cierra
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            cerrarModal();
        }

            // Llamar a la función para mostrar el mensaje de bienvenida al cargar
showWelcomeMessage();
    
        });
    });
});
