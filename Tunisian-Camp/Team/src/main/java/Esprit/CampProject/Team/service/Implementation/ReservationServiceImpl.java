package Esprit.CampProject.Team.service.Implementation;


import Esprit.CampProject.Team.entities.Reservation;
import Esprit.CampProject.Team.repository.ReservationRepository;
import Esprit.CampProject.Team.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    private ReservationRepository reservationRepository;
    @Override
    public List<Reservation> retrieveAllReservation() {
        return reservationRepository.findAll();     }

    @Override
    public Reservation addReservation(Reservation Res) {
        return  reservationRepository.save(Res);
    }

    @Override
    public Reservation updateReservation(Reservation Res, Long id) {
        Reservation existingRes = reservationRepository.findById(id).get();
        if (existingRes != null) {
            existingRes.setDateReservation(Res.getDateReservation());
            existingRes.setCamping(Res.getCamping());
            existingRes.setNombrePersonne(Res.getNombrePersonne());
            existingRes.setUser(Res.getUser());
            existingRes.setDuration(Res.getDuration());
        }
        return reservationRepository.save(existingRes);
    }




    @Override
    public Reservation retrieveReservation(Long id) {
        return reservationRepository.findById(id).get()  ;
    }

    @Override
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);

    }
}
