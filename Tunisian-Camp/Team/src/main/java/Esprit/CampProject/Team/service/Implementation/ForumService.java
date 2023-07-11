package Esprit.CampProject.Team.service.Implementation;


import Esprit.CampProject.Team.entities.Forum;
import Esprit.CampProject.Team.entities.User;

import java.util.List;

public interface ForumService {
    List<Forum> retrieveAllForums();

    Forum addForum(Forum f);

    Forum updateForum(Forum forum, Long idForum);

    Forum retrieveForum (Long idForum);

    void deleteForum(Long idForum);

    void assignFeedbackToForum(Long idForm,Long idFeedback);
    Long addLikesForum(Long idForm);
    Long addDisLikesForum(Long idForm);

    Forum addForumToCamping(Long idForum,Long idCamping);
    List<User> getUsersCamping(Long idForum);

}

