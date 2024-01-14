package com.main.realestate.service;

import com.main.realestate.DTO.RealEstateSaveDTO;
import com.main.realestate.entity.realEstate.RealEstate;

public interface StorageRealEstateService {

    public void create(RealEstateSaveDTO dto);

    public void change(RealEstate re);

    public RealEstate[] getAll();

    public RealEstate getById(long id);

    public void delete(long id);
}
