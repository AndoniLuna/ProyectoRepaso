package com.ipartek.formacion.model;

import javax.validation.constraints.Size;

import java.util.ArrayList;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public class Persona {

	private int id;
	
	@Size( min=2, max = 50, message = "minimo 2 maximo 50 carcateres" )
	private String nombre;
	
	@NotEmpty
	private String avatar;
	
	@Pattern(regexp = "(\\W|^)(h|m)(\\W|$)" )
	private String sexo;
	
	@NotEmpty
	private int id_rol;
	
	private ArrayList<Curso> cursos;
	
	public Persona() {
		super();
		this.id = 0;
		this.nombre = "";
		this.avatar = "avatar1.png";
		this.sexo = "m";
		this.cursos = new ArrayList<Curso>();
		this.id_rol = 2;
	}

	public Persona(int id, String nombre, String avatar, String sexo, int id_rol) {		
		this();
		this.id = id;
		this.nombre = nombre;
		this.avatar = avatar;
		this.sexo = sexo;
		this.id_rol = id_rol;
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

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public int getId_rol() {
		return id_rol;
	}

	public void setId_rol(int id_rol) {
		this.id_rol = id_rol;
	}

	public ArrayList<Curso> getCursos() {
		return cursos;
	}

	public void setCursos(ArrayList<Curso> cursos) {
		this.cursos = cursos;
	}

	@Override
	public String toString() {
		return "Persona [id=" + id + ", nombre=" + nombre + ", avatar=" + avatar + ", sexo=" + sexo + ", id_rol="
				+ id_rol + ", cursos=" + cursos + "]";
	}
	
}
