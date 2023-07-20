package Esprit.CampProject.Team.repository;
import Esprit.CampProject.Team.entities.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {
    Role findRoleByRoleName(String name);

}
