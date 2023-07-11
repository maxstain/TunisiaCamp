package Esprit.CampProject.Team.service.Implementation;

import Esprit.CampProject.Team.entities.Offre;
import Esprit.CampProject.Team.repository.OffreRepository;
import Esprit.CampProject.Team.service.OffreService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
@Slf4j
public class OffreServiceImplementation implements OffreService {
    private OffreRepository offreRepo;
    @Override
    public List<Offre> retrieveAllOffres() {
        return offreRepo.findAll();
    }

    @Override
    public Offre addOffre(Offre e) {
        return offreRepo.save(e);
    }

    @Override
    public Offre updateOffre(Offre offre, Long offreId) {
        Offre offre1 = offreRepo.findById(offreId).get();
        offre1.setTitre(offre.getTitre());
        offre1.setDescription(offre.getDescription());
        offre1.setNombreTotal(offre.getNombreTotal());


        return offreRepo.save(offre1);
    }



    @Override
    public void deleteOffre(Long OffreId) {
        offreRepo.deleteById(OffreId);
    }

    @Override
    public Offre retrieveOffreById(Long idOffre) {
        return offreRepo.findById(idOffre).get();
    }


}
