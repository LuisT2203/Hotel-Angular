import { IReserva } from "./iReserva"

export interface IRegistroPago{
  id_pago:number,
  precio:number,
  cant_dias: number,
  precio_habi:number,
  monto: number,
  reserva: IReserva
}
