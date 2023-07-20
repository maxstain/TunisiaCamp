import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Offre } from 'src/app/models/offre';
import { GroupService } from 'src/app/services/group.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {


  groupId!: number;
  offre: Offre = {
    id:0,
    titre: '',
    description: '',
    nombreTotal: 0
  };

  constructor(private groupService:GroupService,
    private router :Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit(): void {
    // this.groupId=this.route.snapshot.params['groupId'];
    this.groupId = this.data.id;
    // this.route.params.subscribe(params => {
    //   this.groupId = params['groupId'];
    // });
  }
  // addOffre(){
  //   console.log(this.offre);

  //   this.groupService.addOffreToGroup(this.groupId,this.offre).subscribe(()=>
  //     {

  //       this.router.navigate(['/offres']),
  //       this.offre = {
  //         id:0,
  //         titre: '',
  //         description: '',
  //         nombreTotal: 0
  //       };
  //     }
  //   )

  //   }
  saveOffre(): void {
    // Call the GroupService's addOffreToGroup method to save the offre for the group
    this.groupService.addOffreToGroup(this.groupId, this.offre).subscribe(
      (response) => {
        console.log('Offre added successfully')
        this.router.navigate(['groups'])
        // Navigate back to the group list or perform any other necessary actions
      },
      (error) => {
        console.log('Error adding offre:', error);
      }
    );
  }
}
