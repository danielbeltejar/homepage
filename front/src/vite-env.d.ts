/// <reference types="astro/client" />

interface ViewTransition {
  finished: Promise<void>;
}

interface Document {
  startViewTransition?: (update: () => void | Promise<void>) => ViewTransition;
}

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_CLARITY_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
