

package Esprit.CampProject.Team.service.Implementation;



import Esprit.CampProject.Team.entities.Feedback;

import java.util.List;

public interface FeedbackService {
    List<Feedback> retrieveAllFeedback();

    Feedback addFeedback(Feedback f);

    Feedback updateFeedback(Feedback feedback, Long idFeedback);

    Feedback retrieveFeedback (Long idFeedback);

    void deleteFeedback(Long idFeedback);
    Long addLikesFeedback(Long idFeedback);
    Long addDisLikesFeedback(Long idFeedback);


}

