import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
        <header className="flex flex-row w-full bg-window dark:bg-dark-window p-10 justify-center lg:pt-12 lg:pb-8 items-center">
            <Link id="title-effect" style={{ opacity: 0 }}
                to="/"
                className="transition-opacity text-3xl ease-in-out duration-700 font-bold text-accent dark:text-dark-accent flex-row align-middle justify-center items-center w-fit mr-auto hidden lg:block">
                <h1>Daniel Beltejar</h1>
            </Link>
            <Link id="blog-link" style={{ opacity: blogUrl ? 1 : 0 }}
                to={blogUrl}
                className="transition-opacity ease-in-out duration-1000 text-window dark:text-dark-text m-0 lg:max-w-[375px] max-w-full">
                <div
                    className="text-12 flex gap-2 font-bold bg-accent dark:bg-dark-accent overflow-hidden drop-shadow-lg shadow-lg px-1 flex-row align-middle items-center rounded-full h-[33px] m-0">
                    <p className="border-2  border-window dark:border-dark-text text-[0.8rem] p-[0.5px] px-2 rounded-full mt-[1px] m-0">Blog</p>
                    <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap mr-1">{blogTitle}</p>
                </div>
            </Link>
        </header>
    );
};
export default Header;