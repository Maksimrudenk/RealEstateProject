package com.main.realestate.repository;

import com.main.realestate.entity.User.User;
import jakarta.persistence.Id;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {
    List<User> findByLogin(String login);
}
