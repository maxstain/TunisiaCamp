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
  @Input()
  public forum!: Forum;
  user!: User;
  id!: number;
  sub!: any;

  @ViewChild('popup') popup!: ElementRef;

  public comment!: string;
  public comments!: Comment[];
  public commentsCount!: number;
  public category!: string;
  public title!: string;
  public description!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private forumService: ForumService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.forumService.fetchForumFromServer(this.id).then((forum) => {
        this.forum = forum;
      });
      // this.forum = this.forumService.getForum(this.id);
    });
    this.user = this.authService.getUser();
    this.title = this.forum.getTitle();
    this.description = this.forum.getDescription();
    this.category = this.forum.getCategory();
  }

  public deleteForumFromServer() {
    this.forumService.deleteForumFromServer(this.forum);
    // this.forumService.deleteForum(this.forum);
  }

  public editForumInServer() {
    let newForum = new Forum(
      this.forum.getId(),
      this.title ? this.title : this.forum.getTitle(),
      this.description ? this.description : this.forum.getDescription(),
      this.forum.getCreationDate(),
      this.forum.getAuthor(),
      this.forum.getTags(),
      this.forum.getLikes(),
      this.forum.getDislikes(),
      this.forum.getStatus(),
      this.category ? this.category : this.forum.getCategory(),
      this.forum.getFeedbacks(),
      this.forum.getComplaints()
    );
    this.forumService.editForumOnServer(newForum);
    this.forumService.refreshPage();
  }

  public closeForumInServer() {
    this.forumService.closeForum(this.forum);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['topics']);
  }

  public getFeedbacks() {
    return this.forum.getFeedbacks().filter((feedback) => {
      return feedback.getCreatedAt() <= new Date().toUTCString();
    });
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
      return;
    }
    this.forumService.getFeedbacksCountFromServer().then((id) => {
      this.commentsCount = id;
    });
    let newComment = new Comment(
      this.commentsCount + 1,
      comment,
      'neutral',
      1,
      Number(this.forum.getId()),
      new Date(),
      new Date()
    );
    // this.forumService.addCommentToServer(this.forum, newComment);
    this.forumService.addCommentToForumOnServer(this.forum, newComment);
    this.comment = '';
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
