import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // false = cerrado, true = abierto (para la vista móvil)
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  // cerrar el menú (útil cuando el usuario hace click en un enlace)
  close() {
    this.isOpen = false;
  }
}
