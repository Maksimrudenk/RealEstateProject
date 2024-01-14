package com.main.realestate.entity.realEstate;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RealEstate {
    private long id;
    private String address;
    private String rent;
    private double lat;
    private double lng;
    private String contactDetails;
    private String description;
    private long ownerId;

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
