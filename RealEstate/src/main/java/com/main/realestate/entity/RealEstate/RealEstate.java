package com.main.realestate.entity.RealEstate;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RealEstate {
    private long id;
    private String address;
    private double rent;
    private double lat;
    private double lng;
    private String contactDetails;
    private String description;
    private long ownerId;

    public RealEstate() {
    }

    public RealEstate(long id, String address, double rent, double lat, double lng, String contactDetails, String description, long ownerId) {
        this.id = id;
        this.address = address;
        this.rent = rent;
        this.lat = lat;
        this.lng = lng;
        this.contactDetails = contactDetails;
        this.description = description;
        this.ownerId = ownerId;
    }

    public RealEstate(String address, double rent, double lat, double lng, String contactDetails, String description, long ownerId) {
        this.address = address;
        this.rent = rent;
        this.lat = lat;
        this.lng = lng;
        this.contactDetails = contactDetails;
        this.description = description;
        this.ownerId = ownerId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getRent() {
        return rent;
    }

    public void setRent(double rent) {
        this.rent = rent;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public String getContactDetails() {
        return contactDetails;
    }

    public void setContactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(long ownerId) {
        this.ownerId = ownerId;
    }

    @Override
    public String toString() {
        return "RealEstate{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", rent=" + rent +
                ", lat=" + lat +
                ", lng=" + lng +
                ", contactDetails='" + contactDetails + '\'' +
                ", description='" + description + '\'' +
                ", ownerId=" + ownerId +
                '}';
    }
}
