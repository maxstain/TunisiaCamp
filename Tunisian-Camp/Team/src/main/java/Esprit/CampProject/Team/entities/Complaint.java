package Esprit.CampProject.Team.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Complaint.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor



@Table(name = "complaint")
public class Complaint  implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "objet")
    private String objet;

    @Column(name = "message")
    private String message;

    @Column(name = "dateMsg")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateMsg;

    @Column(name = "dateRep")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateRep;

    @Column(name = "reponse")
    private String reponse;


    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "admin_id")
    private Long admin_id;



}
