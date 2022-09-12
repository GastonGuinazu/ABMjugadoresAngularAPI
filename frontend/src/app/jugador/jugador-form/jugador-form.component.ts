import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jugador } from 'src/app/Interfaces/jugador';
import { JugadorProvider } from 'src/app/Providers/jugador.provider';

@Component({
  selector: 'app-jugador-form',
  templateUrl: './jugador-form.component.html',
  styleUrls: ['./jugador-form.component.css']
})
export class JugadorFormComponent implements OnInit {


  id?: number;
  nombre?: string;
  posicion?: string;
  dorsal?: number;

  isEdit: boolean = false;


  constructor(private jugadorProvider: JugadorProvider, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.route.snapshot.params["id"]){
      this.isEdit = true;
      this.jugadorProvider.getById(this.route.snapshot.params["id"]).subscribe({
        next:(response: jugador) => {
          this.id = response.id;
          this.nombre= response.nombre;
          this.dorsal= response.dorsal; 
          this.posicion=response.posicion;  
          console.log(response);       
        },
        error:(error) => console.error(error),
        complete:() => console.info('complete')
      });
    }
  }

  onCreate() {
    // if (this.nombre || this.posicion  == ''){
    //   alert("Campos requeridos");
    //   return;
    // }
    this.jugadorProvider.create(this.nombre,this.posicion,this.dorsal).subscribe({
      next:(response: jugador) => {
        this.id = response.id;
        alert("Jugador insertado");
        console.log(response);
        this.router.navigate(["jugador"]);
      },
      error:(error) => console.error(error),
      complete:() => console.info('complete')      
    })
  }

  onEdit() {
    this.jugadorProvider.edit(this.id,this.nombre,this.posicion,this.dorsal).subscribe({
      next:(response: jugador) => {
        alert("usuario editado");
        console.log(response);
      },
      error:(error) => console.error(error),
      complete:() => console.info('complete')      
    })
  }

  onCancel() {
    this.router.navigate(["jugador"])
  }

}
