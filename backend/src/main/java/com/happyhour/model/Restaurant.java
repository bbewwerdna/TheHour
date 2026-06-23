package com.happyhour.model;

public class Restaurant {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String zip;
    private String phone;
    private String cuisine;
    private double rating;
    private double latitude;
    private double longitude;
    private HappyHour happyHour;

    public Restaurant() {}

    public Restaurant(Long id, String name, String address, String city, String zip,
                      String phone, String cuisine, double rating,
                      double latitude, double longitude, HappyHour happyHour) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.zip = zip;
        this.phone = phone;
        this.cuisine = cuisine;
        this.rating = rating;
        this.latitude = latitude;
        this.longitude = longitude;
        this.happyHour = happyHour;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public HappyHour getHappyHour() { return happyHour; }
    public void setHappyHour(HappyHour happyHour) { this.happyHour = happyHour; }
}
