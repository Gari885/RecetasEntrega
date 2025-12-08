# Proyecto Recetas - Angular + Atomic Design

Este proyecto es una aplicación de gestión de recetas desarrollada en **Angular** siguiendo la metodología de **Atomic Design**. Permite visualizar, añadir, filtrar, votar y eliminar recetas, persistiendo los datos en un **Mock API** local.

## Arquitectura del Proyecto

La solución está estructurada en componentes reutilizables y servicios para la gestión del estado.

### Atomic Design
La interfaz de usuario se divide en:

*   **Moléculas (`src/app/moleculas`)**:
    *   `Receta`: Componente "tonto" (dumb component) que representa una tarjeta individual. Recibe datos (`@Input`) y emite eventos (`@Output`) como borrar o votar. Incluye lógica de fallback para imágenes rotas.
    *   `Rating`: Componente reutilizable para mostrar y seleccionar estrellas de valoración.

*   **Organismos (`src/app/organismos`)**:
    *   `Recetas`: Componente "inteligente" (smart component) que orquesta la lista de recetas. Se comunica con el servicio, maneja los modales (detalle y votación) y la lógica de negocio de la vista.
    *   `FormularioRecetas`: Gestiona la creación de nuevas recetas mediante **Reactive Forms**, validando los inputs antes de enviarlos al servicio.
    *   `Navbar`: Barra de navegación que contiene el buscador y el filtro por valoración.

### Gestión de Estado (Servicios)
*   **`RecetaService` (`src/app/servicios/receta.ts`)**:
    *   Actúa como la "única fuente de la verdad".
    *   Utiliza **Angular Signals** (`signal`, `computed`) para la reactividad.
    *   Se comunica con el backend mediante `HttpClient`.
    *   Gestiona la lógica de filtrado (por texto y valoración) de forma centralizada.

---

## Gestión de Imágenes

Uno de los desafíos comunes al trabajar con URLs externas es que los enlaces pueden romperse o estar protegidos contra *hotlinking* (uso directo en otras webs).

**Solución Implementada:**
Hemos implementado un sistema de **Fallback Automático**:
1.  La aplicación intenta cargar la imagen proporcionada por el usuario.
2.  Si el navegador detecta un error de carga (evento `error` en la etiqueta `<img>`), se dispara el método `handleImageError`.
3.  Este método sustituye automáticamente la fuente de la imagen (`src`) por un placeholder ("No Image Available").

Esto asegura que la interfaz nunca se rompa visualmente, incluso si el usuario introduce una URL inválida o si la imagen original es eliminada.

---

## Cómo Ejecutar el Proyecto

Este proyecto requiere dos terminales funcionando simultáneamente: una para el servidor de datos (Mock API) y otra para la aplicación Angular.

### Paso 1: Iniciar el Mock Server (Backend)
El servidor simula una API REST real y guarda los datos en `mock-server/db.json`.

```bash
cd mock-server
npm install  # Solo la primera vez
npm start
```
*El servidor correrá en: `http://localhost:3000`*

### Paso 2: Iniciar la Aplicación Angular (Frontend)

```bash
ng serve
```
*La aplicación correrá en: `http://localhost:4200`*

---

## Tecnologías Usadas
*   **Angular 18+** (Standalone Components, Signals)
*   **Bootstrap 5** (Estilos y Layout)
*   **Bootstrap Icons** (Iconografía)
*   **Express.js** (Mock Backend)
*   **Reactive Forms** (Validación de formularios)