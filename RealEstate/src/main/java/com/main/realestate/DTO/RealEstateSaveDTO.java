package com.main.realestate.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RealEstateSaveDTO {

    private String address;
    private String rent;
    private double lat;
    private double lng;
    private String contactDetails;
    private String description;
    private long ownerId;

}
