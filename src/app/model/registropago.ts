import { Reserva } from "./Reserva";
import { IReserva } from "./iReserva";

export class RegistroPago{
  id_pago:number=0;
  precio:number=0;
  cant_dias: number=0;
  precio_habi:number=0;
  monto: number=0;
  reserva: IReserva = new Reserva();
}
