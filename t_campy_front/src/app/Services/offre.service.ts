import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offre } from '../models/offre';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  offreUrl = environment.baseUrl + 'Offre'
  constructor(private http:HttpClient) { }
  getOffres():Observable<any>{
    return this.http.get(this.offreUrl +'/retrieve-all-Offres');
  }
  addOffre(Offre:Offre):Observable<any>{
    return this.http.post<Offre>(this.offreUrl +'/addOffre',Offre)
  }
  deleteOffre (offre: Offre | number):Observable<Offre> {
    const id = typeof offre === 'number' ? offre : offre.id; const url=this.offreUrl+'/deleteOffre/'+id;
    return this.http.delete<Offre>(url);
  }
  updateOffre ( offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(this.offreUrl+'/updateOffre', offre);
  }
  getOffreById (id: number): Observable<Offre> {
    return this.http.get<Offre>(this.offreUrl+'/getOffreById/'+ id);
  }
}
