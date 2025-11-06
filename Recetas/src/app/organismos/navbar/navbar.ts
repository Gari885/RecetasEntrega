import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-navbar',
  imports: [FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  termino: string = '';

  @Output() buscar = new EventEmitter<string>();

  onBuscar(event: Event) {
    event.preventDefault(); // Evita el refresh del formulario
    this.buscar.emit(this.termino.trim());
  }
}
