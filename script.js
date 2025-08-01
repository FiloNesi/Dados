oss// script.js

// --- Definición de Dados ---
const nombresDeDados = [
    "Conceptos", "Autores", "Acciones", "Objetos", "Conceptos II", 
    "Ética", "Política", "Metáforas", "Autores II"
];

function crearRutaImagen(texto) {
    const nombreArchivo = texto.toLowerCase().replace(/[¿?]/g, '').replace(/\s+/g, '_');
    return `imagenes/${nombreArchivo}.png`;
}

const dado1_conceptos = ["imagenes/dios.png", "imagenes/icon1.png", "imagenes/libertad.png", "imagenes/tiempo.png", "imagenes/destino.png", "imagenes/esencia.png"];
const dado2_autores = ["imagenes/platon.jpg", "imagenes/aristoteles.jpg", "imagenes/kant.jpg", "imagenes/nietzsche.jpg", "imagenes/descartes.png", "imagenes/wittgenstein.jpg"];
const dado3_acciones = ["imagenes/acciones1/caminar.png", "imagenes/acciones1/construir.png", "imagenes/acciones1/saltar.png", "imagenes/acciones1/mirar.png", "imagenes/acciones1/pensar.png", "imagenes/acciones1/toser.png"];
const dado4_objetos = ["imagenes/objetos1/arcoriris.png", "imagenes/objetos1/balanza.png", "imagenes/objetos1/candado.png", "imagenes/objetos1/llave.png", "imagenes/objetos1/lupa.png", "imagenes/objetos1/manzana.png"];
const dado5_conceptos2 = ["Alma", "Cuerpo", "Mente", "Realidad", "Virtualidad", "Lenguaje"].map(crearRutaImagen);
const dado6_etica = ["El Bien", "El Mal", "Virtud", "Deber", "Felicidad", "Utilitarismo"].map(crearRutaImagen);
const dado7_politica = ["Estado", "Poder", "Ley", "Ciudadano", "Democracia", "Contrato Social"].map(crearRutaImagen);
const dado8_metaforas = ["La Caverna", "El Eterno Retorno", "El Genio Maligno", "La Muerte de Dios", "El Superhombre", "El Velo de la Ignorancia"].map(crearRutaImagen);
const dado9_autores2 = ["Sócrates", "Foucault", "Simone de Beauvoir", "Hume", "Spinoza", "Hannah Arendt"].map(crearRutaImagen);

const todosLosDados = [dado1_conceptos, dado2_autores, dado3_acciones, dado4_objetos, dado5_conceptos2, dado6_etica, dado7_politica, dado8_metaforas, dado9_autores2];

// --- Obtener los elementos del HTML ---
const botonLanzar = document.getElementById('lanzar-btn');
const contenedorSeleccion = document.getElementById('seleccion-dados');
const contenedorResultado = document.getElementById('resultado-dados');
const contenedorHistorial = document.getElementById('historial');

// --- NUEVO: Elementos para la funcionalidad de IA ---
const botonGenerarGemini = document.getElementById('generar-gemini-btn');
const contenedorGemini = document.getElementById('gemini-container');
const respuestaGemini = document.getElementById('gemini-respuesta');
let ultimosResultadosParaIA = []; // Variable para guardar los resultados

// --- Lógica de la aplicación ---

function popularSeleccionDeDados() {
    nombresDeDados.forEach((nombre, index) => {
        const opcionDiv = document.createElement('div');
        opcionDiv.classList.add('opcion-dado');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `dado-${index}`;
        checkbox.value = index;
        if (index < 3) {
            checkbox.checked = true;
        }
        const label = document.createElement('label');
        label.htmlFor = `dado-${index}`;
        label.textContent = nombre;
        opcionDiv.appendChild(checkbox);
        opcionDiv.appendChild(label);
        contenedorSeleccion.appendChild(opcionDiv);
    });
}

