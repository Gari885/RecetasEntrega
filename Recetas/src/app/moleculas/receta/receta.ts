// En: src/app/moleculas/receta/receta.ts

// Importamos las funciones clave de Angular
import { Component, input, output } from '@angular/core';
// CommonModule nos da acceso a directivas como @for y @if en el HTML
import { CommonModule } from '@angular/common';
// Importamos la "plantilla" de datos para saber qué es una receta
import { RecetaModelo } from '../../modelos/receta.modelo';

/**
 * Componente "Molécula" (según Atomic Design).
 * Representa la tarjeta visual (UI) de UNA SOLA receta.
 * Es un componente "tonto" (dump component), lo que significa que:
 * 1. RECIBE datos (la receta) desde un componente padre (el organismo).
 * 2. EMITE eventos (como "borrar") hacia el componente padre.
 * No tiene lógica de negocio propia; solo muestra datos y notifica acciones.
 */
@Component({
  selector: 'app-receta',        // El nombre de la etiqueta HTML: <app-receta>
  standalone: true,           // Es un componente Standalone (moderno, no usa NgModules)
  imports: [CommonModule],      // Importa CommonModule para poder usar @for (para ingredientes)
  templateUrl: './receta.html', // El archivo con la vista (HTML)
  styleUrl: './receta.css'      // El archivo con los estilos (CSS)
})
export class Receta { // (o RecetaComponent)

  /**
   * (Entrada de datos - Input)
   * Define una "entrada" de datos obligatoria.
   * El componente padre ('organismo-recetas') debe pasarle un objeto
   * que cumpla con la interfaz 'RecetaModelo'.
   * Se usa así en el HTML del padre: <app-receta [receta]="miObjetoReceta"></app-receta>
   *
   * [cite: source 326, 328, 329]
   */
  public receta = input.required<RecetaModelo>();
  
  /**
   * (Salida de eventos - Output)
   * Define un "evento de salida" que el padre puede escuchar.
   * Cuando este componente emita el evento, el padre reaccionará.
   * Se usa así en el HTML del padre: <app-receta (onDelete)="miFuncion()"></app-receta>
   *
   * Es de tipo <void> porque solo notificamos el "clic", no pasamos datos extra.
   * [cite: source 367, 371]
   */
  public onDelete = output<void>(); // Emitirá un evento simple

  /**
   * Método "manejador" (handler) que es llamado por el botón de "Eliminar"
   * en el archivo 'receta.html' a través de (click)="onBorrarClick()".
   */
  public onBorrarClick() {
    // 4. Emite el evento 'onDelete' hacia arriba, para que el padre lo escuche [cite: source 372]
    this.onDelete.emit();
  }
}
