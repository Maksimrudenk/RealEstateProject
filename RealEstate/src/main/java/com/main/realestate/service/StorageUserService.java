package com.main.realestate.service;

import com.main.realestate.entity.user.User;

public interface StorageUserService {

//    public void save(User user);

//    public User[] getAll();

    public User getByName(String name);
}
