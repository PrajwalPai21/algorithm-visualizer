package com.algovisualizer.AlgoVis_backend.repository;


import com.algovisualizer.AlgoVis_backend.model.AlgorithmRun;
import com.algovisualizer.AlgoVis_backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlgorithmRunRepository extends JpaRepository<AlgorithmRun, Long> {
    List<AlgorithmRun> findByUser(UserModel user);
}