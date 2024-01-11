package com.main.realestate.entity.User;

import com.main.realestate.repository.UserRepository;
import com.main.realestate.service.TestUserService;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@RestController
@RequestMapping(path = "/api/test")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
public Iterable findAll() {
    return userRepository.findAll();
    }

    @GetMapping("/profile/{login}")
    public List findByLogin(@PathVariable String userLogin) {
             return userRepository.findByLogin(userLogin);
    }

    @GetMapping("/{id}")
    public User findOne (@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(UserPrincipalNotFoundException: :new)
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user) {
        return userRepository.save(user);
    }

    DeleteMapping("/{id}")
        public void delete(@PathVariable Long id) {
        userRepository.findById(id)
                .orElseThrow(UserNotFoundException: :new);
        userRepository.deleteById(id);
        }

        @PutMapping("/{id}")
    public User updateUser(@RequestBody User user, @PathVariable Long id) {
        if (user.getId() != id) {
            throw new UserIdMismatchException();
        }
        userRepository.findById(id)
                .orElseThrow(UserPrincipalNotFoundException: :new)
            return userRepository.save(user);
        }
}