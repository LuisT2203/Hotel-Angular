import { Time } from "@angular/common"
import { IHabitacion } from "./iHabitacion"
import { IReserva } from "./iReserva"
import { Habitacion } from "./habitacion";
import { Reserva } from "./Reserva";

export class DetalleReserva{
id_detareser: number = 0;
fecha_ingreso: Date = new Date();
hora_entrada: string =  "";
hora_salida: string="";
fecha_salida: Date = new Date();
habitacion: IHabitacion = new Habitacion();
reserva: IReserva = new Reserva () 
}
