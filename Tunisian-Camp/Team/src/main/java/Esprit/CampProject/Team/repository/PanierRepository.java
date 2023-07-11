package Esprit.CampProject.Team.repository;

import Esprit.CampProject.Team.entities.Panier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Panier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PanierRepository extends JpaRepository<Panier, Long>, JpaSpecificationExecutor<Panier> {}
