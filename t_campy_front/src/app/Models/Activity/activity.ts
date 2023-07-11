import { Camping } from '../Camping/camping';
import { Groupe } from '../Groupe/groupe';
import { Type } from '../Type/type';

export class Activity {
  private id: number;
  private name: string;
  private description: string;
  private type: Type;
  private campings: Camping[];
  private groupe: Groupe;

  constructor(
    id: number,
    name: string,
    description: string,
    type: Type,
    campings: Camping[],
    groupe: Groupe
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.campings = campings;
    this.groupe = groupe;
  }

  public static fromJson(json: any): Activity {
    if (json === null) {
      return null as any;
    }
    return new Activity(
      json.id,
      json.name,
      json.description,
      json.type,
      json.campings,
      json.groupe
    );
  }

  public static fromJsonArray(jsonActivity: any[]): Activity[] {
    const activities: Activity[] = [];
    jsonActivity.forEach((element) => {
      activities.push(Activity.fromJson(element));
    });
    return activities;
  }

  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      campings: this.campings,
      groupe: this.groupe,
    };
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getType(): Type {
    return this.type;
  }

  public getCampings(): Camping[] {
    return this.campings;
  }

  public getGroupe(): Groupe {
    return this.groupe;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setType(type: Type): void {
    this.type = type;
  }

  public setCampings(campings: Camping[]): void {
    this.campings = campings;
  }

  public setGroupe(groupe: Groupe): void {
    this.groupe = groupe;
  }

  public addCamping(camping: Camping): void {
    this.campings.push(camping);
  }

  public addGroupe(groupe: Groupe): void {
    this.groupe = groupe;
  }

  public addType(type: Type): void {
    this.type = type;
  }

  public toString(): string {
    return (
      'Activity : { id: ' +
      this.id +
      ', name: ' +
      this.name +
      ', description: ' +
      this.description +
      ', type: ' +
      this.type +
      ', campings: ' +
      this.campings +
      ', groupe: ' +
      this.groupe +
      ' }'
    );
  }

  public equals(obj: any): boolean {
    if (this === obj) {
      return true;
    }
    if (!(obj instanceof Activity)) {
      return false;
    }
    const other = obj as Activity;
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.description === other.description &&
      this.type === other.type &&
      this.campings === other.campings &&
      this.groupe === other.groupe
    );
  }
}
