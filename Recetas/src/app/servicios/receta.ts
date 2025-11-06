// En: src/app/servicios/receta.service.ts

import { Injectable, signal } from '@angular/core';
import { RecetaModelo } from '../modelos/receta.modelo';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  // 1. Un array de ejemplo para empezar
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
    }
  ];

  // 2. Usamos 'signal' para la lista. ¡Esto es la clave!
  // 'signal' hace que la lista sea reactiva.
  private listaRecetas = signal<RecetaModelo[]>(this.recetasIniciales);

  // 3. Método PÚBLICO para que los componentes LEAN la lista
  // Devuelve la señal como "solo lectura" (Readonly)
  public getRecetas() {
    return this.listaRecetas.asReadonly();
  }

  // 4. Método PÚBLICO para AÑADIR una nueva receta
  public addReceta(nuevaReceta: RecetaModelo) {
    // 'update' coge el valor actual y devuelve el nuevo valor
    this.listaRecetas.update( (recetasActuales) => [
      ...recetasActuales, // ...todas las recetas que ya había
      nuevaReceta         // ...y la nueva
    ]);
  }

  // (Más adelante añadiremos un método para borrar)
}