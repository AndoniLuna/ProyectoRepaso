package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;

public class CursoDAO {
	
	private static final Logger LOGGER = Logger.getLogger(CursoDAO.class.getCanonicalName());

	private static CursoDAO INSTANCE = null;
	
	//private static String SQL_GET_ALL   =  "SELECT id, nombre, precio, imagen, id_profesor FROM curso ORDER BY id DESC LIMIT 500; ";
	private static String SQL_GET_ALL   =  "SELECT " +
			"c.id as curso_id, " +
			"c.nombre as curso_nombre, " +
			"c.precio as curso_precio, " +
			"c.imagen as curso_imagen, " +
			"c.id_profesor as curso_id_profesor, " +
			"p.id as persona_id, " +
			"p.nombre as persona_nombre, " +
			"p.avatar as persona_avatar, " +
			"p.sexo as persona_sexo, " +
			"p.id_rol as persona_rol " +
			"FROM curso c " + 
			"LEFT JOIN persona p ON c.id_profesor = p.id " +
			"ORDER BY c.id DESC LIMIT 500; ";
	//private static String SQL_GET_BY_ID   = "SELECT id, nombre, precio, imagen, id_profesor FROM curso WHERE id = ?; ";
	private static String SQL_GET_BY_ID   =  "SELECT " +
			"c.id as curso_id, " +
			"c.nombre as curso_nombre, " +
			"c.precio as curso_precio, " +
			"c.imagen as curso_imagen, " +
			"c.id_profesor as curso_id_profesor, " +
			"p.id as persona_id, " +
			"p.nombre as persona_nombre, " +
			"p.avatar as persona_avatar, " +
			"p.sexo as persona_sexo, " +
			"p.id_rol as persona_rol " +
			"FROM curso c " + 
			"LEFT JOIN persona p ON c.id_profesor = p.id " +
			"WHERE c.id = ?; ";
	//private static String SQL_GET_BY_TEACHER = "SELECT id, nombre, precio, imagen, id_profesor FROM curso WHERE id_profesor = ?";
	private static String SQL_GET_BY_TEACHER   =  "SELECT " +
			"c.id as curso_id, " +
			"c.nombre as curso_nombre, " +
			"c.precio as curso_precio, " +
			"c.imagen as curso_imagen, " +
			"c.id_profesor as curso_id_profesor, " +
			"p.id as persona_id, " +
			"p.nombre as persona_nombre, " +
			"p.avatar as persona_avatar, " +
			"p.sexo as persona_sexo, " +
			"p.id_rol as persona_rol " +
			"FROM curso c " + 
			"LEFT JOIN persona p ON c.id_profesor = p.id " +
			"WHERE c.id_profesor = ?; ";
	//private static String SQL_GET_FILTRO = "SELECT id, nombre, precio, imagen, id_profesor FROM curso WHERE nombre LIKE ? ORDER BY id DESC; ";
	private static String SQL_GET_FILTRO = "SELECT " +
			"c.id as curso_id, " +
			"c.nombre as curso_nombre, " +
			"c.precio as curso_precio, " +
			"c.imagen as curso_imagen, " +
			"c.id_profesor as curso_id_profesor, " +
			"p.id as persona_id, " +
			"p.nombre as persona_nombre, " +
			"p.avatar as persona_avatar, " +
			"p.sexo as persona_sexo, " +
			"p.id_rol as persona_rol " +
			"FROM curso c " + 
			"LEFT JOIN persona p ON c.id_profesor = p.id " +
			"WHERE c.nombre LIKE ? ORDER BY c.id DESC; ";
	
	private static String SQL_UPDATE_TEACHER = "UPDATE curso SET id_profesor = ? WHERE id = ?; ";

	private CursoDAO() {
		super();		
	}
	
	public synchronized static CursoDAO getInstance() {
        if (INSTANCE == null) {
        	INSTANCE = new CursoDAO();
        }
        return INSTANCE;
	}
	
	public List<Curso> getAll() {

		LOGGER.info("getAll");

		ArrayList<Curso> registros = new ArrayList<Curso>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();

		) {

			LOGGER.info(pst.toString());
			
			while( rs.next() ) {				
				registros.add( mapper(rs) );				
			}
			
			
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return registros;
		
	}
	
	public Curso getById(int id) throws Exception {
		Curso registro = null;
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try( ResultSet rs = pst.executeQuery() ){			
				
				if( rs.next() ) {					
					registro = mapper(rs);
				}else {
					throw new Exception("Registro no encontrado para id = " + id);
				}
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registro;
	}
	
	public List<Curso> getByTeacher(int id) throws Exception {
		
		LOGGER.info("getByTeacher");
		
		ArrayList<Curso> registros = new ArrayList<Curso>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_TEACHER);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try( ResultSet rs = pst.executeQuery() ){			
				
				while( rs.next() ) {					
					registros.add( mapper(rs) );
				}
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
	}
	
	public List<Curso> getAllLikeNombre(String filtro) {
		
		LOGGER.info("filtrar");

		ArrayList<Curso> registros = new ArrayList<Curso>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_FILTRO);

		) {
			
			pst.setString(1, "%" + filtro + "%");
			ResultSet rs = pst.executeQuery();

			LOGGER.info(pst.toString());
			
			while( rs.next() ) {				
				registros.add( mapper(rs) );				
			}
			
			
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return registros;
	}
	
	public Curso update(Curso pojo) throws Exception, SQLException {
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE_TEACHER);
		) {

			pst.setInt(1, pojo.getId_profesor() );
			pst.setInt(2, pojo.getId() );
			LOGGER.info(pst.toString());
			
			//modificamos el profesor del curso
			int affetedRows = pst.executeUpdate();	
			if (affetedRows != 1) {				
				throw new Exception("No se puede modificar registro " + pojo);
			}
			
		} catch (SQLException e) {

			throw new Exception("No se puede modificar registro " + e.getMessage() );
		}

		return pojo;
	}
	
	private Curso mapper( ResultSet rs ) throws SQLException {
		Curso c = new Curso();
		c.setId( rs.getInt("curso_id") );
		c.setNombre( rs.getString("curso_nombre"));
		c.setPrecio( rs.getFloat("curso_precio"));
		c.setImagen( rs.getString("curso_imagen"));
		c.setId_profesor( rs.getInt("curso_id_profesor"));
		
		// se añade la Persona profesor
		int idProfesor = rs.getInt("curso_id_profesor");
				if ( idProfesor != 0) {
					Persona p = new Persona();
					p.setId(idProfesor);
					p.setNombre(rs.getString("persona_nombre"));
					p.setAvatar( rs.getString("persona_avatar"));
					p.setSexo( rs.getString("persona_sexo"));
					p.setId_rol( rs.getInt("persona_rol"));			
					c.setProfesor(p);
				}	
		
		return c;
	}
}
