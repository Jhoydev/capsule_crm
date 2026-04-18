# Modulo de Propiedades

## Objetivo

Permite listar, crear, visualizar, editar, eliminar e importar propiedades inmobiliarias. Es uno de los módulos más completos y centrales del CRM.

## Rutas principales

- `src/app/(app)/properties/page.tsx`
- `src/app/(app)/properties/create/page.tsx`
- `src/app/(app)/properties/[id]/page.tsx`
- `src/app/(app)/properties/new/page.tsx`

## Capacidades del módulo

- Listado de propiedades con tabla.
- Alta manual de propiedades.
- Edición por secciones.
- Visualización detallada.
- Eliminación.
- Importación por archivo CSV.
- Gestión de imágenes.
- Visualización geográfica mediante mapa.
- Métricas de tipos y estados desde servicios.

## Componentes y piezas clave

### Página de listado

- `src/app/(app)/properties/page.tsx`
  - Renderiza breadcrumbs.
  - Expone acción de importación mediante diálogo.
  - Enlaza a creación de nueva propiedad.
  - Muestra `PropertiesTable`.

### Detalle y edición

- `src/app/(app)/properties/[id]/page.tsx`
  - Carga la propiedad actual.
  - Alterna entre modo lectura y edición.
- `src/app/(app)/properties/[id]/print/page.tsx`
  - Vista dedicada para la ficha comercial imprimible.
  - Construye un `PropertyPrintSheetViewModel` desde la propiedad actual.
  - Incluye un modo de stress test mediante `ENABLE_PRINT_STRESS_TEST` para simular varias fotos y descripción larga.
- `src/app/(app)/properties/components/PropertyDetail.tsx`
  - Vista de detalle.
  - Combina galería, datos, precios, cliente, agente y mapa.
- `src/app/(app)/properties/components/propertyEdition.tsx`
  - Pantalla de edición por secciones.

### Formularios y hooks

- `src/hooks/property/usePropertyData.ts`
  - Carga la propiedad según `id`.
- `src/hooks/property/usePropertyForm.ts`
  - Inicializa React Hook Form con Zod.
  - Sincroniza `is_available` cuando cambia `status`.
- `src/hooks/property/usePropertyHandlers.ts`
  - Maneja guardar y eliminar.
  - Muestra toasts y navega después de crear.
- `src/hooks/property/usePropertyContact.ts`
  - Rehidrata el contacto asociado si la propiedad no lo trae cargado.

### Servicios

- `src/services/property.service.ts`
  - CRUD principal.
  - Subida y borrado de imágenes.
  - Stats por estado y tipo.
- `src/services/importProperty.service.ts`
  - Importación masiva con `POST /import`.

### Validación y tipos

- `src/schemas/property.schema.tsx`
- `src/utils/forms/property.utils.ts`
- `src/types/property.types.ts`

### Ficha imprimible

- `src/app/(app)/properties/components/print/property-print.utils.ts`
  - Adapta la propiedad real a un view-model comercial y printable.
  - Expone `PROPERTY_PRINT_FALLBACK_IMAGE`.
- `src/app/(app)/properties/components/print/property-print.types.ts`
  - Define el contrato del view-model de impresión.
- `src/app/(app)/properties/components/print/PropertyPrintSheet.tsx`
  - Orquesta la maqueta completa de la ficha.
- `src/app/(app)/properties/components/print/PropertyPrintGallery.tsx`
  - Renderiza la banda superior de imágenes.
- `src/app/(app)/properties/components/print/PropertyPrintSummary.tsx`
  - Renderiza referencia, título, precio, localización y estado.
- `src/app/(app)/properties/components/print/PropertyPrintFeatures.tsx`
  - Renderiza el bloque compacto de características visibles.
- `src/app/(app)/properties/components/print/PropertyPrintStatusBadge.tsx`
  - Renderiza la etiqueta de estado comercial.
- `src/styles/globals.css`
  - Contiene las reglas globales `@media print` usadas por la ficha.

## Flujo funcional

### Listado

1. El usuario entra en `/properties`.
2. La página renderiza `PropertiesTable`.
3. La tabla consume datos de propiedades y acciones por fila.

### Creación

1. `/properties/create` inicializa una propiedad base con `user.id`.
2. `usePropertyHandlers(..., true)` guarda con `PropertyService.save`.
3. Al guardar con éxito, redirige a `/properties/{id}`.

### Edición

1. `/properties/[id]` carga la propiedad con `usePropertyData`.
2. La pantalla alterna entre `PropertyDetail` y `PropertyEdition`.
3. `usePropertyHandlers` ejecuta update y refresca el estado local.

### Ficha imprimible

1. `/properties/[id]/print` carga la propiedad con `usePropertyData`.
2. `buildPropertyPrintSheetViewModel(property)` transforma la propiedad en un view-model puramente comercial.
3. `PropertyPrintSheet` compone la ficha a partir de galería, resumen, características y descripción.
4. El botón de imprimir dispara `window.print()`.
5. La salida final se apoya en estilos globales `@media print` para A4.

### Importación

1. En el listado se abre un diálogo.
2. `ImageUpload` usa `ImportPropertyService`.
3. El archivo se envía al endpoint `${ConfigService.apiUrl}/import`.

## Reglas de negocio visibles en el frontend

- `status === 'available'` implica `is_available = true`.
- Otros estados fuerzan `is_available = false`.
- `operation` se normaliza a `{ operation: value }` antes de enviarse.
- Al recibir la propiedad, el servicio vuelve a exponer `operation` como string plano.
- Coordenadas y campos numéricos se validan/coercionan en Zod.
- La ficha imprimible sólo debe mostrar información comercial apta para cliente final.
- La ficha está optimizada para A4 vertical y el objetivo de diseño es entrar en una sola página en la mayoría de casos.
- En la ficha impresa no se muestra contador de fotos.

