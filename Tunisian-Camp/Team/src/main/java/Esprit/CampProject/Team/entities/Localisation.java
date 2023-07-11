package Esprit.CampProject.Team.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Localisation.
 */
@Entity

public class Localisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "adress")
    private String adress;

    @OneToMany(mappedBy = "localisation")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "localisation", "forum", "reservations", "activities" }, allowSetters = true)
    private Set<Camping> campings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Localisation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Localisation name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdress() {
        return this.adress;
    }

    public Localisation adress(String adress) {
        this.setAdress(adress);
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Set<Camping> getCampings() {
        return this.campings;
    }

    public void setCampings(Set<Camping> campings) {
        if (this.campings != null) {
            this.campings.forEach(i -> i.setLocalisation(null));
        }
        if (campings != null) {
            campings.forEach(i -> i.setLocalisation(this));
        }
        this.campings = campings;
    }

    public Localisation campings(Set<Camping> campings) {
        this.setCampings(campings);
        return this;
    }

    public Localisation addCamping(Camping camping) {
        this.campings.add(camping);
        camping.setLocalisation(this);
        return this;
    }

    public Localisation removeCamping(Camping camping) {
        this.campings.remove(camping);
        camping.setLocalisation(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Localisation)) {
            return false;
        }
        return id != null && id.equals(((Localisation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Localisation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", adress='" + getAdress() + "'" +
            "}";
    }
}
