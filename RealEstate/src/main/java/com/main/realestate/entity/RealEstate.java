package com.main.realestate.entity;

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

}
