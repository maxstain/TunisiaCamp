package Esprit.CampProject.Team.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * A Forum.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "forum")

public class Forum implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(name = "author")
    private String author;

    @Column(name = "tags")
    private String tags;
    //private Set<String> tags;

    @Column(name = "likes")
    private Long likes;

    @Column(name = "dislikes")
    private Long dislikes;

    @Column(name = "status")
    private String status;

    @Column(name = "category")
    private String category;


    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Feedback> feedbacks ;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Complaint> complaints;

    @ManyToOne(cascade = CascadeType.ALL)
    private Camping camping;

}
