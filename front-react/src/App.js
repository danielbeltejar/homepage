import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Project from './components/Project';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <div class="bg-background dark:bg-dark-background flex flex-col items-center">
      <div className="App text-text dark:text-dark-text bg-window dark:bg-dark-window text-11 py-m px-l mb-xs shadow-md lg:w-[740px]">
        <Header />
        <Hero />
        <Project />
        <Footer />
      </div>
    </div>  
  );
}

export default App;