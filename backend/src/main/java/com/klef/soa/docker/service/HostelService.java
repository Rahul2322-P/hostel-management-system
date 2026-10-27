package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.HostelRequest;
import com.klef.soa.docker.dto.HostelResponse;

import java.util.List;

/**
 * Service interface declaring business operations on Hostel entities
 */
public interface HostelService {

    /**
     * Retrieve all hostels from the database
     */
    List<HostelResponse> getAllHostels();

    /**
     * Retrieve a single hostel by its unique ID
     */
    HostelResponse getHostelById(Long id);

    /**
     * Create and persist a new hostel record
     */
    HostelResponse createHostel(HostelRequest request);

    /**
     * Delete an existing hostel by ID
     */
    void deleteHostel(Long id);
}
