package com.main.realestate.entity.RealEstate;

import com.main.realestate.DTO.RealEstateAllDTO;
import com.main.realestate.service.StorageRealEstateService;
import com.main.realestate.service.TestRealEstateService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RealEstateController {

    StorageRealEstateService realEstateService = new TestRealEstateService();

    @GetMapping("/requestAll")
    public RealEstateAllDTO getAll(){
        System.out.println("getAll");
        return new RealEstateAllDTO(realEstateService.getAll());
    }

}
