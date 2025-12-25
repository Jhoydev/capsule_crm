📘 Diccionario de Reglas de Negocio - Capsule CRM

Este documento consolida las reglas, restricciones y lógicas de decisión que rigen el funcionamiento de Capsule CRM, basado en el análisis del código fuente.

---

### 1. Entidad: Propiedades

#### Gestión de Estados y Disponibilidad
- **Sincronización Automática**: Existe una regla de sincronización implementada en `usePropertyForm.ts`. Cuando el campo `status` cambia, el campo `is_available` se actualiza automáticamente:
  - Si `status === "available"`, entonces `is_available = true`.
  - Para cualquier otro estado (`sold`, `rented`, `off_market`, `pending`), `is_available = false`.
- **Estados Permitidos**: Definidos en `propertySchema` (Zod): `under_construction`, `new`, `reformated`, `semi_renovated`, `second_hand`, `to_renovate`.
- **Operaciones**: Aunque el esquema permite un `string` opcional, el servicio `PropertyService` normaliza el objeto de operación a `{ operation: value }` antes de enviarlo al backend, con un valor por defecto de `'rent'`.

#### Validaciones de Datos (`propertySchema`)
- **Campos Obligatorios**: `reference` (no vacío), `title` (3-100 caracteres), `description` (5-500 caracteres), `city`, `country_id`, `state`, `zone` (min 3), `zip_code`, `contact_id` (Owner), `user_id` (Agent).
- **Geolocalización**: 
  - `latitude`: Debe estar entre -90 y 90.
  - `longitude`: Debe estar entre -180 y 180.
- **Áreas y Habitaciones**: Campos numéricos como `constructed_area`, `bathrooms`, `bedrooms`, etc., son opcionales pero deben ser coercibles a número.

#### Multimedia
- **Gestión de Imágenes**: Las imágenes se gestionan a través de `PropertyService.upload` y `PropertyService.deleteImage`. La eliminación requiere tanto el ID de la propiedad como el `image_id`.

---

### 2. Entidad: Contactos y Privacidad (RGPD)

#### Identificación y Datos Personales (`contactSchema`)
- **Obligatoriedad**: `first_name` y `last_name` no pueden estar vacíos.
- **Email**: Debe ser un formato de correo válido.
- **Identificación Única**: El campo `nif` es opcional en el esquema de validación pero se utiliza para identificación.
- **Medios de Contacto**: Restringidos a `email`, `phone`, `social_media`, `other` (definido en `contact.types.ts`).

#### Consentimiento (RGPD)
- **Gestión de Privacidad**: El campo `rgpd` se almacena como un `string` opcional. En la interfaz (`rgdpEdit.tsx`), se presenta como un área de texto para introducir información de consentimiento o notas legales relacionadas con la protección de datos.

---

### 3. Entidad: E-Cards y Personalización

#### Temas y Estilos
- **Temas Predeterminados**: Definidos en `defaultThemes.ts`. Cada tema es un objeto `EcardTheme` con:
  - `textColor`: Color hexadecimal para el texto.
  - `buttonColor`: Color hexadecimal para los botones (ej: `#3b82f6` para "Cielo azul").
  - `backgroundImage`: URL de imagen (principalmente de Unsplash).
- **Restricciones**: Los temas predefinidos no permiten (en su configuración estática) la alteración parcial de colores; se aplican como un conjunto cerrado.

---

### 4. Procesos Multi-paso

#### Integridad del Formulario
- **Persistencia en Zustand**: El estado se gestiona en `useFormStepStore.ts`. Los datos de cada paso se almacenan bajo su respectiva clave (`selectCountry`, `personalData`, etc.).
- **Navegación**: 
  - El orden es estrictamente secuencial mediante los métodos `next()` y `back()`.
  - Existe una función `updateSteps` que permite inyectar pasos dinámicamente (ej: `promotionStep`) después de un paso específico.
- **Transformación de Datos**: Antes del envío, `formDataToApiPayload.ts` transforma el estado plano del store en una estructura jerárquica:
  - `pais`
  - `usuario` (nombre, email)
  - `empresa` (nombre, cif)
  - `facturacion` (direccion)
  - `pago` (metodo)
- **Finalización**: El formulario se considera completo solo tras el paso de `payment`, el cual dispara la acción de `submit` que resetea el store global tras el éxito.

---

### 5. Autenticación y Seguridad

#### Gestión de Sesiones (`useAuth`)
- **Protección CSRF**: Todas las acciones sensibles (login, register, forgot-password) requieren una llamada previa a `/sanctum/csrf-cookie`.
- **Verificación de Email**: Si el backend devuelve un estado 409 en la obtención del usuario, se redirige automáticamente a `/verify-email`.
- **Reglas de Redirección**:
  - `guest`: Si un usuario autenticado intenta acceder a una ruta de invitado, se redirige al dashboard.
  - `auth`: Si un usuario no autenticado (error en `/api/user`) intenta acceder a una ruta protegida, se ejecuta el `logout` y se redirige a `/login`.
- **Manejo de Errores**: Las validaciones de backend (422) se capturan y se inyectan en el estado local de errores del formulario.
