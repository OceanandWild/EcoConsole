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
        let animalTokens = 100;
        const prestamos = {};
    
        const messageContainer = document.getElementById('message'); // Asegúrate de obtener el elemento 
        const userID = Math.floor(Math.random() * 10000);
        
    
        let temaSeleccionado = null;
    let pistas = [];
    let pistaActual = 0;
    const modalContainer = document.getElementById('modalContainer');
    
    


    
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
    'paquete-de-cartas': handlePaqueteDeCartas,
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
    'unirse': unirse,
    'acceder': iniciarSesion,
    'usuarios': mostrarUsuariosVerificados,
    'boss-battle': handleEnfrentarJefe,
    'comandos-recomendados': handleComandosRecomendados, // Comando para buscar
    'sombra-asesina': function() {
        mostrarModalEventoPendiente('eventoX', 'Ups, hubo un error al intentar ejecutar este comando:', 'Este evento aún no ha comenzado.', 'El evento de Asesinos no ha comenzado, comenzara en noviembre.');
    },
    'generar-imagenes': function() {
        mostrarModalEstadoComando("Proximamente", "El comando esta indisponible, pero pronto lo estara..", "Podras generar imagenes muy pronto.");
    },
   'explora-biomas': handleExploraBiomasCommand,
   't-rex-friend': tRexFriend,
};

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
                animalTokens += 5; // Premiar con Animal Tokens
            }, 2000);
        });
    });
}

function alimentarTRex() {
    const costoAlimento = 10; // Coste de alimentar al T-Rex
    const saldoActual = animalTokens; // Supongamos que esta es la cantidad actual del jugador

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
    const saldoActual = animalTokens; // Supongamos que esta es la cantidad actual del jugador

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
    const costoExploracion = 10; // Costo en Animal Tokens
    const saldoActual = animalTokens; // Saldo actual de Animal Tokens

    typeMessage('¿Quieres explorar un nuevo bioma? El costo es de 10 Animal Tokens.');

    // Llamar a la función de transacción
    animalPayTransaction(costoExploracion, saldoActual, costoExploracion, true, function(success) {
        if (success) {
            typeMessage('¡Exploración exitosa! Has desbloqueado un nuevo bioma.');
            // Aquí puedes agregar la lógica para desbloquear el bioma
            desbloquearBioma();
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
    animalTokens += 15;
    typeMessage(`Has ganado 15 Animal Tokens. Total de Animal Tokens: ${animalTokens}`);
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
        fechaVerificacionAdmin: "2024-10-14" 
    },
    { 
        nombreUsuario: "usuario2", 
        contrasena: "contraseña2", 
        verificado: true, 
        fechaVerificacion: "2024-01-01", 
        verificacionEmpresa: true, 
        fechaVerificacionEmpresa: "2024-10-10",
        verificacionAdmin: true, 
        fechaVerificacionAdmin: "" 
    },
];

function mostrarUsuariosVerificados() {
    typeMessage("Lista de usuarios verificados:");

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

        const iconoVerificado = usuario.verificado ? 
            `<img src="https://i.ibb.co/NyC8Y1W/Captura-de-pantalla-2024-10-13-191335.png" alt="Verificado Azul" style="width: 20px; height: 20px;" title="Cuenta verificada desde el ${usuario.fechaVerificacion}">` : '';

        const iconoVerificadoEmpresa = usuario.verificacionEmpresa ? 
            `<img src="https://i.ibb.co/vkyZVfM/Captura-de-pantalla-2024-10-13-191054.png" alt="Verificado Dorado" style="width: 20px; height: 20px;" title="Cuenta de empresa verificada desde el ${usuario.fechaVerificacionEmpresa}">` : '';

        const iconoVerificadoAdmin = usuario.verificacionAdmin ? 
            `<img src="https://i.ibb.co/vmJKTpY/Captura-de-pantalla-2024-10-13-195931.png" alt="Verificado Admin" style="width: 20px; height: 20px;" title="Cuenta de Admin verificada desde el ${usuario.fechaVerificacionAdmin}">` : '';

        usuarioDiv.innerHTML = `
            ${nombreUsuario.outerHTML}
            ${iconoVerificado} ${iconoVerificadoEmpresa} ${iconoVerificadoAdmin}
        `;

        listaUsuarios.appendChild(usuarioDiv);
    });

    chatLog.appendChild(listaUsuarios);
}




function unirse() {
    typeMessage("Por favor, introduce un Nombre de Usuario para registrarte:");

    const inputUsuario = document.createElement('input');
    inputUsuario.placeholder = "Nombre de Usuario";
    inputUsuario.id = "input-usuario";
    chatLog.appendChild(inputUsuario);

    const inputContrasena = document.createElement('input');
    inputContrasena.placeholder = "Contraseña";
    inputContrasena.type = "password";
    inputContrasena.id = "input-contrasena";
    chatLog.appendChild(inputContrasena);

    const buttonEnviar = document.createElement('button');
    buttonEnviar.innerText = "Enviar";
    buttonEnviar.onclick = () => redirigirWhatsApp(inputUsuario.value, inputContrasena.value);
    chatLog.appendChild(buttonEnviar);
}

