package com.ipartek.formacion.model;

import java.util.Date;

import javax.validation.constraints.Size;

public class Noticia {

	private int id;
	
	@Size( min=2, max = 50, message = "minimo 2 maximo 50 carcateres" )
	private String titulo;
	
	private Date fecha;
	
	@Size ( min=2, max = 1000, message = "minimo 2 maximo 1000 caracteres")
	private String contenido;
	
	public Noticia() {
		super();
		this.id = 0;
		this.titulo = "";
		this.fecha = new Date(2020-01-01);
		this.contenido = "";
	}

	public Noticia(int id, String titulo, Date fecha, String contenido) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.fecha = fecha;
		this.contenido = contenido;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getContenido() {
		return contenido;
	}

	public void setContenido(String contenido) {
		this.contenido = contenido;
	}

	@Override
	public String toString() {
		return "Noticia [id=" + id + ", titulo=" + titulo + ", fecha=" + fecha + ", contenido=" + contenido + "]";
	}
	
}
