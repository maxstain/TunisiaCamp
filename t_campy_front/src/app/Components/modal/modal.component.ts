import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Camping } from 'src/app/Models/Camping/camping';
import { Complaint } from 'src/app/Models/Complaint/complaint';
import { Forum } from 'src/app/Models/forum/forum.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ComplaintService } from 'src/app/Services/complaint.service';
import { ForumService } from 'src/app/Services/forum.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  forum!: Forum;
  @Input() complaint!: Complaint;
  forums!: Forum[];

  title!: string;
  description!: string;
  category!: string;
  complaintReply!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private forumService: ForumService,
    private complaintService: ComplaintService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.forumService
      .fetchForumsFromServer()
      .then((forums) => (this.forums = forums ? forums : []));
  }

  public addForumToServer(): void {
    if (!this.title || !this.description || !this.category) {
      this.snackBar.open('Please fill all the fields', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return;
    }
    this.forum = new Forum(
      (this.forums.length + 1).toString(),
      this.title,
      this.description,
      new Date(),
      this.authService.getUsername(),
      'No tags yet',
      0,
      0,
      'Open',
      this.category,
      [],
      []
    );
    try {
      this.forumService.addForumToServer(this.forum); // add Forum to server
      this.snackBar.open('Forum added', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      this.snackBar.open('Error while adding Forum', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
    this.title = '';
    this.description = '';
    this.router.navigate(['/forums']);
  }

  public addComplaint(): void {
    if (!this.title || !this.description) {
      this.snackBar.open('Please fill all the fields', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return;
    }
    this.complaint = new Complaint(
      this.complaintService.getComplaints().length + 1,
      this.title,
      this.description,
      new Date(),
      new Date(),
      '',
      Number(this.authService.getUser()),
      1
    );
    try {
      this.complaintService.addComplaintToServer(this.complaint); // add complaint to server
      // this.complaintService.addComplaint(this.complaint); // add complaint not to server
      this.snackBar.open('Complaint added', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      this.snackBar.open('Error while adding complaint', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
    this.title = '';
    this.description = '';
  }

  public getCategories(): string[] {
    return this.forumService.getCategories();
  }

  public selectCategory(category: HTMLSelectElement) {
    this.category = category.value;
    console.log('selected', this.category);
  }
}
