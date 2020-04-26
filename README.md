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
  
        1. Obtener personas: Metodo: GET, url: (http://localhost:8080/apprest/api/personas/)
  
        2. Insertar persona: Metodo POST, url: (http://localhost:8080/apprest/api/personas/)
        
        El json a enviar: {"id":20,"nombre":"Pepe","avatar":"avatar7.png","sexo":"h","cursos":[]}
  
        3. Modificar persona: Metodo PUT, url: (http://localhost:8080/apprest/api/personas/{id})
        
        El json a enviar: {"id":20,"nombre":"Alfonso","avatar":"avatar3.png","sexo":"m","cursos":[]}
  
        4. Borrar persona: Metodo DELETE, url: (http://localhost:8080/apprest/api/personas/{id})
        
        El json a enviar: {"informacion":"persona eliminada","data":{"id":20,"nombre":"Alfonso","avatar":"avatar3.png","sexo":"m","cursos":[]},"errores":[],"hypermedias":[{"info":"listado personas","method":"GET","url":"http://localhost:8080/apprest/api/personas/"},{"info":"detalle personas","method":"GET","url":"http://localhost:8080/apprest/api/personas/{id}"}]}
  
        5. Asignar un curso: Metodo POST, url: (http://localhost:8080/apprest/api/personas/{idPersona}/cursos{idCurso})
        
        El json a enviar: {"informacion":"curso asigando con exito","data":{"id":3,"nombre":"JavaScript","precio":50.0,"imagen":"javascript.png"},"errores":[],"hypermedias":[]}
  
        6. Borrar un curso a un alumno: Metodo DELETE, url: (http://localhost:8080/apprest/api/personas/{idPersona}/cursos{idCurso})
        
        El json a enviar:{"informacion":"curso eliminado con exito","data":{"id":20,"nombre":"Alfonso","avatar":"avatar3.png","sexo":"m","cursos":[]},"errores":[],"hypermedias":[]}
  
        7. Obtener cursos: Metodo: GET, url: (http://localhost:8080/apprest/api/cursos/?filtro={String})
  
## Versiones
  ### Tag 1.0 -> Esta es la primera versión estable del proyecto.
  
  La aplicación rest nos permite obtener una lista de todos los alumnos, obtener un alumno, crear a un nuevo alumno y modificar/eliminar a un alumno existente.
  
  La aplicación cliente nos muestra a todos los alumnos y nos permite crear/modificar/eliminar alumnos. También nos permite filtrar a los alumnos por nombre y/o sexo.
  
  Esta versión se creo debido a que en ella a diferencia de versiones anteriores, no hay errores que bloqueen a las aplicaciones, la aplicación hace las tareas básicas (Creación, Busqueda, Listado, Modificación y Eliminación) y ya tiene un aspecto agradable para el usuario
  
  ### Tag 2.0 -> Ultima versión estable del proyecto
  
  La aplicación rest nos permite obtener una lista de todos los cursos. También nos permite asignar/desasignar cursos a los alumnos.
  La aplicación cliente nos permite ver los cursos, filtrarlos por nombre y asignarlos/desasignarlos a los alumnos. Además se introdujeron mejoras de css y animaciones para mejorar la estetica de la aplicación
  
  Esta versión se creo como mejora de la 1.0 Además mejora la apariencia estetica de la aplicación, que en la 1.0 era un poco sosa y corrige pequeños bugs de la 1.0 que se pasaron por alto debido a su escaso impacto en el funcionamiento de la aplicación
