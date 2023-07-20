import { Component, Injector } from '@angular/core';
import { Forum } from '../../Models/forum/forum.model';
import { ForumService } from 'src/app/Services/forum.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent {
  openedForums: Forum[] = [];
  numberOfOpenedForums: number = 0;
  numberOfClosedForums: number = 0;
  closedForums: Forum[] = [];
  forums!: Forum[];
  Status: string = 'all';

  constructor(private forumService: ForumService,private authService:AuthService) {}

  ngOnInit(): void {
    this.forumService.countOpenedForums().then((number) => {
      this.numberOfOpenedForums = number;
    });
    this.forumService.countClosedForums().then((number) => {
      this.numberOfClosedForums = number;
    });
    this.forumService.getOpenedForums().then((Forums) => {
      this.openedForums = Forums;
    });
    this.forumService.getClosedForums().then((Forums) => {
      this.closedForums = Forums;
    });
    this.forumService.fetchForumsFromServer().then((Forums) => {
      this.forums = Forums;
    });
    
  }

  sort($event: any) {
    this.Status = $event.value;
    if (this.Status === 'recent') {
         this.forums.sort((a, b) => {
          return (
            new Date(b.getCreationDate()).getTime() -
            new Date(a.getCreationDate()).getTime()
          );
          
        });
        
      
    } else if (this.Status === 'popular') {
      
        this.forums.sort((a, b) => {
        return b.getLikes() - a.getLikes();
      });
    
    } else if (this.Status === 'unanswered') {
      this.forumService.fetchForumsFromServer().then((forums) => {
        this.forums = forums;
      });
       this.forums.filter(
        (forum) => forum.getFeedbacks().length === 0
      );
       
    } else {
      this.forumService.fetchForumsFromServer().then((forums) => {
        return (forums as Forum[]) ? forums : [];
      });
    }
  }

  get openedForumsList(): Forum[] {
    return this.openedForums ? this.openedForums : [];
  }

  get closedForumsList(): Forum[] {
    return this.closedForums ? this.closedForums : [];
  }

  get numberOfOpenedForumsList(): number {
    return this.numberOfOpenedForums;
  }

  get numberOfClosedForumsList(): number {
    return this.numberOfClosedForums;
  }

  get ForumsLength(): number {
    return this.forums.length;
  }

  get ForumsList(): Forum[] {
    return this.forums ? this.forums : [];
  }
  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
