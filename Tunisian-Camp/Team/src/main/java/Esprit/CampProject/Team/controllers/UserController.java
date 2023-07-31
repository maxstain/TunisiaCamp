package Esprit.CampProject.Team.controllers;

import Esprit.CampProject.Team.entities.User;

import Esprit.CampProject.Team.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
@AllArgsConstructor
//@CrossOrigin(origins = "http://localhost:59941")
@RequestMapping("</api/users>")
public class UserController {
    @Autowired
   UserService userService;
//    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    @PostMapping({"/registerNewUser"})
    public User registerNewUser(@RequestBody User user) {
        return userService.registerNewUser(user);
    }

    @GetMapping("/retrieve-all-users")
    public List<User> getUsers() {
        return userService.retrieveAllUsers();
    }
    @GetMapping("/retrieve-User/{id}")
    public User retrieveUser(@PathVariable("id") Long id) {
        return userService.retrieveUser(id);
    }
    @PostMapping("/addUser")
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }
    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable(name = "id") Long id){
        userService.deleteUser(id);
    }
    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);


}}

