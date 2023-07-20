import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddGroupComponent } from '../../add-Group/add-group/add-group.component';
import { AddOffreComponent } from 'src/app/components/offres-management/add-offre/add-offre.component';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
listGroup:Group[]= [];
groupId!:number
  constructor(private groupeService:GroupService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.groupId=this.route.snapshot.params['groupId'];
    this.getGroups();
  }
  openAddGroupDialog(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '400px', // adjust the width and other options as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the dialog close event if needed

    });
  }
  openAddOffreDialog(id:number): void {
    const dialogRef = this.dialog.open(AddOffreComponent, {
      width: '400px',
      data: { id: id } // adjust the width and other options as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the dialog close event if needed
    });
  }
  getGroups(){
    return this.groupeService.getGroups().subscribe(groups => {this.listGroup=groups
      console.log(this.listGroup)})
  }
  deleteGroup(id: number) {

    this.groupeService.deleteGroup(id)
      .subscribe(
        data => {
          console.log(data);
          this.getGroups();
        },
        error => console.log(error));
  }

  groupDetails(id: number){
    this.router.navigate(['details', id]);
  }
  updateGroup(id: number){
    this.router.navigate(['update', id]);
  }
  // openAddOffre() {
  //   this.router.navigate(['groups', this.groupId, 'offres', 'add']);
  // }
  addOffreToGroup(groupId: number): void {
    this.router.navigate(['groups', groupId,'offre']);
  }
  goTo(){
    this.router.navigate(['addGroup' ]);
  }

}
