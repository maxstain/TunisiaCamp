package Esprit.CampProject.Team.repository;

import Esprit.CampProject.Team.entities.Camping;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Camping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampingRepository extends JpaRepository<Camping, Long> {}
