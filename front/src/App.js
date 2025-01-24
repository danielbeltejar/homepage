import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Project from './components/Project';
import Footer from './components/Footer';
import Post from './components/Post.tsx';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import './index.css';

function App() {
  return (
    <div class=" flex flex-col items-center">
      <Router>
        <div className="App flex flex-col text-text dark:text-dark-text text-11 shadow-md lg:w-[740px] w-full">
          <Header />
          <Hero />
          <Routes>
            <Route path="/post/:filename" element={<Post />} />
            <Route path="/" element={<Project />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;