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
  public category: string = 'All';
  constructor(
    private authService: AuthService,
    private router: Router,
    private forumService: ForumService
  ) {}

  ngOnInit() {
    this.forumService.getForums();
    this.forumService.getTags();
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public getCategories(): string[] {
    return this.forumService.getCategories();
  }

  public selectCategory(category: HTMLSelectElement) {
    this.category = category.value;
  }

  public filterForumsByCategory(forums: Forum[]) {
    if (this.category !== 'All') {
      forums.filter((forum) => forum.getCategory() === this.category);
    }
  }

  public getTags(): string[] {
    return this.forumService.getTags();
  }
}
