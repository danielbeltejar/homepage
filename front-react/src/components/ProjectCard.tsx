import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from "@fortawesome/free-brands-svg-icons"

// Define the type for the project data
interface ProjectProps {
  videoSrc: string;
  posterSrc: string;
  description: string;
  technologies: string[];
  visitLink: string;
  githubLink: string;
}

const ProjectCard = ({ videoSrc, posterSrc, description, technologies, visitLink, githubLink }: ProjectProps) => {
  return (
    <div className="project group group-hover:shadow-md flex flex-col h-96 w-80 transition-all duration-500 hyphens-auto text-justify bg-background dark:bg-dark-background hover:bg-secondary-button px-s py-s rounded-3xl shadow-inner">
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="w-full h-[160px] object-cover"
        >
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
          Sorry, your browser does not support HTML5 video.
        </video>
      </div>

      <div className="flex flex-wrap mt-2 gap-1 justify-start h-[6rem] content-start">
        {technologies.map((tech, index) => (
          <p key={index} className="text-sm text-center bg-slate-50 dark:bg-dark-accent px-2 rounded-full shadow-md">
            {tech}
          </p>
        ))}
      </div>

      <p
        className="text-xs max-h-0 w-full overflow-hidden group-hover:max-h-48 transition-colors duration-700"
        style={{ maxHeight: '12rem' }}
      >
        {description}
      </p>

      <div className="flex flex-row gap-2 mt-auto">
        <a
          target="_blank"
          href={visitLink}
          className="flex flex-row drop-shadow-md gap-2 flex-1 text-black hover:dark:text-dark-text dark:text-dark-window dark:hover:text-dark-window transition-colors duration-300 rounded-md text-sm px-3 py-2 justify-center items-center bg-primary-button hover:bg-accent hover:dark:bg-dark-accent"
        >
          <faArrowUpRightFromSquare />
          Visit
        </a>
        <a
          target="_blank"
          href={githubLink}
          className="flex flex-row drop-shadow-md gap-2 flex-1 text-black hover:dark:text-dark-text dark:text-dark-window dark:hover:text-dark-window transition-colors duration-300 rounded-md text-sm px-3 py-2 justify-center items-center bg-primary-button hover:bg-accent hover:dark:bg-dark-accent"
        >
          <faGithub />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;