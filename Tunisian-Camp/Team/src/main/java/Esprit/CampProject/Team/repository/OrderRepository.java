package Esprit.CampProject.Team.repository;

import Esprit.CampProject.Team.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
