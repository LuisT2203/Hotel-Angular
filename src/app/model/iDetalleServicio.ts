import { Time } from "@angular/common"
import { IReserva } from "./iReserva"
import { IServicio } from "./iServicio"
import { IEmpleado } from "./iEmpleado"

export interface IDetalleServicio{
  id_detaserv: number,
hora_serv:Time,
estado_serv: String,
reserva: IReserva,
empleado: IEmpleado,
servicio: IServicio
}
