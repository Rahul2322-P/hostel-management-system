package com.klef.soa.docker.service.impl;

import com.klef.soa.docker.dto.HostelRequest;
import com.klef.soa.docker.dto.HostelResponse;
import com.klef.soa.docker.entity.Hostel;
import com.klef.soa.docker.exception.ResourceNotFoundException;
import com.klef.soa.docker.repository.HostelRepository;
import com.klef.soa.docker.service.HostelService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class HostelServiceImpl implements HostelService {

    private final HostelRepository hostelRepository;

    public HostelServiceImpl(HostelRepository hostelRepository) {
        this.hostelRepository = hostelRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<HostelResponse> getAllHostels() {
        return hostelRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public HostelResponse getHostelById(Long id) {
        Hostel hostel = hostelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hostel not found with id: " + id));
        return mapToResponse(hostel);
    }

    @Override
    public HostelResponse createHostel(HostelRequest request) {
        Hostel hostel = new Hostel();
        hostel.setHostelName(request.getHostelName().trim());
        hostel.setLocation(request.getLocation().trim());
        hostel.setRoomCount(request.getRoomCount());
        hostel.setWardenName(request.getWardenName().trim());

        Hostel savedHostel = hostelRepository.save(hostel);
        return mapToResponse(savedHostel);
    }

    @Override
    public void deleteHostel(Long id) {
        Hostel hostel = hostelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hostel not found with id: " + id));
        hostelRepository.delete(hostel);
    }

    private HostelResponse mapToResponse(Hostel hostel) {
        return new HostelResponse(
                hostel.getId(),
                hostel.getHostelName(),
                hostel.getLocation(),
                hostel.getRoomCount(),
                hostel.getWardenName()
        );
    }
}
