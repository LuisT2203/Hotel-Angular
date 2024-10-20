import { IEmpleado } from "./iEmpleado";

export interface IServicio{
  id_servicio: number,
  tipo: string,
  nombre: string,
  precio: number,
  empleado: IEmpleado;

}
