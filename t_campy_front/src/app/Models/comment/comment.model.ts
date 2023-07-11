export class Comment {
  protected id!: number;
  protected comment!: string;
  protected sentiment!: string;
  protected author_id!: number;
  protected post_id!: number;
  protected created_at!: Date;
  protected updated_at!: Date;

  constructor(
    id: number = 0,
    comment: string,
    sentiment: string = 'neutral',
    author_id: number,
    post_id: number,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.comment = comment;
    this.sentiment = sentiment;
    this.author_id = author_id;
    this.post_id = post_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public getId(): number {
    return this.id;
  }

  public getComment(): string {
    return this.comment;
  }

  public getUserId(): number {
    return this.author_id;
  }

  public getPostId(): number {
    return this.post_id;
  }

  public getCreatedAt(): string {
    return this.created_at.toUTCString();
  }

  public getUpdatedAt(): string {
    return this.updated_at.toUTCString();
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setComment(comment: string): void {
    this.comment = comment;
  }

  public setUserId(author_id: number): void {
    this.author_id = author_id;
  }

  public setPostId(post_id: number): void {
    this.post_id = post_id;
  }

  public setCreatedAt(created_at: Date): void {
    this.created_at = created_at;
  }

  public setUpdatedAt(updated_at: Date): void {
    this.updated_at = updated_at;
  }

  public updateDate(): void {
    this.updated_at = new Date();
  }

  public getAuthorId(): number {
    return this.author_id;
  }

  public static empty(): Comment {
    return new Comment(0, '', 'neutral', 0, 0, new Date(), new Date());
  }

  public static fromJson(json: any): Comment {
    if (json === null) {
      return null as any;
    }
    return new Comment(
      json.id,
      json.commentaire,
      json.sentiment,
      json.author_id,
      json.post_id,
      new Date(json.created_at),
      new Date(json.updated_at)
    );
  }

  public static fromJsonArray(jsonComments: any[]): Comment[] {
    if (jsonComments === undefined) {
      return [];
    }
    let comments: Comment[] = [];
    jsonComments.forEach((jsonComment) => {
      comments.push(Comment.fromJson(jsonComment));
    });
    return comments;
  }

  public toJson(): any {
    return {
      id: this.id,
      commentaire: this.comment,
      sentiment: this.sentiment,
      author_id: this.author_id,
      post_id: this.post_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
