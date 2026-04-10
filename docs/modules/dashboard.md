# Modulo de Dashboard

## Objetivo

Presenta métricas agregadas del negocio inmobiliario para dar visibilidad rápida sobre propiedades y contactos.

## Ruta principal

- `src/app/(app)/dashboard/page.tsx`

## Componentes y piezas clave

- `src/app/(app)/dashboard/hooks/useDashboard.ts`
  - Hook encargado de cargar datos del dashboard.
  - Maneja `loading`, `error`, `data` y `refetch`.
- `src/services/dashboard.service.ts`
  - Encapsula el acceso a `GET /dashboard`.
- Componentes visuales:
  - `src/app/(app)/dashboard/components/PropertyStatus.tsx`
  - `src/app/(app)/dashboard/components/PropertyTypes.tsx`
  - `src/app/(app)/dashboard/components/ContactContactMedium.tsx`
  - `src/app/(app)/dashboard/components/GeneralizedPieChart.tsx`
  - `src/app/(app)/dashboard/components/GeneralizedBarChart.tsx`

## Datos mostrados

Según el uso actual en `page.tsx`, el dashboard espera:

- `count_property_status`
- `count_property_type`
- `count_contact_medium`

Estos datos se consumen como agregados listos para graficar.

## Flujo funcional

1. La página del dashboard monta el hook `useDashboard`.
2. El hook instancia `DashboardService`.
3. Se hace `GET ${ConfigService.apiUrl}/dashboard`.
4. La respuesta se guarda en estado local.
5. Los componentes de visualización renderizan gráficos y resúmenes.

## Estado actual del módulo

- El dashboard es principalmente de lectura.
- Usa fetching imperativo con `useEffect` y `useState`, no SWR.
- Hay una página adicional de prueba 3D en `src/app/(app)/dashboard/3d-test/page.tsx`.

## Dependencias relevantes

- Recharts para visualización.
- Servicios HTTP compartidos.
- Layout autenticado del CRM.

## Riesgos y puntos de atención

- Si cambia el contrato del endpoint `/dashboard`, habrá que adaptar `DashboardResponseType` y los componentes consumidores.
- Hoy el hook reporta errores por string y hace `console.error`; no existe manejo unificado de estados de fallo.
