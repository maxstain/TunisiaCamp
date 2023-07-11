package Esprit.CampProject.Team.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Panier.
 */
@Entity

public class Panier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToMany(mappedBy = "panier")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produits", "panier" }, allowSetters = true)
    private Set<Commande> commandes = new HashSet<>();

    @JsonIgnoreProperties(value = { "panier", "reservations" }, allowSetters = true)
    @OneToOne(mappedBy = "panier")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Panier id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Commande> getCommandes() {
        return this.commandes;
    }

    public void setCommandes(Set<Commande> commandes) {
        if (this.commandes != null) {
            this.commandes.forEach(i -> i.setPanier(null));
        }
        if (commandes != null) {
            commandes.forEach(i -> i.setPanier(this));
        }
        this.commandes = commandes;
    }

    public Panier commandes(Set<Commande> commandes) {
        this.setCommandes(commandes);
        return this;
    }

    public Panier addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.setPanier(this);
        return this;
    }

    public Panier removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.setPanier(null);
        return this;
    }

    public User getPersonne() {
        return this.user;
    }

    public void setPersonne(User user) {
        if (this.user != null) {
            this.user.setPanier(null);
        }
        if (user != null) {
            user.setPanier(this);
        }
        this.user = user;
    }

    public Panier personne(User user) {
        this.setPersonne(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Panier)) {
            return false;
        }
        return id != null && id.equals(((Panier) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Panier{" +
            "id=" + getId() +
            "}";
    }
}
