# AGENTS.md

## Structure

This is **not** a monorepo workspace. Each of the 10 subdirectories is an independent project with its own `package.json`, `node_modules`, and lockfile. No root `package.json`, workspaces, lerna, or nx. Root `.gitignore` is empty — each project has its own.

## Micro-Frontend Architecture (Webpack 5 Module Federation)

Three MF providers and one consumer form the core:

| Provider | Port | Exposes via MF | Key details |
|---|---|---|---|
| `vue-cli-vue2-common` | `8080` | `vue2`, `./BaseText.vue` | Singleton Vue 2 runtime |
| `vue-cli-vue3-common` | `8081` | `./BaseTextVue3.vue`, `./BaseText.vue` | Singleton Vue 3 runtime |
| `vue-cli-vue3.x-demo` | `9527` | `vue3DemoPlugin` (`./src/mfp/index.js`, `./components`, `./TLWaveView`) | Conditional — only active when `VUE_APP_MF=true` |

Consumer: `vue-cli-vue3-biz` (port `9999`, publicPath `/vue-cli-vue3-biz`) loads all three remotes.

### Loading patterns in `vue-cli-vue3-biz/src/mfp/`

- **Dev** (`indexDev.js`): direct dynamic `import()` of `vue3DemoPlugin`.
- **Prod** (`indexProd.js`): `<script>` injection of remote entries → `__webpack_init_sharing__('default')` → `plugin.init(__webpack_share_scopes__.default)` — see `loadAllComponentsProd()`.
- The `vue-cli-vue3-biz` consumer intentionally does **not** declare `shared: { vue }` in its MF config (commented out in `deploy.js`).

### Cross-Version Vue Bridge

`vue-cli-vue3-biz/src/utils/index.js` has `vue2ToVue3()` — creates a child Vue 2 instance mounted to a DOM element inside a Vue 3 component wrapper. Required because `vue-cli-vue2-common` exposes Vue 2 for runtime use.

## Key Commands

```bash
# Vue CLI projects (vue-cli-*)
cd vue-cli-vue3.x-demo
npm run serve       # dev at :9527
npm run build       # production build
npm run mf          # dev with MF enabled (VUE_APP_MF=true), exposes remoteEntry at :9527
npm run mfb         # build with MF enabled
npm run sit         # serve with --mode sit
npm run waveview    # build component library (lib mode) to dist/vue-waveview
npm run cylinder    # build component library (lib mode) to dist/vue-cylinder-progress

cd vue-cli-vue3-biz
npm run serve       # dev at :9999, consumes MF remotes

cd vue-cli-vue2-common
npm run serve       # dev at :8080

cd vue-cli-vue3-common
npm run serve       # dev at :8081

# Vite projects (vite-*, create-vue-*, vue3-ts-demo)
npm run dev         # vite dev server
npm run build       # vite build (some also run vue-tsc first)
npm run test:unit   # vitest (create-vue-vue3 only)
```

## TypeScript & Lint Coverage

| Project | TS | Lint |
|---|---|---|
| `create-vue-vue3` | — | ESLint + Prettier |
| `create-vue-vue3-ts` | vue-tsc 1.8.25 | ESLint + @vue/typescript |
| `vite-vue3` | — | — |
| `vite-vue3-ts` | vue-tsc 1.8.25 | — |
| `vue3-ts-demo` | vue-tsc 2.2.0 | — |
| `vue-cli-*` (all 5) | — (Babel) | ESLint |

For TS projects: `npm run build` already runs `vue-tsc -b && vite build` (or `vue-tsc --build --force` in parallel with build via `run-p`). No separate type-check step needed.

## Notable Quirks

- `vue-cli-vue3.x-demo` has a custom webpack loader (`myloader.js`) for `*.custom-loader` files and a custom plugin (`myplugin.js`).
- `vue-cli-vue3.x-demo` env modes: `.env.development` (default), `.env.sit` (`NODE_ENV=development`), `.env.mf` (sets `VUE_APP_MF=true`).
- `vue-cli-vue3.x-demo` non-MF builds use aggressive `splitChunks` (separate chunks for vue, components, views, vendors, common). MF mode disables chunking entirely.
- `vue-cli-vue3-biz` dynamic MF loading switches based on build mode — production proxies remote URLs to `127.0.0.1:10001/10002/10003`.
- `vue3-ts-demo` has `base: '/vue3-ts-demo/'` in vite config (sub-path deployment).
- No CI, no pre-commit hooks, no testing in most projects (only `create-vue-vue3` has vitest).
