Caso de Uso: Analíticas y Dashboard

1. Descripción
Proporciona una visión panorámica y visual del rendimiento de la agencia inmobiliaria. A través de gráficos interactivos, los agentes pueden analizar la distribución de sus propiedades por estado y tipo, así como los medios por los cuales llegan los contactos.

2. Flujo de Usuario
Entrada: Carga de la página del Dashboard.
Proceso: 
- El sistema consume el `DashboardService` para obtener datos agregados.
- Los datos se procesan y se pasan a componentes especializados (`PropertyStatus`, `PropertyTypes`, `ContactContactMedium`).
- Se utilizan gráficos generalizados (`GeneralizedPieChart`, `GeneralizedBarChart`) para renderizar la información.
Salida: Representación visual (gráficos de tarta y barras) de las métricas clave del negocio.

3. Stack Tecnológico Aplicado
UI: `Recharts` para la generación de gráficos, `Card` de Shadcn UI para contenedores.
Lógica: Hook `useDashboard` (si existe) o consumo directo de `DashboardService` con `useSWR`.
Comunicación: Endpoint `/api/dashboard` para obtener el resumen estadístico.

4. Reglas de Negocio
- Los gráficos deben ser dinámicos y reflejar el estado actual de la base de datos.
- Si no hay datos disponibles, se debe mostrar un estado de "No data available".
- La distribución se centra en tres ejes: Estado de propiedades (Status), Tipos de inmuebles (Types) y Origen de contactos (Medium).
