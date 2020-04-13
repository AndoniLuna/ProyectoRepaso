"use strict";
// este array se carga de forma asincrona mediante Ajax
//const endpoint = 'http://127.0.0.1:5500/appclient/js/data/persona.json';
const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];

window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');    
    listener();

    cargarAlumnos();

    console.debug('continua la ejecuion del script de forma sincrona');
    // CUIDADO!!!, es asincrono aqui personas estaria sin datos
    // pintarLista( personas );

}//init

/**
 * Inicializamos los listener de index.hml
 */
function listener(){

    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('inombre');



    selectorSexo.addEventListener('change', busqueda( selectorSexo.value, inputNombre.value ) );
    /*
    selectorSexo.addEventListener('change', function(){
        const sexo = selectorSexo.value;
        console.debug('cambiado select ' + sexo);
        if ( 't' != sexo ){
            const personasFiltradas = personas.filter( el => el.sexo == sexo );
            pintarLista(personasFiltradas);
        }else{
            pintarLista(personas);
        }    
    });
    */

    inputNombre.addEventListener('keyup', function(){
        const busqueda = inputNombre.value.toLowerCase();
        console.debug('tecla pulsada, valor input ' +  busqueda );
        if ( busqueda ){
            const personasFiltradas = personas.filter( el => el.nombre.toLowerCase().includes(busqueda));
            pintarLista(personasFiltradas);
        }else{
            pintarLista(personas);
        }    
    });


}

function pintarLista( arrayPersonas ){
    //seleccionar la lista por id
    let lista = document.getElementById('alumnos');
    lista.innerHTML = ''; // vaciar html 
    arrayPersonas.forEach( (p,i) => lista.innerHTML += `<li>
                                                        <img src="img/${p.avatar}" alt="avatar">${p.nombre}
                                                        <i class="fas fa-pencil-ruler" onclick="seleccionar(${i},${p.id})"></i>
                                                        <i class="fas fa-trash" onclick="eliminar(${i},${p.id})"></i>
                                                    </li>`);
}

function eliminar(indice){
    let personaSeleccionada = personas[indice];
    console.debug('click eliminar persona %o', personaSeleccionada);
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada.nombre} ?`;
    if ( confirm(mensaje) ){

        //personas = personas.filter( el => el.id != personaSeleccionada.id) 
        //pintarLista(personas);
        const promesa = ajax("DELETE", `http://localhost:8080/apprest/api/personas/${personaSeleccionada.id}`, undefined);
        promesa
            .then( data => {
                console.trace('promesa resolve'); 
                cargarAlumnos();

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });
    }

}

function seleccionar(indice, id){

    let  personaSeleccionada = {};

    if ( id != 0 ){
        //personaSeleccionada = personas[indice];
        const promesa = ajax("GET", `http://localhost:8080/apprest/api/personas/${id}`, undefined);
        promesa
        .then( data => {
            console.trace('promesa resolve'); 
            personaSeleccionada = data;
            console.debug('click guardar persona %o', personaSeleccionada);
   
            //rellernar formulario
            document.getElementById('inputId').value = personaSeleccionada.id;
            document.getElementById('inputNombre').value = personaSeleccionada.nombre;

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });
    }else{
        personaSeleccionada = { "id":0, "nombre": "sin nombre" };
        //rellernar formulario
        document.getElementById('inputId').value = personaSeleccionada.id;
        document.getElementById('inputNombre').value = personaSeleccionada.nombre;
    }
   
}

function guardar(){

    console.trace('click guardar');
    let id = document.getElementById('inputId').value;
    let nombre = document.getElementById('inputNombre').value;

    let persona = {
        "id" : parseInt(id),
        "nombre" : nombre,
        /*"avatar" : "avatar7.png",
        "sexo"   : "h"*/
    };

    console.debug('persona a guardar %o', persona);

    //personas.push(persona);
    //pintarLista(personas);

    if (persona.id === 0){
        persona.avatar = "avatar7.png";
        persona.sexo = "h";
        const promesa = ajax("POST", `http://localhost:8080/apprest/api/personas/?persona=${persona}`, undefined);
        promesa
        .then( data => {
            console.trace('promesa resolve'); 
            cargarAlumnos();

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });
    }else{
        const promesa = ajax("PUT", `http://localhost:8080/apprest/api/personas/${persona.id}?persona=${persona}`, undefined);
        promesa
        .then( data => {
            console.trace('promesa resolve'); 
            cargarAlumnos();

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });
    }
    

}

function busqueda( sexo = 't', nombreBuscar = '' ){

    console.info('Busqueda sexo %o nombre %o', sexo, nombreBuscar );
    
    if ('t' != sexo && nombreBuscar){
        const personasFiltradas = personas.filter( el => el.sexo == sexo && el.nombre.toLowerCase().includes(nombreBuscar));
        pintarLista(personasFiltradas);
    }else if ('t' === sexo && nombreBuscar){
        const personasFiltradas = personas.filter(el.nombre.toLowerCase().includes(nombreBuscar));
        pintarLista(personasFiltradas);
    }else if ('t' != sexo && !nombreBuscar){
        const personasFiltradas = personas.filter( el => el.sexo == sexo);
        pintarLista(personasFiltradas);
    }else if('t' === sexo && !nombreBuscar){
        pintarLista(personas);
    }

}

function cargarAlumnos(){

    const promesa = ajax("GET", endpoint, undefined);
    promesa
    .then( data => {
            console.trace('promesa resolve'); 
            personas = data;
            pintarLista( personas );

    }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
    });

}