import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-details-group',
  templateUrl: './details-group.component.html',
  styleUrls: ['./details-group.component.css']
})
export class DetailsGroupComponent implements OnInit {
  id!: number;
  group!: Group;
  activityList: Activity[] = [];

  constructor(private route: ActivatedRoute,private router: Router,
    private groupService: GroupService,
    private activityService:ActivityService) { }

  ngOnInit() {
    this.group = new Group();

    this.id = this.route.snapshot.params['id'];

    this.groupService.getGroupById(this.id)
      .subscribe(data => {
        console.log(data)
        this.group = data;
      }, error => console.log(error));
      this.getActivitiesByGroupId(this.id)
  }

  list(){
    this.router.navigate(['groups']);
  }
  getActivitiesByGroupId(groupId: number){
    this.activityService.getActivitiesByGroupId(groupId).subscribe(activities =>this.activityList=activities)
  }

}
