import { useEffect, useState } from 'react';
import { initializeClarity } from '../analytics/clarity';
import Layout from './Layout';
import Post from './Post';
import Posts from './Posts';
import Projects from './Projects';

type Page = 'home' | 'posts' | 'post';

interface HomePageIslandProps {
  page?: Page;
  filename?: string;
}

function readStoredBoolean(key: string, fallback: boolean) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export default function HomePageIsland({ page = 'home', filename }: HomePageIslandProps) {
  const isDevelopment = import.meta.env.MODE === 'development';
  const [showOutlines, setShowOutlines] = useState(isDevelopment);

  useEffect(() => {
    initializeClarity();
  }, []);

  useEffect(() => {
    setShowOutlines(readStoredBoolean('showOutlines', isDevelopment));
  }, [isDevelopment]);

  useEffect(() => {
    document.body.classList.toggle('dev-outlines', showOutlines && isDevelopment);
    try {
      window.localStorage.setItem('showOutlines', JSON.stringify(showOutlines));
    } catch {
      // Storage can be disabled by privacy settings; the in-memory state still works.
    }
    return () => document.body.classList.remove('dev-outlines');
  }, [showOutlines, isDevelopment]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => document.documentElement.classList.toggle('dark', media.matches);
    applyTheme();
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
  }, []);

  const content = page === 'home'
    ? <Projects />
    : page === 'posts'
      ? <Posts />
      : <Post filename={filename} />;

  return (
    <div className="flex flex-col items-center">
      {isDevelopment && (
        <button
          onClick={() => setShowOutlines((current) => !current)}
          className="fixed top-4 right-4 z-50 rounded-lg bg-red-600 px-4 py-2 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-red-700"
          title="Toggle development outlines"
        >
          {showOutlines ? '🔲 Hide Outlines' : '⬜ Show Outlines'}
        </button>
      )}
      <Layout showCertifications={page === 'home'}>{content}</Layout>
    </div>
  );
}
