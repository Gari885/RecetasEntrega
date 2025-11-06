// En: src/app/organismos/recetas/recetas.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receta } from '../../moleculas/receta/receta';

// 1. Importa el servicio
import { RecetaService } from '../../servicios/receta';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, Receta],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css'
})
export class Recetas { // (o RecetasComponent)

  // 2. Declara la variable para guardar la lista
  // (El $ es una convención para signals u observables)
  listaRecetas$;

  // 3. Inyecta el servicio en el constructor
  constructor(private recetaService: RecetaService) {
    // 4. Asigna la señal del servicio a tu variable local
    this.listaRecetas$ = this.recetaService.getRecetas();
  }

}