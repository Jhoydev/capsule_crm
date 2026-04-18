# PRD: Ficha de Escaparate Imprimible para Propiedades

## Estado

- Propuesto

## Fecha

- 2026-04-18

## Propietario

- Producto / Frontend CRM

## Resumen ejecutivo

Se propone incorporar en el CRM una funcionalidad que permita generar una ficha de escaparate profesional para cada propiedad, optimizada tanto para visualización en pantalla como para impresión desde el navegador. La ficha debe presentar la propiedad con una estética cuidada, comercial y fácil de leer, priorizando fotografías, precio, principales características y estado comercial, evitando datos sensibles o internos del CRM.

El usuario debe poder abrir una vista preparada para impresión, escoger un formato de salida orientado a navegador y lanzar la impresión nativa para guardar en PDF o imprimir en papel A4. El resultado debe ser suficientemente elegante para uso comercial inmediato en escaparate, oficina o entrega a clientes.

## Problema

Actualmente el CRM permite visualizar y editar propiedades, pero no ofrece una pieza específicamente diseñada para exponer inmuebles de forma comercial y printable. La vista de detalle actual está pensada para uso interno y mezcla información operativa, bloques de edición y elementos que no son adecuados para exposición al público.

Esto genera varios problemas:

- No existe un formato presentable y homogéneo para escaparate físico o dossier rápido.
- Los agentes dependen de soluciones manuales externas o capturas improvisadas.
- La impresión actual no está optimizada para papel ni para exportación limpia a PDF.
- Existe riesgo de mostrar información sensible o irrelevante si se imprime la pantalla interna del CRM.

## Objetivo del producto

Habilitar dentro del CRM una ficha de escaparate de propiedad que:

- Muestre la información comercial clave con una presentación profesional.
- Pueda imprimirse fácilmente desde el navegador.
- Permita generar PDF mediante la opción nativa de impresión del navegador.
- Tenga una maquetación válida para A4 vertical y, opcionalmente, otros formatos imprimibles futuros.
- Excluya datos sensibles, internos o no relevantes para cliente final.

## Objetivos de negocio

- Reducir el tiempo de preparación de material comercial para propiedades.
- Mejorar la calidad visual de la exposición de inmuebles en oficina y escaparate.
- Estandarizar la presentación de propiedades entre agentes.
- Incrementar la reutilización del inventario existente del CRM para acciones comerciales offline.

## Objetivos de usuario

- Como agente, quiero generar una ficha atractiva de una propiedad en pocos clics.
- Como agente, quiero imprimirla o guardarla en PDF sin depender de herramientas externas.
- Como agente, quiero decidir un formato listo para A4 para colocar la ficha en escaparate o compartirla con clientes.
- Como responsable comercial, quiero asegurar que solo se muestran datos públicos y comercialmente relevantes.

## No objetivos

- No sustituye al detalle interno completo de la propiedad.
- No incluye edición avanzada de contenido dentro del modo impresión en la primera versión.
- No incorpora generación server-side de PDF en esta fase.
- No contempla plantillas múltiples por marca o franquicia en la primera entrega.
- No incluye distribución automática por email, WhatsApp o portales.

## Contexto del sistema actual

El módulo de propiedades ya dispone de:

- Detalle de propiedad en `src/app/(app)/properties/[id]/page.tsx`.
- Vista interna `PropertyDetail` con galería, datos, precios y timeline.
- Servicio `PropertyService` para cargar la propiedad desde la API.
- Tipado central en `src/types/property.types.ts`.

Campos ya disponibles y relevantes para la ficha:

- `title`
- `description`
- `type`
- `operation`
- `sale_price`, `rent_price`, `transfer_price`
- `constructed_area`, `usable_area`, `plot_area`, `terrace_area`
- `bedrooms`, `bathrooms`, `toilets`, `garage_spaces`
- `state`
- `status`
- `is_available`
- `image`
- Ubicación aproximada no sensible: `city`, `zone`

Campos que deben evitarse o revisarse antes de exponer:

- `contact_id`
- `contact`
- `user_id`
- Dirección exacta completa cuando la política comercial no permita mostrarla
- Coordenadas exactas
- Cualquier metadato interno u operativo del CRM

## Usuarios afectados

- Agentes inmobiliarios
- Responsables de oficina
- Equipos comerciales que preparan escaparates físicos

