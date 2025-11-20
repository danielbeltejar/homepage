import { useEffect, useRef } from 'react';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import Button from './Button';

interface ProjectProps {
  videoSrc: string;
  description: string;
  technologies: string[];
  visitLink: string;
  githubLink: string;
  postLink: string;
}

const ProjectCard = ({ videoSrc, description, technologies, visitLink, githubLink, postLink }: ProjectProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterSrc = videoSrc.replace('assets/videos/', 'assets/images/').replace('.webm', '.jpg');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Play might be blocked
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="project group group-hover:shadow-md pt-5 pb-5 pl-5 pr-5 flex flex-col h-96 w-80 transition-all duration-500 hyphens-auto text-justify bg-background dark:bg-dark-background px-s py-s rounded-3xl shadow-inner-lg">
      <div className="relative">
        <div className='rounded-xl w-[280px] h-[161px] overflow-hidde group-hover:hidden skeleton-simple absolute'></div>
        <div className='rounded-xl w-[280px] h-[161px] overflow-hidde group-hover:hidden absolute shadow-md'>
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterSrc}
            className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-all"
          >
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
            Sorry, your browser does not support HTML5 video.
          </video> </div>
      </div>

      <div className="z-10 flex flex-wrap mt-4 gap-2 justify-start h-[6rem] content-start group-hover:hidden pt-[161px]">
        {technologies.map((tech, index) => (
          <p key={index} className="text-sm text-center text-gray-500 bg-slate-50 dark:bg-dark-accent px-2 rounded-full shadow-sm">
            {tech}
          </p>
        ))}
      </div>

      <p
        className="text-11 max-h-0 w-[280px] overflow-hidden group-hover:max-h-80 text-background dark:text-dark-background group-hover:text-black group-hover:transition-colors group-hover:duration-700"
        style={{ maxHeight: '12rem' }}
      >
        {description}
      </p>

      {postLink && postLink.trim() !== '' && (
        <div className="flex justify-center mt-auto opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500">
          <Button text="Read more" url={postLink} newTab={false} primary={true} className="flex-grow max-h-[48px]" />
        </div>
      )}

      <div className="flex flex-row gap-5 mt-auto w-full">
        <Button icon={faArrowUpRightFromSquare} text="Visit" url={visitLink} primary={true} className="flex-grow max-h-[48px]" />
        <Button icon={faGithub} text="GitHub" url={githubLink} primary={true} className="flex-grow max-h-[48px]" />
      </div>
    </div>
  );
};

export default ProjectCard;