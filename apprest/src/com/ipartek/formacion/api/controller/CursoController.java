package com.ipartek.formacion.api.controller;

import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.dao.CursoDAO;

@Path("/cursos")
@Produces("application/json")
@Consumes("application/json")
public class CursoController {

	private static final Logger LOGGER = Logger.getLogger(CursoController.class.getCanonicalName());
	private static CursoDAO cursoDAO = CursoDAO.getInstance();

	@Context
	private ServletContext context;

	public CursoController() {
		super();
	}

	@GET
	public Response getAll(@QueryParam("filtro") String filtro) {
		LOGGER.info("getAll " + filtro);
		ArrayList<Curso> registros = new ArrayList<Curso>();

		if (filtro != null && !"".equals(filtro.trim())) {
			registros = (ArrayList<Curso>) cursoDAO.getAllLikeNombre(filtro);

		} else {
			registros = (ArrayList<Curso>) cursoDAO.getAll();

		}

		Response response = Response.status(Status.OK).entity(registros).build();

		return response;
	}

	@GET
	@Path("/{id: \\d+}")
	public Response getCursos(@PathParam("id") int id) {

		LOGGER.info("getCursos del profesor con id: " + id);

		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		ArrayList<Curso> registros;
		try {
			registros = (ArrayList<Curso>) cursoDAO.getByTeacher(id);
			response = Response.status(Status.OK).entity(registros).build();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}

	@PUT
	@Path("/{id: \\d+}")
	public Response update(@PathParam("id") int id, Curso curso) {
		LOGGER.info("update");
		Response response = Response.status(Status.NOT_FOUND).entity(curso).build();
		ResponseBody responseBody = new ResponseBody();

		try {
			Curso curso2 = cursoDAO.getById(id);

			// Si el curso ya tiene profesor y quiero asignarle otro, mandare un mensaje de
			// error
			// a no ser que el id_profesor sea 0, lo que significa que se eliminara al
			// profesor del curso
			if (curso.getId_profesor() != 0 && (curso2.getId_profesor() != 0)) {

				responseBody.setInformacion("Este curso ya esta asignado a un profesor");
				response = Response.status(Status.CONFLICT).entity(responseBody).build();

			} else {

				try {
					cursoDAO.update(curso);
					Curso c = cursoDAO.getById(id);

					if (c.getId_profesor() != 0) {
						responseBody.setInformacion("curso asigando con exito");
					} else {
						responseBody.setInformacion("curso desasigando con exito");
					}

					responseBody.setData(c);
					response = Response.status(Status.OK).entity(responseBody).build();
				} catch (Exception e) {
					responseBody.setInformacion("error en la modificacion del curso");
					response = Response.status(Status.CONFLICT).entity(responseBody).build();
				}

			}
		} catch (Exception e1) {
			responseBody.setInformacion("error al comprobar si el curso ya tiene un profesor asignado");
			response = Response.status(Status.CONFLICT).entity(responseBody).build();
		}
		return response;
	}

}
