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
      imagen: 'https://imgs.search.brave.com/xE0Il87ltADaZxeuZ3KBPQCxTwfgi-73dtd2U83ZPvU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMjA3MjQ5/NS83Mjc0L2kvNDUw/L2RlcG9zaXRwaG90/b3NfNzI3NDIxNzMt/c3RvY2stcGhvdG8t/c3BhbmlzaC1vbWVs/ZXR0ZS13aXRoLXBv/dGF0by1hbmQuanBn',
      ingredientes: ['Patatas', 'Huevos', 'Cebolla', 'Aceite', 'Sal']
    },
    {
      titulo: 'Paella Valenciana',
      imagen: 'https://imgs.search.brave.com/SeUMQCmEIacgVhjWKAMZ_Ity_72PZTOUfQiwGx62rTs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wYWVs/bGEtdmFsZW5jaWFu/YS1jb24tZWwtcG9s/bG8teS1lbC1jb25l/am8tOTAyODYxMTEu/anBn',
      ingredientes: ['Arroz', 'Pollo', 'Conejo', 'Judías Verdes', 'Garrofó']
    },
    {
      titulo: 'Gazpacho Andaluz',
      imagen: 'https://imgs.search.brave.com/xuRACp9mK0529rJf0jGb0YvRqIakdezphoInXWBBOi8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWct/Z2xvYmFsLmNwY2Ru/LmNvbS9yZWNpcGVz/L2I1YzUxYTBkNWEx/NWVhZmYvMjQweDMy/MGNxODAvcGhvdG8u/anBn',
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

  // En: src/app/servicios/receta.ts
// ... (justo después del método addReceta)

  // 5. Método PÚBLICO para BORRAR una receta
  public deleteReceta(recetaABorrar: RecetaModelo) {
    
    // Actualizamos la lista COMPLETA
    this.listaRecetas.update( (recetasActuales) => 
      // Devolvemos un nuevo array sin la receta
      recetasActuales.filter(receta => 
        receta.titulo !== recetaABorrar.titulo 
        // (Usamos el título como ID, asumiendo que es único)
      )
    );
  }

// ... (el resto del servicio)

  // El componente Recetas AHORA USA LA SEÑAL FILTRADA
// CÓDIGO CORRECTO
  public getRecetas() {
    return this.recetasFiltradas;
  }
}