import { IEmpleado } from "./iEmpleado";
import { Ihabitacion } from "./iHabitacion";
import { IHuesped } from "./iHuesped";
import { IServicio } from "./iServicio";

export interface IReserva{
  nro_reserva: number,
  fecha_reserva: Date,
  cant_personas:number ,
  cant_dias: number,
  habitacion: Ihabitacion,
  huesped: IHuesped,
  empleado: IEmpleado,
  servicio: IServicio,
  estado_reserva: string
}
