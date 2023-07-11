import { Camping } from '../Camping/camping';

export class Localisation {
  private id: number;
  private name: string;
  private address: string;
  private campings: Camping[];

  constructor(id: number, name: string, address: string, campings: Camping[]) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.campings = campings;
  }

  public static fromJson(json: any): Localisation {
    if (json === null) {
      return null as any;
    }
    return new Localisation(
      json.id,
      json.name,
      json.address,
      Camping.fromJsonArray(json.campings)
    );
  }

  public static fromJsonArray(jsonLocalisation: any[]): Localisation[] {
    const localisations: Localisation[] = [];
    jsonLocalisation.forEach((element) => {
      localisations.push(Localisation.fromJson(element));
    });
    return localisations;
  }

  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      campings: this.campings.map((camping) => camping.toJson()),
    };
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getAddress(): string {
    return this.address;
  }

  public getCampings(): Camping[] {
    return this.campings;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public setCampings(campings: Camping[]): void {
    this.campings = campings;
  }

  public static empty(): Localisation {
    return new Localisation(0, '', '', []);
  }

  public toString(): string {
    return this.name + ' ' + this.address;
  }

  public equals(localisation: Localisation): boolean {
    return this.id === localisation.getId();
  }

  public compareTo(localisation: Localisation): number {
    if (this.id > localisation.getId()) {
      return 1;
    } else if (this.id < localisation.getId()) {
      return -1;
    } else {
      return 0;
    }
  }
}
