import React from 'react';

const Hero = () => {
  return (
    <div class="flex flex-col gap-x-s">
      <div class="flex flex-col gap-m flex-1">
        <div class="relative">
          <h2 id="type-effect" class="absolute text-accent dark:text-dark-accent font-bold text-3 "></h2>
          <h2 class=" mb-auto text-window dark:text-dark-window font-bold text-3">Developer, Operations
            and Cloud proeffecient
          </h2>
        </div>
        <p class="justify-self-center">
          Combining my technical skills with my enthusiasm for learning, I strive for excellence and
          continuous improvement, enabling me to deliver efficient, reliable, and high-quality solutions
          for various systems, task automations, and applications.
        </p>
        <button class="flex flex-row gap-s justify-self-end">
          <div class="flex flex-row gap-s">
            <a target="_blank"
              class="flex flex-row z-10 drop-shadow-md hover:shadow-md gap-2xs text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text transition-colors duration-300 text-11 px-2xs py-3xs justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent"
              href="https://www.linkedin.com/in/daniel-beltejar-sancho/">
              <i class="fa-brands fa-linkedin"></i>
              <p>Connect</p>
            </a>
            <a target="_blank"
              class="flex flex-row z-10 drop-shadow-md hover:shadow-md gap-2xs text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text transition-colors duration-300 text-11 px-2xs py-3xs justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent"
              href="https://blog.danielbeltejar.es/">
              <i class="fa-solid fa-square-rss"></i>
              <p>Blog</p>
            </a>
          </div>
          <div class="group flex flex-row relative">
            <a class="flex flex-row z-10 drop-shadow-md hover:shadow-md gap-2xs text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text transition-colors duration-300 text-11 px-2xs py-3xs justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent"
              href="mailto:contacto@danielbeltejar.es">
              <p class="font-bold">@</p>
            </a>
            <a href="mailto:contacto@danielbeltejar.es"
              class="absolute lg:group-hover:left-[33px] -left-40 flex transition-all duration-300 flex-row hover:shadow-md gap-2xs text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text dark:hover:ttext-dark-window text-11 px-2xs py-3xs justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent">
              <p>hi@danielbeltejar.es</p>
            </a>
            <p
              class="absolute left-[-156px] flex flex-row gap-2xs text-window dark:text-dark-window text-11 px-2xs py-3xs justify-center items-center cursor-default bg-window dark:bg-dark-window">
              hi@danielbeltejar.es
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero;