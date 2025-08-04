// script.js

// ... (Definiciones de dados y constantes de los dados permanecen igual)
const nombresDeDados = ["Conceptos", "Autores", "Acciones", "Objetos", "Personajes", "Objetos II", "Acciones II", "Emociones", "Naturaleza"];
const dado1_conceptos = ["imagenes/dios.png", "imagenes/icon1.png", "imagenes/libertad.png", "imagenes/tiempo.png", "imagenes/destino.png", "imagenes/esencia.png"];
const dado2_autores = ["imagenes/autores/aquino.png", "imagenes/autores/aristoteles.png", "imagenes/autores/descartes.png", "imagenes/autores/kant.png", "imagenes/autores/nietzsche.png", "imagenes/autores/platón.png", "imagenes/autores/spinoza.png", "imagenes/autores/wittgenstein.png"];
const dado3_acciones = ["imagenes/acciones1/caminar.png", "imagenes/acciones1/construir.png", "imagenes/acciones1/saltar.png", "imagenes/acciones1/mirar.png", "imagenes/acciones1/pensar.png", "imagenes/acciones1/toser.png"];
const dado4_objetos = ["imagenes/objetos1/arcoiris.png", "imagenes/objetos1/balanza.png", "imagenes/objetos1/candado.png", "imagenes/objetos1/llave.png", "imagenes/objetos1/lupa.png", "imagenes/objetos1/manzana.png"];
const dado5_personajes = ["imagenes/personajes/astronauta.png", "imagenes/personajes/mago.png", "imagenes/personajes/nina.png", "imagenes/personajes/persona.png", "imagenes/personajes/reina.png", "imagenes/personajes/superheroe.png"];
const dado6_objetos2 = ["imagenes/objetos2/brujula.png", "imagenes/objetos2/caja.png", "imagenes/objetos2/cerebro.png", "imagenes/objetos2/espejo.png", "imagenes/objetos2/libros.png", "imagenes/objetos2/vela.png"];
const dado7_acciones2 = ["imagenes/acciones2/espiral.png", "imagenes/acciones2/explosion.png", "imagenes/acciones2/mano.png", "imagenes/acciones2/paracaidas.png", "magenes/acciones2/mascara.png", "magenes/acciones2/flechas.png"];
const dado8_emociones = ["imagenes/emociones/corazones.png", "imagenes/emociones/enfado.png", "imagenes/emociones/pensativo.png", "imagenes/emociones/sonrisa.png", "imagenes/emociones/sorpresa.png", "imagenes/emociones/tristeza.png"];
const dado9_naturaleza = ["imagenes/naturaleza/arbol.png", "imagenes/naturaleza/luna.png", "imagenes/naturaleza/nube.png", "imagenes/naturaleza/ola.png", "imagenes/naturaleza/roca.png", "imagenes/naturaleza/volcan.png"];
const todosLosDados = [dado1_conceptos, dado2_autores, dado3_acciones, dado4_objetos, dado5_personajes, dado6_objetos2, dado7_acciones2, dado8_emociones, dado9_naturaleza];


// --- Obtener los elementos del HTML ---
const botonLanzar = document.getElementById('lanzar-btn');
const contenedorBasicos = document.getElementById('seleccion-dados-basicos');
const contenedorFilosoficos = document.getElementById('seleccion-dados-filosoficos');
const contenedorResultado = document.getElementById('resultado-dados');
const contenedorHistorial = document.getElementById('historial');
// ✅ OBTENEMOS EL NUEVO CAMPO DE TEXTO
const inputNombreTirada = document.getElementById('nombre-tirada');

// ✅ VARIABLE PARA EL CONTEO DE TIRADAS POR DEFECTO
let numeroDeTirada = 1;

