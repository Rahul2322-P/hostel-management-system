package com.klef.soa.docker.repository;

import com.klef.soa.docker.entity.Hostel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA Repository for Hostel entity
 */
@Repository
public interface HostelRepository extends JpaRepository<Hostel, Long> {
}
