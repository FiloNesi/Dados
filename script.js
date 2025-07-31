// script.js

function crearRutaImagen(texto) {
    const nombreArchivo = texto.toLowerCase().replace(/[¿?]/g, '').replace(/\s+/g, '_');
    return `imagenes/${nombreArchivo}.png`;
}

const dado1_conceptos = ["Causa y Efecto", "El Ser", "La Nada", "Devenir", "Esencia", "Existencia"].map(crearRutaImagen);
const dado2_autores = ["imagenes/platon.jpg", "imagenes/aristoteles.jpg", "imagenes/kant.jpg", "imagenes/nietzsche.jpg", "imagenes/descartes.jpg", "imagenes/wittgenstein.jpg"];
const dado3_preguntas = ["¿Qué es la verdad?", "¿Somos libres?", "¿Existe Dios?", "¿Qué es la justicia?", "¿Cómo debo vivir?", "¿Qué es la belleza?"].map(crearRutaImagen);
const dado4_ismos = ["Racionalismo", "Empirismo", "Existencialismo", "Estoicismo", "Idealismo", "Materialismo"].map(crearRutaImagen);
const dado5_conceptos2 = ["Alma", "Cuerpo", "Mente", "Realidad", "Virtualidad", "Lenguaje"].map(crearRutaImagen);
const dado6_etica = ["El Bien", "El Mal", "Virtud", "Deber", "Felicidad", "Utilitarismo"].map(crearRutaImagen);
const dado7_politica = ["Estado", "Poder", "Ley", "Ciudadano", "Democracia", "Contrato Social"].map(crearRutaImagen);
const dado8_metaforas = ["La Caverna", "El Eterno Retorno", "El Genio Maligno", "La Muerte de Dios", "El Superhombre", "El Velo de la Ignorancia"].map(crearRutaImagen);
const dado9_autores2 = ["Sócrates", "Foucault", "Simone de Beauvoir", "Hume", "Spinoza", "Hannah Arendt"].map(crearRutaImagen);

const todosLosDados = [dado1_conceptos, dado2_autores, dado3_preguntas, dado4_ismos, dado5_conceptos2, dado6_etica, dado7_politica, dado8_metaforas, dado9_autores2];

const botonLanzar = document.getElementById('lanzar-btn');
const sliderDados = document.getElementById('numero-dados');
const valorSlider = document.getElementById('valor-slider');
const contenedorResultado = document.getElementById('resultado-dados');
const contenedorHistorial = document.getElementById('historial');

sliderDados.oninput = function() {
    valorSlider.innerHTML = this.value;
}

function getNombreParaAlt(ruta) {
    const nombreArchivo = ruta.split('/').pop();
    const sinExtension = nombreArchivo.substring(0, nombreArchivo.lastIndexOf('.'));
    const nombreLegible = sinExtension.replace(/_/g, ' ');
    return nombreLegible.charAt(0).toUpperCase() + nombreLegible.slice(1);
}

botonLanzar.addEventListener('click', function() {
    contenedorResultado.innerHTML = '';
    const numeroDeLanzamientos = sliderDados.value;
    let resultadosActuales = [];

    for (let i = 0; i < numeroDeLanzamientos; i++) {
        const dadoElegido = todosLosDados[i];
        const caraAleatoria = Math.floor(Math.random() * dadoElegido.length);
        const conceptoGanador = dadoElegido[caraAleatoria];
        
        resultadosActuales.push(conceptoGanador);
        
        const dadoDiv = document.createElement('div');
        dadoDiv.classList.add('dado');
        const altText = getNombreParaAlt(conceptoGanador);
        dadoDiv.innerHTML = `<img src="${conceptoGanador}" alt="${altText}" style="max-width:100px; max-height:100px;">`;
        contenedorResultado.appendChild(dadoDiv);
    }
    
    actualizarHistorial(resultadosActuales);
});

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
