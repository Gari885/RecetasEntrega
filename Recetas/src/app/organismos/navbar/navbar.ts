// En: src/app/organismos/navbar/navbar.ts

import { Component } from '@angular/core';
// Importamos las directivas de Router para que funcionen los enlaces
// [routerLink] y [routerLinkActive] en el HTML
import { RouterLink, RouterLinkActive } from '@angular/router';

// 1. Importa el "cerebro" (el servicio)
import { RecetaService } from '../../servicios/receta';

/**
 * Componente "Organismo" (según Atomic Design).
 * Es un componente "inteligente" porque interactúa
 * con el RecetaService para enviar el término de búsqueda.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  // Imports necesarios para que las directivas de Router funcionen en el HTML
  imports: [RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  /**
   * (2) Inyectamos el RecetaService usando el constructor (Inyección de Dependencias).
   * Ahora, 'this.recetaService' nos da acceso a todos los métodos
   * públicos del servicio (como buscarReceta, addReceta, etc.).
   */
  constructor(private recetaService: RecetaService) {}

  /**
   * (3) Método "manejador" (handler) que se llama CADA VEZ que el usuario
   * teclea en el campo de búsqueda.
   * Se conecta en el HTML con: (input)="onSearch($event)"
   */
  onSearch(event: Event) {
    // 4. Obtenemos el <input> que ha disparado el evento
    const input = event.target as HTMLInputElement;
    // Extraemos el texto que el usuario ha escrito
    const terminoBusqueda = input.value;
    
    /**
     * (5) Enviamos el término de búsqueda al servicio.
     * Fíjate cómo el Navbar NO sabe cómo se filtra, ni le importa.
     * Su único trabajo es coger el texto y pasárselo al "cerebro".
     * Esto es una buena práctica (Separación de Responsabilidades).
     */
    this.recetaService.buscarReceta(terminoBusqueda);
  }
}