export class Notification {
  protected _id: number;
  protected _message: string;
  protected _type: string;
  protected _createdAt: Date;

  constructor(id: number, message: string, type: string, createdAt: Date) {
    this._id = id;
    this._message = message;
    this._type = type;
    this._createdAt = createdAt;
  }

  get id(): number {
    return this._id;
  }

  get message(): string {
    return this._message;
  }

  get type(): string {
    return this._type;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set id(value: number) {
    this._id = value;
  }

  set message(value: string) {
    this._message = value;
  }

  set type(value: string) {
    this._type = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  public toJSON() {
    return {
      id: this._id,
      message: this._message,
      type: this._type,
      createdAt: this._createdAt,
    };
  }

  public static fromJSON(json: any): Notification {
    const notification = new Notification(
      json.id,
      json.message,
      json.type,
      json.createdAt
    );
    return notification;
  }

  public static fromJSONs(jsons: any[]): Notification[] {
    const notifications: Notification[] = [];
    jsons.forEach((json) => {
      notifications.push(Notification.fromJSON(json));
    });
    return notifications;
  }

  public toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