## Propuesta funcional

Añadir una nueva experiencia dentro del módulo de propiedades para generar una ficha comercial imprimible basada en la información ya disponible en el CRM.

La funcionalidad constará de:

- Acción visible desde la vista detalle de propiedad: `Generar ficha de escaparate` o `Imprimir ficha`.
- Vista dedicada de presentación comercial, distinta del detalle interno.
- Diseño responsive en pantalla, pero optimizado específicamente para impresión.
- Hoja de estilos `print` para ocultar controles, fondos no imprimibles y elementos de navegación.
- Uso de `window.print()` o equivalente disparado por un botón del interfaz.

## Alcance funcional de la v1

La ficha deberá mostrar:

- Título comercial de la propiedad.
- Operación principal: venta, alquiler o traspaso.
- Precio principal según operación.
- Galería de fotos con imagen destacada y mosaico secundario.
- Características clave:
  - superficie construida
  - superficie útil
  - superficie de parcela si aplica
  - terraza si aplica
  - habitaciones
  - baños
  - aseos
  - plazas de garaje
- Tipo de inmueble.
- Estado físico de la propiedad.
- Estado comercial visible:
  - libre
  - reservada
  - vendida
  - alquilada
  - fuera de mercado, si producto decide exponerlo
- Ubicación no sensible:
  - ciudad
  - zona
- Descripción comercial.
- Referencia comercial, si negocio la considera apta para exposición.

La ficha deberá permitir:

- Previsualizar en pantalla antes de imprimir.
- Imprimir con el diálogo nativo del navegador.
- Guardar como PDF usando la opción del navegador.
- Salida optimizada para A4.

## Requisitos funcionales detallados

### RF-01 Vista dedicada de ficha

El sistema debe ofrecer una ruta o vista específica de ficha de escaparate separada de la vista interna de propiedad.

### RF-02 Acceso desde propiedad

Desde el detalle de una propiedad el usuario debe poder abrir la ficha de escaparate con un solo clic.

### RF-03 Selección automática de contenido

La ficha debe consumir la información de la propiedad ya existente en el CRM y pintar únicamente los campos comerciales permitidos.

### RF-04 Exclusión de datos sensibles

La ficha no debe mostrar datos de propietario, contacto, agente interno, coordenadas exactas, identificadores técnicos ni observaciones internas.

### RF-05 Prioridad visual de fotos

La interfaz debe dar protagonismo a las imágenes, mostrando una imagen principal y una composición secundaria si existen varias.

### RF-06 Precio principal

La ficha debe destacar un precio principal acorde a la operación activa de la propiedad.

### RF-07 Estado comercial legible

La ficha debe mostrar una etiqueta de estado comercial claramente visible y fácil de interpretar en escaparate.

### RF-08 Adaptación de estados

El sistema debe mapear los estados actuales del CRM a etiquetas comerciales comprensibles.

Propuesta inicial de mapeo:

- `available` -> `Libre`
- `pending` -> `Reservada`
- `sold` -> `Vendida`
- `rented` -> `Alquilada`
- `off_market` -> `Fuera de mercado`

Nota de producto:

- El requerimiento original menciona `libre`, `reservada` y `vendida`.
- El modelo actual del CRM no tiene un valor literal `reserved`, sino `pending`.
- Antes de desarrollo debe confirmarse si `pending` equivale comercialmente a `reservada`.

### RF-09 Impresión desde navegador

El usuario debe poder lanzar la impresión desde la propia ficha mediante un botón que invoque la impresión nativa del navegador.

### RF-10 Maquetación A4

La salida impresa debe estar optimizada para papel A4, minimizando cortes no deseados, saltos de página incorrectos y bloques partidos.

### RF-11 Generación PDF

No se requiere backend de PDF; la generación de PDF se resuelve mediante la opción `Guardar como PDF` del navegador.

### RF-12 Tolerancia a datos incompletos

Si faltan ciertos campos opcionales, la ficha debe seguir viéndose profesional, ocultando bloques vacíos sin romper la composición.

### RF-13 Fallback de imágenes

Si la propiedad no dispone de fotos, la ficha debe mostrar un placeholder elegante o una variante de diseño sin galería.

## Requisitos de experiencia de usuario

