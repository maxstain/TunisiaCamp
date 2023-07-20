import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-groups-management',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.css']
})
export class GroupsManagementComponent implements OnInit {
  activityList:Activity[]=[]
  constructor(private activityService:ActivityService) { }

  ngOnInit(): void {
  }
  getActivitiesByGroupId(groupId: number){
    this.activityService.getActivitiesByGroupId(groupId).subscribe(activities =>this.activityList=activities)
  }
}
