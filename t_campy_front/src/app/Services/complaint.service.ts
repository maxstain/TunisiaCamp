import { Injectable } from '@angular/core';
import { Complaint } from '../Models/Complaint/complaint';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  public complaints!: Complaint[];
  public complaint!: Complaint;
  public StaticComplaints: Complaint[] = [
    new Complaint(
      1,
      'object',
      'message',
      new Date(),
      new Date(),
      'reponse',
      1,
      1
    ),
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchComplaintsFromServer().then(
      (complaints) => (this.complaints = complaints ? complaints : [])
    );
    // this.getComplaints();
  }

  public getComplaints(): Complaint[] {
    return this.StaticComplaints;
  }

  public addComplaint(complaint: Complaint): void {
    this.StaticComplaints.push(complaint);
  }

  public async fetchComplaintsFromServer(): Promise<Complaint[]> {
    try {
      return (this.complaints = await this.http
        .get<Complaint[]>(
          'http://localhost:8089/Complaint/retrieve-all-Complaints'
        )
        .toPromise()
        .then((complaints: any) => {
          return complaints.map((complaint: any) => {
            return Complaint.fromJson(complaint);
          });
        }));
    } catch (error) {
      console.log('Error:', error);
      this.snackbar.open('Error while fetching Complaints', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return [];
    }
  }

  public async addComplaintToServer(complaint: Complaint) {
    try {
      await this.http
        .post(
          'http://localhost:8089/Complaint/add-Complaint',
          complaint.toJson()
        )
        .subscribe((data) => {
          this.fetchComplaintsFromServer();
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while adding complaint', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
    this.refreshPage();
  }

  public async deleteComplaintFromServer(id: number) {
    try {
      await this.http
        .delete('http://localhost:8089/Complaint/delete-Complaint/' + id)
        .subscribe((data) => {
          this.fetchComplaintsFromServer().then((complaints) => {
            this.complaints = complaints;
          });
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while deleting complaint', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
    this.refreshPage();
  }

  public async updateComplaintFromServer(complaint: Complaint) {
    try {
      await this.http
        .put(
          'http://localhost:8089/Complaint/update-Complaint/' + complaint.id,
          complaint.toJson()
        )
        .subscribe((data) => {
          this.fetchComplaintsFromServer();
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while updating complaint', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
    this.refreshPage();
  }

  public async fetchComplaintFromServer(id: number): Promise<Complaint> {
    try {
      return (this.complaint = await this.http
        .get<Complaint>(
          'http://localhost:8089/Complaint/retrieve-Complaint/' + id
        )
        .toPromise()
        .then((complaint: any) => {
          return Complaint.fromJson(complaint);
        }));
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while fetching Complaint', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return Complaint.empty();
    }
  }

  refreshPage() {
    window.location.reload();
  }
}
