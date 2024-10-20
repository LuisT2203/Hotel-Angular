import { Empleado } from "./empleado";
import { Habitacion } from "./habitacion";
import { Huesped } from "./huesped";
import { IEmpleado } from "./iEmpleado";
import { Ihabitacion } from "./iHabitacion";
import { IHuesped } from "./iHuesped";
import { IServicio } from "./iServicio";
import { Servicio } from "./servicio";

export class Reserva{
  nro_reserva: number=0;
  fecha_reserva: Date= new Date();
  cant_personas:number =0;
  cant_dias: number=0;
  habitacion: Ihabitacion = new Habitacion();
  huesped: IHuesped = new Huesped();
  servicios: IServicio[] = [];
  estado_reserva: string=""
}
