package Esprit.CampProject.Team.service.Implementation;

import Esprit.CampProject.Team.entities.Camping;
import Esprit.CampProject.Team.repository.CampingRepository;

import java.util.List;

import Esprit.CampProject.Team.service.CampingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Camping}.
 */
@Service
@Transactional
public class CampingServiceImplementation implements CampingService {
    private CampingRepository campingRepo;
    private final Logger log = LoggerFactory.getLogger(CampingServiceImplementation.class);

    private CampingRepository CampingRepo;
    @Override
    public List<Camping> retrieveAllCampings() {
        return campingRepo.findAll();
    }

    @Override
    public Camping addCamping(Camping e) {
        return campingRepo.save(e);
    }

    @Override
    public Camping updateCamping(Camping Camping, Long CampingId) {
        Camping Camping1 = campingRepo.findById(CampingId).get();
//        Camping1.setCamping.getNomCamping());
//        Camping1.setNiveau(Camping.getNiveau());
//        Camping1.setDetCamping(Camping.getDetCamping());

        return campingRepo.save(Camping1);
    }

    @Override
    public Camping retrieveCamping(Long idCamping) {
        return campingRepo.findById(idCamping).get();
    }

    @Override
    public void deleteCamping(Long CampingId) {
        campingRepo.deleteById(CampingId);
    }

    @Override
    public Camping retrieveCampingById(Long idCamping) {
        return campingRepo.findById(idCamping).get();
    }
}
