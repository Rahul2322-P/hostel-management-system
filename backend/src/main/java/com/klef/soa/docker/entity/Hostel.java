package com.klef.soa.docker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "hostels")
public class Hostel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Hostel name is required")
    @Column(name = "hostel_name", nullable = false)
    private String hostelName;

    @NotBlank(message = "Location is required")
    @Column(name = "location", nullable = false)
    private String location;

    @NotNull(message = "Room count is required")
    @Min(value = 1, message = "Room count must be greater than zero")
    @Column(name = "room_count", nullable = false)
    private Integer roomCount;

    @NotBlank(message = "Warden name is required")
    @Column(name = "warden_name", nullable = false)
    private String wardenName;

    public Hostel() {
    }

    public Hostel(Long id, String hostelName, String location, Integer roomCount, String wardenName) {
        this.id = id;
        this.hostelName = hostelName;
        this.location = location;
        this.roomCount = roomCount;
        this.wardenName = wardenName;
    }

    public Hostel(String hostelName, String location, Integer roomCount, String wardenName) {
        this.hostelName = hostelName;
        this.location = location;
        this.roomCount = roomCount;
        this.wardenName = wardenName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHostelName() {
        return hostelName;
    }

    public void setHostelName(String hostelName) {
        this.hostelName = hostelName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(Integer roomCount) {
        this.roomCount = roomCount;
    }

    public String getWardenName() {
        return wardenName;
    }

    public void setWardenName(String wardenName) {
        this.wardenName = wardenName;
    }

    @Override
    public String toString() {
        return "Hostel{" +
                "id=" + id +
                ", hostelName='" + hostelName + '\'' +
                ", location='" + location + '\'' +
                ", roomCount=" + roomCount +
                ", wardenName='" + wardenName + '\'' +
                '}';
    }
}
