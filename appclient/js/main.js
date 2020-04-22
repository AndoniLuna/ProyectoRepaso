"use strict";
// este array se carga de forma asincrona mediante Ajax
//const endpoint = 'http://127.0.0.1:5500/appclient/js/data/persona.json';
const endpoint = 'http://localhost:8080/apprest/api/';
let personas = [];
let cursos = [];
let personaSeleccionada = [];

window.addEventListener('load', init() );

/**
 * Se ejecuta cuando todo esta cargado
 */
function init(){
    console.debug('Document Load and Ready');    

    initGallery();

    cargarAlumnos();
    cargarCursos();

    listener();

    console.debug('continua la ejecuion del script de forma sincrona');
    // CUIDADO!!!, es asincrono aqui personas estaria sin datos
    // pintarListaAlumnos
( personas );

}//init

/**
 * Inicializamos los listener de index.hml
 */
function listener(){

    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('inombre');

    let modal = document.getElementById("modal");
    let btmodal = document.getElementById("btmodal");
    let span = document.getElementsByClassName("cerrarmodal")[0];
    let inombrecurso = document.getElementById("inombrecurso");
    
    // Buscador
    selectorSexo.addEventListener('change', function(){
        console.info('Busqueda sexo %o nombre %o', selectorSexo, inputNombre );
    
        busqueda(selectorSexo.value, inputNombre.value);
    });

    inputNombre.addEventListener('keyup', function(){
        console.debug('tecla pulsada, valor input ' +  busqueda );
        
        busqueda(selectorSexo.value, inputNombre.value);
    });

    // Modal
    // When the user clicks the button, open the modal 
    btmodal.onclick = function() {
        modal.style.display = "block";
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

    // Buscador del Modal
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

}

function pintarListaAlumnos( arrayPersonas ){
    //seleccionar la lista por id
    let listaalumnos = document.getElementById('alumnos');
    // vaciar html 
    listaalumnos.innerHTML = '';

    arrayPersonas.forEach( (p,i) => listaalumnos.innerHTML +=  `<li>
                                                        <img src="img/${p.avatar}" alt="avatar">${p.nombre}
                                                        <i class="fas fa-pencil-ruler" onclick="seleccionar(${i},${p.id})"></i>
                                                        <i class="fas fa-trash" onclick="eliminar(${i},${p.id})"></i>
                                                        <span class="fright" >${p.cursos.length} cursos</span>
                                                    </li>`);
}

function pintarListaCursos (arrayCursos ){
    let lista = document.getElementById('cursos');
    lista.innerHTML = ''; // vaciar html 
    arrayCursos.forEach( (c,i) => lista.innerHTML += `<li>
                                                        <img src="img/${c.imagen}" alt="${c.nombre}" class="icono">
                                                        <h3>${c.nombre}</h3>
                                                        <span>Precio: ${c.precio} €</span>
                                                        <span onclick="asignarCurso( 0, ${c.id})" >[x] Asignar</span>
                                                    </li>`);
}

function eliminar(indice){
    personaSeleccionada = personas[indice];
    console.debug('click eliminar persona %o', personaSeleccionada);
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada.nombre} ?`;
    if ( confirm(mensaje) ){

        //personas = personas.filter( el => el.id != personaSeleccionada.id) 
        //pintarListaAlumnos
    (personas);
        const url = endpoint + 'personas/' + personaSeleccionada.id;
        ajax("DELETE", url, undefined)
            .then( data => {
                // conseguir de nuevo todos los alumnos
                cargarAlumnos();

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });
    }

}

function seleccionar(indice, id){

    personaSeleccionada = {};

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

            // Mostrar los cursos seleccionados
            let listaCursosAlumno = document.getElementById('alumnos_curso');
            // vaciar html 
            listaCursosAlumno.innerHTML = '';
            personaSeleccionada.cursos.forEach( el => {

                listaCursosAlumno.innerHTML += `<li>
                                                    ${el.nombre}
                                                    <i class="fas fa-trash" onclick="eliminarCurso(event, ${personaSeleccionada.id},${el.id})"></i>
                                                </li>`;
        
            });

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
        });
    }else{
        personaSeleccionada = { "id":0, "nombre": "sin nombre" , "avatar" : "avatar7.png", "sexo": "h", "cursos": [] };
        //rellernar formulario
        document.getElementById('inputId').value = personaSeleccionada.id;
        document.getElementById('inputNombre').value = personaSeleccionada.nombre;
        document.getElementById('inputAvatar').value = personaSeleccionada.avatar;
        document.getElementsByName('inputSexo').value = personaSeleccionada.sexo;

        //seleccionar Avatar
        const avatares = document.querySelectorAll('#gallery img');
        avatares.forEach( el => {
            el.classList.remove('selected');
            if ( 'img/' + personaSeleccionada.avatar == el.dataset.path ){
                el.classList.add('selected');
            }
        });

        //seleccionar Sexo
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
    //pintarListaAlumnos
(personas);

    if (persona.id == 0){
        ajax("POST", endpoint + 'personas/', persona)
        .then( data => { 
            // conseguir de nuevo todos los alumnos
            cargarAlumnos();

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error.informacion);
        });
    }else{
        ajax("PUT", `${endpoint}personas/${persona.id}`, persona)
        .then( data => {
            // conseguir de nuevo todos los alumnos
            ajax("GET", endpoint + 'personas/', undefined)               
            .then( data => {
                    console.trace('promesa resolve'); 
                    personas = data;
                    pintarListaAlumnos
                ( personas );
        
            }).catch( error => {
                    console.warn('promesa rejectada');
                    alert(error);
            });

        }).catch( error => {
            console.warn('promesa rejectada');
            alert(error.informacion);
        });
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

function cargarAlumnos(){
    ajax("GET", endpoint + 'personas/', undefined)
    .then( data => {
            console.trace('promesa resolve'); 
            personas = data;
            pintarListaAlumnos
        ( personas );

    }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
    });
}

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
}

function busqueda(sexo, nombre){
    if ('t' != sexo && nombre){
        let personasFiltradas = personas.filter( el => el.sexo == sexo && el.nombre.toLowerCase().includes(nombre));
        pintarListaAlumnos
    (personasFiltradas);
    }else if ('t' === sexo && nombre){
        let personasFiltradas = personas.filter(el => el.nombre.toLowerCase().includes(nombre));
        pintarListaAlumnos
    (personasFiltradas);
    }else if ('t' != sexo && !nombre){
        let personasFiltradas = personas.filter( el => el.sexo == sexo);
        pintarListaAlumnos
    (personasFiltradas);
    }else if('t' === sexo && !nombre){
        pintarListaAlumnos
    (personas);
    }
}

function eliminarCurso( event, idPersona, idCurso ){

    console.debug(`click eliminarCurso idPersona=${idPersona} idCurso=${idCurso}`);

    const url = endpoint + 'personas/' + idPersona + "/curso/" + idCurso;
    ajax('DELETE', url, undefined)
    .then( data => {
        alert('Curso Eliminado');

        event.target.parentElement.classList.add('animated', 'bounceOut');
        cargarAlumnos();
        seleccionar(0, idPersona);
    })
    .catch( error => alert(error));

}

function asignarCurso( idPersona = 0, idCurso ){

    idPersona = (idPersona != 0) ? idPersona : personaSeleccionada.id;

    console.debug(`click asignarCurso idPersona=${idPersona} idCurso=${idCurso}`);

    const url = endpoint + 'personas/' + idPersona + "/curso/" + idCurso;
    ajax('POST', url, undefined)
    .then( data => {

        // cerrar modal
        document.getElementById("modal").style.display = 'none';
        
        alert(data.informacion);

        const curso = data.data;
        // pintar curso al final de la lista        
        let lista = document.getElementById('alumnos_curso');        
        lista.innerHTML += `<li class="animated bounceIn">  
                                ${curso.nombre}
                                <i class="fas fa-trash" onclick="eliminarCurso(event, ${idPersona},${curso.id})"></i>    
                            </li>`;

        cargarAlumnos();
        seleccionar(0, idPersona);
    })
    .catch( error => alert(error));

}