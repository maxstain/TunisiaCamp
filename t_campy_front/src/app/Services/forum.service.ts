import { Injectable } from '@angular/core';
import { Forum } from '../Models/forum/forum.model';
import { Comment } from '../Models/comment/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Camping } from '../Models/Camping/camping';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  public forums: Forum[] = [];
  Forum: Forum = Forum.empty();
  public tags: string[] = [];
  public comments: Comment[] = [];

  public Categories: string[] = [
    'Camping',
    'Product Reviews',
    'Places to Visit',
    'Product Comparisons',
    'Tips and Tricks',
    'Other',
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchForumsFromServer().then(
      (forums) => (this.forums = forums ? forums : [])
    );
    // this.getForums();
    this.tags = ['Camping', 'Product Reviews', 'Places to Visit'];
  }

  public getInstance(): ForumService {
    return new ForumService(
      this.http,
      this.router,
      this.authService,
      this.snackbar
    );
  }

  getTags(): string[] {
    return this.tags;
  }
  public async fetchForumsFromServer(): Promise<Forum[]> {
    try {
      return (this.forums = await this.http
        .get<Forum[]>('http://localhost:8089/forum/retrieve-all-forums')
        .toPromise()
        .then((forums: any) => {
          return forums.map((forum: any) => {
            return Forum.fromJson(forum);
          });
        }));
    } catch (error) {
      console.log('Error:', error);
      this.snackbar.open('Error while fetching Forums', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return [];
    }
  }

  public async fetchForumFromServer(id: number): Promise<Forum> {
    try {
      return (
        ((await this.http
          .get<Forum>('http://localhost:8089/forum/retrieve-forum/' + id)
          .toPromise()
          .then((forum: any) => {
            return Forum.fromJson(forum);
          })) as Forum) ?? Forum.empty()
      );
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while fetching Forum', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return Forum.empty();
    }
  }

  // public getForum(id: number): Forum {
  //   return (
  //     this.forums.find((t) => t.getId() === id.toString())! ?? Forum.empty()
  //   );
  // }

  public getForums(): Forum[] {
    return this.forums ?? [];
  }

  public async addForumToServer(forum: Forum): Promise<void> {
    try {
      await this.http
        .post<Forum>('http://localhost:8089/forum/add-forum', forum.toJson())
        .toPromise()
        .then((forum: any) => {
          this.forums.push(Forum.fromJson(forum));
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while adding Forum', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
  }

  public async updateForumOnServer(forum: Forum): Promise<void> {
    try {
      await this.http
        .put<Forum>(
          'http://localhost:8089/forum/update-forum/' + forum.getId(),
          forum.toJson()
        )
        .subscribe(async (forum: any) => {
          (await this.forums).splice(
            (await this.forums).findIndex((t) => t.getId() === forum.getId()),
            1,
            Forum.fromJson(forum)
          );
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while updating Forum', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
  }

  public async countOpenedForums(): Promise<number> {
    let i: number = 0;
    for (let Forum of await this.forums) {
      if (Forum.isOpened()) {
        i++;
      }
    }
    return i;
  }

  public async countClosedForums(): Promise<number> {
    let i: number = 0;
    for (let Forum of await this.forums) {
      if (!Forum.isOpened()) {
        i++;
      }
    }
    return i;
  }

  public async getOpenedForums(): Promise<Forum[]> {
    return (await this.forums).filter((forum) => forum.isOpened()) ?? [];
  }

  public async openForum(forum: Forum) {
    (await this.forums).find((t) => t.getId() === forum.getId())?.open();
  }

  public async closeForum(forum: Forum) {
    (await this.forums).find((t) => t.getId() === forum.getId())?.close();
  }

  public async deleteForumFromServer(forum: Forum) {
    try {
      await this.http
        .delete<Forum>(
          'http://localhost:8089/forum/delete-forum/' + forum.getId()
        )
        .subscribe(async (forum: any) => {
          (await this.forums).splice(
            (await this.forums).findIndex((t) => t.getId() === forum.getId()),
            1
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  public async getForumById(id: string): Promise<Forum> {
    return (await this.forums).find((t) => t.getId() === id)! ?? Forum.empty();
  }

  public async getFeedbacks(Forum: Forum): Promise<Comment[]> {
    return Forum.getFeedbacks() ?? [];
  }

  public async addCommentToForumOnServer(forum: Forum, comment: Comment) {
    await this.http
      .post<Forum>(
        'http://localhost:8089/Feedback/add-Feedback/' + forum.getId(),
        comment.toJson()
      )
      .subscribe(async (Forum: any) => {
        (await this.forums)
          .find((t) => t.getId() === Forum.getId())!
          .addComment(Comment.fromJson(Forum));
      });
  }

  public addComment(Forum: Forum, comment: Comment) {
    Forum.addComment(comment);
  }

  public async updateCommentOnServer(Forum: Forum, comment: Comment) {
    try {
      await this.http
        .put<Forum>(
          'http://localhost:8089/Feedback/update-Feedback/' +
            Forum.getId() +
            '/' +
            comment.getId(),
          comment.toJson()
        )
        .subscribe(async (Forum: any) => {
          (await this.forums)
            .find((t) => t.getId() === Forum.getId())!
            .getFeedbacks()
            .find((t) => t.getId() === Forum.getId())!
            .getComment();
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while updating Comment', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
    this.refreshPage();
  }

  public async getForumsByCategory(category: string): Promise<Forum[]> {
    return (
      (await this.forums).filter((t) => t.getCategory() === category) ?? []
    );
  }

  public getCategories(): string[] {
    return this.Categories;
  }

  public async unLikeForum(Forum: Forum) {
    Forum.unLike();
    await this.http.put<Forum>(
      'http://localhost:8089/forum/unlike-forum/' + Forum.getId(),
      Forum.toJson()
    );
    this.refreshPage();
  }

  public async unDislikeForum(Forum: Forum) {
    Forum.unDislike();
    await this.http.put<Forum>(
      'http://localhost:8089/forum/undislike-forum/' + Forum.getId(),
      Forum.toJson()
    );
    this.refreshPage();
  }

  public async getClosedForums(): Promise<Forum[]> {
    return (await this.forums).filter((forum) => !forum.isOpened()) ?? [];
  }

  public async likeForum(forum: Forum) {
    forum.like();
    await this.http.put<Forum>(
      'http://localhost:8089/forum/add-like-Forum/' + forum.getId(),
      forum.toJson()
    );
    this.refreshPage();
  }

  public async dislikeForum(forum: Forum) {
    forum.dislike();
    await this.http.put<Forum>(
      'http://localhost:8089/forum/add-dislike-Forum/' + forum.getId(),
      forum.toJson()
    );
    this.refreshPage();
  }

  public async getCommentByAuthorId(
    forum: Forum,
    id: number
  ): Promise<Comment> {
    return (
      forum.getFeedbacks().find((c) => c.getAuthorId() === id)! ??
      Comment.empty()
    );
  }

  public async deleteCommentFromServer(forum: Forum, comment: Comment) {
    try {
      await this.http
        .delete<Forum>(
          'http://localhost:8089/Feedback/delete-Feedback/' +
            forum.getId() +
            '/' +
            comment.getId()
        )
        .subscribe(async (forum: any) => {
          (await this.forums)
            .find((t) => t.getId() === forum.getId())!
            .getFeedbacks()
            .splice(
              (await this.forums)
                .find((t) => t.getId() === forum.getId())!
                .getFeedbacks()
                .findIndex((t) => t.getId() === forum.getId()),
              1
            );
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while deleting Comment', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
    this.refreshPage();
  }

  public async getRecentForums(): Promise<Forum[]> {
    return (await this.forums).sort((a, b) => {
      return (
        new Date(b.getCreationDate()).getTime() -
        new Date(a.getCreationDate()).getTime()
      );
    });
  }

  public async getPopularForums(): Promise<Forum[]> {
    return (await this.forums).sort((a, b) => {
      return b.getLikes() - a.getLikes();
    });
  }

  public async getUnansweredForums(): Promise<Forum[]> {
    this.fetchForumsFromServer().then((forums) => {
      this.forums = forums;
    });
    return (await this.forums).filter(
      (forum) => forum.getFeedbacks().length === 0
    );
  }

  public async getForumsByAuthorId(id: number): Promise<Forum[]> {
    return (await this.forums).filter(
      (forum) => Number(forum.getAuthor()) === id
    );
  }

  refreshPage() {
    window.location.reload();
  }

  public async getFeedbacksOfForumOnServer(forum: Forum): Promise<Comment[]> {
    try {
      await this.http
        .get<Comment[]>(
          'http://localhost:8089/Feedback/retrieve-all-Feedbacks/' +
            forum.getId()
        )
        .toPromise()
        .then((comments: any) => {
          forum.setFeedbacks(
            comments.map((comment: any) => {
              return Comment.fromJson(comment);
            })
          );
        });
      return forum.getFeedbacks();
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while fetching Comments', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return [];
    }
  }

  public async getFeedbacksFromServer(): Promise<Comment[]> {
    try {
      await this.http
        .get<Comment[]>('http://localhost:8089/Feedback/retrieve-all-feedbacks')
        .toPromise()
        .then((comments: any) => {
          this.comments = comments.map((comment: any) => {
            return Comment.fromJson(comment);
          });
        });
      return this.comments;
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while fetching Comments', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return [];
    }
  }

  public async getFeedbackById(id: number): Promise<Comment> {
    return (await this.comments).find((t) => t.getId() === id)!;
  }
}
