package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Noticia;

public class NoticiaDAO {
	
	private static final Logger LOGGER = Logger.getLogger(PersonaDAO.class.getCanonicalName());

	private static NoticiaDAO INSTANCE = null;
	
	private static String SQL_GET_ALL   =  "SELECT id, titulo, fecha, contenido FROM noticia ORDER BY id DESC LIMIT 10; ";
	
	private NoticiaDAO() {
		super();
	}
	
	public synchronized static NoticiaDAO getInstance() {
        if (INSTANCE == null) {
        	INSTANCE = new NoticiaDAO();
        }
        return INSTANCE;
	}
	
	public List<Noticia> getAll() {

		LOGGER.info("getAll");

		ArrayList<Noticia> registros = new ArrayList<Noticia>();
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
	
	private Noticia mapper( ResultSet rs ) throws SQLException {
		Noticia n = new Noticia();
		n.setId( rs.getInt("id") );
		n.setTitulo( rs.getString("titulo"));
		n.setFecha( rs.getDate("fecha"));
		n.setContenido( rs.getString("contenido"));
		return n;
	}
	
}
