package Esprit.CampProject.Team.repository;

import Esprit.CampProject.Team.entities.Commande;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Commande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long>, JpaSpecificationExecutor<Commande> {}
