Caso de Uso: Personalización de E-Cards

1. Descripción
Permite a los agentes inmobiliarios crear y personalizar una tarjeta de presentación digital (E-Card). Esta herramienta facilita la presencia digital del agente, permitiéndole configurar temas, colores y elementos interactivos para compartir con sus contactos.

2. Flujo de Usuario
Entrada: Preferencias estéticas del agente (colores, imágenes de fondo) y selección de elementos de contenido.
Proceso: 
- Carga: El sistema recupera la configuración actual de la E-Card del usuario mediante `fetchEcardConfig`.
- Edición: El usuario abre el `EcardEditor` para modificar en tiempo real el color del texto, el color de los botones y la imagen de fondo.
- Vista Previa: El componente `EcardPreview` refleja instantáneamente los cambios realizados en el editor.
- Gestión de Elementos: Adición y edición de elementos dinámicos como botones, bloques de texto y enlaces a redes sociales.
Salida: E-Card personalizada guardada y lista para ser visualizada por terceros.

3. Stack Tecnológico Aplicado
UI: Componentes personalizados (`EcardButtonElement`, `EcardTextElement`, `EcardSocialElement`), `Input` (tipo color y texto) de Shadcn UI.
Lógica: Estado local con `useState` para la configuración en tiempo real, utilidades para la gestión de temas (`getActiveTheme`).
Comunicación: `EcardService` (fetchEcardConfig) para interactuar con la API de configuración de e-cards.

4. Reglas de Negocio
- Los usuarios pueden elegir entre temas predefinidos o crear un tema personalizado.
- La previsualización debe ser exacta a cómo se verá la E-Card final.
- La configuración del tema personalizado incluye obligatoriamente color de texto, color de botón y opcionalmente una URL de imagen de fondo.
- El contenido de la E-Card está vinculado al perfil del usuario autenticado.
