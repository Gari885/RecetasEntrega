// En: src/app/organismos/formulario-recetas/formulario-recetas.ts

import { Component } from '@angular/core';
// Router se usa para poder navegar a otra página (en este caso, volver al inicio)
import { Router } from '@angular/router'; 

// Importaciones clave para usar Formularios Reactivos [cite: source 551, 553, 555, 561, 624]
import { 
  ReactiveFormsModule, // El módulo principal para formularios reactivos
  FormGroup,           // Representa el formulario completo
  FormControl,         // Representa un campo (input, textarea) individual
  Validators           // Contiene las reglas de validación (required, minLength, etc.)
} from '@angular/forms';

// Importamos el "cerebro" (servicio) y la "plantilla" (modelo)
import { RecetaService } from '../../servicios/receta';
import { RecetaModelo } from '../../modelos/receta.modelo';

/**
 * Componente "Organismo" (según Atomic Design).
 * Este es un componente "inteligente" (smart component).
 * Contiene la lógica para añadir una nueva receta.
 * Se comunica directamente con el RecetaService.
 */
@Component({
  selector: 'app-formulario-recetas',
  standalone: true,
  // Para que <form [formGroup]="..."> funcione, este componente
  // Standalone debe importar ReactiveFormsModule [cite: source 561, 575]
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-recetas.html',
  styleUrl: './formulario-recetas.css'
})
export class FormularioRecetas { // (o como se llame tu clase)

  // 5. Inyectamos el Servicio (para guardar datos) y el Router (para navegar)
  //    Esto se llama Inyección de Dependencias (DI).
  constructor(
    private recetaService: RecetaService,
    private router: Router
  ) {}

  /**
   * (6) Define la estructura de nuestro formulario [cite: source 632].
   * 'recetaForm' es un FormGroup que agrupa varios FormControl.
   * Cada FormControl se enlaza a un input en el HTML mediante 'formControlName'.
   */
  public recetaForm = new FormGroup({
    // El campo 'titulo' es un string, empieza vacío ('')
    // y tiene dos validadores: es obligatorio y debe tener al menos 3 caracteres.
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    
    // El campo 'imagen' es obligatorio y debe cumplir con un patrón
    // de expresión regular (debe parecer una URL)
    imagen: new FormControl('', [Validators.required, Validators.pattern('https?://.*')]),
    
    // El campo 'ingredientes' es obligatorio. Recibirá un string largo.
    ingredientes: new FormControl('', [Validators.required])
  });

  /**
   * (7) Método que se ejecuta cuando el formulario se envía
   * (enlazado en el HTML con (ngSubmit)="onSubmit()").
   * [cite: source 646]
   */
  public onSubmit() {
    // Si el formulario no ha pasado las reglas de validación, paramos aquí.
    if (this.recetaForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    // 8. Recogemos los valores crudos del formulario.
    //    Usamos '!' para decirle a TypeScript: "confía en mí, sé que estos valores existen".
    const formValue = this.recetaForm.value;

    /**
     * (9) Transformación de Datos.
     * El textarea de 'ingredientes' nos da un solo string (ej: "Patatas\nHuevos").
     * Necesitamos convertirlo en un array (ej: ["Patatas", "Huevos"])
     * para que coincida con nuestro RecetaModelo.
     */
    const ingredientesArray = formValue.ingredientes!
                                .split('\n') // Divide el string por cada salto de línea
                                .filter(ing => ing.trim() !== ''); // Quita líneas vacías

    // 10. Creamos el objeto RecetaModelo limpio
    const nuevaReceta: RecetaModelo = {
      titulo: formValue.titulo!,
      imagen: formValue.imagen!,
      ingredientes: ingredientesArray
    };

    // 11. Enviamos el objeto final al servicio (el "almacén")
    this.recetaService.addReceta(nuevaReceta);

    /**
     * (12) (Opcional pero recomendado) Feedback al usuario.
     * Una vez añadida la receta, redirigimos al usuario de vuelta
     * a la página principal ('/') para que vea su nueva receta en la lista.
     */
    this.router.navigate(['/']);
    
    // (Opcional) También podríamos limpiar el formulario
    // this.recetaForm.reset();
  }
}