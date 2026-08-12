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

import com.hostel.hostelmanagement.entity.Room;
import com.hostel.hostelmanagement.repository.RoomRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/rooms")
public class RoomController {

    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // Add Room
    @PostMapping
    public Room addRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    // Get All Rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Get Room by ID
    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomRepository.findById(id).orElse(null);
    }

    // Update Room
    @PutMapping("/{id}")
    public Room updateRoom(
            @PathVariable Long id,
            @RequestBody Room room) {

        Room existingRoom =
                roomRepository.findById(id).orElse(null);

        if (existingRoom == null) {
            return null;
        }

        existingRoom.setRoomNumber(room.getRoomNumber());
        existingRoom.setCapacity(room.getCapacity());
        existingRoom.setOccupied(room.getOccupied());
        existingRoom.setStatus(room.getStatus());

        return roomRepository.save(existingRoom);
    }

    // Delete Room
    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {

        if (roomRepository.existsById(id)) {

            roomRepository.deleteById(id);

            return "Room deleted successfully";
        }

        return "Room not found";
    }
}