function redirigirWhatsApp(nombreUsuario, contrasena) {
    if (!nombreUsuario || !contrasena) {
        typeMessage("Por favor, completa ambos campos.");
        return;
    }

    // Mensaje de redirección
    typeMessage("Redirigiendo a WhatsApp...");

    // Aquí se simula la redirección y la construcción del mensaje
    const numeroTelefono = "598099685536";
    const mensajeWhatsApp = `Nombre de Usuario: ${nombreUsuario}, Contraseña: ${contrasena}`;
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    // Simular redirección
    setTimeout(() => {
        window.open(urlWhatsApp, "_blank");
    }, 2000); // Esperar 2 segundos antes de redirigir a WhatsApp
}

function iniciarSesion() {
    typeMessage("Introduce tu Nombre de Usuario y Contraseña:", true);
    
    const inputUsuario = document.createElement('input');
    inputUsuario.placeholder = "Nombre de Usuario";
    inputUsuario.id = "input-usuario";
    chatLog.appendChild(inputUsuario);

    const inputContrasena = document.createElement('input');
    inputContrasena.placeholder = "Contraseña";
    inputContrasena.type = "password";
    inputContrasena.id = "input-contrasena";
    chatLog.appendChild(inputContrasena);

    const buttonAcceder = document.createElement('button');
    buttonAcceder.innerText = "Acceder";
    buttonAcceder.onclick = () => verificarCredenciales(inputUsuario.value, inputContrasena.value);
    chatLog.appendChild(buttonAcceder);
}

