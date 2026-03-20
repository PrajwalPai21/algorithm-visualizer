package com.algovisualizer.AlgoVis_backend.service;

import com.algovisualizer.AlgoVis_backend.model.UserModel;
import com.algovisualizer.AlgoVis_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new  BCryptPasswordEncoder();

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public UserModel registerMethod(UserModel user) {
        // Check username
        if (repo.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Check email
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public UserModel login(String username, String password) {
        UserModel user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Username not found"));
        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Password not match");
        }
        return user;
    }
}
