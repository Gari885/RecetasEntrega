import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetaComponent } from '../receta/receta.component';
import { FormularioRecetaComponent } from '../formulario-receta/formulario-receta.component';
@Component({
  selector: 'app-recetas',
  imports: [],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css',
})
export class RecetasComponent {
  // 🔹 Array con las recetas actuales (iniciales)
  recetas = [
    {
      nombre: 'Tortilla de patatas',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Tortilla_de_patatas.jpg',
      ingredientes: ['Patatas', 'Huevos', 'Cebolla', 'Aceite', 'Sal']
    },
    {
      nombre: 'Paella',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Paella-mixta.jpg',
      ingredientes: ['Arroz', 'Pollo', 'Conejo', 'Judías verdes', 'Azafrán', 'Aceite']
    },
    {
      nombre: 'Ensalada César',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Caesar_salad_%281%29.jpg',
      ingredientes: ['Lechuga', 'Pollo', 'Queso parmesano', 'Pan tostado', 'Salsa César']
    }
  ];

  // 🔹 Método para añadir una receta (lo emitirá el formulario)
  agregarReceta(nuevaReceta: any) {
    this.recetas.push(nuevaReceta);
  }

  // 🔹 Método para borrar receta
  borrarReceta(index: number) {
    this.recetas.splice(index, 1);
  }
}
