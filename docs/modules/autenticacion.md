# Modulo de Autenticacion

## Objetivo

Gestiona el acceso de usuarios invitados y autenticados al CRM. Incluye login, registro, recuperación de contraseña, reseteo, verificación de email y logout.

## Rutas principales

- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/app/(auth)/forgot-password/page.tsx`
- `src/app/(auth)/password-reset/[token]/page.tsx`
- `src/app/(auth)/verify-email/page.tsx`
- `src/app/(app)/layout.tsx`

## Componentes y piezas clave

- `src/hooks/auth.tsx`
  - Punto central del módulo.
  - Recupera el usuario autenticado vía SWR con `GET /api/user`.
  - Gestiona redirecciones por middleware `guest` y `auth`.
  - Ejecuta CSRF previo a login, registro, forgot-password y reset-password.
- `src/app/(auth)/components/auth-layout.tsx`
  - Layout visual de formularios de acceso.
- `src/app/(auth)/AuthSessionStatus.tsx`
  - Muestra mensajes de estado para flujos de recuperación y reseteo.
- `src/lib/axios.tsx`
  - Axios con `withCredentials` y `withXSRFToken`.

## Flujo funcional

### Login

1. El usuario completa email y password en `login/page.tsx`.
2. La pantalla llama `useAuth().login`.
3. `useAuth` solicita `/sanctum/csrf-cookie`.
4. Se ejecuta `POST /login`.
5. SWR revalida `/api/user`.
6. Si hay sesión, el usuario pasa a la zona protegida.

### Registro

1. `register/page.tsx` envía nombre, email y password.
2. `useAuth().register` ejecuta CSRF y `POST /register`.
3. Después de crear usuario, se llama `mutate()` sobre SWR.
4. Si la cuenta requiere verificación, el backend puede terminar redirigiendo al flujo de email verification.

### Recuperación y reseteo

- `forgot-password/page.tsx` solicita el envío del enlace.
- `password-reset/[token]/page.tsx` consume token y email desde la URL.
- `useAuth().resetPassword` envía los datos al backend y luego redirige a login con un mensaje codificado en query string.

### Verificación de email

- Si `GET /api/user` responde `409`, `useAuth` redirige a `/verify-email`.
- El usuario puede reenviar el correo o cerrar sesión.

## Protección de rutas

- El layout privado `src/app/(app)/layout.tsx` llama `useAuth({ middleware: 'auth' })`.
- Si el usuario aún no está disponible, muestra `Loading`.
- Si hay error de autenticación en una ruta privada, `useAuth` ejecuta logout y redirige a `/login`.

## Integración backend

Endpoints esperados:

- `GET /sanctum/csrf-cookie`
- `GET /api/user`
- `POST /login`
- `POST /register`
- `POST /forgot-password`
- `POST /reset-password`
- `POST /email/verification-notification`
- `POST /logout`

## Estado actual del módulo

- Está funcional y es el módulo transversal más maduro del proyecto.
- Mezcla fetching de usuario, control de acceso y navegación dentro de `useAuth`.
- El comportamiento depende fuertemente de las respuestas HTTP 409 y 422 del backend Laravel.

## Riesgos y puntos de atención

- Hay lógica de navegación dentro del hook; cualquier refactor debe validar rutas públicas y privadas.
- `logout` depende del estado `error` y fuerza `window.location.pathname = '/login'`.
- Se usan variables de entorno públicas para base URL; hay que revisar consistencia si cambia la integración.
