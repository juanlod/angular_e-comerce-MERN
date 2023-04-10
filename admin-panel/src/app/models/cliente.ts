import { Mascota } from "./mascota";

/**
 * Interfaz de cliente
 */
export class Cliente{
  _id: string;
  idc: number;
  ayn: string;
  dir: string;
  codp: string;
  codt: string;
  tel: string;
  telC: string;
  email: string;
  obs: string;
  mark: number;
  feci: Date;
  fecu: Date;
  motuv: string;
  deuda: boolean;
  obra: number;
  FaltaMail: boolean;
  FaltaDir: boolean;
  Perfil1: boolean;
  Perfil2: boolean;
  Perfil3: boolean;
  Perfil4: boolean;
  Perfil5: boolean;
  Loc: number;
  Dep: number;
  tel2: string;
  telC2: string;
  codt2: string;
  codp2: string;
  Identif: string;
  mascotas: Mascota[];
}
