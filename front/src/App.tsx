import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Project from './components/Project';
import Footer from './components/Footer';
import Post from './components/Post';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';

function App() {
  return (

    <div className="flex flex-col items-center">
      <Router>
        <div className="App flex flex-col text-text dark:text-dark-text text-11 shadow-md lg:w-[740px] w-full">
          <Header />
          <Hero />
          <Routes>
            <Route path="/post/:filename" element={<Post />} />
            <Route path="/" element={<Project />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;