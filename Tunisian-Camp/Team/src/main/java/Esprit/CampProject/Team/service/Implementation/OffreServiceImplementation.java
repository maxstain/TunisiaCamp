package Esprit.CampProject.Team.service.Implementation;

import Esprit.CampProject.Team.entities.Offre;
import Esprit.CampProject.Team.entities.User;
import Esprit.CampProject.Team.repository.GroupRepository;
import Esprit.CampProject.Team.repository.OffreRepository;
import Esprit.CampProject.Team.repository.UserRepository;
import Esprit.CampProject.Team.service.OffreService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
@Slf4j
public class OffreServiceImplementation implements OffreService {
    private OffreRepository offreRepo;
    private UserRepository userRepository;
    private GroupRepository groupRepository;
    @Override
    public List<Offre> retrieveAllOffres() {
        return offreRepo.findAll();
    }

    @Override
    public Offre addOffre(Offre e) {
        return offreRepo.save(e);
    }

    @Override
    public Offre updateOffre(Offre offre) {
        Long offreId = offre.getId();
        if (offreId == null) {
            throw new IllegalArgumentException("The offre object must have a valid offreId.");
        }

        Offre existingOffre = offreRepo.findById(offreId).orElse(null);

        if (existingOffre == null) {
            throw new IllegalArgumentException("No offre found with offreId: " + offreId);
        }

        // Update the fields only if they are not null in the offre parameter
        if (offre.getTitre() != null) {
            existingOffre.setTitre(offre.getTitre());
        }
        if (offre.getDescription() != null) {
            existingOffre.setDescription(offre.getDescription());
        }
        if (offre.getNombreTotal() != null) {
            existingOffre.setNombreTotal(offre.getNombreTotal());
        }

        return offreRepo.save(existingOffre);
    }



    @Override
    public void deleteOffre(Long OffreId) {
        offreRepo.deleteById(OffreId);
    }

    @Override
    public Offre retrieveOffreById(Long idOffre) {
        return offreRepo.findById(idOffre).get();
    }

    @Override
    public void registerUserForOffer(Long offerId, Long userId) {
//        // Get the user by ID
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if (!optionalUser.isPresent()) {
//            throw new IllegalArgumentException("User not found.");
//        }
//
//        User user = optionalUser.get();
//
//        // Get the offer by ID
//        Optional<Offre> optionalOffer = offreRepo.findById(offerId);
//        if (!optionalOffer.isPresent()) {
//            throw new IllegalArgumentException("Offer not found.");
//        }
//
//        Offre offer = optionalOffer.get();
//
//        // Check if the user is already registered for the offer
//        if (offer.getGroupe().getGroupes().contains(user.getGroup())) {
//            throw new IllegalStateException("User is already registered for the offer.");
//        }
//
//        // Add the user to the offer's group
//        offer.getGroupe().getGroupes().add(user.getGroup());
//
//        // Save the updated group
//        offreRepo.save(offer);
    }

}
