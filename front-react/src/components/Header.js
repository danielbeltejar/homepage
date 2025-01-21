import React from 'react';

const Header = () => {
    return (
        <header className="flex flex-row w-full justify-center mb-m lg:mb-xl items-center">
            <div id="title-effect" style={{ opacity: 0 }}
                className="transition-opacity ease-in-out duration-700 text-2 font-extrabold text-accent dark:text-dark-accent flex-row align-middle justify-center items-center pl-3xs py-3xs w-fit px-xs mt-xs mr-auto hidden lg:block">
                <h1>Daniel Beltejar</h1>
            </div>
            <a target="_blank" id="blog-link" style={{ opacity: 0 }}
                href="https://blog.danielbeltejar.es/28/game-dev-log-1-introduction-to-my-first-mmorts/"
                className="transition-opacity ease-in-out duration-700 text-window dark:text-dark-text ">
                <div
                    className="text-12 flex gap-2 w-fit font-bold bg-accent dark:bg-dark-accent overflow-hidden flex-row align-middle items-center pl-3xs py-3xs rounded-full h-[33px] px-xs mt-xs">
                    <p className="border-2 border-window dark:border-dark-text  rounded-full px-2xs">Blog</p>
                    <p className="max-h-4 text-ellipsis overflow-hidden">Loading last blog entry...</p>
                </div>
            </a>
        </header>
    );
};
export default Header;