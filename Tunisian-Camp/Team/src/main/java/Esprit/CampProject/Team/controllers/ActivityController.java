package Esprit.CampProject.Team.controllers;

import Esprit.CampProject.Team.entities.Activity;
import Esprit.CampProject.Team.repository.ActivityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/activities")
public class ActivityController {
    private final ActivityRepository activityRepository;

    public ActivityController(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @GetMapping("/byGroup/{groupId}")
    public List<Activity> getActivitiesByGroupId(@PathVariable Long groupId) {
        return activityRepository.findByGroupe_Id(groupId);
    }
}
