package com.hostel.hostelmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hostel.hostelmanagement.entity.Room;
import com.hostel.hostelmanagement.repository.RoomRepository;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // Get all rooms
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Get room by ID
    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }

    // Add room
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    // Delete room
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}