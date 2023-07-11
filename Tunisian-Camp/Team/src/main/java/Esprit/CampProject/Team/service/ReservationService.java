package Esprit.CampProject.Team.service;

import Esprit.CampProject.Team.entities.Reservation;
import Esprit.CampProject.Team.entities.User;

import java.util.List;

public interface ReservationService {
    List<Reservation> retrieveAllReservation();

    Reservation addReservation(Reservation Res);

    Reservation updateReservation (Reservation Res,Long id);


    Reservation retrieveReservation (Long id);

    void deleteReservation(Long id);
}
