// En: src/app/paginas/home/home.ts

import { Component } from '@angular/core';

// 1. Importa AMBOS organismos
import { Recetas } from '../../organismos/recetas/recetas'; // (o RecetasComponent)
import { FormularioRecetas } from '../../organismos/formulario-recetas/formulario-recetas'; // (o FormularioRecetasComponent)

@Component({
  selector: 'app-home',
  standalone: true,
  // 2. Añade AMBOS a los imports
  imports: [
    Recetas,
    FormularioRecetas
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home { // (o HomeComponent)
  // ...
}