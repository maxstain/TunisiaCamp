package Esprit.CampProject.Team.service;

import Esprit.CampProject.Team.entities.User;

import java.util.List;

public interface UserService {
    List<User> retrieveAllUsers();

    User addUser(User u);

    User updateUser(Long id, User user);

    User retrieveUser (Long id);

    void deleteUser(Long id);

}
