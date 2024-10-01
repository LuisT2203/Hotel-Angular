import { Routes } from '@angular/router';
import { HabitacionesComponent } from './comp/habitaciones/habitaciones.component';
import { InicioComponent } from './comp/inicio/inicio.component';
import { EmpleadosComponent } from './comp/empleados/empleados.component';
import { HuespedsComponent } from './comp/huespeds/huespeds.component';
import { ServiciosComponent } from './comp/servicios/servicios.component';
import { ReservasComponent } from './comp/reservas/reservas.component';
import { DetallereservaComponent } from './comp/detallereserva/detallereserva.component';
import { DetalleservicioComponent } from './comp/detalleservicio/detalleservicio.component';
import { RegistropagoComponent } from './comp/registropago/registropago.component';

export const routes: Routes = [
  {path:"habitaciones",component:HabitacionesComponent,title:"Gestor de Habitaciones"},
  {path:"empleados",component:EmpleadosComponent,title:"Gestor de Empleados"},
  {path:"huespedes",component:HuespedsComponent,title:"Gestor de Huespedes"},
  {path:"servicios",component:ServiciosComponent,title:"Gestor de Servicios"},
  {path:"reservas",component:ReservasComponent,title:"Gestor de Reservas"},
  {path:"detallereserva",component:DetallereservaComponent,title:"Gestor de Detalle Reserva"},
  {path:"detalleservicio",component:DetalleservicioComponent,title:"Gestor de Detalle Reserva"},
  {path:"pago", component:RegistropagoComponent,title:"Registro Pago"},
  {path:"inicio", component:InicioComponent,title:"Hotel Lima"},
  {path:"",redirectTo:"inicio",pathMatch:'full'}
];
