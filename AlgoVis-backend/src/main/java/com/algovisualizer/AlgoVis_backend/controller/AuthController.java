package com.algovisualizer.AlgoVis_backend.controller;

import com.algovisualizer.AlgoVis_backend.model.LoginRequest;
import com.algovisualizer.AlgoVis_backend.model.UserModel;
import com.algovisualizer.AlgoVis_backend.security.JwtUtil;
import com.algovisualizer.AlgoVis_backend.service.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private final UserService service;
    private final JwtUtil jwtUtil;

    public AuthController(UserService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/register")
    public UserModel register(@RequestBody UserModel userModel) {
        return service.registerMethod(userModel);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        UserModel user = service.login(request.getUsername(), request.getPassword());

        return jwtUtil.generateToken(user.getUsername());
    }


}
