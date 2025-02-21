import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Project from './components/Project';
import Footer from './components/Footer';
import Post from './components/Post';
import Layout from './components/Layout';

import './index.css';

function App() {
  return (
    <div className="flex flex-col items-center">
      <Router>
        <Layout>
          <Routes>
            <Route path="/post/:filename" element={<Post />} />
            <Route path="/" element={<Project />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;