package com.binge.database.databasedesign.bean;

public class DataBean {
	
	private String city;
	private String country;
	private String state;
	
	public DataBean(String city, String country, String state) {
		super();
		this.city = city;
		this.country = country;
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	

}
