import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-receta',
  imports: [],
  templateUrl: './receta.html',
  styleUrl: './receta.css',
})
export class Receta {
  @Input() receta: any;
  @Output() eliminar = new EventEmitter<any>();

  onEliminar() {
    this.eliminar.emit(this.receta);
  }
}
