package com.hostel.hostelmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hostel.hostelmanagement.entity.Fee;

public interface FeeRepository extends JpaRepository<Fee, Long> {

}