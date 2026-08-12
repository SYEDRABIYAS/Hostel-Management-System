package com.hostel.hostelmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hostel.hostelmanagement.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

}