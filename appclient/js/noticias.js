"use strict";
// este array se carga de forma asincrona mediante Ajax
const endpoint = 'http://localhost:8080/apprest/api/noticias';
let noticias = [];

window.addEventListener('load', init() );

/**
 * Se ejecuta cuando todo esta cargado
 */
function init(){
    console.debug('Document Load and Ready');    

    cargarNoticias();

    console.debug('continua la ejecuion del script de forma sincrona');

}// init

/**
 * Pintar el listado de Noticias
 * @param {*} elementos noticias a pintar
 */
function pintarListaNoticias (arrayNoticias ){
    let lista = document.getElementById('noticias');
    lista.innerHTML = ''; // vaciar html 
    arrayNoticias.forEach( (n,i) => lista.innerHTML += `<li>
                                                        <p>Titulo: ${n.titulo}</p>
                                                        <p>Fecha: ${n.fecha}</p>
                                                        <p>${n.contenido}</p>
                                                    </li>`);
}// pintarNoticias

/**
 * Obtiene los datos del servicio rest y pinta la lista de Noticias
 */
function cargarNoticias(){
    ajax("GET", endpoint, undefined)
    .then( data => {
            console.trace('promesa resolve'); 
            noticias = data;
            pintarListaNoticias(noticias);

    }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
    });
}// cargarNoticias