package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Response DTO returned to client containing generated ID
 */
@Schema(description = "Hostel details returned by the API")
public class HostelResponse {

    @Schema(description = "Unique auto-generated ID of the hostel", example = "1")
    private Long id;

    @Schema(description = "Name of the hostel", example = "Gargi Bhavan")
    private String hostelName;

    @Schema(description = "Location of the hostel", example = "North Campus, Sector 4")
    private String location;

    @Schema(description = "Total number of rooms", example = "150")
    private Integer roomCount;

    @Schema(description = "Warden's name", example = "Dr. Sunita Rao")
    private String wardenName;

    public HostelResponse() {
    }

    public HostelResponse(Long id, String hostelName, String location, Integer roomCount, String wardenName) {
        this.id = id;
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
}
