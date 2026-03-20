package com.algovisualizer.AlgoVis_backend.controller;

import com.algovisualizer.AlgoVis_backend.model.UserModel;
import com.algovisualizer.AlgoVis_backend.service.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public UserModel register(@RequestBody UserModel userModel) {
        return service.registerMethod(userModel);
    }
}
