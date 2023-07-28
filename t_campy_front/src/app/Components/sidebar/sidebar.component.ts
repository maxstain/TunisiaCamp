import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Forum } from 'src/app/Models/forum/forum.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ForumService } from 'src/app/Services/forum.service';
import { QuestionsListComponent } from '../questions-list/questions-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public category: string = 'All';
  private questionsList!: QuestionsListComponent ;
  constructor(
    private authService: AuthService,
    private router: Router,
    private forumService: ForumService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.forumService.getForums();
    this.forumService.getTags();
    this.questionsList = new QuestionsListComponent(this.forumService, this.authService, this.snackbar);
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

  public getCertainNumberOfTags(number: number): string[] {
    let tags = this.forumService.getAllTags();
    let newTags: string[] = [];
    for (let i = 0; i < number; i++) {
      if (tags[i].length > 2)
      {
        newTags.push(tags[i]);
      }
    }
    return newTags;
  }

  public filterForumsByTag(tag: string) {
    console.log("Tag:", tag);
    if (tag != 'All') {
      this.forumService.filterForumsByTag(tag).then((forums) => {
        this.questionsList.forums = forums;
      });
    } else {
      this.forumService.fetchForumsFromServer();
    }
  }
}
