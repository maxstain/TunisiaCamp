import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from 'src/app/models/offre';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-details-offre',
  templateUrl: './details-offre.component.html',
  styleUrls: ['./details-offre.component.css']
})
export class DetailsOffreComponent implements OnInit {

  id!: number;
  offre!: Offre;

  constructor(private route: ActivatedRoute,private router: Router,
    private offreService: OffreService) { }

  ngOnInit() {
    this.offre = new Offre();

    this.id = this.route.snapshot.params['id'];

    this.offreService.getOffreById(this.id)
      .subscribe(data => {
        console.log(data)
        this.offre = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['offers']);
  }
}
