package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;

public class CursoDAO {
	
	private static final Logger LOGGER = Logger.getLogger(CursoDAO.class.getCanonicalName());

	private static CursoDAO INSTANCE = null;
	
	private static String SQL_GET_ALL   =  "SELECT id, nombre, precio, imagen FROM curso ORDER BY id DESC LIMIT 500; ";
	private static String SQL_GET_FILTRO = "SELECT id, nombre, precio, imagen FROM curso WHERE nombre LIKE ? ORDER BY id DESC; ";

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
	
	private Curso mapper( ResultSet rs ) throws SQLException {
		Curso c = new Curso();
		c.setId( rs.getInt("id") );
		c.setNombre( rs.getString("nombre"));
		c.setPrecio( rs.getFloat("precio"));
		c.setImagen( rs.getString("imagen"));
		return c;
	}
}