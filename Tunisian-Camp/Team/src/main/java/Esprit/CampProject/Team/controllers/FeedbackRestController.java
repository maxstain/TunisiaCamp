package Esprit.CampProject.Team.controllers;
import Esprit.CampProject.Team.entities.Feedback;

import Esprit.CampProject.Team.service.Implementation.FeedbackService;
import Esprit.CampProject.Team.service.Implementation.ForumService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/Feedback")
public class FeedbackRestController {
    FeedbackService feedbackService;
    ForumService forumService;
    // http://localhost:8089/Feedback/retrieve-all-feedbacks
    @GetMapping("/retrieve-all-feedbacks")
    public List<Feedback> getFeedbacks() {
        List<Feedback> listFeedbacks = feedbackService.retrieveAllFeedback();
        return listFeedbacks;
    }
    // http://localhost:8089/Feedback/retrieve-Feedback/{feedbackId}

    @GetMapping("/retrieve-Feedback/{feedbackId}")
    public Feedback retrieveFeedback(@PathVariable("feedbackId") Long feedbackId) {
        return feedbackService.retrieveFeedback(feedbackId);
    }
    // http://localhost:8089/Feedback/add-Feedback

    @PostMapping("/add-Feedback")
    public Feedback addFeedbackAPIV1(@RequestBody Feedback e) {
        Feedback feedback = feedbackService.addFeedback(e);
        return feedback;
    }
    // http://localhost:8089/Feedback/add-Feedback/{ForumId}

    @PostMapping("/add-Feedback/{ForumId}")
    public Feedback addFeedbackAPIV2(@RequestBody Feedback e,@PathVariable("ForumId") Long ForumId) {
        Feedback feedback = feedbackService.addFeedback(e);
       forumService.assignFeedbackToForum(ForumId, feedback.getId());
        return feedback;
    }
    // http://localhost:8089/Feedback/update-Feedback/{feedbackId}

    @PutMapping("/update-Feedback/{feedbackId}")
    public Feedback updateEtudiant(@RequestBody Feedback e, @PathVariable Long feedbackId) {
         return feedbackService.updateFeedback(e,feedbackId);

    }
    // http://localhost:8089/Feedback/delete-Feedback/{feedbackId}

    @DeleteMapping("/delete-Feedback/{forumId}/{feedbackId}")
    public void deleteFeedback(@PathVariable("forumId") Long forumId,@PathVariable("feedbackId") Long feedbackId) {
        feedbackService.deleteFeedback(forumId,feedbackId);
    }
    // http://localhost:8089/Feedback/add-like-Feedback/{feedbackId}

    @PutMapping("/add-like-Feedback/{feedbackId}")
    public Feedback addLikeFeedbackAPI(@PathVariable("feedbackId") Long feedbackId) {
        Long likes = feedbackService.addLikesFeedback(feedbackId);
        return feedbackService.retrieveFeedback(feedbackId);
    }
    // http://localhost:8089/Feedback/add-dislike-Feedback/{feedbackId}

    @PutMapping("/add-dislike-Feedback/{feedbackId}")
    public Feedback addDisLikeFeedbackAPI(@PathVariable("feedbackId") Long feedbackId) {
        Long dislikes = feedbackService.addDisLikesFeedback(feedbackId);
        return feedbackService.retrieveFeedback(feedbackId);
    }
    }


