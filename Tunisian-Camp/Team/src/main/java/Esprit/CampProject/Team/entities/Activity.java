package Esprit.CampProject.Team.entities;

import Esprit.CampProject.Team.entities.enumeration.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * A Activity.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Activity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;



    @ManyToMany
    @JoinTable(
        name = "rel_activity__camping",
        joinColumns = @JoinColumn(name = "activity_id"),
        inverseJoinColumns = @JoinColumn(name = "camping_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "localisation", "forum", "reservations", "activities" }, allowSetters = true)
    private Set<Camping> campings = new HashSet<>();
    @ManyToOne
    @JsonIgnore
    private Groupe groupe;




//    public Activity addCamping(Camping camping) {
//        this.campings.add(camping);
//        camping.getActivities().add(this);
//        return this;
//    }
//
//    public Activity removeCamping(Camping camping) {
//        this.campings.remove(camping);
//        camping.getActivities().remove(this);
//        return this;
//    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Activity)) {
            return false;
        }
        return id != null && id.equals(((Activity) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Activity{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
