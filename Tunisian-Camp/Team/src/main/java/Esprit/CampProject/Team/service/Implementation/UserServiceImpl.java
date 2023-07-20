package Esprit.CampProject.Team.service.Implementation;


import Esprit.CampProject.Team.entities.Feedback;
import Esprit.CampProject.Team.entities.Groupe;
import Esprit.CampProject.Team.entities.Role;
import Esprit.CampProject.Team.entities.User;

import Esprit.CampProject.Team.repository.RoleDao;
import Esprit.CampProject.Team.repository.UserRepository;
import Esprit.CampProject.Team.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl  implements UserService, UserDetailsService {

private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleDao roleDao;
    @Autowired
    private EntityManager entityManager;
    @Override
    public List<User> retrieveAllUsers() {return userRepository.findAll();    }

    @Override
    public User addUser(User u) {
        return  userRepository.save(u);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).get();
        if (existingUser != null) {
            existingUser.setUsername(user.getUsername());
            existingUser.setPassword(user.getPassword());
            existingUser.setAge(user.getAge());
            existingUser.setEmail(user.getEmail());
            existingUser.setAdmin(user.getAdmin());
            existingUser.setGroupes(user.getGroupes());
            existingUser.setPanier(user.getPanier());
        }
        return userRepository.save(existingUser);
    }



    @Override
    public User retrieveUser(Long id) {
        return userRepository.findById(id).get()  ;  }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUsername("admin123");
        adminUser.setPassword(getEncodedPassword("admin@pass"));
//        adminUser.setFirstName("admin");
//        adminUser.setUserLastName("admin");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userRepository.flush();
        entityManager.clear();
        userRepository.save(adminUser);


//        User formatterUser = new User();
//        formatterUser.setUsername("formatter123");
//        formatterUser.setPassword(getEncodedPassword("formatter@pass"));
//        formatterUser.setEmail("jridiibrahim2000@gmail.com");
//
//        Set<Role> formatterRoles = new HashSet<>();
//        formatterRoles.add(userRole);
//        formatterUser.setRole(formatterRoles);
//        userRepository.save(formatterUser);


    }

//    public User registerNewUser(User user) {
//        Role role = roleDao.findById("User").get();
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(role);
//        user.setRole(userRoles);
//        user.setPassword(getEncodedPassword(user.getPassword()));
//
//        return userRepository.save(user);
//    }
    public User registerNewUser(User user) {
        Role role =  roleDao.findById("User").get(); Set<Role> userRoles = new HashSet<>();
        userRoles.add(role); user.setRole(userRoles);
        user.setPassword(getEncodedPassword(user.getPassword()));

        Iterable<User> users = userRepository.findAll();
        for (User userExist : users) {
            if (user.getUsername().equals(userExist.getUsername())) {
                System.out.println("il y a un utilisateur avec ce Pseudo svp changer vos");
                return null;
            }}

        return userRepository.save(user);
    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
