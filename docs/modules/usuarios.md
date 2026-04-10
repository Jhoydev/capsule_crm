# Modulo de Usuarios

## Objetivo

Reservar un área del CRM para funcionalidades relacionadas con usuarios del sistema.

## Ruta principal

- `src/app/(app)/users/page.tsx`

## Estado actual

El módulo está en estado inicial. La ruta existe, pero actualmente solo renderiza:

- `Contenido de Usuarios`

No hay hoy:

- tabla de usuarios
- formulario de edición
- hooks específicos
- vistas de detalle
- integración visible con `UserService` desde esta ruta

## Piezas relacionadas ya presentes

- `src/services/user.service.ts`
  - Permite actualizar usuario con `PATCH /api/user/{id}`.
  - Permite subir imagen de usuario a `POST /api/images/user`.
- `src/types/user.type.ts`
  - Define el contrato del usuario en frontend.
- `useAuth`
  - Ya expone el usuario autenticado y es la base para cualquier evolución de este módulo.

## Siguiente evolución natural

Si se desarrolla este módulo, el camino más coherente con el resto del proyecto sería:

1. Crear listado o perfil de usuario.
2. Añadir pantalla de edición.
3. Reutilizar `UserService` para persistencia.
4. Integrar subida de avatar y datos básicos.

## Riesgos y puntos de atención

- Como el módulo aún no está construido, cualquier documentación funcional detallada sería especulativa.
- Conviene decidir si `users` será administración de usuarios o perfil del usuario autenticado antes de implementar pantallas.
