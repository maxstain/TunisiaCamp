package Esprit.CampProject.Team.service.Implementation;



import Esprit.CampProject.Team.entities.Feedback;
import Esprit.CampProject.Team.entities.Forum;
import Esprit.CampProject.Team.repository.FeedbackRepository;
import Esprit.CampProject.Team.repository.ForumRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class FeedbackServiceImpl implements FeedbackService{
    FeedbackRepository feedbackRepository;
    ForumRepository forumRepository;
    @Override
    public List<Feedback> retrieveAllFeedback(){

        return (List<Feedback>) feedbackRepository.findAll();
    }

    @Override
    public  Feedback addFeedback(Feedback e) {
        e.setCreated_at(new Date());
        e.setLikes(0L);
        e.setDislikes(0L);
        return feedbackRepository.save(e);
    }

    @Override
    public Feedback updateFeedback(Feedback feedback, Long idFeedback) {
        Feedback feedback1 = feedbackRepository.findById(idFeedback).get();
        feedback1.setUpdated_at(new Date());
        feedback1.setCommentaire(feedback.getCommentaire());
        feedback1.setSentiment(feedback.getSentiment());
        feedback1.setPost_id(feedback.getPost_id());
        return feedbackRepository.save(feedback1);
    }
    @Override
    public Feedback retrieveFeedback(Long idFeedback) {
        return feedbackRepository.findById(idFeedback).get();
    }

    @Override
    public void deleteFeedback(Long idForum,Long idFeedback) {
        Forum forum = forumRepository.findById(idForum).get();
        Feedback feedback=feedbackRepository.findById((idFeedback)).get();
        forum.getFeedbacks().remove(feedback);

        feedbackRepository.deleteById(idFeedback);
        forumRepository.save(forum);

    }
    @Override
    public Long addLikesFeedback(Long idFeedback) {
        Feedback feedback=feedbackRepository.findById(idFeedback).get();
        Long likes=feedback.getLikes()+1;
        Long dislikes= feedback.getDislikes();
        if (dislikes>=1){
            dislikes=dislikes-1;
        }
        feedback.setDislikes(dislikes);
        feedback.setLikes(likes);
        feedbackRepository.save(feedback);
        return likes;
    }

    @Override
    public Long addDisLikesFeedback(Long idFeedback) {
        Feedback feedback=feedbackRepository.findById(idFeedback).get();
        Long dislikes=feedback.getDislikes()+1;
        Long likes= feedback.getLikes();
        if (likes>=1){
            likes=likes-1;
        }
        feedback.setLikes(likes);
        feedback.setDislikes(dislikes);
        feedbackRepository.save(feedback);
        return dislikes;
    }


}