botonLanzar.addEventListener('click', function() {
    contenedorResultado.innerHTML = '';
    let resultadosActuales = [];
    ultimosResultadosParaIA = []; // Limpiar resultados anteriores
    
    const checkboxesSeleccionados = document.querySelectorAll('#seleccion-dados input[type="checkbox"]:checked');
    
    checkboxesSeleccionados.forEach(checkbox => {
        const indiceDado = parseInt(checkbox.value, 10);
        const dadoElegido = todosLosDados[indiceDado];
        const caraAleatoria = Math.floor(Math.random() * dadoElegido.length);
        const conceptoGanador = dadoElegido[caraAleatoria];
        resultadosActuales.push(conceptoGanador);
        
        const dadoDiv = document.createElement('div');
        dadoDiv.classList.add('dado');
        const altText = getNombreParaAlt(conceptoGanador);
        
        // MODIFICADO: Guardamos el texto alternativo para usarlo con la IA
        ultimosResultadosParaIA.push(altText);
        
        dadoDiv.innerHTML = `<img src="${conceptoGanador}" alt="${altText}" style="max-width:100px; max-height:100px;">`;
        contenedorResultado.appendChild(dadoDiv);
    });
    
    if (resultadosActuales.length > 0) {
        actualizarHistorial(resultadosActuales);
        // NUEVO: Mostrar el botón para generar reflexión
        botonGenerarGemini.style.display = 'block';
        respuestaGemini.textContent = 'Lanza los dados y pulsa el botón "Generar Reflexión con IA" para ver la magia.';
    } else {
        // Ocultar si no se lanzó ningún dado
        botonGenerarGemini.style.display = 'none';
    }
});

// --- NUEVO: Lógica para el botón de IA ---
botonGenerarGemini.addEventListener('click', function() {
    if (ultimosResultadosParaIA.length === 0) {
        respuestaGemini.textContent = "Por favor, lanza los dados primero.";
        return;
    }

    // Preparamos el prompt para la IA
    const prompt = `Genera una reflexión filosófica breve que conecte los siguientes conceptos: ${ultimosResultadosParaIA.join(', ')}.`;
    
    // Simulamos una llamada a la IA
    respuestaGemini.textContent = 'Generando... 🧠';
    
    // Usamos un timeout para simular el tiempo de respuesta de la red
    setTimeout(() => {
        const textoGenerado = simularLlamadaGemini(prompt);
        respuestaGemini.textContent = textoGenerado;
    }, 1500);
});

/**
 * NUEVO: Simulación de una función de IA.
 * En una aplicación real, aquí harías una llamada (fetch) a un servicio de IA.
 * Para este ejemplo, devolvemos un texto pre-generado que incluye los conceptos.
 */
function simularLlamadaGemini(prompt) {
    const conceptos = ultimosResultadosParaIA.join(', ');
    return `Reflexión sobre: ${conceptos}. La intersección de estos conceptos nos invita a un profundo análisis. ¿Podría ser que la ${ultimosResultadosParaIA[0].toLowerCase()} sea simplemente una construcción del ${ultimosResultadosParaIA[1].toLowerCase()} para dar sentido a nuestra existencia? Desde una perspectiva existencialista, cada individuo debe forjar su propia respuesta ante esta disyuntiva, confrontando la ${ultimosResultadosParaIA[2].toLowerCase()} con la autenticidad de su ser. Este diálogo entre ideas dispares es el corazón mismo del quehacer filosófico.`;
}


function getNombreParaAlt(ruta) {
    const nombreArchivo = ruta.split('/').pop();
    const sinExtension = nombreArchivo.substring(0, nombreArchivo.lastIndexOf('.'));
    const nombreLegible = sinExtension.replace(/_/g, ' ');
    return nombreLegible.charAt(0).toUpperCase() + nombreLegible.slice(1);
}

function actualizarHistorial(resultados) {
    const historialItem = document.createElement('div');
    historialItem.classList.add('historial-item');
    resultados.forEach(rutaImagen => {
        const img = document.createElement('img');
        img.src = rutaImagen;
        img.alt = getNombreParaAlt(rutaImagen);
        img.classList.add('historial-img');
        historialItem.appendChild(img);
    });
    contenedorHistorial.prepend(historialItem);
}

// --- Inicialización ---
popularSeleccionDeDados();
