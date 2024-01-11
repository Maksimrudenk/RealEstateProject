package com.main.realestate.service;

import com.main.realestate.entity.RealEstate.RealEstate;

public interface StorageRealEstateService {

    public void save(RealEstate re);

    public RealEstate[] getAll();

    public RealEstate getById(long id);

}
