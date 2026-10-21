import { useEffect, useState } from 'react';

const Header = () => {

    const [blogUrl, setBlogUrl] = useState('');
    const [blogTitle, setBlogTitle] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${window.location.origin}/api/posts/newest`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const url = `/post/${data.filename.replace('.md', '')}`;
                setBlogUrl(url);
                setBlogTitle(data.title);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <header className="flex flex-row w-full p-10 justify-center lg:pt-12 lg:pb-8 items-center">
            <a id="title-effect" style={{ opacity: 0 }}
                href="/"
                className="transition-opacity text-3xl ease-in-out duration-700 font-bold text-accent flex-row align-middle justify-center items-center w-fit mr-auto hidden lg:block">
                <h1>Daniel Beltejar</h1>
            </a>
            <a id="blog-link" style={{ opacity: blogUrl ? 1 : 0 }}
                href={blogUrl || '#'}
                className="transition-opacity ease-in-out duration-1000 text-window m-0 lg:max-w-[375px] max-w-full">
                <div
                    className="text-12 flex gap-2 font-bold bg-accent overflow-hidden shadow-md px-1 flex-row align-middle items-center rounded-full h-[33px] m-0">
                    <p className="border-2 border-window text-[0.8rem] p-[0.5px] px-2 rounded-full mt-[1px] m-0">Blog</p>
                    <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap mr-1">{blogTitle}</p>
                </div>
            </a>
        </header>
    );
};
export default Header;
