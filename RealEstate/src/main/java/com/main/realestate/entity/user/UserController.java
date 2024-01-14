package com.main.realestate.entity.user;

import com.main.realestate.DTO.UserLoginDTO;
import com.main.realestate.service.StorageUserService;
import com.main.realestate.service.TestUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class UserController {

//  edit used constructor to change the way of storaging files
    StorageUserService userService = new TestUserService();

    @GetMapping("/login")
    public ResponseEntity<UserLoginDTO> userLogin(@RequestHeader Map<String, String> headers){
        User user;
        try{
            user = userService.getByName(headers.get("username"));
            if (user.getPassword().equals(headers.get("password"))){
                return new ResponseEntity<>(new UserLoginDTO(user.getName(), user.getId()), HttpStatus.OK);
            }
            else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch (java.lang.NullPointerException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

}