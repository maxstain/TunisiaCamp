package Esprit.CampProject.Team.repository;

import Esprit.CampProject.Team.entities.Complaint;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Complaint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long>, JpaSpecificationExecutor<Complaint> {}
