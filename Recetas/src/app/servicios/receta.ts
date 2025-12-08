// En: src/app/servicios/receta.ts

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecetaModelo } from '../modelos/receta.modelo';
import { firstValueFrom } from 'rxjs';

/**
 * Servicio encargado de gestionar los datos de las recetas.
 * Se comunica con el Mock API para persistir la información.
 */
@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/recetas';

  // --- SEÑALES DE ESTADO ---
  
  // Almacena la lista completa de recetas traída del servidor.
  private listaRecetas = signal<RecetaModelo[]>([]);

  // Almacena el término de búsqueda actual.
  private terminoBusqueda = signal<string>('');

  // Almacena el filtro de valoración mínima.
  private filtroValoracion = signal<number>(0);

  constructor() {
    this.cargarRecetas();
  }

  /**
   * Obtiene las recetas del servidor y actualiza la señal local.
   */
  private async cargarRecetas() {
    try {
      const recetas = await firstValueFrom(this.http.get<RecetaModelo[]>(this.apiUrl));
      this.listaRecetas.set(recetas);
    } catch (error) {
      console.error('Error cargando recetas:', error);
    }
  }

  // --- LÓGICA REACTIVA ---

  /**
   * Señal computada que filtra las recetas automáticamente cuando
   * cambia la lista, el término de búsqueda o el filtro de valoración.
   */
  private recetasFiltradas = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase();
    const recetas = this.listaRecetas();
    const minValoracion = this.filtroValoracion();

    return recetas.filter(receta => {
      // Filtrado por texto (título o ingredientes)
      const matchTitulo = receta.titulo?.toLowerCase().includes(termino) ?? false;
      const matchIngredientes = receta.ingredientes?.some(
        ing => ing?.toLowerCase().includes(termino)
      ) ?? false;
      
      const matchTexto = termino === '' || matchTitulo || matchIngredientes;

      // Filtrado por valoración media
      const media = (receta.votos && receta.votos > 0) 
        ? (receta.puntuacion || 0) / receta.votos 
        : 0;
      
      const matchValoracion = media >= minValoracion;

      return matchTexto && matchValoracion;
    });
  });

  // --- MÉTODOS PÚBLICOS ---

  public buscarReceta(termino: string) {
    this.terminoBusqueda.set(termino);
  }

  public setFiltroValoracion(minEstrellas: number) {
    this.filtroValoracion.set(minEstrellas);
  }

  public getFiltroValoracion() {
    return this.filtroValoracion;
  }

  /**
   * Añade una nueva receta al servidor y recarga la lista.
   */
  public async addReceta(nuevaReceta: RecetaModelo) {
    const recetaConVotos = {
      ...nuevaReceta,
      votos: 0,
      puntuacion: 0,
      personas: nuevaReceta.personas || 4
    };

    try {
      await firstValueFrom(this.http.post<RecetaModelo>(this.apiUrl, recetaConVotos));
      await this.cargarRecetas();
    } catch (error) {
      console.error('Error añadiendo receta:', error);
    }
  }

  /**
   * Actualiza los votos y puntuación de una receta en el servidor.
   */
  public async votarReceta(recetaVotada: RecetaModelo, valoracion: number) {
    if (!recetaVotada.id) return;

    const nuevosVotos = (recetaVotada.votos || 0) + 1;
    const nuevaPuntuacion = (recetaVotada.puntuacion || 0) + valoracion;

    try {
      await firstValueFrom(this.http.patch(`${this.apiUrl}/${recetaVotada.id}`, {
        votos: nuevosVotos,
        puntuacion: nuevaPuntuacion
      }));
      await this.cargarRecetas();
    } catch (error) {
      console.error('Error votando receta:', error);
    }
  }

  public async deleteReceta(recetaABorrar: RecetaModelo) {
    if (!recetaABorrar.id) return;

    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${recetaABorrar.id}`));
      await this.cargarRecetas();
    } catch (error) {
      console.error('Error borrando receta:', error);
    }
  }

  public getRecetas() {
    return this.recetasFiltradas;
  }
}