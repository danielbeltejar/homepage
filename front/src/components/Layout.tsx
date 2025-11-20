import React, { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Certifications from './Certifications';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay might be blocked, that's fine
        });
      }
    }
  }, []);

  return (
    <>
      <div>
        <video 
          ref={videoRef}
          loop 
          muted 
          playsInline 
          webkit-playsinline="true"  
          className="neuphormism-video"
          preload="none"
        >
          <source src="/assets/videos/background.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="dot-grid"></div>
      <div className="App flex flex-col text-text dark:text-dark-text text-11 lg:w-[740px] w-full">
        <div className="shadow-lg">
          <Header />
          <Hero />
        </div>
        {children}
        {location.pathname === "/" && <Certifications />}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