- La ficha debe comunicar calidad visual y confianza.
- El contenido debe ser legible a distancia media en una impresión de escaparate.
- La jerarquía visual debe destacar:
  - foto principal
  - precio
  - estado comercial
  - características clave
- La descripción no debe dominar la primera mitad de la página.
- El diseño impreso debe evitar sensación de pantallazo del CRM.
- Los botones, breadcrumbs, sidebars y controles deben desaparecer en impresión.

## Requisitos de diseño

- Estética sobria, inmobiliaria y premium.
- Buen equilibrio entre imagen y datos.
- Tipografía clara y profesional.
- Etiquetas de estado con color e iconografía opcional, pero que sigan siendo entendibles en escala de grises.
- Uso prudente del color de marca, evitando fondos pesados que perjudiquen la impresión.
- Espaciado consistente para no saturar la página.
- Preparación para soportar logo de agencia en una fase posterior.

## Requisitos de impresión

- Soporte explícito para A4 vertical en v1.
- La hoja impresa debe caber idealmente en 1 página para la mayoría de inmuebles estándar.
- Si la descripción o el volumen de imágenes obligan a 2 páginas, la primera debe contener el resumen comercial principal.
- Deben evitarse cortes de:
  - foto principal
  - precio
  - bloque de características
  - etiqueta de estado
- La ficha debe funcionar correctamente en Chrome y navegadores basados en Chromium.

## Requisitos técnicos

### Arquitectura propuesta

Mantener la separación por capas ya usada en el repo:

- Página o ruta dedicada.
- Hook para cargar y transformar datos de ficha si es necesario.
- Reutilización del `PropertyService` existente.
- Componentes UI específicos para vista comercial e impresión.

### Propuesta de estructura

- `src/app/(app)/properties/[id]/showcase/page.tsx`
- `src/app/(app)/properties/components/showcase/*`
- `src/hooks/property/usePropertyShowcase.ts`
- `src/lib` o `src/utils` para helpers de mapeo de estado y formateo de precio/superficies

### Datos y transformaciones

Se recomienda crear una capa de view-model para la ficha que:

- Elija el precio principal según `operation`.
- Formatee superficies y contadores.
- Mapee `status` a etiqueta comercial.
- Filtre campos no publicables.
- Priorice imágenes válidas.

### Impresión

La implementación debe basarse en:

- CSS `@media print`
- Reglas de tamaño de página apropiadas
- Ocultación de chrome de aplicación
- Botón de acción con `window.print()`

### Consideraciones Next.js

- Si la vista incluye hooks o acciones de navegador, debe declarar `'use client'`.
- La carga de datos puede apoyarse en el patrón actual cliente existente del módulo de propiedades.
- Debe evitarse duplicar llamadas HTTP innecesarias si la propiedad ya está cargada en contexto navegacional futuro.

## Reglas de negocio

- Solo debe mostrarse información apta para cliente final.
- El precio mostrado debe corresponder a la operación principal visible.
- Si existen varios precios, producto debe definir prioridad de exposición.

Propuesta inicial:

- `sale` -> `sale_price`
- `rent` -> `rent_price`
- `transfer` -> `transfer_price`

- Si no hay precio válido para la operación principal, se debe mostrar un fallback controlado:
  - ocultar precio, o
  - mostrar `Consultar precio`

- `is_available` no debe mostrarse de forma aislada si entra en conflicto con `status`; la ficha debe usar una única representación comercial derivada de `status`.

## Casos de uso principales

### CU-01 Imprimir ficha desde detalle de propiedad

1. El usuario abre una propiedad.
2. Pulsa `Imprimir ficha` o `Generar ficha de escaparate`.
3. El sistema abre la vista comercial.
4. El usuario revisa la maquetación.
5. Pulsa `Imprimir`.
6. El navegador abre el diálogo nativo.
7. El usuario decide imprimir en papel o guardar como PDF.

### CU-02 Generar PDF para envío manual

1. El usuario abre la ficha.
2. Pulsa `Imprimir`.
3. En el diálogo del navegador selecciona `Guardar como PDF`.
4. Obtiene un PDF listo para compartir.

### CU-03 Propiedad con datos parciales

1. El usuario abre una propiedad con campos opcionales vacíos.
2. La ficha oculta bloques incompletos.
3. La salida sigue siendo limpia y comercialmente válida.

