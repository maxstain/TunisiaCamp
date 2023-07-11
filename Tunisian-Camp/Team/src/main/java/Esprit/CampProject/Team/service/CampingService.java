package Esprit.CampProject.Team.service;

import Esprit.CampProject.Team.entities.Camping;

import java.util.List;

public interface CampingService {
    List<Camping> retrieveAllCampings();

    Camping addCamping(Camping e);

    Camping updateCamping (Camping e,Long CampingId);

    Camping retrieveCamping (Long idCamping);

    void deleteCamping(Long CampingId);
    Camping retrieveCampingById (Long idCamping);
}
