// En: src/app/organismos/navbar/navbar.ts

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// 1. Importa el servicio
import { RecetaService } from '../../servicios/receta';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  // 2. Inyecta el servicio en el constructor
  constructor(private recetaService: RecetaService) {}

  // 3. Crea la función que se llama desde el HTML
  onSearch(event: Event) {
    // 4. Obtenemos el valor del input
    const input = event.target as HTMLInputElement;
    const terminoBusqueda = input.value;
    
    // 5. Llamamos a un nuevo método en el servicio (que crearemos ahora)
    this.recetaService.buscarReceta(terminoBusqueda);
  }
}