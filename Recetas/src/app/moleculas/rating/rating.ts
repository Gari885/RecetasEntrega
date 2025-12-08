import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrl: './rating.css'
})
export class Rating {
  /**
   * Valoración actual (0-5).
   */
  public rating = input<number>(0);

  /**
   * Si es true, no se puede interactuar.
   */
  public readonly = input<boolean>(false);

  /**
   * Evento que emite la nueva valoración al hacer clic.
   */
  public onRate = output<number>();

  /**
   * Array auxiliar para generar las 5 estrellas.
   */
  public stars = [1, 2, 3, 4, 5];

  /**
   * Maneja el clic en una estrella.
   */
  public rate(star: number) {
    if (!this.readonly()) {
      this.onRate.emit(star);
    }
  }
}
