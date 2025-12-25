# Plan de Implementación: Sidebar Colapsable

Este documento detalla los pasos para añadir la funcionalidad de contraer y extender el sidebar en el CRM, mejorando la gestión del espacio de trabajo.

## 🛠️ Tecnologías a utilizar
- **Zustand**: Gestión de estado global.
- **Framer Motion**: Animaciones fluidas para la transición de ancho.
- **Lucide React**: Iconografía para el botón de control.
- **Tailwind CSS**: Estilizado dinámico.

---

## 📋 Pasos a seguir

### 1. Creación del Store de Estado
Crearemos un store centralizado para que cualquier componente (Sidebar, Header, Layout) pueda conocer y modificar el estado del sidebar.

- **Archivo**: `src/stores/use-sidebar-store.ts`
- **Responsabilidad**: Mantener el booleano `isCollapsed` y la función `toggleSidebar`.

### 2. Creación del Botón de Control (Trigger)
Diseñaremos un componente de botón reutilizable que servirá para conmutar el estado.

- **Archivo**: `src/components/layouts/crm/sidebar-toggle.tsx`
- **Detalle**: Un botón que rote 180 grados o cambie de icono según el estado, situado preferiblemente en la parte superior del sidebar o en el header.

### 3. Refactorización de `SidebarExtended`
Modificaremos el componente actual para que reaccione al estado global.

- **Archivo**: `src/components/layouts/crm/sidebar-extended/sidebar-extended.tsx`
- **Cambios**:
  - Consumir `isCollapsed` desde el store.
  - Ocultar condicionalmente los textos de los enlaces (`Dashboard`, `Properties`, etc.).
  - Ajustar los paddings y anchos de los contenedores para centrar los iconos cuando esté contraído.
  - Añadir `AnimatePresence` o `motion.span` para una desaparición suave del texto.

### 4. Ajuste del Layout Principal
El contenedor que define las columnas de la aplicación debe ajustar su ancho dinámicamente.

- **Archivo**: `src/components/layouts/crm/crm-layout.tsx`
- **Cambios**: 
  - Ajustar la clase de ancho del aside (ej: de `w-64` a `w-20` o similar).
  - Asegurar que el contenido principal (`main`) se expanda para llenar el espacio sobrante.

---

## 🚀 Próximos Pasos

1.  **Generar el Store**: Definir la interfaz y el hook de Zustand.
2.  **Modificar el Layout**: Preparar el contenedor para recibir anchos variables.
3.  **Actualizar UI**: Aplicar los cambios visuales en los enlaces del Sidebar.
