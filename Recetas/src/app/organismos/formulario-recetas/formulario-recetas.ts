// En: src/app/organismos/formulario-recetas/formulario-recetas.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 1. Para redirigir al final

// 2. ¡Importaciones clave para Reactive Forms!
import { 
  ReactiveFormsModule, 
  FormGroup, 
  FormControl, 
  Validators 
} from '@angular/forms';

// 3. Importamos el servicio y el modelo
import { RecetaService } from '../../servicios/receta';
import { RecetaModelo } from '../../modelos/receta.modelo';

@Component({
  selector: 'app-formulario-recetas',
  standalone: true,
  // 4. Añadimos ReactiveFormsModule a los imports
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-recetas.html',
  styleUrl: './formulario-recetas.css'
})
export class FormularioRecetas { // (o como se llame tu clase)

  // 5. Inyectamos el Servicio y el Router
  constructor(
    private recetaService: RecetaService,
    private router: Router
  ) {}

  // 6. Definimos el FormGroup
  //    (Para los ingredientes, usaremos un textarea)
  public recetaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    imagen: new FormControl('', [Validators.required, Validators.pattern('https?://.*')]),
    ingredientes: new FormControl('', [Validators.required])
  });

  // 7. Método que se llama al enviar el formulario
  public onSubmit() {
    // Si el formulario no es válido, no hacemos nada
    if (this.recetaForm.invalid) {
      return;
    }

    // 8. Recogemos los valores (con un '!' para decirle a TS que confiamos)
    const formValue = this.recetaForm.value;

    // 9. Convertimos el string de ingredientes en un array
    const ingredientesArray = formValue.ingredientes!
                                .split('\n')
                                .filter(ing => ing.trim() !== ''); // Filtra líneas vacías

    // 10. Creamos el objeto RecetaModel
    const nuevaReceta: RecetaModelo = {
      titulo: formValue.titulo!,
      imagen: formValue.imagen!,
      ingredientes: ingredientesArray
    };

    // 11. Usamos el servicio para añadir la receta
    this.recetaService.addReceta(nuevaReceta);

    // 12. (Opcional) Redirigimos al usuario a la página de inicio
    this.router.navigate(['/']);
  }
}