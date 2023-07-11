package Esprit.CampProject.Team.controllers;

import Esprit.CampProject.Team.entities.Reservation;
import Esprit.CampProject.Team.entities.User;
import Esprit.CampProject.Team.service.ReservationService;
import Esprit.CampProject.Team.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:59941")
@RequestMapping("/api/reservation")
public class ReservationController {
    @Autowired
    ReservationService reservationService;
    @GetMapping("/retrieve-all-reservation")
    public List<Reservation> getReservation() {
        List<Reservation> listReservation = reservationService.retrieveAllReservation();
        return listReservation;
    }
    @GetMapping("/retrieve-reservation/{id}")
    public Reservation retrieveRes(@PathVariable("id") Long id) {
        return reservationService.retrieveReservation(id);
    }
    @PostMapping("/addRes")
    public Reservation addRes(@RequestBody Reservation res){
        return reservationService.addReservation(res);
    }
    @DeleteMapping("/deleteRes/{id}")
    public void deleteRes(@PathVariable(name = "id") Long id){
        reservationService.deleteReservation(id);
    }
    @PutMapping("/updateRes/{id}")
    public Reservation updateRes(@PathVariable Long id, @RequestBody Reservation Res) {
    return reservationService.updateReservation(Res,id);


    }






}
