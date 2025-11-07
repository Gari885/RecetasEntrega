// En: src/app/servicios/receta.ts

// 1. Importa 'computed' además de 'signal'
import { Injectable, signal, computed } from '@angular/core';
import { RecetaModelo } from '../modelos/receta.modelo';

@Injectable({
  providedIn: 'root'
})
export class RecetaService { // (o 'Receta')

  // --- 1. SEÑAL DE DATOS MAESTRA ---
  // (La lista original, la "fuente de la verdad")
  private recetasIniciales: RecetaModelo[] = [
    {
      titulo: 'Tortilla de Patatas',
      imagen: 'https://via.placeholder.com/300x200.png?text=Tortilla',
      ingredientes: ['Patatas', 'Huevos', 'Cebolla', 'Aceite', 'Sal']
    },
    {
      titulo: 'Paella Valenciana',
      imagen: 'https://via.placeholder.com/300x200.png?text=Paella',
      ingredientes: ['Arroz', 'Pollo', 'Conejo', 'Judías Verdes', 'Garrofó']
    },
    {
      titulo: 'Gazpacho Andaluz',
      imagen: 'https://via.placeholder.com/300x200.png?text=Gazpacho',
      ingredientes: ['Tomate', 'Pepino', 'Pimiento', 'Ajo', 'Aceite']
    }
  ];
  
  // (Esta señal guarda la lista COMPLETA y es privada)
  private listaRecetas = signal<RecetaModelo[]>(this.recetasIniciales);

  // --- 2. SEÑAL PARA EL BUSCADOR ---
  // (Esta señal guarda el texto que el usuario escribe)
  private terminoBusqueda = signal<string>('');

  // --- 3. SEÑAL CALCULADA (COMPUTED) ---
  // (¡LA MAGIA!) Esta señal "escucha" a las otras dos
  // y se recalcula automáticamente cuando cambian.
  private recetasFiltradas = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase();
    const recetas = this.listaRecetas();

    if (termino === '') {
      return recetas; // Si no hay búsqueda, devuelve todo
    }

    // Filtra por título O por ingredientes
    return recetas.filter(receta => 
      receta.titulo.toLowerCase().includes(termino) ||
      receta.ingredientes.some(ing => ing.toLowerCase().includes(termino))
    );
  });


  // --- 4. MÉTODOS PÚBLICOS (API del servicio) ---

  // El Navbar llama a este método
  public buscarReceta(termino: string) {
    this.terminoBusqueda.set(termino);
  }

  // El Formulario llama a este método
  public addReceta(nuevaReceta: RecetaModelo) {
    this.listaRecetas.update(recetasActuales => [
      ...recetasActuales,
      nuevaReceta
    ]);
  }

  // El componente Recetas AHORA USA LA SEÑAL FILTRADA
// CÓDIGO CORRECTO
  public getRecetas() {
    return this.recetasFiltradas;
  }
}