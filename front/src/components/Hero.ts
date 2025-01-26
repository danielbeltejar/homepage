import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRssSquare } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

const Hero = () => {
  useEffect(() => {
    let i = 0;
    const txt = 'Developer, Operations and Cloud proeffecient';
    const speed = 60;

    const typeWriter = () => {
      const typeEffectElem = document.getElementById('type-effect');
      const titleEffectElem = document.getElementById('title-effect');

      if (!typeEffectElem || !titleEffectElem) return;

      if (typeEffectElem.innerHTML === 'Daniel Beltejar') {
        typeEffectElem.innerHTML = '';
        titleEffectElem.style.opacity = '1';
      }

      if (i < txt.length) {
        typeEffectElem.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    if (window.innerWidth < 1024) {
      typeWriter();
    } else {
      const typeEffectElem = document.getElementById('type-effect');
      if (typeEffectElem) {
        typeEffectElem.innerHTML = 'Daniel Beltejar';
        setTimeout(typeWriter, 2200);
      }
    }
  }, []);

  return (
    <section className="flex flex-col bg-window p-10 dark:bg-dark-window">
      <div className="flex flex-col flex-1">
        <div className="relative">
          <h2 id="type-effect" className="absolute text-accent dark:text-dark-accent font-bold text-4xl "></h2>
          <h2 className=" mb-auto text-window dark:text-dark-window font-bold text-4xl">Developer, Operations
            and Cloud proeffecient
          </h2>
        </div>
        <p className="justify-self-center mt-10 mb-10">
          Combining my technical skills with my enthusiasm for learning, I strive for excellence and
          continuous improvement, enabling me to deliver efficient, reliable, and high-quality solutions
          for various systems, task automations, and applications.
        </p>
        <button className="flex flex-row gap-s justify-self-end gap-x-4">
          <div className="flex flex-row gap-x-4 gap-s">
            <a target="_blank"
              rel="noreferrer"
              className="flex flex-row z-10 drop-shadow-md hover:shadow-md gap-2 text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text transition-colors duration-300 text-11  px-[10px] py-1 justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent"
              href="https://www.linkedin.com/in/daniel-beltejar-sancho/">
              <i className="fa-brands fa-linkedin"></i>
              <FontAwesomeIcon icon={faLinkedin} />
              <p>Connect</p>
            </a>
            <a target="_blank"
              className="flex flex-row z-10 drop-shadow-md hover:shadow-md gap-2 text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text transition-colors duration-300 text-11  px-[10px] py-1 justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent"
              href="https://blog.danielbeltejar.es/"
              rel="noreferrer">
              <i className="fa-solid fa-square-rss"></i>
              <FontAwesomeIcon icon={faRssSquare} />
              <p>Blog</p>
            </a>
          </div>
          <div className="group flex flex-row gap-2 relative">
            <a className="flex flex-row z-10 drop-shadow-md hover:shadow-md gap-2 text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text transition-colors duration-300 text-11  px-[10px] py-1 justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent"
              href="mailto:contacto@danielbeltejar.es">
              <p className="font-bold">@</p>
            </a>
            <a href="mailto:contacto@danielbeltejar.es"
              className="absolute lg:group-hover:left-[33px] -left-40 flex transition-all duration-300 flex-row hover:shadow-md gap-2 text-window dark:hover:text-dark-window hover:text-text dark:text-dark-text dark:hover:ttext-dark-window text-11  px-[10px] py-1 justify-center items-center hover:bg-primary-button dark:hover:bg-dark-primary-button bg-accent dark:bg-dark-accent">
              <p>hi@danielbeltejar.es</p>
            </a>
            <p
              className="absolute left-[-156px] flex flex-row gap-2 text-window dark:text-dark-window text-11 px-[10px] py-1 justify-center items-center cursor-default bg-window dark:bg-dark-window">
              hi@danielbeltejar.es
            </p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;