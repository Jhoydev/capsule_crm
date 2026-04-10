# AGENTS.md

Guía breve para agentes que trabajen en `capsule_crm`.

## Proyecto

- Frontend inmobiliario construido con Next.js 14 + App Router.
- Consume una API REST externa en Laravel.
- Áreas principales: autenticación, propiedades, contactos, dashboard, e-cards y registro multi-paso.

## Stack

- TypeScript estricto.
- Tailwind CSS.
- Shadcn UI + Radix UI.
- React Hook Form + Zod.
- SWR, Zustand y Jotai.
- Recharts, Leaflet y React Three Fiber.
- `npm` como package manager.

## Variables de entorno

La integración backend usa dos variables públicas en distintos puntos del código: `NEXT_PUBLIC_BACKEND_URL` y `NEXT_PUBLIC_API_BASE_URL`. Si cambia la base URL, revisar `src/lib/axios.tsx`, `src/services/http.service.ts` y `src/services/config.service.ts`.

## Estructura importante

- `src/app`: rutas públicas y protegidas.
- `src/services`: acceso a API por dominio.
- `src/hooks`: lógica reutilizable.
- `src/components`: UI y componentes de negocio.
- `docs/modules`: documentación funcional por módulo.

## Reglas operativas del repo

- Mantener la separación por capas: página -> hook -> service -> tipos/schema.
- No meter llamadas HTTP directamente en páginas o componentes si ya existe un servicio del dominio.
- Si un cambio toca formularios, revisar esquema Zod, valores por defecto y transformación de payload.
- Si un cambio toca autenticación, validar `src/hooks/auth.tsx` y los layouts de `src/app/(auth)` y `src/app/(app)`.
- En propiedades, `status` e `is_available` están acoplados y `operation` se normaliza en `PropertyService`.
- Para verificación local, priorizar `npm run lint` y `npx vitest run`.
- `README.md` menciona `npm test`, pero ese script no existe hoy en `package.json`.

## Convenciones

- Alias: `@/* -> src/*`
- Prettier:
  - `singleQuote: true`
  - `semi: true`
  - `tabWidth: 4`
  - `printWidth: 120`
- ESLint extiende `next/core-web-vitals` y `plugin:storybook/recommended`.
- El repo mezcla `.ts/.tsx` con algunos `.js`.
- En App Router, cualquier componente con hooks de cliente debe declarar `'use client'`.

## Zonas sensibles

- `src/hooks/auth.tsx`: sesión, middleware y redirecciones.
- `src/services/property.service.ts`: normalización de datos de propiedades.
- `src/hooks/property/*`: flujo de edición y guardado de propiedades.
- `src/stores/useFormStepStore.ts`: estado del flujo multi-paso.
- `src/app/(app)/ecard/*`: módulo aún parcialmente mockeado.

## Referencias

- `README.md`: setup general.
- `ARCHITECTURE.md`: arquitectura frontend.
- `BusinessRules.md`: reglas de negocio.
- `docs/modules/README.md`: documentación por módulo.
