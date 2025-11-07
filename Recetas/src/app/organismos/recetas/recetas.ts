// En: src/app/organismos/recetas/recetas.ts

import { Component } from '@angular/core';
// Importamos CommonModule para poder usar directivas como @for en el HTML
import { CommonModule } from '@angular/common';
// Importamos la "Molécula" (la tarjeta de receta) que este organismo va a renderizar
import { Receta } from '../../moleculas/receta/receta';
// Importamos el "cerebro" (el servicio) para pedirle los datos
import { RecetaService } from '../../servicios/receta';
// Importamos el "contrato" (el modelo) para saber la forma de los datos
import { RecetaModelo } from '../../modelos/receta.modelo'; 

/**
 * Componente "Organismo" (según Atomic Design).
 * Este es un componente "inteligente" (smart component).
 * Su responsabilidad principal es:
 * 1. Pedir la lista de recetas al RecetaService.
 * 2. Renderizar esa lista usando un bucle (@for) y la molécula <app-receta>.
 * 3. Escuchar los eventos de sus hijos (ej: el evento 'onDelete' de <app-receta>)
 * y reaccionar llamando al servicio.
 */
@Component({
  selector: 'app-recetas', // La etiqueta HTML: <app-recetas>
  standalone: true,
  // Imports necesarios para este componente:
  // - CommonModule: Para usar @for en el HTML.
  // - Receta: Para poder usar la etiqueta <app-receta> en el HTML.
  imports: [CommonModule, Receta],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css'
})
export class Recetas { 

  /**
   * Esta variable almacenará la "referencia" a la señal de recetas
   * que nos da el servicio.
   * La nombramos con un '$' al final por convención, para indicar
   * que es un stream de datos reactivo (Signal u Observable).
   * Su valor real se asigna en el constructor.
   */
  listaRecetas$; // El tipo (Signal<RecetaModelo[]>) se infiere automáticamente

  /**
   * Inyectamos el RecetaService (nuestro "almacén") en el constructor.
   * Angular se encarga de crear y pasarnos la instancia única (singleton)
   * del servicio.
   */
  constructor(private recetaService: RecetaService) {
    /**
     * Inmediatamente al crear el componente, pedimos al servicio
     * la lista de recetas (que en realidad es una señal 'computed').
     * Guardamos esa señal en nuestra variable local 'listaRecetas$'.
     * El HTML usará esta variable para pintarse.
     */
    this.listaRecetas$ = this.recetaService.getRecetas();
  }

  /**
   * Método "manejador" (handler) que escucha el evento (onDelete)
   * emitido por el componente hijo <app-receta>.
   * Se conecta en el HTML con: (onDelete)="handleDelete(receta)"
   * * [cite: source 375]
   */
  public handleDelete(recetaABorrar: RecetaModelo) {
    // Este componente no borra nada. Simplemente recibe la orden
    // y se la pasa al "cerebro" (el servicio), que es el
    // único que tiene permiso para modificar la lista de datos.
    this.recetaService.deleteReceta(recetaABorrar);
  }
}