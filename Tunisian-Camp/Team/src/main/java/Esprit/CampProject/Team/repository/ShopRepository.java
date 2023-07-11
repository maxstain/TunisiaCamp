package Esprit.CampProject.Team.repository;

import Esprit.CampProject.Team.entities.Shop;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Shop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopRepository extends JpaRepository<Shop, Long>, JpaSpecificationExecutor<Shop> {}
