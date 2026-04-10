# Guía APE #2

## Prototipo UI/UX

El diseño toma como base la pantalla de catálogo creada en la carpeta `figma`. Se priorizó una jerarquía clara con título principal, filtros visibles, tarjetas de producto y un panel de detalle. La interfaz usa alto contraste, textos descriptivos y `alt` en imágenes para reforzar accesibilidad.

## Organización del frontend

La aplicación se separa en tres capas principales:

1. `components/` para piezas reutilizables como encabezado, pie y lista de tareas.
2. `pages/` para cada ruta visible del sistema.
3. `services/` para centralizar datos simulados y evitar duplicación.

El flujo comienza en `AppComponent`, que carga las rutas con el router. Cada página compone su vista con los componentes compartidos y consume datos desde el servicio.

## Decisiones de diseño

- Se mantuvo una estética sobria, con fondos claros y tarjetas elevadas para imitar el estilo del prototipo.
- La navegación se redujo a dos rutas principales para que el recorrido sea directo.
- La lista de tareas se añadió como bloque funcional para demostrar manejo de estado y eventos.
- El layout es mobile-first y se adapta con media queries para móvil, tablet y escritorio.