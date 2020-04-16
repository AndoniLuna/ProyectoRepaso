"use strict";
// este array se carga de forma asincrona mediante Ajax
//const endpoint = 'http://127.0.0.1:5500/appclient/js/data/persona.json';
const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];

window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');    
    listener();

    initGallery();

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
        const url = endpoint + personaSeleccionada.id;
        ajax("DELETE", url, undefined)
            .then( data => {
                // conseguir de nuevo todos los alumnos
                ajax("GET", endpoint, undefined)               
                .then( data => {
                        console.trace('promesa resolve'); 
                        personas = data;
                        pintarLista( personas );
            
                }).catch( error => {
                        console.warn('promesa rejectada');
                        alert(error);
                });

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
            document.getElementById('inputAvatar').value = personaSeleccionada.avatar;
            document.getElementsByName('inputSexo').value = personaSeleccionada.sexo;

            //seleccionar Avatar
            const avatares = document.querySelectorAll('#gallery img');
            avatares.forEach( el => {
                el.classList.remove('selected');
                if ( "img/"+personaSeleccionada.avatar == el.dataset.path ){
                    el.classList.add('selected');
                }
            });

            const sexo = personaSeleccionada.sexo;
            let checkHombre = document.getElementById('sexoh');
            let checkMujer = document.getElementById('sexom');

            if ( sexo == "h"){
                checkHombre.checked = 'checked';
                checkMujer.checked = '';

            }else{
                checkHombre.checked = '';
                checkMujer.checked = 'checked';
            }

            /*
            let select = document.getElementById('inputSexo');
            const sexo = personaSeleccionada.sexo;
            switch( sexo ){
                case "h":
                    select.item(1).selected = "selected";
                    break;
                case "m":
                    select.item(2).selected = "selected";
                    break;
                default:
                    select.item(0).selected = "selected";
                    break;
            }
            */

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });
    }else{
        personaSeleccionada = { "id":0, "nombre": "sin nombre" , "avatar" : "avatar7.png", "sexo": "h" };
        //rellernar formulario
        document.getElementById('inputId').value = personaSeleccionada.id;
        document.getElementById('inputNombre').value = personaSeleccionada.nombre;
        document.getElementById('inputAvatar').value = personaSeleccionada.avatar;
        document.getElementById('inputSexo').value = personaSeleccionada.sexo;

        //seleccionar Avatar
        const avatares = document.querySelectorAll('#gallery img');
        avatares.forEach( el => {
            el.classList.remove('selected');
            if ( "img/"+personaSeleccionada.avatar == el.dataset.path ){
                el.classList.add('selected');
            }
        });

        const sexo = personaSeleccionada.sexo;
        let checkHombre = document.getElementById('sexoh');
        let checkMujer = document.getElementById('sexom');

        if ( sexo == "h"){
            checkHombre.checked = 'checked';
            checkMujer.checked = '';

        }else{
            checkHombre.checked = '';
            checkMujer.checked = 'checked';
        }

        /*
        let select = document.getElementById('inputSexo');
        const sexo = personaSeleccionada.sexo;
        switch( sexo ){
            case "h":
                select.item(1).selected = "selected";
                break;
            case "m":
                select.item(2).selected = "selected";
                break;
            default:
                select.item(0).selected = "selected";
        }
        */
    }
   
}

function guardar(){

    console.trace('click guardar');
    let id = document.getElementById('inputId').value;
    let nombre = document.getElementById('inputNombre').value;
    const avatar = document.getElementById('inputAvatar').value;
    //const sexo = document.getElementById('inputSexo').value;
    //const sexo = document.getElementsByName('inputSexo').value;
    let sexo = document.getElementById('sexoh').value;
    if (document.getElementById('sexom').checked){
        sexo = document.getElementById('sexom').value;
    }

    let persona = {
        "id" : parseInt(id),
        "nombre" : nombre,
        "avatar" : avatar,
        "sexo"   : sexo
    };

    console.debug('persona a guardar %o', persona);

    //personas.push(persona);
    //pintarLista(personas);

    if (persona.id == 0){
        ajax("POST", endpoint, persona)
        .then( data => { 
            // conseguir de nuevo todos los alumnos
            ajax("GET", endpoint, undefined)               
            .then( data => {
                    console.trace('promesa resolve'); 
                    personas = data;
                    pintarLista( personas );
        
            }).catch( error => {
                    console.warn('promesa rejectada');
                    alert(error);
            });

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });
    }else{
        ajax("PUT", `http://localhost:8080/apprest/api/personas/${persona.id}`, persona)
        .then( data => {
            // conseguir de nuevo todos los alumnos
            ajax("GET", endpoint, undefined)               
            .then( data => {
                    console.trace('promesa resolve'); 
                    personas = data;
                    pintarLista( personas );
        
            }).catch( error => {
                    console.warn('promesa rejectada');
                    alert(error);
            });

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

/**
 * Carga todas las imagen de los avatares
 */
function initGallery(){
    let divGallery =  document.getElementById('gallery');
    for ( let i = 1; i <= 7 ; i++){
        divGallery.innerHTML += `<img onclick="selectAvatar(event)" 
                                      class="avatar" 
                                      data-path="img/avatar${i}.png"
                                      src="img/avatar${i}.png">`;
    }
}

function selectAvatar(evento){
    console.trace('click avatar');
    const avatares = document.querySelectorAll('#gallery img');
    //eliminamos la clases 'selected' a todas las imagenes del div#gallery
    avatares.forEach( el => el.classList.remove('selected') );
    // ponemos clase 'selected' a la imagen que hemos hecho click ( evento.target )
    evento.target.classList.add('selected');

    let iAvatar = document.getElementById('inputAvatar');
    //@see: https://developer.mozilla.org/es/docs/Learn/HTML/como/Usando_atributos_de_datos
    iAvatar.value = evento.target.dataset.path;
    iAvatar.value = iAvatar.value.slice(4,15);

}