// En: src/app/paginas/home/home.ts

import { Component } from '@angular/core';

// 1. Importamos los organismos (componentes "inteligentes") que esta página va a mostrar.
import { Recetas } from '../../organismos/recetas/recetas'; // (El listado de recetas)
import { FormularioRecetas } from '../../organismos/formulario-recetas/formulario-recetas'; // (El formulario de adición)

/**
 * Componente "Página" (según Atomic Design).
 * Es la vista principal de la aplicación.
 * Su única responsabilidad es actuar como un "contenedor" o "compositor" de diseño,
 * ensamblando varios Organismos para crear la interfaz completa.
 * Es cargado por el Router (en app.routes.ts) cuando el usuario visita la ruta "/".
 */
@Component({
  selector: 'app-home', // La etiqueta <app-home> que usa el Router
  standalone: true,  // Es un componente Standalone
  
  /**
   * (2) Imports clave.
   * Como este componente es Standalone y su HTML ('home.html') usa las
   * etiquetas <app-recetas> y <app-formulario-recetas>, es OBLIGATORIO
   * importarlas aquí.
   * Si no se importan, Angular dará un error diciendo que
   * "no conoce el elemento <app-recetas>".
   */
  imports: [
    Recetas,
    FormularioRecetas
  ],
  
  /**
   * El 'home.html' es el que define el layout (ej: "la lista a la izquierda,
   * el formulario a la derecha" con el grid de Bootstrap).
   */
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home { 
  
}