function verificarCredenciales(nombreUsuario, contrasena) {
    const usuarioEncontrado = usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario && usuario.contrasena === contrasena);
    
    if (usuarioEncontrado) {
        typeMessage(`¡Inicio de sesión exitoso! Bienvenido, ${nombreUsuario}.`, true);

        // Verificar si el usuario está verificado
        if (usuarioEncontrado.verificado) {
            mostrarIconoVerificado(usuarioEncontrado);
        }

        // Verificar si el usuario es una empresa
        if (usuarioEncontrado.verificacionEmpresa) {
            mostrarIconoVerificadoEmpresa(usuarioEncontrado); // Mostrar icono de verificación de empresa
        } else {
            const buttonVerificarEmpresa = document.createElement('button');
            buttonVerificarEmpresa.innerText = "Verificación de Empresa";
            buttonVerificarEmpresa.onclick = () => mostrarVerificacionEmpresa(usuarioEncontrado);
            chatLog.appendChild(buttonVerificarEmpresa);
        }

        // Verificar si el usuario es administrador
        if (usuarioEncontrado.verificacionAdmin) { // Cambié de usuarioEncontrado.admin a usuarioEncontrado.verificacionAdmin
            mostrarIconoVerificadoAdmin(usuarioEncontrado); // Mostrar icono de verificación de administrador
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
let animalAIDisponible = true; // Cambia esto a true o false según la lógica de tu aplicación

// Función para verificar si es el 12 de octubre de 2024
function esFechaEspecifica() {
    const fechaEspecifica = new Date('2024-10-12T00:00:00'); // 12 de octubre de 2024
    const fechaActual = new Date();

    // Compara la fecha actual con la fecha específica
    return fechaActual.toDateString() === fechaEspecifica.toDateString();
}

// Función para mostrar el modal si Animal AI no está disponible
function verificarDisponibilidadAnimalAI() {
    // Verifica si la fecha actual es el 12 de octubre de 2024
    if (!animalAIDisponible && !esFechaEspecifica()) {
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
    title.textContent = 'Ups, Animal AI no está disponible en este momento.';

    const razon = document.createElement('p');
    razon.textContent = 'Razón: Animal AI no se ha lanzado aun, si te estas conectando antes de su lanzamiento es posible que sea un error que cometimos, este mensaje dejara de aparecer cuando el lanzamiento llegue.'; 
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
let expNecesaria = 100; // Ejemplo: cantidad de EXP necesaria por nivel, puede aumentar por nivel.
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
    title.textContent = 'Pase de Temporada';

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
        ganarExpButton.textContent = 'Ya has desbloqueado la EXP horaria, vuelva a intentarlo luego.';
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

    const recompensaAnimalTokensButton = crearBotonRecompensa('Animal Tokens', 200);
    const recompensaFobiasButton = crearBotonRecompensa('Créditos de Fobias', 50);
    const recompensaAsesinoButton = crearBotonRecompensa('Créditos de Asesino', 75);

    recompensasSection.appendChild(recompensaAnimalTokensButton);
    recompensasSection.appendChild(recompensaFobiasButton);
    recompensasSection.appendChild(recompensaAsesinoButton);

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
    ganarExpButton.textContent = 'Ya has desbloqueado la EXP horaria, vuelva a intentarlo luego.';
    
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

// Función para crear los botones de recompensa
function crearBotonRecompensa(tipoRecompensa, cantidad) {
    const boton = document.createElement('button');
    boton.textContent = `Reclamar ${cantidad} ${tipoRecompensa}`;
    
    boton.onclick = function () {
        if (expActual >= expNecesaria) {
            alert(`Has reclamado ${cantidad} ${tipoRecompensa}.`);
            expActual = 0; // Reiniciar EXP tras reclamar
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
    const animalTokensSection = document.createElement('div');
    const animalTokensTitle = document.createElement('h3');
    animalTokensTitle.textContent = 'Comprar Animal Tokens';
    animalTokensSection.appendChild(animalTokensTitle);

    const comprarAnimalTokensButton = document.createElement('button');
    comprarAnimalTokensButton.textContent = 'Comprar Animal Tokens';
    comprarAnimalTokensButton.onclick = function () {
        solicitarCodigoCompra('Animal Tokens');
    };
    animalTokensSection.appendChild(comprarAnimalTokensButton);

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
    modalContent.appendChild(animalTokensSection);
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

    // Crear botón de cierre del modal
    const closeButton = document.createElement('button');
    closeButton.textContent = "Cerrar";
    closeButton.onclick = function () {
        cerrarModal(modal); // Llama a la función para cerrar el modal
    };

    // Añadir todos los elementos al contenido del modal
    modalContent.appendChild(title);
    modalContent.appendChild(switchContainer);
    modalContent.appendChild(closeButton);

    // Añadir el contenido al modal
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Mostrar el modal
    modal.style.display = 'block'; // Cambia a bloque para que sea visible
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

// Función para crear una notificación
function crearNotificacion() {
    try {
        if (Notification.permission === "granted") {
            // Pedir al usuario que ingrese un mensaje
            const mensaje = "Escribe el mensaje para la notificación:";
            const modalConfig = {
                titulo: "Crear Notificación",
                descripcion: "Escribe el mensaje para la notificación:"
            };

            responderConPreferencia(mensaje, modalConfig);

            // Capturar el mensaje del usuario
            const input = prompt("Ingresa el mensaje de la notificación:");
            if (input) {
                // Crear la notificación
                new Notification("Animal AI", {
                    body: input,
                    icon: 'https://example.com/icon.png' // Puedes usar una URL válida para el icono
                });
                responderConPreferencia("Notificación enviada con éxito.", {
                    titulo: "Notificación Enviada",
                    descripcion: `Tu notificación fue enviada con el mensaje: ${input}`
                });
            }
        } else {
            responderConPreferencia("No tienes permiso para enviar notificaciones. Primero permite las notificaciones.", {
                titulo: "Sin Permiso",
                descripcion: "Debes permitir las notificaciones antes de crearlas."
            });
        }
    } catch (error) {
        mostrarModalErrorComando('crearNotificacion', 'Error al crear la notificación.', error.message);
    }
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
        const costo = 5; // Costo para jugar Piedra, Papel o Tijera
        const saldoActual = animalTokens; // Saldo actual de Animal Tokens
        const deduccion = 5; // Deducción de WildCard si se usa
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
    
        // Realizar la transacción de los Animal Tokens
        animalPayTransaction(costo, saldoActual, deduccion, true, function(transaccionExitosa) {
            if (transaccionExitosa) {
                // La transacción fue exitosa, ahora determinar si ganaste o perdiste
                let resultado;
    
                typeMessage(`✅ Has jugado por ${deduccion} Animal Tokens. Tu saldo actual es: ${animalTokens} Animal Tokens.`);
    
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
                    // Ganaste: Se añade una "transacción inversa" de +10 Animal Tokens
                    typeMessage(`🎉 ¡Ganaste! Has ganado 10 Animal Tokens.`);
                    setTimeout(() => {
                        animalTokens += 10; // Añadir los 10 tokens al saldo
                        typeMessage(`✅ Transacción inversa completada. Tu nuevo saldo es ${animalTokens} Animal Tokens.`);
                    }, 1000);
                } else if (resultado === 'perder') {
                    // Perdiste: Se deducen otros 5 tokens adicionales
                    setTimeout(() => {
                        typeMessage(`😢 ¡Perdiste! Se te deducirán otros 5 Animal Tokens.`);
                        animalTokens -= 5; // Deducir los 5 tokens adicionales
                        typeMessage(`❌ Has perdido otros 5 Animal Tokens. Tu nuevo saldo es ${animalTokens} Animal Tokens.`);
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
    
    
    
    let wildCardBalances = {
        '7600123456789012': 50,
        '7600234567890123': 100,
        '7600345678901234': 75,
        '7600456789012345': 300,
        '7600567890123456': 150
    };
    // Función para manejar el comando de saldo
    function handleSaldoCommand() {
        const chatLog = document.getElementById('chat-log');
        
        typeMessage(`Your balance is ${animalTokens} Animal Tokens`);
        
        // Botón para iniciar sesión en la WildCard
        const cardNumberInput = document.createElement('input');
        cardNumberInput.type = 'text';
        cardNumberInput.placeholder = 'Enter WildCard number';
        
        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.onclick = () => validateCardLogin(cardNumberInput.value);
        
        const loginContainer = document.createElement('div');
        loginContainer.appendChild(cardNumberInput);
        loginContainer.appendChild(loginButton);
        
        chatLog.appendChild(loginContainer);
    }
    
    // Función para validar el inicio de sesión en la WildCard
    function validateCardLogin(cardNumber) {
        if (wildCardBalances[cardNumber] !== undefined) {
            typeMessage(`Logged in successfully! Your WildCard balance is ${wildCardBalances[cardNumber]} pesos.`);
            
            // Contenedor de saldo
            const balanceContainer = document.createElement('div');
            
            const rechargeTokensButton = document.createElement('button');
            rechargeTokensButton.textContent = 'Recharge Animal Tokens';
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
            if (animalTokens >= amountValue) {
                animalTokens -= amountValue;
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
    
    function animalPayTransaction(costo, saldoActual, deduccion, callback) {
        // Crear el modal
        const modaltransaction = document.createElement('div');
        modaltransaction.classList.add('modal');
    
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
    
        const title = document.createElement('h2');
        title.textContent = 'Completa tu transacción';
    
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.placeholder = 'Ingresa tu correo electrónico';
        emailInput.required = true;
    
        const btnAnimalTokens = document.createElement('button');
        btnAnimalTokens.textContent = 'Pagar con Animal Tokens';
        btnAnimalTokens.classList.add('btn-animal-tokens'); // Clase para estilos personalizados
    
        modalContent.appendChild(title);
        modalContent.appendChild(emailInput);
        modalContent.appendChild(btnAnimalTokens);
        modaltransaction.appendChild(modalContent);
        document.body.appendChild(modaltransaction);
    
        // Mostrar el modal
        modaltransaction.style.display = 'block';
    
        // Evento para pagar con Animal Tokens
        btnAnimalTokens.addEventListener('click', function () {
            const email = emailInput.value.trim();
            if (saldoActual >= costo && validateEmail(email)) {
                animalTokens -= costo; // Deduce los Animal Tokens del saldo global
    
                // Mostrar animación de éxito
                showSuccessAnimation(modaltransaction, 'Animal Tokens', costo, email, callback);
            } else {
                alert('❌ No tienes suficientes Animal Tokens o el correo es inválido.');
                callback(false); // Llamar al callback indicando que la transacción falló
            }
        });
    }
    
    
    function showSuccessAnimation(modal, metodoPago, cantidad, email, callback) {
        // Limpiar contenido del modal
        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = '';
    
        // Crear el contenedor de animación
        const successContainer = document.createElement('div');
        successContainer.classList.add('success-container');
    
        // Crear el círculo de animación
        const circle = document.createElement('div');
        circle.classList.add('circle');
    
        // Crear el ícono de verificación (check)
        const checkIcon = document.createElement('span');
        checkIcon.textContent = '✔️';
        checkIcon.classList.add('check-icon');
    
        // Agregar el círculo y el ícono de verificación al contenedor
        successContainer.appendChild(circle);
        successContainer.appendChild(checkIcon);
        modalContent.appendChild(successContainer);
    
        // Agregar mensaje de éxito
        const successMessage = document.createElement('p');
        successMessage.textContent = `✅ Se realizó con éxito el pago (${metodoPago}).`;
        modalContent.appendChild(successMessage);
    
        // Botón para cerrar el modal
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        modalContent.appendChild(closeButton);
    
        // Cerrar modal al hacer clic en el botón
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    
        // Animación de relleno del círculo
        circle.classList.add('fill-circle-animation');
    
        // Mostrar el ícono de verificación después de que el círculo esté completamente lleno
        setTimeout(() => {
            checkIcon.classList.add('show-check');
        }, 2000); // Mostrar el ícono después de 2 segundos (al completar el relleno)
    
        // Simular el envío de correo al completar la transacción
        setTimeout(() => {
            sendEmailConfirmation(email, metodoPago, cantidad);
            callback(true); // Transacción exitosa
        }, 3000); // 3 segundos para completar la transacción y enviar el correo
    }
    
    
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
    
    .success-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
    }
    
    /* Círculo base */
    .circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 5px solid transparent;
        position: relative;
        background-image: conic-gradient(green 0deg, green 0deg, gray 360deg); /* Crea el efecto de relleno */
        transform: rotate(-90deg); /* Para que la animación comience desde la parte superior */
        transition: transform 0.5s ease-in-out;
    }
    
    /* Efecto de relleno circular */
    .fill-circle-animation {
        animation: fillCircle 2s forwards ease-in-out;
    }
    
    /* Ícono de verificación (check) */
    .check-icon {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        color: white;
        transition: opacity 0.5s ease-in-out;
    }
    
    /* Mostrar ícono de verificación */
    .show-check {
        opacity: 1;
    }
    
    /* Animación de relleno */
    @keyframes fillCircle {
        0% {
            background-image: conic-gradient(green 0deg, gray 360deg); /* Inicio vacío */
        }
        100% {
            background-image: conic-gradient(green 360deg, gray 360deg); /* Llenado completo */
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
        const saldoAnimalTokens = animalTokens;
        const deduccionWildCard = 25;
        
        // Ejecutar la transacción con la opción de WildCard habilitada
        animalPayTransaction(costoArticulo, saldoAnimalTokens, deduccionWildCard, true);
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
    
        // Función que se ejecuta al ejecutar un comando
        function ejecutarComando(comando) {
            const container = document.getElementById('container'); 
            const comandoSinSlash = comando.startsWith("/") ? comando.substring(1) : comando;
            const usuario = 'usuarioEjemplo'; // Supongamos que identificamos al usuario así por ahora
    
            // Actualizamos la última acción a la hora actual
            ultimaAccion = Date.now();
            clearTimeout(timeoutId); // Limpiamos cualquier temporizador anterior
    
            // Programamos el cambio de estado después de 30 segundos
            timeoutId = setTimeout(() => {
                const fecha = new Date(ultimaAccion);
                estadoDiv.innerText = `Últ. vez: ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
            }, 3000);
    
            // Actualizamos el estado del usuario
            actualizarEstadoUsuario();
    
            if (commands[comandoSinSlash]) {
                // Verificamos si el comando es premium
                if (comandosPremium.includes(comandoSinSlash)) {
                    // Verificamos si el usuario tiene una suscripción activa
                    if (verificarSuscripcion(usuario)) {
                        // El usuario tiene suscripción activa, ejecutamos el comando premium
                        commands[comandoSinSlash](container); 
                        typeMessage(container, `Comando premium '${comandoSinSlash}' ejecutado para el usuario ${usuario}.`);
                        actualizarProgresoEvento(comandoSinSlash, container); // Actualizamos el progreso del evento
                    } else {
                        // Si no tiene suscripción, pedimos el código de suscripción
                        const codigo = prompt("Este comando requiere una suscripción premium. Ingresa el código que recibiste en WhatsApp. En el caso de que no tengas algún código pídelo por 099 685 536, tendrás que pagar el precio indicado por ese número, se le dará un código y tendrás que ponerlo aquí:");
            
                        if (activarSuscripcion(usuario, codigo)) {
                            // Si el código es correcto y activamos la suscripción, ejecutamos el comando
                            commands[comandoSinSlash](container);
                            typeMessage(container, `Suscripción activada. Comando '${comandoSinSlash}' ejecutado.`);
                            actualizarProgresoEvento(comandoSinSlash, container); // Actualizamos el progreso del evento
                        } else {
                            typeMessage(container, "No se ha podido activar la suscripción premium.");
                            typeMessage(container, `El comando "/${comandoSinSlash}" requiere una suscripción premium válida.`);
                        }
                    }
                } else {
                    // Si el comando no es premium, simplemente lo ejecutamos
                    commands[comandoSinSlash](container);
                }
            } else {
                typeMessage(container, `Comando no reconocido: "/${comandoSinSlash}"`);
                notRecognizedCommand();
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
    
        // Cargar el sonido local
        const typingSound = new Audio('https://screenapp.io/app/#/shared/ciRuLSxXx2?embed=true'); // Ruta al archivo de sonido
        typingSound.volume = options.soundVolume || 0.5; // Control de volumen
    
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
    
                    // Reproducir el sonido si está habilitado
                    typingSound.currentTime = 0; // Reiniciar sonido desde el inicio
                    typingSound.play().catch(error => {
                        console.warn("No se pudo reproducir el sonido:", error);
                    });
    
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
    
    
    // Función para manejar el comando /paquete-de-cartas
    function handlePaqueteDeCartas() {
        typeMessage("¡Bienvenido al paquete de cartas!");
    
        // Mostrar opciones de compra
        typeMessage("Puedes comprar un paquete de cartas por 50 Animal Tokens o $25 pesos de tarjeta WildCard.");
    
        const input = document.getElementById("cmd-input");
        const button = document.getElementById("sendCMDBtn");
    
        button.addEventListener("click", () => {
            const opcionCompra = input.value.trim();
    
            if (opcionCompra === "Animal Tokens") {
                comprarPaqueteConAnimalTokens();
            } else if (opcionCompra === "tarjeta WildCard") {
                comprarPaqueteConTarjetaWildCard();
            } else {
                typeMessage("Opción de compra inválida. Por favor, intenta nuevamente.");
            }
    
            // Limpiar el input
            input.value = "";
        });
    }
    
    
    
    // Función para comprar un paquete de cartas con Animal Tokens
    function comprarPaqueteConAnimalTokens() {
        const precioPaquete = 50; // Precio en Animal Tokens del paquete de cartas
    
        // Verificar si hay suficientes Animal Tokens para comprar el paquete
        if (saldoAnimalTokens >= precioPaquete) {
            saldoAnimalTokens -= precioPaquete; // Deducción del saldo correspondiente
            typeMessage(`Has comprado un paquete de cartas con Animal Tokens. Tu saldo actual es ${saldoAnimalTokens} Animal Tokens.`);
    
            // Abrir el paquete de cartas y desbloquear los comandos
            abrirPaqueteDeCartas();
        } else {
            typeMessage("Saldo insuficiente de Animal Tokens. No se puede realizar la compra del paquete de cartas.");
        }
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
        if (animalTokens >= 25) {
            const revivir = confirm("¿Deseas gastar 25 Animal Tokens para revivir?");
    
            if (revivir) {
                animalTokens -= 25;
                vidaJugador = 50; // Revivir con 50 puntos de vida
                typeMessage(`Has revivido utilizando 25 Animal Tokens. Te quedan ${animalTokens} tokens. Vida actual: ${vidaJugador}.`);
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
        animalTokens += cantidad;
        typeMessage(`¡Has ganado ${cantidad} Animal Tokens! Total actual: ${animalTokens}`);
    }
    
    // Define the card variable with an initial balance
    const card = {
        balance: 50 // Initial balance of the card
      };
      
    // Función para comprar un paquete de cartas con tarjeta WildCard
    function comprarPaqueteConTarjetaWildCard() {
        const precioPaquete = 25; // Precio en pesos de la tarjeta WildCard del paquete de cartas
    
        // Verificar si la tarjeta WildCard existe y tiene suficiente saldo para comprar el paquete
        if (card.balance && card.balance >= precioPaquete) {
            card.balance -= precioPaquete; // Deducción del saldo correspondiente
            typeMessage(`Has comprado un paquete de cartas con tarjeta WildCard. Tu saldo actual es ${card.balance} pesos.`);
    
            // Abrir el paquete de cartas y desbloquear los comandos
            abrirPaqueteDeCartas();
        } else {
            typeMessage("Tarjeta WildCard no válida o saldo insuficiente. No se puede realizar la compra del paquete de cartas.");
        }
    }
    
    
    
    // Función para abrir un paquete de cartas y desbloquear los comandos
    function abrirPaqueteDeCartas() {
        // Lógica para abrir un paquete de cartas y desbloquear los comandos correspondientes
        // ...
    
        // Mostrar una animación de apertura del paquete de cartas
        const animationDuration = 2000; // Duración de la animación en milisegundos
    
        // Crear un elemento para representar el paquete de cartas
        const paqueteElement = document.createElement("div");
        paqueteElement.classList.add("paquete");
    
        // Agregar el paquete de cartas al chat log
        chatLog.appendChild(paqueteElement);
    
        // Animación de apertura del paquete de cartas
        setTimeout(() => {
            paqueteElement.classList.add("abierto");
    
            // Desbloquear los comandos obtenidos del paquete
            desbloquearComandos();
        }, animationDuration);
    
        // Mostrar un mensaje indicando que se ha abierto el paquete de cartas
        typeMessage("Has abierto un paquete de cartas.");
    }
    
    
    // Función para desbloquear los comandos obtenidos del paquete de cartas
    function desbloquearComandos() {
        // Lógica para desbloquear los comandos obtenidos del paquete de cartas
        // ...
        typeMessage("Has desbloqueado los comandos obtenidos del paquete de cartas.");
    
        // Verificar si hay cartas repetidas y convertirlas en Animal Tokens
        convertirCartasRepetidasEnAnimalTokens();
    }
    
    // Función para convertir las cartas repetidas en Animal Tokens
    function convertirCartasRepetidasEnAnimalTokens() {
        // Lógica para convertir las cartas repetidas en Animal Tokens
        // ...
        typeMessage("Las cartas repetidas se han convertido en 30 Animal Tokens.");
    
        // Mostrar información sobre los comandos desbloqueados
        typeMessage("Puedes utilizar los comandos desbloqueados en el paquete de cartas.");
        typeMessage("Si deseas desbloquear más comandos, puedes comprar más paquetes de cartas.");
    }
    
    
    
    // Lista de comandos que se instalarán
    const listaComandos = [
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
    ];
    
    const listaScripts = [
        'animalSaver.js', 
        'animalHandler.js', 
        'animalHelper.js',
        'phobiaStart.js', 
        'phobiaHandler.js', 
        'phobiaUtils.js',
        'megalodonHunt.js', 
        'megalodonHandler.js', 
        'megalodonUI.js',
        'animalShelterSetup.js', 
        'animalShelterHandler.js', 
        'animalShelterUI.js',
        'lineCommandSetup.js', 
        'lineCommandHandler.js', 
        'lineCommandUI.js',
        'PPOTHandler.js', 
        'PPOTSimulator.js', 
        'PPOTUI.js',
        'configuration.js'
    ];

    // Variables globales
let progressBar;
let currentSize = 0;
let sizePerElement = 75; // Cada comando o script añade 75 MB
let cantidadTotalElementos = listaComandos.length + listaScripts.length; // Cantidad total de comandos y scripts

// Tamaño total dinámico calculado a partir de la cantidad de elementos y el tamaño por elemento
let totalSize = sizePerElement * cantidadTotalElementos; // Tamaño total en MB


    // Función para iniciar la instalación de comandos y scripts
    function iniciarInstalacion() {
        // Ocultar el formulario al iniciar la instalación, pero solo si existe en el DOM
        const blogForm = document.getElementById('blogForm');
        if (blogForm) {
            blogForm.style.display = 'none';
        }
    
        // Limpiar el chat para mostrar solo la instalación
        chatLog.innerHTML = "";
    
        // Mostrar el mensaje de instalación
        typeMessage("Instalando Animal AI...");
    
        // Crear la barra de progreso
        progressBar = document.createElement('progress'); // Asegúrate de que esto esté antes de usar progressBar
        progressBar.setAttribute('max', listaComandos.length + listaScripts.length); // Total de comandos y scripts
        progressBar.setAttribute('value', 0); // Comenzamos en 0
        chatLog.appendChild(progressBar);
    
        // Crear el texto que indica el progreso de instalación
        const textoInstalacion = document.createElement('div');
        chatLog.appendChild(textoInstalacion);
    
        // Crear el texto que muestra el tamaño de los archivos
        const textoTamano = document.createElement('div');
        chatLog.appendChild(textoTamano);
    
        // Crear el botón de cancelar
        const botonCancelar = document.createElement('button');
        botonCancelar.innerText = "Cancelar instalación";
        chatLog.appendChild(botonCancelar);
    
        // Actualizar el tamaño inicial en GB
        textoTamano.innerText = `${(currentSize / 1000).toFixed(2)} GB / ${(totalSize / 1000).toFixed(2)} GB`;
    
        let indexComando = 0;
    
        function instalarComando() {
            if (indexComando < listaComandos.length) {
                // Simular la instalación del comando
                currentSize += sizePerElement;
                textoInstalacion.innerText = `Instalando ${listaComandos[indexComando]}...`;
                textoTamano.innerText = `${(currentSize / 1000).toFixed(2)} GB / ${(totalSize / 1000).toFixed(2)} GB`;
                progressBar.value = indexComando + 1;
                indexComando++;
    
                // Instalar el siguiente comando después de un pequeño delay (500 ms)
                setTimeout(instalarComando, 500); // Puedes ajustar el tiempo aquí
            } else {
                // Completada la instalación de comandos
                textoInstalacion.innerText = "Instalación de comandos completada. Iniciando instalación de scripts...";
                progressBar.value = listaComandos.length; // Completar la barra de comandos
    
                // Iniciar instalación de scripts después de 1 segundo
                setTimeout(iniciarInstalacionScripts, 1000);
            }
        }
    
        // Ejecutar la instalación rápida de comandos
        instalarComando();
    
        // Evento para el botón de cancelar
        botonCancelar.addEventListener("click", () => {
            cerrarAppConMensaje("Instalación cancelada.");
        });
    
        // Función para iniciar la instalación de scripts
        function iniciarInstalacionScripts() {
            const textoInstalacionScripts = document.createElement('div');
            chatLog.appendChild(textoInstalacionScripts);
            
            let indexScript = 0;
    
            function instalarScript() {
                if (indexScript < listaScripts.length) {
                    // Simular instalación del script
                    currentSize += sizePerElement;
                    textoInstalacionScripts.innerText = `Instalando Scripts: ${listaScripts[indexScript]}...`;
                    textoTamano.innerText = `${(currentSize / 1000).toFixed(2)} GB / ${(totalSize / 1000).toFixed(2)} GB`;
                    progressBar.value = listaComandos.length + indexScript + 1; // Actualizar barra de progreso
                    indexScript++;
    
                    // Instalar el siguiente script después de un pequeño delay (500 ms)
                    setTimeout(instalarScript, 500); // Puedes ajustar el tiempo aquí
                } else {
                    // Instalación completada
                    textoInstalacionScripts.innerText = "Instalación de scripts completada. ¡Animal AI está lista para usarse!";
                    setTimeout(() => {
                        // Limpiar todos los mensajes y la barra de progreso después de unos segundos
                        chatLog.innerHTML = ""; // Limpiar el chat
                        solicitarPaisUsuario();
                    }, 1000); // Esperar 2 segundos antes de eliminar todo
                    setTimeout(() => {
                        handleSeleccionarModeloIA();
                    }, 15000); // Esperar 15 segundos antes de seleccionar el modelo
                }
            }
    
            // Ejecutar la instalación de scripts
            instalarScript();
        }
    }

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


    // Lista de modelos de IA disponibles con costos
    const modelosIA = [
        { nombre: 'Animal AI BETA', descripcion: 'IA para lo básico', costo: 0, funcionalidad: () => typeMessage('Animal AI BETA activado. Funcionalidades básicas disponibles.') },
        { nombre: 'Animal AI Pro', descripcion: 'Para tareas más complejas.', costo: 20, funcionalidad: () => typeMessage('Animal AI Pro activado. Tareas avanzadas listas para ejecutarse.') },
        { nombre: 'Animal AI Infinity', descripcion: 'Te permite crear comandos, pedirlos y tenerlos en un par de horas.', costo: 50, funcionalidad: handleInfinityFuncionalidad },
        { nombre: 'Animal AI X-Gen', descripcion: 'Gana Animal Tokens cada hora!', costo: 30 },
        { nombre: 'Animal AI X-Gen Plus', descripcion: 'Gana Animal Tokens cada 1 hora!', costo: 1000, funcionalidad: handleXGenFuncionalidad }
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
        typeMessage(`Has seleccionado: ${modelo.nombre}. Costo: ${modelo.costo} Animal Tokens.`);
        
        // Verifica si el saldo es suficiente antes de realizar la transacción
        if (animalTokens >= modelo.costo) {
            // Llama a la función de transacción para pagar por el modelo
            animalPayTransaction(modelo.costo, animalTokens, modelo.costo, true, (transaccionExitosa) => {
                if (transaccionExitosa) {
                    // La transacción fue exitosa, el saldo ya ha sido deducido en animalPayTransaction
                    typeMessage(`✅ Has adquirido ${modelo.nombre} exitosamente! Se han removido ${modelo.costo} Animal Tokens de tu saldo. Tu saldo actual es: ${animalTokens} Animal Tokens.`);
                    
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
        { nombre: "/explora-biomas", estado: "de-pago" },
        { nombre: "/conservacion", estado: "plateado" },
        { nombre: "/fenomenos-espaciales", estado: "plateado" },
        { nombre: "/supervivencia", estado: "plateado" },
        { nombre: "/lineas", estado: "lila" },
        { nombre: "/generar-blog", estado: "funcionalverde" },
        { nombre: "/PPOT", estado: "verde" },
        { nombre: "/limpieza", estado: "funcionalverde" },
        { nombre: "/update", estado: "funcionalverde" },
        { nombre: "/proximo-comando", estado: "funcionalverde" },
        { nombre: "/verificacion-final", estado: "funcionalverde" },
        { nombre: "/pase-de-temporada", estado: "inactivo" },
        { nombre: "/comando-existente", estado: "funcionalverde" },
        { nombre: "/resumir-texto", estado: "ambar" },
        { nombre: "/gatitos", estado: "funcionalverde" },
        { nombre: "/reproductor-de-musica", estado: "funcionalverde" },
        { nombre: "/animal-random", estado: "funcionalverde" },
        { nombre: "/intercambio-de-moneda", estado: "funcionalverde" },
        { nombre: "/sombra-asesina", estado: "verde" },
        { nombre: "/comprar-moneda", estado: "funcionalverde" },
        { nombre: "/generar-codigo", estado: "administrador" },
        { nombre: "/generar-imagenes", estado: "turquesa" },
        { nombre: "/configuracion", estado: "funcionalverde" },
        { nombre: "/acceder", estado: "verde" },
        { nombre: "/unirse", estado: "verde" },
        { nombre: "/usuarios", estado: "verde" },
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
        "de-pago": "Comando con Transacciones"
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
        "de-pago": "Este comando requiere una transacción o suscripción para ser utilizado."
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
const ratioConversion = 1000; // 1000 Créditos de Fobia = 1 Animal Token

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
    }
    
    function mostrarSaldoFobia() {
        typeMessage(`Tienes ${saldoCreditosFobia} Créditos de Fobia y ${animalTokens} Animal Tokens.`);
        
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
    }

    function convertirFobiaTokens(tokensPosibles) {
        if (tokensPosibles >= 1) {
            saldoCreditosFobia -= tokensPosibles * ratioConversion;
            animalTokens += tokensPosibles;
            typeMessage(`Has convertido ${tokensPosibles} Animal Tokens. Saldo actual: ${animalTokens} Animal Tokens y ${saldoCreditosFobia} Créditos de Fobia.`);
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
    
    
    
    // Simulación del estado del servidor 
    let servidorActivo = true; // Inicialmente, los servidores están inactivos
    let intervaloVerificacion; // Guardaremos el intervalo de verificación
    
    // Función para iniciar la app
    function iniciarApp() {
        if (!servidorActivo) {
            typeMessage("⚠️ No se ha podido conectar con los servidores de Animal AI.");
            
            // Esperar 5 segundos y luego simular el cierre de la aplicación
            setTimeout(cerrarApp, 5000);
        } else {
            typeMessage("Servidores: Activos, Animal AI funcionando correctamente.");
            
            // Iniciar verificación periódica del estado del servidor
          intervaloVerificacion = setInterval(verificarEstadoServidor, 3000); // Verificar cada 3 segundos
        }
    }
    
    // Simulación de verificación del estado del servidor en tiempo real
    function verificarEstadoServidor() {
        // Aquí simulamos el cambio de estado (en una app real se podría hacer una petición AJAX para consultar el servidor)
        if (!servidorActivo) {
            // Si los servidores caen mientras los usuarios están conectados
            typeMessage("⚠️ Los servidores de Animal AI se han desconectado. Cerrando la aplicación...");
            
            // Cerrar la app después de 5 segundos
            setTimeout(cerrarApp, 5000);
            
            // Detener el intervalo de verificación
            clearInterval(intervaloVerificacion);
        }
    }
    
    // Función para cerrar la aplicación (simulado)
    function cerrarApp() {
        typeMessage("Cerrando la aplicación...");
        
       // Simulación del cierre de la app
setTimeout(() => {
    document.body.innerHTML = `
        <div class="error-container">
            <div class="error-content">
                <h1 class="error-title">Conexión perdida con los servidores de Animal AI</h1>
                <p class="error-message">
                    Es posible que los servidores estén inactivos temporalmente debido a problemas técnicos. Te recomendamos seguirnos en nuestras redes sociales para obtener actualizaciones en tiempo real. 
                </p>
                <p class="error-info">
                    Si esta desconexión es permanente, lo anunciaremos oficialmente en este mismo espacio. Lamentamos los inconvenientes causados.
                </p>
                <div class="error-links">
                    <a href="https://x.com/AnimalAIOficial" target="_blank">Twitter</a>
                </div>
            </div>
        </div>
    `;
}, 2000); // Mensaje final y simular cierre definitivo

// Estilos CSS para el mensaje de cierre
const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background-color: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .error-container {
        text-align: center;
        background-color: white;
        padding: 50px;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        max-width: 600px;
        width: 90%;
    }

    .error-title {
        color: #ff6b6b;
        font-size: 32px;
        margin-bottom: 20px;
    }

    .error-message {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
    }

    .error-info {
        font-size: 16px;
        color: #555;
        margin-bottom: 30px;
    }

    .error-links {
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    .error-links a {
        color: #ff6b6b;
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
    }

    .error-links a:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(style);

    }   
    iniciarInstalacion();
    iniciarApp();
});


// Función que maneja el splash screen y redirige a index.html después de la animación
function showSplashScreenAndRedirect() {
    setTimeout(() => {
        // Ocultar el splash screen después de la animación
        document.getElementById('splash-screen').style.display = 'none';

        // Esperar 1 segundo antes de redirigir a index.html
        setTimeout(() => {
            window.location.href = 'animalai.html';
        }, 3000); // 1 segundo de espera antes de la redirección

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
