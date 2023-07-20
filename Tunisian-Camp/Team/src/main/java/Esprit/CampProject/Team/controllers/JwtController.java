package Esprit.CampProject.Team.controllers;
import Esprit.CampProject.Team.entities.JwtRequest;
import Esprit.CampProject.Team.entities.JwtResponse;
import Esprit.CampProject.Team.service.Implementation.JwtService;

import Esprit.CampProject.Team.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/jwt")
@CrossOrigin(origins = "http://localhost:4200")
public class JwtController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/")
    public String welcome() {
        return "Welcome to mproject !!";
    }

    @PostMapping("/authenticate")
    public String generateToken(@RequestBody JwtRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("inavalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getUsername());
    }

//    @PostMapping({"/authenticate"})
//    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
//        return jwtService.createJwtToken(jwtRequest);
//    }

}
