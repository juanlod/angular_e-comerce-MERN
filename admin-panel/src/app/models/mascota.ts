import { Cliente } from "./cliente";

/**
 * Interfaz de mascota. Necesario para implementacion
 */
export interface Mascota {
  _id: string ;
  idm: number;
  idc: Cliente['idc'];
  nom: string;
  raz: number;
  esp: number;
  fecn: string ;
  pel: number;
  pes: number;
  car: null | string;
  ser: number;
  obs: null | string;
  feci: string ;
  sex: number;
  ped: boolean;
  rep: boolean;
  dec: boolean;
  fot: boolean;
  int: boolean;
  hos: number;
  fult: string;
  tarea: boolean;
  Chip: null | string;
}
