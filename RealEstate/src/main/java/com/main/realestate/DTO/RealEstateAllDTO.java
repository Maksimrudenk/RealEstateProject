package com.main.realestate.DTO;

import com.main.realestate.entity.RealEstate.RealEstate;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RealEstateAllDTO {

    private RealEstate[] list;

}
