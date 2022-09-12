import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { jugador } from 'src/app/Interfaces/jugador';

@Component({
  selector: 'app-jugador-list',
  templateUrl: './jugador-list.component.html',
  styleUrls: ['./jugador-list.component.css']
})
export class JugadorListComponent implements OnInit {

  @Input() jugadores?: jugador[];
  @Output() createEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

create(){
  this.createEvent.emit();  
}

edit(id: number){
  this.editEvent.emit(id);
}

delete(id: number){
  this.deleteEvent.emit(id);
}

}
