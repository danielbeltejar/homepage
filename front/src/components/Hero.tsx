import { useEffect } from 'react';
import { faRssSquare } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Button from './Button';
import { Link } from 'react-router-dom';

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

      if (i < txt.length) { typeEffectElem.innerHTML += txt.charAt(i); i++; setTimeout(typeWriter, speed); }
    }; if
      (window.innerWidth < 1024) { typeWriter(); } else {
      const typeEffectElem = document.getElementById('type-effect'); if
        (typeEffectElem) { typeEffectElem.innerHTML = 'Daniel Beltejar'; setTimeout(typeWriter, 2200); }
    }
  }, []); return (
    <section className="flex flex-col bg-window p-10 dark:bg-dark-window">
      <div className="flex flex-col flex-1">
        <div className="relative">
          <h2 id="type-effect" className="absolute text-accent dark:text-dark-accent font-bold text-4xl "> </h2>
          < h2 className=" mb-auto text-window dark:text-dark-window font-bold text-4xl"> Developer, Operations
            and Cloud proeffecient
          </h2>
        </div>
        < p className="justify-self-center mt-10 mb-10">
          Combining my technical skills with my enthusiasm for learning, I strive for excellence and
          continuous improvement, enabling me to deliver efficient, reliable, and high - quality solutions
          for various systems, task automations, and applications.
        </p>
        < div className="flex flex-row gap-x-5 h-12">
          <Button icon={faLinkedin} text="Connect" url="https://www.linkedin.com/in/daniel-beltejar-sancho/" newTab={true} />
          <Button icon={faRssSquare} text="Blog" url="/posts" newTab={false} />
          <div className="group flex flex-row gap-2 relative">
            <Button text="@" url="mailto:contacto@danielbeltejar.es" />
            <Link to="mailto:contacto@danielbeltejar.es"
              className="absolute lg:group-hover:left-[35px] pl-6 h-12 -left-40 flex  rounded-xl text-accent  border-gray-200 border-2 min-w-12 transition-all duration-300 flex-row gap-2    text-11 px-[10px] py-1 justify-center items-center  bg-background ">
              <p>hi@danielbeltejar.es</p>
            </Link>
            < p
              className="absolute left-[-156px] flex flex-row h-12  gap-2 text-window dark:text-dark-window text-11 px-[10px] py-1 justify-center items-center cursor-default bg-window dark:bg-dark-window">
              hi@danielbeltejar.es
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;