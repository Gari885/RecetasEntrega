// En: src/app/organismos/recetas/recetas.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receta } from '../../moleculas/receta/receta';
import { RecetaService } from '../../servicios/receta';
import { RecetaModelo } from '../../modelos/receta.modelo'; // Importa el modelo

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, Receta],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css'
})
export class Recetas { // (o RecetasComponent)

  listaRecetas$;

  constructor(private recetaService: RecetaService) {
    this.listaRecetas$ = this.recetaService.getRecetas();
  }

  // PASO 3.B: Crea el método que escucha el evento
  public handleDelete(recetaABorrar: RecetaModelo) {
    // Simplemente, llama al servicio
    this.recetaService.deleteReceta(recetaABorrar);
  }
}