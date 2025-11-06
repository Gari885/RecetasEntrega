import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 1. Importa RouterOutlet
import { Navbar } from "./organismos/navbar/navbar";

@Component({
  selector: 'app-root',
  standalone: true, // 2. ¡AÑADE ESTA LÍNEA!
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    Navbar,
    RouterOutlet // 3. Añade RouterOutlet aquí
  ]
})
export class App {
  protected readonly title = signal('Recetas');
}
