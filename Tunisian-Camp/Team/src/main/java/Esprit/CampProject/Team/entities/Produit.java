package Esprit.CampProject.Team.entities;

import Esprit.CampProject.Team.entities.enumeration.Category;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produit.
 */
@Entity

public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code_produit")
    private Long codeProduit;

    @Column(name = "description")
    private String description;

    @Column(name = "prix")
    private Double prix;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "selectionne")
    private Boolean selectionne;

    @Column(name = "photo")
    private String photo;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties(value = { "produits", "panier" }, allowSetters = true)
    private Commande commande;

    @ManyToOne
    @JsonIgnoreProperties(value = { "produits" }, allowSetters = true)
    private Shop shop;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    public Long getId() {
        return this.id;
    }

    public Produit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCodeProduit() {
        return this.codeProduit;
    }

    public Produit codeProduit(Long codeProduit) {
        this.setCodeProduit(codeProduit);
        return this;
    }

    public void setCodeProduit(Long codeProduit) {
        this.codeProduit = codeProduit;
    }

    public String getDescription() {
        return this.description;
    }

    public Produit description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrix() {
        return this.prix;
    }

    public Produit prix(Double prix) {
        this.setPrix(prix);
        return this;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Double getQuantity() {
        return this.quantity;
    }

    public Produit quantity(Double quantity) {
        this.setQuantity(quantity);
        return this;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Boolean getSelectionne() {
        return this.selectionne;
    }

    public Produit selectionne(Boolean selectionne) {
        this.setSelectionne(selectionne);
        return this;
    }

    public void setSelectionne(Boolean selectionne) {
        this.selectionne = selectionne;
    }

    public String getPhoto() {
        return this.photo;
    }

    public Produit photo(String photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Category getCategory() {
        return this.category;
    }

    public Produit category(Category category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Commande getCommande() {
        return this.commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    public Produit commande(Commande commande) {
        this.setCommande(commande);
        return this;
    }

    public Shop getShop() {
        return this.shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public Produit shop(Shop shop) {
        this.setShop(shop);
        return this;
    }





//    public Produit addActivity(Activity activity) {
//        this.activities.add(activity);
//        activity.getProduits().add(this);
//        return this;
//    }
//
//    public Produit removeActivity(Activity activity) {
//        this.activities.remove(activity);
//        activity.getProduits().remove(this);
//        return this;
//    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", codeProduit=" + getCodeProduit() +
            ", description='" + getDescription() + "'" +
            ", prix=" + getPrix() +
            ", quantity=" + getQuantity() +
            ", selectionne='" + getSelectionne() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
