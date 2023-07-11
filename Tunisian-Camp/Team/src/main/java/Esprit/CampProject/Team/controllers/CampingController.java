package Esprit.CampProject.Team.controllers;

import Esprit.CampProject.Team.entities.Camping;
import Esprit.CampProject.Team.service.CampingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/Camping")
public class CampingController {
    CampingService CampingService;
    @GetMapping("/retrieve-all-Campings")
    public List<Camping> getCampings() {
        List<Camping> listCampings = CampingService.retrieveAllCampings();
        return listCampings;
    }

    @PostMapping("/addCamping")
    public Camping addCamping(@RequestBody Camping Camping){
        return CampingService.addCamping(Camping);
    }
    @DeleteMapping("/deleteCamping/{CampingId}")
    public void deleteCamping(@PathVariable(name = "CampingId") Long CampingId){
        CampingService.deleteCamping(CampingId);
    }
    @PutMapping("/updateCamping")
    public Camping updateCamping(Camping Camping,@PathVariable(name = "CampingId") Long CampingId){
        return CampingService.updateCamping(Camping,CampingId);
    }
}

