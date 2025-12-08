// En: src/app/organismos/recetas/recetas.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receta } from '../../moleculas/receta/receta';
import { RecetaService } from '../../servicios/receta';
import { RecetaModelo } from '../../modelos/receta.modelo'; 
import { Rating } from '../../moleculas/rating/rating';

/**
 * Organismo principal que muestra el listado de recetas.
 * Gestiona la comunicación entre el servicio de datos y las tarjetas individuales.
 * También maneja los modales de detalle y votación.
 */
@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, Receta, Rating],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css'
})
export class Recetas { 

  // Señal con la lista de recetas filtradas (viene del servicio)
  listaRecetas$; 

  // Estado para los modales
  selectedReceta: RecetaModelo | null = null; // Modal de detalle
  votingReceta: RecetaModelo | null = null;   // Modal de votación
  tempRating: number = 0;                     // Puntuación temporal en el modal

  constructor(private recetaService: RecetaService) {
    this.listaRecetas$ = this.recetaService.getRecetas();
  }

  /**
   * Maneja el evento de borrado emitido por una tarjeta.
   * Solicita al servicio eliminar la receta y cierra modales si es necesario.
   */
  public handleDelete(recetaABorrar: RecetaModelo) {
    this.recetaService.deleteReceta(recetaABorrar);
    
    // Si la receta borrada estaba abierta en algún modal, lo cerramos
    if (this.selectedReceta?.titulo === recetaABorrar.titulo) {
      this.closeDetail();
    }
    if (this.votingReceta?.titulo === recetaABorrar.titulo) {
      this.closeVoteModal();
    }
  }

  // --- GESTIÓN DEL MODAL DE DETALLE ---

  public openDetail(receta: RecetaModelo) {
    this.selectedReceta = receta;
  }

  public closeDetail() {
    this.selectedReceta = null;
  }

  public getMedia(receta: RecetaModelo): number {
    if (!receta.votos || receta.votos === 0) return 0;
    return (receta.puntuacion || 0) / receta.votos;
  }

  // --- GESTIÓN DEL MODAL DE VOTACIÓN ---

  public openVoteModal(receta: RecetaModelo) {
    this.votingReceta = receta;
    this.tempRating = 0;
  }

  public closeVoteModal() {
    this.votingReceta = null;
    this.tempRating = 0;
  }

  public setTempRating(rating: number) {
    this.tempRating = rating;
  }

  /**
   * Envía el voto al servicio y cierra el modal.
   */
  public submitVote() {
    if (this.votingReceta && this.tempRating > 0) {
      this.recetaService.votarReceta(this.votingReceta, this.tempRating);
      this.closeVoteModal();
    }
  }

  /**
   * Fallback para imágenes rotas en el modal de detalle.
   */
  public handleImageError(event: any) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
  }
}