package Esprit.CampProject.Team.controllers;

import Esprit.CampProject.Team.entities.Complaint;
import Esprit.CampProject.Team.service.Implementation.ComplaintService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/Complaint")
public class ComplaintRestController {
    ComplaintService complaintService;
    // http://localhost:8089/Complaint/retrieve-all-Complaints
    @GetMapping("/retrieve-all-Complaints")
    public List<Complaint> getComplaints() {
        List<Complaint> listComplaints = complaintService.retrieveAllComplaints();
        return listComplaints;
    }
    // http://localhost:8089/Complaint/retrieve-Complaint/{complaintId}

    @GetMapping("/retrieve-Complaint/{complaintId}")
    public Complaint retrieveComplaint(@PathVariable("complaintId") Long complaintId) {
        return complaintService.retrieveComplaint(complaintId);
    }
    // http://localhost:8089/Complaint/add-Complaint

    @PostMapping("/add-Complaint")
    public Complaint addComplaint(@RequestBody Complaint e) {
        Complaint complaint = complaintService.addComplaint(e);
        return complaint;
    }
    // http://localhost:8089/update-Complaint/{complaintId}

    @PutMapping("/update-Complaint/{complaintId}")
    public Complaint updateComplaint(@RequestBody Complaint e, @PathVariable("complaintId") Long complaintId) {
        return complaintService.updateComplaint(e,complaintId);

    }


    // http://localhost:8089/Complaint/delete-Complaint/{complaintId}

    @DeleteMapping("/delete-Complaint/{complaintId}")
    public void deleteComplaint(@PathVariable("complaintId") Long complaintId) {
        complaintService.deleteComplaint(complaintId);
    }
    // http://localhost:8089/repondre-Complaint/{complaintId}

    @PutMapping("/repondre-Complaint/{complaintId}")
    public void repondreComplaint(@RequestBody Complaint e,@PathVariable("complaintId") Long complaintId) {
        complaintService.repondreReclamation(e,complaintId);
    }

}


