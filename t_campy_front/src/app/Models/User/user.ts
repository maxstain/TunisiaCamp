export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  admin: boolean;
  group: string;
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    age: number,
    admin: boolean,
    group: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.admin = admin;
    this.group = group;
  }

  public static fromJson(json: any): User {
    if (json === null) {
      return null as any;
    }
    return new User(
      json.id,
      json.name,
      json.email,
      json.password,
      json.age,
      json.role,
      json.group
    );
  }

  public isLogged(): boolean {
    return this.group !== '';
  }

  public isNotLogged(): boolean {
    return this.group === '';
  }

  public isSameUser(user: User): boolean {
    return this.id === user.id;
  }

  public isNotSameUser(user: User): boolean {
    return !this.isSameUser(user);
  }

  public getFullName(): string {
    return this.name;
  }

  public getShortName(): string {
    return this.name.split(' ')[0];
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getUsername(): string {
    return this.name;
  }

  public setUsername(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getAge(): number {
    return this.age;
  }

  public setAge(age: number): void {
    this.age = age;
  }

  public makeAdmin(): void {
    this.admin = true;
  }

  public getGroup(): string {
    return this.group;
  }

  public setGroup(group: string): void {
    this.group = group;
  }

  public isAdmin(): boolean {
    return this.admin;
  }

  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      admin: this.admin,
      group: this.group,
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJson());
  }

  public static empty(): User {
    return new User(0, '', '', '', 0, false, '');
  }
}
