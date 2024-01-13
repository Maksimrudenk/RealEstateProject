package com.main.realestate.entity.User;

import com.main.realestate.DTO.UserLoginDTO;
import com.main.realestate.service.StorageUserService;
import com.main.realestate.service.TestUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class UserController {

    StorageUserService userService = new TestUserService();

    @GetMapping("/login")
    public UserLoginDTO userLogin(@RequestHeader Map<String, String> headers){
        User user = userService.getByName(headers.get("username"));
        System.out.println(headers.get("username"));

        if (user.getPassword().equals(headers.get("password"))){
            return new UserLoginDTO(user.getName(), user.getId(),"OK");
        }

        else return new UserLoginDTO("ERROR");
    }

}