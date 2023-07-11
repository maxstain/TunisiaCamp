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
//    default Optional<Activity> findOneWithEagerRelationships(Long id) {
//        return this.fetchBagRelationships(this.findById(id));
//    }
//
//    default List<Activity> findAllWithEagerRelationships() {
//        return this.fetchBagRelationships(this.findAll());
//    }
//
//    default Page<Activity> findAllWithEagerRelationships(Pageable pageable) {
//        return this.fetchBagRelationships(this.findAll(pageable));
//    }
}
