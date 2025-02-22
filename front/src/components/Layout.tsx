import React, { useState, useEffect, ReactNode, useRef } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cycle1 = [0.2, 0.25, 0.3, 0.35, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0.0, 0.05, 0.1, 0.15, 0.2];
  const cycle2 = [0.2, 0.15, 0.1, 0.05, 0.0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.35, 0.3, 0.25, 0.2];
  const [img1Index, setImg1Index] = useState<number>(0);
  const [img2Index, setImg2Index] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stepTime = 350;
    intervalRef.current = setInterval(() => {
      setImg1Index(i => {
        const newIndex = (i + 1) % cycle1.length;
        return newIndex;
      });
      setImg2Index(i => {
        const newIndex = (i + 1) % cycle2.length;
        return newIndex;
      });
    }, stepTime);
    return () => {
      if (intervalRef.current) {
        console.debug("Clearing interval and resetting animation.");
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className="neuphormism-image"
        style={{ opacity: cycle1[img1Index], transition: 'opacity 0.3s ease-in-out' }}
      ></div>
      <div
        className="neuphormism-image-rotated"
        style={{ opacity: cycle2[img2Index], transition: 'opacity 0.3s ease-in-out' }}
      ></div>
      <div className="dot-grid"></div>
      <div className="App flex flex-col text-text dark:text-dark-text text-11 lg:w-[740px] w-full">
        <div className="shadow-lg">
          <Header />
          <Hero />
        </div>
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
