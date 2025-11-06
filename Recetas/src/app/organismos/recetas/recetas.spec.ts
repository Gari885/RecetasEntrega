import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. IMPORTANTE: Para usar @for

// 2. RUTAS CORREGIDAS (sin '.component' al final)
// (Asumo que tus clases se llaman 'Receta' y 'FormularioReceta')
import { Receta } from '../../moleculas/receta/receta'; 
import { FormularioRecetas } from '../formulario-recetas/formulario-recetas';
// (Si tus clases se llaman 'RecetaComponent', etc., ajústalo aquí)

@Component({
  selector: 'app-recetas',
  standalone: true,
  // 3. AÑADE LOS 'imports'
  // CommonModule es para @for
  // Receta es para que <app-receta> funcione
  imports: [
    CommonModule, 
    Receta
    // No necesitas FormularioReceta aquí,
    // a menos que uses <app-formulario-receta> en el HTML de 'recetas'
  ], 
  templateUrl: './recetas.html',
  styleUrl: './recetas.css'
})
export class Recetas { // (o RecetasComponent, como se llame tu clase)
  
  // ... (Aquí irá tu lógica, el array de recetas, etc.)
  
  // (Este es el HTML que me has mostrado en el error)
  // <app-receta [receta]="receta" (eliminar)="borrarReceta(i)"></app-receta>
}
