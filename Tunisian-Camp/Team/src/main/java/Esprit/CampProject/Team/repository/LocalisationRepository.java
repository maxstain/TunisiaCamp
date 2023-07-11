package Esprit.CampProject.Team.repository;

import Esprit.CampProject.Team.entities.Localisation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Localisation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalisationRepository extends JpaRepository<Localisation, Long>, JpaSpecificationExecutor<Localisation> {}
