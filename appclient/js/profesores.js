"use strict";
// este array se carga de forma asincrona mediante Ajax
//const endpoint = 'http://127.0.0.1:5500/appclient/js/data/persona.json';
const endpoint = 'http://localhost:8080/apprest/api/';
let personas = [];
let cursos = [];
let personaSeleccionada = [];
let cursoAsignado = [];

window.addEventListener('load', init() );

/**
 * Se ejecuta cuando todo esta cargado
 */
function init(){
    console.debug('Document Load and Ready');    

    cargarPersonas();
    cargarCursos();

    listener();

    console.debug('continua la ejecuion del script de forma sincrona');
    // CUIDADO!!!, es asincrono aqui personas estaria sin datos

}//init

/**
 * Inicializamos los listener de profesores.html
 * 1) selector de sexo y busqueda por nombre
 * 2) filtro de cursos
 * 3) modal
 * 4) filtro buscar personas por nombre
 * @see function filtro
 */
function listener(){

    // 1 Selector de sexo y busqueda por nombre
    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('inombre');
    
    selectorSexo.addEventListener('change', function(){
        console.info('Busqueda sexo %o nombre %o', selectorSexo, inputNombre );
    
        busqueda(selectorSexo.value, inputNombre.value);
    });

    inputNombre.addEventListener('keyup', function(){
        console.debug('tecla pulsada, valor input ' +  busqueda );
        
        busqueda(selectorSexo.value, inputNombre.value);
    });

    // 2 filtro de cursos
    let inombrecurso = document.getElementById("inombrecurso");
    
    inombrecurso.addEventListener('keyup', function(){
        console.debug('tecla pulsada, valor input ' +  inombrecurso.value );
        let cursosFiltrados = [];
        
        ajax("GET", endpoint + 'cursos/?filtro=' + inombrecurso.value, undefined)
            .then( data => {
                console.trace('promesa resolve'); 
                cursosFiltrados = data;
                pintarListaCursos
            ( cursosFiltrados );

            }).catch( error => {
                console.warn('promesa rejectada');
                alert(error);
        });
    });

    // 3 Modal
    let modal = document.getElementById("modal");
    let btmodal = document.getElementById("btmodal");
    let span = document.getElementsByClassName("cerrarmodal")[0];

    // When the user clicks the button, open the modal 
    btmodal.onclick = function() {
        if (!personaSeleccionada.id_rol || personaSeleccionada.id_rol != 1) {
            alert('Antes de asignar cursos, debe seleccionar a un profesor');
        } else {
            modal.style.display = "block";
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // 4 filtro buscar persona por nombre
    let iNombre = document.getElementById('inputNombre');
    let nombreMensaje = document.getElementById('nombreMensaje');

    iNombre.addEventListener('keyup', function(){
        console.debug('tecla pulsada, valor input ' +  iNombre.value );

        if ( personaSeleccionada.nombre != iNombre.value ){

            ajax("GET", endpoint + 'personas/?filtro=' + iNombre.value, undefined)
            .then( data => {
                console.debug('Nombre NO disponible'); 
                nombreMensaje.textContent = 'Nombre NO disponible';
                nombreMensaje.classList.add('invalid');
                nombreMensaje.classList.remove('valid');

            }).catch( error => {
                console.debug('Nombre disponible');
                nombreMensaje.textContent = 'Nombre disponible';
                nombreMensaje.classList.add('valid');
                nombreMensaje.classList.remove('invalid');
            });
        }
        
    });

}// listener

/**
 * Pintar el listado de Personas
 * @param {*} elementos personas a pintar
 */
function pintarListaPersonas( arrayPersonas ){
    //seleccionar la lista por id
    let listapersonas = document.getElementById('personas');
    // vaciar html 
    listapersonas.innerHTML = '';

    arrayPersonas.forEach( (p,i) => listapersonas.innerHTML +=  `<li>
                                                        <img src="img/${p.avatar}" alt="avatar">${p.nombre}
                                                        <i class="fas fa-pencil-ruler" onclick="seleccionar(${i},${p.id})"></i>
                                                    </li>`);
}// pintarListaPersonas

/**
 * Pintar el listado de Cursos
 * @param {*} elementos cursos a pintar
 */
function pintarListaCursos (arrayCursos ){
    let lista = document.getElementById('cursos');
    lista.innerHTML = ''; // vaciar html 
    arrayCursos.forEach( (c,i) => lista.innerHTML += `<li>
                                                        <img src="img/${c.imagen}" alt="${c.nombre}" class="icono">
                                                        <h3>${c.nombre}</h3>
                                                        <span onclick="asignarCurso( -1, ${c.id})" >[x] Asignar</span>
                                                    </li>`);
}// PintarListaCursos

/**
 * 
 * Se ejecuta al pulsar el boton de editar(al lado de cada Persona)
 * Rellena el formulario con los datos de la persona
 * @param {*} id  id de la Persona, si no existe en el array usa personaSeleccionada
 * @see personaSeleccionada = { "id":0, "nombre": "sin nombre" , "avatar" : "img/avatar7.png", "sexo": "h", "cursos": [] };
 */
function seleccionar(indice, id){

    personaSeleccionada = {};

    const promesa = ajax("GET", `http://localhost:8080/apprest/api/personas/${id}`, undefined);
    promesa
    .then( data => {
        console.trace('promesa resolve'); 
        personaSeleccionada = data;
        console.debug('click seleccionar persona %o', personaSeleccionada);
   
        //rellernar formulario
        document.getElementById('inputId').value = personaSeleccionada.id;
        document.getElementById('inputNombre').value = personaSeleccionada.nombre;
        document.getElementById('inputAvatar').value = personaSeleccionada.avatar;
        document.getElementsByName('inputSexo').value = personaSeleccionada.sexo;
        document.getElementById('selectorRol').value = personaSeleccionada.id_rol;

        // Seleccionar sexo
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

        // Mostrar los cursos que la persona seleccionada imparte
        let listaCursosProfesor = document.getElementById('profesores_curso');
        // vaciar html 
        listaCursosProfesor.innerHTML = '';
        const promesa = ajax("GET", `http://localhost:8080/apprest/api/cursos/${id}`, undefined);
        promesa
        .then( data => {
            console.trace('promesa resolve'); 
            cursoAsignado = data;
            cursoAsignado.forEach( el => {
                listaCursosProfesor.innerHTML += `<li>
                                                    ${el.nombre}
                                                    <i class="fas fa-trash" onclick="asignarCurso(0, ${el.id})"></i>
                                                </li>`;
            });
        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });

    }).catch( error => {
        console.warn('promesa rejectada');
        alert(error);
    });
   
}// seleccionar

/**
 * Llama al servicio Rest para hacer un PUT
 */
function guardar(){

    console.trace('click guardar rol');
    let id = document.getElementById('inputId').value;
    let nombre = document.getElementById('inputNombre').value;
    const avatar = document.getElementById('inputAvatar').value;
    let sexo = document.getElementById('sexoh').value;
    if (document.getElementById('sexom').checked){
        sexo = document.getElementById('sexom').value;
    }
    let rol = document.getElementById('selectorRol').value;

    let persona = {
        "id" : parseInt(id),
        "nombre" : nombre,
        "avatar" : avatar,
        "sexo"   : sexo,
        "id_rol" : rol
    };

    console.debug('persona a guardar %o', persona);

    // Comprobamos que se haya seleccionado a una persona
    if (persona.id && persona.id != 0) {
        ajax("PUT", `${endpoint}personas/${persona.id}`, persona)
        .then( data => {
            // conseguir de nuevo todos los alumnos
            ajax("GET", endpoint + 'personas/', undefined)               
            .then( data => {
                console.trace('promesa resolve');
                alert('Rol cambiado'); 
                personas = data;
                pintarListaPersonas( personas );
                // Mantenemos a la persona seleccionada
                seleccionar(0, persona.id);
    
            }).catch( error => {
                console.warn('promesa rejectada');
                alert(error);
            });

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error.informacion);
        });
    }else{
        alert("Debe seleccionar a una persona para modificar su rol");
    } 

}// guardar

/**
 * Obtiene los datos del servicio rest y pinta la lista de Personas
 */
function cargarPersonas(){
    ajax("GET", endpoint + 'personas/', undefined)
    .then( data => {
            console.trace('promesa resolve'); 
            personas = data;
            pintarListaPersonas( personas );

    }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
    });
}// cargarPersonas

