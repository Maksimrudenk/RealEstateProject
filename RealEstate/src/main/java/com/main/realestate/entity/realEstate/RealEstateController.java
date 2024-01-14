package com.main.realestate.entity.realEstate;

import com.main.realestate.DTO.RealEstateAllDTO;
import com.main.realestate.DTO.RealEstateSaveDTO;
import com.main.realestate.service.StorageRealEstateService;
import com.main.realestate.service.TestRealEstateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RealEstateController {

    //  edit used constructor to change the way of storaging files
    StorageRealEstateService realEstateService = new TestRealEstateService();

    @GetMapping("/requestAll")
    public RealEstateAllDTO getAll(){
        System.out.println("getAll");
        return new RealEstateAllDTO(realEstateService.getAll());

    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody RealEstateSaveDTO dto){
        try{
            realEstateService.create(dto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Error e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/change")
    public ResponseEntity save(@RequestBody RealEstate re){
        try{
            realEstateService.change(re);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Error e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity delete(@RequestBody RealEstate re){
        try{
            realEstateService.delete(re.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Error e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
