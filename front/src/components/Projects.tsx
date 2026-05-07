import ProjectCard from "./ProjectCard";
import SectionHeader from './SectionHeader';
import ScrollIndicator from './ScrollIndicator';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    videoSrc: "assets/videos/chatbot.webm",
    description: "A car dealership page featuring a chatbot interface that mimics a live chat. The chatbot leverages a large language model to assist users in exploring car options, providing detailed information and guiding them through the buying process. This project showcases an LLM integration.",
    technologies: ["LLM", "React", "Python", "FastAPI", "K8s"],
    visitLink: "https://chatbot.danielbeltejar.es",
    githubLink: "https://github.com/danielbeltejar/landing-chatbot",
    postLink: "post/building-a-chatbot-powered-ai-landing-page-with-react-and-fastapi"
  },
  {
    videoSrc: "assets/videos/fym.webm",
    description: "A self-made online game inspired by the art style and mechanics of an old flash game. Offering a unique blend of retro and modern elements that provide an engaging and immersive experience for players. This project was made to inquire into creating and implementing a complex online game system using a range of modern technologies.",
    technologies: ["C#", "Python", "Redis", "MongoDB", "K8s"],
    visitLink: "https://fym.danielbeltejar.es",
    githubLink: "https://github.com/danielbeltejar?tab=repositories&q=frontyardmonsters&type=&language=&sort=/",
    postLink: "post/fym-game-introduction"
  },
  {
    videoSrc: "assets/videos/bigmac-index.webm",
    description: "Developed a web scraping project that extracted pricing data from Uber Eats across different countries. Using web scraping techniques, I retrieved food prices and organized and stored the data. Additionally, I implemented an Rest endpoint that allows the data to be retrieved and presented in a styled format on a webpage.",
    technologies: ["Python", "FastAPI", "BeautifulSoup", "PostgreSQL", "JavaScript", "K8s"],
    visitLink: "https://bigmac.danielbeltejar.es/",
    githubLink: "https://github.com/danielbeltejar?tab=repositories&q=bigmac-index&type=&language=&sort=",
    postLink: ""
  },
  {
    videoSrc: "assets/videos/pokemon-weather-map.webm",
    description: "Created a Pokémon Weather Map app that displays real-time weather info for Spanish provinces, linking Pokémon characters to weather conditions. It retrieves data from OpenWeatherMap API, generating a color-coded map based on temperature. Pokémon are assigned based on local weather and shown on the map, offering an engaging and informative user experience.",
    technologies: ["Python", "Pillow", "FastAPI", "JavaScript", "K8s"],
    visitLink: "https://weather.danielbeltejar.es/",
    githubLink: "https://github.com/danielbeltejar/pokemon-weather-map",
    postLink: ""
  },
  {
    videoSrc: "assets/videos/comugamers.webm",
    description: "A solution for storing and managing the data of 6 million users. Allows for the manipulation of users data, statistics, leaderboards and game mechanics, to provide a comprehensive system for managing user data. Redis was used to enable efficient and scalable data management. This solution effectively handles thousands of simultaneous users reliably.",
    technologies: ["Java", "Redis", "PostgreSQL"],
    visitLink: "https://github.com/comugamerses/",
    githubLink: "https://github.com/danielbeltejar/ComuGlobal/",
    postLink: ""
  },
  {
    videoSrc: "assets/videos/kafka.webm",
    description: "A self-made project that collects public data on Spanish real estate to analyze the evolution of housing prices over time. Gather, process, and present data in a user-friendly format. This project demonstrates the skill in working with big data and web technologies to create a valuable resource for understanding trends in the housing market.",
    technologies: ["Spark", "Python", "TypeScript", "Tailwind"],
    visitLink: "https://es.realstate.danielbeltejar.es/",
    githubLink: "https://github.com/danielbeltejar/es-realstate-kafka/",
    postLink: ""
  },

];

