import { Empleado } from "./empleado";
import { IEmpleado } from "./iEmpleado";

export class Servicio{
  id_servicio: number =0;
  tipo: string="";
  nombre: string="";
  precio: number=0;
  empleado: IEmpleado = new Empleado()
}
