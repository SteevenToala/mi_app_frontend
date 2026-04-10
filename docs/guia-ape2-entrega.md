# GUIA APE #2 - Evidencia técnica

## Parte 1. Prototipo UI/UX con accesibilidad

- Se tomó como base el prototipo de catálogo ubicado en `figma/`.
- Decisiones UI/UX aplicadas:
  - Jerarquía visual con encabezado, filtros, listado y detalle.
  - Consistencia visual en tarjetas, botones y espaciados.
  - Usabilidad con búsqueda, filtros por categoría y detalle contextual.
- Accesibilidad aplicada:
  - Contraste alto entre texto y fondo.
  - Imágenes con atributo `alt`.
  - Uso correcto de encabezados (`h1`, `h2`, `h3`) en páginas y secciones.

## Parte 2. Estructuración del proyecto frontend

- Proyecto: `mi_app_frontend`.
- Organización principal:
  - `src/app/components/`: componentes reutilizables (`header`, `footer`, `task-list`).
  - `src/app/services/`: servicios de datos (`mock-data.service.ts`).
  - `src/app/pages/`: pantallas de la app (`inicio`, `contacto`).

### Flujo frontend (resumen)

1. El router carga páginas por ruta (`/inicio`, `/contacto`).
2. Cada página compone su interfaz usando componentes compartidos.
3. El servicio centraliza datos simulados y los expone a las páginas.
4. Los eventos de usuario actualizan estado local y refrescan la interfaz en tiempo real.

## Parte 3. Componentes, rutas y servicios

- Componentes creados: `Header` y `Footer`.
- Rutas activas:
  - `/inicio`
  - `/contacto`
- Servicio simulado implementado:
  - `MockDataService` con productos y contactos en formato JSON.

## Parte 4. Manejo de estados y eventos

- Componente `TaskList` implementa:
  - Agregar tareas por formulario.
  - Cambiar estado pendiente/completada.
  - Eliminar tareas.
- La interfaz se actualiza dinámicamente según el estado de la lista.

## Parte 5. Diseño responsivo

- Se usaron media queries en los estilos de páginas/componentes.
- Comportamiento adaptativo en:
  - Celular
  - Tablet
  - Escritorio
- En tablet/celular, el detalle de producto se muestra como modal para mejorar lectura.

## Pendiente para entrega final del informe

- Agregar capturas de:
  - Estructura de carpetas.
  - Rutas `/inicio` y `/contacto` funcionando.
  - Interacción de lista de tareas.
  - Vistas responsive en 3 resoluciones.
- Adjuntar export del prototipo Figma.