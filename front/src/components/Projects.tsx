import ProjectCard from "./ProjectCard";
import SectionHeader from './SectionHeader';
import ScrollIndicator from './ScrollIndicator';
import PlatformArchitecture from './PlatformArchitecture';
import PredefinedButton from './Button';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { faServer } from '@fortawesome/free-solid-svg-icons';

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
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [archExpanded, setArchExpanded] = useState(false);

  // Track scroll position + center first card on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const idx = Math.round((el.scrollLeft - CARD_WIDTH - GAP) / (CARD_WIDTH + GAP));
      setActiveIndex(Math.max(0, Math.min(projects.length - 1, idx)));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    // Center first card on load
    const cards = el.querySelectorAll('.snap-center');
    if (cards[0]) {
      const card = cards[0] as HTMLElement;
      const offset = card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2;
      el.scrollLeft = offset;
    }
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.snap-center');
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const offset = card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2;
      el.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  const scrollBy = (dir: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const newIdx = Math.max(0, Math.min(projects.length - 1, activeIndex + (dir === 'next' ? 1 : -1)));
    scrollToCard(newIdx);
  };

  return (
    <div className='mt-16 mb-16 p-10 shadow-elevated rounded-2xl inner-glow'>
      <SectionHeader title="Projects" link="#projects" />

      <p className="mt-4 mb-10 text-12">
        I build personal projects to explore new technologies. All projects are deployed in Kubernetes with CI/CD pipelines across various environments, using Jenkins for Docker multi-stage builds with minimal, distroless images, securized Helm deployments and managed by ArgoCD.
      </p>
      <div className="h-full w-full overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 snap-x snap-proximity scroll-smooth hide-scrollbar pb-8 pt-4"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%)' }}
        >
          {/* Empty card — replica of ProjectCard but empty */}
          <div className="flex-shrink-0 w-80 h-[460px] glass-card rounded-2xl p-0 overflow-hidden flex flex-col relative pointer-events-none select-none">
            <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden bg-gray-200 skeleton-simple" />
            <div className="flex-1 pt-[168px] px-5 pb-5 flex flex-col">
              <div className="flex-1" />
              <div className="flex flex-row gap-2">
                <div className="flex-1 h-[48px] rounded-xl bg-accent/5" />
                <div className="flex-1 h-[48px] rounded-xl bg-accent/5" />
              </div>
            </div>
          </div>
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
      </div>
      
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => scrollBy('prev')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Previous">‹</button>
        <ScrollIndicator 
          totalItems={projects.length} 
          activeIndex={activeIndex}
          onPillClick={scrollToCard}
        />
        <button onClick={() => scrollBy('next')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Next">›</button>
      </div>

      {/* === Architecture Showcase === */}
      {!archExpanded && (
        <div className="mt-8 pt-6 border-t border-accent/10 flex justify-center">
          <PredefinedButton
            icon={faServer}
            text="Platform Architecture"
            onClick={() => setArchExpanded(true)}
            newTab={false}
            className="w-full max-w-md"
          />
        </div>
      )}

      {/* === Architecture Overlay === */}
      <PlatformArchitecture isOpen={archExpanded} onClose={() => setArchExpanded(false)} />
    </div>
  );
};

export default Projects;