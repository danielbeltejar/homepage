import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Project from './components/Project';
import Post from './components/Post';
import Posts from './components/Posts';
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
            <Route path="/posts" element={<Posts />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;