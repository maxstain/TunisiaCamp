import { Camping } from '../Camping/camping';
import { Complaint } from '../Complaint/complaint';
import { Comment } from '../comment/comment.model';
export class Forum {
  private id: string;
  private title: string;
  private description: string;
  private date: Date;
  private author: string;
  private tags: string;
  private likes: number;
  private dislikes: number;
  private Status: string;
  private category: string;
  private feedbacks: Comment[];
  private complaints: Complaint[];
  private camping: any = {};

  constructor(
    id: string,
    title: string,
    description: string,
    date: Date,
    author: string,
    tags: string,
    likes: number,
    dislikes: number,
    Status: string,
    category: string,
    feedbacks: Comment[],
    complaints: Complaint[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.author = author;
    this.tags = tags;
    this.likes = likes;
    this.dislikes = dislikes;
    this.Status = Status;
    this.category = category;
    this.feedbacks = feedbacks;
    this.complaints = complaints;
  }

  public static fromJson(json: any): Forum {
    if (json === null) {
      return null as any;
    }
    return new Forum(
      json.id,
      json.title,
      json.description,
      new Date(json.date),
      json.author,
      json.tags,
      json.likes,
      json.dislikes,
      json.Status,
      json.category,
      Comment.fromJsonArray(json.feedbacks),
      Complaint.fromJsonArray(json.complaints)
    );
  }

  public static fromJsonArray(json: any[]): Forum[] {
    let forums: Forum[] = [];
    for (let forum of json) {
      forums.push(Forum.fromJson(forum));
    }
    return forums;
  }

  public toJson(): any {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date,
      author: this.author,
      tags: this.tags,
      likes: this.likes,
      dislikes: this.dislikes,
      Status: this.Status,
      category: this.category,
      feedbacks: this.feedbacks.map((f) => f.toJson()),
      complaints: this.complaints.map((c) => c.toJson()),
      camping: this.camping,
    };
  }

  public isOpened(): boolean {
    return this.Status === 'Open';
  }

  public open(): void {
    this.Status = 'Open';
  }

  public close(): void {
    this.Status = 'Closed';
  }

  public like(): void {
    this.likes++;
  }

  public dislike(): void {
    this.dislikes++;
  }

  public addComment(comment: Comment): void {
    this.feedbacks.push(comment);
  }

  public getFeedbacks(): Comment[] {
    return this.feedbacks;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDate(): string {
    return this.date.toUTCString();
  }

  public getAuthor(): string {
    return this.author;
  }

  public getTags(): string {
    return this.tags;
  }

  public getLikes(): number {
    return this.likes;
  }

  public getDislikes(): number {
    return this.dislikes;
  }

  public getStatus(): string {
    return this.Status;
  }

  public getCategory(): string {
    return this.category;
  }

  public getfeedbacksNumber(): number {
    return this.feedbacks.length;
  }

  public unLike(): void {
    this.likes--;
  }

  public unDislike(): void {
    this.dislikes--;
  }

  public getCommentByAuthorId(id: number): Comment {
    return this.feedbacks.find((c) => c.getUserId() === id) as Comment;
  }

  public deleteComment(comment: Comment) {
    this.feedbacks = this.feedbacks.filter(
      (c) => c.getId() !== comment.getId()
    );
  }

  public updateComment(comment: Comment) {
    this.feedbacks = this.feedbacks.map((c) => {
      if (c.getId() === comment.getId()) {
        return comment;
      }
      return c;
    });
  }

  public getCommentAuthorId(id: number): number {
    return this.feedbacks.find((c) => c.getUserId() === id)?.getId() as number;
  }

  public getCreationDate(): Date {
    return new Date(this.date);
  }

  public setCreationDate(date: Date) {
    this.date = date;
  }

  public getComplaints(): Complaint[] {
    return this.complaints;
  }

  public static empty(): Forum {
    return new Forum('0', '', '', new Date(), '', '', 0, 0, '', '', [], []);
  }

  public tagsToArray(): string[] {
    return this.getTags().split(',');
  }
}
