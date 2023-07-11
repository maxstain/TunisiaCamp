package Esprit.CampProject.Team.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Reservation.
 */
@Entity
@Table(name = "reservation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_personne")
    private Integer nombrePersonne;

    @Column(name = "date_reservation")
    private Integer dateReservation;

    @Column(name = "duration")
    private Integer duration;

    @ManyToOne
    @JsonIgnoreProperties(value = { "localisation", "forum", "reservations", "activities" }, allowSetters = true)
    private Camping camping;

//    @ManyToMany(mappedBy = "reservations")
//    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
//    @JsonIgnoreProperties(value = { "panier", "reservations" }, allowSetters = true)
//    private Set<User> users = new HashSet<>();
        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;




    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reservation)) {
            return false;
        }
        return id != null && id.equals(((Reservation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", nombrePersonne=" + getNombrePersonne() +
            ", dateReservation=" + getDateReservation() +
            ", duration=" + getDuration() +
            "}";
    }
}
