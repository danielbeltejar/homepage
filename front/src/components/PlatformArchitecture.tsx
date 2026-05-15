import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faLayerGroup, faCube, faDesktop, faCodeBranch, faCogs, faShieldHalved, faHdd, faChartBar, faFileAlt, faKey, faServer, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ScrollIndicator from './ScrollIndicator';

interface PlatformArchitectureProps {
  isOpen: boolean;
  onClose: () => void;
}

const pipelineSteps = [
  {
    num: '1', title: 'Push to GitHub', icon: faCodeBranch,
    detail: 'Every push to main triggers a Jenkins webhook. Each service has its own Dockerfile and Helm chart.',
    tech: ['GitHub', 'Webhook']
  },
  {
    num: '2', title: 'Jenkins Builds in Ephemeral Pods', icon: faServer,
    detail: 'Jenkins spins up a temporary Kubernetes pod with BuildKit. The image is built without a Docker daemon, cached via Harbor registry, then scanned for vulnerabilities.',
    tech: ['Jenkins', 'BuildKit', 'Trivy', 'droast']
  },
  {
    num: '3', title: 'Image Pushed to Harbor', icon: faCube,
    detail: 'The built image , minimal and distroless , goes to a private Harbor registry. Harbor handles vulnerability scanning, signing, and retention policies.',
    tech: ['Harbor', 'OCI', 'distroless']
  },
  {
    num: '4', title: 'Helm Chart Published', icon: faFileAlt,
    detail: 'The Helm chart is packaged, versioned, and pushed to a dedicated Git repo. This becomes the single source of truth for deployments.',
    tech: ['Helm', 'Git']
  },
  {
    num: '5', title: 'ArgoCD Deploys to Kubernetes', icon: faCogs,
    detail: 'ArgoCD detects the chart change and syncs automatically. It verifies the rollout and rolls back on failure , fully automated GitOps.',
    tech: ['ArgoCD', 'GitOps', 'Auto-rollback']
  },
];

const infrastructureTools = [
  { icon: faShieldHalved, name: 'Cilium', desc: 'eBPF networking & security policies' },
  { icon: faHdd, name: 'Longhorn', desc: 'Distributed persistent storage' },
  { icon: faChartBar, name: 'Prometheus', desc: 'Metrics collection & alerting' },
  { icon: faFileAlt, name: 'Loki', desc: 'Centralized log aggregation' },
  { icon: faKey, name: 'Vault', desc: 'Dynamic secrets management' },
];

const keyNumbers = [
  { label: 'Projects deployed', value: '14+' },
  { label: 'K8s namespaces', value: '40+' },
  { label: 'CI/CD stages', value: '8' },
  { label: 'Auto rollback', value: '✓' },
];

const jenkinsDeclarativeSteps = [
  { title: 'Checkout Pipeline SCM', avgTime: '8s', runTime: '3s' },
  { title: 'Checkout Source Code', avgTime: '5s', runTime: '3s' },
  { title: 'Configure Environment', avgTime: '5s', runTime: '1s' },
  { title: 'Lint Dockerfile', avgTime: '5s', runTime: '4s' },
  { title: 'Build Docker Image', avgTime: '28s', runTime: '1m 12s' },
  { title: 'Security Scan', avgTime: '18s', runTime: '17s' },
  { title: 'Package Helm Chart', avgTime: '7s', runTime: '7s' },
  { title: 'Upload Helm to GitHub', avgTime: '16s', runTime: '18s' },
  { title: 'Deploy with Helm', avgTime: '9s', runTime: '18s' },
  { title: 'Verify Deployment', avgTime: '15s', runTime: '9s' },
];

