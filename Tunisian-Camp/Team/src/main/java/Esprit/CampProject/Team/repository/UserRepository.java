package Esprit.CampProject.Team.repository;

import Esprit.CampProject.Team.entities.User;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends  JpaRepository<User, Long>{

User findByUsername(String userName);



}
