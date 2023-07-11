package Esprit.CampProject.Team.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "groupe")
public class Groupe implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "groupe")
    private Set<Activity> activities;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "groupe")
    private Set<Offre> offres;
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Reservation> reservations;
    @ManyToOne
    private  Shop shop;

}
