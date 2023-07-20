package Esprit.CampProject.Team.service;

import Esprit.CampProject.Team.entities.Groupe;
import Esprit.CampProject.Team.entities.Offre;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GroupService {
    List<Groupe> retrieveAllGroups();

    Groupe addGroup(Groupe e);

    Groupe updateGroup (Groupe groupe);

//    Groupe retrieveGroup (Long idGroup);

    void deleteGroup(Long GroupId);
    Groupe retrieveGroupById (Long idGroup);
     Groupe createGroupWithOffre(Long groupId, Offre offre);
     Groupe addOffreToGroup(Long groupId, Offre offre);
     void deleteActivity(Long groupId, Long activityId);
}
