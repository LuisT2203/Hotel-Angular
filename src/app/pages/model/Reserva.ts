import { Empleado } from "./empleado";
import { Habitacion } from "./habitacion";
import { Huesped } from "./huesped";
import { IEmpleado } from "./iEmpleado";
import { IHabitacion } from "./iHabitacion";
import { IHuesped } from "./iHuesped";
import { IServicio } from "./iServicio";
import { Servicio } from "./servicio";

export class Reserva{
  nro_reserva: number=0;
  fecha_reserva: Date= new Date();
  cant_personas:number =0;
  cant_dias: number=0;
  habitacion: IHabitacion = new Habitacion();
  huesped: IHuesped = new Huesped();
  empleado: IEmpleado = new Empleado();
  servicio: IServicio = new Servicio();
  estado_reserva: string=""
}