## Integración backend

Endpoints inferidos desde el código:

- `GET /api/properties`
- `GET /api/properties/{id}?includes=image`
- `POST /api/properties`
- `PATCH /api/properties/{id}`
- `DELETE /api/properties/{id}`
- `POST /api/images/property/{id}`
- `DELETE /api/images/property/{id}`
- `GET /api/properties/stats/status`
- `GET /api/properties/stats/types`
- `POST /api/import`

## Estado actual del módulo

- Es el módulo más profundo en cobertura funcional.
- Tiene una arquitectura razonablemente separada entre página, hooks, servicios y componentes de dominio.
- Contiene varios subcomponentes especializados para secciones de edición y visualización.
- Incluye una ficha comercial imprimible específica, distinta del detalle interno.

## Riesgos y puntos de atención

- Es un módulo con bastante acoplamiento entre tipos, formularios, servicios y pantallas.
- Hay muchas piezas cliente, mapas y galerías; conviene validar SSR/CSR en cualquier refactor.
- La redirección en `useCreateProperty` apunta a `/dashboard/properties`, pero otros flujos usan `/properties/{id}`; esto sugiere una posible inconsistencia histórica.

## Ficha imprimible: contexto para futuras modificaciones

### Objetivo actual

La ficha de impresión está pensada como una pieza comercial limpia para escaparate, PDF o impresión A4. No intenta reproducir el detalle interno del CRM, sino una versión reducida con información apta para cliente final.

### Arquitectura actual de la maqueta

La estructura visual actual se organiza así:

1. Banda superior de galería.
2. Segunda fila con resumen comercial y características.
3. Bloque inferior de descripción.

Esta arquitectura se eligió después de probar una primera fila compartida entre galería y resumen. Ese enfoque generaba demasiado espacio en blanco porque ambos bloques tenían alturas muy distintas. La banda superior independiente reduce ese problema y hace la composición más estable.

### Archivos que conviene revisar juntos

Si se toca la ficha, normalmente hay que revisar el conjunto completo y no sólo un componente aislado:

- `src/app/(app)/properties/[id]/print/page.tsx`
- `src/app/(app)/properties/components/print/PropertyPrintSheet.tsx`
- `src/app/(app)/properties/components/print/PropertyPrintGallery.tsx`
- `src/app/(app)/properties/components/print/PropertyPrintSummary.tsx`
- `src/app/(app)/properties/components/print/PropertyPrintFeatures.tsx`
- `src/app/(app)/properties/components/print/property-print.utils.ts`
- `src/styles/globals.css`

### Decisiones de diseño ya tomadas

- La previsualización sí respeta el tema del CRM en su chrome exterior.
- La hoja interior de la ficha se mantiene en modo claro para simular papel.
- El contador de fotos se eliminó porque aportaba poco valor y daba problemas de impresión.
- La descripción se coloca después de características para favorecer lectura secuencial.
- La galería no intenta mostrar muchas fotos en papel: se prioriza composición compacta y control de altura.

### Regla práctica para las imágenes

- Si hay una sola imagen, se muestra una versión panorámica compacta.
- Si hay varias imágenes, la galería usa una composición con una principal grande y hasta dos secundarias.
- No se debe volver a introducir una galería expansiva o una tira larga de miniaturas, porque aumenta mucho el riesgo de salto de página.

### Regla práctica para la descripción

La descripción es el factor más peligroso para romper la página única. Antes de aumentar alturas de imagen, paddings o tipografías, conviene asumir que habrá inmuebles con texto largo. Cualquier cambio visual debe probarse con una descripción extensa.

### Modo de stress test

La página `src/app/(app)/properties/[id]/print/page.tsx` incluye actualmente una ayuda local:

- `ENABLE_PRINT_STRESS_TEST = true`

Cuando está activa:

- fuerza un mock de 4 imágenes
- fuerza una descripción larga
- cambia el texto de apoyo de la pantalla

Este flag existe para validar el peor caso de impresión. Si se quiere volver al dato real, hay que ponerlo a `false` o eliminar el helper `buildMockStressTestSheet`.

### Reglas globales de impresión

Las reglas de impresión viven en `src/styles/globals.css`:

- `@page` usa A4 vertical con margen reducido.
- `.break-inside-avoid` intenta evitar cortes de bloques.
- `.paper-sheet` fuerza `color-scheme: light`.
- `.print-sheet-description` usa dos columnas para compactar el texto.

Si se toca la maquetación de descripción o se cambia el orden de bloques, hay que revisar también estas reglas globales.

### Checklist antes de modificar la ficha

- Probar con una propiedad con pocas fotos.
- Probar con varias fotos.
- Probar con descripción larga.
- Revisar en modo pantalla y en PDF impreso.
- Confirmar que sigue entrando en una sola página A4.
- Confirmar que no se han reintroducido overlays delicados en impresión.

### Errores ya detectados en iteraciones previas

- Botones y textos de la previsualización con colores fijos que no respetaban el tema.
- Primeras filas con huecos grandes por mezclar bloques con alturas muy distintas.
- Contadores de fotos overlay recortados al imprimir.
- Mock de fotos donde el contador decía varias imágenes pero visualmente sólo aparecía una por repetir la misma `src`.

### Recomendación para futuros cambios asistidos por IA

Si una IA futura necesita tocar esta ficha, debería partir de esta secuencia:

1. Leer `docs/prds/ficha-escaparate-propiedades.md`.
2. Leer esta sección de `docs/modules/propiedades.md`.
3. Revisar `PropertyPrintSheet.tsx`, `PropertyPrintGallery.tsx` y `globals.css`.
4. Validar siempre con un caso de stress test antes de dar el cambio por bueno.
