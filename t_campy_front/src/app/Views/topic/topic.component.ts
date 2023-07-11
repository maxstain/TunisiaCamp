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
  }

  public deleteForumFromServer() {
    this.forumService.deleteForumFromServer(this.forum);
    // this.forumService.deleteForum(this.forum);
  }

  public editForumInServer() {
    this.router.navigate(['/edit-forum', this.forum.getId()]);
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
      return;
    }
    let newComment = new Comment(
      this.forum.getFeedbacks().length,
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
}
