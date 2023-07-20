package Esprit.CampProject.Team.controllers;

import Esprit.CampProject.Team.entities.Groupe;
import Esprit.CampProject.Team.entities.Offre;

import Esprit.CampProject.Team.service.OffreService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Offre")
public class OffreController {
    OffreService offreService;
    @GetMapping("/retrieve-all-Offres")
    public List<Offre> getOffres() {
        List<Offre> listOffres = offreService.retrieveAllOffres();
        return listOffres;
    }

    @PostMapping("/addOffre")
    public Offre addOffre(@RequestBody Offre Offre){
        return offreService.addOffre(Offre);
    }
    @DeleteMapping("/deleteOffre/{OffreId}")
    public void deleteOffre(@PathVariable(name = "OffreId") Long OffreId){
        offreService.deleteOffre(OffreId);
    }
    @PutMapping("/updateOffre")
    public Offre updateOffre(@RequestBody Offre Offre){
        return offreService.updateOffre(Offre);
    }
    @GetMapping("/getOffreById/{idOffre}")
    public Offre getOffreById(@PathVariable(name = "idOffre") Long idOffre){
        return offreService.retrieveOffreById(idOffre);
    }
}
