// En: src/app/organismos/formulario-recetas/formulario-recetas.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { 
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { RecetaService } from '../../servicios/receta';
import { RecetaModelo } from '../../modelos/receta.modelo';

/**
 * Componente encargado de la creación de nuevas recetas.
 * Utiliza Formularios Reactivos para validación y captura de datos.
 */
@Component({
  selector: 'app-formulario-recetas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-recetas.html',
  styleUrl: './formulario-recetas.css'
})
export class FormularioRecetas {

  constructor(
    private recetaService: RecetaService,
    private router: Router
  ) {}

  // Definición del formulario y sus validaciones
  public recetaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    imagen: new FormControl('', [Validators.required]), // Sin patrón regex para máxima flexibilidad
    ingredientes: new FormControl('', [Validators.required])
  });

  /**
   * Procesa el envío del formulario.
   * Transforma los datos y llama al servicio para guardar.
   */
  public onSubmit() {
    if (this.recetaForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const formValue = this.recetaForm.value;

    // Convertimos el string de ingredientes (multilínea) a un array
    const ingredientesArray = formValue.ingredientes!
                                .split('\n')
                                .filter(ing => ing.trim() !== '');

    const nuevaReceta: RecetaModelo = {
      titulo: formValue.titulo!,
      imagen: formValue.imagen!,
      ingredientes: ingredientesArray
    };

    this.recetaService.addReceta(nuevaReceta);

    // Redirigimos al inicio tras guardar
    this.router.navigate(['/']);
  }
}