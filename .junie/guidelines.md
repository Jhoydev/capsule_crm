### Project Guidelines

#### Contexto del Proyecto
**Capsule CRM** es una plataforma de gestión de relaciones con clientes diseñada específicamente para el sector inmobiliario. Facilita a los agentes la administración de su cartera de propiedades, el seguimiento de contactos y la creación de una presencia digital profesional.

#### Casos de Uso Principales

##### 1. Gestión Inmobiliaria
- **Estructura**: Los componentes se encuentran en `src/app/(app)/properties/components`. Se utiliza un patrón de edición por secciones (ej. `locationEdition.tsx`, `pricesEdition.tsx`).
- **Formularios**: Centralizados en `src/components/property/forms`. El hook `usePropertyForm` gestiona la lógica de `react-hook-form` y la sincronización entre campos (ej. `status` y `is_available`).
- **Imágenes**: Se utiliza un componente de galería (`galleryPhotos.tsx`) y un modal de imágenes. El servicio `PropertyService` maneja la subida y eliminación de imágenes.
- **Mapas**: Integración de mapas dinámicos en `src/app/(app)/properties/components/map` para localización y búsqueda.

##### 2. Administración de Contactos
- **Tablas de Datos**: Implementadas con `TanStack Table` en `src/app/(app)/contacts/components/contacts-table`. Incluyen acciones por fila y filtrado.
- **Edición**: Similar a propiedades, la edición se divide en secciones como `personalInformationEdit.tsx` y `professionEdit.tsx`.
- **Servicios**: `ContactService` centraliza las peticiones CRUD y estadísticas por medio de contacto.

##### 3. Analíticas y Dashboard
- **Componentes Base**: Uso de gráficos generalizados (`GeneralizedBarChart.tsx`, `GeneralizedPieChart.tsx`) basados en `Recharts`.
- **Lógica**: El hook `useDashboard` consume el `DashboardService` para proporcionar datos de estado de propiedades, tipos y medios de contacto.
- **Visualización**: Los componentes como `PropertyStatus.tsx` envuelven los gráficos base para pasarles la configuración específica.

##### 4. E-Cards Personalizadas
- **Gestión de Temas**: Los temas se definen en `src/app/(app)/ecard/data/defaultThemes.ts`. El usuario puede seleccionar temas predefinidos o crear uno personalizado.
- **Elementos Dinámicos**: La e-card se compone de elementos de tipo `button`, `text` y `social`.
- **Editor en Tiempo Real**: `EcardEditor.tsx` permite modificar la configuración y ver los cambios instantáneamente en `EcardPreview.tsx`.

##### 5. Formularios Multi-paso
- **Estado Global**: Se utiliza Zustand (`src/stores/useFormStepStore.ts`) para mantener el progreso del formulario, los datos de cada paso y la navegación.
- **Definición de Pasos**: Los pasos se definen de forma centralizada en `src/app/(app)/multiStepForm/data/formSteps`.
- **Payloads**: La utilidad `formDataToApiPayload.ts` se encarga de transformar el estado plano del store en la estructura jerárquica que requiere la API.

#### Build & Configuration
The project is built with **Next.js 14** (App Router).

- **Environment Setup**: Ensure you have a `.env` or `.env.local` file with the necessary API URLs (e.g., `NEXT_PUBLIC_BACKEND_URL`).
- **Build Command**: Use `npm run build` to verify the project's integrity.
  - *Note*: If you encounter "use client" errors in new pages that use client-side hooks (like `useRouter`), ensure the `"use client"` directive is at the top of the file.
- **Import Aliases**: Use `@/` to refer to the `src/` directory (configured in `tsconfig.json` and `vitest.config.ts`).

#### Testing
The project uses **Vitest** for both unit testing and Storybook interaction testing.

- **Running Tests**:
  - Run all tests: `npm test` or `npx vitest run`.
  - Run specific test: `npx vitest run path/to/test`.
- **Unit Tests**:
  - Files should follow the `**/*.test.ts(x)` naming convention.
  - Use `vitest` imports for `expect`, `test`, `describe`, etc.
- **Storybook Tests**:
  - The project uses `@storybook/experimental-addon-test` to run stories as tests.
  - Configuration is located in `vitest.config.ts` under the `storybook` workspace project.
- **Adding a Test Example**:
  Create a file named `src/example.test.ts`:
  ```typescript
  import { expect, test } from 'vitest';

  test('example logic', () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
  ```
  Run it with: `npx vitest run src/example.test.ts`.

#### Development Patterns
- **Services**: Business logic and API calls should be encapsulated in service classes (e.g., `src/services/property.service.ts`).
- **Hooks**: Use custom hooks to manage component state and side effects (e.g., `src/hooks/property/useCreateProperty.tsx`).
- **Forms**: The project uses `react-hook-form` with `zod` for validation. Schemas are located in `src/schemas/`.
- **UI Components**: Shared UI components are built with **Shadcn UI** and located in `src/components/ui/`.
- **State Management**: `useSWR` is used for data fetching and caching.

#### Common Troubleshooting
- **Missing Imports**: Ensure `propertySchema` and other shared schemas are imported from `@/schemas/` and not from `lib/`.
- **Type Casting**: When dealing with Zod-inferred types and API models, you may need to use `as any` or explicit mapping if enums don't match exactly between the backend and frontend.
