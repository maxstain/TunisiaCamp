package Esprit.CampProject.Team.controllers;
import Esprit.CampProject.Team.entities.Forum;
import Esprit.CampProject.Team.entities.User;
import Esprit.CampProject.Team.service.Implementation.ForumService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/forum")
public class ForumRestController {
    ForumService forumService;
    // http://localhost:8089/forum/retrieve-all-forums
    @GetMapping("/retrieve-all-forums")
    public List<Forum> getForums() {
        return forumService.retrieveAllForums();
    }
    // http://localhost:8089/forum/retrieve-forum/{forumId}"

    @GetMapping("/retrieve-forum/{forumId}")
    public Forum retrieveForum(@PathVariable("forumId") Long forumId) {
        return forumService.retrieveForum(forumId);
    }

    // http://localhost:8089/forum/add-forum"
    @PostMapping("/add-forum")
    public Forum addforum(@RequestBody Forum e) {
        return forumService.addForum(e);
    }
    // http://localhost:8089/forum/update-forum/{forumId}

    @PutMapping("/update-forum/{forumId}")
    public Forum updateForum(@RequestBody Forum e, @PathVariable("forumId") Long forumId) {
         return forumService.updateForum(e,forumId);

    }


    // http://localhost:8089/forum/delete-forum/{forumId}

    @DeleteMapping("/delete-forum/{forumId}")
    public void deleteForum(@PathVariable("forumId") Long forumId) {
        forumService.deleteForum(forumId);
    }

    // http://localhost:8089/forum/assign-Feedback-To-Forum/{forumId}/{idFeedback}
    @PostMapping("/assign-Feedback-To-Forum/{forumId}/{idFeedback}")
    public void assignFeedbackToForum(@PathVariable("forumId") Long forumId,@PathVariable("idFeedback") Long idFeedback) {
         forumService.assignFeedbackToForum( forumId,  idFeedback);
    }

    // http://localhost:8089/forum/add-like-Forum/{ForumId}
    @PutMapping("/add-like-Forum/{ForumId}")
    public Forum addLikeForumAPI(@PathVariable("ForumId") Long forumId) {
        Long likes = forumService.addLikesForum(forumId);
        return forumService.retrieveForum(forumId);
    }
    // http://localhost:8089/forum/add-dislike-Forum/{ForumId}

    @PutMapping("/add-dislike-Forum/{ForumId}")
    public Forum addDisLikeForumAPI(@PathVariable("ForumId") Long forumId) {
        Long likes = forumService.addDisLikesForum(forumId);
        return forumService.retrieveForum(forumId);
    }
    // http://localhost:8089/forum/unlike-Forum/{ForumId}

    @PutMapping("/unlike-Forum/{ForumId}")
    public Forum unLikeForumAPI(@PathVariable("ForumId") Long forumId) {
        Long likes = forumService.unLikesForum(forumId);
        return forumService.retrieveForum(forumId);
    }
    // http://localhost:8089/forum/undislike-forum/{ForumId}

    @PutMapping("/undislike-forum/{ForumId}")
    public Forum unDisLikeForumAPI(@PathVariable("ForumId") Long forumId) {
        Long likes = forumService.unDisLikesForum(forumId);
        return forumService.retrieveForum(forumId);
    }
    // http://localhost:8089/forum/assign-Forum-camping/{ForumId}/{CampingId}

    @PostMapping("/assign-Forum-camping/{ForumId}/{CampingId}")
    public Forum addForumCamping(@PathVariable("ForumId") Long forumId,@PathVariable("CampingId") Long CampingId) {
        return forumService.addForumToCamping(forumId,CampingId);
    }
    // http://localhost:8089/forum/get-User-Forum/{ForumId}/{CampingId}

    @GetMapping("/get-User-Forum/{ForumId}")
    public List<User> getUsersForum(@PathVariable("ForumId") Long forumId) {
        return forumService.getUsersCamping(forumId);
    }
}


