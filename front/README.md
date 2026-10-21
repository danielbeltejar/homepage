# Public frontend

The public site is an Astro SSR application with React islands. Astro owns the
HTML document, routes (`/`, `/posts`, `/post/[filename]`) and the Node runtime;
React owns the interactive homepage carousel, filters, posts and browser
behaviour in `HomePageIsland`.

The existing `/api` gateway contract is unchanged. The frontend only reads the
public posts API and does not alter backend services.

## Local development

```bash
npm install
npm run dev
```

Build and serve the standalone SSR output with:

```bash
npm run build
npm run preview
```

`npm run build` also creates responsive WebP variants under the ignored
`public/assets/optimized/` directory. Interactive controls use the existing
Tailwind palette and component styles directly.

## Runtime checks

The container listens on port `8080` and exposes `/healthz`. The Clarity
runtime configuration remains supplied by the existing Kubernetes ConfigMap at
`/runtime-config.js`.
