import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Offre } from 'src/app/models/offre';
import { GroupService } from 'src/app/services/group.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-list-offre',
  templateUrl: './list-offre.component.html',
  styleUrls: ['./list-offre.component.css']
})
export class ListOffreComponent implements OnInit {

  listOffre:Offre[]= [];
  groupe!:Group
  constructor(private offreeService:OffreService,
    private router: Router,
    private groupService:GroupService) { }

  ngOnInit(): void {
    this.getOffres();
  }
  getOffres(){
    return this.offreeService.getOffres().subscribe(offres => {this.listOffre=offres
      console.log(this.listOffre)})
  }
  deleteOffre(id: number) {
    this.offreeService.deleteOffre(id)
      .subscribe(
        data => {
          console.log(data);
          this.getOffres();
        },
        error => console.log(error));
  }

  offreDetails(id: number){
    this.router.navigate(['offreDetails', id]);
  }
  updateOffre(id: number){
    this.router.navigate(['updateOffre', id]);
  }

}
