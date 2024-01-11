package com.main.realestate.service;

import com.main.realestate.entity.User.User;

public class TestUserService implements StorageUserService{

    private User[] allTestUsers = {new User("user1","pass1",1L),new User("user2","pass2",2L)};

    @Override
    public void save(User user) {

        System.out.println(user + " successfully saved");
    }

    @Override
    public User[] getAll() {

        return allTestUsers;
    }

    @Override
    public User getByName(String name) {
        for (User u:allTestUsers){
            if(u.getName() == name) return u;
        }
        System.out.println("User is not found");
        return null;
    }
}
