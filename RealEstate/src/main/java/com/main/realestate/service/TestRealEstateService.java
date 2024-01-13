package com.main.realestate.service;

import com.main.realestate.entity.RealEstate.RealEstate;



public class TestRealEstateService implements StorageRealEstateService{

    private RealEstate[] allTestRE = {new RealEstate(1L,"TestAddress",1000, 34.7768, 32.42,
            "testEmail or phone", "testDescription", 1L),
            new RealEstate(2L,"TestAddress2",2000, 34.772, 32.42,
            "testEmail or phone", "testDescription2", 2L)
    };

    @Override
    public void save(RealEstate re) {
        System.out.println(re + " successfully saved");
    }

    @Override
    public RealEstate[] getAll() {
        return allTestRE;
    }

    @Override
    public RealEstate getById(long id) {
        for (RealEstate re:allTestRE){
            if(re.getId() == id) return re;
        }
        System.out.println("User is not found");
        return null;
    }

    @Override
    public void delete(long id) {
        System.out.println("deleted");
    }
}
