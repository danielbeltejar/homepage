import React, { ReactNode } from 'react';
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

  return (
    <>
      <div>
        <video autoPlay loop muted playsInline webkit-playsinline="true"  className="neuphormism-video">
          <source src="/assets/videos/background.webm" type="video/webm" />
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
