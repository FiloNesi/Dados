// script.js

// Define aquí los conceptos para cada uno de los 9 posibles dados.
// Cada array es un "dado" de 6 caras.

const dado1_conceptos = ["Causa y Efecto", "El Ser", "La Nada", "Devenir", "Esencia", "Existencia"];
// dado2_autores ahora contiene las rutas de las imágenes
const dado2_autores = [
  "imagenes/platon.jpg",
  "imagenes/aristoteles.jpg",
  "imagenes/kant.jpg",
  "imagenes/nietzsche.jpg",
  "imagenes/descartes.jpg",
  "imagenes/wittgenstein.jpg"
];
const dado3_preguntas = ["¿Qué es la verdad?", "¿Somos libres?", "¿Existe Dios?", "¿Qué es la justicia?", "¿Cómo debo vivir?", "¿Qué es la belleza?"];
const dado4_ismos = ["Racionalismo", "Empirismo", "Existencialismo", "Estoicismo", "Idealismo", "Materialismo"];
const dado5_conceptos2 = ["Alma", "Cuerpo", "Mente", "Realidad", "Virtualidad", "Lenguaje"];
const dado6_etica = ["El Bien", "El Mal", "Virtud", "Deber", "Felicidad", "Utilitarismo"];
const dado7_politica = ["Estado", "Poder", "Ley", "Ciudadano", "Democracia", "Contrato Social"];
const dado8_metaforas = ["La Caverna", "El Eterno Retorno", "El Genio Maligno", "La Muerte de Dios", "El Superhombre", "El Velo de la Ignorancia"];
const dado9_autores2 = ["Sócrates", "Foucault", "Wittgenstein", "Hume", "Spinoza", "Hannah Arendt"];

// Unimos todos los dados en un solo array para poder elegirlos fácilmente.
const todosLosDados = [
  dado1_conceptos,
  dado2_autores,
  dado3_preguntas,
  dado4_ismos,
  dado5_conceptos2,
  dado6_etica,
  dado7_politica,
  dado8_metaforas,
  dado9_autores2,
];
// script.js (continuación)

// --- Obtener los elementos del HTML para poder manipularlos ---
const botonLanzar = document.getElementById('lanzar-btn');
const sliderDados = document.getElementById('numero-dados');
const valorSlider = document.getElementById('valor-slider');
const contenedorResultado = document.getElementById('resultado-dados');
const contenedorHistorial = document.getElementById('historial');

// --- Lógica de la aplicación ---

// Actualiza el número visible al lado del slider cuando se mueve.
sliderDados.oninput = function() {
    valorSlider.innerHTML = this.value;
}

// Esto es lo que ocurre cuando se pulsa el botón "Lanzar Dados"
botonLanzar.addEventListener('click', function() {
    // 1. Limpiamos el resultado anterior.
    contenedorResultado.innerHTML = '';
    
    // 2. Obtenemos cuántos dados quiere lanzar el usuario.
    const numeroDeLanzamientos = sliderDados.value;
    
    // 3. Creamos un array para guardar los resultados de este lanzamiento.
    let resultadosActuales = [];

    // 4. Hacemos un bucle, una vez por cada dado que queremos lanzar.
    for (let i = 0; i < numeroDeLanzamientos; i++) {
        // Elegimos un "dado" (un array de conceptos) al azar de nuestra lista.
        const dadoElegido = todosLosDados[i];
        
        // Elegimos una "cara" (un concepto) al azar de ese dado.
        const caraAleatoria = Math.floor(Math.random() * dadoElegido.length);
        const conceptoGanador = dadoElegido[caraAleatoria];
        
        // Guardamos el resultado.
        resultadosActuales.push(
          // Para historial: si es dado2, muestra solo el nombre del archivo sin extensión
          (i === 1) ? conceptoGanador.split('/').pop().replace('.jpeg', '') : conceptoGanador
        );
        
        // Creamos un elemento visual para el dado y lo mostramos.
        const dadoDiv = document.createElement('div');
        dadoDiv.classList.add('dado');
        if (i === 1) {
          // Para el segundo dado, muestra la imagen
          dadoDiv.innerHTML = `<img src="${conceptoGanador}" alt="Autor" style="max-width:100px; max-height:100px;">`;
        } else {
          // Para los demás, muestra el texto
          dadoDiv.textContent = conceptoGanador;
        }
        contenedorResultado.appendChild(dadoDiv);
    }
    
    // 5. Actualizamos el historial.
    actualizarHistorial(resultadosActuales);
});

// Función para añadir el resultado al historial.
function actualizarHistorial(resultados) {
    const historialItem = document.createElement('div');
    historialItem.classList.add('historial-item');
    // Une todos los conceptos con comas y los muestra.
    historialItem.textContent = resultados.join(' • '); 
    
    // Lo añade al principio del historial (prepend) para que los más nuevos estén arriba.
    contenedorHistorial.prepend(historialItem);
}
