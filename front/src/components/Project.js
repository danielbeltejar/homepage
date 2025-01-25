import React from 'react';
import ProjectCard from './ProjectCard.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const projects = [

  {
    videoSrc: "assets/videos/fym.webm",
    description: "A self-made online game inspired by the art style and mechanics of an old flash game. Offering a unique blend of retro and modern elements that provide an engaging and immersive experience for players. This project was made to inquire into creating and implementing a complex online game system using a range of modern technologies.",
    technologies: ["C#", "Python", "Redis", "MongoDB", "K8s"],
    visitLink: "https://fym.danielbeltejar.es",
    githubLink: "https://github.com/danielbeltejar?tab=repositories&q=frontyardmonsters&type=&language=&sort=/"
  },
  {
    videoSrc: "assets/videos/bigmac-index.webm",
    description: "Developed a web scraping project that extracted pricing data from Uber Eats across different countries. Using web scraping techniques, I retrieved food prices and organized and stored the data. Additionally, I implemented an Rest endpoint that allows the data to be retrieved and presented in a styled format on a webpage.",
    technologies: ["Python", "FastAPI", "BeautifulSoup", "PostgreSQL", "JavaScript", "K8s"],
    visitLink: "https://bigmac.danielbeltejar.es/",
    githubLink: "https://github.com/danielbeltejar?tab=repositories&q=bigmac-index&type=&language=&sort="
  },
  {
    videoSrc: "assets/videos/pokemon-weather-map.webm",
    description: "Created a Pokémon Weather Map app that displays real-time weather info for Spanish provinces, linking Pokémon characters to weather conditions. It retrieves data from OpenWeatherMap API, generating a color-coded map based on temperature. Pokémon are assigned based on local weather and shown on the map, offering an engaging and informative user experience.",
    technologies: ["Python", "Pillow", "FastAPI", "JavaScript", "K8s"],
    visitLink: "https://weather.danielbeltejar.es/",
    githubLink: "https://github.com/danielbeltejar/pokemon-weather-map"
  },
  {
    videoSrc: "assets/videos/emojitranslator.webm",
    description: "A small project to test differents languages made backends for a single web app. It can encode and decode text to emojis on the two ways in realtime while typing as other public big translate services. It have a metric to benchmark the two differents backends, as they do the same under the hood.",
    technologies: ["Python", "FastAPI", "Go", "Tailwind", "JavaScript", "K8s"],
    visitLink: "https://danielbeltejar.es/translate/",
    githubLink: "https://github.com/danielbeltejar?tab=repositories&q=emoji-translator&type=&language=&sort="
  },
  {
    videoSrc: "assets/videos/comugamers.webm",
    description: "A solution for storing and managing the data of 6 million users. Allows for the manipulation of users data, statistics, leaderboards and game mechanics, to provide a comprehensive system for managing user data. Redis was used to enable efficient and scalable data management. This solution effectively handles thousands of simultaneous users reliably.",
    technologies: ["Java", "Redis", "PostgreSQL"],
    visitLink: "https://github.com/comugamerses/",
    githubLink: "https://github.com/danielbeltejar/ComuGlobal/"
  },
  {
    videoSrc: "assets/videos/kafka.webm",
    description: "A self-made project that collects public data on Spanish real estate to analyze the evolution of housing prices over time. Gather, process, and present data in a user-friendly format. This project demonstrates the skill in working with big data and web technologies to create a valuable resource for understanding trends in the housing market.",
    technologies: ["Spark", "Python", "TypeScript", "Tailwind"],
    visitLink: "https://es.realstate.danielbeltejar.es/",
    githubLink: "https://github.com/danielbeltejar/es-realstate-kafka/"
  },
];

const Projects = () => {
  return (
    <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10'>
      <div class="flex flex-row align-middle items-center mt-xs group w-full">
        <a href="#projects"
          class="text-accent dark:text-dark-accent opacity-0 absolute group-hover:opacity-100 transition-opacity duration-300">
          <FontAwesomeIcon icon={faLink} />
        </a>
        <h2 class="text-accent dark:text-dark-accent font-bold text-2xl group-hover:cursor-pointer group-hover:pl-7 group-hover:underline underline-offset-4 transition-all duration-300"
          onclick="location.href='#projects';">Projects</h2>
      </div>

      <p class="mt-4 mb-10 text-12">
        I also have a number of personal projects that I work on in my free time. These projects allow me to
        explore new and emerging technologies and to expand my
        skillset in a variety of different areas. Through these projects, I have gained valuable experience and
        knowledge that I can apply to my professional work. I am always looking for new and exciting
        opportunities to learn and grow, and my personal projects are an important part of that journey.
      </p>

      <div class="h-full flex justify-center w-full">
        <div class="h-full flex lg:flex-row lg:flex-wrap lg:content-start gap-5 lg:justify-center lg:overflow-x-auto overflow-x-scroll">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;