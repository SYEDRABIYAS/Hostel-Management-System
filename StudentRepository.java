package com.hostel.hostelmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hostel.hostelmanagement.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}