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

## Riesgos y puntos de atención

- Es un módulo con bastante acoplamiento entre tipos, formularios, servicios y pantallas.
- Hay muchas piezas cliente, mapas y galerías; conviene validar SSR/CSR en cualquier refactor.
- La redirección en `useCreateProperty` apunta a `/dashboard/properties`, pero otros flujos usan `/properties/{id}`; esto sugiere una posible inconsistencia histórica.
