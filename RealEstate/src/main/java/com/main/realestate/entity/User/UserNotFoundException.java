package com.main.realestate.entity.User;

public class UserNotFoundException extends Throwable {

    public UserNotFoundException(String message, Throwable cause) {
        super (message, cause);
    }
}
