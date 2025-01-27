import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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

                // Read the markdown content
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

    if (!post) {
        return (
            <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10'>
                <div className="flex flex-row h-[1000px] align-middle items-center mt-xs group w-full">
                </div>
            </div>
        );
    }

    return (
        <div className='bg-window dark:bg-dark-window mt-16 mb-16 p-10 '>
            <div className="flex flex-col align-middle items-start mt-xs group w-full">
                <a href={filename}
                    className="text-accent dark:text-dark-accent opacity-0 absolute group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faLink} />
                </a>
                <h2 className="text-accent dark:text-dark-accent font-bold text-2xl group-hover:cursor-pointer group-hover:pl-7 group-hover:underline underline-offset-4 transition-all duration-300">
                    {post.title}
                </h2>
                <div className='text-accent dark:text-dark-accent flex flex-row'>
                    <p id='author' className="mr-1 hidden">{post.author} -</p>
                    <p>At {post.publishedDate}</p>
                </div>
            </div>
            <p className="mt-4 mb-10 text-12 post post prose prose-strong:text-text-light prose-strong:dark:text-dark-text prose-code:text-text-light prose-code:dark:text-dark-text  prose-headings:text-accent prose-headings:dark:text-dark-accent dark:text-dark-text">
                <ReactMarkdown>
                    {post.content}</ReactMarkdown>
            </p>
        </div>
    );
}