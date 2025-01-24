import React from 'react';

const Header = () => {
    return (
        <header className="flex flex-row w-full bg-window dark:bg-dark-window p-10 justify-center lg:pt-12 lg:pb-8 items-center">
            <div id="title-effect" style={{ opacity: 0 }}
                className="transition-opacity text-3xl ease-in-out duration-700 font-bold text-accent dark:text-dark-accent flex-row align-middle justify-center items-center w-fit mr-auto hidden lg:block">
                <h1>Daniel Beltejar</h1>
            </div>
            <a target="_blank" id="blog-link" style={{ opacity: 0 }}
                href="https://blog.danielbeltejar.es/28/game-dev-log-1-introduction-to-my-first-mmorts/"
                rel="noreferrer"
                className="transition-opacity ease-in-out duration-700 text-window dark:text-dark-text m-0">
                <div
                    className="text-12 flex gap-2 font-bold bg-accent dark:bg-dark-accent overflow-hidden  px-1 flex-row align-middle items-center rounded-full h-[33px] m-0">
                    <p className="border-2  border-window dark:border-dark-text text-[0.8rem] p-[0.5px] px-2 rounded-full m-0">Blog</p>
                    <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-[350px] mr-1">Loading last blog entry...</p>
                </div>
            </a>
        </header>
    );
};
export default Header;