// --- Lógica de la aplicación ---
function popularSeleccionDeDados() {
    const dadosFilosoficos = ["Autores", "Conceptos"];
    nombresDeDados.forEach((nombre, index) => {
        const opcionDiv = document.createElement('div');
        opcionDiv.classList.add('opcion-dado');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `dado-${index}`;
        checkbox.value = index;
        if (index < 3) { checkbox.checked = true; }
        const label = document.createElement('label');
        label.htmlFor = `dado-${index}`;
        label.textContent = nombre;
        opcionDiv.appendChild(checkbox);
        opcionDiv.appendChild(label);
        if (dadosFilosoficos.includes(nombre)) {
            contenedorFilosoficos.appendChild(opcionDiv);
        } else {
            contenedorBasicos.appendChild(opcionDiv);
        }
    });
}

botonLanzar.addEventListener('click', function() {
    contenedorResultado.innerHTML = '';
    let resultadosActuales = [];

    // ✅ GESTIÓN DEL NOMBRE DE LA TIRADA
    let nombreParaLaTirada = inputNombreTirada.value.trim();
    if (nombreParaLaTirada === '') {
        nombreParaLaTirada = `Tirada ${numeroDeTirada}`;
    }

    const checkboxesSeleccionados = document.querySelectorAll('.contenedor-seleccion-dados input[type="checkbox"]:checked');

    if (checkboxesSeleccionados.length === 0) {
        alert("Por favor, selecciona al menos un dado para lanzar.");
        return; // Detiene la ejecución si no hay dados seleccionados
    }

    checkboxesSeleccionados.forEach(checkbox => {
        const indiceDado = parseInt(checkbox.value, 10);
        const dadoElegido = todosLosDados[indiceDado];
        const caraAleatoria = Math.floor(Math.random() * dadoElegido.length);
        const conceptoGanador = dadoElegido[caraAleatoria];
        resultadosActuales.push(conceptoGanador);

        const dadoDiv = document.createElement('div');
        dadoDiv.classList.add('dado');
        const img = document.createElement('img');
        img.src = conceptoGanador;
        img.alt = getNombreParaAlt(conceptoGanador);
        dadoDiv.appendChild(img);
        contenedorResultado.appendChild(dadoDiv);
    });

    if (resultadosActuales.length > 0) {
        // Pasamos el nombre al historial
        actualizarHistorial(resultadosActuales, nombreParaLaTirada);
        numeroDeTirada++; // Incrementamos el contador para la próxima tirada por defecto
        inputNombreTirada.value = ''; // Limpiamos el campo
    }
});

function getNombreParaAlt(ruta) {
    const nombreArchivo = ruta.split('/').pop();
    const sinExtension = nombreArchivo.substring(0, nombreArchivo.lastIndexOf('.'));
    const nombreLegible = sinExtension.replace(/_/g, ' ');
    return nombreLegible.charAt(0).toUpperCase() + nombreLegible.slice(1);
}

// ✅ FUNCIÓN DE HISTORIAL MODIFICADA para aceptar y mostrar el nombre
function actualizarHistorial(resultados, nombre) {
    const historialItem = document.createElement('div');
    historialItem.classList.add('historial-item');

    // Contenedor para la información (el nombre)
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('historial-info');
    
    const nombreSpan = document.createElement('span');
    nombreSpan.classList.add('historial-nombre');
    nombreSpan.textContent = nombre;
    infoDiv.appendChild(nombreSpan);

    // Contenedor para las imágenes de los dados
    const imagenesDiv = document.createElement('div');
    imagenesDiv.classList.add('historial-imagenes');

    resultados.forEach(rutaImagen => {
        const img = document.createElement('img');
        img.src = rutaImagen;
        img.alt = getNombreParaAlt(rutaImagen);
        img.classList.add('historial-img');
        imagenesDiv.appendChild(img);
    });

    // Añadimos la info y las imágenes al item principal del historial
    historialItem.appendChild(infoDiv);
    historialItem.appendChild(imagenesDiv);
    
    contenedorHistorial.prepend(historialItem);
}

// --- Inicialización ---
popularSeleccionDeDados();
