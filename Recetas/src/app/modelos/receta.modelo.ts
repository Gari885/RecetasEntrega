// En: src/app/modelos/receta.model.ts

/**
 * Interfaz que define la estructura de datos de una Receta.
 */
export interface RecetaModelo {
  
  // ID opcional generado por la API
  id?: string;

  titulo: string;
  imagen: string; 
  ingredientes: string[];

  // Datos de valoración
  votos?: number;
  puntuacion?: number;

  // Número de comensales
  personas?: number;
}