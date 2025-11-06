import { Routes } from '@angular/router';

// 1. Importamos los componentes de PÁGINA que has creado
import { HomeComponent } from './paginas/home/home.component';
import { NuevaRecetaComponent } from './paginas/nueva-receta/nueva-receta.component';

// 2. Definimos las rutas
export const routes: Routes = [
  {
    path: '', // La URL raíz (ej: http://localhost:4200/)
    component: HomeComponent // Muestra el componente Home
  },
  {
    path: 'nueva', // La URL (ej: http://localhost:4200/nueva)
    component: NuevaRecetaComponent // Muestra el componente de nueva receta
  },
  {
    path: '**', // Cualquier otra ruta que no exista
    redirectTo: '' // Redirige a la página principal
  }
];