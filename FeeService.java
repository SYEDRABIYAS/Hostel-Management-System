package com.hostel.hostelmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hostel.hostelmanagement.entity.Fee;
import com.hostel.hostelmanagement.repository.FeeRepository;

@Service
public class FeeService {

    private final FeeRepository feeRepository;

    public FeeService(FeeRepository feeRepository) {
        this.feeRepository = feeRepository;
    }

    // Get all fees
    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }

    // Get fee by ID
    public Fee getFeeById(Long id) {
        return feeRepository.findById(id).orElse(null);
    }

    // Save fee
    public Fee saveFee(Fee fee) {
        return feeRepository.save(fee);
    }

    // Delete fee
    public void deleteFee(Long id) {
        feeRepository.deleteById(id);
    }
}