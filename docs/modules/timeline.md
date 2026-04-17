# Componente Timeline

## Objetivo

Documenta el componente reutilizable que muestra una línea temporal de hitos inferidos a partir de una entidad del CRM, actualmente contactos y propiedades.

## Archivos principales

- `src/components/shared/entity-timeline.tsx`
- `src/lib/timeline.ts`

## Responsabilidad del componente

- Renderizar una tarjeta con título, descripción y lista vertical de eventos.
- Asociar un icono visual a cada evento según su tipo.
- Mostrar un estado vacío cuando no existen hitos para representar.
- Mantener una presentación genérica para poder reutilizarse con distintas entidades.

## API pública

### `EntityTimeline`

Props expuestas por `src/components/shared/entity-timeline.tsx`:

- `title: string`
  - Título principal de la tarjeta.
- `description: string`
  - Texto descriptivo que contextualiza la línea temporal.
- `items: TimelineItem[]`
  - Colección de eventos a renderizar.
- `className?: string`
  - Clases adicionales para personalizar el contenedor.

### `TimelineItem`

Definido en `src/lib/timeline.ts`:

- `id: string`
- `title: string`
- `description: string`
- `meta?: string`
- `icon?: TimelineIcon`

### `TimelineIcon`

Valores soportados actualmente:

- `user`
- `mail`
- `phone`
- `note`
- `shield`
- `link`
- `home`
- `price`
- `image`
- `map`
- `sparkles`

## Mapeo visual de iconos

El componente resuelve cada `TimelineIcon` hacia un icono de `lucide-react`:

- `user` -> `UserRound`
- `mail` -> `Mail`
- `phone` -> `Phone`
- `note` -> `FileText`
- `shield` -> `ShieldCheck`
- `link` -> `Link2`
- `home` -> `Home`
- `price` -> `BadgeEuro`
- `image` -> `ImageIcon`
- `map` -> `MapPinned`
- `sparkles` -> `Sparkles`

Si un evento no informa `icon`, el componente usa `sparkles` como fallback.

## Flujo de uso

1. Una pantalla de dominio obtiene la entidad completa.
2. La entidad se transforma en `TimelineItem[]` mediante una función de `src/lib/timeline.ts`.
3. La vista pasa ese arreglo a `EntityTimeline`.
4. El componente renderiza la secuencia vertical de hitos dentro de una `Card`.

## Integraciones actuales

### Contactos

- `src/app/(app)/contacts/components/tab.tsx`
  - Construye los eventos con `buildContactTimeline(contact)`.
  - Muestra el timeline en la pestaña `Timeline`.

Hitos inferidos actualmente para un contacto:

- Perfil disponible.
- Email principal registrado.
- Canales telefónicos disponibles.
- Medio de contacto preferido definido.
- Contexto profesional añadido.
- Información RGPD capturada.
- Notas internas disponibles.
- Propiedades relacionadas enlazadas.

### Propiedades

- `src/app/(app)/properties/components/PropertyDetail.tsx`
  - Construye los eventos con `buildPropertyTimeline(data)`.
  - Muestra el timeline al final del detalle de propiedad.

Hitos inferidos actualmente para una propiedad:

- Inmueble registrado en el CRM.
- Estado comercial actual.
- Información de precios configurada.
- Ubicación completada.
- Contacto relacionado asignado.
- Galería subida.
- Descripción comercial disponible.

## Reglas visibles en frontend

- El timeline no consume datos remotos por sí mismo; depende de la entidad ya cargada por la pantalla.
- La lógica de negocio para decidir qué eventos aparecen vive fuera del componente, en `src/lib/timeline.ts`.
- `formatStatus` transforma valores con guiones bajos a texto legible, por ejemplo `for_sale` -> `for sale`.
- El componente asume que `id` es estable y único para usarlo como `key`.
- Cuando `items.length === 0`, se muestra el mensaje `No timeline events available yet.`

## Decisiones de diseño

- La UI está desacoplada de contactos y propiedades: solo conoce `TimelineItem`.
- La composición actual favorece reutilización, pero la semántica de los hitos está centralizada en helpers compartidos.
- La tarjeta usa estilos de Shadcn UI (`Card`, `CardHeader`, `CardContent`) y utilidades Tailwind.

## Riesgos y puntos de atención

- Los textos del timeline están en inglés, mientras parte importante del producto y la documentación está en español.
- `buildContactTimeline` y `buildPropertyTimeline` generan hitos inferidos desde el estado actual, no desde un historial real persistido.
- Si se amplían los tipos de icono en `TimelineIcon`, también habrá que actualizar `iconMap` en `entity-timeline.tsx`.
- Descripciones largas, como notas internas, pueden crecer mucho y afectar la legibilidad del bloque.

## Recomendaciones para extenderlo

- Si se añade soporte para otra entidad, crear un builder específico que devuelva `TimelineItem[]` y mantener `EntityTimeline` sin lógica de dominio.
- Si el backend expone historial real en el futuro, convendría separar claramente "eventos inferidos" de "eventos auditables".
- Si el componente pasa a ser más usado, puede ser útil mover los textos visibles a una capa de internacionalización.
