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
  public comment!: string;
  public comments!: Comment[];
  public commentsCount!: number;
  public category!: string;
  public title!: string;
  public description!: string;
  public isClickedLike: boolean = false;
  public isClickedDisLike: boolean = false;
  public idUsersLikes: number[] = [];
  public idUsersDisLikes: number[] = [];
  public forumList: number[] = [];
  public isClickedLikeComment: boolean = false;
  public isClickedDisLikeComment: boolean = false;
  public idUsersLikesComment: number[] = [];
  public idUsersDisLikesComment: number[] = [];
  public isChangeForum = false;
  public ischangeComment = false;
  public feedback!: Comment;

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
      this.forumService.fetchForumFromServer(this.id).then((forum) => {
        this.forum = forum;
        this.comments = this.forum.getFeedbacks();
      });
    });
    this.user = this.authService.getUser();
    this.title = this.forum.getTitle();
    this.description = this.forum.getDescription();
    this.category = this.forum.getCategory();
    // Retrieving the isclicked state from localStorage
    const isClickedLikeString = localStorage.getItem('isClickedLike');

    // Checking if the isclicked state exists in localStorage
    if (isClickedLikeString !== null) {
      const isClickedLike = JSON.parse(isClickedLikeString);
    }
    // Retrieving the isclicked state from localStorage
    const isClickedDisLikeString = localStorage.getItem('isClickedDisLike');

    // Checking if the isclicked state exists in localStorage
    if (isClickedDisLikeString !== null) {
      const isClickedDisLikeLike = JSON.parse(isClickedDisLikeString);
    }
    // Retrieve idUsersLikes and idUsersDisLikes arrays from localStorage
    const idUsersLikesString = localStorage.getItem('idUsersLikes');
    const idUsersDisLikesString = localStorage.getItem('idUsersDisLikes');

    // Check if the arrays exist in localStorage and assign them back to component properties
    if (idUsersLikesString) {
      this.idUsersLikes = JSON.parse(idUsersLikesString);
    }

    if (idUsersDisLikesString) {
      this.idUsersDisLikes = JSON.parse(idUsersDisLikesString);
    }
    // Retrieving the isclicked state from localStorage
    const isClickedLikeCommentString = localStorage.getItem(
      'isClickedLikeComment'
    );

    // Checking if the isclicked state exists in localStorage
    if (isClickedLikeCommentString !== null) {
      const isClickedLikeComment = JSON.parse(isClickedLikeCommentString);
    }
    // Retrieving the isclicked state from localStorage
    const isClickedDisLikeCommentString = localStorage.getItem(
      'isClickedDisLikeComment'
    );

    // Checking if the isclicked state exists in localStorage
    if (isClickedDisLikeCommentString !== null) {
      const isClickedDisLikeComment = JSON.parse(isClickedDisLikeCommentString);
    }

    //commmentairess part
    // Retrieve idUsersLikes and idUsersDisLikes arrays from localStorage
    const idUsersLikesCommentString = localStorage.getItem(
      'idUsersLikesComment'
    );
    const idUsersDisLikesCommentString = localStorage.getItem(
      'idUsersDisLikesComment'
    );

    // Check if the arrays exist in localStorage and assign them back to component properties
    if (idUsersLikesCommentString) {
      this.idUsersLikesComment = JSON.parse(idUsersLikesCommentString);
    }

    if (idUsersDisLikesCommentString) {
      this.idUsersDisLikesComment = JSON.parse(idUsersDisLikesCommentString);
    }
    // Retrieving the isclicked state from localStorage
    const ischangeCommentString = localStorage.getItem('isChangeComment');

    // Checking if the isclicked state exists in localStorage
    if (ischangeCommentString !== null) {
      const isChangeComment = JSON.parse(ischangeCommentString);
    }

    // Retrieving the isclicked state from localStorage
    const ischangeForumString = localStorage.getItem('isChangeForum');

    // Checking if the isclicked state exists in localStorage
    if (ischangeForumString !== null) {
      const isChangeForum = JSON.parse(ischangeForumString);
    }
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
      this.forum.getComplaints(),
      this.forum.getCamping()
    );
    this.forumService.updateForumOnServer(newForum);
    this.forumService.refreshPage();
  }

  public editCommentInServer() {
    let newComment = new Comment(
      this.feedback.getId(),
      this.comment,
      this.feedback.getSentiment(),
      1,
      Number(this.forum.getId()),
      new Date(this.feedback.getCreatedAt()),
      new Date(),
      this.feedback.getLikes(),
      this.feedback.getDisLikes()
    );

    this.forumService.updateCommentOnServer(this.forum, newComment);
    // this.forumService.refreshPage();
  }

  public closeForumInServer() {
    this.forumService.closeForum(this.forum);
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
  public getCategory() {
    return this.forum.getCategory();
  }
  public getForumId() {
    return this.forum.getId();
  }

  public addComment(comment: string) {
    comment = comment.trim();

    if (!comment) {
      return;
    }
    const maxIDcomment = Math.max(...this.comments.map((item) => item.getId()));
    this.forumService.getFeedbacksCountFromServer().then((id) => {
      this.commentsCount = id;
    });
    let newComment = new Comment(
      maxIDcomment + 1,
      comment,
      'neutral',
      this.user.getId(),
      Number(this.forum.getId()),
      new Date(),
      new Date(),
      0,
      0
    );
    // this.forumService.addCommentToServer(this.forum, newComment);
    this.forumService.addCommentToForumOnServer(this.forum, newComment);
    this.feedback = newComment;
    this.comment = '';
  }

  public fetchCommentAuthorFromId(id: number) {
    return this.forumService.getForumsByAuthorId(id);
  }

  public deleteComment(comment: Comment) {
    this.feedback = comment;
    if (this.user.getId() == this.feedback.getAuthorId()) {
      this.forumService
        .deleteCommentFromServer(this.forum, comment)
        .then(() => {
          this.snackbar.open('Comment deleted', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        });
    }
  }

  public like() {
    //  localStorage.clear();
    if (!this.idUsersLikes.includes(this.user.getId())) {
      // this.forumService.unDislikeForum(this.forum);
      this.idUsersDisLikes = this.idUsersDisLikes.filter(
        (userId) => userId !== this.user.getId()
      );
      this.forumService.likeForum(this.forum);
      this.idUsersLikes.push(this.user.getId());
      this.isClickedDisLike = false;
      this.isClickedLike = true;
      // Saving the isclicked state to localStorage
      localStorage.setItem('isClickedLike', JSON.stringify(this.isClickedLike));
      localStorage.setItem(
        'isClickedDisLike',
        JSON.stringify(this.isClickedDisLike)
      );
      // Save idUsersLikes and idUsersDisLikes arrays to localStorage
      localStorage.setItem('idUsersLikes', JSON.stringify(this.idUsersLikes));
      localStorage.setItem(
        'idUsersDisLikes',
        JSON.stringify(this.idUsersDisLikes)
      );

      console.log(this.idUsersDisLikes);
      console.log(this.idUsersLikes);
      // Log the contents of localStorage
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(String(key));
      console.log(`${key}: ${value}`);
    }
  }
  public dislike() {
    if (!this.idUsersDisLikes.includes(this.user.getId())) {
      this.idUsersLikes = this.idUsersLikes.filter(
        (userId) => userId !== this.user.getId()
      );
      this.forumService.dislikeForum(this.forum);
      this.idUsersDisLikes.push(this.user.getId());
      this.isClickedDisLike = true;
      this.isClickedLike = false;
      // Saving the isclicked state to localStorage
      localStorage.setItem('isClickedLike', JSON.stringify(this.isClickedLike));
      localStorage.setItem(
        'isClickedDisLike',
        JSON.stringify(this.isClickedDisLike)
      );
      // Save idUsersLikes and idUsersDisLikes arrays to localStorage
      localStorage.setItem('idUsersLikes', JSON.stringify(this.idUsersLikes));
      localStorage.setItem(
        'idUsersDisLikes',
        JSON.stringify(this.idUsersDisLikes)
      );
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(String(key));
      console.log(`${key}: ${value}`);
    }
  }
  public likeComment(comment: Comment) {
    //  localStorage.clear();
    if (!this.idUsersLikesComment.includes(this.user.getId())) {
      // this.forumService.unDislikeForum(this.forum);
      this.idUsersDisLikesComment = this.idUsersDisLikesComment.filter(
        (userId) => userId !== this.user.getId()
      );
      this.forumService.likeComment(comment);
      this.idUsersLikesComment.push(this.user.getId());
      this.isClickedDisLikeComment = false;
      this.isClickedLikeComment = true;
      // Saving the isclicked state to localStorage
      localStorage.setItem(
        'isClickedLikeComment',
        JSON.stringify(this.isClickedLikeComment)
      );
      localStorage.setItem(
        'isClickedDisLikeComment',
        JSON.stringify(this.isClickedDisLikeComment)
      );
      // Save idUsersLikes and idUsersDisLikes arrays to localStorage
      localStorage.setItem(
        'idUsersLikesComment',
        JSON.stringify(this.idUsersLikesComment)
      );
      localStorage.setItem(
        'idUsersDisLikesComment',
        JSON.stringify(this.idUsersDisLikesComment)
      );

      console.log(this.idUsersDisLikesComment);
      console.log(this.idUsersLikesComment);
      // Log the contents of localStorage
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(String(key));
      console.log(`${key}: ${value}`);
    }
  }

  public dislikeComment(comment: Comment) {
    if (!this.idUsersDisLikesComment.includes(this.user.getId())) {
      this.idUsersLikesComment = this.idUsersLikesComment.filter(
        (userId) => userId !== this.user.getId()
      );
      this.forumService.DislikeComment(comment);
      this.idUsersDisLikesComment.push(this.user.getId());
      this.isClickedDisLikeComment = true;
      this.isClickedLikeComment = false;
      // Saving the isclicked state to localStorage
      localStorage.setItem(
        'isClickedLikeComment',
        JSON.stringify(this.isClickedLikeComment)
      );
      localStorage.setItem(
        'isClickedDisLikeComment',
        JSON.stringify(this.isClickedDisLikeComment)
      ); //
      // Save idUsersLikes and idUsersDisLikes arrays to localStorage
      localStorage.setItem(
        'idUsersLikesComment',
        JSON.stringify(this.idUsersLikesComment)
      );
      localStorage.setItem(
        'idUsersDisLikesComment',
        JSON.stringify(this.idUsersDisLikesComment)
      );
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(String(key));
      console.log(`${key}: ${value}`);
    }
  }

  // public unLike() {
  //   this.forumService.unLikeForum(this.forum);
  // }

  // public unDislike() {
  //   this.forumService.unDislikeForum(this.forum);
  // }

  public getCategories(): string[] {
    return this.forumService.getCategories();
  }

  public selectCategory(category: HTMLSelectElement) {
    this.category = category.value;
    console.log('selected', this.category);
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public changeComment(feedback: Comment) {
    console.log(this.user.getId());

    this.feedback = feedback;
    console.log('hello', this.feedback.getAuthorId());
    console.log();
    if (this.user.getId() == this.feedback.getAuthorId()) {
      this.ischangeComment = true;
    }
    this.isChangeForum = false;
    localStorage.setItem(
      'ischangeComment',
      JSON.stringify(this.ischangeComment)
    );
    localStorage.setItem('isChangeForum', JSON.stringify(this.isChangeForum));
  }
  public changeForum() {
    this.ischangeComment = false;
    this.isChangeForum = true;
    localStorage.setItem(
      'ischangeComment',
      JSON.stringify(this.ischangeComment)
    );
    localStorage.setItem('isChangeForum', JSON.stringify(this.isChangeForum));
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(String(key));
      console.log(`${key}: ${value}`);
    }
    return this.forum;
  }
}
