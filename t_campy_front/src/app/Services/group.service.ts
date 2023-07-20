import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { Offre } from '../models/offre';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupUrl = environment.baseUrl + 'group'
  constructor(private http:HttpClient) { }
  getGroups():Observable<any>{
    return this.http.get(this.groupUrl +'/retrieve-all-Groups');
  }
  addGroup(group:Group):Observable<any>{
    return this.http.post<Group>(this.groupUrl +'/addGroup',group)
  }
  deleteGroup (id: number):Observable<Group> {
     const url=this.groupUrl+'/deleteGroup/'+id;
    return this.http.delete<Group>(url);
  }
  updateGroup (group: Group): Observable<Group> {
    return this.http.put<Group>(this.groupUrl+'/updateGroup', group);
  }
  getGroupById (id: number): Observable<Group> {
    return this.http.get<Group>(this.groupUrl+'/getGroupById/'+ id);
  }
  // addOffreToGroup(groupId: number, offre: Offre): Observable<any> {
  //   const url = `${this.groupUrl}/offre/${groupId}/offres`;
  //   return this.http.post(url, offre);
  // }
  addOffreToGroup(groupId: number, offreData: any) {
    const url = `${this.groupUrl}/${groupId}/offres`;
    return this.http.post(url, offreData);
  }
  deleteActivity(groupId: number, activityId: number): Observable<any> {
    const url = `${this.groupUrl}/${groupId}/activities/${activityId}`;
    return this.http.delete(url);
  }
}
