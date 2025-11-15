import ProjectCard from "./ProjectCard";
import SectionHeader from './SectionHeader';

const projects = [
  {
    videoSrc: "assets/videos/chatbot.webm",
    description: "A car dealership page featuring a chatbot interface that mimics a live chat. The chatbot leverages a large language model to assist users in exploring car options, providing detailed information and guiding them through the buying process. This project showcases an LLM integration.",
    technologies: ["LLM", "React", "Python", "FastAPI", "K8s"],
    visitLink: "https://chatbot.danielbeltejar.es",
    githubLink: "https://github.com/danielbeltejar/landing-chatbot",
    postLink: ""
  },
  {
    videoSrc: "assets/videos/fym.webm",
    description: "A self-made online game inspired by the art style and mechanics of an old flash game. Offering a unique blend of retro and modern elements that provide an engaging and immersive experience for players. This project was made to inquire into creating and implementing a complex online game system using a range of modern technologies.",
    technologies: ["C#", "Python", "Redis", "MongoDB", "K8s"],
    visitLink: "https://fym.danielbeltejar.es",
    githubLink: "https://github.com/danielbeltejar?tab=repositories&q=frontyardmonsters&type=&language=&sort=/",
    postLink: ""
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
  return (
    <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10 shadow-lg'>
      <SectionHeader title="Projects" link="#projects" />

      <p className="mt-4 mb-10 text-12">
        I build personal projects to explore new technologies. All projects are deployed in Kubernetes with CI/CD pipelines across various environments, using Jenkins for Docker multi-stage builds with minimal, distroless images, securized Helm deployments and managed by ArgoCD.
      </p>
      <div className="h-full flex justify-center w-full">
        <div className="h-full flex lg:flex-row lg:flex-wrap lg:content-start gap-5 lg:justify-center lg:overflow-x-auto overflow-x-scroll">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;