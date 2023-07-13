import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/Models/Complaint/complaint';
import { User } from 'src/app/Models/User/user';
import { AuthService } from 'src/app/Services/auth.service';
import { ComplaintService } from 'src/app/Services/complaint.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  currentUser = this.authService.getUser();
  user!: User;
  route: string = this.router.url;
  view: string = 'dashboard';
  complaints!: Complaint[];
  public complaint!: Complaint;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private complaintService: ComplaintService
  ) {
    if (this.userService.isAdmin()) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
    this.complaint = this.complaintService.complaint;
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user.getUsername());
    console.log('route', this.route);
    this.complaintService.fetchComplaintsFromServer().then((complaints) => {
      this.complaints = complaints;
      console.log('complaints', this.complaints);
    });
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  public switchViewTo(view: string): void {
    if (view === 'complaints') {
      this.view = 'complaints';
      this.complaintService.fetchComplaintsFromServer().then((complaints) => {
        this.complaints = complaints;
      });
    } else {
      this.view = 'dashboard';
    }
  }

  public deleteComplaint(complaintId: number): void {
    this.complaintService.deleteComplaintFromServer(complaintId);
    this.complaintService.fetchComplaintsFromServer().then((complaints) => {
      this.complaints = complaints;
      console.log('complaints', this.complaints);
    });

    this.router.navigate(['/admin']);
  }

  public async fetchComplaintFromServer(complaintId: number) {
    await this.complaintService
      .fetchComplaintFromServer(complaintId)
      .then((complaint) => {
        this.complaint = complaint;
        console.log('complaint', this.complaint);
      });
    this.complaintService.complaint = await this.complaint;
  }
}
