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









@Entity

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Camping implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "nombre_de_place")
    private Integer nombreDePlace;

    @Column(name = "category_materiel_demande")
    private String categoryMaterielDemande;

    @ManyToOne
    @JsonIgnoreProperties(value = { "campings" }, allowSetters = true)
    private Localisation localisation;

    @JsonIgnoreProperties(value = { "camping", "feedbacks", "complaints" }, allowSetters = true)
    @OneToMany(mappedBy = "camping")
    private Set<Forum> forums;

    @OneToMany(mappedBy = "camping")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "camping", "personnes" }, allowSetters = true)
    private Set<Reservation> reservations = new HashSet<>();

    @ManyToMany(mappedBy = "campings")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produits", "campings" }, allowSetters = true)
    private Set<Activity> activities = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here



    public Set<Reservation> getReservations() {
        return this.reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        if (this.reservations != null) {
            this.reservations.forEach(i -> i.setCamping(null));
        }
        if (reservations != null) {
            reservations.forEach(i -> i.setCamping(this));
        }
        this.reservations = reservations;
    }

    public Camping reservations(Set<Reservation> reservations) {
        this.setReservations(reservations);
        return this;
    }

    public Camping addReservation(Reservation reservation) {
        this.reservations.add(reservation);
        reservation.setCamping(this);
        return this;
    }

    public Camping removeReservation(Reservation reservation) {
        this.reservations.remove(reservation);
        reservation.setCamping(null);
        return this;
    }

    public Set<Activity> getActivities() {
        return this.activities;
    }



    public Camping addActivity(Activity activity) {
        this.activities.add(activity);
        activity.getCampings().add(this);
        return this;
    }

    public Camping removeActivity(Activity activity) {
        this.activities.remove(activity);
        activity.getCampings().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Camping)) {
            return false;
        }
        return id != null && id.equals(((Camping) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Camping{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", nombreDePlace=" + getNombreDePlace() +
            ", categoryMaterielDemande='" + getCategoryMaterielDemande() + "'" +
            "}";
    }
}
