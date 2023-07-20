import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activityUrl = environment.baseUrl + 'activities'

  constructor(private http: HttpClient) { }

    getActivitiesByGroupId(groupId: number): Observable<Activity[]> {
        const url = `${this.activityUrl}/byGroup/${groupId}`;
        return this.http.get<Activity[]>(url);
    }
}
