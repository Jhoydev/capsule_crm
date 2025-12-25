Caso de Uso: Administración de Contactos

1. Descripción
Permite a los agentes gestionar su red de contactos, incluyendo clientes potenciales, propietarios y otros interesados. Centraliza la información personal, profesional y legal (RGPD) de cada individuo, facilitando el seguimiento y la relación comercial.

2. Flujo de Usuario
Entrada: Datos personales (nombre, NIF, email, teléfono), información profesional y preferencias.
Proceso: 
- Visualización: Listado de contactos con filtrado y acciones rápidas usando `TanStack Table`.
- Edición: Formulario modular que permite actualizar información personal, profesional, añadir notas y gestionar el consentimiento de protección de datos (RGPD).
- Seguimiento: Capacidad de añadir notas específicas para cada contacto.
Salida: Perfil de contacto actualizado y accesible para futuras operaciones inmobiliarias.

3. Stack Tecnológico Aplicado
UI: Componentes de Shadcn UI (`Input`, `Select`, `Dialog`), `TanStack Table` para la gestión de datos tabulares.
Lógica: `react-hook-form` para la gestión de formularios complejos, `ContactService` para operaciones CRUD.
Comunicación: `ContactService` interactuando con `/api/contacts` y `/api/contacts/stats/contact-medium`.

4. Reglas de Negocio
- El NIF y el email son campos clave para la identificación.
- Se debe gestionar explícitamente el estado del RGPD (aceptación de política de privacidad, comunicaciones comerciales).
- Soporte multilingüe básico en la selección de idioma de preferencia del contacto.
- Los contactos pueden tener asociados medios de captación (cómo llegaron a la plataforma).
