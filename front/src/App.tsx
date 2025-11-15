import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Project from './components/Projects';
import Post from './components/Post';
import Posts from './components/Posts';
import Layout from './components/Layout';

import './index.css';

function App() {
  const isDevelopment = import.meta.env.MODE === 'development';
  const [showOutlines, setShowOutlines] = useState(isDevelopment);

  useEffect(() => {
    if (showOutlines && isDevelopment) {
      document.body.classList.add('dev-outlines');
    } else {
      document.body.classList.remove('dev-outlines');
    }
  }, [showOutlines, isDevelopment]);

  return (
    <div className="flex flex-col items-center">
      {isDevelopment && (
        <button
          onClick={() => setShowOutlines(!showOutlines)}
          className="fixed top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
          title="Toggle development outlines"
        >
          {showOutlines ? '🔲 Hide Outlines' : '⬜ Show Outlines'}
        </button>
      )}
      <Router>
        <Layout>
          <Routes>
            <Route path="/post/:filename" element={<Post />} />
            <Route path="/" element={<Project />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;