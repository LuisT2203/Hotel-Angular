import { Time} from "@angular/common"
import { IReserva } from "./iReserva"
import { IServicio } from "./iServicio"
import { IEmpleado } from "./iEmpleado"
import { Reserva } from "./Reserva";
import { Empleado } from "./empleado";
import { Servicio } from "./servicio";

export class DetalleServicio{
id_detaserv: number =0;
hora_serv:Time = { hours: 0, minutes: 0 };
estado_serv: String="";
 reserva: IReserva = new Reserva();
empleado: IEmpleado= new Empleado();
servicio: IServicio = new Servicio()
}
