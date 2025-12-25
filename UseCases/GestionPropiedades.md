Caso de Uso: Gestión de Propiedades Inmobiliarias

1. Descripción
Funcionalidad central que permite a los agentes inmobiliarios administrar su catálogo de propiedades. Incluye la creación, visualización, edición y eliminación de inmuebles, así como la gestión de su ubicación geográfica, precios, características técnicas y material visual (imágenes).

2. Flujo de Usuario
Entrada: Datos del inmueble (título, descripción, precio, dirección, fotos).
Proceso: 
- Listado: Se recuperan las propiedades paginadas mediante `PropertyService`.
- Creación/Edición: Se utiliza un formulario dividido en secciones (Location, Prices, Characteristics, Descriptions).
- Localización: Al ingresar la dirección, el sistema calcula las coordenadas y actualiza un mapa interactivo.
- Galería: Subida de múltiples imágenes que se asocian a la propiedad.
Salida: Propiedad guardada en la base de datos y visible en el listado general con sus estados actualizados (Disponible, Alquilado, Vendido).

3. Stack Tecnológico Aplicado
UI: `TanStack Table` para listados, `Card` de Shadcn UI, `Lucide React` para iconos, `Next Dynamic` para carga de mapas (Leaflet).
Lógica: `usePropertyForm` para la gestión del estado del formulario, `react-hook-form` con validación Zod.
Comunicación: `PropertyService` consumiendo endpoints como `/api/properties`, `/api/images/property/{id}` y `/api/properties/stats`.

4. Reglas de Negocio
- La operación puede ser 'Venta' o 'Alquiler'.
- Las coordenadas (latitud/longitud) se sincronizan automáticamente al cambiar la dirección (calle, número, ciudad).
- Gestión de estados: Una propiedad puede marcarse como no disponible.
- Las imágenes se suben de forma independiente y se pueden eliminar individualmente.
