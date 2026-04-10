# Modulo de Contactos

## Objetivo

Gestiona el directorio de contactos asociados al negocio inmobiliario, incluyendo consulta, alta, edición y visualización detallada.

## Rutas principales

- `src/app/(app)/contacts/page.tsx`
- `src/app/(app)/contacts/create/page.tsx`
- `src/app/(app)/contacts/[id]/page.tsx`

## Capacidades del módulo

- Listado en tabla.
- Alta de contacto.
- Vista de detalle.
- Edición por secciones.
- Gestión de avatar.
- Consulta de propiedades asociadas desde el modelo de dominio.

## Componentes y piezas clave

### Página de listado

- `src/app/(app)/contacts/page.tsx`
  - Muestra breadcrumbs.
  - Enlaza a creación.
  - Renderiza `ContactsTable`.

### Detalle y edición

- `src/app/(app)/contacts/[id]/page.tsx`
  - Carga contacto por `id`.
  - Alterna entre `ContactView` y `ContactEdition`.
- `src/app/(app)/contacts/components/contactView.tsx`
  - Muestra avatar, datos principales y tabs.
- `src/app/(app)/contacts/components/contactEdition.tsx`
  - Contenedor de edición.
- Subcomponentes de edición:
  - `personalInformationEdit.tsx`
  - `contactDetailsEdition.tsx`
  - `professionEdit.tsx`
  - `notesEdit.tsx`
  - `rgdpEdit.tsx`

### Servicios

- `src/services/contact.service.ts`
  - Listado, detalle, alta, edición y borrado.
  - Subida de imágenes.
  - Métrica por medio de contacto.

## Flujo funcional

### Listado

1. El usuario entra en `/contacts`.
2. La pantalla renderiza `ContactsTable`.
3. La tabla expone acciones de navegación y gestión.

### Alta

1. `/contacts/create` crea un estado base con `user.id`.
2. La pantalla abre directamente en modo edición.
3. `ContactEdition` se encarga del guardado.

### Detalle y edición

1. `/contacts/[id]` carga el contacto desde `ContactService.getContact`.
2. Se muestran datos y tabs en modo lectura.
3. El usuario puede pasar a modo edición.
4. Al guardar, se actualiza el estado local del contacto.

## Reglas de negocio visibles en el frontend

- `first_name` y `last_name` son esenciales para la presentación.
- El avatar usa fallback a iniciales si no existe `avatar_url`.
- Existe un bloque específico para consentimiento RGPD (`rgdpEdit.tsx`).
- El medio de contacto se trata como dato relevante para analítica.

## Integración backend

Endpoints inferidos desde el código:

- `GET /api/contacts`
- `GET /api/contacts/{id}`
- `POST /api/contacts`
- `PATCH /api/contacts/{id}`
- `DELETE /api/contacts/{id}`
- `POST /api/images/contact/{id}`
- `GET /api/contacts/stats/contact-medium`

## Estado actual del módulo

- El módulo está operativo y mantiene una estructura similar al de propiedades.
- Tiene menos complejidad visual, pero sigue un patrón de edición por secciones.
- Parte del estado local en `create/page.tsx` parece residual y no se usa completamente.

## Riesgos y puntos de atención

- El archivo `rgdpEdit.tsx` parece contener una errata en el nombre respecto a RGPD.
- Conviene revisar consistencia entre contrato backend y campos opcionales del contacto antes de ampliar formularios.
