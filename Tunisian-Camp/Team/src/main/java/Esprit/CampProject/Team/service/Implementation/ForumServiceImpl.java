package Esprit.CampProject.Team.service.Implementation;



import Esprit.CampProject.Team.entities.*;
import Esprit.CampProject.Team.repository.CampingRepository;
import Esprit.CampProject.Team.repository.FeedbackRepository;
import Esprit.CampProject.Team.repository.ForumRepository;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Service
public class ForumServiceImpl implements ForumService {
    ForumRepository forumRepository;
    FeedbackRepository feedbackRepository;
    CampingRepository campingRepository;
    @Override
    public List<Forum> retrieveAllForums() {
        return (List<Forum>) forumRepository.findAll();
    }

    @Override
    public Forum addForum(Forum e) {
        e.setDate(new Date());
        e.setLikes(0L);
        e.setDislikes(0L);
        Forum forum = forumRepository.save(e);
        return forum;

    }

    @Override
    public Forum updateForum(Forum forum, Long idForum) {
        Forum forum1 = forumRepository.findById(idForum).get();
        forum1.setTitle(forum.getTitle());
        forum1.setDescription(forum.getDescription());
        forum1.setTags(forum.getTags());
        forum1.setTitle(forum.getTitle());
        forum1.setCategory(forum.getCategory());
        forum1.setStatus(forum.getStatus());
        return forumRepository.save(forum1);
    }

    @Override
    public Forum retrieveForum(Long idForum) {
        return forumRepository.findById(idForum).get();
    }

    @Override
    public void deleteForum(Long idForum) {

        forumRepository.deleteById(idForum);

    }

    @Override
    public void assignFeedbackToForum(Long idForm, Long idFeedback) {
        Forum forum = forumRepository.findById(idForm).get();
        Feedback feedback = feedbackRepository.findById(idFeedback).get();

        forum.getFeedbacks().add(feedback);
        //feedback.setForum(forum);
        forumRepository.save(forum);

    }

    @Override
    public Long addLikesForum(Long idForm) {
        Forum forum = forumRepository.findById(idForm).get();
        Long likes = forum.getLikes() + 1;
        forum.setLikes(likes);
        forumRepository.save(forum);
        return likes;
    }

    @Override
    public Long addDisLikesForum(Long idForm) {
        Forum forum = forumRepository.findById(idForm).get();
        Long dislikes = forum.getDislikes() + 1;
        forum.setDislikes(dislikes);
        forumRepository.save(forum);
        return dislikes;
    }

    @Override
    public Forum addForumToCamping(Long idForum, Long idCamping) {
        Camping camping=campingRepository.findById(idCamping).get();
        Forum forum = forumRepository.findById(idForum).get();
        camping.getForums().add(forum);
        campingRepository.save(camping);
        return forum;
    }

    @Override
    public List<User> getUsersCamping(Long idForum) {
        List<User> users=new ArrayList<>();
        Forum forum = forumRepository.findById(idForum).get();
        Set<Reservation> reservations=forum.getCamping().getReservations();
        for (Reservation res:reservations){
            users.add(res.getUser()) ;
        }
        return users;

    }

    private File loadScriptFromResources(String scriptName) throws IOException {
        ClassPathResource resource = new ClassPathResource(scriptName);
        if (resource.exists()) {
            File scriptFile = File.createTempFile(scriptName, "");
            Path tempFilePath = scriptFile.toPath();
            Files.copy(resource.getInputStream(), tempFilePath, StandardCopyOption.REPLACE_EXISTING);
            return scriptFile;
        }
        return null;
    }
    @Scheduled(cron = "*/30 * * * * *")
   // @Scheduled(cron = "0 0 * * * *") // Schedule it to run every hour
    public void runPythonScript() {
        try {
            // Provide the correct Python interpreter command
            String pythonCommand = "python";

            // Load the Python script from the resources directory
            File scriptFile = loadScriptFromResources("scriptMachineLearningFinal.py");
            if (scriptFile == null) {
                System.err.println("Failed to load Python script from resources.");
                return;
            }
            ProcessBuilder processBuilder = new ProcessBuilder(pythonCommand, scriptFile.getAbsolutePath());
            Process process = processBuilder.start();
            // Read the output and error stream
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Python script executed successfully.");
            } else {
                System.err.println("Python script execution failed with exit code: " + exitCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
