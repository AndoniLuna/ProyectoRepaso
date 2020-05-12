package com.ipartek.formacion.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class Curso {
	
	private int id;
	
	@Size( min=2, max = 100, message = "minimo 2 maximo 100 carcateres" )
	private String nombre;
	
	@NotEmpty
	private float precio;
	
	@NotEmpty
	private String imagen;
	
	@NotEmpty
	private int id_profesor;
	
	private Persona profesor;

	public Curso() {
		super();
		this.id = 0;
		this.nombre = "";
		this.precio = 0.0f;
		this.imagen = "default_curso.png";
		this.id_profesor = 0;
		this.profesor = new Persona();
	}
	
	public Curso(int id, String nombre, float precio, String imagen, int id_profesor) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.imagen = imagen;
		this.id_profesor = id_profesor;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public int getId_profesor() {
		return id_profesor;
	}

	public void setId_profesor(int id_profesor) {
		this.id_profesor = id_profesor;
	}

	public Persona getProfesor() {
		return profesor;
	}

	public void setProfesor(Persona profesor) {
		this.profesor = profesor;
	}

	@Override
	public String toString() {
		return "Curso [id=" + id + ", nombre=" + nombre + ", precio=" + precio + ", imagen=" + imagen + ", id_profesor="
				+ id_profesor + ", profesor=" + profesor + "]";
	}
	
}
