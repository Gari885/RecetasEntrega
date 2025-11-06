// En: src/app/moleculas/receta/receta.ts

// 1. Importa 'input' y 'CommonModule' (para @for)
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

// 2. Importa el modelo
import { RecetaModelo } from '../../modelos/receta.modelo';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [CommonModule], // 3. Añade CommonModule
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})
export class Receta { // (o RecetaComponent)

  // 4. Define el Input usando la nueva sintaxis de signal.
  //    Lo marcamos como "required" (obligatorio).
  public receta = input.required<RecetaModelo>();

}
