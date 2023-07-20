package Esprit.CampProject.Team.repository;


import java.util.List;
import java.util.Optional;

import Esprit.CampProject.Team.entities.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ActivityRepository extends  JpaRepository<Activity, Long>, JpaSpecificationExecutor<Activity> {

    List<Activity> findByGroupe_Id(Long groupId);

}
