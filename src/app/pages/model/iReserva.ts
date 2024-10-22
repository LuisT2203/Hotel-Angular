import { IEmpleado } from "./iEmpleado";
import { IHabitacion } from "./iHabitacion";
import { IHuesped } from "./iHuesped";
import { IServicio } from "./iServicio";

export interface IReserva{
  nro_reserva: number,
  fecha_reserva: Date,
  cant_personas:number ,
  cant_dias: number,
  habitacion: IHabitacion,
  huesped: IHuesped,
  empleado: IEmpleado,
  servicio: IServicio,
  estado_reserva: string
}
