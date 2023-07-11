package Esprit.CampProject.Team.repository;
import org.springframework.data.jpa.repository.*;
import Esprit.CampProject.Team.entities.Forum;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Forum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {}
