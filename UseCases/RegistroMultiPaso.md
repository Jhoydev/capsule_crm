Caso de Uso: Registro de Propiedades mediante Formulario Multi-paso

1. Descripción
Optimiza el proceso de alta de nuevas propiedades o servicios mediante una interfaz guiada de múltiples pasos. Este flujo asegura que el usuario complete toda la información necesaria (país, datos personales, empresa, facturación y pago) de manera estructurada y sin abrumarse por la cantidad de campos.

2. Flujo de Usuario
Entrada: Intención de registrar una nueva propiedad o contratar un plan/servicio.
Proceso: 
- Navegación: El usuario avanza a través de una secuencia de pasos definidos (`SelectCountry`, `PersonalData`, `Company`, `Billing`, `Payment`).
- Persistencia Temporal: Los datos ingresados en cada paso se almacenan en un estado global mediante `Zustand` (`useFormStepStore`).
- Validación: Cada paso valida sus propios campos antes de permitir el avance al siguiente.
- Transformación: Al finalizar, los datos planos del store se transforman mediante una utilidad al formato requerido por la API.
Salida: Registro completado exitosamente y redirección al área correspondiente.

3. Stack Tecnológico Aplicado
UI: Componentes de formulario personalizados para cada paso, Shadcn UI para botones y contenedores.
Lógica: `Zustand` para la gestión del estado global del formulario y el progreso de los pasos, `react-hook-form` para validaciones locales.
Comunicación: Servicio de API que procesa el payload final generado por el formulario.

4. Reglas de Negocio
- El orden de los pasos es obligatorio y secuencial.
- Es posible añadir pasos adicionales dinámicamente (ej. paso de promoción) según la lógica de negocio.
- No se puede finalizar el registro sin completar el paso de pago (si aplica).
- El estado se reinicia completamente al completar con éxito o al elegir cancelar el proceso.