/**
 * Carga todos los cursos
 */
function cargarCursos(){
    ajax("GET", endpoint + 'cursos/', undefined)
    .then( data => {
            console.trace('promesa resolve'); 
            cursos = data;
            pintarListaCursos
        ( cursos );

    }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
    });
}// cargarCursos

/**
 * Filtra las personas cuando se buscan por sexo y nombre
 */
function busqueda(sexo, nombre){
    if ('t' != sexo && nombre){
        let personasFiltradas = personas.filter( el => el.sexo == sexo && el.nombre.toLowerCase().includes(nombre));
        pintarListaPersonas(personasFiltradas);
    }else if ('t' === sexo && nombre){
        let personasFiltradas = personas.filter(el => el.nombre.toLowerCase().includes(nombre));
        pintarListaPersonas(personasFiltradas);
    }else if ('t' != sexo && !nombre){
        let personasFiltradas = personas.filter( el => el.sexo == sexo);
        pintarListaPersonas(personasFiltradas);
    }else if('t' === sexo && !nombre){
        pintarListaPersonas(personas);
    }
}// busqueda

/**
 * Función que envia el id de la Persona para asignarla un curso donde será el profesor
 * @param {*} idPersona
 * @param {*} idCurso
 */
function asignarCurso( idPersona, idCurso ){

    //idPersona = (idPersona != 0) ? idPersona : personaSeleccionada.id;
    if (idPersona == -1) {
        idPersona = personaSeleccionada.id;
    }

    let curso = {
        "id" : parseInt(idCurso),
        "id_profesor" : parseInt(idPersona)
    };

    console.debug('curso a guardar %o', curso);

    console.debug(`click asignarCurso idProfesor=${idPersona} idCurso=${idCurso}`);

    const url = endpoint + 'cursos/' + idCurso;
    ajax('PUT', url, curso)
    .then( data => {

        // cerrar modal
        document.getElementById("modal").style.display = 'none';
        
        alert(data.informacion);

        seleccionar(0, personaSeleccionada.id);
    })
    .catch( error => alert(error.informacion));

}// asignarCurso