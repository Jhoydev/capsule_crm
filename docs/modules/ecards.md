# Modulo de E-Cards

## Objetivo

Permite personalizar una tarjeta digital del agente con tema visual, contenido editable y elementos interactivos como botones, textos y redes sociales.

## Ruta principal

- `src/app/(app)/ecard/page.tsx`

## Capacidades del módulo

- Cargar configuración de e-card del usuario.
- Previsualizar la tarjeta en tiempo real.
- Cambiar tema activo.
- Editar colores e imagen de fondo del tema personalizado.
- Agregar y reordenar elementos de contenido.

## Componentes y piezas clave

- `src/app/(app)/ecard/page.tsx`
  - Orquesta carga, toolbar, editor lateral y preview.
- `src/app/(app)/ecard/components/EcardToolbar.tsx`
  - Acciones de edición y selección de tema.
- `src/app/(app)/ecard/components/EcardEditor.tsx`
  - Editor visual del tema personalizado.
- `src/app/(app)/ecard/components/EcardPreview.tsx`
  - Preview principal.
  - Permite reordenar elementos con Framer Motion.
- Elementos renderizables:
  - `EcardButtonElement.tsx`
  - `EcardTextElement.tsx`
  - `EcardSocialElement.tsx`
- Datos auxiliares:
  - `src/app/(app)/ecard/data/defaultThemes.ts`
  - `src/app/(app)/ecard/utils/getActiveTheme.ts`

## Flujo funcional

1. La página obtiene `user` desde `useAuth()`.
2. Cuando hay `user.id`, llama `fetchEcardConfig(user.id)`.
3. La respuesta se transforma para resolver el tema activo.
4. Se muestra la preview.
5. Si el usuario abre el editor, puede modificar colores y fondo.
6. También puede agregar elementos a la tarjeta desde un dropdown.

## Estado de persistencia actual

- `src/services/ecard.service.ts` usa un mock local.
- `fetchEcardConfig` simula latencia y devuelve `mockEcardConfig`.
- `handleSubmit` en `page.tsx` solo hace `console.log` y cierra el editor.

Esto significa que el módulo hoy funciona como prototipo funcional de frontend, pero no está persistiendo cambios a backend.

## Integración backend

Actualmente no hay integración real implementada.

Punto previsto en el código:

- Reemplazar el mock por una llamada real tipo `GET /api/ecard/{userId}`.

## Dependencias relevantes

- `useAuth` para obtener el usuario actual.
- Framer Motion para reorder.
- Componentes UI del sistema base.

## Riesgos y puntos de atención

- El módulo depende de mock data, así que cualquier expectativa de persistencia será falsa hasta implementar endpoints reales.
- Usa `crypto.randomUUID()` en cliente para identificar elementos dinámicos.
- Algunas acciones visuales ya existen, pero falta definir contrato backend para guardar estructura, tema y contenido.
