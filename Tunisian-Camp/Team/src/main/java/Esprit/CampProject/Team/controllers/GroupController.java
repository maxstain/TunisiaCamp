package Esprit.CampProject.Team.controllers;

import Esprit.CampProject.Team.entities.Groupe;
import Esprit.CampProject.Team.entities.Offre;
import Esprit.CampProject.Team.service.GroupService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/group")
@CrossOrigin(origins = "http://localhost:4200")
public class GroupController {
    GroupService groupService;
    @GetMapping("/retrieve-all-Groups")
    public List<Groupe> getGroups() {
        List<Groupe> listGroupes = groupService.retrieveAllGroups();
        return listGroupes;
    }

    @PostMapping("/addGroup")
    public Groupe addGroup(@RequestBody Groupe Groupe){
         return groupService.addGroup(Groupe);
    }
//    @PostMapping("offre/{groupId}/offres")
//    public ResponseEntity<Groupe> addOffreToGroup(@PathVariable Long groupId, @RequestBody Offre offre) {
//        Groupe updatedGroup = groupService.createGroupWithOffre(groupId, offre);
//        return ResponseEntity.ok(updatedGroup);
//    }
@PostMapping("/{groupId}/offres")
public ResponseEntity<?> addOffreToGroup(@PathVariable Long groupId, @RequestBody Offre offre) {
    groupService.addOffreToGroup(groupId, offre);
    return ResponseEntity.ok().build();
}

    @DeleteMapping("/deleteGroup/{GroupId}")
    public void deleteGroup(@PathVariable(name = "GroupId") Long GroupId){
        groupService.deleteGroup(GroupId);
    }
    @PutMapping("/updateGroup")
    public Groupe updateGroup(@RequestBody Groupe Groupe){
        return groupService.updateGroup(Groupe);
    }
    @GetMapping("/getGroupById/{idGroupe}")
    public Groupe getGroupById(@PathVariable(name = "idGroupe") Long idGroupe){
        return groupService.retrieveGroupById(idGroupe);
    }
    @DeleteMapping("/{groupId}/activities/{activityId}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long groupId, @PathVariable Long activityId) {
        groupService.deleteActivity(groupId, activityId);
        return ResponseEntity.noContent().build();
    }
}
