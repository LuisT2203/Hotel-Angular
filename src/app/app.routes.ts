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
import { LoginComponent } from './comp/login/login.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { authGuard } from './guards/auth.guard';
import { authHuespedGuard } from './guards/auth-huesped.guard';

export const routes: Routes = [
  {path:"habitaciones",component:HabitacionesComponent,title:"Gestor de Habitaciones", canActivate: [authHuespedGuard]},
  {path:"empleados",component:EmpleadosComponent,title:"Gestor de Empleados", canActivate: [authGuard]},
  {path:"huespedes",component:HuespedsComponent,title:"Gestor de Huespedes", canActivate: [authGuard]},
  {path:"servicios",component:ServiciosComponent,title:"Gestor de Servicios", canActivate: [authGuard]},
  {path:"reservas",component:ReservasComponent,title:"Gestor de Reservas", canActivate: [authHuespedGuard]},
  {path:"detallereserva",component:DetallereservaComponent,title:"Gestor de Detalle Reserva", canActivate: [authGuard]},
  {path:"detalleservicio",component:DetalleservicioComponent,title:"Gestor de Detalle Servicio", canActivate: [authGuard]},
  {path:"pago", component:RegistropagoComponent,title:"Registro Pago", canActivate: [authGuard]},
  {path:"inicio", component:InicioComponent,title:"Hotel Lima"},
  {path:"login", component:LoginComponent,title:"Hotel Lima",canActivate: [authenticatedGuard]},
  {path:"",redirectTo:"inicio",pathMatch:'full'}
];
