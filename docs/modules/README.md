# Modulos de la Aplicacion

Esta carpeta documenta los módulos funcionales de Capsule CRM desde la perspectiva del frontend actual.

## Indice

- [Autenticacion](./autenticacion.md)
- [Dashboard](./dashboard.md)
- [Propiedades](./propiedades.md)
- [Contactos](./contactos.md)
- [E-Cards](./ecards.md)
- [Registro Multi-Paso](./registro-multi-paso.md)
- [Usuarios](./usuarios.md)
- [Timeline](./timeline.md)

## Mapa general

Los módulos se apoyan sobre estas capas comunes:

- `src/app`: rutas, páginas y layouts.
- `src/components`: UI reutilizable y componentes de dominio.
- `src/hooks`: lógica reutilizable y manejo de estado local/remoto.
- `src/services`: acceso a backend y normalización de datos.
- `src/stores`: estado global de UI o flujos multi-paso.
- `src/types`: contratos tipados.

## Dependencias transversales

- Autenticación y sesión: `src/hooks/auth.tsx`
- Cliente HTTP: `src/lib/axios.tsx` y `src/services/http.service.ts`
- Configuración backend: `src/services/config.service.ts`
- Layout autenticado: `src/components/layouts/crm/crm-layout.tsx`

## Observaciones importantes

- El frontend está pensado para una API Laravel con Sanctum y CSRF basado en cookies.
- Hay dos variables de entorno públicas usadas en el código:
  - `NEXT_PUBLIC_BACKEND_URL`
  - `NEXT_PUBLIC_API_BASE_URL`
- El módulo de usuarios todavía está en estado inicial y no expone funcionalidad comparable al resto de módulos.
