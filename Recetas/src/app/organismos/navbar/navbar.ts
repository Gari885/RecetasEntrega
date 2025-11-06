
import { Component } from '@angular/core';
// 1. Importamos los módulos de Routing
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // 2. Los añadimos aquí
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar { // (o NavbarComponent si le cambiaste el nombre)
  // ...
}
