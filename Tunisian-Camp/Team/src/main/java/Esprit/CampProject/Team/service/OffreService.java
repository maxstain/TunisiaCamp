package Esprit.CampProject.Team.service;

import Esprit.CampProject.Team.entities.Offre;

import java.util.List;

public interface OffreService {
    List<Offre> retrieveAllOffres();

    Offre addOffre(Offre e);

    Offre updateOffre (Offre e,Long OffreId);



    void deleteOffre(Long OffreId);
    Offre retrieveOffreById (Long idOffre);
}
