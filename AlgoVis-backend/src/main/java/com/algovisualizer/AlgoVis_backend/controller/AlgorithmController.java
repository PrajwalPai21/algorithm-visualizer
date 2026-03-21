package com.algovisualizer.AlgoVis_backend.controller;

import com.algovisualizer.AlgoVis_backend.model.AlgorithmRun;
import com.algovisualizer.AlgoVis_backend.model.UserModel;
import com.algovisualizer.AlgoVis_backend.repository.AlgorithmRunRepository;
import com.algovisualizer.AlgoVis_backend.repository.UserRepository;
import com.algovisualizer.AlgoVis_backend.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AlgorithmController {

    private final AlgorithmRunRepository runRepo;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public AlgorithmController(
            AlgorithmRunRepository runRepo,
            UserRepository userRepo,
            JwtUtil jwtUtil
    ) {
        this.runRepo = runRepo;
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/save-run")
    public AlgorithmRun saveRun(
            @RequestBody AlgorithmRun run,
            HttpServletRequest request
    ) {
        String authHeader = request.getHeader("Authorization");

        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        UserModel user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        run.setUser(user);

        return runRepo.save(run);
    }

    @GetMapping("/history")
    public List<AlgorithmRun> getHistory(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        UserModel user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return runRepo.findByUser(user);
    }
}