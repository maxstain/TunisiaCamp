import { Camping } from '../Camping/camping';
import { User } from '../User/user';

export class Reservation {
  private id: number;
  private nombrePersonne: number;
  private dateReservation: number;
  private duration: number;
  private camping: Camping;
  private user: User;

  constructor(
    id: number,
    nombrePersonne: number,
    dateReservation: number,
    duration: number,
    camping: Camping,
    user: User
  ) {
    this.id = id;
    this.nombrePersonne = nombrePersonne;
    this.dateReservation = dateReservation;
    this.duration = duration;
    this.camping = camping;
    this.user = user;
  }

  public static fromJson(json: any): Reservation {
    if (json === null) {
      return null as any;
    }
    return new Reservation(
      json.id,
      json.nombrePersonne,
      json.dateReservation,
      json.duration,
      json.camping,
      json.user
    );
  }

  public static fromJsonArray(jsonReservation: any[]): Reservation[] {
    const reservations: Reservation[] = [];
    jsonReservation.forEach((element) => {
      reservations.push(Reservation.fromJson(element));
    });
    return reservations;
  }

  public toJson(): any {
    return {
      id: this.id,
      nombrePersonne: this.nombrePersonne,
      dateReservation: this.dateReservation,
      duration: this.duration,
      camping: this.camping,
      user: this.user,
    };
  }

  public getId(): number {
    return this.id;
  }

  public getNombrePersonne(): number {
    return this.nombrePersonne;
  }

  public getDateReservation(): number {
    return this.dateReservation;
  }

  public getDuration(): number {
    return this.duration;
  }

  public getCamping(): Camping {
    return this.camping;
  }

  public getUser(): User {
    return this.user;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setNombrePersonne(nombrePersonne: number): void {
    this.nombrePersonne = nombrePersonne;
  }

  public setDateReservation(dateReservation: number): void {
    this.dateReservation = dateReservation;
  }

  public setDuration(duration: number): void {
    this.duration = duration;
  }

  public setCamping(camping: Camping): void {
    this.camping = camping;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public static empty(): Reservation {
    return new Reservation(0, 0, 0, 0, Camping.empty(), User.empty());
  }

  public equals(reservation: Reservation): boolean {
    return this.id === reservation.getId();
  }
}
