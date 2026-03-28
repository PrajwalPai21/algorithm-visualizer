package com.algovisualizer.AlgoVis_backend.controller;

import com.algovisualizer.AlgoVis_backend.model.LoginRequest;
import com.algovisualizer.AlgoVis_backend.model.UserModel;
import com.algovisualizer.AlgoVis_backend.security.JwtUtil;
import com.algovisualizer.AlgoVis_backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // ✅ frontend origin
public class AuthController {

    private final UserService service;
    private final JwtUtil jwtUtil;

    public AuthController(UserService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserModel userModel) {
        try {
            UserModel user = service.registerMethod(userModel);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 IMPORTANT
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            UserModel user = service.login(request.getUsername(), request.getPassword());

            String token = jwtUtil.generateToken(user.getUsername());

            // ✅ send BOTH token + username
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getUsername());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}