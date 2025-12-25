Caso de Uso: Autenticación de Usuario

1. Descripción
Permite a los usuarios acceder de forma segura a la plataforma Capsule CRM, registrarse como nuevos agentes, recuperar contraseñas olvidadas y verificar su correo electrónico. La autenticación es la puerta de entrada para gestionar la cartera inmobiliaria y contactos.

2. Flujo de Usuario
Entrada: Credenciales de usuario (email y contraseña), datos de registro o email para recuperación.
Proceso: 
- El sistema solicita una cookie CSRF de Laravel Sanctum.
- Se envían las credenciales al endpoint correspondiente (/login, /register, etc.).
- Si las credenciales son válidas, se actualiza el estado local del usuario mediante SWR.
- Si hay errores de validación (422), se muestran mensajes específicos por campo.
Salida: Redirección al Dashboard si el usuario está autenticado, o mensajes de error visuales en el formulario.

3. Stack Tecnológico Aplicado
UI: Componentes de Shadcn UI (Button, Input), Lucide React (LoaderCircle, Eye, EyeOff).
Lógica: Hook personalizado `useAuth` (que encapsula la lógica de Axios y SWR), `useState` para gestión de campos y errores.
Comunicación: Endpoints de Axios (`/sanctum/csrf-cookie`, `/login`, `/register`, `/forgot-password`, `/logout`).

4. Reglas de Negocio
- Los campos email y password son obligatorios en el login.
- Redirección automática si el usuario ya está autenticado (middleware: 'guest').
- Los errores de validación del backend (422) se mapean directamente a los componentes `InputError`.
- El sistema maneja un estado de "email no verificado", redirigiendo a `/verify-email` si es necesario (status 409).
