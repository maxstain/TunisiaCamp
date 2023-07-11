import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Complaint } from 'src/app/Models/Complaint/complaint';
import { User } from 'src/app/Models/User/user';
import { AuthService } from 'src/app/Services/auth.service';
import { ComplaintService } from 'src/app/Services/complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss'],
})
export class ComplaintComponent {
  reply!: string;
  complaint!: Complaint;
  @Input()
  id!: number;
  sub!: any;

  @ViewChild('popup') popup!: ElementRef;

  public comment!: string;
  user!: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private complaintService: ComplaintService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.complaintService
        .fetchComplaintFromServer(this.id)
        .then((complaint) => {
          this.complaint = complaint;
        });
    });
    this.user = this.authService.getUser();
    if (!this.user.isAdmin() || this.complaint.user_id != this.user.getId()) {
      this.router.navigate(['/']);
    } else if (!this.complaint) {
      this.router.navigate(['/admin']);
    }
  }

  public replyToComplaint(): void {
    if (!this.reply) {
      this.snackBar.open('Please fill all the fields', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.complaint.reponse = this.reply;
    try {
      this.complaintService.updateComplaintFromServer(this.complaint); // update complaint
      this.snackBar.open('Complaint updated', 'Close', {
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      this.snackBar.open('Error while replying complaint', 'Close', {
        duration: 3000,
      });
    }
    this.reply = '';
  }
}
