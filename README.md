# Capsule CRM - Real Estate Management Platform

Capsule CRM is a specialized Customer Relationship Management platform designed for the real estate sector. It helps agents manage their property portfolios, track contacts, and maintain a professional digital presence through features like automated e-cards and multi-step property listings.

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/), [Jotai](https://jotai.org/), and [SWR](https://swr.vercel.app/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Maps**: [Leaflet](https://leafletjs.com/)
- **3D/Animation**: [Three.js](https://threejs.org/) (via React Three Fiber) and [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/) and [Storybook](https://storybook.js.org/)

## 📋 Prerequisites

- **Node.js**: 18.x or higher (recommended)
- **Package Manager**: `npm` (project uses `package-lock.json`)

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd capsule_crm
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_BACKEND_URL=your_backend_url
    NEXT_PUBLIC_API_BASE_URL=your_api_base_url
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🛠️ Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run storybook`: Starts the Storybook development server.
- `npm run build-storybook`: Builds the Storybook static site.
- `npm test`: Runs unit and Storybook interaction tests via Vitest.

## 🧪 Testing

The project uses **Vitest** for both unit testing and Storybook interaction testing.

- Run all tests: `npm test` or `npx vitest run`.
- Run a specific test: `npx vitest run path/to/test`.
- Interaction tests are integrated with Storybook using `@storybook/experimental-addon-test`.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
  - `(app)`: Protected application routes (Properties, Contacts, Dashboard).
  - `(auth)`: Authentication routes (Login, Register, etc.).
- `src/components`: Shared React components.
  - `ui`: Base UI components (Shadcn).
  - `property/forms`: Specialized forms for property management.
- `src/services`: API client and business logic services.
- `src/hooks`: Custom React hooks for logic reuse.
- `src/schemas`: Zod validation schemas.
- `src/stores`: Zustand/Jotai state stores.
- `src/utils`: Helper functions and data transformers.

## ✨ Key Features

1.  **Property Management**: Comprehensive CRUD for real estate properties with sectioned editing (Location, Prices, etc.).
2.  **Contact Administration**: Data tables for managing client portfolios with TanStack Table.
3.  **Analytics Dashboard**: Visual representation of property status and contact mediums using Recharts.
4.  **Custom E-Cards**: Real-time editor for creating and personalizing digital business cards.
5.  **Multi-step Forms**: Guided workflows for complex data entry using centralized step definitions.

## 📄 License

[TODO: Add License Information]
