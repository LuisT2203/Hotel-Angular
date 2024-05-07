import { Routes } from '@angular/router';
import { HabitacionesComponent } from './comp/habitaciones/habitaciones.component';
import { InicioComponent } from './comp/inicio/inicio.component';

export const routes: Routes = [
  {path:"habitaciones",component:HabitacionesComponent,title:"Gestor de Habitaciones"},
  {path:"inicio", component:InicioComponent,title:"Hotel Lima"},
  {path:"",redirectTo:"Inicio",pathMatch:'full'}
];
