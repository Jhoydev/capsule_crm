# Modulo de Registro Multi-Paso

## Objetivo

Implementa un flujo guiado de captura de datos distribuido en varios pasos, con estado persistente en cliente y transformación final a payload API.

## Ruta principal

- `src/app/(app)/multiStepForm/page.tsx`

## Pasos definidos

Actualmente el flujo base contiene:

1. Seleccionar país
2. Datos personales
3. Datos empresa
4. Facturación
5. Pago

Además existe un paso adicional opcional:

- `promotion`

## Componentes y piezas clave

- `src/stores/useFormStepStore.ts`
  - Guarda datos acumulados del formulario.
  - Controla `currentStep`.
  - Expone `next`, `back`, `reset`, `goToStep` y `updateSteps`.
- `src/app/(app)/multiStepForm/components/StepIndicator.tsx`
  - Muestra progreso visual.
- `src/app/(app)/multiStepForm/components/StepContainer.tsx`
  - Renderiza el componente del paso activo.
- Pasos:
  - `SelectCountryStep.tsx`
  - `PersonalDataStep.tsx`
  - `CompanyStep.tsx`
  - `BillingStep.tsx`
  - `PaymentStep.tsx`
  - `PromotionStep.tsx`
- Envío:
  - `src/hooks/multiStepForm/useFormSubmit.ts`
  - `src/hooks/multiStepForm/formDataToApiPayload.ts`
  - `src/services/formService.ts`

## Flujo funcional

1. La página monta `StepIndicator` y `StepContainer`.
2. El store mantiene el paso actual y los datos de cada bloque.
3. Cada paso escribe en una clave propia del store.
4. Al finalizar, `useFormSubmit` transforma el estado plano a una estructura jerárquica.
5. `sendFormData` hace `POST /api/enviar-formulario`.
6. Si la respuesta es correcta, el store se resetea.

## Forma del payload

El frontend traduce el estado hacia esta estructura:

- `pais`
- `usuario`
- `empresa`
- `facturacion`
- `pago`

La transformación ocurre en `formDataToApiPayload.ts`.

## Estado actual del módulo

- El flujo está bien separado y es fácil de extender.
- Zustand es la pieza central del módulo.
- Existe soporte para inyectar pasos dinámicamente con `updateSteps`.

## Riesgos y puntos de atención

- El endpoint `/api/enviar-formulario` parece ser interno al frontend o placeholder; hay que validar su existencia real antes de depender de él.
- El módulo mezcla labels en español con estructura técnica en inglés; conviene mantener consistencia al ampliarlo.
