package com.ipartek.formacion.api.controller;

import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Persona;

@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());

	private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	private Validator validator = factory.getValidator();

	@Context
	private ServletContext context;

	private static ArrayList<Persona> personas = new ArrayList<Persona>();
	private static int ultimoId = 0;

	static {
		personas.add(new Persona(1, "Arantxa", "avatar1.png", "m"));
		personas.add(new Persona(2, "Idoia", "avatar2.png", "m"));
		personas.add(new Persona(3, "Iker", "avatar3.png", "h"));
		personas.add(new Persona(4, "Hodei", "avatar4.png", "h"));
		ultimoId = 4;
	}

	public PersonaController() {
		super();
	}

	@GET
	public ArrayList<Persona> getAll() {
		LOGGER.info("getAll");
		return personas;
	}

	@GET
	@Path("/{id: \\d+}")
	public Persona getPersona(@PathParam("id") int id) {
		LOGGER.info("getPersona");

		Integer i = obtenerIndicePorId(id);

		if (i == null) {
			return null;
		}

		return new Persona(personas.get(i).getId(), personas.get(i).getNombre(), personas.get(i).getAvatar(),
				personas.get(i).getSexo());
	}

	@POST
	public Response insert(Persona persona) {
		LOGGER.info("insert (" + persona + ")");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		// validar pojo
		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);

		if (violations.isEmpty()) {

			int id = ++ultimoId;

			if (persona.getId() == 0) {
				persona.setId(id);
			}

			personas.add(persona);

			response = Response.status(Status.CREATED).entity(persona).build();

		} else {

			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}

			response = Response.status(Status.BAD_REQUEST).entity(errores).build();

		}

		return response;
	}

	@PUT
	@Path("/{id: \\d+}")
	public Response update(@PathParam("id") int id, Persona persona) {
		LOGGER.info("update");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		boolean encontrado = false;
		
		// Comprobar que la persona exista
		for (int i = 0; i < personas.size(); i++) {
			if (id == personas.get(i).getId()) {
				encontrado = true;
				break;
			}
		}

		if (encontrado == false) {
			response = Response.status(Status.NOT_FOUND).build();
		} else {
			// Validar Pojo
			Set<ConstraintViolation<Persona>> violations = validator.validate(persona);

			if (violations.isEmpty()) {

				Integer i = obtenerIndicePorId(persona.getId());

				personas.set((int) i, persona);

				response = Response.status(Status.CREATED).entity(persona).build();

			} else {

				ArrayList<String> errores = new ArrayList<String>();
				for (ConstraintViolation<Persona> violation : violations) {
					errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
				}

				response = Response.status(Status.BAD_REQUEST).entity(errores).build();

			}
		}

		return response;
	}

	@DELETE
	@Path("/{id: \\d+}")
	public Response delete(@PathParam("id") int id) {
		LOGGER.info("eliminar a la persona con id(" + id + ")");

		Persona persona = null;

		for (int i = 0; i < personas.size(); i++) {
			if (id == personas.get(i).getId()) {
				persona = personas.get(i);
				personas.remove(i);
				break;
			}
		}

		if (persona == null) {
			return Response.status(Status.NOT_FOUND).build();
		} else {
			return Response.status(Status.OK).entity(persona).build();
		}

	}

	// Metodo para obtener el indice del array
	private Integer obtenerIndicePorId(int id) {
		for (int i = 0; i < personas.size(); i++) {
			if (personas.get(i).getId() == id) {
				return i;
			}
		}

		return null;
	}

}
