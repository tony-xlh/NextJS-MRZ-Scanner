# NextJS-MRZ-Scanner

This is a Next.js demo of an MRZ scanner using [Dynamsoft Capture Vision Bundle for JavaScript](https://www.npmjs.com/package/dynamsoft-capture-vision-bundle). The single bundle package replaces the previous set of separate packages (`dynamsoft-core`, `dynamsoft-license`, `dynamsoft-capture-vision-router`, `dynamsoft-label-recognizer`, `dynamsoft-code-parser`, `dynamsoft-camera-enhancer`, ...).

[Online demo](https://next-js-mrz-scanner.vercel.app/)

You can apply for a 30-day trial license [here](https://www.dynamsoft.com/customer/license/trialLicense/?product=dcv&package=cross-platform).

## Key points of the v11 bundle integration

- `src/configure.ts`: one import from `dynamsoft-capture-vision-bundle`; `LicenseManager.initLicense(key, true)` runs at module load, and `CoreModule.engineResourcePaths = { rootDirectory: "https://cdn.jsdelivr.net/npm/" }` makes the SDK load its engine files (.wasm/.worker.js) from the CDN. The `rootDirectory` form is required in bundlers like Next.js/webpack — the SDK appends the versioned package path itself, so putting a full `dist/` path there breaks sibling resolution.
- The bundle touches `window` at import time, so `MRZScanner` and `MRZResultTable` are loaded via `next/dynamic` with `ssr: false`.
- `MRZScanner.tsx`: `CaptureVisionRouter` preloads the deep-learning models with `appendDLModelBuffer(["MRZCharRecognition","MRZTextLineRecognition"])`, loads the MRZ text-line specifications from `/template.json` via `initSettings`, and delivers frames through `CameraView` + `CameraEnhancer`. Results arrive via `addResultReceiver({ onRecognizedTextLinesReceived })` — the receiver is now a plain object, `CapturedResultReceiver.createInstance()` is no longer needed.
- `MRZResultTable.tsx`: `CodeParser` / `CodeParserModule` are exported by the bundle, so the manual CDN paths for the code-parser module are gone.
- `public/template.json`: the MRZ template now uses the `MRZCharRecognition` + `MRZTextLineRecognition` model names supplied by the bundle (the old `"CharacterModelName": "MRZ"` spec from standalone Label Recognizer is obsolete).
- Version pin: `package.json` pins `3.4.3000`. The `3.6.x` releases have a regression in the standalone code parser that makes `CodeParser.parse()` throw `[Code Parser] No license found.`, which breaks MRZ field parsing; remove the pin once fixed upstream.

## Getting started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. Click **Start Scanning**, point the camera at the MRZ of a passport or ID card (the two 44-character lines at the bottom), and the decoded fields are shown in the result table.

