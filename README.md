# Mini Project 1 — Product Inventory

A product inventory app built with React, TypeScript, and Vite. View products, add a product, change its stock status, and delete products. Summary cards show total, in-stock, and out-of-stock counts.

## Requirements

- Node.js 22 or newer and npm
- Git
- Access to this repository if it is private

## Clone and run

Clone the repository and open its folder:

```bash
git clone https://github.com/majedhmoud/mini-project-1.git
cd mini-project-1
```

Install the dependencies from the committed lockfile:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`). Changes to source files appear automatically while the server is running. Press `Ctrl+C` to stop the server.

## Project commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact dependencies in `package-lock.json`. |
| `npm run dev` | Start the Vite development server. |
| `npm run lint` | Check the code with ESLint. |
| `npm run build` | Run TypeScript checks and build the app into `dist/`. |
| `npm run preview` | Serve an existing production build locally. |

To build and preview the app:

```bash
npm run build
npm run preview
```

Open the URL printed by the preview server. Run the build command again after changing the source to update the preview.

## Project structure

- `src/components/` — product form, product cards, header, and statistics
- `src/App.tsx` — product state and app layout
- `src/index.css` — application styles
- `public/products.json` — initial sample products
- `docs/` — project requirements and practice documents

## Data storage

Product changes are held in memory and reset when the page reloads. There is no backend or database, and no environment variables are required to run the project.