const PlatformArchitecture: React.FC<PlatformArchitectureProps> = ({ isOpen, onClose }) => {
  const pipelineScrollRef = useRef<HTMLDivElement>(null);
  const [pipelineIndex, setPipelineIndex] = useState(0);
  const pipelineIndexRef = useRef(0);
  const CARD_W = 340;
  const GAP = 16;
  const SPACER = CARD_W / 2 + GAP / 2; // 178
  const [jenkinsStep, setJenkinsStep] = useState(-1);
  const [jenkinsPhase, setJenkinsPhase] = useState<'dim' | 'green'>('dim');

  // Track pipeline carousel scroll
  useEffect(() => {
    const el = pipelineScrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cards = el.querySelectorAll('.pipeline-card');
      if (!cards.length) return;
      const containerCenter = el.scrollLeft + el.offsetWidth / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const c = card as HTMLElement;
        const cardCenter = c.offsetLeft + c.offsetWidth / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      pipelineIndexRef.current = closestIdx;
      setPipelineIndex(closestIdx);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });

    // Center first card on mount after layout is computed
    const raf = requestAnimationFrame(() => {
      scrollToPipelineCard(0);
    });

    return () => {
      el.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToPipelineCard = (index: number) => {
    const el = pipelineScrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.pipeline-card');
    if (cards[index]) {
      pipelineIndexRef.current = index;
      setPipelineIndex(index);
      (cards[index] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const scrollPipeline = (dir: 'prev' | 'next') => {
    const currentIdx = pipelineIndexRef.current;
    const newIdx = Math.max(0, Math.min(pipelineSteps.length - 1, currentIdx + (dir === 'next' ? 1 : -1)));
    scrollToPipelineCard(newIdx);
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Jenkins pipeline simulation , loop through steps every ~3s
  useEffect(() => {
    if (!isOpen) { setJenkinsStep(-1); return; }
    setJenkinsStep(-1);
    const delay = setTimeout(() => setJenkinsStep(0), 2000);
    return () => clearTimeout(delay);
  }, [isOpen]);

  useEffect(() => {
    if (jenkinsStep < 0) return;
    const timer = setTimeout(() => {
      setJenkinsStep(prev => (prev + 1) % jenkinsDeclarativeSteps.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [jenkinsStep]);

  // Phase: dim for first 1.5s, then green
  useEffect(() => {
    if (jenkinsStep < 0) return;
    setJenkinsPhase('dim');
    const timer = setTimeout(() => setJenkinsPhase('green'), 1500);
    return () => clearTimeout(timer);
  }, [jenkinsStep]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#eae1d2]/97 overflow-y-auto overscroll-contain"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          data-testid="architecture-overlay"
        >
          <div className="min-h-screen">
            <div className="max-w-4xl mx-auto mt-10">
              {/* Header , matching section style */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <p className="text-12 max-w-2xl">
                  Every project follows the same automated pipeline , from <code className="px-1.5 py-0.5 rounded bg-accent/5 text-accent/60 text-11 font-mono">git push</code> to production on Kubernetes.
                </p>
              </motion.div>

              {/* === The Pipeline , Carousel === */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-14"
              >
                <h2 className="text-accent font-bold text-2xl mb-8">The CI/CD Pipeline</h2>

                <div className="relative">
                  <div
                    ref={pipelineScrollRef}
                    className="flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth hide-scrollbar pb-4 pt-2"
                    style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%)' }}
                    data-testid="pipeline-steps"
                  >
                    {/* Empty spacer for centering */}
                    <div className="flex-shrink-0" style={{ width: `calc(50% - ${SPACER}px)` }} />

                    {pipelineSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        className="pipeline-card flex-shrink-0 snap-center"
                        style={{ width: CARD_W }}
                      >
                        <div
                          className="group relative glass-card mx-4 rounded-xl overflow-hidden hover:shadow-elevated transition-all duration-300 h-full"
                          data-testid={`pipeline-step-${i}`}
                        >
                          <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                          <div className="p-5 flex flex-col h-full">
                            {/* Header with number */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md flex-shrink-0 bg-accent text-background">
                                {step.num}
                              </div>
                              <h4 className="font-serif font-bold text-sm text-accent flex-1 min-w-0">{step.title}</h4>
                            </div>

                            {/* Detail */}
                            <p className="text-11 text-accent/50 leading-relaxed flex-1 mb-3">{step.detail}</p>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-1.5">
                              {step.tech.map(t => (
                                <span key={t} className="text-10 px-2 py-0.5 rounded-full bg-accent/5 text-accent/40 font-medium">{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Spacer for centering */}
                    <div className="flex-shrink-0" style={{ width: `calc(50% - ${SPACER}px)` }} />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button onClick={() => scrollPipeline('prev')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Previous">
                      <FontAwesomeIcon icon={faArrowLeft} className="w-2.5 h-2.5" />
                    </button>
                    <ScrollIndicator
                      totalItems={pipelineSteps.length}
                      activeIndex={pipelineIndex}
                      onPillClick={scrollToPipelineCard}
                    />
                    <button onClick={() => scrollPipeline('next')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Next">
                      <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <hr className="border-accent/10 my-10" />

              {/* === Jenkins Declarative Pipeline Simulation === */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mb-14"
              >
                <h2 className="text-accent font-bold text-2xl mb-6">Jenkins Declarative Pipeline</h2>
                <p className="text-12 mb-8 max-w-2xl">
                  Every commit triggers a fully automated pipeline running inside ephemeral Kubernetes pods. Each stage , from source checkout and Dockerfile linting to image build, security scan, Helm packaging and deployment verification , executes in isolation with zero local state. The entire flow is defined as code in a single <a href="https://github.com/danielbeltejar/jenkins-pipeline/blob/main/Jenkinsfile" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent/60 transition-colors">Jenkinsfile</a> and averages around 3 minutes from push to production.
                </p>

                {/* Single animated step card , no AnimatePresence to avoid blink */}
                <div className="max-w-sm mx-auto" data-testid="jenkins-pipeline">
                  {jenkinsStep >= 0 && (() => {
                    const isGreen = jenkinsPhase === 'green';
                    const step = jenkinsDeclarativeSteps[jenkinsStep];
                    return (
                    <div className="glass-card mx-4 rounded-xl overflow-hidden">
                      {/* Top accent line */}
                      <div className={`h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transition-colors duration-700 ${isGreen ? 'text-emerald-400/50' : 'text-accent/10'}`} />

                      <div className="p-5">
                        {/* Header: step number + title */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-700 ${
                              isGreen
                                ? 'bg-emerald-400 text-white shadow-lg shadow-emerald-400/25'
                                : 'bg-accent/10 text-accent/30'
                            }`}
                          >
                            {jenkinsStep + 1}
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm font-semibold truncate transition-colors duration-700 ${isGreen ? 'text-emerald-400' : 'text-accent/35'}`}>
                              {step.title}
                            </p>
                            <p className="text-9 text-accent/20 font-mono mt-0.5">
                              Step {jenkinsStep + 1} of {jenkinsDeclarativeSteps.length}
                            </p>
                          </div>
                        </div>

                        {/* Time cells */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className={`rounded-lg border px-3 py-2.5 text-center transition-all duration-700 ${
                            isGreen
                              ? 'bg-emerald-400/6 border-emerald-400/10'
                              : 'bg-accent/3 border-accent/5'
                          }`}>
                            <span className="block text-9 text-accent/25 uppercase tracking-wider mb-0.5">Avg</span>
                            <span className={`text-sm font-mono font-bold transition-colors duration-700 ${isGreen ? 'text-emerald-400' : 'text-accent/30'}`}>
                              {step.avgTime}
                            </span>
                          </div>
                          <div className={`rounded-lg border px-3 py-2.5 text-center transition-all duration-700 ${
                            isGreen
                              ? 'bg-emerald-400/6 border-emerald-400/10'
                              : 'bg-accent/3 border-accent/5'
                          }`}>
                            <span className="block text-9 text-accent/25 uppercase tracking-wider mb-0.5">#437</span>
                            <span className={`text-sm font-mono font-bold transition-colors duration-700 ${isGreen ? 'text-emerald-400' : 'text-accent/30'}`}>
                              {step.runTime}
                            </span>
                            {step.paused && (
                              <span className={`block text-9 italic mt-0.5 transition-colors duration-700 ${isGreen ? 'text-amber-400/60' : 'text-accent/15'}`}>
                                paused {step.paused}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className={`relative h-1 rounded-full overflow-hidden transition-colors duration-700 ${isGreen ? 'bg-accent/5' : 'bg-accent/3'}`}>
                          <motion.div
                            key={`bar-${jenkinsStep}`}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.8, ease: 'linear' }}
                            className={`absolute inset-y-0 left-0 rounded-full transition-colors duration-700 ${
                              isGreen
                                ? 'bg-gradient-to-r from-emerald-400/60 via-emerald-400 to-emerald-400/60'
                                : 'bg-accent/15'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    );
                  })()}

                  {/* Progress dots */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {jenkinsDeclarativeSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setJenkinsStep(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === jenkinsStep
                            ? 'bg-emerald-400 w-5 shadow-sm shadow-emerald-400/30'
                            : 'bg-accent/10 hover:bg-accent/25'
                        }`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Total time footer */}
                <div className="max-w-sm mx-auto mt-3 flex items-center justify-between text-10 text-accent/30">
                  <span className="font-mono">Total avg: ~3min 36s</span>
                  <span className="font-mono">#437: ~3min 33s</span>
                </div>
              </motion.div>

              <hr className="border-accent/10 my-10" />

              {/* === What Runs on the Server === */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mb-4"
              >
                <h2 className="text-accent font-bold text-2xl mb-6">Global Architecture</h2>
                <p className="text-12 mb-8 max-w-lg">
                  Every project runs in its own <code className="px-1.5 py-0.5 rounded bg-accent/5 text-accent/60 text-11 font-mono">pre</code> and <code className="px-1.5 py-0.5 rounded bg-accent/5 text-accent/60 text-11 font-mono">pro</code> environments, across isolated namespaces.
                </p>

                <div className="space-y-3" data-testid="server-components">

                  {/* 1. Dual Ingress , online + local */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="glass-card mx-4 rounded-xl p-5 border-l-4 border-l-accent/40"
                    data-testid="edge-layer"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center text-accent/50 flex-shrink-0"><FontAwesomeIcon icon={faGlobe} className="w-4 h-4" /></span>
                      <h4 className="font-serif font-bold text-sm text-accent">Dual Ingress , Online + Local</h4>
                      <span className="text-9 font-mono text-accent/25 ml-auto">ns: ingress-nginx</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-background/40 border border-white/20">
                        <p className="text-xs font-bold text-accent/60">nginx-online</p>
                        <p className="text-10 text-accent/35 mt-0.5">Public-facing. ModSecurity + OWASP CRS WAF. Let's Encrypt TLS via {' '}<a href="/post/automating-tls-certificates-with-cert-manager" className="underline hover:text-accent/60 transition-colors">cert-manager</a>. Used by all production (<code className="text-9">pro</code>) services.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/40 border border-white/20">
                        <p className="text-xs font-bold text-accent/60">nginx-local</p>
                        <p className="text-10 text-accent/35 mt-0.5">Internal/LAN. Simpler config, no WAF. Still has full TLS via{' '}<a href="/post/automating-tls-certificates-with-cert-manager" className="underline hover:text-accent/60 transition-colors">cert-manager</a>. Used by pre-production (<code className="text-9">pre</code>) services and internal tools.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* 2. Environments: pre + pro */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.75 }}
                    className="glass-card mx-4 rounded-xl p-5 border-l-4 border-l-accent/40"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center text-accent/50 flex-shrink-0"><FontAwesomeIcon icon={faLayerGroup} className="w-4 h-4" /></span>
                      <h4 className="font-serif font-bold text-sm text-accent">Environments , pre + pro per Project</h4>
                      <span className="text-9 font-mono text-accent/25 ml-auto">40+ namespaces</span>
                    </div>
                    <p className="text-11 text-accent/45 leading-relaxed mb-3">
                      Every project has two environments. Each environment gets its own set of namespaces , one per service , keeping everything isolated.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-background/40 border border-white/20">
                        <p className="text-xs font-bold text-accent/60">pre-{`{project}`}-{`{service}`}</p>
                        <p className="text-10 text-accent/35 mt-0.5">Pre-production. Routes through <strong>nginx-local</strong>. Test domains like <code className="text-9">homepage.pre.danielbeltejar.es</code></p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/40 border border-white/20">
                        <p className="text-xs font-bold text-accent/60">pro-{`{project}`}-{`{service}`}</p>
                        <p className="text-10 text-accent/35 mt-0.5">Production. Routes through <strong>nginx-online</strong> with WAF. Real domains, full TLS.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* 3. Per-project Services */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="glass-card mx-4 rounded-xl p-5 border-l-4 border-l-accent/40"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center text-accent/50 flex-shrink-0"><FontAwesomeIcon icon={faCube} className="w-4 h-4" /></span>
                      <h4 className="font-serif font-bold text-sm text-accent">Service Template , Every Project</h4>
                      <span className="text-9 font-mono text-accent/25 ml-auto">per environment</span>
                    </div>

                    {/* Flow diagram */}
                    <div className="flex flex-col items-center gap-2 mb-4 text-10 text-accent/40 font-mono">
                      <div className="px-3 py-1.5 rounded-lg bg-background/40 border border-white/20 text-accent/60 text-xs font-semibold">Incoming request</div>
                      <span>↓</span>
                      <div className="px-3 py-1.5 rounded-lg bg-background/40 border border-white/20 text-accent/60 text-xs font-semibold">Ingress (online/local)</div>
                      <span>↓</span>
                      <div className="flex gap-4">
                        <div className="px-3 py-1.5 rounded-lg bg-background/40 border border-white/20 text-xs">front Ingress<br/><span className="text-9 text-accent/35">serves main domain</span></div>
                        <div className="px-3 py-1.5 rounded-lg bg-background/40 border border-white/20 text-xs">apigw Ingress<br/><span className="text-9 text-accent/35">serves /api/* paths</span></div>
                      </div>
                      <span>↓</span>
                      <div className="flex gap-4">
                        <div className="px-3 py-1.5 rounded-lg bg-background/40 border border-white/20 text-xs">front (React/Vite)<br/><span className="text-9 text-accent/35">nginx static server</span></div>
                        <div className="px-3 py-1.5 rounded-lg bg-background/40 border border-white/20 text-xs">apigw (Go)<br/><span className="text-9 text-accent/35">routes /api/* → backends</span></div>
                      </div>
                      <span>↓</span>
                      <div className="px-3 py-1.5 rounded-lg bg-background/40 border border-white/20 text-accent/60 text-xs font-semibold">backends</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-background/40 border border-white/20">
                        <p className="text-xs font-bold text-accent/60"><FontAwesomeIcon icon={faDesktop} className="w-3 h-3 mr-1" /> front</p>
                        <p className="text-10 text-accent/35 mt-0.5">React/Vite SPA served by nginx. Has its own Ingress for the main domain. Handles client-side routing, lazy-loaded assets.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/40 border border-white/20">
                        <p className="text-xs font-bold text-accent/60"><FontAwesomeIcon icon={faCodeBranch} className="w-3 h-3 mr-1" /> apigw (Go)</p>
                        <p className="text-10 text-accent/35 mt-0.5">Shared Go binary. Exposes backends under <code className="text-9">/api/...</code>. Config-driven routing via ConfigMap. No backend is directly reachable.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/40 border border-white/20">
                        <p className="text-xs font-bold text-accent/60"><FontAwesomeIcon icon={faCogs} className="w-3 h-3 mr-1" /> backend</p>
                        <p className="text-10 text-accent/35 mt-0.5">Only accessible through the apigw , no external Ingress. Handles business logic per project.</p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>

      
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlatformArchitecture;
