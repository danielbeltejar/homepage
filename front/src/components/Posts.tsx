import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from './SectionHeader';

interface PostObject {
    filename: string;
    title: string;
    date: string;
    content: string;
}

function extractFirstImageUrl(content: string): string | null {
    const body = content.replace(/\$\$\$[\s\S]*?\$\$\$/, '');
    const match = body.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
}

function stripMarkdown(text: string, maxLen: number): string {
    // Strip $$$ front matter
    const cleaned = text.replace(/\$\$\$[\s\S]*?\$\$\$/, '')
        // Strip heading lines (## Title etc)
        .replace(/^#{1,6}\s+.*$/gm, '')
        // Strip remaining markdown syntax
        .replace(/[*\[\]()!`~>_=\-|]/g, '')
        // Replace newlines with spaces
        .replace(/\n+/g, ' ')
        // Collapse multiple spaces
        .replace(/\s{2,}/g, ' ')
        .trim();
    return cleaned.length > maxLen ? cleaned.substring(0, maxLen).trim() + '...' : cleaned;
}

export default function Posts() {
    const [posts, setPosts] = useState<PostObject[]>([]);
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://danielbeltejar.es/api/posts`);
                if (!response.ok) throw new Error('Failed to fetch posts');
                const jsonResponse = await response.json();
                setPosts(jsonResponse.posts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handleScroll = () => {
            const cardWidth = 280 + 16; // w-[280px] + gap-4
            const idx = Math.round(el.scrollLeft / cardWidth);
            setActiveIndex(idx);
        };
        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [posts]);

    const scrollToCard = (index: number) => {
        if (!scrollRef.current) return;
        const cards = scrollRef.current.querySelectorAll('.snap-center');
        if (cards[index]) {
            const el = cards[index] as HTMLElement;
            const container = scrollRef.current;
            const offset = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
            container.scrollTo({ left: offset, behavior: 'smooth' });
        }
    };

    const scrollBy = (dir: 'prev' | 'next') => {
        if (!scrollRef.current) return;
        const cardWidth = 280 + 16;
        const newIdx = Math.max(0, Math.min(posts.length - 1, activeIndex + (dir === 'next' ? 1 : -1)));
        scrollToCard(newIdx);
    };

    return (
        <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10 shadow-elevated rounded-2xl inner-glow min-h-[400px]'>
            <SectionHeader title="Posts" link="/posts" />

            <p className="mt-4 mb-8 text-12">
                Welcome to my blog! Here, I share insights into my personal projects, hobby projects, and various topics related to my career.
            </p>

            <div className="relative">
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth hide-scrollbar pb-2"
                >
                    {/* Spacer to center first card */}
                    <div className="flex-shrink-0 snap-start" style={{ width: 'calc(50% - 148px)' }} />
                    
                    {posts.length === 0 && (
                        <div className="flex gap-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="flex-shrink-0 w-[280px] h-[340px] rounded-2xl skeleton" />
                            ))}
                        </div>
                    )}
                    {posts.map((post) => {
                        const imageUrl = extractFirstImageUrl(post.content);
                        return (
                            <div 
                                key={post.filename}
                                onClick={() => navigate(`/post/${post.filename.replace('.md', '')}`)}
                                className="flex-shrink-0 w-[280px] snap-center cursor-pointer group"
                            >
                                {/* Date badge */}
                                <div className="flex items-center gap-2 mb-3 ml-1">
                                    <span className="text-xs font-medium text-accent/60 bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                                        {post.date}
                                    </span>
                                </div>
                                
                                {/* Card */}
                                <div className="bg-background rounded-2xl shadow-card hover:shadow-card-hover border border-white/30 overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                                    {/* Thumbnail */}
                                    <div className="w-full h-40 bg-gray-200 overflow-hidden skeleton-simple">
                                        {imageUrl && (
                                            <img 
                                                src={imageUrl} 
                                                alt="" 
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        )}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-serif font-bold text-base text-accent line-clamp-2 mb-2 leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                                            {stripMarkdown(post.content, 120)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {/* Spacer to center last card */}
                    <div className="flex-shrink-0 snap-start" style={{ width: 'calc(50% - 148px)' }} />
                </div>

                {/* Gradient fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-window to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-window z-10" />
            </div>

            {/* Pagination */}
            {posts.length > 0 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button onClick={() => scrollBy('prev')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Previous posts">‹</button>
                    <div className="flex gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-white/40">
                        {posts.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToCard(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    i === activeIndex ? 'bg-accent w-6' : 'bg-white w-2 shadow-sm outline outline-1 outline-gray-200'
                                }`}
                                aria-label={`Go to post ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button onClick={() => scrollBy('next')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Next posts">›</button>
                </div>
            )}
        </div>
    );
}