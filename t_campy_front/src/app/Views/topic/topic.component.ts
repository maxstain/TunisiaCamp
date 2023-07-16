import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/Models/User/user';
import { Comment } from 'src/app/Models/comment/comment.model';
import { Forum } from 'src/app/Models/forum/forum.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ForumService } from 'src/app/Services/forum.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @ViewChild('popup') popup!: ElementRef;
  @Input()
  public forum: Forum = Forum.empty();
  user!: User;
  id!: number;
  sub!: any;
  public comment: string = '';
  public comments: Comment[] = [];
  public commentsCount: number = 0;
  public category: string = '';
  public title: string = '';
  public description: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private forumService: ForumService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.forumService = this.forumService.getInstance();
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.forumService.fetchForumFromServer(this.id).then((forum) => {
      this.forum = forum;
    });
    this.comments = this.forum.getFeedbacks();
    this.commentsCount = this.comments.length;
    this.user = this.authService.getUser();
    this.title = this.forum.getTitle();
    this.description = this.forum.getDescription();
    this.category = this.forum.getCategory();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  public deleteForumFromServer() {
    this.forumService.deleteForumFromServer(this.forum);
    this.router.navigate(['/forums']).then(() => {
      window.location.reload();
    });
  }

  public editForumInServer() {
    if (this.title == '') {
      this.title = this.forum.getTitle();
    }
    if (this.description == '') {
      this.description = this.forum.getDescription();
    }
    if (this.category == '') {
      this.category = this.forum.getCategory();
    }
    try {
      let newForum = new Forum(
        this.forum.getId(),
        this.title,
        this.description,
        new Date(this.forum.getDate()),
        this.forum.getAuthor(),
        this.forum.getTags(),
        this.forum.getLikes(),
        this.forum.getDislikes(),
        this.forum.getStatus(),
        this.category,
        this.forum.getCampingId()
      );
      this.forumService.updateForumOnServer(newForum);
    } catch (error) {
      this.snackbar.open('Error', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return;
    }
    this.forumService.refreshPage();
  }

  public closeForumInServer() {
    this.forumService.closeForum(this.forum);
  }

  onBack(): void {
    this.router.navigate(['topics']);
  }

  public getFeedbacks() {
    return this.forum.getFeedbacks();
  }

  public getForum() {
    return this.forum;
  }

  public getForumId() {
    return this.forum.getId();
  }

  public addComment(comment: string) {
    comment = comment.trim();

    if (!comment) {
      this.snackbar.open('Please fill all the fields', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      console.log('Forum title: ', this.forum.getTitle());
      console.log('Forum description: ', this.forum.getDescription());
      console.log('Forum Category: ', this.forum.getCategory());
      return;
    }

    let newComment = new Comment(
      0,
      comment,
      'neutral',
      this.user.getId(),
      Number(this.forum.getId()),
      new Date(),
      new Date()
    );
    try {
      this.forumService.addCommentToForumOnServer(this.forum, newComment);
    } catch (error) {
      this.snackbar.open('Error', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return;
    }
    this.comment = '';
    this.forumService.refreshPage();
  }

  public fetchCommentAuthorFromId(id: number) {
    return this.forumService.getForumsByAuthorId(id);
  }

  public deleteComment(comment: Comment) {
    this.forumService.deleteCommentFromServer(this.forum, comment).then(() => {
      this.snackbar.open('Comment deleted', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    });
  }

  public like() {
    this.forumService.likeForum(this.forum);
  }

  public dislike() {
    this.forumService.dislikeForum(this.forum);
  }

  public unLike() {
    this.forumService.unLikeForum(this.forum);
  }

  public unDislike() {
    this.forumService.unDislikeForum(this.forum);
  }

  public getCategories(): string[] {
    return this.forumService.getCategories();
  }

  public selectCategory(category: HTMLSelectElement) {
    this.category = category.value;
    console.log('selected', this.category);
  }
}
