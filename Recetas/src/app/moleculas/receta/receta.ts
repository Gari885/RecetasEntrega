// En: src/app/moleculas/receta/receta.ts

// 1. Importa 'output'
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetaModelo } from '../../modelos/receta.modelo';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})
export class Receta { // (o RecetaComponent)

  public receta = input.required<RecetaModelo>();
  
  // 2. Define el evento de salida (Output)
  public onDelete = output<void>(); // Emitirá un evento simple

  // 3. Crea la función que llama el botón
  public onBorrarClick() {
    // 4. Emite el evento para que el padre lo escuche
    this.onDelete.emit();
  }
}
