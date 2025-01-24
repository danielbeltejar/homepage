import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faLink } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer id="contact"
      class="text-text dark:text-dark-text bg-window dark:bg-dark-window text-11 p-10 lg:pb-24 shadow-md lg:w-[740px] mb-0">
      <div class="flex flex-row align-middle items-center group w-full">
        <a href="#contact"
          class="text-accent dark:text-dark-accent text-11 opacity-0 absolute group-hover:opacity-100 transition-opacity duration-300">
          <FontAwesomeIcon icon={faLink} />
        </a>
        <h2 class="text-accent dark:text-dark-accent font-bold text-2xl group-hover:cursor-pointer group-hover:pl-7 group-hover:underline underline-offset-4 transition-all duration-300"
          onclick="location.href='#contact';">Contact</h2>
      </div>
      <p class="mt-4 mb-10">
        Thank you for visiting my personal web page. If you have any questions or would like to get in touch,
        please feel free to to write to one of the next options. I look forward to hearing from you!
      </p>
      <buttons class="flex flex-row gap-x-4">
        <div class="flex flex-row gap-s">
          <a target="_blank"
            class="flex flex-row z-10 drop-shadow-md hover:shadow-md gap-2 text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text transition-colors duration-300 text-11 px-[10px] py-1 justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent"
            href="https://www.linkedin.com/in/daniel-beltejar-sancho/"
            rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
            <p class="text-11">LinkedIn</p>
          </a>
        </div>

        <div class="group flex flex-row relative">
          <a class="flex flex-row z-10 drop-shadow-md hover:shadow-md gap-2  px-[10px] py-1 text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text transition-colors duration-300 text-11 justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent"
            href="mailto:contacto@danielbeltejar.es">
            <p class="font-bold">@</p>
            <p>Mail</p>
          </a>
          <a href="mailto:contacto@danielbeltejar.es"
            class="hidden lg:absolute lg:group-hover:left-[73px] -left-36 lg:flex  px-[10px] py-1 transition-all duration-300 flex-row hover:shadow-md gap-2xs text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text text-11 px-2xs py-3xs justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent">
            <p>hi@danielbeltejar.es</p>
          </a>
          <p
            class="hidden lg:absolute left-[-156px] lg:flex  px-[10px] py-1 flex-row gap-2xs text-window dark:text-dark-window text-11 px-2xs py-3xs justify-center items-center cursor-default bg-window dark:bg-dark-window">
            hi@danielbeltejar.es
          </p>
        </div>
      </buttons>
    </footer>
  );
};

export default Footer;