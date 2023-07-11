package Esprit.CampProject.Team.service;


import Esprit.CampProject.Team.entities.Complaint;

import java.util.List;

public interface ComplaintService {
    List<Complaint> retrieveAllComplaints();

    Complaint addComplaint(Complaint f);

    Complaint updateComplaint(Complaint complaint, Long idComplaint);

    Complaint retrieveComplaint (Long idComplaint);

    void deleteComplaint(Long idComplaint);
    Complaint repondreReclamation(Complaint complaint, Long idComplaint);

}

