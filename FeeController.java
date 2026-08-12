package com.hostel.hostelmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostel.hostelmanagement.entity.Fee;
import com.hostel.hostelmanagement.repository.FeeRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/fees")
public class FeeController {

    private final FeeRepository feeRepository;

    public FeeController(FeeRepository feeRepository) {
        this.feeRepository = feeRepository;
    }

    // Add Fee
    @PostMapping
    public Fee addFee(@RequestBody Fee fee) {
        return feeRepository.save(fee);
    }

    // Get All Fees
    @GetMapping
    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }

    // Get Fee by ID
    @GetMapping("/{id}")
    public Fee getFeeById(@PathVariable Long id) {
        return feeRepository.findById(id).orElse(null);
    }

    // Update Fee
    @PutMapping("/{id}")
    public Fee updateFee(
            @PathVariable Long id,
            @RequestBody Fee fee) {

        Fee existingFee =
                feeRepository.findById(id).orElse(null);

        if (existingFee == null) {
            return null;
        }

        existingFee.setStudentName(fee.getStudentName());
        existingFee.setRegisterNumber(fee.getRegisterNumber());
        existingFee.setAmount(fee.getAmount());
        existingFee.setPaymentDate(fee.getPaymentDate());
        existingFee.setPaymentStatus(fee.getPaymentStatus());

        return feeRepository.save(existingFee);
    }

    // Delete Fee
    @DeleteMapping("/{id}")
    public String deleteFee(@PathVariable Long id) {

        if (feeRepository.existsById(id)) {

            feeRepository.deleteById(id);

            return "Fee deleted successfully";
        }

        return "Fee not found";
    }
}