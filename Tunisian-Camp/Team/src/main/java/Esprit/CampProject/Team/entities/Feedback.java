package Esprit.CampProject.Team.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A Feedback.
 */

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "feedback")
public class Feedback implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "sentiment")
    private String sentiment;

    @Column(name = "author_id")
    private Long author_id;
    @Column(name = "post_id")
    private Long post_id;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

    @Column(name = "likes")
    private Long likes;

    @Column(name = "dislikes")
    private Long dislikes;
}
