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

    public RealEstate(String address, double rent, double lat, double lng, String contactDetails, String description, long ownerId) {
        this.address = address;
        this.rent = rent;
        this.lat = lat;
        this.lng = lng;
        this.contactDetails = contactDetails;
        this.description = description;
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
