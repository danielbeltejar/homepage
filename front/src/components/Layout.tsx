import React, { ReactNode } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App flex flex-col text-text dark:text-dark-text text-11 lg:w-[740px] w-full">
      <div className='shadow-lg'>
        <Header />
        <Hero />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
