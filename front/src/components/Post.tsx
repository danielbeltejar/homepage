import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SectionHeader from './SectionHeader';

interface PostObject {
    title: string;
    content: string;
    publishedDate: string;
    author: string;
}

export default function Post() {
    const [post, setPost] = useState<PostObject | null>(null);
    const { filename } = useParams<{ filename: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://danielbeltejar.es/api/posts/${filename}.md`);

                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }

                const jsonResponse = await response.json();
                const content = jsonResponse.content;

                const title = jsonResponse.title;
                const publishedDate = jsonResponse.date;
                const author = jsonResponse.author;
                setPost({
                    title: title,
                    content: content,
                    publishedDate: publishedDate,
                    author: author,
                });
            } catch (error) {
                console.error('Error fetching post:', error);
                setPost(null);
            }
        };

        fetchPost();
    }, [filename]);


    useEffect(() => {
        const images = document.querySelectorAll('.post img');

        const lazyLoadImage = (img: HTMLImageElement) => {
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.onload = () => {
                    const wrapper = img.parentElement;
                    if (wrapper?.classList.contains('skeleton')) {
                        wrapper.classList.remove('skeleton');
                    }
                    img.style.opacity = '1';
                };
            }
        };

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement;
                        lazyLoadImage(img);
                        obs.unobserve(img);
                    }
                });
            },
            { rootMargin: '100px' }
        );

        images.forEach((img) => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('image-wrapper', 'skeleton', 'rounded-3xl');
            img.parentNode?.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            img.dataset.src = img.src;
            img.src = '';
            img.style.opacity = '0';
            observer.observe(img);
        });

        return () => {
            observer.disconnect();
        };
    }, [post]);


    if (!post) {
        return (
            <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10 shadow-lg'>
                <div className="flex flex-row h-[1000px] align-middle items-center mt-xs group w-full">
                </div>
            </div>
        );
    }

    return (
        <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10 shadow-lg'>
            <div className="flex flex-col align-middle items-start mt-xs group w-full">
                <SectionHeader title={post.title} link="#content" />
                <div className='text-accent dark:text-dark-accent flex flex-row'>
                    <p id='author' className="mr-1 hidden">{post.author} -</p>
                    <p>At {post.publishedDate}</p>
                </div>
            </div>
            <p className="mt-4 mb-10 post post prose prose-strong:text-text-light prose-strong:dark:text-dark-text prose-code:text-text-light prose-code:dark:text-dark-text  prose-headings:text-accent prose-headings:dark:text-dark-accent dark:text-dark-text dark:prose-a:text-dark-text text-black">
                <ReactMarkdown>
                    {post.content}
                </ReactMarkdown>
            </p>
        </div>
    );

}