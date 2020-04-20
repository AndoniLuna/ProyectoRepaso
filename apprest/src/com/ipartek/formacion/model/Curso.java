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

	public Curso() {
		super();
		this.id = 0;
		this.nombre = "";
		this.precio = 0.0f;
		this.imagen = "default_curso.png";
	}
	
	public Curso(int id, String nombre, float precio, String imagen) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.imagen = imagen;
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

	@Override
	public String toString() {
		return "Curso [id=" + id + ", nombre=" + nombre + ", precio=" + precio + ", imagen=" + imagen + "]";
	}
	
}
