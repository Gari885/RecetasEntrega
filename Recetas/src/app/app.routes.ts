import { Routes } from '@angular/router';

// 1. Importamos los componentes de PÁGINA que has creado
import { Home } from './paginas/home/home';
import { NuevaReceta } from './paginas/nueva-receta/nueva-receta';

// 2. Definimos las rutas
export const routes: Routes = [
  {
    path: '', // La URL raíz (ej: http://localhost:4200/)
    component: Home // Muestra el componente Home
  },
  {
    path: 'nueva', // La URL (ej: http://localhost:4200/nueva)
    component: NuevaReceta // Muestra el componente de nueva receta
  },
  {
    path: '**', // Cualquier otra ruta que no exista
    redirectTo: '' // Redirige a la página principal
  }
];