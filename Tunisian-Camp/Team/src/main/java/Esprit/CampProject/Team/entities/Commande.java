package Esprit.CampProject.Team.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Commande.
 */
@Entity

public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "date_commande")
    private Integer dateCommande;

    @OneToMany(mappedBy = "commande")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "commande", "shop", "activities" }, allowSetters = true)
    private Set<Produit> produits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "commandes", "personne" }, allowSetters = true)
    private Panier panier;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Commande id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDateCommande() {
        return this.dateCommande;
    }

    public Commande dateCommande(Integer dateCommande) {
        this.setDateCommande(dateCommande);
        return this;
    }

    public void setDateCommande(Integer dateCommande) {
        this.dateCommande = dateCommande;
    }

    public Set<Produit> getProduits() {
        return this.produits;
    }

    public void setProduits(Set<Produit> produits) {
        if (this.produits != null) {
            this.produits.forEach(i -> i.setCommande(null));
        }
        if (produits != null) {
            produits.forEach(i -> i.setCommande(this));
        }
        this.produits = produits;
    }

    public Commande produits(Set<Produit> produits) {
        this.setProduits(produits);
        return this;
    }

    public Commande addProduit(Produit produit) {
        this.produits.add(produit);
        produit.setCommande(this);
        return this;
    }

    public Commande removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.setCommande(null);
        return this;
    }

    public Panier getPanier() {
        return this.panier;
    }

    public void setPanier(Panier panier) {
        this.panier = panier;
    }

    public Commande panier(Panier panier) {
        this.setPanier(panier);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commande)) {
            return false;
        }
        return id != null && id.equals(((Commande) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", dateCommande=" + getDateCommande() +
            "}";
    }
}