const Projects = () => {
  const CARD_WIDTH = 320;
  const GAP = 20;
  
  const { scrollContainerRef, activeIndex } = useScrollPosition({ 
    itemWidth: CARD_WIDTH, 
    gap: GAP 
  });

  const [isDesktop, setIsDesktop] = useState(false);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);
  const [archExpanded, setArchExpanded] = useState(false);
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);

  // Lock body scroll when overlay open
  useEffect(() => {
    if (archExpanded) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [archExpanded]);

  // Three.js 3D particle scene (only runs when overlay is open)
  useEffect(() => {
    if (!archExpanded) return;
    const canvas = threeCanvasRef.current;
    if (!canvas) return;
    const SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    const script = document.createElement('script');
    script.src = SRC;
    let clean: (() => void) | null = null;
    script.onload = () => {
      const T = (window as any).THREE;
      const scene = new T.Scene();
      const w = canvas.parentElement!.offsetWidth;
      const h = 500;
      canvas.width = w; canvas.height = h;
      const camera = new T.PerspectiveCamera(60, w/h, 0.1, 1000);
      camera.position.set(0, 0, 30);
      const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Floating torus knots
      const knots: any[] = [];
      for (let i = 0; i < 3; i++) {
        const geo = new T.TorusKnotGeometry(0.5 + Math.random() * 0.5, 0.2, 48, 16);
        const mat = new T.MeshBasicMaterial({ color: [0x6b4532, 0xd4a574, 0x8b6b4a][i], transparent: true, opacity: 0.12 + i * 0.04, wireframe: true });
        const mesh = new T.Mesh(geo, mat);
        mesh.position.set((i - 1) * 10, Math.sin(i * 2) * 3, -5 + i * 2);
        mesh.rotation.set(Math.random() * 6, Math.random() * 6, 0);
        scene.add(mesh);
        knots.push(mesh);
      }
      
      // Particles
      const pc = 200;
      const pos = new Float32Array(pc * 3);
      const vel: {x:number,y:number,z:number}[] = [];
      for (let i = 0; i < pc; i++) {
        pos[i*3]=(Math.random()-0.5)*50; pos[i*3+1]=(Math.random()-0.5)*30; pos[i*3+2]=(Math.random()-0.5)*25;
        vel.push({x:(Math.random()-0.5)*0.02,y:(Math.random()-0.5)*0.02,z:(Math.random()-0.5)*0.015});
      }
      const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3));
      const mat = new T.PointsMaterial({ color: 0xd4a574, size: 0.08, transparent: true, opacity: 0.35, blending: T.AdditiveBlending });
      const pts = new T.Points(geo, mat);
      scene.add(pts);
      
      // Connecting lines between nearby particles
      const linesMat = new T.LineBasicMaterial({ color: 0x6b4532, transparent: true, opacity: 0.04 });
      const linesGeo = new T.BufferGeometry();
      const linesPos = new Float32Array(pc * 6); // start + end per pair
      linesGeo.setAttribute('position', new T.BufferAttribute(linesPos, 3));
      const lineSegments = new T.LineSegments(linesGeo, linesMat);
      scene.add(lineSegments);
      
      let anim = 0;
      const tick = () => {
        anim = requestAnimationFrame(tick);
        const arr = pts.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pc; i++) {
          arr[i*3] += vel[i].x; arr[i*3+1] += vel[i].y; arr[i*3+2] += vel[i].z;
          if (Math.abs(arr[i*3]) > 25) vel[i].x *= -1;
          if (Math.abs(arr[i*3+1]) > 15) vel[i].y *= -1;
          if (Math.abs(arr[i*3+2]) > 12) vel[i].z *= -1;
        }
        pts.geometry.attributes.position.needsUpdate = true;
        
        // Update lines - connect nearby particles
        const lp = lineSegments.geometry.attributes.position.array as Float32Array;
        let li = 0;
        for (let i = 0; i < pc && li < lp.length; i += 3) {
          for (let j = i + 1; j < pc && li < lp.length; j += 2) {
            const dx = arr[i*3] - arr[j*3], dy = arr[i*3+1] - arr[j*3+1], dz = arr[i*3+2] - arr[j*3+2];
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist < 6 && li + 5 < lp.length) {
              lp[li] = arr[i*3]; lp[li+1] = arr[i*3+1]; lp[li+2] = arr[i*3+2];
              lp[li+3] = arr[j*3]; lp[li+4] = arr[j*3+1]; lp[li+5] = arr[j*3+2];
              li += 6;
            }
          }
        }
        lineSegments.geometry.setDrawRange(0, li / 3);
        lineSegments.geometry.attributes.position.needsUpdate = true;
        
        // Rotate knots
        knots.forEach((k, i) => { k.rotation.x += 0.005 * (i + 1); k.rotation.y += 0.008 * (i + 1); });
        
        renderer.render(scene, camera);
      };
      tick();
      
      const resize = () => { /* skip for fixed height */ };
      clean = () => cancelAnimationFrame(anim);
    };
    document.head.appendChild(script);
    return () => { if (clean) clean(); if (script.parentNode) script.parentNode.removeChild(script); };
  }, [archExpanded]);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Track scroll position for desktop carousel dots
  useEffect(() => {
    const el = desktopScrollRef.current;
    if (!el || !isDesktop) return;
    const handleScroll = () => {
      const idx = Math.round(el.scrollLeft / (CARD_WIDTH + GAP));
      setDesktopActiveIndex(idx);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  const scrollToCard = (index: number) => {
    const el = desktopScrollRef.current || scrollContainerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.snap-center');
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const offset = card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2;
      el.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  const scrollBy = (dir: 'prev' | 'next') => {
    const el = desktopScrollRef.current || scrollContainerRef.current;
    if (!el) return;
    const totalItems = projects.length;
    const currentIdx = isDesktop ? desktopActiveIndex : activeIndex;
    const newIdx = Math.max(0, Math.min(totalItems - 1, currentIdx + (dir === 'next' ? 1 : -1)));
    scrollToCard(newIdx);
  };

  const pipelineStages = [
    { icon: '📦', title: 'Git Push', subtitle: 'main branch', color: '#333',
      detail: 'Code pushed to GitHub triggers Jenkins webhook. Multi-repo monorepo with per-service Dockerfiles.', tech: ['GitHub','Webhook'] },
    { icon: '🔨', title: 'Jenkins CI', subtitle: 'K8s-native agents', color: '#d24949',
      detail: 'Jenkins spawns ephemeral K8s pods per build. BuildKit daemonless multi-stage builds with registry cache. Dockerfile lint via droast. Trivy vulnerability scanning (IaC + image).', tech: ['Jenkins','BuildKit','Trivy','droast'] },
    { icon: '🐳', title: 'Harbor', subtitle: 'Private registry', color: '#60b932',
      detail: 'Minimal distroless images pushed to Harbor. Image signing, vulnerability scanning, retention policies. Cache layers shared across builds via registry cache.', tech: ['Harbor','OCI','distroless'] },
    { icon: '⎈', title: 'ArgoCD', subtitle: 'GitOps deploy', color: '#ff8615',
      detail: 'Helm charts stored in dedicated repo. ArgoCD syncs automatically via webhook. Health checks, self-healing, automated rollbacks. Multi-environment: lab, pre, pro.', tech: ['ArgoCD','Helm','GitOps'] },
    { icon: '☸️', title: 'Kubernetes', subtitle: 'Production', color: '#326ce5',
      detail: 'Cilium CNI, ingress-nginx, cert-manager with Let\'s Encrypt DNS01. Longhorn distributed storage. Prometheus+Loki+Grafana stack. OPA Gatekeeper policies. Vault for secrets.', tech: ['Cilium','cert-manager','Longhorn','Prometheus','Grafana','Vault'] },
  ];

  const infraToolDescriptions = [
    { name: 'Cilium', desc: 'eBPF-based CNI. Network policies, service mesh, Hubble observability. Replaces kube-proxy for faster routing.' },
    { name: 'Longhorn', desc: 'Cloud-native distributed block storage. Replicated volumes, snapshots, backups, disaster recovery. RWX PVC support for shared data.' },
    { name: 'Prometheus', desc: 'Metrics collection & alerting. Scrapes /metrics endpoints across cluster. AlertManager routes alerts to Discord.' },
    { name: 'Loki', desc: 'Log aggregation system. Collects container logs via Promtail daemonsets. Label-based indexing, tight Grafana integration.' },
    { name: 'Grafana', desc: 'Unified dashboards for metrics (Prometheus) and logs (Loki). Custom panels, alert visualization, multi-cluster views.' },
    { name: 'OPA Gatekeeper', desc: 'Policy-as-code admission controller. Enforces security standards, resource limits, and compliance rules cluster-wide.' },
    { name: 'Vault', desc: 'Secrets management by HashiCorp. Dynamic DB credentials, PKI certificates, encryption-as-a-service. Kubernetes auth integration.' },
    { name: 'Trivy', desc: 'Comprehensive security scanner. CI pipeline scans IaC misconfigurations + image CVEs. Central Trivy server for cached vulnerability DB.' },
    { name: 'ArgoCD', desc: 'GitOps continuous delivery engine. Syncs Helm charts from Git repo automatically. Auto-healing, drift detection, multi-cluster support.' },
    { name: 'Jenkins', desc: 'CI orchestrator running on K8s. Spawns ephemeral pods (BuildKit, Helm, Trivy, droast). Pipeline-as-code via declarative Jenkinsfile.' },
  ];

  return (
    <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10 shadow-elevated rounded-2xl inner-glow'>
      <SectionHeader title="Projects" link="#projects" />

      <p className="mt-4 mb-10 text-12">
        I build personal projects to explore new technologies. All projects are deployed in Kubernetes with CI/CD pipelines across various environments, using Jenkins for Docker multi-stage builds with minimal, distroless images, securized Helm deployments and managed by ArgoCD.
      </p>
      <div className="h-full w-full overflow-hidden">
        {/* Mobile: horizontal scroll with snap */}
        <div className="lg:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="h-full overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
          >
            <div className="flex flex-nowrap gap-5">
              {/* Spacer to center first card */}
              <div className="flex-shrink-0 snap-start" style={{ width: 'calc((100vw - 320px) / 2)' }} />
              {projects.map((project, index) => (
                <div key={index} className="snap-center flex-shrink-0 cursor-pointer" onClick={() => scrollToCard(index)}>
                  <ProjectCard {...project} />
                </div>
              ))}
              {/* Spacer to center last card */}
              <div className="flex-shrink-0 snap-start" style={{ width: 'calc((100vw - 320px) / 2)' }} />
            </div>
          </div>
          {/* Mobile fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-window to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-window z-10" />
        </div>
        
        {/* Desktop: contained horizontal carousel */}
        <div className="hidden lg:block relative">
          <div 
            ref={desktopScrollRef}
            className="flex overflow-x-auto gap-5 snap-x snap-mandatory scroll-smooth hide-scrollbar pb-2"
          >
            {/* Spacer to center first card */}
            <div className="flex-shrink-0 snap-start" style={{ width: 'calc(50% - 170px)' }} />
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 snap-center cursor-pointer" 
                onClick={() => scrollToCard(index)}
              >
                <ProjectCard {...project} />
              </div>
            ))}
            {/* Spacer to center last card */}
            <div className="flex-shrink-0 snap-start" style={{ width: 'calc(50% - 170px)' }} />
          </div>
          
          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-window to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-window z-10" />
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={() => scrollBy('prev')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Previous">‹</button>
        <ScrollIndicator 
          totalItems={projects.length} 
          activeIndex={isDesktop ? desktopActiveIndex : activeIndex}
          onPillClick={isDesktop ? scrollToCard : (index: number) => {
            if (scrollContainerRef.current) {
              const itemTotalWidth = CARD_WIDTH + GAP;
              scrollContainerRef.current.scrollTo({
                left: index * itemTotalWidth,
                behavior: 'smooth'
              });
            }
          }}
        />
        <button onClick={() => scrollBy('next')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Next">›</button>
      </div>

      {/* === Architecture Showcase Divider === */}
      <div className="mt-8 pt-6 border-t border-accent/10 invisible hidden">
        <button onClick={() => setArchExpanded(true)} className="w-full group flex items-center justify-center gap-3 py-3 px-6 rounded-2xl bg-background/50 hover:bg-background border border-white/30 hover:border-accent/20 shadow-card hover:shadow-card-hover transition-all duration-300">
          <span className="text-lg">⚙️</span>
          <span className="font-serif font-bold text-sm text-accent/70 group-hover:text-accent transition-colors">Platform Architecture & CI/CD Pipeline</span>
          <span className="text-accent/30 group-hover:text-accent/60 transition-colors text-xs hidden sm:inline">— tap to explore</span>
          <svg className="w-4 h-4 text-accent/30 group-hover:text-accent/60 transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
        <p className="text-center text-11 text-accent/30 mt-2">Jenkins · BuildKit · Trivy · Harbor · Helm · ArgoCD · Kubernetes</p>
      </div>

      {/* === Full-page Architecture Overlay === */}
      <AnimatePresence>
        {archExpanded && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setArchExpanded(false); }}
          >
            <div className="fixed inset-0 bg-[#eae1d2]/95 backdrop-blur-xl" />
            <canvas ref={threeCanvasRef} className="fixed inset-0 z-10 pointer-events-none" />
            <div className="relative min-h-screen flex flex-col items-center py-12 px-4">
              <button onClick={() => setArchExpanded(false)} className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:scale-105 transition-all duration-200 text-sm">✕</button>

              <div className="w-full max-w-4xl relative z-20">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-bold text-accent mb-3">Platform Architecture</h2>
                  <p className="text-accent/50 text-sm max-w-xl mx-auto">Every project follows this fully automated CI/CD pipeline — from code push to production deployment on Kubernetes, with security scanning at every stage.</p>
                </motion.div>

                {/* Pipeline stages - full detail always visible, equal height */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
                  {pipelineStages.map((stage, i) => (
                    <motion.div
                      key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }}
                      className="flex flex-col bg-white/85 backdrop-blur-md rounded-2xl p-5 border border-white/50 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md flex-shrink-0" style={{ background: stage.color }}>{i + 1}</div>
                        <span className="text-2xl flex-shrink-0">{stage.icon}</span>
                        <div className="min-w-0">
                          <h4 className="font-serif font-bold text-sm text-accent truncate">{stage.title}</h4>
                          <p className="text-10 text-accent/40 truncate">{stage.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-10 text-accent/60 leading-relaxed flex-1">{stage.detail}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-accent/5">
                        {stage.tech.map(t => <span key={t} className="text-10 px-2 py-0.5 rounded-full bg-accent/5 text-accent/50 font-medium">{t}</span>)}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Service Architecture */}
                <div className="mb-16">
                  <h3 className="font-serif text-xl font-bold text-accent text-center mb-8">🏗️ Service Architecture</h3>
                  <p className="text-xs text-accent/30 text-center -mt-6 mb-8">Microservices organized by namespace with full infrastructure stack</p>
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#326ce5]/20 shadow-card">
                      <div className="flex items-center gap-2 mb-4"><span className="w-2 h-2 rounded-full bg-[#326ce5]" /><h4 className="font-serif font-bold text-sm text-accent">Edge Layer</h4><span className="text-10 text-accent/25 ml-auto">ns: ingress-nginx</span></div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-accent/40 bg-accent/3 px-4 py-1.5 rounded-full"><span>🌍 Internet</span><span className="text-accent/20">→</span><span>🔒 TLS</span><span className="text-accent/20">→</span><span>⚡ ingress-nginx</span></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                          <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-white/30"><span className="text-xl mt-0.5">⚡</span><div><p className="text-xs font-bold text-accent/70">ingress-nginx</p><p className="text-10 text-accent/40 leading-relaxed mt-1">Kubernetes ingress controller. Routes HTTP/HTTPS traffic to internal services. TLS termination, path-based routing, load balancing.</p></div></div>
                          <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-white/30"><span className="text-xl mt-0.5">🔒</span><div><p className="text-xs font-bold text-accent/70">cert-manager</p><p className="text-10 text-accent/40 leading-relaxed mt-1">Automates TLS certificate lifecycle. Let's Encrypt DNS01 via OVH webhook. Auto-renews certificates before expiry.</p></div></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-accent/20 shadow-card text-center"><span className="text-xl">🔀</span><p className="text-xs font-bold text-accent/70 mt-1">API Gateway (nginx)</p><p className="text-10 text-accent/30 mt-0.5">ns: apigw · Reverse proxy & routing</p></div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#60b932]/20 shadow-card">
                      <div className="flex items-center gap-2 mb-4"><span className="w-2 h-2 rounded-full bg-[#60b932]" /><h4 className="font-serif font-bold text-sm text-accent">Frontend Services</h4><span className="text-10 text-accent/25 ml-auto">ns: front</span></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-white/30"><span className="text-xl mt-0.5">🌐</span><div><div className="flex items-center gap-2"><p className="text-xs font-bold text-accent/70">front</p><span className="text-10 px-1.5 py-0.5 rounded bg-accent/5 text-accent/35">React·Vite·Tailwind</span></div><p className="text-10 text-accent/40 leading-relaxed mt-1">Public homepage. Server-side rendered via nginx. Responsive design with lazy-loaded assets and video backgrounds.</p></div></div>
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-white/30"><span className="text-xl mt-0.5">⚙️</span><div><div className="flex items-center gap-2"><p className="text-xs font-bold text-accent/70">admin-front</p><span className="text-10 px-1.5 py-0.5 rounded bg-accent/5 text-accent/35">React·shadcn·JWT</span></div><p className="text-10 text-accent/40 leading-relaxed mt-1">Admin dashboard. JWT-authenticated CRUD for blog posts. Protected routes with automatic token refresh.</p></div></div>
                      </div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#d24949]/20 shadow-card">
                      <div className="flex items-center gap-2 mb-4"><span className="w-2 h-2 rounded-full bg-[#d24949]" /><h4 className="font-serif font-bold text-sm text-accent">Backend Services</h4><span className="text-10 text-accent/25 ml-auto">ns: backend</span></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-white/30"><span className="text-xl mt-0.5">📝</span><div><div className="flex items-center gap-2"><p className="text-xs font-bold text-accent/70">posts</p><span className="text-10 px-1.5 py-0.5 rounded bg-accent/5 text-accent/35">FastAPI·Python·PVC</span></div><p className="text-10 text-accent/40 leading-relaxed mt-1">Read-only API serving Markdown posts from shared RWX PVC. Health-checked, horizontally scalable.</p></div></div>
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-white/30"><span className="text-xl mt-0.5">🔐</span><div><div className="flex items-center gap-2"><p className="text-xs font-bold text-accent/70">admin-back</p><span className="text-10 px-1.5 py-0.5 rounded bg-accent/5 text-accent/35">FastAPI·bcrypt·JWT</span></div><p className="text-10 text-accent/40 leading-relaxed mt-1">Admin CRUD API. bcrypt password hashing, JWT token auth. Creates/edits/deletes posts on shared volume.</p></div></div>
                      </div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-accent/10 shadow-card">
                      <div className="flex items-center gap-2 mb-4"><span className="w-2 h-2 rounded-full bg-accent/40" /><h4 className="font-serif font-bold text-sm text-accent">Platform Infrastructure</h4><span className="text-10 text-accent/25 ml-auto">cluster-wide</span></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {infraToolDescriptions.map(t => (
                          <div key={t.name} className="group flex items-start gap-2 p-3 rounded-xl bg-background/30 hover:bg-background/60 border border-white/20 hover:border-white/40 transition-all duration-200 cursor-default">
                            <span className="text-10 font-bold text-accent/30 mt-0.5 flex-shrink-0 w-4">▸</span>
                            <div className="min-w-0"><p className="text-11 font-bold text-accent/60 group-hover:text-accent/80 transition-colors">{t.name}</p><p className="text-10 text-accent/35 leading-relaxed mt-0.5">{t.desc}</p></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                  {[{l:'Projects',v:'14+'},{l:'K8s Services',v:'45+'},{l:'CI/CD Stages',v:'10'},{l:'Deploys',v:'Automated'}].map(s => (
                    <div key={s.l} className="text-center p-5 rounded-2xl bg-white/70 border border-white/40 shadow-card">
                      <div className="text-2xl font-bold text-accent font-serif">{s.v}</div><div className="text-xs text-accent/40 mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>

                <p className="text-center text-accent/30 text-sm italic pb-16">&ldquo;Every project, from a personal blog to a real-time multiplayer game, runs the same battle-tested pipeline.&rdquo;</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;