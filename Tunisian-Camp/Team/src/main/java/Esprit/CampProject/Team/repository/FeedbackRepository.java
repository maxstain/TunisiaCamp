package Esprit.CampProject.Team.repository;

import org.springframework.data.jpa.repository.*;
import Esprit.CampProject.Team.entities.Feedback;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Feedback entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {}