## Historias de usuario

- Como agente, quiero imprimir una ficha profesional de una propiedad en menos de 3 clics.
- Como agente, quiero que la ficha muestre fotos, precio y características sin información interna.
- Como agente, quiero poder guardarla como PDF directamente desde el navegador.
- Como responsable comercial, quiero una presentación consistente para todas las propiedades.
- Como usuario del CRM, quiero que la ficha funcione incluso si faltan algunos datos opcionales.

## Criterios de aceptación

- Existe una acción visible desde el detalle de propiedad para abrir la ficha de escaparate.
- La ficha muestra fotos, precio, características, descripción, estado físico y estado comercial.
- La ficha no muestra contacto, agente, coordenadas exactas ni datos internos.
- El estado comercial se presenta con etiquetas legibles para negocio.
- El botón de impresión dispara la impresión nativa del navegador.
- La impresión en A4 desde Chrome produce un resultado legible, ordenado y sin controles del CRM.
- La opción `Guardar como PDF` desde el navegador genera un documento usable sin ajustes manuales complejos.
- Si faltan fotos o campos secundarios, el layout no se rompe.

## Métricas de éxito

- Tiempo medio para obtener una ficha imprimible.
- Número de propiedades con ficha generada por semana.
- Reducción de uso de herramientas externas para preparar material de escaparate.
- Feedback cualitativo de agentes sobre calidad visual y utilidad comercial.
- Ratio de impresiones exitosas sin necesidad de edición manual.

## Riesgos

- Inconsistencia entre estados actuales del CRM y nomenclatura comercial esperada.
- Calidad desigual de imágenes subidas por usuarios.
- Descripciones demasiado largas que rompan la restricción de 1 página.
- Diferencias de impresión entre navegadores.
- Posibles dudas sobre si la dirección exacta es considerada dato sensible o comercialmente permitida.

## Dependencias

- `PropertyService` y endpoint actual de propiedades.
- Tipos de propiedad y esquema de datos existente.
- Decisión de negocio sobre qué campos son públicamente imprimibles.
- Validación de diseño con stakeholders comerciales.

## Decisiones abiertas

- Confirmar si `pending` debe traducirse siempre como `Reservada`.
- Confirmar si debe mostrarse la referencia de inmueble.
- Confirmar si se muestra dirección parcial, solo zona o ambas.
- Confirmar si la ficha v1 será solo A4 vertical o también horizontal.
- Confirmar si se permite elegir entre plantilla simple y plantilla con más fotos en futuras fases.
- Confirmar si `off_market` debe poder imprimirse o debe bloquearse.

## Fuera de alcance inicial pero recomendables a futuro

- Varias plantillas de ficha.
- Inclusión de branding de oficina o agente.
- QR hacia la ficha pública o landing del inmueble.
- Exportación PDF server-side.
- Lote de impresión de varias propiedades.
- Personalización por idioma.
- Versión específica para escaparate de cristal y otra para dossier comercial.

## Propuesta de implementación por fases

### Fase 1

- Ruta/vista dedicada.
- Diseño comercial base.
- Botón `Imprimir`.
- CSS de impresión A4.
- Mapeo de estados y filtrado de datos sensibles.

### Fase 2

- Ajustes de branding.
- Mejora de placeholders e imágenes.
- Variantes de composición según volumen de fotos.

### Fase 3

- Múltiples plantillas.
- Exportación PDF avanzada o backend si negocio lo necesita.

## QA y validación

Se debe validar al menos:

- Propiedad en venta con fotos completas.
- Propiedad en alquiler con datos mínimos.
- Propiedad sin imágenes.
- Propiedad con descripción extensa.
- Propiedad con estado `pending`, `sold` y `rented`.
- Impresión en Chrome con `Guardar como PDF`.
- Impresión en papel A4 con escala por defecto.

## Sugerencia de tareas derivadas

- Diseñar wireframe de la ficha.
- Definir mapping oficial de estados comerciales.
- Implementar la ruta de ficha de escaparate.
- Crear componentes reutilizables de header, galería, facts y footer imprimible.
- Añadir estilos `@media print`.
- Añadir pruebas de render de estados y fallbacks de datos.
- Documentar la funcionalidad en `docs/modules/propiedades.md` cuando se implemente.
