import { Activity } from "./activity"
import { Offre } from "./offre"
import { Reservation } from "./reservation"

export class Group {
  id!:number
  name!:string
  activities!:Activity[]
  offres!:Offre[]
  reservations!:Reservation[]
  image!:any
}
