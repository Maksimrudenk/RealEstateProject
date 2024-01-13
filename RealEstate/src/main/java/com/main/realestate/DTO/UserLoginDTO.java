package com.main.realestate.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class UserLoginDTO {

    private String userName;
    private long id;
    private String status;

    public UserLoginDTO(String name, long id, String status){
        this.userName = name;
        this.id= id;
        this.status = status;
    }

    public UserLoginDTO(String status){
        this.status=status;
    }

}
