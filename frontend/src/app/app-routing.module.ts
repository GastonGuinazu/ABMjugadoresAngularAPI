import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JugadorFormComponent } from './jugador/jugador-form/jugador-form.component';
import { JugadorComponent } from './jugador/jugador.component';

const routes: Routes = [
  {path : "jugador", component: JugadorComponent}, 
  {path : "jugador/form", component: JugadorFormComponent }, 
  {path : "jugador/form/:id", component: JugadorFormComponent }, 
  {path : "**", component: HomeComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
