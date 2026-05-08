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
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="glass-card rounded-2xl p-0 w-80 h-[460px] overflow-hidden transition-all duration-500 group relative flex flex-col">
      {/* Video — absolute top, slides up out of view on hover */}
      <div className="absolute top-0 left-0 right-0 z-10 h-40 overflow-hidden bg-gray-200 skeleton-simple transition-all duration-500 ease-out group-hover:-translate-y-full group-hover:opacity-0">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
          Sorry, your browser does not support HTML5 video.
        </video>
      </div>

      {/* Scrollable content — pt offsets video, shrinks on hover */}
      <div className="flex-1 flex flex-col pt-[168px] px-5 gap-3 transition-all duration-500 group-hover:pt-5 min-h-0 overflow-y-auto hide-scrollbar">
        {/* Description — clamped when idle, full on hover */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 group-hover:line-clamp-none">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2.5 py-1 rounded-full bg-accent/8 text-accent/70 border border-accent/10 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Read more — only on hover, at bottom of content */}
        {postLink && postLink.trim() !== '' && (
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            onClick={e => e.stopPropagation()}
          >
            <Button text="Read more" url={postLink} newTab={false} primary={true} className="w-full" />
          </div>
        )}
      </div>

      {/* Fixed bottom bar — always visible, never moves */}
      <div className="flex-shrink-0 flex flex-row gap-2 px-5 pb-5 pt-3" onClick={e => e.stopPropagation()}>
        <Button icon={faArrowUpRightFromSquare} text="Visit" url={visitLink} primary={true} className="flex-1" />
        <Button icon={faGithub} text="GitHub" url={githubLink} primary={true} className="flex-1" />
      </div>
    </div>
  );
};

export default ProjectCard;