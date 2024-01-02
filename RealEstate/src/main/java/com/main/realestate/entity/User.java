package com.main.realestate.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class User {

    private String name;
    private String password;
    private long Id;
}
