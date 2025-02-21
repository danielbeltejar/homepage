import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import Button from './Button';
import PostCard from './PostCard';

interface PostObject {
    filename: string;
    title: string;
    date: string;
    content: string;
}

export default function Posts() {
    const [posts, setPosts] = useState<PostObject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://danielbeltejar.es/api/posts`);

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const jsonResponse = await response.json();
                setPosts(jsonResponse.posts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10 shadow-lg min-h-[800px]'>
            <div className="flex flex-row align-middle items-center mt-xs group w-full">
                <a href="/posts"
                    className="text-accent dark:text-dark-accent opacity-0 absolute group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faLink} />
                </a>
                <h2 className="text-accent dark:text-dark-accent font-bold text-2xl group-hover:cursor-pointer group-hover:pl-7 group-hover:underline underline-offset-4 transition-all duration-300"
                    onClick="location.href='/posts';">Posts</h2>
            </div>

            <p className="mt-4 mb-10 text-12">
                New text
            </p>
            <div className="flex flex-col align-middle items-start mt-xs group w-ful gap-y-6">
                {currentPosts.map((post) => (
                    <PostCard
                        key={post.filename}
                        title={post.title}
                        date={post.date}
                        content={post.content}
                        onClick={() => navigate(`/post/${post.filename.replace('.md', '')}`)}
                    />
                ))}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                        <Button
                            key={index + 1}
                            text={(index + 1).toString()}
                            onClick={() => paginate(index + 1)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}