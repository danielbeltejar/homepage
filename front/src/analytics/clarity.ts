const CLARITY_SCRIPT_ID = 'microsoft-clarity-script';

type ClarityFunction = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: ClarityFunction;
    __DANIEL_CONFIG__?: {
      clarityProjectId?: string;
    };
  }
}

const projectId = (
  window.__DANIEL_CONFIG__?.clarityProjectId
  ?? import.meta.env.VITE_CLARITY_PROJECT_ID
  ?? ''
).trim();

/** Pilot mode: load Clarity in every environment where a project ID is set. */
export function isClarityEnabled(): boolean {
  return projectId.length > 0;
}

function createClarityStub(): ClarityFunction {
  const stub = ((...args: unknown[]) => {
    stub.q = stub.q ?? [];
    stub.q.push(args);
  }) as ClarityFunction;

  stub.q = [];
  return stub;
}

/** Load Clarity before React renders and queue calls until the script loads. */
export function initializeClarity(): void {
  if (!isClarityEnabled() || document.getElementById(CLARITY_SCRIPT_ID)) return;

  window.clarity = window.clarity ?? createClarityStub();

  const script = document.createElement('script');
  script.id = CLARITY_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
  document.head.appendChild(script);
}
