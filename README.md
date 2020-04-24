# ProyectoRepaso
Este proyecto tiene 2 aplicaciones. Appclient y Apprest.

## Appclient
Es la aplicación cliente la cual se encargara mediante llamadas AJAX de llamar al servicio AppRest y mostrar los datos que este devuelva.

## Apprest
Es un servicio Rest que nos permitira ver la lista de alumnos, modificar/añadir y eliminar alumnos. También nos permitira asignar o designar cursos a los alumnos y ver la lista de cursos, pero no podremos crear, modificar o eliminar cursos.

![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/Inicio.PNG)

- **Appclient**

    - Introducción: Es la aplicación cliente la cual se encargara mediante llamadas AJAX de llamar al servicio AppRest y mostrar  los datos que este devuelva.
  
    - Tecnología usada: Esta aplicación utiliza HTML5, CSS3 y JAVASCRIPT.
  
    - Configuración: Una vez descargado el proyecto, es necesario acceder al archivo js main.js cuya ruta dentro del proyecto es "js/main.js" y modificar la variable **endpoint**, a la cual habrá que decirle la dirección del servidor que ejecute el servicio rest del proyecto **Apprest**.
  
- **Apprest**

    - Introducción: Es un servicio Rest que nos permitira ver la lista de alumnos, modificar/añadir y eliminar alumnos. También nos permitira asignar o designar cursos a los alumnos y ver la lista de cursos, pero no podremos crear, modificar o eliminar cursos.
  
    - Tecnología usada: Esta aplicación utiliza JAVA y SQL
  
    - Configuración: Una vez descargado el proyecto, es necesario acceder a la clase que se encarga de la conexión a la base de datos, esa clase es es ConnectionManager.java y su ruta es: apprest/src/com/ipartek/formacion/model/dao/ Dentro de ella se debe buscar la siguiente linea de código: `DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/mydb");`y modificarla para que apunte a la base de datos correspondiente.
También hay que configurar el fichero config.xml
    `db.name = "root";
    db.pass= "root";`
La ruta al script de la bd es: (https://github.com/AndoniLuna/ProyectoRepaso/blob/master/apprest/script2-db.sql)
En caso de problemas al arrancar la aplicación, esta ejecuta logs que dan información de los errores y correcto funcionamiento de esta.

  
    - Detalle API rest con llamadas:
  
  Obtener personas: Metodo: GET, url: (http://localhost:8080/apprest/api/personas/)
  
  Insertar persona: Metodo POST, url: (http://localhost:8080/apprest/api/personas/)
  
  Modificar persona: Metodo PUT, url: (http://localhost:8080/apprest/api/personas/{id})
  
  Borrar persona: Metodo DELETE, url: (http://localhost:8080/apprest/api/personas/{id})
  
  Asignar un curso: Metodo POST, url: (http://localhost:8080/apprest/api/personas/{idPersona}/cursos{idCurso})
  
  Borrar un curso a un alumno: Metodo DELETE, url: (http://localhost:8080/apprest/api/personas/{idPersona}/cursos{idCurso})
  
  Obtener cursos: Metodo: GET, url: (http://localhost:8080/apprest/api/cursos/?filtro={String})
  
    - Pantallazos mostrando el funcionamiento de la aplicación:
  
  Este es el aspecto de la aplicación al acceder a ella por primera vez
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/Inicio.PNG)
  Cuando seleccionemos a un alumno pinchando en el icono de los 2 lapiceros junto a la imagen del alumno
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/SeleccionarAlumno.PNG)
  Al pinchar en el boton **Nueva Persona**, nos autorellenara así los datos del nuevo Alumno a crear
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/NuevaPersona.PNG)
  Al pinchar en el boton **Guardar**, si ha podido crear al alumno lo añadira a la lista de alumno
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/AltaAlumno.PNG)
  Si al pinchar en el boton **Guardar** el nombre del nuevo alumno ya existe en la base de datos, recibiremos un mensaje de error y no se creara al alumno
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/AlumnoDuplicado.PNG)
  Si pinchamos en el boton **Comprar Cursos** se mostrara una lista con todos los cursos y un buscador de cursos
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/ListaCursos.PNG)
  El buscador funciona por nombre
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/BuscadorCursos.PNG)
  Si pinchamos en la x de arriba saldremos sin asignar cursos, pero si pinchamos en la x de asignar, nos mostrara el siguiente mensaje
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/AsignarCurso.PNG)
  Y el alumno tendrá el curso
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/CursoAsignadoCorrectamente.PNG)
  Si intentamos asignar un curso que el alumno ya tenía, se mostrara un mensaje de error
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/CursoRepetido.PNG)
  Si pinchamos en el cubo junto al curso, el alumno perdera ese curso
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/CursoEliminado.PNG)
  Si pinchamos en el cubo junto al alumno nos saldrá un aviso
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/EliminarAlumno.PNG)
  En caso de Cancelar no pasara nada pero si Aceptamos se borrara al alumno
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/Inicio.PNG)
  Es posible filtrar a los alumnos por sexo
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/BuscadorHombre.PNG)
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/BuscadorMujer.PNG)
  También podemos filtrar por el nombre del alumno
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/BuscadorPorNombreTodos.PNG)
  Y podemos filtrar por sexo y nombre a la vez
  ![Ups, la imagen no se ha cargado correctamente](https://github.com/AndoniLuna/ProyectoRepaso/blob/master/appclient/screenshots/BuscadorHombrePorNombre.PNG)
  
## Versiones
  ### Tag 1.0 -> Esta es la primera versión estable del proyecto.
  
  La aplicación rest nos permite obtener una lista de todos los alumnos, obtener un alumno, crear a un nuevo alumno y modificar/eliminar a un alumno existente.
  
  La aplicación cliente nos muestra a todos los alumnos y nos permite crear/modificar/eliminar alumnos. También nos permite filtrar a los alumnos por nombre y/o sexo.
  
  Esta versión se creo debido a que en ella a diferencia de versiones anteriores, no hay errores que bloqueen a las aplicaciones, la aplicación hace las tareas básicas (Creación, Busqueda, Listado, Modificación y Eliminación) y ya tiene un aspecto agradable para el usuario
  
  ### Tag 2.0 -> Ultima versión estable del proyecto
  
  La aplicación rest nos permite obtener una lista de todos los cursos. También nos permite asignar/desasignar cursos a los alumnos.
  La aplicación cliente nos permite ver los cursos, filtrarlos por nombre y asignarlos/desasignarlos a los alumnos. Además se introdujeron mejoras de css y animaciones para mejorar la estetica de la aplicación
  
  Esta versión se creo como mejora de la 1.0 Además mejora la apariencia estetica de la aplicación, que en la 1.0 era un poco sosa y corrige pequeños bugs de la 1.0 que se pasaron por alto debido a su escaso impacto en el funcionamiento de la aplicación
