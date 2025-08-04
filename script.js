// script.js

// --- Definición de Dados ---
const nombresDeDados = [
    "Conceptos", "Autores", "Acciones", "Objetos", "Personajes",
    "Objetos II", "Acciones II", "Emociones", "Naturaleza"
];

function crearRutaImagen(texto) {
    const nombreArchivo = texto.toLowerCase().replace(/[¿?]/g, '').replace(/\s+/g, '_');
    return `imagenes/${nombreArchivo}.png`;
}

const dado1_conceptos = ["imagenes/dios.png", "imagenes/icon1.png", "imagenes/libertad.png", "imagenes/tiempo.png", "imagenes/destino.png", "imagenes/esencia.png"];
const dado2_autores = ["imagenes/autores/aquino.png", "imagenes/autores/aristoteles.png", "imagenes/autores/descartes.png", "imagenes/autores/kant.png", "iimagenes/autores/nietzsche.png", "imagenes/autores/platon.png", "imagenes/autores/spinoza.png", "imagenes/autores/wittgenstein.png"];
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
const contenedorSeleccion = document.getElementById('seleccion-dados');
const contenedorResultado = document.getElementById('resultado-dados');
const contenedorHistorial = document.getElementById('historial');

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

    const checkboxesSeleccionados = document.querySelectorAll('#seleccion-dados input[type="checkbox"]:checked');

    checkboxesSeleccionados.forEach(checkbox => {
        const indiceDado = parseInt(checkbox.value, 10);
        const dadoElegido = todosLosDados[indiceDado];
        const caraAleatoria = Math.floor(Math.random() * dadoElegido.length);
        const conceptoGanador = dadoElegido[caraAleatoria];
        resultadosActuales.push(conceptoGanador);

        // ✅ MEJORA: El estilo ya no se define aquí, sino en el CSS
        const dadoDiv = document.createElement('div');
        dadoDiv.classList.add('dado'); // Esta clase aplica los estilos desde style.css

        const img = document.createElement('img');
        img.src = conceptoGanador;
        img.alt = getNombreParaAlt(conceptoGanador);
        
        dadoDiv.appendChild(img);
        contenedorResultado.appendChild(dadoDiv);
    });

    if (resultadosActuales.length > 0) {
        actualizarHistorial(resultadosActuales);
    }
});

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
