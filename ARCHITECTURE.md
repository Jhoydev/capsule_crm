# Arquitectura de Software - Capsule CRM

Este documento detalla la arquitectura de software, los patrones de diseño y el flujo de datos de **Capsule CRM**, una plataforma de gestión de relaciones con clientes especializada en el sector inmobiliario.

## 1. Visión General

Capsule CRM está diseñado para facilitar a los agentes inmobiliarios la administración de propiedades, contactos y analíticas. El sistema sigue una arquitectura de **Frontend Desacoplado**, donde la interfaz de usuario se comunica con una API REST independiente construida en Laravel.

### Stack Tecnológico Principal
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS & Framer Motion
- **Componentes UI**: Shadcn UI (basado en Radix UI)
- **Backend**: Laravel API (REST)

---

## 2. Arquitectura de Capas (Frontend)

El proyecto sigue una estructura de capas clara para separar responsabilidades y facilitar el mantenimiento.

### A. Capa de Presentación (`src/app` y `src/components`)
- **App Router**: Utiliza la estructura de directorios de Next.js 14 para definir rutas, layouts y estados de carga.
- **Grupos de Rutas**:
  - `(app)`: Rutas protegidas que requieren autenticación.
  - `(auth)`: Rutas de invitados (Login, Registro, Recuperación de contraseña).
- **Componentes de UI**: Localizados en `src/components/ui`, siguen el estándar de Shadcn UI, siendo altamente personalizables y accesibles.

### B. Capa de Lógica de Negocio (`src/hooks`)
La lógica reutilizable y el manejo de estados complejos se encapsulan en hooks personalizados:
- **`useAuth`**: Centraliza la autenticación, manejo de sesiones y redirecciones.
- **Hooks de Propiedades**: `useCreateProperty`, `usePropertyForm`, etc., gestionan la lógica específica de la entidad.

### C. Capa de Servicios - API Client (`src/services`)
Centraliza todas las peticiones HTTP al backend.
- **`HttpService`**: Una clase singleton que utiliza una instancia de Axios configurada (`src/lib/axios.tsx`).
- **Servicios de Entidad**: (ej. `PropertyService`, `ContactService`) definen métodos asíncronos para interactuar con los endpoints de Laravel.

### D. Capa de Estado
Se utilizan diferentes estrategias según el tipo de dato:
- **Estado del Servidor (Caché)**: **SWR** se utiliza para el fetching de datos, revalidación y sincronización con el servidor (ej. datos del usuario autenticado).
- **Estado Global de UI**: **Zustand** gestiona estados que deben persistir entre pasos o componentes, como el `useFormStepStore` para formularios multi-paso.
- **Estado Atómico**: **Jotai** (disponible en el proyecto) para estados locales compartidos de grano fino.

---

## 3. Patrones y Decisiones de Diseño

### Estrategia de Fetching y Revalidación
- **SWR**: Se prefiere sobre `useEffect` para el consumo de APIs debido a su capacidad de caching, deduplicación de peticiones y revalidación en el foco de la ventana.

### Validación de Datos
- **React Hook Form + Zod**: Todos los formularios están validados mediante esquemas de Zod (`src/schemas`). Esto garantiza integridad de datos tanto en el cliente como en la transferencia.

### Estrategia de Formularios
- **Edición por Secciones**: Las entidades complejas (Propiedades/Contactos) se dividen en componentes de edición pequeños para mejorar la legibilidad y el rendimiento.
- **Formulario Multi-paso**: Implementado con Zustand para mantener el progreso del usuario. Utiliza navegación secuencial y permite la inyección dinámica de pasos.

### Transformación de Datos
- **Mapeo de Payloads**: Uso de utilidades como `formDataToApiPayload.ts` para transformar estructuras de datos del frontend (planas para los formularios) a la estructura jerárquica esperada por el backend Laravel.

---

## 4. Integración con el Backend (Laravel)

### Comunicación
- Basada en **REST API**.
- **Autenticación**: Laravel Sanctum para el manejo de sesiones basadas en cookies y protección CSRF.
- **Variables de Entorno**: Configuración via `NEXT_PUBLIC_BACKEND_URL`.

### Seguridad y Protección de Rutas
- La protección de rutas se maneja en el cliente a través del hook `useAuth` y el middleware de Next.js, verificando el estado de la sesión contra el endpoint `/api/user`.

---

## 5. Flujos Críticos: Gestión de Propiedades

1. **Captura**: El usuario interactúa con `CreatePropertyForm` (React Hook Form).
2. **Validación**: Se aplica el `propertySchema` de Zod en tiempo real.
3. **Procesamiento**: Al hacer submit, el hook `useCreateProperty` llama al `PropertyService.save`.
4. **Normalización**: El servicio normaliza campos específicos (ej. transformar el objeto `operation`).
5. **Persistencia**: Envío vía Axios a Laravel.
6. **Respuesta**: Actualización de la caché local y redirección al dashboard.

---

## 6. Infraestructura de Desarrollo y Testing

- **Storybook**: Desarrollo de componentes en aislamiento, documentando variantes y estados (ej. `PropertyForm.stories.tsx`).
- **Vitest**: 
  - **Unit Testing**: Pruebas de lógica pura y utilidades.
  - **Interacción**: Pruebas de componentes y flujos de usuario integradas con Storybook.
- **Visualización de Datos**: Integración de **Recharts** para dashboards dinámicos y **Leaflet** para geolocalización de propiedades.
