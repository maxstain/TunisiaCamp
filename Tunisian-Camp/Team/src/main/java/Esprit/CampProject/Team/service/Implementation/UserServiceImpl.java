package Esprit.CampProject.Team.service.Implementation;


import Esprit.CampProject.Team.entities.Feedback;
import Esprit.CampProject.Team.entities.Groupe;
import Esprit.CampProject.Team.entities.User;

import Esprit.CampProject.Team.repository.UserRepository;
import Esprit.CampProject.Team.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl  implements UserService {

private UserRepository userRepository;
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
            existingUser.setGroup(user.getGroup());
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
}
