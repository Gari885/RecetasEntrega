// En: src/app/modelos/receta.model.ts

/**
 * Define la estructura de datos para una Receta.
 * Usamos una "interface" de TypeScript en lugar de una "class"
 * porque solo necesitamos definir la "forma" de los datos (tipado),
 * no necesitamos crear instancias con lógica o métodos.
 */
export interface RecetaModelo {
  
  /**
   * El nombre principal de la receta.
   * Se usará como título en la tarjeta (card) y para la búsqueda.
   */
  titulo: string;

  /**
   * La URL completa (ej: https://...) de la imagen de la receta.
   * El navegador la usará para mostrar la foto.
   */
  imagen: string; 

  /**
   * Una lista (array) de strings.
   * Cada string en el array representa un ingrediente individual.
   */
  ingredientes: string[];
}