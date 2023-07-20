package Esprit.CampProject.Team.service.Implementation;

import Esprit.CampProject.Team.entities.JwtRequest;
import Esprit.CampProject.Team.entities.JwtResponse;
import Esprit.CampProject.Team.entities.User;
import Esprit.CampProject.Team.repository.UserRepository;

import Esprit.CampProject.Team.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service

public class JwtService implements UserDetailsService {

@Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userDao;

//    @Autowired
//    private AuthenticationManager authenticationManager;

//    @Autowired
//    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
//        this.authenticationManager = authenticationManager;
//    }



//    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
//        String userName = jwtRequest.getUsername();
//        String userPassword = jwtRequest.getPassword();
////        authenticate(userName, userPassword);
//
//        UserDetails userDetails = loadUserByUsername(userName);
//        String newGeneratedToken = jwtUtil.generateToken(userDetails);
//
//        User user = userDao.findByUsername(userName);
//        return new JwtResponse(user, newGeneratedToken);
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);

        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    getAuthority(user)
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    private Set getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        });
        return authorities;
    }

//    private void authenticate(String userName, String userPassword) throws Exception {
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
//        } catch (DisabledException e) {
//            throw new Exception("USER_DISABLED", e);
//        } catch (BadCredentialsException e) {
//            throw new Exception("INVALID_CREDENTIALS", e);
//        }
//    }
}
