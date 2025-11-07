// En: src/app/servicios/receta.ts

// Importamos 'computed' y 'signal' de Angular para la reactividad,
// e 'Injectable' para definirlo como un Servicio.
import { Injectable, signal, computed } from '@angular/core';
// Importamos el "plano" de nuestros datos
import { RecetaModelo } from '../modelos/receta.modelo';

/**
 * Servicio de Angular (nuestro "cerebro" o "almacén").
 * * @Injectable({ providedIn: 'root' }) significa que Angular
 * crea UNA SOLA INSTANCIA de este servicio (un Singleton) y
 * la comparte con TODOS los componentes que la pidan.
 * * Es la "Única Fuente de la Verdad" para los datos de las recetas.
 * [cite: source 715, 716]
 */
@Injectable({
  providedIn: 'root'
})
export class RecetaService { // (o 'Receta')

  // --- 1. SEÑAL DE DATOS MAESTRA ---
  
  // Datos de ejemplo para que la app no empiece vacía.
  // Es 'private' porque ningún componente debe poder acceder a ella.
  private recetasIniciales: RecetaModelo[] = [
    {
      titulo: 'Tortilla de Patatas',
      imagen: 'https://imgs.search.brave.com/xE0Il87ltADaZxeuZ3KBPQCxTwfgi-73dtd2U83ZPvU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMjA3MjQ5/NS83Mjc0L2kvNDUw/L2RlcG9zaXRwaG90/b3NfNzI3NDIxNzMt/c3RvY2stcGhvdG8t/c3BhbmlzaC1vbWVs/ZXR0ZS13aXRoLXBv/dGF0by1hbmQuanBn',
      ingredientes: ['Patatas', 'Huevos', 'Cebolla', 'Aceite', 'Sal']
    },
    {
      titulo: 'Paella Valenciana',
      imagen: 'https://imgs.search.brave.com/SeUMQCmEIacgVhjWKAMZ_Ity_72PZTOUfQiwGx62rTs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wYWVs/bGEtdmFsZW5jaWFu/YS1jb24tZWwtcG9s/bG8teS1lbC1jb25l/am8tOTAyODYxMTEu/anBn',
      ingredientes: ['Arroz', 'Pollo', 'Conejo', 'Judías Verdes', 'Garrofó']
    },
    {
      titulo: 'Gazpacho Andaluz',
      imagen: 'https://imgs.search.brave.com/xuRACp9mK0529rJf0jGb0YvRqIakdezphoInXWBBOi8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWct/Z2xvYmFsLmNwY2Ru/LmNvbS9yZWNpcGVz/L2I1MGMxYTBkNWEx/NWVhZmYvMjQweDMy/MGNxODAvcGhvdG8u/anBn',
      ingredientes: ['Tomate', 'Pepino', 'Pimiento', 'Ajo', 'Aceite']
    }
  ];
  
  /**
   * (Esta señal guarda la lista COMPLETA y es privada)
   * Es la "fuente de la verdad".
   * Cualquier cambio (Añadir/Borrar) se hace AQUÍ.
   */
  private listaRecetas = signal<RecetaModelo[]>(this.recetasIniciales);

  // --- 2. SEÑAL PARA EL BUSCADOR ---
  
  /**
   * (Esta señal guarda el texto que el usuario escribe en el Navbar)
   * Es 'private' porque el Navbar no debe cambiarla directamente,
   * sino a través de un método público (buscarReceta).
   */
  private terminoBusqueda = signal<string>('');

  // --- 3. SEÑAL CALCULADA (COMPUTED) ---
  
  /**
   * (¡LA MAGIA!) Esta señal 'computed' "escucha" a las otras dos:
   * 'listaRecetas' y 'terminoBusqueda'.
   * * Si CUALQUIERA de las dos cambia, esta señal se recalcula
   * automáticamente y notifica a cualquier componente que la esté usando.
   * Es de "solo lectura" por naturaleza.
   */
  private recetasFiltradas = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase(); // Lee el valor de la señal
    const recetas = this.listaRecetas(); // Lee el valor de la señal

    // Si el buscador está vacío, devuelve la lista completa
    if (termino === '') {
      return recetas;
    }

    // Si hay un término, filtra
    // (FIX: Usamos '?.' (optional chaining) y '?? false'
    // para evitar errores si 'titulo' o 'ingredientes' son nulos)
    return recetas.filter(receta => {
      // Comprobación segura del título
      const matchTitulo = receta.titulo?.toLowerCase().includes(termino) ?? false;
      // Comprobación segura de los ingredientes
      const matchIngredientes = receta.ingredientes?.some(
        ing => ing?.toLowerCase().includes(termino)
      ) ?? false;
      
      return matchTitulo || matchIngredientes;
    });
  });


  // --- 4. MÉTODOS PÚBLICOS (La API del servicio) ---
  // Estos son los únicos métodos que los componentes pueden llamar.

  /**
   * Método público llamado por el 'NavbarComponent'.
   * Su único trabajo es actualizar la señal 'terminoBusqueda'.
   */
  public buscarReceta(termino: string) {
    this.terminoBusqueda.set(termino);
  }

  /**
   * Método público llamado por el 'FormularioRecetasComponent'.
   * Su único trabajo es añadir la nueva receta a la señal
   * MAESTRA 'listaRecetas'.
   */
  public addReceta(nuevaReceta: RecetaModelo) {
    // .update() nos da el valor actual (recetasActuales)
    // y espera que devolvamos el nuevo valor
    this.listaRecetas.update(recetasActuales => [
      ...recetasActuales, // Devuelve todas las recetas antiguas...
      nuevaReceta         // ...más la nueva.
    ]);
  }

  /**
   * Método público llamado por el 'RecetasComponent' (el organismo).
   * Su único trabajo es eliminar una receta de la señal
   * MAESTRA 'listaRecetas'.
   */
  public deleteReceta(recetaABorrar: RecetaModelo) {
    this.listaRecetas.update( (recetasActuales) => 
      // Devolvemos un nuevo array filtrado (sin la receta a borrar)
      recetasActuales.filter(receta => 
        // Usamos el título como ID (asumiendo que es único)
        receta.titulo !== recetaABorrar.titulo 
      )
    );
  }

  /**
   * Método público llamado por el 'RecetasComponent'.
   * Es el único método de "lectura".
   * * NO DEVUELVE LA LISTA MAESTRA.
   * Devuelve la señal CALCULADA 'recetasFiltradas'.
   * * Así, el componente que llame a 'getRecetas()' siempre
   * recibirá la lista filtrada más actualizada.
   */
  public getRecetas() {
    // 'recetasFiltradas' ya es de solo lectura por ser 'computed'
    return this.recetasFiltradas;
  }
}