import { Time } from "@angular/common"
import { Ihabitacion } from "./iHabitacion"
import { IReserva } from "./iReserva"

export interface IDetalleReserva{
id_detareser: number,
fecha_ingreso: Date,
hora_entrada: string,
hora_salida: string,
fecha_salida: Date,
habitacion: Ihabitacion,
reserva: IReserva
}
