// En: src/app/paginas/home/home.ts

import { Component } from '@angular/core';

// 1. Importa tu organismo
import { Recetas } from '../../organismos/recetas/recetas'; // (O 'RecetasComponent' si lo llamaste así)

@Component({
  selector: 'app-home',
  standalone: true,
  // 2. Añádelo a los imports
  imports: [Recetas],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home { // (o 'HomeComponent')
  // ...
}