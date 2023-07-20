package Esprit.CampProject.Team.service.Implementation;

import Esprit.CampProject.Team.entities.Activity;
import Esprit.CampProject.Team.entities.Groupe;
import Esprit.CampProject.Team.entities.Offre;
import Esprit.CampProject.Team.repository.ActivityRepository;
import Esprit.CampProject.Team.repository.GroupRepository;
import Esprit.CampProject.Team.repository.OffreRepository;
import Esprit.CampProject.Team.service.GroupService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.persistence.SecondaryTable;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Service
@Slf4j
public class GroupServiceImplementation implements GroupService {
    private GroupRepository groupRepo;
    private  ActivityRepository activityRepository;
    private OffreRepository offreRepo;
    @Override
    public List<Groupe> retrieveAllGroups() {
        return groupRepo.findAll();
    }

    @Override
    public Groupe  addGroup(Groupe group) {
//        if (group.getImage() != null) {
//            String imageData = Base64.getEncoder().encodeToString(group.getImage());
//            String base64Image = imageData.substring(imageData.indexOf(',') + 1);
//            byte[] decodedImage = Base64.getDecoder().decode(base64Image);
//            group.setImage(decodedImage);
//        }
        Groupe savedGroup = groupRepo.save(group);

        // Set the group for each activity and save them
        Set<Activity> activities = group.getActivities();
        if (activities != null) {
            for (Activity activity : activities) {
                activity.setGroupe(savedGroup);
                activityRepository.save(activity);
            }
            savedGroup.setActivities(activities);
            groupRepo.save(savedGroup);
        }

        return savedGroup;

    }

    @Override
    public Groupe createGroupWithOffre(Long groupId, Offre offre) {
        Groupe group = groupRepo.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with id: " + groupId));

        group.getOffres().add(offre);
        offre.setGroupe(group);

        groupRepo.save(group);
        return group;
    }
    @Override
    public Groupe addOffreToGroup(Long groupId, Offre offre) {
        Groupe group = groupRepo.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        offre.setGroupe(group);
        group.getOffres().add(offre);

        return groupRepo.save(group);
    }

    @Override
    public Groupe updateGroup(Groupe groupe) {
        Groupe existingGroupe = groupRepo.findById(groupe.getId()).orElse(null);

        if (existingGroupe == null) {
            throw new IllegalArgumentException("Group not found");
        }

        existingGroupe.setName(groupe.getName());

        Set<Activity> updatedActivities = new HashSet<>();

        for (Activity activity : groupe.getActivities()) {
            if (activity.getId() != null) {
                Activity existingActivity = activityRepository.findById(activity.getId()).orElse(null);

                if (existingActivity != null) {
                    existingActivity.setName(activity.getName());
                    existingActivity.setDescription(activity.getDescription());
                    existingActivity.setGroupe(existingGroupe); // Set the group for the existing activity
                    updatedActivities.add(existingActivity);
                }
            } else {
                Activity newActivity = new Activity();
                newActivity.setName(activity.getName());
                newActivity.setDescription(activity.getDescription());
                newActivity.setGroupe(existingGroupe); // Set the group for the new activity
                updatedActivities.add(newActivity);
            }
        }
        Set<Activity> existingActivities = existingGroupe.getActivities();
        if (existingActivities != null) {
            for (Activity existingActivity : existingActivities) {
                if (!updatedActivities.contains(existingActivity)) {
                    activityRepository.delete(existingActivity);
                }
            }
        }

        existingGroupe.setActivities(updatedActivities);
        groupRepo.save(existingGroupe);

        return existingGroupe;
    }

    @Override
    public void deleteActivity(Long groupId, Long activityId) {
        Groupe existingGroupe = groupRepo.findById(groupId).orElse(null);
        if (existingGroupe == null) {
            throw new IllegalArgumentException("Group not found");
        }

        Activity existingActivity = activityRepository.findById(activityId).orElse(null);
        if (existingActivity == null) {
            throw new IllegalArgumentException("Activity not found");
        }

        existingGroupe.getActivities().remove(existingActivity);
        groupRepo.save(existingGroupe);
        activityRepository.delete(existingActivity);
    }



//    @Override
//    public Groupe retrieveGroup(Long idGroup) {
//        return groupRepo.findById(idGroup).get();
//    }

    @Override
    public void deleteGroup(Long GroupId) {
        groupRepo.deleteById(GroupId);
    }

    @Override
    public Groupe retrieveGroupById(Long idGroup) {
        return groupRepo.findById(idGroup).get();
    }


}
