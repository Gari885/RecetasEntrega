// En: src/app/moleculas/receta/receta.ts

import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetaModelo } from '../../modelos/receta.modelo';
import { Rating } from '../../moleculas/rating/rating';

/**
 * Componente de presentación (Molécula) que renderiza una tarjeta de receta individual.
 * Recibe datos vía Input y emite acciones vía Output.
 */
@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [CommonModule, Rating],
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})
export class Receta {

  // Input obligatorio: Datos de la receta a mostrar
  public receta = input.required<RecetaModelo>();
  
  // Outputs: Eventos que este componente puede emitir
  public onDelete = output<void>();    // Solicitud de borrado
  public onVote = output<number>();    // Voto directo (si se usara)
  public onDetail = output<void>();    // Solicitud de ver detalle
  public onVoteClick = output<void>(); // Clic en botón de votar

  // Cálculo de la media de valoración para mostrar las estrellas
  public media = computed(() => {
    const r = this.receta();
    if (!r.votos || r.votos === 0) return 0;
    return (r.puntuacion || 0) / r.votos;
  });

  /**
   * Maneja el clic en el botón de borrar, evitando que se propague al card.
   */
  public onBorrarClick(event: Event) {
    event.stopPropagation();
    this.onDelete.emit();
  }

  public handleRate(stars: number) {
    this.onVote.emit(stars);
  }

  /**
   * Maneja el clic en el botón de votar, evitando propagación.
   */
  public handleVoteButtonClick(event: Event) {
    event.stopPropagation();
    this.onVoteClick.emit();
  }

  /**
   * Si la imagen falla al cargar, muestra una imagen por defecto.
   */
  public handleImageError(event: any) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
  }
}
