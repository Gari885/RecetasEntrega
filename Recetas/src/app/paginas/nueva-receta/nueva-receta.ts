// En: src/app/paginas/nueva-receta/nueva-receta.ts

import { Component } from '@angular/core';

// 1. Importa tu organismo de formulario
import { FormularioRecetas } from '../../organismos/formulario-recetas/formulario-recetas'; // (O 'FormularioRecetasComponent')

@Component({
  selector: 'app-nueva-receta',
  standalone: true,
  // 2. Añádelo a los imports
  imports: [FormularioRecetas],
  templateUrl: './nueva-receta.html',
  styleUrl: './nueva-receta.css'
})
export class NuevaReceta { // (o 'NuevaRecetaComponent')
  // ...
}
