import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Forum } from 'src/app/Models/forum/forum.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ForumService } from 'src/app/Services/forum.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private forumService: ForumService
  ) {}

  ngOnInit() {}

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public getCategories(): string[] {
    return this.forumService.getCategories();
  }
}
