import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jugador } from '../Interfaces/jugador';
import { JugadorProvider } from '../Providers/jugador.provider';


@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  jugadores?: jugador[];

  //constructor( private jugadorProvider : JugadorProvider) { }
  constructor( private jugadorProvider : JugadorProvider, private router: Router , 
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.jugadorProvider.getAll().subscribe({
      next:(response: jugador[])=> {this.jugadores=response;console.log(this.jugadores)},
      error: (error)=> console.log(error),
      complete:() => console.log("llamada completada")  
    });
  }

  create(){
    this.router.navigate(["form"],{relativeTo:this.route})
  }

  edit(id:number){
    this.router.navigate(["form",id],{relativeTo: this.route});
  }

  delete(id: number){
    this.jugadorProvider.delete(id).subscribe({
      next:()=> {this.jugadores=this.jugadores?.filter((jugador) => jugador.id !=id);
        console.log(this.jugadores)},
      error: (error)=> console.log(error),
      complete:() => console.log("Usuario elimido")  
    });
  }

}
