package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.HostelRequest;
import com.klef.soa.docker.dto.HostelResponse;

import java.util.List;

public interface HostelService {

    List<HostelResponse> getAllHostels();

    HostelResponse getHostelById(Long id);

    HostelResponse createHostel(HostelRequest request);

    void deleteHostel(Long id);
}
