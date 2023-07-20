package Esprit.CampProject.Team.entities;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A Personne.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "age")
    private Integer age;

    @Column(name = "email")
    private String email;

    @Column(name = "admin")
    private Boolean admin;

//    @Column(name = "groupe")
//    private String group;

    @OneToOne

    @JoinColumn(unique = true)

    private Panier panier;



   @ManyToMany(cascade = CascadeType.ALL)
   private Set<Groupe> groupes;
    @OneToMany(mappedBy = "user")
    private List<Reservation> reservations;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLE",
            joinColumns = {
                    @JoinColumn(name = "USER_ID")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "ROLE_ID")
            }
    )
    private Set<Role> role;

}
