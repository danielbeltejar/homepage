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
            const idx = Math.round((el.scrollLeft - 296) / cardWidth);
            setActiveIndex(Math.max(0, Math.min(posts.length - 1, idx)));
        };
        el.addEventListener('scroll', handleScroll, { passive: true });
        // Center first card on load
        if (posts.length > 0) {
            const cards = el.querySelectorAll('.snap-center');
            if (cards[0]) {
                const card = cards[0] as HTMLElement;
                const offset = card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2;
                el.scrollLeft = offset;
            }
        }
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
        <div className='mt-16 mb-16 p-10 shadow-elevated rounded-2xl inner-glow min-h-[400px]'>
            <SectionHeader title="Posts" link="/posts" />

            <p className="mt-4 mb-8 text-12">
                Welcome to my blog! Here, I share insights into my personal projects, hobby projects, and various topics related to my career.
            </p>

<div className="h-full w-full overflow-hidden">
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 snap-x snap-proximity scroll-smooth hide-scrollbar pb-10 pt-4"
                    style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)' }}
                >
                    {/* Empty card — replica of post card but empty */}
                    <div className="flex-shrink-0 w-[280px] h-[340px] bg-background rounded-2xl shadow-card border border-white/30 overflow-hidden flex flex-col pointer-events-none select-none">
                      <div className="w-full h-40 bg-gray-200 skeleton-simple" />
                      <div className="p-5 flex flex-col flex-1 gap-2">
                        <div className="h-4 rounded bg-accent/5 w-3/4" />
                        <div className="h-3 rounded bg-accent/5 w-full" />
                        <div className="h-3 rounded bg-accent/5 w-2/3" />
                      </div>
                    </div>
                    
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
                                className="flex-shrink-0 h-[340px] w-[280px] snap-center cursor-pointer group"
                            >
                                
                                {/* Card */}
                                <div className="bg-background rounded-2xl shadow-card h-full hover:shadow-card-hover border border-white/30 overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                                    {/* Thumbnail */}
                                    <div className="w-full h-40 overflow-hidden bg-gray-200 skeleton-simple">
                                        {imageUrl && (
                                            <img 
                                                src={imageUrl} 
                                                alt="" 
                                                loading="lazy"
                                                className="w-full h-full object-cover object-center scale-125 group-hover:scale-150 transition-transform duration-700"
                                            />
                                        )}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-serif font-bold text-base text-accent line-clamp-2 leading-snug">
                                            {post.title}
                                        </h3>
                                                                        {/* Date badge */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium text-accent/60  py-1">
                                        {post.date}
                                    </span>
                                </div>

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
            </div>

            {/* Pagination */}
            {posts.length > 0 && (
                <div className="flex items-center justify-center gap-3">
                    <button onClick={() => scrollBy('prev')} className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 shadow-md border border-white/40 flex items-center justify-center text-accent hover:bg-white hover:shadow-lg transition-all duration-200 text-sm" aria-label="Previous posts">‹</button>
                    <div className="flex gap-2 bg-white/85 px-4 py-2 rounded-full shadow-md border border-white/40">
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