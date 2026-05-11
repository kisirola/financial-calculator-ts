# Financial Calculator

A financial calculator application built with vanilla TypeScript and Vite — no frameworks, just clean TypeScript compiled and bundled for the browser.

## Tech Stack

- **TypeScript** — strongly typed application logic
- **Vite** — fast dev server and build tool
- **Vanilla JS/TS** — no frontend framework dependencies

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/kisirola/financial-calculator-ts.git
cd financial-calculator-ts
npm install
```

### Development

```bash
npm run dev
```

Opens a local dev server at `http://localhost:5173` with hot module replacement.

### Build

```bash
npm run build
```

Compiles TypeScript and bundles the app into the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally to verify it before deployment.

## Project Structure

```
financial-calculator-ts/
├── public/          # Static assets (favicon, etc.)
├── src/
│   └── main.ts      # Application entry point
├── index.html       # HTML shell
├── tsconfig.json    # TypeScript configuration
├── package.json
└── vite.config.ts   # (if present) Vite configuration
```

## License

MIT