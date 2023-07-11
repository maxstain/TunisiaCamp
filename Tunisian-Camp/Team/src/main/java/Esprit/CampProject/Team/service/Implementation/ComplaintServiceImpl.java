package Esprit.CampProject.Team.service.Implementation;



import Esprit.CampProject.Team.entities.Complaint;
import Esprit.CampProject.Team.repository.ComplaintRepository;
import Esprit.CampProject.Team.repository.ForumRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class ComplaintServiceImpl implements ComplaintService{
    ComplaintRepository complaintRepository;
    ForumRepository forumRepository;
    @Override
    public List<Complaint> retrieveAllComplaints(){
        return (List<Complaint>) complaintRepository.findAll();
    }

    @Override
    public  Complaint addComplaint(Complaint e) {
        e.setDateMsg(new Date());
        return complaintRepository.save(e);
    }

    @Override
    public Complaint updateComplaint(Complaint complaint, Long idComplaint) {
        Complaint complaint1 = complaintRepository.findById(idComplaint).get();
        complaint1.setMessage(complaint.getMessage());
        complaint1.setObjet(complaint.getObjet());
        complaint1.setReponse(complaint.getReponse());
        return complaintRepository.save(complaint1);
    }

    @Override
    public Complaint retrieveComplaint(Long idComplaint) {
        return complaintRepository.findById(idComplaint).get();
    }

    @Override
    public void deleteComplaint(Long idComplaint) {

        complaintRepository.deleteById(idComplaint);

    }

    @Override
    public Complaint repondreReclamation(Complaint complaint, Long idComplaint) {
        Complaint complaint1 = complaintRepository.findById(idComplaint).get();
        complaint1.setDateRep(new Date());
        complaint1.setReponse(complaint.getReponse());
        return complaintRepository.save(complaint1);
    }



}
